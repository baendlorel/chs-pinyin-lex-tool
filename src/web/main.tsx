import { Button, Dialog, LinearProgress, Select, TextField } from '@ktjs/mui';
import { FolderOpen, Refresh, Restore, Save, Search, UploadFile } from '@ktjs/mui-icon';
import { KTFor, computed, ref } from 'kt.js';

import './style.css';

const LAST_OPEN_PATH_STORAGE_KEY = 'chs-pinyin-lex-tool:last-open-path';

type AlertSeverity = 'error' | 'success' | 'warning';

interface AlertState {
  severity: AlertSeverity;
  text: string;
}

interface LexEntry {
  id: string;
  pinyin: string;
  text: string;
  index: number;
  rawHeaderBase64: string;
}

interface LexBackupInfo {
  index: number;
  path: string;
  exists: boolean;
  updatedAt: string | null;
}

interface LoadedLexFile {
  filePath: string;
  fileName: string;
  directoryPath: string;
  count: number;
  exportTime: number;
  recordStart: number;
  backups: LexBackupInfo[];
  entries: LexEntry[];
}

interface LexDirectoryScanResult {
  inputPath: string;
  directoryPath: string;
  files: string[];
  selectedFileName: string | null;
}

interface RawParseResult {
  entries: LexEntry[];
  error: string | null;
}

const directoryInput = ref('');
const selectedFileName = ref('');
const loadedFilePath = ref('');
const entries = ref<LexEntry[]>([]);
const backups = ref<LexBackupInfo[]>([]);
const lexFiles = ref<string[]>([]);
const loading = ref(false);
const saving = ref(false);
const importDialogOpen = ref(false);
const importText = ref('');
const alertState = ref<AlertState | null>(null);
const exportTime = ref<number | null>(null);
const recordStart = ref<number | null>(null);
const importFileInput = ref<HTMLInputElement>();
const rawEditorText = ref('');
const rawSourceEntries = ref<LexEntry[]>([]);
const searchQuery = ref('');
const searchCursor = ref(-1);
const searchLine = ref<number | null>(null);
const searchPerformed = ref(false);
const lastSearchQuery = ref('');
const rawEditorSurface = ref<HTMLDivElement>();

const busy = computed(() => loading.value || saving.value, [loading, saving]);
const fileOptions = computed(
  () => lexFiles.value.map((fileName) => ({ value: fileName, label: fileName })),
  [lexFiles],
);
const hasActiveFile = computed(() => loadedFilePath.value !== '', [loadedFilePath]);
const hasNoActiveFile = computed(() => !hasActiveFile.value, [hasActiveFile]);
const hasSearchQuery = computed(() => searchQuery.value.trim() !== '', [searchQuery]);
const progressClassName = computed(() => `progress-wrap ${busy.value ? '' : 'is-hidden'}`, [busy]);
const searchButtonDisabled = computed(
  () => busy.value || !hasActiveFile.value || !hasSearchQuery.value,
  [busy, hasActiveFile, hasSearchQuery],
);

function extractErrorMessage(error: unknown) {
  if (error instanceof Error) {
    return error.message;
  }

  return 'Unknown error';
}

function showAlert(severity: AlertSeverity, text: string) {
  alertState.value = { severity, text };
}

function persistLastOpenPath(filePath: string) {
  if (typeof window === 'undefined') {
    return;
  }

  const trimmedPath = filePath.trim();
  if (trimmedPath) {
    window.localStorage.setItem(LAST_OPEN_PATH_STORAGE_KEY, trimmedPath);
    return;
  }

  window.localStorage.removeItem(LAST_OPEN_PATH_STORAGE_KEY);
}

function escapeRawField(value: string) {
  return value.replaceAll('\\', '\\\\').replaceAll('/', '\\/');
}

function splitRawLine(line: string) {
  const parts: string[] = [];
  let current = '';
  let escaped = false;

  for (const char of line) {
    if (escaped) {
      current += char;
      escaped = false;
      continue;
    }

    if (char === '\\') {
      escaped = true;
      continue;
    }

    if (char === '/') {
      parts.push(current);
      current = '';
      continue;
    }

    current += char;
  }

  if (escaped) {
    current += '\\';
  }

  parts.push(current);
  return parts;
}

function serializeEntriesToRaw(sourceEntries: LexEntry[]) {
  return sourceEntries
    .map((entry) => [escapeRawField(entry.text), escapeRawField(entry.pinyin), String(entry.index)].join('/'))
    .join('\n');
}

