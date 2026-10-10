#!/usr/bin/env node
import googleTTS from 'google-tts-api';
import fs from 'fs';
import path from 'path';
import https from 'https';

const args = process.argv.slice(2);
function getArg(key, defaultVal) {
  const idx = args.indexOf(`--${key}`);
  if (idx !== -1 && args[idx + 1]) return args[idx + 1];
  return defaultVal;
}

const text = getArg('text', 'Your cells carry a code. Three billion base pairs of DNA.');
const output = getArg('output', 'outputs/voiceover.mp3');
const lang = getArg('lang', 'en');

const resolvedOutput = path.resolve(process.cwd(), output);
fs.mkdirSync(path.dirname(resolvedOutput), { recursive: true });

async function downloadTTS(text, destPath) {
  const base64 = await googleTTS.getAudioBase64(text, {
    lang,
    slow: false,
    host: 'https://translate.google.com',
    timeout: 10000,
  });

  const buffer = Buffer.from(base64, 'base64');
  fs.writeFileSync(destPath, buffer);
  console.log(`\x1b[32m✔ Voiceover saved:\x1b[0m ${destPath}`);
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
