# CV Website Implementation Plan

> **For agentic workers:** REQUIRED: Use superpowers:subagent-driven-development (if subagents available) or superpowers:executing-plans to implement this plan. Steps use checkbox (`- [ ]`) syntax for tracking.

**Goal:** Build a single-page personal CV website for Jamie Rees with sidebar navigation, dark/light mode, and expandable experience cards.

**Architecture:** Static single-page site. Fixed sidebar with Font Awesome icon navigation anchors to sections. CSS custom properties power the dark/light theme toggle. JavaScript handles scroll-spy (Intersection Observer), theme persistence (localStorage), and expandable cards.

**Tech Stack:** HTML5, CSS3 (custom properties, flexbox, grid), vanilla JavaScript, Font Awesome 6 Free (CDN), Inter font (Google Fonts CDN). No build tools.

**Spec:** `docs/superpowers/specs/2026-03-17-cv-website-design.md`

---

## File Map

| File | Responsibility |
|------|---------------|
| `index.html` | Page structure, all content, CDN links, semantic HTML |
| `css/styles.css` | All styles: CSS variables, layout, sidebar, sections, responsive, dark/light themes |
| `js/main.js` | Theme toggle, scroll-spy, expandable cards, smooth scroll |
| `favicon.svg` | JR monogram SVG favicon |
| `.gitignore` | Ignore .superpowers/, .DS_Store, etc. |

---

## Chunk 1: Foundation & Sidebar

### Task 1: Project scaffolding

**Files:**
- Create: `.gitignore`
- Create: `favicon.svg`

- [ ] **Step 1: Create .gitignore**

```
.DS_Store
.superpowers/
```

- [ ] **Step 2: Create favicon.svg**

SVG with "JR" text on a blue gradient rounded-rect background:

```svg
<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 32 32">
  <defs>
    <linearGradient id="g" x1="0" y1="0" x2="1" y2="1">
      <stop offset="0%" stop-color="#3b82f6"/>
      <stop offset="100%" stop-color="#1d4ed8"/>
    </linearGradient>
  </defs>
  <rect width="32" height="32" rx="8" fill="url(#g)"/>
  <text x="16" y="22" text-anchor="middle" font-family="Inter,system-ui,sans-serif" font-size="16" font-weight="900" fill="white">JR</text>
</svg>
```

- [ ] **Step 3: Commit**

```bash
git add .gitignore favicon.svg
git commit -m "chore: add gitignore and favicon"
```

---

### Task 2: CSS foundation — variables, reset, layout grid

**Files:**
- Create: `css/styles.css`

- [ ] **Step 1: Create styles.css with CSS custom properties and base layout**

This file handles everything: CSS reset, theme variables, sidebar layout, and the sidebar-plus-main grid. Dark mode is the default (variables on `:root`). Light mode overrides via `[data-theme="light"]`.

