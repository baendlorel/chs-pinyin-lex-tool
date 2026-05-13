import crypto from 'node:crypto';
import fs from 'node:fs';
import path from 'node:path';

const MAGIC = Buffer.from('mschxudp', 'ascii');
const DEFAULT_HEAD16 = Buffer.from([
  0x6d, 0x73, 0x63, 0x68, 0x78, 0x75, 0x64, 0x70, 0x02, 0x00, 0x60, 0x00, 0x01, 0x00, 0x00, 0x00,
]);
const BACKUP_COUNT = 3;

export interface LexEntry {
  id: string;
  pinyin: string;
  text: string;
  index: number;
  rawHeaderBase64: string;
}

export interface LexBackupInfo {
  index: number;
  path: string;
  exists: boolean;
  updatedAt: string | null;
}

export interface LoadedLexFile {
  filePath: string;
  fileName: string;
  directoryPath: string;
  count: number;
  exportTime: number;
  recordStart: number;
  backups: LexBackupInfo[];
  entries: LexEntry[];
}

interface ParsedLexRecord {
  index: number;
  pinyin: string;
  text: string;
  rawHeader: Buffer;
}

interface ParsedLexFile {
  filePath: string;
  count: number;
  exportTime: number;
  recordStart: number;
  head16: Buffer;
  reserved: Buffer;
  entries: ParsedLexRecord[];
}

export interface LexDirectoryScanResult {
  inputPath: string;
  directoryPath: string;
  files: string[];
  selectedFilePath: string | null;
}

