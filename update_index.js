const fs = require('fs');

let html = fs.readFileSync('index.html', 'utf-8');

// Change link for ILUNION Hotels — Booking Engine (nav list)
html = html.replace(
  /<a href="javascript:void\(0\)" onclick="openAndScrollProject\('project-ilunion'\)" class="nav-project-link">Booking Engine & Funnel UX<\/a>/g,
  '<a href="/projects/ilunion/cro-optimization/motor-destino/" class="nav-project-link">Booking Engine & Funnel UX</a>'
);
// Change link for ILUNION Hotels — Ofertas (nav list)
html = html.replace(
  /<a href="javascript:void\(0\)" onclick="openAndScrollProject\('project-offers'\)" class="nav-project-link">Growth Strategy & Conversi[oó]n<\/a>/g,
  '<a href="/projects/ilunion/offer-component-redesign/" class="nav-project-link">Growth Strategy & Conversión</a>'
);

// Change article onclick for ILUNION (motor-destino)
html = html.replace(
  /<article id="project-ilunion" class="work-item" onclick="toggleProject\(this\)" tabindex="0" role="button" aria-expanded="false">/g,
  '<article id="project-ilunion" class="work-item" onclick="window.location.href=\'/projects/ilunion/cro-optimization/motor-destino/\'" tabindex="0" role="link">'
);
html = html.replace(
  /<div class="read-more-btn" data-i18n="label-read-more">Ver caso de estudio<\/div>/g,
  '<div class="read-more-btn" data-i18n="label-read-more">Ver caso de estudio &rarr;</div>'
);

// Change article onclick for Offers
html = html.replace(
  /<article id="project-offers" class="work-item" onclick="toggleProject\(this\)" tabindex="0" role="button" aria-expanded="false">/g,
  '<article id="project-offers" class="work-item" onclick="window.location.href=\'/projects/ilunion/offer-component-redesign/\'" tabindex="0" role="link">'
);

// We won't strictly remove the .detail DOM elements via regex to avoid breaking HTML, 
// since they have display: none anyway, but we will add a CSS rule to styles.scss to hide them forcefully 
// or let the old JS stay since we removed the trigger.
// Actually, it's safer to just write the new HTML back.

fs.writeFileSync('index.html', html, 'utf-8');
console.log('index.html updated successfully.');
