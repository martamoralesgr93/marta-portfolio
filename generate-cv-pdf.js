/**
 * generate-cv-pdf.js
 * ──────────────────
 * Genera assets/Marta_Morales_CV_2026.pdf a partir de CV_Marta_Morales_2026.html.
 *
 * Uso:
 *   1. npm install puppeteer   (solo la primera vez)
 *   2. node generate-cv-pdf.js
 *
 * Cada vez que edites el HTML, vuelve a ejecutar este script.
 * El PDF se sobreescribe automáticamente. Un cambio, dos formatos.
 */

const puppeteer = require('puppeteer');
const path = require('path');

(async () => {
  const htmlPath = path.resolve(__dirname, 'CV_Marta_Morales_2026.html');
  const pdfPath  = path.resolve(__dirname, 'assets', 'Marta_Morales_CV_2026.pdf');

  console.log('⏳ Abriendo navegador...');
  const browser = await puppeteer.launch({ headless: 'new' });
  const page    = await browser.newPage();

  console.log('📄 Cargando HTML...');
  await page.goto(`file://${htmlPath}`, { waitUntil: 'networkidle0' });

  // Ocultar la nav bar y el modal (solo para pantalla, no para print)
  // El CSS ya tiene @media print { .portfolio-nav-bar { display: none } }
  // pero forzamos por si acaso
  await page.evaluate(() => {
    const nav   = document.querySelector('.portfolio-nav-bar');
    const modal = document.querySelector('.download-modal-overlay');
    if (nav)   nav.style.display   = 'none';
    if (modal) modal.style.display = 'none';
    document.body.style.paddingTop = '0';
  });

  console.log('🖨️  Generando PDF...');
  await page.pdf({
    path:              pdfPath,
    format:            'A4',
    printBackground:   true,   // preserva fondo negro y colores
    margin:            { top: 0, right: 0, bottom: 0, left: 0 },
    preferCSSPageSize: true,
  });

  await browser.close();
  console.log(`✅ PDF generado en: ${pdfPath}`);
})();