```css
/* === Reset === */
*, *::before, *::after {
  box-sizing: border-box;
  margin: 0;
  padding: 0;
}

/* === Theme Variables === */
:root {
  --bg: #0a0a0a;
  --bg-surface: #111111;
  --border: #1e2028;
  --text: #e0e0e0;
  --text-secondary: #888888;
  --accent: #3b82f6;
  --accent-hover: #2563eb;
  --sidebar-width: 72px;
  --transition-speed: 0.3s;
}

[data-theme="light"] {
  --bg: #f8f9fa;
  --bg-surface: #ffffff;
  --border: #e2e4e8;
  --text: #1a1a1a;
  --text-secondary: #666666;
  --accent: #2563eb;
  --accent-hover: #1d4ed8;
}

/* === Base === */
html {
  scroll-behavior: smooth;
  scroll-padding-top: 24px;
}

body {
  font-family: 'Inter', system-ui, -apple-system, sans-serif;
  background: var(--bg);
  color: var(--text);
  font-size: 14px;
  line-height: 1.6;
  transition: background var(--transition-speed), color var(--transition-speed);
}

@media (prefers-reduced-motion: reduce) {
  *, *::before, *::after {
    transition-duration: 0s !important;
    animation-duration: 0s !important;
  }
  html { scroll-behavior: auto; }
}

/* === Layout === */
.layout {
  display: flex;
  min-height: 100vh;
}

/* === Sidebar === */
.sidebar {
  position: fixed;
  top: 0;
  left: 0;
  width: var(--sidebar-width);
  height: 100vh;
  background: var(--bg-surface);
  border-right: 1px solid var(--border);
  display: flex;
  flex-direction: column;
  align-items: center;
  padding: 24px 0;
  z-index: 100;
  transition: background var(--transition-speed), border-color var(--transition-speed);
}

.sidebar__logo {
  width: 40px;
  height: 40px;
  background: linear-gradient(135deg, var(--accent), var(--accent-hover));
  border-radius: 10px;
  display: flex;
  align-items: center;
  justify-content: center;
  font-weight: 900;
  font-size: 14px;
  color: #fff;
  margin-bottom: 32px;
  text-decoration: none;
}

.sidebar__nav {
  display: flex;
  flex-direction: column;
  align-items: center;
  gap: 8px;
  list-style: none;
}

.sidebar__link {
  width: 40px;
  height: 40px;
  display: flex;
  align-items: center;
  justify-content: center;
  border-radius: 8px;
  color: var(--text-secondary);
  text-decoration: none;
  font-size: 16px;
  transition: color var(--transition-speed), background var(--transition-speed);
}

.sidebar__link:hover {
  color: var(--accent);
  background: rgba(59, 130, 246, 0.1);
}

.sidebar__link--active {
  color: var(--accent);
  background: rgba(59, 130, 246, 0.1);
}

.sidebar__spacer {
  flex: 1;
}

.sidebar__theme-toggle {
  width: 40px;
  height: 40px;
  display: flex;
  align-items: center;
  justify-content: center;
  border-radius: 8px;
  border: 1px solid var(--border);
  background: transparent;
  color: var(--text-secondary);
  font-size: 16px;
  cursor: pointer;
  transition: color var(--transition-speed), border-color var(--transition-speed);
}

.sidebar__theme-toggle:hover {
  color: var(--accent);
  border-color: var(--accent);
}

/* === Main Content === */
.main {
  margin-left: var(--sidebar-width);
  flex: 1;
  padding: 48px 48px 96px;
  max-width: 900px;
}

/* === Section Shared === */
.section {
  margin-bottom: 64px;
}

.section__label {
  font-size: 11px;
  font-weight: 700;
  letter-spacing: 3px;
  text-transform: uppercase;
  color: var(--accent);
  margin-bottom: 16px;
}

/* === Responsive: Mobile === */
@media (max-width: 767px) {
  .sidebar {
    position: fixed;
    top: auto;
    bottom: 0;
    left: 0;
    width: 100%;
    height: 60px;
    flex-direction: row;
    justify-content: space-around;
    padding: 0 8px;
    border-right: none;
    border-top: 1px solid var(--border);
  }

  .sidebar__logo {
    display: none;
  }

  .sidebar__nav {
    flex-direction: row;
    gap: 0;
    flex: 1;
    justify-content: space-around;
  }

  .sidebar__spacer {
    display: none;
  }

  .sidebar__link {
    width: 44px;
    height: 44px;
  }

  .sidebar__theme-toggle {
    border: none;
  }

  .main {
    margin-left: 0;
    padding: 24px 20px 80px;
  }
}
```

- [ ] **Step 2: Commit**

```bash
git add css/styles.css
git commit -m "feat: add CSS foundation with theme variables, sidebar, and responsive layout"
```

---

### Task 3: HTML structure — head, sidebar, empty sections

**Files:**
- Create: `index.html`

- [ ] **Step 1: Create index.html with full head, sidebar nav, and section shells**

```html
<!DOCTYPE html>
<html lang="en" data-theme="dark">
<head>
  <meta charset="UTF-8">
  <meta name="viewport" content="width=device-width, initial-scale=1.0">
  <title>Jamie Rees — Staff Engineer</title>
  <meta name="description" content="Staff Engineer with over a decade of experience building scalable, user-focused web applications and leading high-performing engineering teams.">
  <meta property="og:title" content="Jamie Rees — Staff Engineer">
  <meta property="og:description" content="Staff Engineer with over a decade of experience building scalable, user-focused web applications and leading high-performing engineering teams.">
  <meta property="og:type" content="website">
  <link rel="icon" type="image/svg+xml" href="favicon.svg">
  <link rel="preconnect" href="https://fonts.googleapis.com">
  <link rel="preconnect" href="https://fonts.gstatic.com" crossorigin>
  <link href="https://fonts.googleapis.com/css2?family=Inter:wght@400;600;700;900&display=swap" rel="stylesheet">
  <link rel="stylesheet" href="https://cdnjs.cloudflare.com/ajax/libs/font-awesome/6.5.1/css/all.min.css">
  <link rel="stylesheet" href="css/styles.css">
  <script>
    // Apply saved theme before render to prevent flash
    (function() {
      var theme = localStorage.getItem('theme') || 'dark';
      document.documentElement.setAttribute('data-theme', theme);
    })();
  </script>
</head>
<body>
  <div class="layout">
    <!-- Sidebar -->
    <aside class="sidebar">
      <a href="#about" class="sidebar__logo" aria-label="Jamie Rees">JR</a>
      <nav>
        <ul class="sidebar__nav">
          <li><a href="#about" class="sidebar__link sidebar__link--active" aria-label="About" data-section="about"><i class="fa-solid fa-user"></i></a></li>
          <li><a href="#experience" class="sidebar__link" aria-label="Experience" data-section="experience"><i class="fa-solid fa-briefcase"></i></a></li>
          <li><a href="#skills" class="sidebar__link" aria-label="Skills" data-section="skills"><i class="fa-solid fa-bolt"></i></a></li>
          <li><a href="#projects" class="sidebar__link" aria-label="Projects" data-section="projects"><i class="fa-solid fa-rocket"></i></a></li>
          <li><a href="#contact" class="sidebar__link" aria-label="Contact" data-section="contact"><i class="fa-solid fa-envelope"></i></a></li>
        </ul>
      </nav>
      <div class="sidebar__spacer"></div>
      <button class="sidebar__theme-toggle" aria-label="Toggle theme">
        <i class="fa-solid fa-moon"></i>
      </button>
    </aside>

    <!-- Main Content -->
    <main class="main">
      <section id="about" class="section">
        <!-- Task 4 -->
      </section>

      <section id="experience" class="section">
        <!-- Task 5 -->
      </section>

      <section id="skills" class="section">
        <!-- Task 6 -->
      </section>

      <section id="projects" class="section">
        <!-- Task 7 -->
      </section>

      <section id="contact" class="section">
        <!-- Task 8 -->
      </section>
    </main>
  </div>

  <script src="js/main.js"></script>
</body>
</html>
```

