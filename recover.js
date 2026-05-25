const fs = require('fs');
const logPath = 'C:\\Users\\mmora\\.gemini\\antigravity\\brain\\6df00f11-d1d0-4457-a933-2d54587d1837\\.system_generated\\logs\\transcript.jsonl';

const lines = fs.readFileSync(logPath, 'utf8').split('\n');

for (let i = 0; i < lines.length; i++) {
  const line = lines[i].trim();
  if (!line) continue;
  try {
    const data = JSON.parse(line);
    if (data.tool_calls) {
      for (const call of data.tool_calls) {
        if (call.name === 'view_file' && call.args.AbsolutePath.includes('index.html')) {
          console.log(`Step ${data.step_index}: view_file on index.html, startLine: ${call.args.StartLine}, endLine: ${call.args.EndLine}`);
        }
      }
    }
  } catch (e) {}
}
