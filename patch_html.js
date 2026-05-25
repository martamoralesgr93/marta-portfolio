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
  const p1 = $.html('#project-ilunion');
  const p2 = $.html('#project-offers');
  const p3 = $.html('#project-academic');
  
  $('#project-ilunion').remove();
  $('#project-offers').remove();
  $('#project-academic').remove();

  workSection.append(p1);
  workSection.append(p2);
  workSection.append(p3);
}

// Ensure the titles are correct
$('#project-ilunion .title-project').text('CRO Optimization');
$('#project-offers .title-project').text('Offer Component Redesign');
$('#project-academic .title-project').text('UX/UI Foundations');

// Also update the carousel images for 'project-offers' since it didn't have one before
const carouselOffers = $('#carousel-offers');
if (!carouselOffers.length) {
  // Try to find where to put the carousel in project-offers
  const summaryOffers = $('#project-offers .work-summary');
  const pSummaryOffers = summaryOffers.find('p[data-i18n="p3-summary"]');
  if (pSummaryOffers.length) {
    pSummaryOffers.before(`
      <div class="carousel-container project-visuals" id="carousel-offers">
        <div class="carousel-track">
          <div class="carousel-item media">
            <img src="projects/ilunion/offer-component-redesign/05-design/images/Compo-desk.webp" alt="Offer Component Desk" class="zoom-target">
          </div>
        </div>
      </div>
    `);
  }
}

fs.writeFileSync(htmlPath, $.html());
console.log('HTML Patched successfully.');
