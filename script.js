// Dark Mode Toggle
const darkModeToggle = document.getElementById('darkModeToggle');
darkModeToggle.addEventListener('click', () => {
  document.body.classList.toggle('dark');
});

// Language Toggle
const langSelect = document.getElementById('langSelect');
langSelect.addEventListener('change', (e) => {
  const lang = e.target.value;
  alert(`Función de cambio de idioma a ${lang} (implementa traducción de contenido aquí)`);
});

// Scroll Animations
const observer = new IntersectionObserver(entries => {
  entries.forEach(entry => {
    if(entry.isIntersecting){
      entry.target.classList.add('visible');
    }
  });
}, { threshold: 0.1 });

document.querySelectorAll('.project-card, .service-card, .about-section').forEach(el => {
  el.classList.add('hidden');
  observer.observe(el);
});
