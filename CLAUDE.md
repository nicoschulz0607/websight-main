# Websight — CLAUDE.md

Webseite der Websight-Agentur. Next.js App Router, komplett dark, handanimiert mit GSAP.

---

## Projekt-Struktur

```
websight/                   ← Next.js-Root (hier npm run dev ausführen)
├── app/
│   ├── page.tsx            ← Homepage (nur GSAPInit + ClientSections)
│   ├── layout.tsx          ← Root-Layout (Navbar, CustomCursor, Footer)
│   ├── globals.css         ← Tailwind v4 + globale Keyframes + CSS-Vars
│   ├── agb/page.tsx
│   ├── datenschutz/page.tsx
│   ├── impressum/page.tsx
│   ├── anfragen/           ← Konfigurator-Seite (mehrstufiges Formular)
│   └── api/contact/route.ts ← E-Mail via Resend
├── components/
│   ├── ClientSections.tsx  ← Rendert alle Sektionen in Reihenfolge (Client Component)
│   ├── CTABanner.tsx
│   ├── ServiceModal.tsx
│   ├── layout/
│   │   ├── Navbar.tsx
│   │   └── Footer.tsx
│   ├── providers/
│   │   ├── GSAPInit.tsx    ← Registriert ScrollTrigger global, einmalig
│   │   └── CursorContext.tsx
│   ├── sections/           ← Eine Datei pro Seitenbereich
│   │   ├── Hero.tsx        ← BG = /hero-still.jpg + HeroCinemagraph-Overlay
│   │   ├── HeroCinemagraph.tsx ← Canvas: funkelnde Sterne, Sternschnuppen, Wasser-Schimmern (nahtloser rAF-Loop, respektiert reduced-motion)
│   │   ├── BlurText.tsx    ← Wiederverwendbar, nimmt `lines`-Prop
│   │   ├── FeaturedWork.tsx
│   │   ├── Services.tsx
│   │   ├── Process.tsx
│   │   ├── Testimonials.tsx
│   │   ├── FAQ.tsx
│   │   └── Contact.tsx
│   └── ui/
│       └── CustomCursor.tsx
├── lib/
│   ├── constants.ts        ← ALLE Inhalte: PROJECTS, SERVICES, FAQ_ITEMS, TESTIMONIALS, NAV_LINKS, BLUR_TEXT_*
│   ├── gsap.ts             ← GSAP-Hilfsfunktionen
│   └── useIsMobile.ts
└── public/                 ← Bilder, SVGs, Favicon
```

**Sektionsreihenfolge auf der Homepage:**
Navbar → Hero → BlurText1 → FeaturedWork → BlurText2 → Services → BlurText3 → Process → Testimonials → FAQ → Contact → Footer

---

## Tech-Stack

| Tool | Version | Anmerkung |
|---|---|---|
| Next.js | 15.2.0 | App Router, **keine Pages Router** |
| React | 19 | Server/Client Components |
| TypeScript | 5 | Strict |
| Tailwind CSS | v4 | `@import "tailwindcss"` — kein `tailwind.config.js` |
| GSAP | 3.14.2 | + ScrollTrigger Plugin |
| Resend | 6.x | E-Mail-Versand über API-Route |
| Vercel Analytics / Speed Insights | — | Im Root-Layout eingebunden |

---

## Commands

```bash
npm run dev       # Lokaler Dev-Server (localhost:3000)
npm run build     # Production-Build
npm run lint      # ESLint
npm run record    # Playwright Scroll-Recording (scripts/scroll-record.js)
```

---

## Design-System (Kurzfassung)

**Alles dunkel.** Kein weißer oder heller Hintergrund irgendwo.

### Farben
```
Hintergrund:    #000000  (Body, Navbar)
                #080808  (Process)
                #0a0a0a  (Testimonials)
Text:           #fbfbf4  (Cream — primär)
Akzent Blau:    #60a5fa
Akzent Lila:    #ad2bee
Gradient-Mitte: #8b6ff7
```

### Brand-Gradient
```css
linear-gradient(135deg, #60a5fa 0%, #8b6ff7 50%, #ad2bee 100%)
```
→ Nur für Text-Highlights, Borders, Icons. **Nie als Block-Hintergrund.**

### Gradient-Text
```css
.gradient-text {
  background: linear-gradient(90deg, #60a5fa, #ad2bee);
  -webkit-background-clip: text;
  -webkit-text-fill-color: transparent;
  background-clip: text;
}
```