function parseRawEntries(rawText: string, sourceEntries: LexEntry[]): RawParseResult {
  const nextEntries: LexEntry[] = [];
  const templateHeader = sourceEntries[0]?.rawHeaderBase64 ?? entries.value[0]?.rawHeaderBase64 ?? '';
  const lines = rawText.split(/\r?\n/u);

  for (let lineIndex = 0; lineIndex < lines.length; lineIndex += 1) {
    const line = lines[lineIndex];
    if (line.trim() === '') {
      continue;
    }

    const fields = splitRawLine(line);
    if (fields.length < 3 || fields.length > 4) {
      return {
        entries: sourceEntries,
        error: `第 ${lineIndex + 1} 行格式错误，应为 词条/拼音/排位，可选第 4 项为附加属性。`,
      };
    }

    const indexValue = Number(fields[2]);
    if (!Number.isInteger(indexValue) || indexValue < 1 || indexValue > 9) {
      return {
        entries: sourceEntries,
        error: `第 ${lineIndex + 1} 行的排位必须是 1 到 9 之间的整数。`,
      };
    }

    const sourceEntry = sourceEntries[nextEntries.length];
    nextEntries.push({
      id: sourceEntry?.id ?? crypto.randomUUID(),
      text: fields[0],
      pinyin: fields[1],
      index: indexValue,
      rawHeaderBase64: fields[3] ?? sourceEntry?.rawHeaderBase64 ?? templateHeader,
    });
  }

  return {
    entries: nextEntries,
    error: null,
  };
}

const rawValidation = computed(
  () => parseRawEntries(rawEditorText.value, rawSourceEntries.value),
  [rawEditorText, rawSourceEntries],
);
const activeEntryCount = computed(() => rawValidation.value.entries.length, [rawValidation]);
const entryLabel = computed(() => `${activeEntryCount.value} 条`, [activeEntryCount]);
const searchStatusText = computed(() => {
  const keyword = searchQuery.value.trim();

  if (!keyword || !searchPerformed.value) {
    return '';
  }

  if (searchLine.value === null) {
    return `未找到 ${keyword}`;
  }

  return `搜索 第 ${searchLine.value} 行`;
}, [searchLine, searchPerformed, searchQuery]);
const statusBarNoticeText = computed(() => {
  const current = alertState.value;
  if (current) {
    return current.text;
  }

  if (rawValidation.value.error) {
    return rawValidation.value.error;
  }

  if (saving.value) {
    return '正在保存...';
  }

  if (loading.value) {
    return '正在处理...';
  }

  return hasActiveFile.value ? '就绪' : '等待打开文件';
}, [alertState, hasActiveFile, loading, rawValidation, saving]);
const statusBarNoticeClassName = computed(() => {
  const current = alertState.value;
  if (current) {
    return `status-bar-item status-bar-notice is-${current.severity}`;
  }

  if (rawValidation.value.error) {
    return 'status-bar-item status-bar-notice is-warning';
  }

  return 'status-bar-item status-bar-notice';
}, [alertState, rawValidation]);

function formatTimestamp(timestamp: number | null) {
  if (!timestamp) {
    return '未加载';
  }

  return new Date(timestamp * 1000).toLocaleString('zh-CN');
}

async function requestJson<T>(input: string, body?: unknown) {
  const response = await fetch(input, {
    method: body === undefined ? 'GET' : 'POST',
    headers: body === undefined ? undefined : { 'content-type': 'application/json' },
    body: body === undefined ? undefined : JSON.stringify(body),
  });
  const text = await response.text();
  const data = text ? (JSON.parse(text) as T | { error?: string }) : undefined;
  if (!response.ok) {
    const message =
      data && typeof data === 'object' && 'error' in data && typeof data.error === 'string'
        ? data.error
        : `Request failed with status ${response.status}`;
    throw new Error(message);
  }

  return (data ?? {}) as T;
}

function applyLoadedDocument(document: LoadedLexFile) {
  directoryInput.value = document.filePath;
  loadedFilePath.value = document.filePath;
  selectedFileName.value = document.fileName;
  exportTime.value = document.exportTime;
  recordStart.value = document.recordStart;
  entries.value = document.entries;
  backups.value = document.backups;
  rawSourceEntries.value = document.entries.map((entry) => ({ ...entry }));
  rawEditorText.value = serializeEntriesToRaw(document.entries);
  searchQuery.value = '';
  searchCursor.value = -1;
  searchLine.value = null;
  searchPerformed.value = false;
  lastSearchQuery.value = '';
  persistLastOpenPath(document.filePath);

  if (!lexFiles.value.includes(document.fileName)) {
    lexFiles.value = [...lexFiles.value, document.fileName].sort((left, right) =>
      left.localeCompare(right, 'zh-Hans-CN'),
    );
  }
}

