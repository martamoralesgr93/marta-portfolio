const fs = require('fs');
const diff = fs.readFileSync('extracted_diff.txt', 'utf8');
const lines = diff.split('\n');

let cssLines = [];
let capture = false;

for (const line of lines) {
  if (line.trim() === '+.svg-dash-ring {') {
    capture = true;
  }
  
  if (capture) {
    if (line.startsWith('+')) {
      cssLines.push(line.substring(1));
    } else if (line.trim() === '') {
      cssLines.push('');
    }
  }
}

// Append to styles.css
fs.appendFileSync('styles.css', '\n' + cssLines.join('\n') + '\n');
console.log('Appended ' + cssLines.length + ' lines to styles.css');