- [ ] **Step 2: Open in browser to verify sidebar renders**

```bash
open index.html
```

Expected: Dark page with a sidebar on the left showing the JR logo and 5 icon links. Content area is empty. On narrow window, sidebar moves to bottom.

- [ ] **Step 3: Commit**

```bash
git add index.html
git commit -m "feat: add HTML structure with sidebar navigation and section shells"
```

---

## Chunk 2: Content Sections

### Task 4: About / Hero section

**Files:**
- Modify: `index.html` (replace `<!-- Task 4 -->` inside `#about`)
- Modify: `css/styles.css` (append hero styles)

- [ ] **Step 1: Add About section HTML to index.html**

Replace `<!-- Task 4 -->` with:

```html
        <header>
        <div class="section__label">About</div>
        <h1 class="hero__name">Jamie Rees</h1>
        <p class="hero__title">Staff Engineer</p>
        <p class="hero__location"><i class="fa-solid fa-location-dot"></i> South England, UK</p>
        <p class="hero__summary">Staff Engineer with over a decade of experience building scalable, user-focused web applications and leading high-performing engineering teams. Proven ability to architect and deliver enterprise-grade platforms, mentor engineers, and drive cross-functional initiatives from tooling strategy to AI adoption. Adept at balancing hands-on technical depth with leadership responsibilities, including hiring, strategy, and platform-level transformation.</p>

        <div class="hero__stats">
          <div class="stat">
            <span class="stat__number">13+</span>
            <span class="stat__label">Years Experience</span>
          </div>
          <div class="stat">
            <span class="stat__number">500M+</span>
            <span class="stat__label">Docker Pulls</span>
          </div>
          <div class="stat">
            <span class="stat__number">80+</span>
            <span class="stat__label">Team Scaled To</span>
          </div>
        </div>

        <div class="hero__actions">
          <a href="https://www.linkedin.com/in/jamiearees/" target="_blank" rel="noopener" class="btn btn--primary"><i class="fa-brands fa-linkedin"></i> LinkedIn</a>
          <a href="https://github.com/tidusjar" target="_blank" rel="noopener" class="btn btn--secondary"><i class="fa-brands fa-github"></i> GitHub</a>
          <a href="mailto:tidusjar@gmail.com" class="btn btn--secondary"><i class="fa-solid fa-envelope"></i> Email</a>
        </div>

        <div class="hero__education">
          <i class="fa-solid fa-graduation-cap"></i>
          National Diploma ICT Practitioners — Ystrad Mynach College, 2009–2012
        </div>
        </header>
```

- [ ] **Step 2: Append hero styles to css/styles.css**

