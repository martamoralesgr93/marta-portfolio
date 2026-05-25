const fs = require('fs');
const cheerio = require('cheerio');

const htmlPath = 'index.html';
let html = fs.readFileSync(htmlPath, 'utf8');

const $ = cheerio.load(html, { decodeEntities: false });

// Update Hero text
$('.hero-eyebrow').text('PRODUCT DESIGNER · UX STRATEGY · GROWTH');
$('.profile-name').text('Marta Morales');
$('.hero-description').html(`
  <p data-i18n="hero-description-1">Formo parte del equipo de Negocio Digital en ILUNION Hotels, optimizando el canal directo mediante diseño estratégico, CRO y decisiones basadas en datos.</p>
  <p data-i18n="hero-description-2">Mi trabajo conecta la experiencia de usuario con objetivos reales de negocio: conversión, revenue y captación.</p>
  <p data-i18n="hero-description-3">Diseño soluciones que no solo son visuales, sino que resuelven problemas operativos y de rentabilidad en entornos de alta complejidad.</p>
`);

// Reorder nav list
const navProjectsList = $('#navProjectsList');
if(navProjectsList.length) {
  navProjectsList.html(`
    <li><a href="javascript:void(0)" onclick="openAndScrollProject('project-ilunion')" class="nav-project-link">Booking Engine & Funnel UX</a></li>
    <li><a href="javascript:void(0)" onclick="openAndScrollProject('project-offers')" class="nav-project-link">Growth Strategy & Conversion</a></li>
    <li><a href="javascript:void(0)" onclick="openAndScrollProject('project-academic')" class="nav-project-link">EdTech Management Platform</a></li>
  `);
}

// Reorder articles by using DOM operations
const workSection = $('#work');
if (workSection.length) {
  const p1 = $('#project-ilunion');
  const p2 = $('#project-offers');
  const p3 = $('#project-academic');
  
  // Remove them first
  p1.remove();
  p2.remove();
  p3.remove();
  
  // Append them in new order
  workSection.append(p1);
  workSection.append(p2);
  workSection.append(p3);
}

// Ensure the titles are correct
$('#project-ilunion .title-project').text('Booking Engine & Funnel UX');
$('#project-offers .title-project').text('Growth Strategy & Conversion');
$('#project-academic .title-project').text('EdTech Management Platform');

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
