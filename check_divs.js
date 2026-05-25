const html = require('fs').readFileSync('index.html', 'utf8');
const lines = html.split(/\r?\n/);
let depth = 0;
let errors = [];

lines.forEach((l, i) => {
  const lineNum = i + 1;
  const opens = (l.match(/<div/g) || []).length;
  const closes = (l.match(/<\/div>/g) || []).length;
  
  depth += opens;
  depth -= closes;
  
  if (depth < 0) {
    errors.push(`L${lineNum}: depth became negative (${depth})`);
  }
});

console.log('Final depth:', depth);
if (errors.length > 0) {
  console.log('Errors:', errors);
}
