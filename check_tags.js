const fs = require('fs');
const html = fs.readFileSync('index.html', 'utf8');

function count(str, pattern) {
  return (str.match(pattern) || []).length;
}

console.log('div open:', count(html, /<div/g));
console.log('div close:', count(html, /<\/div>/g));
console.log('section open:', count(html, /<section/g));
console.log('section close:', count(html, /<\/section>/g));
console.log('article open:', count(html, /<article/g));
console.log('article close:', count(html, /<\/article>/g));
console.log('ul open:', count(html, /<ul/g));
console.log('ul close:', count(html, /<\/ul>/g));