```css
/* === Hero / About === */
.hero__name {
  font-size: 48px;
  font-weight: 900;
  letter-spacing: -2px;
  line-height: 1.1;
  margin-bottom: 4px;
}

.hero__title {
  font-size: 20px;
  font-weight: 600;
  color: var(--accent);
  margin-bottom: 8px;
}

.hero__location {
  font-size: 13px;
  color: var(--text-secondary);
  margin-bottom: 20px;
}

.hero__location i {
  margin-right: 4px;
}

.hero__summary {
  color: var(--text-secondary);
  max-width: 640px;
  margin-bottom: 32px;
}

.hero__stats {
  display: flex;
  gap: 16px;
  margin-bottom: 32px;
}

.stat {
  background: var(--bg-surface);
  border: 1px solid var(--border);
  border-radius: 8px;
  padding: 16px 20px;
  transition: background var(--transition-speed), border-color var(--transition-speed);
}

.stat__number {
  display: block;
  font-size: 28px;
  font-weight: 900;
  color: var(--accent);
}

.stat__label {
  font-size: 11px;
  color: var(--text-secondary);
}

.hero__actions {
  display: flex;
  gap: 12px;
  margin-bottom: 32px;
}

.btn {
  display: inline-flex;
  align-items: center;
  gap: 8px;
  padding: 10px 20px;
  border-radius: 8px;
  font-size: 13px;
  font-weight: 700;
  text-decoration: none;
  transition: background var(--transition-speed), color var(--transition-speed);
}

.btn--primary {
  background: var(--accent);
  color: #fff;
}

.btn--primary:hover {
  background: var(--accent-hover);
}

.btn--secondary {
  background: var(--bg-surface);
  color: var(--text);
  border: 1px solid var(--border);
}

.btn--secondary:hover {
  border-color: var(--accent);
  color: var(--accent);
}

.hero__education {
  font-size: 13px;
  color: var(--text-secondary);
}

.hero__education i {
  color: var(--accent);
  margin-right: 6px;
}

@media (max-width: 767px) {
  .hero__name {
    font-size: 32px;
  }

  .hero__stats {
    flex-direction: column;
    gap: 12px;
  }

  .hero__actions {
    flex-wrap: wrap;
  }
}
```

- [ ] **Step 3: Verify in browser**

Open/refresh `index.html`. Expected: Hero section with name, title, summary, stats cards, action buttons, and education line.

- [ ] **Step 4: Commit**

```bash
git add index.html css/styles.css
git commit -m "feat: add About/Hero section with stats and action buttons"
```

---

### Task 5: Experience section with expandable cards

**Files:**
- Modify: `index.html` (replace `<!-- Task 5 -->` inside `#experience`)
- Modify: `css/styles.css` (append experience card styles)

- [ ] **Step 1: Add Experience HTML to index.html**

Replace `<!-- Task 5 -->` with:

```html
        <div class="section__label">Experience</div>

        <div class="exp-card exp-card--expanded" data-expandable>
          <button class="exp-card__header" aria-expanded="true">
            <div class="exp-card__info">
              <h3 class="exp-card__company">Exclaimer</h3>
              <p class="exp-card__role">Staff Engineer</p>
            </div>
            <div class="exp-card__meta">
              <span class="exp-card__date">Feb 2023 – Present</span>
              <i class="fa-solid fa-chevron-down exp-card__icon"></i>
            </div>
          </button>
          <div class="exp-card__body">
            <ul>
              <li>Core member of an ambitious cross-functional project to build a Managed Service Provider (MSP) platform, enabling the business to sell the product at a higher tier and unlock new revenue streams.</li>
              <li>Led the safe and controlled rollout of AI tooling across engineering, balancing business needs with security and governance requirements.</li>
              <li>Responsible for evaluating and ensuring engineering tooling is fit for purpose, driving adoption of the right tools to improve developer experience and productivity.</li>
              <li>Provide architectural and strategic technical leadership across frontend teams using Angular and Nx.</li>
              <li>Own end-to-end hiring, onboarding, and scaling of frontend teams.</li>
              <li>Played a key role in scaling the engineering organisation from ~20 to 80+ engineers through hiring, process design, and team structure.</li>
              <li>Drive process improvements, tooling decisions, and delivery workflows across multiple squads.</li>
              <li>Mentor and support engineers in both technical growth and career development.</li>
              <li>Lead cross-team Community of Practice sessions to promote standards, learning, and knowledge sharing.</li>
              <li>Spearheaded the successful migration of 10+ years of source code and pipelines from Azure DevOps to GitHub with zero downtime or delivery disruption.</li>
              <li>Collaborate closely with product, design, DevOps, and senior stakeholders to align engineering priorities with business goals.</li>
            </ul>
          </div>
        </div>

        <div class="exp-card" data-expandable>
          <button class="exp-card__header" aria-expanded="false">
            <div class="exp-card__info">
              <h3 class="exp-card__company">Exclaimer</h3>
              <p class="exp-card__role">Lead Engineer</p>
            </div>
            <div class="exp-card__meta">
              <span class="exp-card__date">Jan 2022 – Feb 2023</span>
              <i class="fa-solid fa-chevron-down exp-card__icon"></i>
            </div>
          </button>
          <div class="exp-card__body">
            <ul>
              <li>Formed and led a brand-new engineering team to build a cutting-edge analytics platform using Angular + HighCharts + Azure Data Explorer.</li>
              <li>Introduced Angular Module Federation to enable multi-team collaboration on a single Angular codebase.</li>
              <li>Oversaw a high-priority greenfield onboarding product that enhanced customer experience and increased revenue.</li>
            </ul>
          </div>
        </div>

        <div class="exp-card" data-expandable>
          <button class="exp-card__header" aria-expanded="false">
            <div class="exp-card__info">
              <h3 class="exp-card__company">Exclaimer</h3>
              <p class="exp-card__role">Senior Engineer</p>
            </div>
            <div class="exp-card__meta">
              <span class="exp-card__date">Aug 2021 – Feb 2022</span>
              <i class="fa-solid fa-chevron-down exp-card__icon"></i>
            </div>
          </button>
          <div class="exp-card__body">
            <ul>
              <li>Led authentication design and implementation in a modern Angular project.</li>
              <li>Drove performance optimisation and collaborated with cross-functional teams to align technical decisions with product strategy.</li>
            </ul>
          </div>
        </div>

        <div class="exp-card" data-expandable>
          <button class="exp-card__header" aria-expanded="false">
            <div class="exp-card__info">
              <h3 class="exp-card__company">myairops</h3>
              <p class="exp-card__role">Technical Lead</p>
            </div>
            <div class="exp-card__meta">
              <span class="exp-card__date">Oct 2019 – Aug 2021</span>
              <i class="fa-solid fa-chevron-down exp-card__icon"></i>
            </div>
          </button>
          <div class="exp-card__body">
            <ul>
              <li>Led a team of 8 engineers across microservice-based SaaS applications.</li>
              <li>Designed and implemented new architecture while maintaining and upgrading legacy systems.</li>
              <li>Delivered first customer launch of the new myairops platform.</li>
            </ul>
          </div>
        </div>

        <div class="exp-card" data-expandable>
          <button class="exp-card__header" aria-expanded="false">
            <div class="exp-card__info">
              <h3 class="exp-card__company">myairops</h3>
              <p class="exp-card__role">Software Developer</p>
            </div>
            <div class="exp-card__meta">
              <span class="exp-card__date">Mar 2019 – Oct 2019</span>
              <i class="fa-solid fa-chevron-down exp-card__icon"></i>
            </div>
          </button>
          <div class="exp-card__body">
            <ul>
              <li>Full-stack development on aviation operations SaaS systems using Angular and .NET.</li>
            </ul>
          </div>
        </div>

        <div class="exp-card" data-expandable>
          <button class="exp-card__header" aria-expanded="false">
            <div class="exp-card__info">
              <h3 class="exp-card__company">Moneybarn</h3>
              <p class="exp-card__role">Software Developer</p>
            </div>
            <div class="exp-card__meta">
              <span class="exp-card__date">Aug 2016 – Feb 2019</span>
              <i class="fa-solid fa-chevron-down exp-card__icon"></i>
            </div>
          </button>
          <div class="exp-card__body">
            <ul>
              <li>Tech lead on high-profile Angular/.NET Core projects including the MyMoneybarn customer portal.</li>
              <li>Delivered customer finance systems integrated with third-party services.</li>
              <li>Drove adoption of unit testing and code quality practices.</li>
            </ul>
          </div>
        </div>

        <div class="exp-card" data-expandable>
          <button class="exp-card__header" aria-expanded="false">
            <div class="exp-card__info">
              <h3 class="exp-card__company">Exclaimer</h3>
              <p class="exp-card__role">QA Engineer</p>
            </div>
            <div class="exp-card__meta">
              <span class="exp-card__date">Mar 2015 – Aug 2016</span>
              <i class="fa-solid fa-chevron-down exp-card__icon"></i>
            </div>
          </button>
          <div class="exp-card__body">
            <ul>
              <li>Built automated testing for SPA applications using Selenium and C#.</li>
              <li>Contributed to backend and frontend development within a TDD framework.</li>
            </ul>
          </div>
        </div>

        <div class="exp-card" data-expandable>
          <button class="exp-card__header" aria-expanded="false">
            <div class="exp-card__info">
              <h3 class="exp-card__company">BCA Europe</h3>
              <p class="exp-card__role">Technical System Tester / Dev Support Analyst</p>
            </div>
            <div class="exp-card__meta">
              <span class="exp-card__date">Dec 2012 – Mar 2015</span>
              <i class="fa-solid fa-chevron-down exp-card__icon"></i>
            </div>
          </button>
          <div class="exp-card__body">
            <ul>
              <li>Created automation frameworks for agile delivery teams.</li>
              <li>Supported and maintained core business applications across AS/400 and .NET stacks.</li>
            </ul>
          </div>
        </div>
```

- [ ] **Step 2: Append experience card styles to css/styles.css**

