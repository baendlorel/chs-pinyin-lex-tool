import { Alert, Dialog, LinearProgress, TextField } from '@ktjs/mui';
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
const resolvedDirectory = ref('');
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

const busy = computed(() => loading.value || saving.value, [loading, saving]);
const hasActiveFile = computed(() => loadedFilePath.value !== '', [loadedFilePath]);
const hasNoActiveFile = computed(() => !hasActiveFile.value, [hasActiveFile]);
const progressClassName = computed(() => `progress-wrap ${busy.value ? '' : 'is-hidden'}`, [busy]);

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
const rawError = computed(() => rawValidation.value.error ?? '', [rawValidation]);
const rawStatusClassName = computed(
  () => (rawValidation.value.error ? 'raw-status raw-status-error' : 'raw-status raw-status-ready'),
  [rawValidation],
);
const rawStatusText = computed(
  () => rawValidation.value.error ?? `当前 raw 内容可解析为 ${rawValidation.value.entries.length} 条词条。`,
  [rawValidation],
);

function formatTimestamp(timestamp: number | null) {
  if (!timestamp) {
    return '未加载';
  }

  return new Date(timestamp * 1000).toLocaleString('zh-CN');
}

function formatBackupTime(value: string | null) {
  if (!value) {
    return '暂不可用';
  }

  return new Date(value).toLocaleString('zh-CN');
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
  resolvedDirectory.value = document.directoryPath;
  loadedFilePath.value = document.filePath;
  selectedFileName.value = document.fileName;
  exportTime.value = document.exportTime;
  recordStart.value = document.recordStart;
  entries.value = document.entries;
  backups.value = document.backups;
  rawSourceEntries.value = document.entries.map((entry) => ({ ...entry }));
  rawEditorText.value = serializeEntriesToRaw(document.entries);
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
    resolvedDirectory.value = result.directoryPath;
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

const alertView = computed(() => {
  const current = alertState.value;
  if (!current) {
    return '';
  }

  return (
    <Alert severity={current.severity} variant="filled" on:close={() => (alertState.value = null)}>
      {current.text}
    </Alert>
  );
}, [alertState]);

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
          <div>
            {/* <p class="app-kicker"></p> */}
            <h1 class="app-title">Microsoft Pinyin Lex 编辑器</h1>
          </div>
          {/* <p class="app-note">启动时会自动恢复上次成功打开的路径并重新扫描。</p> */}
        </div>

        <input
          ref={importFileInput}
          type="file"
          accept=".txt,text/plain"
          style="display:none"
          on:change={handleImportFileChange}
        />

        <div class="ribbon-row">
          <label class="toolbar-field path-field">
            <span class="toolbar-label">路径</span>
            <input
              class="toolbar-input"
              value={directoryInput}
              placeholder="C:\\Users\\Alice\\AppData\\Local\\Microsoft\\InputMethod 或 .lex 文件"
              on:input={(event) => {
                directoryInput.value = (event.currentTarget as HTMLInputElement).value;
              }}
            />
          </label>

          <label class="toolbar-field file-field">
            <span class="toolbar-label">词库文件</span>
            <select
              class="toolbar-select"
              value={selectedFileName}
              disabled={lexFiles.map((items) => items.length === 0 || busy.value)}
              on:change={(event) => {
                const nextFileName = (event.currentTarget as HTMLSelectElement).value;
                selectedFileName.value = nextFileName;
                void loadCurrentFile(nextFileName);
              }}
            >
              <option value="">先扫描目录</option>
              <KTFor
                list={lexFiles}
                key={(fileName) => fileName}
                map={(fileName) => <option value={fileName}>{fileName}</option>}
              ></KTFor>
            </select>
          </label>

          <div class="toolbar-actions">
            <button type="button" class="toolbar-button" disabled={busy} on:click={() => void scanDirectory()}>
              <svg viewBox="0 0 24 24" aria-hidden="true">
                <path d="M11 4a7 7 0 1 0 6.1 10.4l2.7 2.7 1.4-1.4-2.7-2.7A7 7 0 0 0 11 4Zm0 2a5 5 0 1 1 0 10a5 5 0 0 1 0-10Z"></path>
              </svg>
              <span>扫描</span>
            </button>

            <button
              type="button"
              class="toolbar-button"
              disabled={busy.map((value) => value || !hasActiveFile.value)}
              on:click={() => void loadCurrentFile()}
            >
              <svg viewBox="0 0 24 24" aria-hidden="true">
                <path d="M12 5V2L7 6l5 4V7c3.3 0 6 2.7 6 6a6 6 0 0 1-10.2 4.2l-1.4 1.4A8 8 0 1 0 12 5Z"></path>
              </svg>
              <span>重载</span>
            </button>

            <button
              type="button"
              class="toolbar-button"
              disabled={busy.map((value) => value || !hasActiveFile.value)}
              on:click={() => importFileInput.value?.click()}
            >
              <svg viewBox="0 0 24 24" aria-hidden="true">
                <path d="M11 3h2v8.2l2.6-2.6L17 10l-5 5l-5-5l1.4-1.4L11 11.2V3Zm-6 14h14v2H5v-2Z"></path>
              </svg>
              <span>导入</span>
            </button>

            <button
              type="button"
              class="toolbar-button toolbar-button-primary"
              disabled={busy.map((value) => value || !hasActiveFile.value)}
              on:click={() => void saveEntries()}
            >
              <svg viewBox="0 0 24 24" aria-hidden="true">
                <path d="M5 3h11l3 3v15H5V3Zm2 2v14h10V7.2L15.8 5H15v4H9V5H7Zm4 0v2h2V5h-2Zm-2 8h6v4H9v-4Z"></path>
              </svg>
              <span>保存</span>
            </button>
          </div>
        </div>

        <div class="ribbon-meta">
          <div class="meta-chip">当前文件：{selectedFileName.map((value) => value || '未选择')}</div>
          <div class="meta-chip">词条数量：{entryLabel}</div>
          <div class="meta-chip">导出时间：{exportTime.map((value) => formatTimestamp(value))}</div>
          <div class="meta-chip">
            Record Start：{recordStart.map((value) => (value === null ? '0x--' : `0x${value.toString(16)}`))}
          </div>
          <div class="meta-chip meta-chip-path">目录：{resolvedDirectory.map((value) => value || '等待扫描')}</div>
        </div>

        <div class="backup-strip">
          <span class="toolbar-label">恢复备份</span>
          <KTFor
            list={backups}
            key={(backup) => backup.index}
            map={(backup) => (
              <button
                type="button"
                class="backup-button"
                disabled={busy.map((value) => value || !backup.exists, [busy, backups])}
                title={backup.exists ? formatBackupTime(backup.updatedAt) : '当前槽位暂无备份文件'}
                on:click={() => void restoreBackup(backup.index)}
              >
                <span>{`bak${backup.index}`}</span>
                <small>{backup.exists ? formatBackupTime(backup.updatedAt) : '空'}</small>
              </button>
            )}
          ></KTFor>
        </div>

        <div class="status-banner">{alertView}</div>
        <div class={progressClassName}>
          <LinearProgress variant="indeterminate" color="warning"></LinearProgress>
        </div>
      </header>

      <section class="editor-frame">
        <article k-if={hasActiveFile} class="editor-sheet">
          <header class="document-header">
            <p class="document-kicker">RAW DOCUMENT</p>
            <h2 class="document-title">{selectedFileName}</h2>
            <p class="document-note">
              每行格式为 词条/拼音/排位。若字段中需要包含 / 或 \\，请写成 \/ 与 \\\\。可选第 4 段为附加属性值。
            </p>
          </header>

          <div class={rawStatusClassName}>{rawStatusText}</div>

          <textarea
            class="raw-editor"
            value={rawEditorText}
            placeholder="例如：自定义词/zi ding yi ci/1"
            on:input={(event) => {
              rawEditorText.value = (event.currentTarget as HTMLTextAreaElement).value;
            }}
          ></textarea>

          <p k-if={rawError} class="document-warning">
            {rawError}
          </p>
        </article>

        <div k-if={hasNoActiveFile} class="empty-state">
          <div class="empty-card">
            <div class="empty-icon">
              <svg viewBox="0 0 24 24" aria-hidden="true">
                <path d="M6 3h9l5 5v13H6V3Zm2 2v14h10V9h-4V5H8Zm2 7h6v2h-6v-2Zm0 4h4v2h-4v-2Z"></path>
              </svg>
            </div>
            <h3>先打开一个词库</h3>
            <p>
              在顶部输入 Windows 目录或某个 .lex
              文件路径，点击“扫描”。成功打开后，路径会保存在本地，下次进入会自动恢复并重新扫描。
            </p>
          </div>
        </div>
      </section>

      <Dialog
        k-model={importDialogOpen}
        title="导入词条文本"
        width="720px"
        actions={
          <div class="dialog-actions">
            <button type="button" class="dialog-button" on:click={() => (importDialogOpen.value = false)}>
              取消
            </button>
            <button
              type="button"
              class="dialog-button dialog-button-primary"
              disabled={saving}
              on:click={() => void importCurrentText()}
            >
              导入并合并
            </button>
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