async function loadCurrentFile(fileName = selectedFileName.value, manageLoading = true) {
  if (!fileName) {
    showAlert('warning', '请先选择一个 .lex 文件。');
    return;
  }

  if (manageLoading) {
    loading.value = true;
  }

  try {
    const document = await requestJson<LoadedLexFile>('/api/lex/load', {
      directoryPath: directoryInput.value,
      fileName,
    });
    applyLoadedDocument(document);
    showAlert('success', `已加载 ${document.fileName}。`);
  } catch (error) {
    showAlert('error', extractErrorMessage(error));
  } finally {
    if (manageLoading) {
      loading.value = false;
    }
  }
}

async function scanDirectory() {
  if (!directoryInput.value.trim()) {
    showAlert('warning', '请先输入目录或 .lex 文件路径。');
    return;
  }

  loading.value = true;

  try {
    const result = await requestJson<LexDirectoryScanResult>('/api/lex/scan', {
      directoryPath: directoryInput.value,
    });
    directoryInput.value = result.selectedFileName
      ? `${result.directoryPath}/${result.selectedFileName}`
      : result.directoryPath;
    lexFiles.value = result.files;
    selectedFileName.value = result.selectedFileName ?? '';

    if (!result.selectedFileName) {
      persistLastOpenPath(result.directoryPath);
      loadedFilePath.value = '';
      entries.value = [];
      backups.value = [];
      exportTime.value = null;
      recordStart.value = null;
      rawEditorText.value = '';
      rawSourceEntries.value = [];
      showAlert('warning', '该目录下没有发现 .lex 文件。');
      return;
    }

    await loadCurrentFile(result.selectedFileName, false);
  } catch (error) {
    showAlert('error', extractErrorMessage(error));
  } finally {
    loading.value = false;
  }
}

async function saveEntries() {
  if (!selectedFileName.value) {
    showAlert('warning', '请先加载一个 .lex 文件。');
    return;
  }

  if (rawValidation.value.error) {
    showAlert('error', rawValidation.value.error);
    return;
  }

  saving.value = true;

  try {
    const document = await requestJson<LoadedLexFile>('/api/lex/save', {
      directoryPath: directoryInput.value,
      fileName: selectedFileName.value,
      entries: rawValidation.value.entries,
    });
    applyLoadedDocument(document);
    showAlert('success', `已保存 ${document.entries.length} 条词条，并写入新的 bak0 备份。`);
  } catch (error) {
    showAlert('error', extractErrorMessage(error));
  } finally {
    saving.value = false;
  }
}

async function restoreBackup(backupIndex: number) {
  if (!selectedFileName.value) {
    return;
  }

  if (!window.confirm(`确定要恢复 bak${backupIndex} 吗？当前文件会先轮换到新的 bak0。`)) {
    return;
  }

  saving.value = true;

  try {
    const document = await requestJson<LoadedLexFile>('/api/lex/restore', {
      directoryPath: directoryInput.value,
      fileName: selectedFileName.value,
      backupIndex,
    });
    applyLoadedDocument(document);
    showAlert('success', `已恢复 bak${backupIndex}。`);
  } catch (error) {
    showAlert('error', extractErrorMessage(error));
  } finally {
    saving.value = false;
  }
}

async function importCurrentText() {
  if (!selectedFileName.value) {
    showAlert('warning', '请先加载一个 .lex 文件。');
    return;
  }

  saving.value = true;

  try {
    const document = await requestJson<LoadedLexFile>('/api/lex/import', {
      directoryPath: directoryInput.value,
      fileName: selectedFileName.value,
      content: importText.value,
    });
    applyLoadedDocument(document);
    importDialogOpen.value = false;
    showAlert('success', '导入完成，新增内容已经合并到当前词库。');
  } catch (error) {
    showAlert('error', extractErrorMessage(error));
  } finally {
    saving.value = false;
  }
}

async function handleImportFileChange(event: Event) {
  const target = event.currentTarget as HTMLInputElement | null;
  const file = target?.files?.[0];
  if (!file) {
    return;
  }

  importText.value = await file.text();
  importDialogOpen.value = true;
  if (target) {
    target.value = '';
  }
}

