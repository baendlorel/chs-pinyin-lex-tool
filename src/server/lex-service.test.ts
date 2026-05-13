import fs from 'node:fs';
import os from 'node:os';
import path from 'node:path';

import { afterEach, describe, expect, it } from 'vitest';

import { loadLexFile, parseImportText, saveLexFile, scanLexDirectory } from './lex-service.js';

const temporaryDirectories: string[] = [];

function createTempDirectory() {
  const directory = fs.mkdtempSync(path.join(os.tmpdir(), 'lex-service-'));
  temporaryDirectories.push(directory);
  return directory;
}

afterEach(() => {
  while (temporaryDirectories.length > 0) {
    const directory = temporaryDirectories.pop();
    if (directory) {
      fs.rmSync(directory, { recursive: true, force: true });
    }
  }
});

describe('lex-service', () => {
  it('creates missing origin and extra files when opening an existing lex file', () => {
    const directory = createTempDirectory();
    const lexFile = path.join(directory, 'ChsPinyinEUDPv1.lex');
    const originFile = `${lexFile}.origin`;
    const extraFile = `${lexFile}.extra`;

    saveLexFile(lexFile, [{ id: '1', text: 'seed', pinyin: 'seed', index: 1, rawHeaderBase64: '' }]);
    fs.rmSync(originFile, { force: true });
    fs.rmSync(extraFile, { force: true });

    const loaded = loadLexFile(lexFile);

    expect(fs.existsSync(originFile)).toBe(true);
    expect(fs.existsSync(extraFile)).toBe(true);
    expect(fs.readFileSync(extraFile, 'utf8')).toBe('');
    expect(loaded.entries).toEqual([]);
  });

  it('writes origin and extra files while loading editable extra entries', () => {
    const directory = createTempDirectory();
    const lexFile = path.join(directory, 'ChsPinyinEUDPv1.lex');
    const originFile = `${lexFile}.origin`;
    const extraFile = `${lexFile}.extra`;

    const saved = saveLexFile(lexFile, [
      {
        id: '1',
        text: '自定义词条',
        pinyin: 'zidingyi',
        index: 1,
        rawHeaderBase64: '',
      },
      {
        id: '2',
        text: 'DateFmt',
        pinyin: '%yyyy%-%MM%-%dd%',
        index: 1,
        rawHeaderBase64: '',
      },
    ]);

    expect(saved.entries).toHaveLength(2);
    expect(fs.existsSync(originFile)).toBe(true);
    expect(fs.existsSync(extraFile)).toBe(true);
    expect(fs.readFileSync(extraFile, 'utf8')).toContain('自定义词条/zidingyi/1');

    const loaded = loadLexFile(lexFile);
    expect(loaded.entries.map((entry) => ({ text: entry.text, pinyin: entry.pinyin, index: entry.index }))).toEqual([
      { text: '自定义词条', pinyin: 'zidingyi', index: 1 },
      { text: 'DateFmt', pinyin: '%yyyy%-%MM%-%dd%', index: 1 },
    ]);

    const finalLex = fs.readFileSync(lexFile);
    expect(finalLex.length).toBeGreaterThan(0);

    const rebuilt = loadLexFile(lexFile);
    expect(rebuilt.filePath).toMatch(/[\\/]ChsPinyinEUDPv1\.lex$/);
  });

  it('rebuilds final lex from origin plus extra content', () => {
    const directory = createTempDirectory();
    const lexFile = path.join(directory, 'ChsPinyinEUDPv1.lex');

    saveLexFile(lexFile, [{ id: '1', text: 'base', pinyin: 'base', index: 1, rawHeaderBase64: '' }]);
    saveLexFile(lexFile, [{ id: '2', text: 'delta', pinyin: 'delta', index: 2, rawHeaderBase64: '' }]);

    const loaded = loadLexFile(lexFile);
    expect(loaded.entries.map((entry) => ({ text: entry.text, pinyin: entry.pinyin, index: entry.index }))).toEqual([
      { text: 'delta', pinyin: 'delta', index: 2 },
    ]);
  });

  it('imports phrase/pinyin text and scans a windows directory input', () => {
    const directory = createTempDirectory();
    const lexFile = path.join(directory, 'ChsPinyinEUDPv1.lex');
    saveLexFile(lexFile, [{ id: '1', text: 'existing', pinyin: 'clc', index: 1, rawHeaderBase64: '' }]);

    const loaded = loadLexFile(lexFile);
    const mergedEntries = parseImportText('New Phrase/rq\nexisting/clc\n', loaded.entries);

    expect(mergedEntries.map((entry) => ({ text: entry.text, pinyin: entry.pinyin, index: entry.index }))).toEqual([
      { text: 'existing', pinyin: 'clc', index: 1 },
      { text: 'New Phrase', pinyin: 'rq', index: 1 },
    ]);

    const scanResult = scanLexDirectory(directory);
    expect(scanResult.files).toEqual(['ChsPinyinEUDPv1.lex']);
    expect(scanResult.selectedFilePath).toMatch(/[\\/]ChsPinyinEUDPv1\.lex$/);
  });
});
