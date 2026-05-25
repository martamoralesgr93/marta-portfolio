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

// Custom renderer for Marked to handle custom classes
const renderer = new marked.Renderer();
// Example: custom image renderer to add figures and captions
renderer.image = function (href, title, text) {
  if (href === null) return text;
  
  // Make sure image src respects absolute paths for sub-pages
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

// Also we want blockquotes to have a custom style
renderer.blockquote = function (quote) {
  return `<blockquote class="cs-quote">\n${quote}</blockquote>\n`;
};

marked.setOptions({ renderer });

// Recursively find case-study.md
function findProjects(dir) {
  let results = [];
  const list = fs.readdirSync(dir);
  
  for (let file of list) {
    const fullPath = path.join(dir, file);
    const stat = fs.statSync(fullPath);
    
    if (stat && stat.isDirectory()) {
      results = results.concat(findProjects(fullPath));
    } else if (file === 'metadata.json') {
      results.push(dir); // project root
    }
  }
  return results;
}

const projectFolders = findProjects(projectsDir);

for (const pFolder of projectFolders) {
  console.log(`Processing project: ${pFolder}`);
  
  // Parse metadata
  let metadata = { title: "Project", description: "", category: "Case Study" };
  const metaPath = path.join(pFolder, 'metadata.json');
  if (fs.existsSync(metaPath)) {
    try {
      const data = JSON.parse(fs.readFileSync(metaPath, 'utf-8'));
      metadata = { ...metadata, ...data };
    } catch (e) {}
  }
  
  // Read all sections 01 to 08
  const sections = [];
  const items = fs.readdirSync(pFolder);
  
  const folders = items.filter(i => /^\d{2}-/.test(i)).sort();
  
  for (const f of folders) {
    const contentPath = path.join(pFolder, f, 'content.md');
    if (fs.existsSync(contentPath)) {
      // Fix image paths: Markdown will probably have `./images/file.webp`
      // For the output HTML (at /projects/ilunion/.../index.html) it will be relative to the folder!
      // Wait, if we output index.html inside pFolder, relative paths like '02-problem/images/foo.webp' work perfectly.
      
      let rawMd = fs.readFileSync(contentPath, 'utf-8');
      
      // Update image paths from relative to the content folder (e.g., ./images/xxx)
      // to relative to the project folder (e.g., 02-problem/images/xxx)
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
  
  // Create final HTML
  const finalHtml = templateHtml
    .replace(/\{\{TITLE\}\}/g, metadata.title)
    .replace(/\{\{CATEGORY\}\}/g, metadata.category)
    .replace(/\{\{DESCRIPTION\}\}/g, metadata.description)
    .replace(/\{\{CONTENT\}\}/g, fullContent);
    
  // Write index.html in the project folder
  fs.writeFileSync(path.join(pFolder, 'index.html'), finalHtml, 'utf-8');
  console.log(`Generated: ${path.join(pFolder, 'index.html')}`);
}

console.log("Build complete.");
