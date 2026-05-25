const fs = require('fs');
const path = require('path');
const { marked } = require('marked');
const sass = require('sass');

const rootDir = __dirname;
const projectsDir = path.join(rootDir, 'projects');
const templateHtml = fs.readFileSync(path.join(rootDir, 'template.html'), 'utf-8');

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

renderer.blockquote = function (quote) {
  return `<blockquote class="cs-quote">\n${quote}</blockquote>\n`;
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

const projectFolders = findProjects(projectsDir);

for (const pFolder of projectFolders) {
  console.log(`Processing project: ${pFolder}`);
  
  // Calculate relative path to root
  const relPath = path.relative(pFolder, rootDir);
  const baseUrl = relPath ? relPath.replace(/\\/g, '/') + '/' : '';
  
  let metadata = { title: "Project", description: "", category: "Case Study" };
  const metaPath = path.join(pFolder, 'metadata.json');
  if (fs.existsSync(metaPath)) {
    try {
      const data = JSON.parse(fs.readFileSync(metaPath, 'utf-8'));
      metadata = { ...metadata, ...data };
    } catch (e) {}
  }
  
  const sections = [];
  const items = fs.readdirSync(pFolder);
  const folders = items.filter(i => /^\d{2}-/.test(i)).sort();
  
  for (const f of folders) {
    const contentPath = path.join(pFolder, f, 'content.md');
    if (fs.existsSync(contentPath)) {
      let rawMd = fs.readFileSync(contentPath, 'utf-8');
      
      rawMd = rawMd.replace(/!\[(.*?)\]\((.*?)\)/g, (match, alt, src) => {
        let newSrc = src;
        if (src.startsWith('./') || !src.startsWith('/')) {
           newSrc = src.replace('./', `${f}/`);
        }
        return `![${alt}](${newSrc})`;
      });

      const htmlContent = marked.parse(rawMd);
      sections.push(`
        <section class="cs-section" id="${f}">
          ${htmlContent}
        </section>
      `);
    }
  }
  
  const fullContent = sections.join('\n');
  
  const finalHtml = templateHtml
    .replace(/\{\{BASE_URL\}\}/g, baseUrl)
    .replace(/\{\{TITLE\}\}/g, metadata.title)
    .replace(/\{\{CATEGORY\}\}/g, metadata.category)
    .replace(/\{\{DESCRIPTION\}\}/g, metadata.description)
    .replace(/\{\{CONTENT\}\}/g, fullContent);
    
  fs.writeFileSync(path.join(pFolder, 'index.html'), finalHtml, 'utf-8');
  console.log(`Generated: ${path.join(pFolder, 'index.html')}`);
}

console.log("Build complete.");
