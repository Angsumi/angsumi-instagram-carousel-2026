#!/usr/bin/env node
import puppeteer from 'puppeteer';
import { spawn } from 'child_process';
import path from 'path';
import fs from 'fs';
import http from 'http';
import { fileURLToPath } from 'url';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

// Parse CLI arguments
const args = process.argv.slice(2);
function getArg(key, defaultVal) {
  const idx = args.indexOf(`--${key}`);
  if (idx !== -1 && args[idx + 1]) return args[idx + 1];
  return defaultVal;
}

const scenePath = getArg('scene', 'index.html');
const outputPath = getArg('output', 'output.mp4');
const fps = parseInt(getArg('fps', '30'), 10);
const duration = parseFloat(getArg('duration', '25'));
const width = parseInt(getArg('width', '1080'), 10);
const height = parseInt(getArg('height', '1920'), 10);
const audioPath = getArg('audio', null);
const format = getArg('format', 'jpeg'); // 'jpeg' is 3x faster than 'png'

const totalFrames = Math.round(duration * fps);
const resolvedScenePath = path.resolve(process.cwd(), scenePath);
const resolvedOutputPath = path.resolve(process.cwd(), outputPath);

fs.mkdirSync(path.dirname(resolvedOutputPath), { recursive: true });

console.log(`\x1b[36m==================================================\x1b[0m`);
console.log(`\x1b[1m🎬 CODE-MOTION HIGH-PERFORMANCE RENDERER\x1b[0m`);
console.log(`\x1b[36m==================================================\x1b[0m`);
console.log(`Scene:      ${resolvedScenePath}`);
console.log(`Output:     ${resolvedOutputPath}`);
console.log(`Format:     ${format.toUpperCase()} stream`);
console.log(`Resolution: ${width}x${height} @ ${fps}fps`);
console.log(`Duration:   ${duration}s (${totalFrames} frames)`);
if (audioPath) console.log(`Audio:      ${audioPath}`);
console.log(`--------------------------------------------------`);

// Built-in static server to cleanly bypass CORS for ES modules & web fonts
function startServer(rootFolder) {
  const mimeTypes = {
    '.html': 'text/html',
    '.js': 'text/javascript',
    '.mjs': 'text/javascript',
    '.css': 'text/css',
    '.png': 'image/png',
    '.jpg': 'image/jpeg',
    '.jpeg': 'image/jpeg',
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

const vcodec = format === 'jpeg' ? 'mjpeg' : 'png';
const ffmpegArgs = [
  '-y',
  '-f', 'image2pipe',
  '-vcodec', vcodec,
  '-r', String(fps),
  '-i', '-',
];

if (audioPath && fs.existsSync(audioPath)) {
  ffmpegArgs.push('-i', path.resolve(process.cwd(), audioPath));
  ffmpegArgs.push('-c:a', 'aac', '-b:a', '192k', '-shortest');
}

ffmpegArgs.push(
  '-c:v', 'libx264',
  '-preset', 'veryfast',
  '-crf', '18',
  '-pix_fmt', 'yuv420p',
  '-movflags', '+faststart',
  resolvedOutputPath
);

const ffmpeg = spawn('ffmpeg', ffmpegArgs, { stdio: ['pipe', 'pipe', 'pipe'] });

ffmpeg.stderr.on('data', (data) => {
  const str = data.toString();
  if (str.includes('Error') || str.includes('Invalid')) {
    process.stderr.write(`\x1b[31m[FFmpeg Error] ${str}\x1b[0m\n`);
  }
});

(async () => {
  // Find project root
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
    args: [
      '--no-sandbox',
      '--disable-setuid-sandbox',
      '--disable-dev-shm-usage',
      '--disable-gpu-sandbox',
      '--enable-gpu',
      '--hide-scrollbars',
      '--mute-audio',
      '--allow-file-access-from-files',
    ],
  });

  const page = await browser.newPage();
  await page.setViewport({ width, height, devicePixelRatio: 1 });

  page.on('console', msg => {
    if (msg.type() === 'error') console.error(`\x1b[31m[Browser Console Error]\x1b[0m`, msg.text());
  });
  page.on('pageerror', err => {
    console.error(`\x1b[31m[Browser Page Error]\x1b[0m`, err.message);
  });

  await page.goto(targetUrl, { waitUntil: 'networkidle0' });

  try {
    await page.waitForFunction(() => typeof window.seekFrame === 'function', { timeout: 15000 });
  } catch (e) {
    console.error(`\x1b[31m❌ Error: window.seekFrame(frame, totalFrames, time) was not found in ${targetUrl}!\x1b[0m`);
    await browser.close();
    server.close();
    ffmpeg.stdin.end();
    process.exit(1);
  }

  const startTime = Date.now();
  const screenshotOpts = format === 'jpeg' ? { type: 'jpeg', quality: 92 } : { type: 'png' };

  for (let frame = 0; frame < totalFrames; frame++) {
    const timeSec = frame / fps;

    await page.evaluate((f, tf, t) => {
      window.seekFrame(f, tf, t);
    }, frame, totalFrames, timeSec);

    const buffer = await page.screenshot(screenshotOpts);

    const canContinue = ffmpeg.stdin.write(buffer);
    if (!canContinue) {
      await new Promise((resolve) => ffmpeg.stdin.once('drain', resolve));
    }

    const elapsedSec = (Date.now() - startTime) / 1000;
    const renderFps = ((frame + 1) / elapsedSec).toFixed(1);
    const percent = Math.round(((frame + 1) / totalFrames) * 100);
    const etaSec = Math.round((totalFrames - (frame + 1)) / (parseFloat(renderFps) || 1));

    process.stdout.write(
      `\rRendering: [\x1b[32m${'#'.repeat(Math.floor(percent / 5))}${' '.repeat(20 - Math.floor(percent / 5))}\x1b[0m] ` +
      `${percent}% | Frame ${frame + 1}/${totalFrames} | ${renderFps} fps | ETA: ${etaSec}s  `
    );
  }

  console.log(`\n\x1b[32m✔ Frame generation complete. Finalizing MP4 encoding...\x1b[0m`);
  ffmpeg.stdin.end();

  await new Promise((resolve, reject) => {
    ffmpeg.on('close', (code) => {
      if (code === 0) resolve();
      else reject(new Error(`FFmpeg exited with code ${code}`));
    });
  });

  await browser.close();
  server.close();

  const totalElapsed = ((Date.now() - startTime) / 1000).toFixed(1);
  console.log(`\x1b[32m🎉 Success! Video saved to:\x1b[0m ${resolvedOutputPath}`);
  console.log(`Total render time: ${totalElapsed}s`);
  process.exit(0);
})();
