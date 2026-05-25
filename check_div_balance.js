const html = require('fs').readFileSync('index.html', 'utf8');
const lines = html.split(/\r?\n/);
let currentSection = '';
let balances = {};
let sectionStarts = {};

lines.forEach((l, i) => {
  const lineNum = i + 1;
  
  if (l.includes('<article id="')) {
    const match = l.match(/<article id="([^"]+)"/);
    if (match) currentSection = match[1];
    balances[currentSection] = 0;
    sectionStarts[currentSection] = lineNum;
  } else if (l.includes('<section id="')) {
    const match = l.match(/<section id="([^"]+)"/);
    if (match) currentSection = match[1];
    balances[currentSection] = 0;
    sectionStarts[currentSection] = lineNum;
  }
  
  if (currentSection) {
    const opens = (l.match(/<div/g) || []).length;
    const closes = (l.match(/<\/div>/g) || []).length;
    balances[currentSection] += (opens - closes);
  }
});

console.log('Div balances by block (should be 0 for each complete block):');
for (const [sec, bal] of Object.entries(balances)) {
  console.log(`- ${sec}: ${bal}`);
}
