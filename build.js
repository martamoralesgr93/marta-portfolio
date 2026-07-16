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

// ==================== CHATBOT & KNOWLEDGE BASE COMPILATION ====================

function compileKnowledgeBase() {
  console.log("Compiling knowledge base...");
  const kbDir = path.join(rootDir, 'knowledge-base', 'knowledge');
  const systemDir = path.join(rootDir, 'knowledge-base', 'system');
  
  if (!fs.existsSync(kbDir)) {
    console.error("Knowledge base folder not found at:", kbDir);
    return;
  }
  
  function getFiles(dir) {
    let results = [];
    const list = fs.readdirSync(dir);
    for (let file of list) {
      const fullPath = path.join(dir, file);
      const stat = fs.statSync(fullPath);
      if (stat && stat.isDirectory()) {
        results = results.concat(getFiles(fullPath));
      } else if (file.endsWith('.md')) {
        results.push(fullPath);
      }
    }
    return results;
  }

  function cleanYamlValue(val) {
    val = val.trim();
    if ((val.startsWith('"') && val.endsWith('"')) || (val.startsWith("'") && val.endsWith("'"))) {
      val = val.substring(1, val.length - 1);
    }
    return val;
  }

  function parseFrontmatter(fmText) {
    const result = {};
    if (!fmText) return result;
    const lines = fmText.split('\n');
    let currentKey = null;
    let currentValue = '';
    
    for (let line of lines) {
      const match = line.match(/^([a-zA-Z0-9_-]+)\s*:\s*([\s\S]*)$/);
      if (match) {
        if (currentKey) {
          result[currentKey] = cleanYamlValue(currentValue);
        }
        currentKey = match[1];
        currentValue = match[2];
      } else if (line.startsWith(' ') || line.startsWith('\t')) {
        currentValue += '\n' + line;
      }
    }
    if (currentKey) {
      result[currentKey] = cleanYamlValue(currentValue);
    }
    return result;
  }

  const allFiles = getFiles(kbDir);
  const esDocs = [];
  const enDocs = [];

  for (const file of allFiles) {
    const filename = path.basename(file);
    if (filename.startsWith('.fuse_hidden')) continue;
    
    const content = fs.readFileSync(file, 'utf-8');
    const isEs = filename.endsWith('.es.md');
    const isEn = filename.endsWith('.en.md');
    
    const fmMatch = content.match(/^---\r?\n([\s\S]*?)\r?\n---\r?\n([\s\S]*)$/);
    let fmText = '';
    let body = content;
    if (fmMatch) {
      fmText = fmMatch[1];
      body = fmMatch[2];
    }
    
    const fm = parseFrontmatter(fmText);
    const docId = fm.id || filename.replace(/\.(es|en)\.md$/, '').replace(/\.md$/, '');
    
    const formattedDoc = [
      `DOCUMENT ID: ${docId}`,
      fm.type ? `Type: ${fm.type}` : '',
      fm.title ? `Title: ${fm.title}` : '',
      fm.summary ? `Summary: ${fm.summary}` : '',
      fm.answers ? `Answers: ${fm.answers}` : '',
      fm.tags ? `Tags: ${fm.tags}` : '',
      `Content:\n${body.trim()}`,
      `========================================`
    ].filter(Boolean).join('\n');
    
    if (isEs || (!isEs && !isEn)) {
      esDocs.push(formattedDoc);
    } else if (isEn) {
      enDocs.push(formattedDoc);
    }
  }

  let promptsEs = '';
  const promptsPath = path.join(systemDir, 'prompts.es.md');
  if (fs.existsSync(promptsPath)) {
    const promptsContent = fs.readFileSync(promptsPath, 'utf-8');
    const promptsMatch = promptsContent.match(/^---\r?\n([\s\S]*?)\r?\n---\r?\n([\s\S]*)$/);
    promptsEs = promptsMatch ? promptsMatch[2].trim() : promptsContent.trim();
  }

  const esKb = esDocs.join('\n\n');
  const enKb = enDocs.length > 0 ? enDocs.join('\n\n') : esKb;

  const kbJsContent = `// generated by build.js - do not edit
const es = \`${esKb.replace(/`/g, '\\`').replace(/\${/g, '\\${')}\`;
const en = \`${enKb.replace(/`/g, '\\`').replace(/\${/g, '\\${')}\`;
const prompts = \`${promptsEs.replace(/`/g, '\\`').replace(/\${/g, '\\${')}\`;

module.exports = { es, en, prompts };
`;

  fs.writeFileSync(path.join(rootDir, 'api', 'kb.js'), kbJsContent, 'utf-8');
  console.log("api/kb.js generated successfully.");
}

function injectChatbot() {
  console.log("Injecting chatbot to all HTML pages...");
  const chatbotTemplatePath = path.join(rootDir, 'knowledge-base', 'experience', 'chatbot.html');
  const staticKbPath = path.join(rootDir, 'knowledge-base', 'experience', 'static-kb.json');
  
  if (!fs.existsSync(chatbotTemplatePath) || !fs.existsSync(staticKbPath)) {
    console.error("Chatbot template or static-kb.json missing.");
    return null;
  }
  
  let template = fs.readFileSync(chatbotTemplatePath, 'utf-8');
  const staticData = JSON.parse(fs.readFileSync(staticKbPath, 'utf-8'));
  
  // Inject static data placeholders into the template
  template = template.replace('/* @INJECT_STATIC_KB@ */ {}', JSON.stringify(staticData.KB, null, 2));
  template = template.replace('/* @INJECT_STATIC_CHIPS@ */ {}', JSON.stringify(staticData.CHIPS, null, 2));
  template = template.replace('/* @INJECT_STATIC_RULES@ */ []', JSON.stringify(staticData.RULES, null, 2));
  
  const filesToInject = [
    'booking-engine.html',
    'cef-design-system.html',
    'ilunion-cro.html',
    'it-ops-oracle.html',
    'paolo-pizzeria.html'
  ];
  
  const injectRegex = /<!-- ===================== CHATBOT MARTA ===================== -->[\s\S]*?<!-- ===================== \/ CHATBOT MARTA ===================== -->/g;
  const newChatbotBlock = `<!-- ===================== CHATBOT MARTA ===================== -->\n${template}\n<!-- ===================== / CHATBOT MARTA ===================== -->`;
  
  for (const file of filesToInject) {
    const filePath = path.join(rootDir, file);
    if (fs.existsSync(filePath)) {
      let content = fs.readFileSync(filePath, 'utf-8');
      if (injectRegex.test(content)) {
        content = content.replace(injectRegex, newChatbotBlock);
        fs.writeFileSync(filePath, content, 'utf-8');
        console.log(`Injected chatbot into: ${file}`);
      } else {
        console.warn(`Markers not found in: ${file}`);
      }
    }
  }
  
  return newChatbotBlock;
}

// Run compilation of knowledge base
compileKnowledgeBase();

// Inject chatbot and get the compiled block
const chatbotBlock = injectChatbot();

// Write the modified index.html back with the injected chatbot
let finalHtml = $.html();
if (chatbotBlock) {
  const injectRegex = /<!-- ===================== CHATBOT MARTA ===================== -->[\s\S]*?<!-- ===================== \/ CHATBOT MARTA ===================== -->/g;
  if (injectRegex.test(finalHtml)) {
    finalHtml = finalHtml.replace(injectRegex, chatbotBlock);
    console.log("Injected chatbot into index.html");
  }
}

fs.writeFileSync(indexHtmlPath, finalHtml, 'utf-8');
console.log("Build complete.");

