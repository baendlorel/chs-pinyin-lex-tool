import { Button, Dialog, LinearProgress, TextField } from '@ktjs/mui';
import { FolderOpen, Restore, Save } from '@ktjs/mui-icon';
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
  selectedFilePath: string | null;
}

interface RawParseResult {
  entries: LexEntry[];
  error: string | null;
}

const lexPath = ref('');
const lexPathDraft = ref('');
const lexPathDialogOpen = ref(false);
const loadedFilePath = ref('');
const entries = ref<LexEntry[]>([]);
const backups = ref<LexBackupInfo[]>([]);
const loading = ref(false);
const saving = ref(false);
const alertState = ref<AlertState | null>(null);
const exportTime = ref<number | null>(null);
const recordStart = ref<number | null>(null);
const rawEditorText = ref('');
const rawSourceEntries = ref<LexEntry[]>([]);

const busy = computed(() => loading.value || saving.value, [loading, saving]);
const hasActiveFile = computed(() => loadedFilePath.value !== '', [loadedFilePath]);
const activeFileName = computed(() => {
  const currentPath = loadedFilePath.value.trim();
  if (!currentPath) {
    return '';
  }

  const parts = currentPath.split(/[\\/]/u);
  return parts[parts.length - 1] ?? '';
}, [loadedFilePath]);

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
const entryLabel = computed(() => `${activeEntryCount.value} 词条`, [activeEntryCount]);
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

function applyLoadedDocument(doc: LoadedLexFile) {
  lexPath.value = doc.filePath;
  loadedFilePath.value = doc.filePath;
  exportTime.value = doc.exportTime;
  recordStart.value = doc.recordStart;
  entries.value = doc.entries;
  backups.value = doc.backups;
  rawSourceEntries.value = doc.entries.map((entry) => ({ ...entry }));
  rawEditorText.value = serializeEntriesToRaw(doc.entries);
  persistLastOpenPath(doc.filePath);
}

async function loadCurrentFile(filePath = lexPath.value, manageLoading = true) {
  if (!filePath.trim()) {
    showAlert('warning', '请先选择一个 .lex 文件。');
    return;
  }

  if (manageLoading) {
    loading.value = true;
  }

  try {
    const document = await requestJson<LoadedLexFile>('/api/lex/load', {
      filePath,
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
  if (!lexPath.value.trim()) {
    showAlert('warning', '请先输入目录或 .lex 文件路径。');
    return;
  }

  loading.value = true;

  try {
    const result = await requestJson<LexDirectoryScanResult>('/api/lex/scan', {
      filePath: lexPath.value,
    });
    lexPath.value = result.selectedFilePath ?? result.directoryPath;

    if (!result.selectedFilePath) {
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

    await loadCurrentFile(result.selectedFilePath, false);
  } catch (error) {
    showAlert('error', extractErrorMessage(error));
  } finally {
    loading.value = false;
  }
}

async function saveEntries() {
  if (!loadedFilePath.value) {
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
      filePath: loadedFilePath.value,
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
  if (!loadedFilePath.value) {
    return;
  }

  if (!window.confirm(`确定要恢复 bak${backupIndex} 吗？当前文件会先轮换到新的 bak0。`)) {
    return;
  }

  saving.value = true;

  try {
    const document = await requestJson<LoadedLexFile>('/api/lex/restore', {
      filePath: loadedFilePath.value,
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

let autoScanInitialized = false;

function restoreLastOpenPathAndScan() {
  if (typeof window === 'undefined') {
    return;
  }

  const savedPath = window.localStorage.getItem(LAST_OPEN_PATH_STORAGE_KEY)?.trim() ?? '';
  if (!savedPath) {
    return;
  }

  lexPath.value = savedPath;
  void scanDirectory();
}

function openLexPathDialog() {
  lexPathDraft.value = lexPath.value;
  lexPathDialogOpen.value = true;
}

function closeLexPathDialog() {
  lexPathDialogOpen.value = false;
}

async function confirmLexPath() {
  const nextPath = lexPathDraft.value.trim();
  if (!nextPath) {
    showAlert('warning', '请先输入 .lex 文件路径。');
    return;
  }

  lexPath.value = nextPath;
  closeLexPathDialog();
  await scanDirectory();
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
              {activeFileName}
            </span>
          </h1>
        </div>

        <div class="ribbon-row">
          <Button
            variant="contained"
            color="primary"
            size="small"
            disabled={busy}
            startIcon={<FolderOpen />}
            on:click={openLexPathDialog}
            iconOnly
          ></Button>
          <Button
            variant="contained"
            color="primary"
            size="small"
            disabled={busy.map((value) => value || !hasActiveFile.value, [hasActiveFile])}
            startIcon={<Save />}
            on:click={saveEntries}
            iconOnly
          ></Button>

          <div style="flex:1"></div>

          <KTFor
            list={backups}
            key={(backup) => backup.index}
            map={(backup) => (
              <Button
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
      </header>

      <section class="editor-frame">
        <div k-if={hasActiveFile} class="raw-editor-field">
          <textarea
            k-model={rawEditorText}
            class="raw-editor-field"
            multiline
            rows={30}
            fullWidth
            placeholder="例如：自定义词/zi ding yi ci/1"
          ></textarea>
        </div>
        <div k-else class="empty-state">
          <div class="empty-card">
            <div class="empty-icon">
              <FolderOpen class="empty-icon-svg" />
            </div>
            <h3>先打开一个词库</h3>
            <p>点击顶部打开按钮，输入 .lex 文件路径。成功打开后，路径会保存在本地，下次进入会自动恢复并重新扫描。</p>
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
        </div>
        <div class="status-bar-group status-bar-group-right">
          <span class="status-bar-item">导出 {exportTime.map((value) => formatTimestamp(value))}</span>
          <span class="status-bar-item">
            起始锚点 {recordStart.map((value) => (value === null ? '0x--' : `0x${value.toString(16)}`))}
          </span>
        </div>
      </footer>

      <Dialog
        k-model={lexPathDialogOpen}
        title="打开 .lex 文件"
        width="80%"
        actions={
          <div class="dialog-actions">
            <Button variant="text" color="secondary" class="dialog-button" on:click={closeLexPathDialog}>
              取消
            </Button>
            <Button
              class="dialog-button dialog-button-primary"
              variant="contained"
              color="primary"
              disabled={busy}
              startIcon={<FolderOpen class="dialog-button-icon" />}
              on:click={confirmLexPath}
            >
              打开
            </Button>
          </div>
        }
      >
        <TextField
          k-model={lexPathDraft}
          fullWidth
          size="small"
          label=".lex 文件路径"
          placeholder="C:\\Users\\...\\InputMethod\\xxx.lex"
          on:change={(value) => {
            lexPathDraft.value = String(value);
          }}
        ></TextField>
      </Dialog>
    </main>
  );
}

document.getElementById('app')!.appendChild(<App />);
