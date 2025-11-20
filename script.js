// Dark Mode toggle
const toggleDark = document.querySelector('.toggle-dark');
toggleDark.addEventListener('click', () => {
  document.body.classList.toggle('dark-mode');
});

// Animación de entrada de secciones
window.addEventListener('scroll', () => {
  const sections = document.querySelectorAll('section');
  sections.forEach(sec => {
    const top = sec.getBoundingClientRect().top;
    if(top < window.innerHeight - 100){
      sec.classList.add('visible');
    }
  });
});
