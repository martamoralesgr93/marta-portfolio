const fs = require('fs');

let html = fs.readFileSync('index.html', 'utf-8');

// Fix the links to work locally (relative paths to index.html files)
html = html.replace(
  /href="\/projects\/ilunion\/cro-optimization\/motor-destino\/"/g,
  'href="projects/ilunion/cro-optimization/motor-destino/index.html"'
);
html = html.replace(
  /href="\/projects\/ilunion\/offer-component-redesign\/"/g,
  'href="projects/ilunion/offer-component-redesign/index.html"'
);

html = html.replace(
  /window\.location\.href='\/projects\/ilunion\/cro-optimization\/motor-destino\/'/g,
  "window.location.href='projects/ilunion/cro-optimization/motor-destino/index.html'"
);
html = html.replace(
  /window\.location\.href='\/projects\/ilunion\/offer-component-redesign\/'/g,
  "window.location.href='projects/ilunion/offer-component-redesign/index.html'"
);

fs.writeFileSync('index.html', html, 'utf-8');
console.log('Fixed index.html local paths');