function toWindowsDisplayPath(sourcePath: string) {
  const trimmedPath = sourcePath.trim();
  if (!trimmedPath) {
    return '';
  }

  if (/^[a-zA-Z]:[\\/]/.test(trimmedPath)) {
    return path.win32.normalize(trimmedPath);
  }

  if (trimmedPath.startsWith('\\')) {
    return path.win32.normalize(trimmedPath);
  }

  const normalizedPath = path.normalize(trimmedPath);
  const wslDriveMatch = normalizedPath.match(/^\/mnt\/([a-zA-Z])(\/.*)?$/);
  if (wslDriveMatch) {
    const [, driveLetter, rest = ''] = wslDriveMatch;
    const suffix = rest.replace(/\//g, '\\');
    return `${driveLetter.toUpperCase()}:\\${suffix.replace(/^\\/, '')}`;
  }

  if (normalizedPath.startsWith('//')) {
    return normalizedPath.replace(/\//g, '\\');
  }

  return normalizedPath;
}

function createEntryId(rawHeader: Buffer, pinyin: string, index: number, text: string) {
  return crypto
    .createHash('sha1')
    .update(rawHeader)
    .update('\0')
    .update(pinyin)
    .update('\0')
    .update(String(index))
    .update('\0')
    .update(text)
    .digest('hex');
}

function readUtf16z(buffer: Buffer, start: number, end: number) {
  let pointer = start;
  while (pointer + 1 < end) {
    if (buffer[pointer] === 0x00 && buffer[pointer + 1] === 0x00) {
      return {
        text: buffer.toString('utf16le', start, pointer),
        next: pointer + 2,
      };
    }
    pointer += 2;
  }

  return {
    text: buffer.toString('utf16le', start, end),
    next: end,
  };
}

function parseRecord(buffer: Buffer, start: number, end: number): ParsedLexRecord | null {
  if (end - start < 16) {
    return null;
  }

  const header = buffer.subarray(start, start + 16);
  const pinyinPart = readUtf16z(buffer, start + 16, end);
  const textPart = readUtf16z(buffer, pinyinPart.next, end);

  return {
    index: header[6],
    pinyin: pinyinPart.text,
    text: textPart.text,
    rawHeader: Buffer.from(header),
  };
}

function parseLexBuffer(filePath: string, buffer: Buffer): ParsedLexFile {
  if (buffer.length < 0x40) {
    throw new Error('File is too short to be a valid .lex file');
  }

  if (!buffer.subarray(0, 8).equals(MAGIC)) {
    throw new Error('File is not a Microsoft Pinyin .lex file');
  }

  const tableStart = buffer.readUInt32LE(0x10);
  const recordStart = buffer.readUInt32LE(0x14);
  const totalSize = buffer.readUInt32LE(0x18);
  const count = buffer.readUInt32LE(0x1c);
  const exportTime = buffer.readUInt32LE(0x20);

  if (tableStart !== 0x40) {
    throw new Error(`Unsupported offset table start: ${tableStart}`);
  }

  if (recordStart > buffer.length) {
    throw new Error('Record start exceeds file length');
  }

  if (count > 0 && recordStart < tableStart + count * 4) {
    throw new Error('Offset table overlaps with the record area');
  }

  const offsets: number[] = [];
  for (let index = 0; index < count; index += 1) {
    offsets.push(buffer.readUInt32LE(tableStart + index * 4));
  }

  const entries: ParsedLexRecord[] = [];
  for (let index = 0; index < count; index += 1) {
    const start = recordStart + offsets[index];
    const end =
      index + 1 < count ? recordStart + offsets[index + 1] : Math.min(totalSize || buffer.length, buffer.length);
    if (start >= end || start >= buffer.length) {
      continue;
    }

    const record = parseRecord(buffer, start, end);
    if (record) {
      entries.push(record);
    }
  }

  return {
    filePath,
    count,
    exportTime,
    recordStart,
    head16: Buffer.from(buffer.subarray(0, 16)),
    reserved: Buffer.from(buffer.subarray(0x24, 0x40)),
    entries,
  };
}

function buildRecord(entry: LexEntry, templateHeader: Buffer | undefined) {
  const pinyin = Buffer.from(entry.pinyin, 'utf16le');
  const text = Buffer.from(entry.text, 'utf16le');
  const header = Buffer.alloc(16, 0);

  if (templateHeader && templateHeader.length >= 16) {
    templateHeader.copy(header, 0, 0, 16);
  }

  header.writeUInt16LE(0x0010, 0);
  header.writeUInt16LE(0x0010, 2);
  header.writeUInt16LE(16 + pinyin.length + 2, 4);
  header[6] = entry.index;
  if (!header[7]) {
    header[7] = 0x06;
  }

  return Buffer.concat([header, pinyin, Buffer.from([0, 0]), text, Buffer.from([0, 0])]);
}

function getTemplateHeader(entry: LexEntry) {
  return entry.rawHeaderBase64 ? Buffer.from(entry.rawHeaderBase64, 'base64') : undefined;
}

function buildLexBuffer(entries: LexEntry[], oldLex?: ParsedLexFile) {
  const sortedEntries = entries
    .map((entry) => ({ ...entry }))
    .sort((left, right) => {
      return (
        left.pinyin.localeCompare(right.pinyin, 'zh-Hans-CN') ||
        left.index - right.index ||
        left.text.localeCompare(right.text, 'zh-Hans-CN')
      );
    });

  const records = sortedEntries.map((entry) =>
    buildRecord(entry, getTemplateHeader(entry) ?? oldLex?.entries[0]?.rawHeader),
  );
  const recordStart = 0x40 + records.length * 4;
  const offsets: number[] = [];
  let cursor = 0;
  for (const record of records) {
    offsets.push(cursor);
    cursor += record.length;
  }

  const totalSize = recordStart + cursor;
  const output = Buffer.alloc(totalSize, 0);
  (oldLex?.head16 ?? DEFAULT_HEAD16).copy(output, 0, 0, 16);
  output.writeUInt32LE(0x40, 0x10);
  output.writeUInt32LE(recordStart, 0x14);
  output.writeUInt32LE(totalSize, 0x18);
  output.writeUInt32LE(records.length, 0x1c);
  output.writeUInt32LE(Math.floor(Date.now() / 1000), 0x20);

  if (oldLex?.reserved.length === 0x1c) {
    oldLex.reserved.copy(output, 0x24);
  }

  for (let index = 0; index < offsets.length; index += 1) {
    output.writeUInt32LE(offsets[index], 0x40 + index * 4);
  }

  let writeOffset = recordStart;
  for (const record of records) {
    record.copy(output, writeOffset);
    writeOffset += record.length;
  }

  return output;
}

function toSerializedEntry(record: ParsedLexRecord): LexEntry {
  return {
    id: createEntryId(record.rawHeader, record.pinyin, record.index, record.text),
    pinyin: record.pinyin,
    text: record.text,
    index: record.index,
    rawHeaderBase64: record.rawHeader.toString('base64'),
  };
}

function getBackupPath(filePath: string, backupIndex: number) {
  return `${filePath}.bak${backupIndex}`;
}

export function listLexBackups(filePath: string): LexBackupInfo[] {
  return Array.from({ length: BACKUP_COUNT }, (_, index) => {
    const backupPath = getBackupPath(filePath, index);
    if (!fs.existsSync(backupPath)) {
      return {
        index,
        path: toWindowsDisplayPath(backupPath),
        exists: false,
        updatedAt: null,
      };
    }

    const stats = fs.statSync(backupPath);
    return {
      index,
      path: toWindowsDisplayPath(backupPath),
      exists: true,
      updatedAt: stats.mtime.toISOString(),
    };
  });
}

export function rotateLexBackups(filePath: string) {
  for (let index = BACKUP_COUNT - 1; index >= 1; index -= 1) {
    const nextPath = getBackupPath(filePath, index);
    const previousPath = getBackupPath(filePath, index - 1);
    if (!fs.existsSync(previousPath)) {
      continue;
    }

    fs.copyFileSync(previousPath, nextPath);
  }

  if (fs.existsSync(filePath)) {
    fs.copyFileSync(filePath, getBackupPath(filePath, 0));
  }
}

export function sanitizeLexEntries(entries: LexEntry[]) {
  return entries.map((entry, index) => {
    const text = entry.text.trim();
    const pinyin = entry.pinyin.trim();
    const numericIndex = Number(entry.index);

    if (!text) {
      throw new Error(`Entry ${index + 1} is missing text`);
    }

    if (!pinyin) {
      throw new Error(`Entry ${index + 1} is missing pinyin`);
    }

    if (!Number.isInteger(numericIndex) || numericIndex < 1 || numericIndex > 9) {
      throw new Error(`Entry ${index + 1} index must be an integer between 1 and 9`);
    }

    return {
      ...entry,
      text,
      pinyin,
      index: numericIndex,
      id: entry.id || `${index}`,
      rawHeaderBase64: entry.rawHeaderBase64 || '',
    };
  });
}

export function normalizeWindowsPath(inputPath: string) {
  const trimmedPath = inputPath.trim().replace(/^"|"$/g, '');
  if (!trimmedPath) {
    throw new Error('Path is required');
  }

  if (path.isAbsolute(trimmedPath) && !/^[a-zA-Z]:[\\/]/.test(trimmedPath)) {
    return path.normalize(trimmedPath);
  }

  const driveMatch = trimmedPath.match(/^([a-zA-Z]):[\\/](.*)$/);
  if (driveMatch) {
    const [, driveLetter, rest] = driveMatch;
    if (process.platform === 'win32') {
      return path.win32.normalize(trimmedPath);
    }

    return path.posix.join('/mnt', driveLetter.toLowerCase(), rest.replace(/\\/g, '/'));
  }

  if (trimmedPath.startsWith('\\\\')) {
    const normalizedNetworkPath = trimmedPath.replace(/\\/g, '/');
    return process.platform === 'win32' ? path.win32.normalize(trimmedPath) : normalizedNetworkPath;
  }

  return path.normalize(trimmedPath.replace(/\\/g, path.sep));
}

export function scanLexDirectory(inputPath: string): LexDirectoryScanResult {
  const resolvedPath = normalizeWindowsPath(inputPath);
  const stats = fs.statSync(resolvedPath);
  const directoryPath = stats.isDirectory() ? resolvedPath : path.dirname(resolvedPath);
  const selectedFileName =
    stats.isFile() && resolvedPath.toLowerCase().endsWith('.lex') ? path.basename(resolvedPath) : null;

  const files = fs
    .readdirSync(directoryPath, { withFileTypes: true })
    .filter((entry) => entry.isFile() && entry.name.toLowerCase().endsWith('.lex'))
    .map((entry) => entry.name)
    .sort((left, right) => left.localeCompare(right, 'zh-Hans-CN'));

  return {
    inputPath: toWindowsDisplayPath(inputPath),
    directoryPath: toWindowsDisplayPath(directoryPath),
    files,
    selectedFilePath:
      toWindowsDisplayPath(
        selectedFileName
          ? path.join(directoryPath, selectedFileName)
          : files[0]
            ? path.join(directoryPath, files[0])
            : '',
      ) || null,
  };
}

export function loadLexFile(filePath: string): LoadedLexFile {
  const parsedFile = parseLexBuffer(filePath, fs.readFileSync(filePath));

  return {
    filePath: toWindowsDisplayPath(filePath),
    fileName: path.basename(filePath),
    directoryPath: toWindowsDisplayPath(path.dirname(filePath)),
    count: parsedFile.count,
    exportTime: parsedFile.exportTime,
    recordStart: parsedFile.recordStart,
    backups: listLexBackups(filePath),
    entries: parsedFile.entries.map(toSerializedEntry),
  };
}

export function saveLexFile(filePath: string, entries: LexEntry[]) {
  const previousFile = fs.existsSync(filePath) ? parseLexBuffer(filePath, fs.readFileSync(filePath)) : undefined;
  const nextEntries = sanitizeLexEntries(entries);
  rotateLexBackups(filePath);
  fs.writeFileSync(filePath, buildLexBuffer(nextEntries, previousFile));
  return loadLexFile(filePath);
}

export function restoreLexBackup(filePath: string, backupIndex: number) {
  if (!Number.isInteger(backupIndex) || backupIndex < 0 || backupIndex >= BACKUP_COUNT) {
    throw new Error(`Backup index must be between 0 and ${BACKUP_COUNT - 1}`);
  }

  const backupPath = getBackupPath(filePath, backupIndex);
  if (!fs.existsSync(backupPath)) {
    throw new Error(`Backup ${backupIndex} does not exist`);
  }

  const backupBuffer = fs.readFileSync(backupPath);
  rotateLexBackups(filePath);
  fs.writeFileSync(filePath, backupBuffer);
  return loadLexFile(filePath);
}

export function parseImportText(content: string, existingEntries: LexEntry[]) {
  const lines = content.replace(/\r\n/g, '\n').split('\n');
  const nextEntries = existingEntries.map((entry) => ({ ...entry }));
  const dedupe = new Set(nextEntries.map((entry) => `${entry.pinyin}\u0000${entry.text}`));
  const perPinyinMaxIndex = new Map<string, number>();

  for (const entry of nextEntries) {
    const currentMax = perPinyinMaxIndex.get(entry.pinyin) ?? 0;
    perPinyinMaxIndex.set(entry.pinyin, Math.max(currentMax, entry.index));
  }

  for (let index = 0; index < lines.length; index += 1) {
    const line = lines[index].trim();
    if (!line || line.startsWith('#')) {
      continue;
    }

    const separatorIndex = line.lastIndexOf('/');
    if (separatorIndex <= 0 || separatorIndex === line.length - 1) {
      throw new Error(`Import line ${index + 1} must use the format phrase/pinyin`);
    }

    const text = line.slice(0, separatorIndex).trim();
    const pinyin = line.slice(separatorIndex + 1).trim();
    if (!text || !pinyin) {
      throw new Error(`Import line ${index + 1} must include both phrase and pinyin`);
    }

    const dedupeKey = `${pinyin}\u0000${text}`;
    if (dedupe.has(dedupeKey)) {
      continue;
    }

    const nextIndex = (perPinyinMaxIndex.get(pinyin) ?? 0) + 1;
    if (nextIndex > 9) {
      throw new Error(`Pinyin ${pinyin} exceeds the maximum supported index count`);
    }

    nextEntries.push({
      id: crypto.randomUUID(),
      text,
      pinyin,
      index: nextIndex,
      rawHeaderBase64: existingEntries[0]?.rawHeaderBase64 ?? '',
    });
    dedupe.add(dedupeKey);
    perPinyinMaxIndex.set(pinyin, nextIndex);
  }

  return nextEntries;
}
