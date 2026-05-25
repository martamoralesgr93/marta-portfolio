const fs = require('fs');
const cheerio = require('cheerio');

const htmlPath = 'index.html';
let html = fs.readFileSync(htmlPath, 'utf8');

const $ = cheerio.load(html);

// Update Hero text
$('.hero-eyebrow').text('PRODUCT DESIGNER · UX STRATEGIST');
$('.profile-name').text('Marta Morales');
$('.hero-description').html(`
  <p data-i18n="hero-description-1">Product Designer orientada a UX estratégico, CRO, customer journey y negocio digital.</p>
  <p data-i18n="hero-description-2">Conecto la experiencia de usuario con objetivos reales de negocio: conversión, retención y eficiencia operativa.</p>
  <p data-i18n="hero-description-3">Diseño ecosistemas escalables basados en análisis de datos, systems thinking y experimentación constante.</p>
`);

// Reorder projects in the side nav
const navProjectsList = $('#navProjectsList');
if(navProjectsList.length) {
  navProjectsList.html(`
    <li><a href="javascript:void(0)" onclick="openAndScrollProject('project-ilunion')" class="nav-project-link">ILUNION — CRO Optimization</a></li>
    <li><a href="javascript:void(0)" onclick="openAndScrollProject('project-offers')" class="nav-project-link">ILUNION — Offer Component</a></li>
    <li><a href="javascript:void(0)" onclick="openAndScrollProject('project-academic')" class="nav-project-link">CEF — UX/UI Foundations</a></li>
  `);
}

// Reorder the actual articles in section#work
const workSection = $('#work');
if (workSection.length) {
  const p1 = $('#project-ilunion').detach();
  const p2 = $('#project-offers').detach();
  const p3 = $('#project-academic').detach();

  // Update headers if needed
  p1.find('.title-project').text('CRO Optimization');
  p2.find('.title-project').text('Offer Component Redesign');
  p3.find('.title-project').text('UX/UI Foundations');

  // Append in new order
  workSection.append(p1);
  workSection.append(p2);
  workSection.append(p3);
}

fs.writeFileSync(htmlPath, $.html());
console.log('HTML Patched successfully.');
