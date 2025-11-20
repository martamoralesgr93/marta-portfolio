// --- Toggle Modo Oscuro ---
const themeToggle = document.getElementById('theme-toggle');
themeToggle.addEventListener('click', () => {
  document.body.classList.toggle('dark');
});

// --- Selector de Idioma ---
const languageSelector = document.getElementById('language-selector');
languageSelector.addEventListener('change', (e) => {
  const lang = e.target.value;
  document.querySelectorAll('[data-es]').forEach(el => {
    el.textContent = el.dataset[lang];
  });
});

// --- Animaciones scroll o microinteracciones pueden añadirse aquí ---
