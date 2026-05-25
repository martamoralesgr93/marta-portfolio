const fs = require('fs');

let scss = fs.readFileSync('styles.scss', 'utf8');
const start = scss.indexOf('.cs-content {');
if(start > -1) { 
  scss = scss.substring(0, start); 
}

const newCss = `
/* --- CASE STUDY STYLES --- */
.cs-content { 
  max-width: 800px; 
  margin: 3rem auto 0 auto; 
  line-height: 1.7; 
  font-family: 'Inter', sans-serif; 
  color: var(--text-primary); 
}
.cs-section { margin-bottom: 4rem; }
.cs-section h1 { 
  font-size: 1.75rem; 
  margin-bottom: 1.5rem; 
  font-weight: 700; 
  letter-spacing: -0.02em; 
}
.cs-section h3 { 
  font-size: 1.25rem; 
  margin-top: 2rem; 
  margin-bottom: 1rem; 
  font-weight: 600; 
}
.cs-content p { 
  margin-bottom: 1.25rem; 
  font-size: 1.05rem; 
  color: var(--text-secondary); 
}
.cs-content ul { 
  padding-left: 20px; 
  margin-bottom: 1.5rem; 
  color: var(--text-secondary); 
}
.cs-content li { margin-bottom: 0.5rem; }
.cs-content strong { color: var(--text-primary); font-weight: 600; }
.cs-content blockquote { 
  font-style: italic; 
  font-size: 1.15rem; 
  line-height: 1.6; 
  border-left: 4px solid var(--accent); 
  padding: 1rem 1.5rem; 
  background: var(--surface); 
  border-radius: 0 8px 8px 0; 
  color: var(--text-primary); 
  margin: 2.5rem 0; 
}
.cs-figure { margin: 2.5rem 0; text-align: center; }
.cs-figure img { 
  max-width: 100%; 
  max-height: 70vh; 
  object-fit: contain; 
  border-radius: 12px; 
  box-shadow: 0 8px 30px rgba(0,0,0,0.06); 
  border: 1px solid var(--border); 
}
.comparative { 
  display: grid; 
  grid-template-columns: 2.5fr 1fr; 
  gap: 2rem; 
  align-items: start; 
  margin: 3rem 0; 
  background: var(--surface); 
  padding: 2rem; 
  border-radius: 16px; 
  border: 1px solid var(--border); 
}
.comparative .col p { 
  text-align: center; 
  font-size: 0.85rem; 
  text-transform: uppercase; 
  letter-spacing: 0.05em; 
  margin-bottom: 1rem; 
}
@media (max-width: 768px) { 
  .comparative { 
    grid-template-columns: 1fr; 
    padding: 1rem; 
  } 
  .cs-figure img {
    max-height: 50vh;
  }
}
`;

fs.writeFileSync('styles.scss', scss + newCss);
console.log("Patched styles.scss");
