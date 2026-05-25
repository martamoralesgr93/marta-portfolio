const fs = require('fs');
const path = require('path');

// Fix styles.scss
let scss = fs.readFileSync('styles.scss', 'utf-8');
if (scss.startsWith('ï»¿')) {
  scss = scss.substring(3);
}
// Just in case there is a real BOM
if (scss.charCodeAt(0) === 0xFEFF) {
  scss = scss.substring(1);
}
fs.writeFileSync('styles.scss', scss, 'utf-8');
console.log('Fixed styles.scss');

// Fix content.md files to have blank lines around markdown images inside divs
function fixMdFiles(dir) {
  const list = fs.readdirSync(dir);
  for (let file of list) {
    const fullPath = path.join(dir, file);
    const stat = fs.statSync(fullPath);
    if (stat && stat.isDirectory()) {
      fixMdFiles(fullPath);
    } else if (file === 'content.md') {
      let content = fs.readFileSync(fullPath, 'utf-8');
      
      // We'll replace markdown images with HTML img tags so it works reliably inside divs
      content = content.replace(/!\[(.*?)\]\((.*?)\)/g, (match, alt, src) => {
        return `<img src="${src}" alt="${alt}">`;
      });
      
      fs.writeFileSync(fullPath, content, 'utf-8');
    }
  }
}

fixMdFiles(path.join(__dirname, 'projects'));
console.log('Fixed markdown files');
