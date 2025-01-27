const filestack = require('filestack-js');
const fs = require('fs');
const path = require('path');

// Initialize filestack client
const filestackClient = filestack.init('AAJHhZthKTy6f1iCSHXLJz');

async function createVoiceConfig() {
  const voiceFiles = {
    ye: 'public/voices/ye.mp3',
    taylor: 'public/voices/taylor.mp3',
    freddie: 'public/voices/freddie.mp3'
  };

  const encodedVoices = {};
  
  for (const [artist, filepath] of Object.entries(voiceFiles)) {
    try {
      const fileBuffer = fs.readFileSync(path.join(process.cwd(), filepath));
      const base64 = fileBuffer.toString('base64');
      encodedVoices[artist] = `data:audio/mp3;base64,${base64}`;
      console.log(`Encoded ${artist}`);
    } catch (error) {
      console.error(`Failed to encode ${artist}:`, error);
    }
  }

  // Generate config file content
  const configContent = `
// This file is auto-generated - do not edit manually
export const voiceReferences = {
  ye: "${encodedVoices.ye}",
  taylor: "${encodedVoices.taylor}",
  freddie: "${encodedVoices.freddie}"
} as const;
`;

  fs.writeFileSync(
    path.join(process.cwd(), 'lib/voice-config.ts'),
    configContent.trim()
  );

  console.log('Voice references encoded and config file updated!');
}

createVoiceConfig().catch(console.error); 