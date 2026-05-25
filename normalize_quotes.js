const fs = require('fs');
let html = fs.readFileSync('index.html', 'utf8');
// Replace curly double quotes with straight double quotes
html = html.replace(/[“”]/g, '"');
// Replace curly single quotes with straight single quotes if any
html = html.replace(/[‘’]/g, "'");
fs.writeFileSync('index.html', html);
console.log('Quotes normalized!');
