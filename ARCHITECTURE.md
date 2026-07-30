# Atomic Design System — Portfolio Architecture

## Overview

Sistema atómico de componentes SCSS para mejorar **armonía visual, coherencia y legibilidad** en los 5 case studies sin modificar contenido.

**Stack:** HTML + SCSS (Atomic Design)

---

## Hierarchical Structure

```
TOKENS (variables compartidas)
  ↓
ATOMS (componentes base reutilizables)
  ↓
MOLECULES (combinaciones simples de atoms)
  ↓
ORGANISMS (componentes complejos de casos)
  ↓
HTML (aplicar clases a markup existente)
```

---

## Layer 1: TOKENS

**Archivo:** `sass/tokens/`

- `_spacing.scss` — escala 8px (`--space-xs` a `--space-4xl`)
- `_typography.scss` — fuentes, tamaños, weights, line-heights
- `_colors.scss` — variables de marca (acento, secundario)
- `_radius.scss` — border-radius tokens
- `_shadow.scss` — shadow tokens
- `_breakpoints.scss` — media query breakpoints
- `_motion.scss` — transiciones y animaciones

### Usar en HTML:
```html
<div style="padding: var(--space-lg); font-size: var(--text-md);">
  Usa CSS variables directas o aplica clases atómicas.
</div>
```

---

## Layer 2: ATOMS

**Archivo:** `sass/atoms/`

Componentes base, reutilizables en cualquier página.

### `.btn` — Buttons
```html
<button class="btn btn--primary">Primary CTA</button>
<button class="btn btn--secondary">Secondary</button>
<a href="#" class="btn btn--ghost">Ghost Link</a>
```

### `.badge` — Badges
```html
<span class="badge badge--accent">Case Study #01</span>
<span class="badge badge--success">Success</span>
<span class="badge badge--alert">Critical</span>
```

### `.label` — Labels & Eyebrows
```html
<span class="label">Problem Statement</span>
<span class="eyebrow">01 — My Role</span>
```

---

## Layer 3: MOLECULES

**Archivo:** `sass/molecules/`

Combinaciones pequeñas de atoms. Reutilizables en casos.

### `.card` — Card Container
```html
<div class="card card--glass">
  <div class="card__header">
    <div class="card__icon">📊</div>
    <div>
      <div class="card__title">Case Summary</div>
      <div class="card__subtitle">Quick overview</div>
    </div>
  </div>
  <div class="card__body">
    <!-- contenido -->
  </div>
  <div class="card__footer">
    <!-- acciones -->
  </div>
</div>
```

### `.grid` — Grid Layouts
```html
<div class="grid grid--4col grid--gap-lg">
  <div>Column 1</div>
  <div>Column 2</div>
  <div>Column 3</div>
  <div>Column 4</div>
</div>
```

### `.metric` — KPI Display
```html
<div class="metric metric--lg">
  <div class="metric__label">Conversion Rate</div>
  <div class="metric__value">6.5%</div>
  <div class="metric__unit">+3.14pp</div>
</div>
```

---

## Layer 4: ORGANISMS

**Archivo:** `sass/organisms/`

Componentes complejos específicos de case studies.

### `.case-summary` — Quick Summary Grid
```html
<div class="case-summary">
  <div class="case-summary__col">
    <label class="case-summary__label">
      <svg><!-- icono --></svg>
      Problem
    </label>
    <div class="case-summary__value">
      Descripción del problema...
    </div>
  </div>
  <!-- 3 columnas más (Role, Decision, Goal) -->
</div>
```

**Replaces:** Inline `.quick-summary-grid` styles

### `.evidence` — Before/After Comparison
```html
<div class="evidence">
  <div class="evidence__item">
    <div class="evidence__header">
      <div class="evidence__badge">A</div>
      <div class="evidence__meta">
        <div class="evidence__title">Control</div>
        <div class="evidence__subtitle">Before</div>
      </div>
    </div>
    <img class="evidence__image" src="..." alt="Before">
    <div class="evidence__caption">Description...</div>
  </div>
  <div class="evidence__item">
    <!-- B variante -->
  </div>
</div>
```

**Replaces:** `.c2-evidence-pair` / `.c2-evidence-item` inline styles