let autoScanInitialized = false;

function restoreLastOpenPathAndScan() {
  if (typeof window === 'undefined') {
    return;
  }

  const savedPath = window.localStorage.getItem(LAST_OPEN_PATH_STORAGE_KEY)?.trim() ?? '';
  if (!savedPath) {
    return;
  }

  directoryInput.value = savedPath;
  void scanDirectory();
}

function getRawEditorTextarea() {
  return rawEditorSurface.value?.querySelector('textarea') ?? null;
}

function locateSearchMatch(resetFromStart = false, queryOverride?: string) {
  const keyword = (queryOverride ?? searchQuery.value).trim();

  if (!keyword) {
    searchCursor.value = -1;
    searchLine.value = null;
    searchPerformed.value = false;
    lastSearchQuery.value = '';
    return;
  }

  const content = rawEditorText.value;
  const shouldReset = resetFromStart || lastSearchQuery.value !== keyword || searchCursor.value < 0;
  let matchIndex = content.indexOf(keyword, shouldReset ? 0 : searchCursor.value + 1);

  if (matchIndex === -1 && !shouldReset) {
    matchIndex = content.indexOf(keyword, 0);
  }

  searchPerformed.value = true;
  lastSearchQuery.value = keyword;

  if (matchIndex === -1) {
    searchCursor.value = -1;
    searchLine.value = null;
    return;
  }

  searchCursor.value = matchIndex;
  searchLine.value = content.slice(0, matchIndex).split(/\r?\n/u).length;

  if (typeof window === 'undefined') {
    return;
  }

  window.requestAnimationFrame(() => {
    const target = getRawEditorTextarea();
    if (!target) {
      return;
    }

    const lineIndex = content.slice(0, matchIndex).split(/\r?\n/u).length - 1;
    const lineHeight = Number.parseFloat(window.getComputedStyle(target).lineHeight) || 24;

    target.focus();
    target.setSelectionRange(matchIndex, matchIndex + keyword.length);
    target.scrollTop = Math.max(lineIndex * lineHeight - target.clientHeight * 0.35, 0);
  });
}

function handleSearchInput(value: string) {
  searchQuery.value = value;

  if (!value.trim()) {
    searchCursor.value = -1;
    searchLine.value = null;
    searchPerformed.value = false;
    lastSearchQuery.value = '';
    return;
  }

  searchCursor.value = -1;
  searchLine.value = null;
  searchPerformed.value = false;
  lastSearchQuery.value = '';
  locateSearchMatch(true, value);
}

if (typeof window !== 'undefined' && !autoScanInitialized) {
  autoScanInitialized = true;
  window.setTimeout(() => {
    restoreLastOpenPathAndScan();
  }, 0);
}

