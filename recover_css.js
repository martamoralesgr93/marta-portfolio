const fs = require('fs');
const transcript = fs.readFileSync('C:\\Users\\mmora\\.gemini\\antigravity\\brain\\5b51a731-df25-4417-acc3-8168caec6f07\\.system_generated\\logs\\transcript.jsonl', 'utf8');

const lines = transcript.split('\n');
for (const line of lines) {
  if (line.includes('NUEVOS ESTILOS PARA CASOS DE ESTUDIO')) {
    try {
      const parsed = JSON.parse(line);
      console.log(parsed.content || JSON.stringify(parsed, null, 2));
      break;
    } catch (e) {
      console.log('Found line but failed to parse JSON');
    }
  }
}
