import { Alert, Button, Card, Dialog, LinearProgress, Select, TextField } from '@ktjs/mui';
import { KTFor, computed, ref } from 'kt.js';

import './style.css';

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

const busy = computed(() => loading.value || saving.value, [loading, saving]);
const fileOptions = computed(
  () => lexFiles.value.map((fileName) => ({ value: fileName, label: fileName })),
  [lexFiles],
);
const hasActiveFile = computed(() => loadedFilePath.value !== '', [loadedFilePath]);
const progressClassName = computed(() => `progress-wrap ${busy.value ? '' : 'is-hidden'}`, [busy]);
const activeEntryCount = computed(() => entries.value.length, [entries]);
const entryLabel = computed(
  () => `${activeEntryCount.value} ${activeEntryCount.value === 1 ? 'entry' : 'entries'}`,
  [activeEntryCount],
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
  resolvedDirectory.value = document.directoryPath;
  loadedFilePath.value = document.filePath;
  selectedFileName.value = document.fileName;
  exportTime.value = document.exportTime;
  recordStart.value = document.recordStart;
  entries.value = document.entries;
  backups.value = document.backups;

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
  loading.value = true;

  try {
    const result = await requestJson<LexDirectoryScanResult>('/api/lex/scan', {
      directoryPath: directoryInput.value,
    });
    resolvedDirectory.value = result.directoryPath;
    lexFiles.value = result.files;
    selectedFileName.value = result.selectedFileName ?? '';

    if (!result.selectedFileName) {
      loadedFilePath.value = '';
      entries.value = [];
      backups.value = [];
      exportTime.value = null;
      recordStart.value = null;
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

  saving.value = true;

  try {
    const document = await requestJson<LoadedLexFile>('/api/lex/save', {
      directoryPath: directoryInput.value,
      fileName: selectedFileName.value,
      entries: entries.value,
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

function addEntry() {
  entries.draft.push({
    id: crypto.randomUUID(),
    text: '',
    pinyin: '',
    index: 1,
    rawHeaderBase64: entries.value[0]?.rawHeaderBase64 ?? '',
  });
}

function removeEntry(index: number) {
  entries.draft.splice(index, 1);
}

function updateText(index: number, value: string) {
  if (index < 0 || index >= entries.value.length) {
    return;
  }

  entries.draft[index].text = value;
}

function updatePinyin(index: number, value: string) {
  if (index < 0 || index >= entries.value.length) {
    return;
  }

  entries.draft[index].pinyin = value;
}

function updateIndex(index: number, value: string) {
  if (index < 0 || index >= entries.value.length) {
    return;
  }

  const numericValue = Number(value);
  entries.draft[index].index = Number.isFinite(numericValue) ? Math.max(1, Math.min(9, Math.trunc(numericValue))) : 1;
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

function App() {
  return (
    <main class="app-shell">
      <section class="hero">
        <p class="hero-kicker">Win11 Microsoft Pinyin</p>
        <h1 class="hero-title">词库可视化管理台</h1>
        <p class="hero-subtitle">
          输入 Windows 目录后，后端会自动转换路径并扫描其中的 .lex
          文件。你可以在一个页面里完成加载、编辑、导入文本、保存和恢复最近三次备份。
        </p>
        <div class="hero-meta">
          <span class="hero-chip">当前文件：{selectedFileName.map((value) => value || '未选择')}</span>
          <span class="hero-chip">词条总数：{entryLabel}</span>
          <span class="hero-chip">最近导出：{exportTime.map((value) => formatTimestamp(value))}</span>
        </div>
        <div class="status-banner">{alertView}</div>
        <div class={progressClassName}>
          <LinearProgress variant="indeterminate" color="warning"></LinearProgress>
        </div>
      </section>

      <section class="workspace">
        <div class="stack">
          <Card class="panel" elevation={0}>
            <div class="panel-body toolbar-grid">
              <div>
                <h2 class="panel-title">目录与文件</h2>
                <p class="panel-description">
                  目录输入支持典型的 Windows 路径，例如 C:\\Users\\...\\Microsoft\\InputMethod。
                </p>
              </div>

              <TextField
                k-model={directoryInput}
                label="Windows 目录或 .lex 文件路径"
                placeholder="C:\\Users\\Alice\\AppData\\Local\\Microsoft\\InputMethod"
                fullWidth
              ></TextField>

              <div class="button-row">
                <Button variant="contained" color="primary" disabled={busy} on:click={scanDirectory}>
                  扫描并加载
                </Button>
                <Button
                  variant="outlined"
                  color="warning"
                  disabled={busy.map((value) => value || !hasActiveFile.value)}
                  on:click={() => loadCurrentFile()}
                >
                  重新加载
                </Button>
              </div>

              <Select
                k-model={selectedFileName}
                options={fileOptions}
                label="检测到的 .lex 文件"
                placeholder="先扫描目录"
                fullWidth
                disabled={lexFiles.map((items) => items.length === 0 || busy.value)}
                on:change={(value) => void loadCurrentFile(String(value))}
              ></Select>

              <div>
                <p class="fine-print">解析后的目录</p>
                <div class="path-box">{resolvedDirectory.map((value) => value || '扫描后显示转换后的实际目录')}</div>
              </div>
            </div>
          </Card>

          <Card class="panel" elevation={0}>
            <div class="panel-body">
              <h2 class="panel-title">文件概览</h2>
              <p class="panel-description">当前词库的基础信息与最近三个备份状态会在这里同步刷新。</p>
              <div class="stats-grid">
                <div class="stat-card">
                  <p class="stat-label">词条数量</p>
                  <p class="stat-value">{activeEntryCount}</p>
                </div>
                <div class="stat-card">
                  <p class="stat-label">Record Start</p>
                  <p class="stat-value">
                    {recordStart.map((value) => (value === null ? '0x--' : `0x${value.toString(16)}`))}
                  </p>
                </div>
              </div>
              <div class="backup-list">
                <KTFor
                  list={backups}
                  key={(backup) => backup.index}
                  map={(backup) => (
                    <article class="backup-item">
                      <div>
                        <p class="backup-title">{`bak${backup.index}`}</p>
                        <p class="backup-time">{formatBackupTime(backup.updatedAt)}</p>
                        <p class="fine-print">{backup.exists ? backup.path : '当前槽位暂无备份文件'}</p>
                      </div>
                    </article>
                  )}
                ></KTFor>
              </div>
            </div>
          </Card>

          <Card class="panel" elevation={0}>
            <div class="panel-body toolbar-grid">
              <div>
                <h2 class="panel-title">导入与备份</h2>
                <p class="panel-description">导入格式为 词语/拼音。若遇到已存在的完全相同词条，后端会自动去重。</p>
              </div>

              <input
                ref={importFileInput}
                type="file"
                accept=".txt,text/plain"
                style="display:none"
                on:change={handleImportFileChange}
              />

              <div class="button-row">
                <Button
                  variant="contained"
                  color="secondary"
                  disabled={busy.map((value) => value || !hasActiveFile.value)}
                  on:click={() => importFileInput.value?.click()}
                >
                  选择导入文本
                </Button>
                <Button
                  variant="outlined"
                  color="success"
                  disabled={busy.map((value) => value || !hasActiveFile.value)}
                  on:click={saveEntries}
                >
                  保存当前修改
                </Button>
              </div>

              <p class="fine-print">恢复备份会先把当前文件再轮换一次，防止二次覆盖。</p>
              <div class="backup-list">
                <KTFor
                  list={backups}
                  key={(backup) => backup.index}
                  map={(backup, index) => (
                    <article class="backup-item">
                      <div>
                        <p class="backup-title">{`bak${backup.index}`}</p>
                        <p class="backup-time">{formatBackupTime(backup.updatedAt)}</p>
                      </div>
                      <Button
                        variant="outlined"
                        color="warning"
                        disabled={busy.map((value) => value || !backup.exists, [busy, backups])}
                        on:click={() => void restoreBackup(index)}
                      >
                        恢复此版本
                      </Button>
                    </article>
                  )}
                ></KTFor>
              </div>
            </div>
          </Card>
        </div>

        <Card class="panel editor-panel" elevation={0}>
          <div class="panel-body editor-shell">
            <div class="editor-toolbar">
              <div>
                <h2 class="editor-heading">词条编辑表</h2>
                <p class="editor-note">
                  表格中的修改不会立即写回文件，点击“保存当前修改”后才会更新 .lex 并生成新的 bak0。
                </p>
              </div>
              <div class="button-row">
                <Button
                  variant="contained"
                  color="info"
                  disabled={busy.map((value) => value || !hasActiveFile.value)}
                  on:click={addEntry}
                >
                  新增词条
                </Button>
                <Button
                  variant="contained"
                  color="success"
                  disabled={busy.map((value) => value || !hasActiveFile.value)}
                  on:click={saveEntries}
                >
                  保存全部
                </Button>
              </div>
            </div>

            <div k-if={hasActiveFile} class="table-shell">
              <table class="entry-table">
                <thead>
                  <tr>
                    <th>词条</th>
                    <th>拼音 / 代码</th>
                    <th>排位</th>
                    <th>操作</th>
                  </tr>
                </thead>
                <tbody>
                  <KTFor
                    list={entries}
                    key={(entry) => entry.id}
                    map={(entry, index) => (
                      <tr>
                        <td>
                          <input
                            class="entry-input"
                            value={entry.text}
                            placeholder="词条文本"
                            on:input={(event) => updateText(index, (event.currentTarget as HTMLInputElement).value)}
                          />
                        </td>
                        <td>
                          <input
                            class="entry-input"
                            value={entry.pinyin}
                            placeholder="任意字符串"
                            on:input={(event) => updatePinyin(index, (event.currentTarget as HTMLInputElement).value)}
                          />
                        </td>
                        <td>
                          <input
                            class="entry-input entry-index"
                            type="number"
                            min="1"
                            max="9"
                            value={String(entry.index)}
                            on:input={(event) => updateIndex(index, (event.currentTarget as HTMLInputElement).value)}
                          />
                        </td>
                        <td>
                          <div class="entry-actions">
                            <Button variant="text" color="error" on:click={() => removeEntry(index)}>
                              删除
                            </Button>
                          </div>
                        </td>
                      </tr>
                    )}
                  ></KTFor>
                </tbody>
              </table>
            </div>

            <div k-else class="empty-state">
              <div>
                <div class="empty-illustration"></div>
                <h3>先加载一个词库</h3>
                <p class="panel-description">
                  输入 Windows 目录后点击“扫描并加载”。如果路径直接指向某个 .lex 文件，也可以直接解析。
                </p>
              </div>
            </div>
          </div>
        </Card>
      </section>

      <Dialog
        k-model={importDialogOpen}
        title="导入词条文本"
        width="720px"
        actions={
          <div class="dialog-actions">
            <Button variant="text" color="secondary" on:click={() => (importDialogOpen.value = false)}>
              取消
            </Button>
            <Button variant="contained" color="primary" disabled={saving} on:click={importCurrentText}>
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
