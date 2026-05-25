const html = require('fs').readFileSync('index.html', 'utf8');
const lines = html.split(/\r?\n/);
let depth = 0;
lines.forEach((l, i) => {
  const lineNum = i + 1;
  if (l.includes('<main') || l.includes('<section')) {
    console.log('L' + lineNum + ' d=' + depth + ': ' + l.trim().substring(0, 80));
    depth++;
  }
  if (l.includes('</main') || l.includes('</section')) {
    depth--;
    console.log('L' + lineNum + ' d=' + depth + ': ' + l.trim().substring(0, 80));
  }
});