```css
/* === Experience Cards === */
.exp-card {
  background: var(--bg-surface);
  border: 1px solid var(--border);
  border-radius: 8px;
  margin-bottom: 12px;
  overflow: hidden;
  transition: background var(--transition-speed), border-color var(--transition-speed);
}

.exp-card--expanded {
  border-left: 3px solid var(--accent);
}

.exp-card__header {
  width: 100%;
  display: flex;
  justify-content: space-between;
  align-items: center;
  padding: 20px;
  background: transparent;
  border: none;
  color: var(--text);
  cursor: pointer;
  text-align: left;
  font-family: inherit;
  font-size: inherit;
}

.exp-card__header:focus-visible {
  outline: 2px solid var(--accent);
  outline-offset: -2px;
}

.exp-card__company {
  font-size: 16px;
  font-weight: 800;
}

.exp-card__role {
  font-size: 13px;
  color: var(--text-secondary);
  margin-top: 2px;
}

.exp-card--expanded .exp-card__role {
  color: var(--accent);
}

.exp-card__meta {
  display: flex;
  align-items: center;
  gap: 12px;
  flex-shrink: 0;
}

.exp-card__date {
  font-size: 12px;
  color: var(--text-secondary);
}

.exp-card__icon {
  color: var(--text-secondary);
  font-size: 12px;
  transition: transform var(--transition-speed);
}

.exp-card--expanded .exp-card__icon {
  transform: rotate(180deg);
}

.exp-card__body {
  max-height: 0;
  overflow: hidden;
  transition: max-height 0.4s ease;
}

.exp-card--expanded .exp-card__body {
  max-height: 1000px;
}

.exp-card__body ul {
  padding: 0 20px 20px;
  margin: 0;
  list-style: none;
}

.exp-card__body li {
  position: relative;
  padding-left: 16px;
  margin-bottom: 8px;
  color: var(--text-secondary);
  font-size: 13px;
  line-height: 1.6;
}

.exp-card__body li::before {
  content: '';
  position: absolute;
  left: 0;
  top: 9px;
  width: 4px;
  height: 4px;
  background: var(--accent);
  border-radius: 50%;
}

@media (max-width: 767px) {
  .exp-card__header {
    flex-direction: column;
    align-items: flex-start;
    gap: 8px;
  }

  .exp-card__meta {
    width: 100%;
    justify-content: space-between;
  }
}
```

- [ ] **Step 3: Verify in browser**

Refresh page. Expected: 8 experience cards, first one expanded with bullet points visible, rest collapsed. No JS yet — expanded state is set via the `exp-card--expanded` class.

- [ ] **Step 4: Commit**

```bash
git add index.html css/styles.css
git commit -m "feat: add Experience section with expandable card markup and styles"
```

---

### Task 6: Skills section

**Files:**
- Modify: `index.html` (replace `<!-- Task 6 -->` inside `#skills`)
- Modify: `css/styles.css` (append skills styles)

- [ ] **Step 1: Add Skills HTML to index.html**

Replace `<!-- Task 6 -->` with:

```html
        <div class="section__label">Skills</div>

        <div class="skills">
          <div class="skills__group">
            <h3 class="skills__heading">Frontend Development</h3>
            <div class="skills__tags">
              <span class="tag">Angular</span>
              <span class="tag">Nx</span>
              <span class="tag">React Native</span>
              <span class="tag">RxJS</span>
              <span class="tag">Module Federation</span>
              <span class="tag">TypeScript</span>
            </div>
          </div>

          <div class="skills__group">
            <h3 class="skills__heading">Backend & Architecture</h3>
            <div class="skills__tags">
              <span class="tag">.NET Core</span>
              <span class="tag">Web API</span>
              <span class="tag">Microservices</span>
              <span class="tag">Azure</span>
            </div>
          </div>

          <div class="skills__group">
            <h3 class="skills__heading">DevOps & Tooling</h3>
            <div class="skills__tags">
              <span class="tag">Azure DevOps</span>
              <span class="tag">GitHub</span>
              <span class="tag">CI/CD Pipelines</span>
            </div>
          </div>

          <div class="skills__group">
            <h3 class="skills__heading">Practices</h3>
            <div class="skills__tags">
              <span class="tag">Agile</span>
              <span class="tag">TDD</span>
              <span class="tag">Mentoring</span>
              <span class="tag">Hiring</span>
              <span class="tag">Code Reviews</span>
              <span class="tag">Community of Practice</span>
              <span class="tag">AI Tooling Adoption</span>
            </div>
          </div>

          <div class="skills__group">
            <h3 class="skills__heading">Systems Thinking</h3>
            <div class="skills__tags">
              <span class="tag">Legacy Migration</span>
              <span class="tag">Performance Optimisation</span>
              <span class="tag">System Design</span>
            </div>
          </div>
        </div>
```

- [ ] **Step 2: Append skills styles to css/styles.css**

```css
/* === Skills === */
.skills__group {
  margin-bottom: 24px;
}

.skills__heading {
  font-size: 14px;
  font-weight: 700;
  margin-bottom: 10px;
}

.skills__tags {
  display: flex;
  flex-wrap: wrap;
  gap: 8px;
}

.tag {
  background: var(--bg-surface);
  border: 1px solid var(--border);
  padding: 6px 14px;
  border-radius: 6px;
  font-size: 12px;
  font-weight: 600;
  color: var(--text-secondary);
  transition: background var(--transition-speed), border-color var(--transition-speed), color var(--transition-speed);
}

.tag:hover {
  border-color: var(--accent);
  color: var(--accent);
}
```

