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

// Reorder nav list
const navProjectsList = $('#navProjectsList');
if(navProjectsList.length) {
  navProjectsList.html(`
    <li><a href="javascript:void(0)" onclick="openAndScrollProject('project-ilunion')" class="nav-project-link">ILUNION — CRO Optimization</a></li>
    <li><a href="javascript:void(0)" onclick="openAndScrollProject('project-offers')" class="nav-project-link">ILUNION — Offer Component</a></li>
    <li><a href="javascript:void(0)" onclick="openAndScrollProject('project-academic')" class="nav-project-link">CEF — UX/UI Foundations</a></li>
  `);
}

// Reorder articles by using DOM operations (detach and append)
const workSection = $('#work');
if (workSection.length) {
  const p1 = $('#project-ilunion').detach();
  const p2 = $('#project-offers').detach();
  const p3 = $('#project-academic').detach();
  
  workSection.append(p1);
  workSection.append(p2);
  workSection.append(p3);
}

// Ensure the titles are correct
$('#project-ilunion .title-project').text('CRO Optimization');
$('#project-offers .title-project').text('Offer Component Redesign');
$('#project-academic .title-project').text('UX/UI Foundations');

// Add or update carousel images for project-offers
const carouselOffers = $('#carousel-offers');
if (carouselOffers.length) {
  carouselOffers.find('.carousel-track').html(`
    <div class="carousel-item media">
      <img src="projects/ilunion/offer-component-redesign/05-design/images/Compo-desk.webp" alt="Offer Component Desk" class="zoom-target">
    </div>
    <div class="carousel-item media">
      <img src="projects/ilunion/offer-component-redesign/05-design/images/Compo-mobile.webp" alt="Offer Component Mobile" class="zoom-target">
    </div>
  `);
} else {
  const summaryOffers = $('#project-offers .work-summary');
  const pSummaryOffers = summaryOffers.find('p[data-i18n="p3-summary"]');
  if (pSummaryOffers.length) {
    pSummaryOffers.before(`
      <div class="carousel-container project-visuals" id="carousel-offers">
        <div class="carousel-track">
          <div class="carousel-item media">
            <img src="projects/ilunion/offer-component-redesign/05-design/images/Compo-desk.webp" alt="Offer Component Desk" class="zoom-target">
          </div>
          <div class="carousel-item media">
            <img src="projects/ilunion/offer-component-redesign/05-design/images/Compo-mobile.webp" alt="Offer Component Mobile" class="zoom-target">
          </div>
        </div>
        <div class="carousel-actions">
          <button class="carousel-btn prev" onclick="event.stopPropagation(); scrollCarousel('carousel-offers', -1)" aria-label="Ver anterior">
            <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.5" stroke-linecap="round" stroke-linejoin="round"><polyline points="15 18 9 12 15 6"></polyline></svg>
          </button>
          <button class="carousel-btn next" onclick="event.stopPropagation(); scrollCarousel('carousel-offers', 1)" aria-label="Ver siguiente">
            <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.5" stroke-linecap="round" stroke-linejoin="round"><polyline points="9 18 15 12 9 6"></polyline></svg>
          </button>
        </div>
      </div>
    `);
  }
}

// Format the HTML properly to make it readable and fix missing elements if any
fs.writeFileSync(htmlPath, $.html());
console.log('Fixed HTML successfully.');
