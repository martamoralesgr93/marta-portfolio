(function() {
  // Lista de emails autorizados para entrar directamente con su cuenta de Google (en minúscula)
  const WHITELISTED_EMAILS = [
    'mmoralesgr93@gmail.com', // Marta
    'recruiter@google.com',
    'talent@hiberus.com'
  ];

  // Lista de tokens válidos (en minúsculas y sin espacios)
  const VALID_TOKENS = [
    'mmorales2026'
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
    let domain = "unknown";
    if (savedGoogleEmail && savedGoogleEmail.includes("@")) {
      domain = savedGoogleEmail.split("@")[1];
    } else if (isTokenAuthorized) {
      domain = savedToken.toLowerCase();
    }
    
    window.clarity("identify", trackingId);
    window.clarity("set", "company", trackingId);
    window.clarity("set", "company_domain", domain);
    window.clarity("set", "user_type", isGoogleAuthorized ? "google_auth" : "token_holder");
  }

  // Global Lock: si no está autorizado, inyectar estilos de bloqueo de inmediato para evitar FOUC
  if (!isAuthorized) {
    const isIndexPage = window.location.pathname === '/' ||
                        window.location.pathname.endsWith('index.html') ||
                        window.location.pathname === '';
    if (!isIndexPage) {
      const currentPath = window.location.pathname + window.location.search + window.location.hash;
      window.location.href = '/index.html?redirect=' + encodeURIComponent(currentPath);
      return;
    }

    const style = document.createElement('style');
    style.id = 'auth-lock-style';
    style.innerHTML = `
      #portfolio-content { display: none !important; }
      #portfolio-lock-screen { display: flex !important; }
      .lock-close-btn { display: none !important; }
    `;
    document.head.appendChild(style);

    // Monitorear localStorage periódicamente para detectar el desbloqueo y recargar la página
    const authInterval = setInterval(function() {
      const currentToken = localStorage.getItem('portfolio_token');
      const currentEmail = localStorage.getItem('portfolio_google_email');
      const isTokenOk = isValidToken(currentToken);
      const isEmailOk = currentEmail && WHITELISTED_EMAILS.includes(currentEmail.trim().toLowerCase());
      
      if (isTokenOk || isEmailOk) {
        clearInterval(authInterval);
        const lockStyle = document.getElementById('auth-lock-style');
        if (lockStyle) lockStyle.parentNode.removeChild(lockStyle);
        window.location.reload();
      }
    }, 300);
  }

  // Compatibilidad con enlaces antiguos: index.html?redirect=/pagina → ir directo a la página
  const isIndexPage = window.location.pathname === '/' ||
                      window.location.pathname.endsWith('index.html') ||
                      window.location.pathname === '';
  if (isIndexPage) {
    const redirectUrl = getQueryParam('redirect');
    if (redirectUrl && redirectUrl.startsWith('/') && !redirectUrl.startsWith('//')) {
      window.location.href = redirectUrl;
    }
  }
})();
