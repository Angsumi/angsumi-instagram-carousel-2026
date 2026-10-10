#!/usr/bin/env node
import googleTTS from 'google-tts-api';
import fs from 'fs';
import path from 'path';

const args = process.argv.slice(2);
function getArg(key, defaultVal) {
  const idx = args.indexOf(`--${key}`);
  if (idx !== -1 && args[idx + 1]) return args[idx + 1];
  return defaultVal;
}

const text = getArg('text', 'Your sequencing company sent 15 GB of text files... and now your laptop is crashing.');
const output = getArg('output', 'outputs/voiceover.mp3');
const lang = getArg('lang', 'en');

const resolvedOutput = path.resolve(process.cwd(), output);
fs.mkdirSync(path.dirname(resolvedOutput), { recursive: true });

async function downloadTTS(text, destPath) {
  // Support texts of any length with getAllAudioBase64
  const results = await googleTTS.getAllAudioBase64(text, {
    lang,
    slow: false,
    host: 'https://translate.google.com',
    timeout: 10000,
    splitPunct: '.,!?:;',
  });

  const buffers = results.map(item => Buffer.from(item.base64, 'base64'));
  const combinedBuffer = Buffer.concat(buffers);
  fs.writeFileSync(destPath, combinedBuffer);
  console.log(`\x1b[32m✔ Voiceover saved:\x1b[0m ${destPath} (${combinedBuffer.length} bytes)`);
}

(async () => {
  try {
    console.log(`Synthesizing voiceover: "${text}"`);
    await downloadTTS(text, resolvedOutput);
  } catch (err) {
    console.error(`\x1b[31mTTS Error:\x1b[0m`, err);
    process.exit(1);
  }
})();
