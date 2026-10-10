import { MsEdgeTTS, OUTPUT_FORMAT } from 'msedge-tts';
import fs from 'fs';
import path from 'path';

async function generateVoiceover() {
  const tts = new MsEdgeTTS();
  await tts.setMetadata('en-IN-NeerjaNeural', OUTPUT_FORMAT.AUDIO_24KHZ_48KBITRATE_MONO_MP3);

  // Script for Reel 02: Counts vs TPM
  const script = "Stop feeding TPM tables into DESeq2! DESeq2 throws an error for a reason. Differential expression needs statistical confidence. Ten reads means huge uncertainty, while one thousand reads gives high certainty. TPM erases this sampling depth by turning everything into fractions. Between conditions? Always use raw integer counts. Within a single sample? Use TPM. Save this rule before your next sequencing run!";

  const outDir = '/home/angsuman/extra_spac/Insta_Angsumi/outputs/carousel-nov-01-counts-vs-tpm/audio';
  fs.mkdirSync(outDir, { recursive: true });

  console.log('Generating voiceover with en-IN-NeerjaNeural...');
  const { audioFilePath } = await tts.toFile(outDir, script);
  console.log(`Voiceover saved successfully to ${audioFilePath}`);

  // Also copy/rename to reel02_voiceover.mp3 in parent folder
  const finalPath = '/home/angsuman/extra_spac/Insta_Angsumi/outputs/carousel-nov-01-counts-vs-tpm/reel02_voiceover.mp3';
  fs.copyFileSync(audioFilePath, finalPath);
  console.log(`Copied to ${finalPath}`);
  process.exit(0);
}

generateVoiceover().catch((err) => {
  console.error('Error generating voiceover:', err);
  process.exit(1);
});
