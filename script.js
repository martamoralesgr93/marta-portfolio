// Scroll suave al contacto
document.getElementById('contactBtn').addEventListener('click', () => {
  document.getElementById('contacto').scrollIntoView({behavior: 'smooth'});
});

// Botón enviar email
document.getElementById('emailBtn').addEventListener('click', () => {
  window.location.href = "mailto:marta.morales@email.com";
});

// Menú hamburguesa responsive
const menuToggle = document.querySelector('.menu-toggle');
const navUl = document.querySelector('nav ul');

menuToggle.addEventListener('click', () => {
  navUl.classList.toggle('active');
});
