/* ── Referenzen ────────────────────────────────────────────────────────────
   Nur echte Arbeit. Neue Einträge einfach unten anhängen:
   - status "live"     → große Case-Study (braucht media.video ODER media.desktop)
   - status "in-arbeit" → schlichte typografische Karte, kein Bild
   - optional vorher/nachher → Vorher/Nachher-Vergleich (z. B. Pitch-Kunden)
   ───────────────────────────────────────────────────────────────────────── */
export type Project = {
  id: number;
  number: string;
  title: string;
  subtitle: string;
  industry?: string;
  tags: string[];
  accentColor: string;
  status: "live" | "in-arbeit";
  href?: string;
  /** Anzeige-URL in der Browser-Leiste, z. B. "oimmo.de" */
  displayUrl?: string;
  media?: {
    /** echtes Scroll-Video der Live-Seite */
    video?: { webm?: string; mp4?: string; poster: string };
    /** echter Desktop-Screenshot (Fallback ohne Video) */
    desktop?: string;
    /** echter Handy-Screenshot */
    mobile?: string;
  };
  /** Vorher/Nachher (optional) — echte Screenshots der alten und neuen Seite */
  vorher?: string;
  nachher?: string;
  /** Name aus TESTIMONIALS — Zitat wird direkt an der Case-Study gezeigt */
  quoteBy?: string;
};

export const WORK_SECTION = {
  overline: "Ausgewählte Arbeiten",
  title: "Unsere",
  titleAccent: "Projekte.",
  intro: "Design ohne Kompromisse — durchdacht, präzise, wirkungsvoll.",
  liveLabel: "Live ansehen",
  statusLabels: { live: "Live", "in-arbeit": "In Arbeit" },
  nextTitle: "Dein Projekt?",
  nextCta: "Kostenloses Erstgespräch",
  nextHref: "#kontakt",
};

