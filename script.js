// Modo oscuro / claro
const toggleDark = document.getElementById('toggle-dark');
toggleDark.addEventListener('click', () => {
  document.body.classList.toggle('dark');
});

// Traducción ES / EN
const toggleLang = document.getElementById('toggle-lang');
toggleLang.addEventListener('click', () => {
  const elements = document.querySelectorAll('[data-es]');
  elements.forEach(el => {
    if(el.innerText === el.dataset.es){
      el.innerText = el.dataset.en;
    } else {
      el.innerText = el.dataset.es;
    }
  });
});
