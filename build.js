const fs = require('fs');
const path = require('path');
const { marked } = require('marked');
const sass = require('sass');
const cheerio = require('cheerio');

const rootDir = __dirname;
const projectsDir = path.join(rootDir, 'projects');
const indexHtmlPath = path.join(rootDir, 'index.html');

// Compile Sass
try {
  console.log("Compiling Sass...");
  const result = sass.compile(path.join(rootDir, 'styles.scss'));
  fs.writeFileSync(path.join(rootDir, 'styles.css'), result.css);
  console.log("Sass compiled successfully.");
} catch (e) {
  console.error("Sass compilation failed:", e.message);
}

const renderer = new marked.Renderer();
renderer.image = function (href, title, text) {
  if (href === null) return text;
  let cleanHref = href;
  if (typeof href === 'object') {
     cleanHref = href.href;
     text = href.text;
  }
  if (!cleanHref.startsWith('http') && !cleanHref.startsWith('/')) {
    cleanHref = cleanHref.replace(/\\/g, '/');
  }
  return `
    <figure class="cs-figure">
      <img src="${cleanHref}" alt="${text || ''}" loading="lazy">
      ${text ? `<figcaption>${text}</figcaption>` : ''}
    </figure>
  `;
};

marked.setOptions({ renderer });

function findProjects(dir) {
  let results = [];
  const list = fs.readdirSync(dir);
  for (let file of list) {
    const fullPath = path.join(dir, file);
    const stat = fs.statSync(fullPath);
    if (stat && stat.isDirectory()) {
      results = results.concat(findProjects(fullPath));
    } else if (file === 'metadata.json') {
      results.push(dir);
    }
  }
  return results;
}

function processImagePaths(rawMd, relPath, f) {
  // Replace markdown images: ![alt](src)
  let processed = rawMd.replace(/!\[(.*?)\]\((.*?)\)/g, (match, alt, src) => {
    let newSrc = src;
    if (src.startsWith('./') || !src.startsWith('/')) {
       newSrc = src.replace('./', `${relPath}/${f}/`);
    }
    return `<figure class="cs-figure"><img src="${newSrc}" alt="${alt}"></figure>`;
  });

  // Replace HTML images: <img src="src" alt="alt">
  processed = processed.replace(/<img([^>]*)src=["']([^"']*)["']([^>]*)>/g, (match, p1, src, p2) => {
    let newSrc = src;
    if (src.startsWith('./') || !src.startsWith('/')) {
       newSrc = src.replace('./', `${relPath}/${f}/`);
    }
    return `<img${p1}src="${newSrc}"${p2}>`;
  });
  
  return processed;
}

const projectFolders = findProjects(projectsDir);

let indexHtml = fs.readFileSync(indexHtmlPath, 'utf-8');
const $ = cheerio.load(indexHtml);

for (const pFolder of projectFolders) {
  console.log(`Processing project: ${pFolder}`);
  
  const relPath = path.relative(rootDir, pFolder).replace(/\\/g, '/');
  
  let metadata = {};
  const metaPath = path.join(pFolder, 'metadata.json');
  if (fs.existsSync(metaPath)) {
    try {
      metadata = JSON.parse(fs.readFileSync(metaPath, 'utf-8'));
    } catch (e) {}
  }
  
  if (!metadata.articleId) {
    console.log(`Skipping ${pFolder} because no articleId in metadata.json`);
    continue;
  }
  
  const sectionsEs = [];
  const sectionsEn = [];
  const items = fs.readdirSync(pFolder);
  const folders = items.filter(i => /^\d{2}-/.test(i)).sort();
  
  for (const f of folders) {
    const contentPathEs = path.join(pFolder, f, 'content.md');
    const contentPathEn = path.join(pFolder, f, 'content-en.md');
    
    // Process Spanish (ES)
    if (fs.existsSync(contentPathEs)) {
      let rawMd = fs.readFileSync(contentPathEs, 'utf-8');
      rawMd = processImagePaths(rawMd, relPath, f);
      const htmlContent = marked.parse(rawMd);
      sectionsEs.push(`
        <section class="cs-section" id="${f}">
          ${htmlContent}
        </section>
      `);
    }
    
    // Process English (EN)
    if (fs.existsSync(contentPathEn)) {
      let rawMd = fs.readFileSync(contentPathEn, 'utf-8');
      rawMd = processImagePaths(rawMd, relPath, f);
      const htmlContent = marked.parse(rawMd);
      sectionsEn.push(`
        <section class="cs-section" id="${f}">
          ${htmlContent}
        </section>
      `);
    } else if (fs.existsSync(contentPathEs)) {
      // Fallback: use Spanish content if English translation is not found
      let rawMd = fs.readFileSync(contentPathEs, 'utf-8');
      rawMd = processImagePaths(rawMd, relPath, f);
      const htmlContent = marked.parse(rawMd);
      sectionsEn.push(`
        <section class="cs-section" id="${f}">
          ${htmlContent}
        </section>
      `);
    }
  }
  
  const fullContent = `
<article class="cs-content" style="padding-top: 1rem;">
  <div data-lang="es">
    ${sectionsEs.join('\n')}
  </div>
  <div data-lang="en" style="display: none;">
    ${sectionsEn.join('\n')}
  </div>
</article>
`;
  
  // Inject into the correct article's .detail div
  const detailDiv = $(`#${metadata.articleId} .detail`);
  if (detailDiv.length > 0) {
    detailDiv.html(fullContent);
    console.log(`Injected content into #${metadata.articleId}`);
  } else {
    console.log(`Could not find #${metadata.articleId} .detail in index.html`);
  }
}

// Write the modified index.html back
fs.writeFileSync(indexHtmlPath, $.html(), 'utf-8');
console.log("Build complete.");
