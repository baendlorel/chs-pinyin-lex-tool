import { Button, Dialog, LinearProgress, TextField } from '@ktjs/mui';
import { FolderOpen, Save } from '@ktjs/mui-icon';
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

interface LoadedLexFile {
  filePath: string;
  fileName: string;
  directoryPath: string;
  count: number;
  exportTime: number;
  recordStart: number;
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

interface OpenFileTab {
  filePath: string;
  fileName: string;
  exportTime: number | null;
  recordStart: number | null;
  rawSourceEntries: LexEntry[];
  rawText: string;
  savedRawText: string;
}

const lexPath = ref('');
const lexPathDraft = ref('');
const lexPathDialogOpen = ref(false);
const loadedFilePath = ref('');
const openTabs = ref<OpenFileTab[]>([]);
const entries = ref<LexEntry[]>([]);
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
const fileTabs = computed(
  () =>
    openTabs.value.map((tab) => ({
      ...tab,
      active: tab.filePath === loadedFilePath.value,
      dirty: tab.rawText !== tab.savedRawText,
    })),
  [openTabs, loadedFilePath],
);
const hasOpenTabs = computed(() => openTabs.value.length > 0, [openTabs]);
const activeTabIsDirty = computed(
  () => fileTabs.value.find((tab) => tab.filePath === loadedFilePath.value)?.dirty ?? false,
  [fileTabs, loadedFilePath],
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

function clearActiveEditorState() {
  loadedFilePath.value = '';
  entries.value = [];
  exportTime.value = null;
  recordStart.value = null;
  rawSourceEntries.value = [];
  rawEditorText.value = '';
}

function syncEditorFromTab(tab: OpenFileTab | null) {
  if (!tab) {
    clearActiveEditorState();
    return;
  }

  loadedFilePath.value = tab.filePath;
  lexPath.value = tab.filePath;
  entries.value = tab.rawSourceEntries.map((entry) => ({ ...entry }));
  exportTime.value = tab.exportTime;
  recordStart.value = tab.recordStart;
  rawSourceEntries.value = tab.rawSourceEntries.map((entry) => ({ ...entry }));
  rawEditorText.value = tab.rawText;
}

function activateTab(filePath: string) {
  const nextTab = openTabs.value.find((tab) => tab.filePath === filePath) ?? null;
  syncEditorFromTab(nextTab);
}

function upsertTab(tab: OpenFileTab) {
  const nextTabs = openTabs.value.slice();
  const existingIndex = nextTabs.findIndex((item) => item.filePath === tab.filePath);
  if (existingIndex >= 0) {
    nextTabs[existingIndex] = tab;
  } else {
    nextTabs.push(tab);
  }

  openTabs.value = nextTabs;
}

function closeTab(filePath: string) {
  const currentTabs = openTabs.value;
  const closingIndex = currentTabs.findIndex((tab) => tab.filePath === filePath);
  if (closingIndex < 0) {
    return;
  }

  const closingTab = currentTabs[closingIndex];
  if (closingTab.rawText !== closingTab.savedRawText) {
    const confirmed = window.confirm(`关闭 ${closingTab.fileName} 前放弃未保存更改？`);
    if (!confirmed) {
      return;
    }
  }

  const nextTabs = currentTabs.filter((tab) => tab.filePath !== filePath);
  openTabs.value = nextTabs;

  if (loadedFilePath.value !== filePath) {
    return;
  }

  const nextActiveTab = nextTabs[closingIndex] ?? nextTabs[closingIndex - 1] ?? null;
  syncEditorFromTab(nextActiveTab);
}

function updateActiveTabRawText(nextRawText: string) {
  rawEditorText.value = nextRawText;

  const activeIndex = openTabs.value.findIndex((tab) => tab.filePath === loadedFilePath.value);
  if (activeIndex < 0) {
    return;
  }

  const nextTabs = openTabs.value.slice();
  nextTabs[activeIndex] = {
    ...nextTabs[activeIndex],
    rawText: nextRawText,
  };
  openTabs.value = nextTabs;
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
  const rawText = serializeEntriesToRaw(doc.entries);
  upsertTab({
    filePath: doc.filePath,
    fileName: doc.fileName,
    exportTime: doc.exportTime,
    recordStart: doc.recordStart,
    rawSourceEntries: doc.entries.map((entry) => ({ ...entry })),
    rawText,
    savedRawText: rawText,
  });
  activateTab(doc.filePath);
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
      clearActiveEditorState();
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
    showAlert('success', `已保存 ${document.entries.length} 条词条。`);
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

function handleGlobalKeydown(event: KeyboardEvent) {
  if (!(event.ctrlKey || event.metaKey) || event.key.toLowerCase() !== 's') {
    return;
  }

  event.preventDefault();
  if (busy.value || !hasActiveFile.value) {
    return;
  }

  void saveEntries();
}

if (typeof window !== 'undefined' && !autoScanInitialized) {
  autoScanInitialized = true;
  window.addEventListener('keydown', handleGlobalKeydown);
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
        </div>
      </header>

      <section class="editor-frame">
        <div k-if={hasOpenTabs} class="file-tabs">
          <KTFor
            list={fileTabs}
            key={(tab) => tab.filePath}
            map={(tab) => (
              <div class={tab.active ? 'file-tab is-active' : 'file-tab'}>
                <button class="file-tab-trigger" type="button" on:click={() => activateTab(tab.filePath)}>
                  <span class="file-tab-label">{tab.fileName}</span>
                  <span k-if={tab.dirty} class="file-tab-dirty">
                    *
                  </span>
                </button>
                <button
                  class="file-tab-close"
                  type="button"
                  aria-label={`关闭 ${tab.fileName}`}
                  on:click={(event) => {
                    event.stopPropagation();
                    closeTab(tab.filePath);
                  }}
                >
                  ×
                </button>
              </div>
            )}
          ></KTFor>
        </div>
        <div k-if={hasActiveFile} class="raw-editor-wrap">
          <textarea
            class="raw-editor-field"
            value={rawEditorText}
            rows={30}
            placeholder="例如：自定义词/zi ding yi ci/1"
            on:input={(event) => {
              updateActiveTabRawText((event.currentTarget as HTMLTextAreaElement).value);
            }}
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
          <span k-if={activeTabIsDirty} class="status-bar-item">
            未保存
          </span>
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