- [ ] **Step 3: Verify in browser**

Refresh page. Expected: Skills grouped by category with pill-style tags.

- [ ] **Step 4: Commit**

```bash
git add index.html css/styles.css
git commit -m "feat: add Skills section with grouped tags"
```

---

### Task 7: Projects showcase section

**Files:**
- Modify: `index.html` (replace `<!-- Task 7 -->` inside `#projects`)
- Modify: `css/styles.css` (append project card styles)

- [ ] **Step 1: Add Projects HTML to index.html**

Replace `<!-- Task 7 -->` with:

```html
        <div class="section__label">Projects</div>

        <div class="projects">
          <div class="project-card">
            <div class="project-card__header">
              <h3 class="project-card__name">Ombi</h3>
              <span class="project-card__badge">Open Source • Founder</span>
            </div>
            <p class="project-card__desc">A highly successful open-source media request platform. Led development, architecture, and community engagement to grow the platform's adoption and stability.</p>
            <div class="project-card__stats">
              <div class="project-card__stat">
                <span class="project-card__stat-number">500M+</span>
                <span class="project-card__stat-label">Docker Pulls</span>
              </div>
            </div>
            <a href="https://github.com/Ombi-app/Ombi" target="_blank" rel="noopener" class="btn btn--secondary"><i class="fa-brands fa-github"></i> View on GitHub</a>
          </div>

          <div class="project-card">
            <div class="project-card__header">
              <h3 class="project-card__name">Reporium</h3>
              <span class="project-card__badge">SaaS Platform</span>
            </div>
            <p class="project-card__desc">A SaaS platform that uses AI to analyse GitHub repositories and deliver instant insights into code health, activity, and development trends.</p>
            <a href="#" target="_blank" rel="noopener" class="btn btn--secondary"><i class="fa-solid fa-arrow-up-right-from-square"></i> View Project</a>
          </div>
        </div>
```

- [ ] **Step 2: Append project card styles to css/styles.css**

```css
/* === Projects === */
.projects {
  display: grid;
  grid-template-columns: 1fr 1fr;
  gap: 16px;
}

.project-card {
  background: var(--bg-surface);
  border: 1px solid var(--border);
  border-radius: 8px;
  padding: 28px;
  transition: background var(--transition-speed), border-color var(--transition-speed);
}

.project-card:hover {
  border-color: var(--accent);
}

.project-card__header {
  margin-bottom: 12px;
}

.project-card__name {
  font-size: 20px;
  font-weight: 900;
  margin-bottom: 4px;
}

.project-card__badge {
  font-size: 11px;
  color: var(--accent);
  font-weight: 600;
}

.project-card__desc {
  color: var(--text-secondary);
  font-size: 13px;
  line-height: 1.6;
  margin-bottom: 20px;
}

.project-card__stats {
  margin-bottom: 20px;
}

.project-card__stat-number {
  font-size: 28px;
  font-weight: 900;
  color: var(--accent);
}

.project-card__stat-label {
  font-size: 11px;
  color: var(--text-secondary);
  margin-left: 8px;
}

@media (max-width: 767px) {
  .projects {
    grid-template-columns: 1fr;
  }
}
```

- [ ] **Step 3: Verify in browser**

Refresh page. Expected: Two project cards side by side. Ombi has the 500M+ stat. Both have action buttons.

- [ ] **Step 4: Commit**

```bash
git add index.html css/styles.css
git commit -m "feat: add Projects showcase section with Ombi and Reporium"
```

---

### Task 8: Contact section

**Files:**
- Modify: `index.html` (replace `<!-- Task 8 -->` inside `#contact`)
- Modify: `css/styles.css` (append contact styles)

- [ ] **Step 1: Add Contact HTML to index.html**

Replace `<!-- Task 8 -->` with:

```html
        <footer>
        <div class="section__label">Contact</div>
        <h2 class="contact__heading">Let's connect</h2>
        <p class="contact__text">Open to new opportunities where I can make a meaningful impact both technically and strategically.</p>

        <div class="contact__links">
          <a href="mailto:tidusjar@gmail.com" class="contact__link">
            <i class="fa-solid fa-envelope"></i>
            <span>tidusjar@gmail.com</span>
          </a>
          <a href="https://www.linkedin.com/in/jamiearees/" target="_blank" rel="noopener" class="contact__link">
            <i class="fa-brands fa-linkedin"></i>
            <span>linkedin.com/in/jamiearees</span>
          </a>
          <a href="https://github.com/tidusjar" target="_blank" rel="noopener" class="contact__link">
            <i class="fa-brands fa-github"></i>
            <span>github.com/tidusjar</span>
          </a>
        </div>
        </footer>
```

