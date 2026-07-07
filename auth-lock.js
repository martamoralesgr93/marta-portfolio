(function() {
  // Lista de emails autorizados para entrar directamente con su cuenta de Google (en minúscula)
  const WHITELISTED_EMAILS = [
    'mmoralesgr93@gmail.com', // Marta
    'recruiter@google.com',
    'talent@hiberus.com'
  ];

  // Lista de tokens válidos (en minúsculas y sin espacios)
  const VALID_TOKENS = [
    'hiberus',
    'recruiter',
    'talent',
    'hiring',
    'invited',
    'design-team',
    'marta2026',
    'acceso',
    'hr',
    'guest',
    'oportunidad'
  ];

  // Helper para obtener parámetros de la URL
  function getQueryParam(name) {
    const urlParams = new URLSearchParams(window.location.search);
    return urlParams.get(name);
  }

  // Valida si un token es válido
  function isValidToken(token) {
    if (!token) return false;
    const cleanToken = token.trim().toLowerCase();
    return VALID_TOKENS.includes(cleanToken);
  }

  // Comprobar si viene un token por URL
  const tokenFromUrl = getQueryParam('token');
  if (tokenFromUrl && isValidToken(tokenFromUrl)) {
    localStorage.setItem('portfolio_token', tokenFromUrl.trim().toLowerCase());
    
    // Limpiar el token de la barra de direcciones de forma sutil
    const url = new URL(window.location.href);
    url.searchParams.delete('token');
    window.history.replaceState({}, document.title, url.pathname + url.search);
  }

  const savedToken = localStorage.getItem('portfolio_token');
  const savedGoogleEmail = localStorage.getItem('portfolio_google_email');
  
  const isTokenAuthorized = isValidToken(savedToken);
  const isGoogleAuthorized = savedGoogleEmail && WHITELISTED_EMAILS.includes(savedGoogleEmail.trim().toLowerCase());
  const isAuthorized = isTokenAuthorized || isGoogleAuthorized;

  // Registrar en Clarity si está autorizado
  if (isAuthorized && typeof window.clarity === "function") {
    const trackingId = savedGoogleEmail || savedToken;
    window.clarity("set", "company", trackingId);
    window.clarity("set", "user_type", isGoogleAuthorized ? "google_auth" : "token_holder");
  }

  // Determinar si es la página de inicio
  const isIndexPage = window.location.pathname === '/' || 
                      window.location.pathname.endsWith('index.html') || 
                      window.location.pathname === '';

  if (!isAuthorized) {
    if (!isIndexPage) {
      // Ocultar el contenido de la página inmediatamente para evitar flashes visuales
      document.write('<style>html { display: none !important; }</style>');
      
      // Redirigir a index.html preservando la página solicitada como redirección
      const redirectPage = window.location.pathname + window.location.search;
      window.location.href = '/index.html?redirect=' + encodeURIComponent(redirectPage);
    }
  } else {
    // Si ya está autorizado y está en index.html con un parámetro de redirección, redirigir allí
    if (isIndexPage) {
      const redirectUrl = getQueryParam('redirect');
      if (redirectUrl) {
        // Validación de seguridad para evitar redirecciones abiertas a otros dominios
        if (redirectUrl.startsWith('/') && !redirectUrl.startsWith('//')) {
          window.location.href = redirectUrl;
        }
      }
    }
  }
})();
