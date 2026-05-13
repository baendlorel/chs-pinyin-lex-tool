import fs from 'node:fs';
import os from 'node:os';
import path from 'node:path';

import { afterEach, describe, expect, it } from 'vitest';

import { loadLexFile, parseImportText, restoreLexBackup, saveLexFile, scanLexDirectory } from './lex-service.js';

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
  it('round-trips entries through save and load', () => {
    const directory = createTempDirectory();
    const lexFile = path.join(directory, 'ChsPinyinEUDPv1.lex');

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

    const loaded = loadLexFile(lexFile);
    expect(loaded.entries.map((entry) => ({ text: entry.text, pinyin: entry.pinyin, index: entry.index }))).toEqual([
      { text: 'DateFmt', pinyin: '%yyyy%-%MM%-%dd%', index: 1 },
      { text: '自定义词条', pinyin: 'zidingyi', index: 1 },
    ]);
  });

  it('rotates backups and restores a previous version', () => {
    const directory = createTempDirectory();
    const lexFile = path.join(directory, 'ChsPinyinEUDPv1.lex');

    saveLexFile(lexFile, [{ id: '1', text: 'alpha', pinyin: 'a', index: 1, rawHeaderBase64: '' }]);
    saveLexFile(lexFile, [{ id: '2', text: 'beta', pinyin: 'b', index: 1, rawHeaderBase64: '' }]);
    saveLexFile(lexFile, [{ id: '3', text: 'gamma', pinyin: 'g', index: 1, rawHeaderBase64: '' }]);

    const beforeRestore = loadLexFile(lexFile);
    expect(beforeRestore.backups[0].exists).toBe(true);
    expect(beforeRestore.backups[1].exists).toBe(true);

    const restored = restoreLexBackup(lexFile, 1);
    expect(restored.entries).toHaveLength(1);
    expect(restored.entries[0]?.text).toBe('alpha');

    const afterRestore = loadLexFile(lexFile);
    expect(afterRestore.backups[0].exists).toBe(true);
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
