export const PROJECTS = [
  {
    id: 1,
    number: "01",
    title: "Oimmo",
    subtitle: "Immobilien geschmackvoll verkaufen.",
    tags: ["Webdesign", "Entwicklung"],
    bgColor: "#0d0d0d",
    accentColor: "#60a5fa",
    image: "/oimmo-preview.jpg",
    bgImage: "/images/oimmo-brand.webp",
    bgVideo: "/videos/oimmo-scroll.webm",
    bgVideoMp4: "/videos/oimmo-scroll.mp4",
    href: "https://oimmo.de",
  },
  {
    id: 2,
    number: "02",
    title: "Du bist der Makler",
    // Platzhalter-Text — bitte anpassen, sobald der finale Claim feststeht.
    subtitle: "Aktuell in Entwicklung.",
    tags: ["Webdesign", "Entwicklung"],
    bgColor: "#0d0d0d",
    accentColor: "#ad2bee",
    // Komponiertes Brand-Bild (Estrela-Stil, hell) als Hintergrund.
    // `image` (Browser-Mockup on Hover) noch Platzhalter — echter Screenshot liegt
    // hinter einem Cloudflare-Tunnel, kein Zugriff von außen.
    image: "/images/featuredwork-fallback-bg.jpg",
    bgImage: "/images/dubistdermakler-brand.webp",
    // Kein href -> Kachel ist noch nicht verlinkt/klickbar.
  },
];

export const TESTIMONIALS = [
  {
    quote:
      "Seit dem Launch haben wir deutlich mehr Anfragen über die Website – und die Qualität der Kontakte ist eine andere. Kunden kommen bereits mit Vertrauen auf uns zu, bevor wir das erste Gespräch geführt haben.",
    name: "Maximilian Konz",
    role: "Gründer",
    company: "O-IMMO",
    image: "/maxi.jpeg",
  },
];

export const FAQ_ITEMS = [
  {
    question: "Für wen baut ihr Websites?",
    answer:
      "Für Handwerksbetriebe, Praxen, Friseure und lokale Dienstleister – also für Unternehmen, die über ihre Website neue Kunden gewinnen wollen. Ob neue Website oder Relaunch einer bestehenden Seite – wir sind dabei.",
  },
  {
    question: "Mit welchen Branchen arbeitet ihr zusammen?",
    answer:
      "Vor allem mit lokalen Unternehmen: Handwerker, Praxen, Friseure, Berater und Coaches. Entscheidend ist nicht die Branche, sondern dass wir gemeinsam eine Website bauen, die wirklich Anfragen bringt.",
  },
  {
    question: "Was kostet eine Website?",
    answer:
      "Kompakte Websites starten ab 499 €, umfangreichere Projekte ab 799 € oder 1.199 €. Im Projekt-Konfigurator kannst du dir in 2 Minuten eine unverbindliche Schätzung zusammenstellen – transparente Startpreise als Orientierung, den finalen Umfang klären wir im kostenlosen Erstgespräch.",
  },
  {
    question: "Übernehmt ihr auch die Entwicklung?",
    answer:
      "Ja – Design und Frontend-Entwicklung machen wir intern. Für komplexere Backend-Anforderungen arbeiten wir mit vertrauenswürdigen Entwicklungspartnern zusammen.",
  },
  {
    question: "Wie sieht euer Designprozess aus?",
    answer:
      "Vom ersten Gespräch über Strategie und Design bis zum Launch begleiten wir jeden Schritt – wir halten dich durchgehend eingebunden, keine Überraschungen, nur Ergebnisse, die deine Erwartungen übertreffen.",
  },
  {
    question: "Wie lange dauert ein typisches Projekt?",
    answer:
      "Kompakte Websites (1–3 Seiten) sind meist in 2–3 Wochen online. Größere Projekte mit vielen Inhalten oder individuellen Animationen dauern 4–8 Wochen. Den genauen Zeitplan bekommst du im Erstgespräch.",
  },
];