### Typografie
- **Einzige Schriftart:** Geist (`--font-geist-sans`), Fallback `system-ui`
- Überschriften immer mit negativem `letterSpacing`: `-0.03em` bis `-0.04em`
- Hero-Headline: `clamp(5rem, 11vw, 11rem)`, weight 800
- Section H2: `clamp(3.5rem, 6vw, 5.5rem)`, weight 700
- Body: `clamp(1rem, 1.25vw, 1.15rem)`, lineHeight 1.85
- Overlines/Labels: `0.65rem`, `letterSpacing: 0.25em`, uppercase, monospace

### Abstände
```
Horizontal padding (alle Sektionen): clamp(2rem, 9vw, 8.5rem)
Vertikal padding (Sektionen):        clamp(7rem, 12vw, 12rem)
Sticky-Section paddingTop:           clamp(10rem, 18vh, 14rem)
```

### Trennlinien
```
Sektion:  1px solid rgba(251,251,244,0.06)
Listen:   1px solid rgba(251,251,244,0.08)
Inputs:   border-bottom: 1px solid rgba(251,251,244,0.15)
```

---

## GSAP-Muster

**ScrollTrigger immer in `GSAPInit.tsx` registrieren** — nie direkt importieren ohne Registrierung.

### BlurText Reveal
```js
gsap.fromTo(words,
  { autoAlpha: 0, filter: "blur(1.8rem)", y: 32 },
  { autoAlpha: 1, filter: "blur(0rem)", y: 0,
    ease: "power2.out", stagger: 0.08,
    scrollTrigger: { scrub: 1.5 } }
);
```
**Wichtig:** Wörter bleiben nach dem Einblenden bei `opacity: 1` — kein scroll-linked Dimmen.

### Sticky-Scroll-Muster (Process, Testimonials, BlurText)
```jsx
// Äußerer div treibt die Scroll-Distanz
<div style={{ height: "600vh" }}>
  <section style={{ position: "sticky", top: 0, height: "100vh", overflow: "hidden" }}>
    {/* Inhalt mit translateY via ScrollTrigger */}
  </section>
</div>
```

### Scroll-Reveal (Standard)
```js
gsap.fromTo(items,
  { autoAlpha: 0, y: 40 },
  { autoAlpha: 1, y: 0, duration: 0.7, ease: "power3.out", stagger: 0.08,
    scrollTrigger: { start: "top 75%", once: true } }
);
```

---

## Inhalte & Daten

**Alle Texte und Daten leben in `lib/constants.ts`** — nie hartcodiert in Komponenten.

- `PROJECTS` — Portfolio-Projekte (FeaturedWork)
- `SERVICES` — 4 Leistungskarten
- `FAQ_ITEMS` — 6 FAQ-Einträge
- `TESTIMONIALS` — Kundenstimmen
- `NAV_LINKS` — Navigationspunkte
- `BLUR_TEXT_1/2/3_LINES` — Texte für BlurText-Sektionen

Wenn neue Inhalte hinzukommen → immer zuerst in `constants.ts` eintragen.

---

## Wichtige Regeln

1. **Kein heller Hintergrund** — die Seite ist immer dunkel (`#000` bis `#0a0a0a`)
2. **Gradient nur als Akzent** — nie als Fläche, nur für Text/Border/Icon
3. **Tailwind v4** — kein `tailwind.config.js`, Theme in `globals.css` via `@theme {}`
4. **Alle Sektionen sind Client Components** (`"use client"`) wegen GSAP
5. **`page.tsx` bleibt Server Component** — nur `GSAPInit` + `ClientSections` rendern
6. **Inhalte immer in `lib/constants.ts`** — nicht direkt in Komponenten
7. **Mobile-first** — alle Größen/Abstände via `clamp(min, preferred, max)`
8. **GSAP scrub:** immer `scrub: 1.5` für den typischen Lag-Effekt
9. **E-Mail via Resend** — API-Key in `.env.local` (`RESEND_API_KEY`)
10. **Deploy auf Vercel** — kein eigener Server, Edge-Runtime kompatibel halten

---

## Akzentfarben-Zuweisung

| Element | Akzent |
|---|---|
| Process Schritt 01, 04, 07 | `#60a5fa` |
| Process Schritt 02, 05 | `#8b6ff7` |
| Process Schritt 03, 06 | `#ad2bee` |
| FAQ Item 01, 04 | `#60a5fa` |
| FAQ Item 02, 05 | `#8b6ff7` |
| FAQ Item 03, 06 | `#ad2bee` |
| Services Karte 1, 3 | `#60a5fa` |
| Services Karte 2, 4 | `#ad2bee` |