- [ ] **Step 2: Append contact styles to css/styles.css**

```css
/* === Contact === */
.contact__heading {
  font-size: 32px;
  font-weight: 900;
  letter-spacing: -1px;
  margin-bottom: 8px;
}

.contact__text {
  color: var(--text-secondary);
  margin-bottom: 24px;
  max-width: 480px;
}

.contact__links {
  display: flex;
  flex-direction: column;
  gap: 12px;
}

.contact__link {
  display: inline-flex;
  align-items: center;
  gap: 12px;
  color: var(--text);
  text-decoration: none;
  font-size: 14px;
  font-weight: 600;
  padding: 12px 16px;
  background: var(--bg-surface);
  border: 1px solid var(--border);
  border-radius: 8px;
  transition: border-color var(--transition-speed), color var(--transition-speed);
  max-width: 360px;
}

.contact__link:hover {
  border-color: var(--accent);
  color: var(--accent);
}

.contact__link i {
  font-size: 18px;
  width: 24px;
  text-align: center;
}
```

- [ ] **Step 3: Verify in browser**

Refresh page. Expected: Contact section with heading, CTA text, and three contact links as styled cards.

- [ ] **Step 4: Commit**

```bash
git add index.html css/styles.css
git commit -m "feat: add Contact section with links"
```

---

## Chunk 3: JavaScript Interactions

### Task 9: Theme toggle, scroll-spy, and expandable cards

**Files:**
- Create: `js/main.js`

- [ ] **Step 1: Create main.js with all three features**

```javascript
(function () {
  'use strict';

  // === Theme Toggle ===
  const themeToggle = document.querySelector('.sidebar__theme-toggle');
  const themeIcon = themeToggle.querySelector('i');

  function setTheme(theme) {
    document.documentElement.setAttribute('data-theme', theme);
    localStorage.setItem('theme', theme);
    themeIcon.className = theme === 'dark' ? 'fa-solid fa-moon' : 'fa-solid fa-sun';
  }

  // Load saved theme or default to dark
  const savedTheme = localStorage.getItem('theme') || 'dark';
  setTheme(savedTheme);

  themeToggle.addEventListener('click', function () {
    const current = document.documentElement.getAttribute('data-theme');
    setTheme(current === 'dark' ? 'light' : 'dark');
  });

  // === Expandable Cards ===
  document.querySelectorAll('[data-expandable]').forEach(function (card) {
    var header = card.querySelector('.exp-card__header');

    header.addEventListener('click', function () {
      var isExpanded = card.classList.contains('exp-card--expanded');

      if (isExpanded) {
        card.classList.remove('exp-card--expanded');
        header.setAttribute('aria-expanded', 'false');
      } else {
        card.classList.add('exp-card--expanded');
        header.setAttribute('aria-expanded', 'true');
      }
    });

});

  // === Scroll Spy ===
  var navLinks = document.querySelectorAll('.sidebar__link');
  var sections = document.querySelectorAll('.section');

  var observer = new IntersectionObserver(function (entries) {
    entries.forEach(function (entry) {
      if (entry.isIntersecting) {
        var id = entry.target.getAttribute('id');
        navLinks.forEach(function (link) {
          link.classList.remove('sidebar__link--active');
          if (link.getAttribute('data-section') === id) {
            link.classList.add('sidebar__link--active');
          }
        });
      }
    });
  }, {
    rootMargin: '-20% 0px -60% 0px',
    threshold: 0
  });

  sections.forEach(function (section) {
    observer.observe(section);
  });
})();
```

- [ ] **Step 2: Verify all three interactions in browser**

Refresh page and test:
1. **Theme toggle:** Click moon icon — page switches to light mode, icon becomes sun. Click again — back to dark. Refresh — theme persists.
2. **Expandable cards:** Click a collapsed card header — it expands. Click again — it collapses. First card should be expanded on load.
3. **Scroll spy:** Scroll through the page — active nav icon in sidebar updates to match the visible section.

- [ ] **Step 3: Commit**

```bash
git add js/main.js
git commit -m "feat: add theme toggle, expandable cards, and scroll-spy JavaScript"
```

---

### Task 10: Final polish and verification

**Files:**
- Review all files

- [ ] **Step 1: Full browser test**

Open `index.html` and verify:
1. All 5 sections render with correct content
2. Sidebar navigation scrolls to correct sections
3. Theme toggle works and persists across refresh
4. Experience cards expand/collapse
5. Scroll spy highlights correct nav item
6. Resize to mobile — sidebar moves to bottom bar
7. All links open correctly (LinkedIn, GitHub, Email)
8. Favicon shows in browser tab

- [ ] **Step 2: Commit any fixes**

If fixes were needed:
```bash
git add -A
git commit -m "fix: polish and final adjustments"
```