export const PROJECTS: Project[] = [
  {
    id: 1,
    number: "01",
    title: "Oimmo",
    subtitle: "Immobilien geschmackvoll verkaufen.",
    industry: "Digitaler Immobilienmakler",
    tags: ["Webdesign", "Entwicklung"],
    accentColor: "#60a5fa",
    status: "live",
    href: "https://oimmo.de",
    displayUrl: "oimmo.de",
    media: {
      // Echter Screenshot von oimmo.de (statisch, ohne Video)
      desktop: "/images/oimmo-case-poster.jpg",
      // Echter Screenshot von oimmo.de bei 390 px Breite
      mobile: "/images/oimmo-mobile.jpg",
    },
    quoteBy: "Maximilian Konz",
  },
  {
    id: 2,
    number: "02",
    title: "Du bist der Makler",
    // Platzhalter-Text — bitte anpassen, sobald der finale Claim feststeht.
    subtitle: "Aktuell in Entwicklung.",
    tags: ["Webdesign", "Entwicklung"],
    accentColor: "#ad2bee",
    status: "in-arbeit",
    // Kein href, kein Bild — wird erst gezeigt, wenn es echt online ist.
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

export const FAQ_INTRO = {
  overline: "Häufige Fragen",
  title: "Häufig gestellte",
  titleAccent: "Fragen.",
  text: "Die wichtigsten Antworten zu Ablauf, Kosten und Zusammenarbeit. Deine Frage ist nicht dabei? Im kostenlosen Erstgespräch klären wir alles persönlich.",
  cta: { label: "Frage stellen", href: "#kontakt" },
};

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

/* ── Hero ─────────────────────────────────────────────────────────────── */
export const HERO = {
  wordmark: "Websight",
  /** Headline: "<prefix> <wechselndes Wort>" */
  prefix: "Wir bauen",
  /** Wechselnde Wörter — erstes Wort ist auch der statische Zustand (reduced motion) */
  words: ["Websites", "Erlebnisse", "Anfragen", "Vertrauen"],
  /** Sekunden pro Wort */
  wordInterval: 2.4,
  sub: "Individuell gebaut für Handwerker und lokale Betriebe aus Balingen und der Region – am Handy perfekt, ab 499 €.",
  ctaPrimary: { label: "Kostenloses Erstgespräch", href: "#kontakt" },
  ctaSecondary: { label: "Arbeiten ansehen", href: "#work" },
  /** Leiste unten im Hero (nur belegte Aussagen aus SERVICES) */
  facts: ["Kein Template", "Mobile-first", "Core Web Vitals optimiert", "DSGVO-konform"],
};



/* ── Konfigurator (Baukasten) ─────────────────────────────────── */
export type ModuleKey = "web" | "seo" | "recht" | "crm" | "bew" | "buch";
export type ExtraKey = "audit" | "gbiz" | "qr" | "social" | "sprachen" | "pflege";

export type ModuleTier = { label: string; desc: string; once: number; mo: number };
export type ConfigModule = {
  key: ModuleKey;
  name: string;
  desc: string;
  badge?: string;
  tiers: ModuleTier[];
};

// Preise sind Richtwerte — hier zentral anpassen.
export const CONFIG_MODULES: ConfigModule[] = [
  {
    key: "web", name: "Website", desc: "Schnell, modern, mobil — die Basis für alles andere",
    tiers: [
      { label: "1–3 Seiten",       desc: "Start, Leistungen, Kontakt — kompakt und fertig",           once: 399,  mo: 24.99 },
      { label: "4–7 Seiten",       desc: "+ Galerie, Über uns, Preise, Blog-Grundstruktur",           once: 799,  mo: 39 },
      { label: "8–12 Seiten",      desc: "Vollständige Unternehmensseite, viele Inhalte",             once: 1199, mo: 59 },
      { label: "Premium / Custom", desc: "Kein Template — Animation, Storytelling, eigenes Konzept",  once: 2500, mo: 89 },
    ],
  },
  {
    key: "seo", name: "SEO & Sichtbarkeit", desc: "Monatliche Auswertung und Anpassung für Google",
    tiers: [
      { label: "Basis-SEO",       desc: "Meta, Schema.org, Google Business, Search Console",     once: 0, mo: 29 },
      { label: "Erweitertes SEO", desc: "+ Keyword-Tracking, Monatsreport, Content-Tipps",        once: 0, mo: 79 },
    ],
  },
  {
    key: "recht", name: "Impressum & Datenschutz", desc: "Rechtstexte über die e-recht24 API — automatisch aktuell",
    tiers: [
      { label: "Rechtstexte aktuell halten", desc: "Impressum und Datenschutzerklärung, bei Gesetzesänderung automatisch angepasst", once: 0, mo: 10 },
    ],
  },
  {
    key: "crm", name: "Anfragen & CRM", desc: "Anfragen sammeln, sortieren, Kunden verwalten", badge: "Pilotphase",
    tiers: [
      { label: "Anfragen-Eingang", desc: "Alle Anfragen aus Formular und Kontakt an einem Ort, mit Status", once: 199, mo: 29 },
      { label: "CRM Plus",         desc: "+ Kundenverlauf, Absprung-Auswertung der Website, Wochenbericht", once: 349, mo: 49 },
    ],
  },
  {
    key: "bew", name: "Google-Bewertungen", desc: "Mehr und bessere Bewertungen, automatisch angefragt",
    tiers: [
      { label: "Bewertungs-Boost", desc: "Nach jedem Auftrag automatisch um eine Bewertung bitten", once: 149, mo: 19 },
      { label: "Boost Plus",       desc: "+ QR-Aufsteller, Antwortvorschläge, Monatsübersicht",       once: 249, mo: 39 },
    ],
  },
  {
    key: "buch", name: "Kalender & Buchung", desc: "Termine online buchen, mit Bestätigung und Erinnerung",
    tiers: [
      { label: "Buchung Basis", desc: "1 Kalender, Echtzeit-Slots, Bestätigungs-Mail",                   once: 299, mo: 19 },
      { label: "Buchung Pro",   desc: "+ Serviceauswahl, Erinnerungen, mehrere Mitarbeiter",             once: 499, mo: 29 },
    ],
  },
];

export const CONFIG_EXTRAS: Record<ExtraKey, { name: string; desc: string; once: number; mo: number }> = {
  audit:    { name: "SEO- & Website-Audit",     desc: "Vollanalyse mit PDF-Report und Prioritätenliste",  once: 149, mo: 0 },
  gbiz:     { name: "Google-Business-Optimierung", desc: "Fotos, Kategorien, Profil sauber aufgesetzt",     once: 199, mo: 0 },
  qr:       { name: "QR-Bewertungsaufsteller",  desc: "Druckfertiges Design für Tisch oder Tresen",       once: 199, mo: 0 },
  social:   { name: "Social-Media-Vorlagen",    desc: "5–10 Vorlagen im Branding: Post, Story, Cover",    once: 179, mo: 0 },
  sprachen: { name: "Mehrsprachigkeit (DE + EN)", desc: "Vollständige zweite Sprachversion",              once: 350, mo: 0 },
  pflege:   { name: "Monatliche Inhaltspflege", desc: "1 Std/Monat — Texte, Bilder, Öffnungszeiten",      once: 0,   mo: 29 },
};

export const CONFIG_BUNDLES: { name: string; desc: string; picks: Partial<Record<ModuleKey, number>> }[] = [
  { name: "Sichtbar",      desc: "Website, Rechtstexte und Basis-SEO",                    picks: { web: 0, recht: 0, seo: 0 } },
  { name: "Mehr Anfragen", desc: "Dazu Anfragen-Eingang und Bewertungs-Boost",            picks: { web: 0, recht: 0, seo: 0, crm: 0, bew: 0 } },
  { name: "Komplett",      desc: "Alles verbunden, mit CRM Plus und Online-Buchung",      picks: { web: 1, recht: 0, seo: 1, crm: 1, bew: 1, buch: 1 } },
];

// Bündelvorteil auf die monatlichen Modulpreise: ab n Bausteinen x % Nachlass.
export const CONFIG_DISCOUNT_STEPS: { min: number; pct: number }[] = [
  { min: 5, pct: 15 },
  { min: 3, pct: 10 },
];
