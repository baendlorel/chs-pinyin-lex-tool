import fs from 'node:fs';
import path from 'node:path';
import { fileURLToPath } from 'node:url';

import fastifyStatic from '@fastify/static';
import Fastify from 'fastify';

import type { LexEntry } from './lex-service.js';
import { loadLexFile, normalizeWindowsPath, parseImportText, saveLexFile, scanLexDirectory } from './lex-service.js';

interface PathPayload {
  filePath: string;
}

interface SavePayload extends PathPayload {
  entries: LexEntry[];
}

interface ImportPayload extends PathPayload {
  content: string;
}

const currentFilePath = fileURLToPath(import.meta.url);
const currentDirectory = path.dirname(currentFilePath);
const staticRoot = path.resolve(currentDirectory, '../../dist/web');

function assertNonEmptyString(value: unknown, fieldName: string) {
  if (typeof value !== 'string' || value.trim() === '') {
    throw new Error(`${fieldName} is required`);
  }

  return value.trim();
}

function resolveLexFilePath(payload: PathPayload) {
  const filePath = normalizeWindowsPath(assertNonEmptyString(payload.filePath, 'filePath'));
  const stats = fs.statSync(filePath);

  if (stats.isFile()) {
    return filePath;
  }

  const scanResult = scanLexDirectory(filePath);
  if (!scanResult.selectedFilePath) {
    throw new Error('No .lex file was found in the selected directory');
  }

  return normalizeWindowsPath(scanResult.selectedFilePath);
}

function createServer() {
  const app = Fastify({
    logger: true,
    bodyLimit: 50 * 1024 * 1024,
  });

  app.setErrorHandler((error, _request, reply) => {
    const message = error instanceof Error ? error.message : 'Unknown error';
    reply.code(400).send({
      error: message,
    });
  });

  app.get('/api/health', async () => {
    return {
      ok: true,
    };
  });

  app.post<{ Body: PathPayload }>('/api/lex/scan', async (request) => {
    const filePath = assertNonEmptyString(request.body?.filePath, 'filePath');
    return scanLexDirectory(filePath);
  });

  app.post<{ Body: PathPayload }>('/api/lex/load', async (request) => {
    const filePath = resolveLexFilePath(request.body ?? { filePath: '' });
    return loadLexFile(filePath);
  });

  app.post<{ Body: SavePayload }>('/api/lex/save', async (request) => {
    const payload = request.body;
    if (!Array.isArray(payload?.entries)) {
      throw new Error('entries is required');
    }

    const filePath = resolveLexFilePath(payload);
    return saveLexFile(filePath, payload.entries);
  });

  app.post<{ Body: ImportPayload }>('/api/lex/import', async (request) => {
    const payload = request.body;
    const content = assertNonEmptyString(payload?.content, 'content');
    const filePath = resolveLexFilePath(payload ?? { filePath: '' });
    const loaded = loadLexFile(filePath);
    const mergedEntries = parseImportText(content, loaded.entries);
    return saveLexFile(filePath, mergedEntries);
  });

  app.get('/api/path/normalize', async (request) => {
    const source = assertNonEmptyString((request.query as { input?: string } | undefined)?.input, 'input');
    return {
      input: source,
      normalizedPath: normalizeWindowsPath(source),
    };
  });

  if (fs.existsSync(staticRoot)) {
    void app.register(fastifyStatic, {
      root: staticRoot,
      prefix: '/',
      wildcard: false,
    });

    app.get('/*', async (_request, reply) => {
      return reply.sendFile('index.html');
    });
  } else {
    app.get('/', async () => {
      return {
        ok: true,
        message: 'Frontend assets are not built yet. Run pnpm dev or pnpm build.',
      };
    });
  }

  return app;
}

const app = createServer();
const port = Number(process.env.PORT || 9002);
const host = process.env.HOST || '0.0.0.0';

app.listen({ port, host }).catch((error) => {
  app.log.error(error);
  process.exit(1);
});
