const html = require('fs').readFileSync('index.html', 'utf8');
const lines = html.split(/\r?\n/);
let inAcademic = false;
let depth = 0;

lines.forEach((l, i) => {
  const lineNum = i + 1;
  
  if (l.includes('<article id="project-academic"')) {
    inAcademic = true;
  }
  
  if (inAcademic) {
    const opens = (l.match(/<div/g) || []).length;
    const closes = (l.match(/<\/div>/g) || []).length;
    
    depth += opens;
    depth -= closes;
    
    if (depth < 0) {
      console.log(`L${lineNum}: depth became negative (${depth}). Line content: ${l.trim()}`);
    }
  }
  
  if (l.includes('</article>') && inAcademic) {
    inAcademic = false;
  }
});