function App() {
  return (
    <main class="app-shell">
      <header class="ribbon-shell">
        <div class="ribbon-topline">
          <h1 class="app-title">
            <span class="app-title-main">Microsoft Pinyin Lex 编辑器</span>
            <span k-if={hasActiveFile} class="app-title-file">
              {selectedFileName}
            </span>
          </h1>
        </div>

        <input
          ref={importFileInput}
          type="file"
          accept=".txt,text/plain"
          style="display:none"
          on:change={handleImportFileChange}
        />

        <div class="ribbon-row">
          <TextField
            class="toolbar-text-field"
            k-model={directoryInput}
            fullWidth
            size="small"
            placeholder="C:\\Users\\Alice\\AppData\\Local\\Microsoft\\InputMethod 或 .lex 文件"
          ></TextField>

          <Select
            class="toolbar-select-field"
            value={selectedFileName}
            options={fileOptions}
            placeholder="选择 .lex 文件"
            fullWidth
            disabled={lexFiles.map((items) => items.length === 0 || busy.value)}
            on:change={(value) => {
              const nextFileName = String(value);
              selectedFileName.value = nextFileName;
              void loadCurrentFile(nextFileName);
            }}
          ></Select>

          <div class="toolbar-search">
            <TextField
              class="toolbar-search-field"
              k-model={searchQuery}
              fullWidth
              size="small"
              placeholder="搜索词汇"
              disabled={hasNoActiveFile}
              on:input={(value) => handleSearchInput(String(value))}
            ></TextField>
            <Button
              class="toolbar-action-button"
              variant="text"
              color="primary"
              size="small"
              disabled={searchButtonDisabled}
              startIcon={<Search />}
              on:click={() => locateSearchMatch()}
            >
              下一个
            </Button>
          </div>

          <div class="toolbar-actions">
            <Button
              class="toolbar-action-button"
              variant="outlined"
              color="primary"
              size="small"
              disabled={busy}
              startIcon={<Search />}
              on:click={() => void scanDirectory()}
            >
              扫描
            </Button>

            <Button
              class="toolbar-action-button"
              variant="outlined"
              color="warning"
              size="small"
              disabled={busy.map((value) => value || !hasActiveFile.value)}
              startIcon={<Refresh />}
              on:click={() => void loadCurrentFile()}
            >
              重载
            </Button>

            <Button
              class="toolbar-action-button"
              variant="outlined"
              color="secondary"
              size="small"
              disabled={busy.map((value) => value || !hasActiveFile.value)}
              startIcon={<UploadFile />}
              on:click={() => importFileInput.value?.click()}
            >
              导入
            </Button>

            <Button
              class="toolbar-action-button"
              variant="contained"
              color="success"
              size="small"
              disabled={busy.map((value) => value || !hasActiveFile.value)}
              startIcon={<Save />}
              on:click={() => void saveEntries()}
            >
              保存
            </Button>
          </div>
        </div>

        <div class="backup-strip">
          <KTFor
            list={backups}
            key={(backup) => backup.index}
            map={(backup) => (
              <Button
                class="backup-button"
                variant="text"
                color="warning"
                size="small"
                disabled={busy.map((value) => value || !backup.exists, [busy, backups])}
                startIcon={<Restore />}
                on:click={() => void restoreBackup(backup.index)}
              >
                bak{backup.index}
              </Button>
            )}
          ></KTFor>
        </div>

        <div class={progressClassName}>
          <LinearProgress variant="indeterminate" color="warning"></LinearProgress>
        </div>
      </header>

      <section class="editor-frame">
        <div k-if={hasActiveFile} class="editor-surface" ref={rawEditorSurface}>
          <TextField
            class="raw-editor-field"
            k-model={rawEditorText}
            multiline
            rows={30}
            fullWidth
            placeholder="例如：自定义词/zi ding yi ci/1"
          ></TextField>
        </div>

        <div k-if={hasNoActiveFile} class="empty-state">
          <div class="empty-card">
            <div class="empty-icon">
              <FolderOpen class="empty-icon-svg" />
            </div>
            <h3>先打开一个词库</h3>
            <p>
              在顶部输入 Windows 目录或某个 .lex
              文件路径，点击“扫描”。成功打开后，路径会保存在本地，下次进入会自动恢复并重新扫描。
            </p>
          </div>
        </div>
      </section>

      <footer class="status-bar" aria-label="document status">
        <div class="status-bar-group status-bar-group-left">
          <span
            class={statusBarNoticeClassName}
            on:click={() => {
              if (alertState.value) {
                alertState.value = null;
              }
            }}
          >
            {statusBarNoticeText}
          </span>
          <span class="status-bar-item">{entryLabel}</span>
          <span k-if={searchStatusText} class="status-bar-item">
            {searchStatusText}
          </span>
        </div>
        <div class="status-bar-group status-bar-group-right">
          <span class="status-bar-item">导出 {exportTime.map((value) => formatTimestamp(value))}</span>
          <span class="status-bar-item">
            Record Start {recordStart.map((value) => (value === null ? '0x--' : `0x${value.toString(16)}`))}
          </span>
        </div>
      </footer>

      <Dialog
        k-model={importDialogOpen}
        title="导入词条文本"
        width="720px"
        actions={
          <div class="dialog-actions">
            <Button
              variant="text"
              color="secondary"
              class="dialog-button"
              on:click={() => (importDialogOpen.value = false)}
            >
              取消
            </Button>
            <Button
              class="dialog-button dialog-button-primary"
              variant="contained"
              color="primary"
              disabled={saving}
              startIcon={<UploadFile class="dialog-button-icon" />}
              on:click={() => void importCurrentText()}
            >
              导入并合并
            </Button>
          </div>
        }
      >
        <div>
          <p class="import-helper">
            每行一条，格式固定为 词语/拼音。词语与拼音都允许包含空格，解析时以最后一个 / 为分隔符。
          </p>
          <TextField k-model={importText} multiline rows={10} fullWidth label="导入文本内容"></TextField>
        </div>
      </Dialog>
    </main>
  );
}

document.getElementById('app')!.appendChild(<App />);
