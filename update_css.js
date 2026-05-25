const fs = require('fs');

let scss = fs.readFileSync('styles.scss', 'utf8');

// 1. Overwrite :root variables for Premium Light Mode
const rootStart = scss.indexOf(':root {');
const rootEnd = scss.indexOf('}', rootStart) + 1;

const newRoot = `:root {
  --bg: #ffffff;
  --bg-soft: #fafafa;
  --text: #111827;            /* Profundo para títulos */
  --text-secondary: #4B5563; /* Elegante para párrafos */
  --text-muted: #9CA3AF;
  --text-primary: #111827;
  --divider: #E5E7EB;
  --divider-strong: #D1D5DB;
  --hover: #F3F4F6;
  --surface: #ffffff;
  --accent: #111827;
  --border: #E5E7EB;

  --shadow-sm: 0 1px 2px 0 rgba(0, 0, 0, 0.05);
  --shadow: 0 4px 6px -1px rgba(0, 0, 0, 0.05), 0 2px 4px -1px rgba(0, 0, 0, 0.03);
  --shadow-md: 0 10px 15px -3px rgba(0, 0, 0, 0.05), 0 4px 6px -2px rgba(0, 0, 0, 0.025);
  --shadow-lg: 0 20px 25px -5px rgba(0, 0, 0, 0.05), 0 10px 10px -5px rgba(0, 0, 0, 0.02);

  --space-md: 24px;
  --space-lg: 48px;
  --space-xl: 80px;
  --s-8:   8px;
  --s-16: 16px;
  --s-24: 24px;
  --s-32: 32px;
  --s-48: 48px;
  --s-64: 64px;
  --s-80: 80px;
  --s-96: 96px;
  --s-128: 128px;
  --space-1: 8px;
  --space-2: 16px;
  --space-3: 24px;
  --space-4: 32px;
  --space-5: 64px;
  --space-6: 88px;

  --radius-sm: 4px;
  --radius-md: 8px;
  --radius-lg: 12px;
  --radius: 8px;

  --container-mobile: 390px;
  --container-desktop: 1200px;
  --sidebar-width: 420px;
  --content-max: 1000px;
  --text-max: 680px;
  --editorial-max: 720px;

  --f-hero:    clamp(48px, 6vw, 72px);
  --f-section: 32px;
  --f-project: 24px;
  --f-body:    17px;
  --f-small:   13px;

  --ease-out: cubic-bezier(0.16, 1, 0.3, 1);
  --ease-in-out: cubic-bezier(0.4, 0, 0.2, 1);
}`;

scss = scss.substring(0, rootStart) + newRoot + scss.substring(rootEnd);

// 2. Add specific premium styles at the end
const premiumStyles = `
/* --- PREMIUM LIGHT MODE & LAYOUT OVERRIDES --- */
body {
  background: var(--bg);
  background-image: radial-gradient(circle at top right, rgba(0,0,0,0.015) 0%, transparent 40%),
                    radial-gradient(circle at bottom left, rgba(0,0,0,0.015) 0%, transparent 40%);
}

.nav {
  background: rgba(255, 255, 255, 0.7);
  backdrop-filter: blur(24px) saturate(180%);
  -webkit-backdrop-filter: blur(24px) saturate(180%);
  border-bottom: 1px solid rgba(0, 0, 0, 0.05);
}

.work-item {
  border-top: none;
  background: var(--surface);
  border: 1px solid var(--border);
  border-radius: var(--radius-lg);
  padding: 40px;
  margin-bottom: 24px;
  box-shadow: var(--shadow-sm);
  transition: all 0.3s var(--ease-out);
}

.work-item:hover {
  box-shadow: var(--shadow-md);
  transform: translateY(-2px);
  border-color: rgba(0,0,0,0.1);
}

.work-header {
  align-items: center;
}

.metrics-grid {
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(150px, 1fr));
  gap: 16px;
  margin: 32px 0;
}

.metric {
  background: var(--bg-soft);
  padding: 24px;
  border-radius: var(--radius-md);
  border: 1px solid var(--border);
  display: flex;
  flex-direction: column;
  align-items: flex-start;
  box-shadow: var(--shadow-sm);
}

.metric-value {
  font-size: 28px;
  font-weight: 700;
  color: var(--accent);
  letter-spacing: -0.02em;
  margin-bottom: 4px;
}

.metric-label {
  font-size: 13px;
  color: var(--text-secondary);
  font-weight: 500;
  text-transform: uppercase;
  letter-spacing: 0.05em;
}

/* Adjust comparative layout for max Desktop efficiency */
.comparative {
  display: grid;
  grid-template-columns: 3fr 1fr;
  gap: 24px;
  align-items: start;
  margin: 40px 0;
  background: var(--bg-soft);
  padding: 32px;
  border-radius: var(--radius-lg);
  border: 1px solid var(--border);
  box-shadow: var(--shadow-sm);
}

.comparative .col p {
  text-align: left;
  font-size: 13px;
  color: var(--text-secondary);
  font-weight: 600;
  margin-bottom: 16px;
  border-bottom: 1px solid var(--divider);
  padding-bottom: 8px;
}

.comparative img {
  border-radius: var(--radius-md);
  box-shadow: var(--shadow);
  border: 1px solid var(--divider);
}

@media (max-width: 768px) {
  .comparative {
    grid-template-columns: 1fr;
    padding: 16px;
  }
}
`;

fs.writeFileSync('styles.scss', scss + premiumStyles);
console.log("Updated styles.scss");
