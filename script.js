// Scroll suave a proyectos
function scrollToProjects() {
  const section = document.getElementById('projects');
  section.scrollIntoView({ behavior: 'smooth', block: 'start' });
}

// Modal de caso de proyecto
const projects = {
  hotel: {
    title: "Rediseño de experiencia hotelera",
    subtitle: "Optimización del flujo de reservas y experiencia de usuario",
    description: `
      <p>En este proyecto trabajé para ILUNION Hotels en el rediseño completo del flujo de reserva para mejorar la conversión y la satisfacción de los usuarios.</p>
      <p>Proceso: investigación con clientes, mapeo de viajes, prototipado, pruebas A/B y refinamiento iterativo.</p>
      <p>Resultado: +12 % conversión, -18 % abandonos en checkout, mayor fidelización de clientes.</p>
    `,
    image: "https://images.unsplash.com/photo-1581090700227-1ec1e556e274?crop=entropy&cs=tinysrgb&fit=max&w=800",
  },
  interna: {
    title: "Plataforma digital interna",
    subtitle: "Mejora de procesos internos mediante diseño UX",
    description: `
      <p>Diseñé una plataforma interna para mejorar la eficiencia operativa de ILUNION Hotels. Hicimos workshops con empleados, diseñamos dashboards, flujos automáticos y microinteracciones.</p>
      <p>Resultado: +28 % eficiencia en procesos, +34 % adopción interna, -40 % errores operativos.</p>
    `,
    image: "https://images.unsplash.com/photo-1581091870621-9c4b0f1f97cd?crop=entropy&cs=tinysrgb&fit=max&w=800",
  },
  mvp: {
    title: "Conceptos de producto digital",
    subtitle: "MVPs y wireframes para nuevas ideas",
    description: `
      <p>En este proyecto conceptual diseñé varios MVPs para nuevas líneas de producto digital. Validamos hipótesis con prototipos lo-fi y tests tempranos.</p>
      <p>Resultado: validamos 3 hipótesis de 4, redujimos tiempo de aprendizaje a 2 semanas y aumentamos retención piloto +9 %.</p>
    `,
    image: "https://images.unsplash.com/photo-1612831455547-9cbe03cdd94c?crop=entropy&cs=tinysrgb&fit=max&w=800",
  },
  eco: {
    title: "EcoMove App",
    subtitle: "App de movilidad sostenible para GreenMobility",
    description: `
      <p>Concepto de app que incentiva rutas ecológicas, comparte coches y recompensa el comportamiento sostenible. Realicé investigación UX, diseño de flujos y prototipado.</p>
      <p>Resultado proyectado: +20 % de adopción de rutas verdes, +15 % usuarios recurrentes, reducción de emisiones estimada.</p>
    `,
    image: "https://images.unsplash.com/photo-1591696205602-2f0c8b867f44?crop=entropy&cs=tinysrgb&fit=max&w=800",
  },
  learnx: {
    title: "LearnX",
    subtitle: "Plataforma educativa con IA y microlearning",
    description: `
      <p>Prototipo para EduNext: microlearning, IA para adaptar contenido, flujo gamificado, dashboards de progreso y analíticas de retención.</p>
      <p>Resultado proyectado: +40 % engagement, +30 % retención en usuarios beta, feedback muy positivo en pruebas de usabilidad.</p>
    `,
    image: "https://images.unsplash.com/photo-1602526210740-093e524d6a6d?crop=entropy&cs=tinysrgb&fit=max&w=800",
  },
  shop: {
    title: "ShopAura",
    subtitle: "Rediseño de e-commerce premium para Aura Retail",
    description: `
      <p>Rediseño de e-commerce con experiencia inmersiva, microinteracciones en carrito, recorrido de compra optimizado y transiciones de producto envolventes.</p>
      <p>Resultado proyectado: +25 % conversión, +18 % valor medio de pedido, experiencia de marca más elegante y memorable.</p>
    `,
    image: "https://images.unsplash.com/photo-1591696205602-0e5e8c2f0e9a?crop=entropy&cs=tinysrgb&fit=max&w=800",
  }
};

function openProjectModal(key) {
  const data = projects[key];
  if (!data) return;
  const backdrop = document.getElementById('projectModal');
  const body = document.getElementById('modalBody');
  body.innerHTML = `
    <h2>${data.title}</h2>
    <h4>${data.subtitle}</h4>
    <img src="${data.image}" alt="${data.title}" style="width:100%; border-radius: 12px; margin: 16px 0;">
    <div>${data.description}</div>
  `;
  backdrop.classList.add('show');
  const modal = backdrop.querySelector('.modal');
  modal.classList.add('show');
}

function closeProjectModal() {
  const backdrop = document.getElementById('projectModal');
  const modal = backdrop.querySelector('.modal');
  modal.classList.remove('show');
  setTimeout(() => backdrop.classList.remove('show'), 300);
}

// Formulario ficticio
document.getElementById('contactForm').addEventListener('submit', function(e) {
  e.preventDefault();
  const name = this.querySelector('input[type="text"]').value || 'Marta';
  showToast(`Gracias ${name}, tu mensaje ha sido recibido 😊`);
  this.reset();
});

// Toast simple
function showToast(message) {
  const toast = document.createElement('div');
  toast.textContent = message;
  toast.style.position = 'fixed';
  toast.style.bottom = '24px';
  toast.style.right = '24px';
  toast.style.padding = '12px 20px';
  toast.style.background = 'linear-gradient(45deg, var(--color-accent1), var(--color-accent2))';
  toast.style.color = 'white';
  toast.style.borderRadius = '12px';
  toast.style.boxShadow = '0 8px 24px rgba(0,0,0,0.2)';
  toast.style.opacity = '0';
  toast.style.transform = 'translateY(20px)';
  toast.style.transition = 'opacity 0.4s, transform 0.4s';
  document.body.appendChild(toast);

  requestAnimationFrame(() => {
    toast.style.opacity = '1';
    toast.style.transform = 'translateY(0)';
  });

  setTimeout(() => {
    toast.style.opacity = '0';
    toast.style.transform = 'translateY(20px)';
    setTimeout(() => document.body.removeChild(toast), 500);
  }, 3000);
}
