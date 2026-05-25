const fs = require('fs');
const transcript = fs.readFileSync('C:\\Users\\mmora\\.gemini\\antigravity\\brain\\5b51a731-df25-4417-acc3-8168caec6f07\\.system_generated\\logs\\transcript.jsonl', 'utf8');

const lines = transcript.split('\n');
for (let i = 0; i < lines.length; i++) {
  if (lines[i].includes('--- a/index.html')) {
    try {
      const parsed = JSON.parse(lines[i]);
      fs.writeFileSync('extracted_index_diff.txt', parsed.output || parsed.content || JSON.stringify(parsed));
      console.log('Successfully saved to extracted_index_diff.txt');
      break;
    } catch (e) {
      console.log('Found line but failed to parse JSON');
    }
  }
}
