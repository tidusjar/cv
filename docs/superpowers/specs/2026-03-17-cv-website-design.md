# Jamie Rees — Personal CV Website

## Overview

A single-page personal CV website for Jamie Rees, a Staff Engineer with 13+ years of experience. The site presents career history, skills, open source projects, and contact information in a bold, confident, app-like interface with sidebar navigation.

## Technology

- **Stack:** Plain HTML, CSS, JavaScript — no frameworks or build tools
- **Hosting:** GitHub Pages (static deployment from repo)
- **Icons:** Font Awesome 6 Free (CDN)
- **Fonts:** Inter (Google Fonts CDN) with system font fallback
- **Favicon:** SVG favicon using the "JR" monogram with Electric Blue gradient

## Layout

### Structure

Single scrollable page with a fixed sidebar on the left. The sidebar contains icon navigation that smooth-scrolls to anchored sections. On mobile (<768px), the sidebar becomes a fixed bottom navigation bar with icons.

### Sidebar (fixed, left)

- **Logo:** "JR" monogram with Electric Blue gradient background
- **Nav icons** (Font Awesome): About (fa-user), Experience (fa-briefcase), Skills (fa-bolt), Projects (fa-rocket), Contact (fa-envelope)
- **Theme toggle** at bottom: sun/moon icon to switch dark/light mode
- Active section highlighted with accent colour
- Width: ~72px desktop

### Sections (scrollable main content)

#### 1. About (Hero)

- Name: "Jamie Rees" — large, bold (900 weight), tight letter-spacing
- Title: "Staff Engineer" in accent colour
- Summary paragraph (from CV)
- Quick stats row: "13+ Years Experience", "500M+ Docker Pulls", "80+ Team Scaled To"
- Action buttons: LinkedIn, GitHub, Email
- Location: South England, UK

#### 2. Experience (Expandable Cards)

- Each role is a card showing: Company, Title, Date range
- Cards are collapsed by default, showing only the header row
- Click to expand and reveal bullet points of key achievements
- Most recent role (Exclaimer — Staff Engineer) expanded by default
- Subtle accent-coloured border-left on the expanded card to differentiate
- Roles in chronological order (newest first):
  - Exclaimer — Staff Engineer (Feb 2023 – Present)
  - Exclaimer — Lead Engineer (Jan 2022 – Feb 2023)
  - Exclaimer — Senior Engineer (Aug 2021 – Feb 2022)
  - myairops — Technical Lead (Oct 2019 – Aug 2021)
  - myairops — Software Developer (Mar 2019 – Oct 2019)
  - Moneybarn — Software Developer (Aug 2016 – Feb 2019)
  - Exclaimer — QA Engineer (Mar 2015 – Aug 2016)
  - BCA Europe — Technical System Tester / Dev Support Analyst (Dec 2012 – Mar 2015)

#### 3. Skills

- Grouped by category with clear headings:
  - Frontend: Angular, Nx, React Native, RxJS, Module Federation, TypeScript
  - Backend & Architecture: .NET Core, Web API, Microservices, Azure
  - DevOps & Tooling: Azure DevOps, GitHub, CI/CD pipelines
  - Practices: Agile, TDD, Mentoring, Hiring, Code Reviews, Community of Practice Leadership, AI Tooling Adoption
  - Systems Thinking: Legacy migration, performance optimisation, system design
- Displayed as pill/tag style within each category

#### 4. Projects (Showcase)

- Two feature cards side by side (stacked on mobile):
  - **Ombi:** Founder, open-source media request platform. Hero stat: 500M+ Docker Pulls. Link: https://github.com/Ombi-app/Ombi
  - **Reporium:** SaaS platform using AI for GitHub repo analysis. Link to project site.
- Cards should feel distinct — slightly larger, with room for description and stats

#### 5. Contact

- Email link (tidusjar@gmail.com)
- LinkedIn link
- GitHub link
- Simple, clean — no contact form needed

#### Education (within About section)

- Displayed as a compact line item at the bottom of the About/Hero section — not a separate nav section
- National Diploma ICT Practitioners — Ystrad Mynach College, 2009–2012

## Visual Design

### Colour Scheme

**Dark mode (default):**
- Background: #0a0a0a (near-black)
- Surface/cards: #111111
- Borders: #1e2028
- Text primary: #e0e0e0
- Text secondary: #888888
- Accent: #3b82f6 (Electric Blue)
- Accent hover: #2563eb

**Light mode:**
- Background: #f8f9fa
- Surface/cards: #ffffff
- Borders: #e2e4e8
- Text primary: #1a1a1a
- Text secondary: #666666
- Accent: #2563eb (slightly darker blue for contrast on light)
- Accent hover: #1d4ed8

### Typography

- Headings: 900 weight, tight letter-spacing (-1px to -2px)
- Section labels: 11px, uppercase, letter-spacing 3px, accent colour
- Body: 14px, line-height 1.6
- Font: Inter (Google Fonts) with system font fallback

### Theme Toggle

- Stored in localStorage so preference persists
- Smooth transition on toggle (CSS transitions on background/colour properties)
- Uses CSS custom properties (variables) for all colours — toggle swaps a class on `<html>`

## Responsive Design

- **Desktop (>1024px):** Fixed sidebar (72px) + scrollable content
- **Tablet (768-1024px):** Same as desktop — sidebar is already icon-only, no change needed
- **Mobile (<768px):** Sidebar becomes a fixed bottom navigation bar with 5 section icons + theme toggle

## Accessibility

- ARIA labels on all icon-only navigation items (e.g., `aria-label="About"`)
- Keyboard-navigable expand/collapse on experience cards (Enter/Space to toggle)
- `prefers-reduced-motion` media query to disable transitions for users who prefer reduced motion
- Sufficient colour contrast ratios (WCAG AA minimum)
- Semantic HTML: `<nav>`, `<main>`, `<section>`, `<header>`, `<footer>`

## SEO & Metadata

- `<title>`: "Jamie Rees — Staff Engineer"
- `<meta name="description">`: Summary from CV
- Open Graph tags (`og:title`, `og:description`, `og:type`) for link previews on LinkedIn/Slack
- OG image: deferred (can add later)

## Interactions

- Smooth scroll to sections on nav click
- Active nav item updates on scroll (Intersection Observer)
- Experience cards expand/collapse with CSS transition
- Theme toggle with smooth colour transition
- Subtle hover states on cards and buttons

## Content Source

All text content (experience bullet points, summary, skills) should be pulled directly from the CV document at the repo root: `Jamie Rees CV 2026.docx`. The extracted text is available in this spec's companion brainstorm session.

## File Structure

```
/
├── index.html
├── css/
│   └── styles.css
├── js/
│   └── main.js
├── favicon.svg
├── .gitignore
└── docs/
    └── superpowers/
        └── specs/
            └── 2026-03-17-cv-website-design.md
```

## Out of Scope

- No backend or API
- No contact form
- No CMS or admin panel
- No analytics (can be added later)
- No blog or articles section
- No animations beyond basic transitions
- No print stylesheet (future enhancement)
- No OG image (future enhancement)
