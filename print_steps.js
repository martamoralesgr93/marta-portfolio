const fs = require('fs');
const logPath = 'C:\\Users\\mmora\\.gemini\\antigravity\\brain\\6df00f11-d1d0-4457-a933-2d54587d1837\\.system_generated\\logs\\transcript.jsonl';

const lines = fs.readFileSync(logPath, 'utf8').split('\n');

for (let i = 0; i < lines.length; i++) {
  const line = lines[i].trim();
  if (!line) continue;
  try {
    const data = JSON.parse(line);
    if (data.step_index === 171) {
      console.log('Step 171 line character length:', line.length);
    }
  } catch (e) {}
}