### `.insight` — Highlighted Quote/Insight
```html
<div class="insight">
  <p class="insight__text">
    "Key insight or learning from the case study..."
  </p>
</div>
```

**Replaces:** `.insight-box` inline styles

### `.meta-bar` — Case Metadata Display
```html
<div class="meta-bar">
  <div class="meta-bar__item">
    <div class="meta-bar__label">Role</div>
    <div class="meta-bar__value">Product Designer · CRO Lead</div>
  </div>
  <div class="meta-bar__item">
    <div class="meta-bar__label">Period</div>
    <div class="meta-bar__value">2024–2026</div>
  </div>
  <!-- 2 más -->
</div>
```

**Replaces:** Inline meta displays

---

## Migration Path

### Phase 1: Setup (DONE ✓)
- [x] Create token system
- [x] Create atomic components
- [x] Update styles.scss to import system

### Phase 2: Refactor HTML (IN PROGRESS)
**Replace inline `style=""` attributes with component classes**

1. **booking-engine.html**
   - Replace `.quick-summary-grid` → `.case-summary`
   - Replace `.c2-evidence-pair` → `.evidence`
   - Add `.meta-bar` for case metadata

2. **cef-design-system.html**
   - Same pattern as booking-engine

3. **ilunion-cro.html**
   - Same pattern (most comprehensive case)

4. **it-ops-oracle.html**
   - Same pattern

5. **paolo-pizzeria.html**
   - Same pattern

### Phase 3: Cleanup (AFTER MIGRATION)
- Remove redundant inline styles
- Remove old component classes (`.quick-summary-grid`, `.c2-evidence-*`, etc.)
- Verify responsive behavior
- Test accessibility

---

## Component Reference

| Component | File | Usage |
|-----------|------|-------|
| Button | `_button.scss` | CTAs, links |
| Badge | `_badge.scss` | Tags, status |
| Label | `_label.scss` | Section labels |
| Card | `_card.scss` | Container cards |
| Grid | `_grid.scss` | Layouts (2/3/4 col) |
| Metric | `_metric.scss` | KPI numbers |
| Case Summary | `_case-summary.scss` | Quick summary grid |
| Evidence | `_evidence.scss` | Before/after pairs |
| Insight | `_insight.scss` | Quote/learning |
| Meta Bar | `_meta-bar.scss` | Case metadata |

---

## Naming Convention

**BEM-inspired + Atomic Design:**

```
.component              → block
.component__element     → element inside block
.component--modifier    → variation
```

Examples:
- `.btn--primary` (button variation)
- `.card__header` (element)
- `.grid--2col` (modifier)
- `.case-summary__label` (element)

---

## Responsive Behavior

All organisms include mobile breakpoints:
- `@media (max-width: 1024px)` — Tablet
- `@media (max-width: 768px)` — Mobile
- `@media (max-width: 640px)` — Small mobile

Example:
```scss
.case-summary {
  grid-template-columns: repeat(4, 1fr); // Desktop
}

@media (max-width: 1024px) {
  .case-summary {
    grid-template-columns: repeat(2, 1fr); // Tablet
  }
}

@media (max-width: 640px) {
  .case-summary {
    grid-template-columns: 1fr; // Mobile
  }
}
```

---

## Accessibility

All interactive components include:
- `:focus-visible` outline (2px solid `--accent`)
- Semantic HTML (`<button>`, `<label>`)
- Color contrast ≥ 4.5:1 for text
- ARIA labels where needed

---

## Next Steps

1. **Compile SCSS:** `npm run build-local`
2. **Update HTML:** Replace inline styles with component classes
3. **Verify:** Check visual consistency across 5 cases
4. **Test:** Mobile, accessibility, focus states
5. **Commit:** Record atomic system addition

---

## Troubleshooting

**Components not appearing?**
- Check `styles.scss` imports `_atomic-system.scss`
- Verify SCSS compiled to `styles.css`
- Inspect browser DevTools for class names

**Conflicts with old styles?**
- Old component classes may override atoms
- Use `!important` temporarily if needed
- Remove inline `style=""` attributes

**Spacing/sizing off?**
- Check token values in `sass/tokens/`
- Verify media queries for viewport
- Use browser DevTools to inspect computed styles

---

**Created:** 2026-07-31  
**System:** SCSS Atomic Design  
**Purpose:** Improve harmony, consistency, and maintainability
