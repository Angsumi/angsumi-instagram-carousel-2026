#!/usr/bin/env node
import puppeteer from 'puppeteer';
import path from 'path';
import fs from 'fs';
import http from 'http';

const args = process.argv.slice(2);
function getArg(key, defaultVal) {
  const idx = args.indexOf(`--${key}`);
  if (idx !== -1 && args[idx + 1]) return args[idx + 1];
  return defaultVal;
}

const scenePath = getArg('scene', 'index.html');
const outDir = getArg('outdir', 'outputs/previews');
const width = parseInt(getArg('width', '1080'), 10);
const height = parseInt(getArg('height', '1920'), 10);

const resolvedScenePath = path.resolve(process.cwd(), scenePath);
const resolvedOutDir = path.resolve(process.cwd(), outDir);
fs.mkdirSync(resolvedOutDir, { recursive: true });

function startServer(rootFolder) {
  const mimeTypes = {
    '.html': 'text/html',
    '.js': 'text/javascript',
    '.mjs': 'text/javascript',
    '.css': 'text/css',
    '.png': 'image/png',
    '.jpg': 'image/jpeg',
    '.ttf': 'font/ttf',
    '.woff2': 'font/woff2',
    '.json': 'application/json',
  };

  const server = http.createServer((req, res) => {
    const cleanUrl = decodeURIComponent(req.url.split('?')[0]);
    const filePath = path.join(rootFolder, cleanUrl === '/' ? 'index.html' : cleanUrl);

    if (fs.existsSync(filePath) && fs.statSync(filePath).isFile()) {
      const ext = path.extname(filePath).toLowerCase();
      res.writeHead(200, {
        'Content-Type': mimeTypes[ext] || 'application/octet-stream',
        'Access-Control-Allow-Origin': '*',
      });
      fs.createReadStream(filePath).pipe(res);
    } else {
      res.writeHead(404);
      res.end('Not found');
    }
  });

  return new Promise((resolve) => {
    server.listen(0, '127.0.0.1', () => {
      resolve({ server, port: server.address().port });
    });
  });
}

console.log(`\x1b[35mCapturing keyframe preview stills for:\x1b[0m ${resolvedScenePath}`);

(async () => {
  let projectRoot = process.cwd();
  let current = path.dirname(resolvedScenePath);
  while (current !== path.dirname(current)) {
    if (fs.existsSync(path.join(current, 'package.json'))) {
      projectRoot = current;
      break;
    }
    current = path.dirname(current);
  }

  const { server, port } = await startServer(projectRoot);
  const relativeScene = path.relative(projectRoot, resolvedScenePath).replace(/\\/g, '/');
  const targetUrl = `http://127.0.0.1:${port}/${relativeScene}`;

  const browser = await puppeteer.launch({
    headless: 'new',
    args: ['--no-sandbox', '--disable-setuid-sandbox', '--hide-scrollbars'],
  });

  const page = await browser.newPage();
  await page.setViewport({ width, height, devicePixelRatio: 1 });

  await page.goto(targetUrl, { waitUntil: 'networkidle0' });

  await page.waitForFunction(() => typeof window.seekFrame === 'function', { timeout: 15000 });

  const points = [
    { name: 'hook_start', pct: 0.0 },
    { name: 'midpoint_action', pct: 0.5 },
    { name: 'loop_ending', pct: 0.99 },
  ];

  for (const pt of points) {
    const frame = Math.floor(pt.pct * 300);
    const totalFrames = 300;
    const timeSec = frame / 30;

    await page.evaluate((f, tf, t) => {
      window.seekFrame(f, tf, t);
    }, frame, totalFrames, timeSec);

    const outPath = path.join(resolvedOutDir, `${pt.name}.png`);
    await page.screenshot({ path: outPath });
    console.log(`\x1b[32m✔ Saved:\x1b[0m ${outPath} (${Math.round(pt.pct * 100)}%)`);
  }

  await browser.close();
  server.close();
  console.log(`\x1b[32mKeyframe inspection complete.\x1b[0m`);
  process.exit(0);
})();