export const SERVICES = [
  {
    title: "Webdesign & Entwicklung",
    accentColor: "#60a5fa",
    description:
      "Eine Website, die für dich arbeitet: schnell geladen, auf dem Handy perfekt, und so gebaut, dass aus Besuchern Anfragen werden. React & Next.js – blitzschnell, DSGVO-konform, voller Leben.",
    details: [
      "Individuelles Design – kein Template, alles maßgeschneidert",
      "React & Next.js mit GSAP-Animationen und Scroll-Effekten",
      "Mobile-first, barrierefrei, Core Web Vitals optimiert",
      "Hosting auf Vercel – weltweit schnell, immer online",
    ],
    forWho: "Handwerker, Praxen, Dienstleister, lokale Shops",
  },
  {
    title: "SEO & Sichtbarkeit",
    accentColor: "#ad2bee",
    description:
      "Wir sichern dir die Pole-Position in den Suchergebnissen – durch technische Tiefe, nicht durch Tricks. Mehr Sichtbarkeit bedeutet mehr Anfragen, ohne bezahlte Werbung.",
    details: [
      "Technische SEO: Core Web Vitals, Ladezeit, Struktur",
      "Keyword-Strategie & lokale Suchmaschinenoptimierung",
      "Google Business Profil & Karten-Sichtbarkeit",
      "Monatliches Reporting & kontinuierliche Optimierung",
    ],
    forWho: "Lokale Unternehmen, Handwerker, Praxen, Friseure",
  },
  {
    title: "Automatisierung & Wachstum",
    accentColor: "#60a5fa",
    description:
      "Eliminiere repetitive Aufgaben und maximiere deinen Erfolg. Workflows die im Schlaf arbeiten, kombiniert mit datenbasierter Conversion-Optimierung – mehr Kunden, weniger Aufwand.",
    details: [
      "Automatische Anfragen, E-Mail-Workflows & Terminbuchung (24/7)",
      "CRM-Integration & automatische Lead-Erfassung",
      "Conversion-Rate-Optimierung (CRO) & Funnel-Analyse",
      "Psychologische Trigger & messbare Abschlussraten",
    ],
    forWho: "Friseure, Praxen, Handwerker, Berater, Coaches",
  },
  {
    title: "Marke & Vertrauen",
    accentColor: "#ad2bee",
    description:
      "Vertrauen ist messbar. Wir entwickeln Markenidentitäten, die überzeugen, und integrieren Social Proof strategisch – dort wo er Kaufentscheidungen wirklich beeinflusst.",
    details: [
      "Logo, Farb- & Typografiesystem, Brand Guidelines",
      "Google-Bewertungen & Testimonials strategisch platziert",
      "Trust-Signale an den entscheidenden Conversion-Punkten",
      "Einheitliches Auftreten auf allen Kanälen",
    ],
    forWho: "Praxen, Anwälte, Handwerker, Coaches, Neugründungen",
  },
];

export const BLUR_TEXT_1_LINES = [
  { text: "Wir schaffen", colored: false },
  { text: "digitale Erlebnisse,", colored: true },
  { text: "die", colored: false },
  { text: "schön", colored: false },
  { text: "und", colored: false },
  { text: "wirkungsvoll sind.", colored: true },
];

export const BLUR_TEXT_2_LINES = [
  { text: "Strategie", colored: true },
  { text: "trifft auf", colored: false },
  { text: "Design.", colored: false },
  { text: "Jeder Pixel", colored: false },
  { text: "bewusst gesetzt,", colored: true },
  { text: "jedes Erlebnis", colored: false },
  { text: "durchdacht.", colored: false },
];

export const BLUR_TEXT_3_LINES = [
  { text: "Vom ersten", colored: false },
  { text: "Gespräch", colored: true },
  { text: "bis zum", colored: false },
  { text: "Launch —", colored: false },
  { text: "wir begleiten", colored: false },
  { text: "jeden Schritt.", colored: true },
];

export const NAV_LINKS = [
  { label: "Arbeiten", href: "#work" },
  { label: "Leistungen", href: "#services" },
  { label: "FAQ", href: "#faq" },
  { label: "Kontakt", href: "#kontakt" },
];
