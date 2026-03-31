"use client";

import { useState, useEffect, useRef } from "react";
import Link from "next/link";
import gsap from "gsap";

/* ── Types ──────────────────────────────────────────────────── */
type MainKey = "web" | "buch" | "auto" | "seo" | "ber";
type Status = "idle" | "loading" | "success" | "error";

interface Pkg {
  label: string;
  once: number;
  mo: number;
}

interface UpsellDef {
  name: string;
  desc: string;
  price: string;
  once: number;
  mo: number;
  badge: string | null;
  triggers: MainKey[];
}

type UpsellKey =
  | "bew_auto" | "qr" | "gbiz" | "impressum"
  | "social" | "sprachen" | "email_seq" | "pflege";

/* ── Static data ─────────────────────────────────────────────── */
const UPSELLS: Record<UpsellKey, UpsellDef> = {
  bew_auto:  { name: "Bewertungsanfrage-Automation",  desc: "Nach jedem Termin automatisch Google-Bewertung anfragen", price: "149 € einmalig", once: 149, mo: 0,  badge: "Empfohlen", triggers: ["web","buch"] },
  qr:        { name: "QR-Bewertungsaufsteller",        desc: "Print-ready Design — Tischaufsteller oder Aufkleber",     price: "199 € einmalig", once: 199, mo: 0,  badge: "Empfohlen", triggers: ["web","buch"] },
  gbiz:      { name: "Google Business Optimierung",    desc: "Fotos, Kategorien, Bewertungsmanagement-Setup",           price: "199 € einmalig", once: 199, mo: 0,  badge: null,        triggers: ["web","seo"]  },
  impressum: { name: "Rechtssicheres Impressum",       desc: "e-recht24 API — automatisch aktuell gehalten",            price: "19 €/Mo",        once: 0,   mo: 19, badge: null,        triggers: ["web"]        },
  social:    { name: "Social Media Templates",          desc: "5–10 Canva-Vorlagen im Branding: Post, Story, Cover",    price: "179 € einmalig", once: 179, mo: 0,  badge: null,        triggers: ["web","seo"]  },
  sprachen:  { name: "Mehrsprachigkeit (DE + EN)",      desc: "Vollständige i18n-Implementierung",                       price: "350 € einmalig", once: 350, mo: 0,  badge: null,        triggers: ["web"]        },
  email_seq: { name: "E-Mail-Sequenz Setup",            desc: "Welcome, Nachfass, Erinnerung — fertig in Brevo",        price: "199 € einmalig", once: 199, mo: 0,  badge: null,        triggers: ["buch","auto"]},
  pflege:    { name: "Monatliche Inhaltspflege",        desc: "1h/Mo — Texte, Bilder, Öffnungszeiten aktuell",          price: "29 €/Mo",        once: 0,   mo: 29, badge: null,        triggers: ["web"]        },
};

const LOADING_TEXTS = ["Analysiere…", "Verarbeite…", "Fast fertig…"];

/* ── Tile ────────────────────────────────────────────────────── */
interface TileProps {
  name: string;
  desc: string;
  price?: string;
  badge?: string | null;
  selected: boolean;
  onClick: () => void;
}

function Tile({ name, desc, price, badge, selected, onClick }: TileProps) {
  const [hovered, setHovered] = useState(false);

  return (
    <div
      onClick={onClick}
      onMouseEnter={() => setHovered(true)}
      onMouseLeave={() => setHovered(false)}
      style={{
        position: "relative",
        borderRadius: 14,
        padding: 1,
        display: "flex",
        background: selected
          ? "linear-gradient(135deg,#60a5fa,#8b6ff7,#ad2bee)"
          : "transparent",
        border: selected ? "none" : `1px solid rgba(251,251,244,${hovered ? 0.15 : 0.08})`,
        cursor: "pointer",
        userSelect: "none",
        transition: "border-color 0.2s",
      }}
    >
      <div
        style={{
          flex: 1,
          background: "#000",
          borderRadius: 13,
          padding: "1.75rem 2rem",
        }}
      >
        <div style={{ marginBottom: desc ? 4 : 0 }}>
          <span
            style={{
              fontSize: 16,
              fontWeight: 600,
              color: selected ? "#fbfbf4" : "rgba(251,251,244,0.65)",
              transition: "color 0.2s",
            }}
          >
            {name}
          </span>
          {badge && (
            <span
              style={{
                marginLeft: 8,
                fontSize: 10,
                padding: "2px 7px",
                borderRadius: 999,
                fontWeight: 600,
                background: "rgba(139,111,247,0.12)",
                color: "#8b6ff7",
                border: "1px solid rgba(139,111,247,0.2)",
                verticalAlign: "middle",
              }}
            >
              {badge}
            </span>
          )}
        </div>

        {desc && (
          <p
            style={{
              fontSize: 13,
              color: "rgba(251,251,244,0.4)",
              lineHeight: 1.6,
              margin: "7px 0 0",
            }}
          >
            {desc}
          </p>
        )}

        {price && (
          <p
            style={{
              fontSize: 12,
              marginTop: 12,
              color: selected ? "rgba(96,165,250,0.75)" : "rgba(251,251,244,0.28)",
              letterSpacing: "0.04em",
              transition: "color 0.2s",
            }}
          >
            {price}
          </p>
        )}
      </div>
    </div>
  );
}

/* ── Collapsible ─────────────────────────────────────────────── */
function Collapsible({ open, children }: { open: boolean; children: React.ReactNode }) {
  return (
    <div style={{
      display: "grid",
      gridTemplateRows: open ? "1fr" : "0fr",
      transition: "grid-template-rows 0.4s cubic-bezier(0.4,0,0.2,1)",
    }}>
      <div style={{
        overflow: "hidden",
        opacity: open ? 1 : 0,
        transform: open ? "translateY(0)" : "translateY(6px)",
        transition: "opacity 0.3s ease, transform 0.3s ease",
      }}>
        {children}
      </div>
    </div>
  );
}

/* ── Section Label ───────────────────────────────────────────── */
function SecLabel({ label }: { label: string }) {
  return (
    <div
      style={{
        display: "flex",
        alignItems: "center",
        gap: "1rem",
        marginBottom: "1.25rem",
      }}
    >
      <span
        style={{
          fontSize: "0.8rem",
          fontWeight: 600,
          letterSpacing: "0.04em",
          color: "rgba(251,251,244,0.55)",
          whiteSpace: "nowrap",
          flexShrink: 0,
        }}
      >
        {label}
      </span>
      <div
        style={{
          flex: 1,
          height: 1,
          background: "rgba(251,251,244,0.08)",
        }}
      />
    </div>
  );
}

/* ── Main component ──────────────────────────────────────────── */
export default function Konfigurator() {
  const pageRef = useRef<HTMLDivElement>(null);

  /* ── State ── */
  const [main, setMain] = useState<MainKey[]>([]);
  const [web,  setWeb]  = useState<Pkg | null>(null);
  const [buch, setBuch] = useState<Pkg | null>(null);
  const [auto, setAuto] = useState<Pkg | null>(null);
  const [seo,  setSeo]  = useState<Pkg | null>(null);
  const [bers, setBers] = useState<Pkg[]>([]);
  const [upsells, setUpsells] = useState<Partial<Record<UpsellKey, Pkg & { name: string }>>>({});

  /* ── Modal ── */
  const [modalOpen, setModalOpen] = useState(false);
  const [formData, setFormData]   = useState({ name: "", company: "", email: "", phone: "", message: "" });
  const [status,     setStatus]     = useState<Status>("idle");
  const [loadingIdx, setLoadingIdx] = useState(0);

  /* ── GSAP page-load reveal ── */
  useEffect(() => {
    const ctx = gsap.context(() => {
      gsap.from(".k-reveal", {
        opacity: 0,
        y: 28,
        stagger: 0.1,
        duration: 0.75,
        ease: "power3.out",
        delay: 0.1,
      });
    }, pageRef);
    return () => ctx.revert();
  }, []);

  /* ── Loading text cycle ── */
  useEffect(() => {
    if (status !== "loading") { setLoadingIdx(0); return; }
    let i = 0;
    const id = setInterval(() => { i = (i + 1) % LOADING_TEXTS.length; setLoadingIdx(i); }, 1000);
    return () => clearInterval(id);
  }, [status]);

  /* ── Body scroll lock ── */
  useEffect(() => {
    document.body.style.overflow = modalOpen ? "hidden" : "";
    return () => { document.body.style.overflow = ""; };
  }, [modalOpen]);

  /* ── Calculations ── */
  const totalOnce =
    (web?.once ?? 0) + (buch?.once ?? 0) + (auto?.once ?? 0) +
    bers.reduce((s, b) => s + b.once, 0) +
    Object.values(upsells).reduce((s, u) => s + (u?.once ?? 0), 0);

  const totalMo =
    (web?.mo ?? 0) + (buch?.mo ?? 0) + (auto?.mo ?? 0) + (seo?.mo ?? 0) +
    Object.values(upsells).reduce((s, u) => s + (u?.mo ?? 0), 0);

  const selectedItems = [
    web?.label, buch?.label, auto?.label, seo?.label,
    ...bers.map((b) => b.label),
    ...Object.values(upsells).map((u) => u?.name),
  ].filter(Boolean) as string[];

  const visibleUpsells = (Object.keys(UPSELLS) as UpsellKey[])
    .filter((k) => UPSELLS[k].triggers.some((t) => main.includes(t)))
    .slice(0, 3);

  /* ── Handlers ── */
  const toggleMain = (key: MainKey) => {
    setMain((prev) => {
      if (prev.includes(key)) {
        if (key === "web")  setWeb(null);
        if (key === "buch") setBuch(null);
        if (key === "auto") setAuto(null);
        if (key === "seo")  setSeo(null);
        if (key === "ber")  setBers([]);
        return prev.filter((k) => k !== key);
      }
      return [...prev, key];
    });
  };

  const toggleUpsell = (key: UpsellKey) => {
    setUpsells((prev) => {
      const next = { ...prev };
      if (next[key]) { delete next[key]; }
      else { const u = UPSELLS[key]; next[key] = { label: u.name, once: u.once, mo: u.mo, name: u.name }; }
      return next;
    });
  };

  const reset = () => {
    setMain([]); setWeb(null); setBuch(null); setAuto(null); setSeo(null); setBers([]); setUpsells({});
  };

  /* ── Build message ── */
  const buildMessage = () => {
    const lo = Math.floor((totalOnce * 0.9) / 100) * 100;
    const est =
      (lo > 0 ? `ab ${lo.toLocaleString("de-DE")} €` : "") +
      (totalMo > 0 ? (lo > 0 ? " + " : "") + `${totalMo.toLocaleString("de-DE")} €/Mo` : "") ||
      "Im Gespräch klären";

    let b = "=== KONFIGURIERTES PROJEKT ===\n\n";
    if (web)  b += `WEBSITE: ${web.label}\n`;
    if (buch) b += `BUCHUNGSSYSTEM: ${buch.label}\n`;
    if (auto) b += `AUTOMATISIERUNG: ${auto.label}\n`;
    if (seo)  b += `SEO: ${seo.label}\n`;
    if (bers.length) b += `BERATUNG: ${bers.map((b) => b.label).join(", ")}\n`;
    const uk = Object.keys(upsells) as UpsellKey[];
    if (uk.length) b += `\nEXTRAS: ${uk.map((k) => upsells[k]?.name).join(", ")}\n`;
    b += `\nKOSTENSCHÄTZUNG: ${est}\n`;
    if (formData.company) b += `\nUNTERNEHMEN: ${formData.company}`;
    if (formData.phone)   b += `\nTELEFON: ${formData.phone}`;
    if (formData.message) b += `\n\nNACHRICHT:\n${formData.message}`;
    b += "\n\n===";
    return b;
  };

  /* ── Build config (structured data for email template) ── */
  const buildConfig = () => {
    const fmtPrice = (once: number, mo: number) => {
      if (once > 0 && mo > 0) return `${once.toLocaleString("de-DE")} € + ${mo} €/Mo`;
      if (once > 0) return `${once.toLocaleString("de-DE")} €`;
      if (mo > 0) return `${mo} €/Mo`;
      return "";
    };
    const items: { label: string; price: string }[] = [];
    if (web)  items.push({ label: `Website: ${web.label}`,           price: fmtPrice(web.once, web.mo) });
    if (buch) items.push({ label: `Buchungssystem: ${buch.label}`,   price: fmtPrice(buch.once, buch.mo) });
    if (auto) items.push({ label: `Automatisierung: ${auto.label}`,  price: fmtPrice(auto.once, auto.mo) });
    if (seo)  items.push({ label: `SEO: ${seo.label}`,               price: fmtPrice(seo.once, seo.mo) });
    bers.forEach((b) => items.push({ label: `Beratung: ${b.label}`,  price: fmtPrice(b.once, b.mo) }));
    (Object.keys(upsells) as UpsellKey[]).forEach((k) => {
      const u = upsells[k];
      if (u) items.push({ label: u.name, price: fmtPrice(u.once, u.mo) });
    });
    const lo = Math.floor((totalOnce * 0.9) / 100) * 100;
    const estimation =
      (lo > 0 ? `ab ${lo.toLocaleString("de-DE")} €` : "") +
      (totalMo > 0 ? (lo > 0 ? " · " : "") + `${totalMo.toLocaleString("de-DE")} €/Mo` : "") ||
      "Im Gespräch klären";
    return {
      items,
      totalOnce,
      totalMo,
      estimation,
      company: formData.company || undefined,
      phone: formData.phone || undefined,
    };
  };

  /* ── Submit ── */
  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setStatus("loading");
    try {
      const res = await fetch("/api/contact", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ name: formData.name, email: formData.email, message: buildMessage(), config: buildConfig() }),
      });
      if (!res.ok) throw new Error();
      setStatus("success");
    } catch {
      setStatus("error");
    }
  };

  const canSubmit = formData.name.trim().length > 0 && formData.email.includes("@") && status !== "loading";

  const lo = Math.floor((totalOnce * 0.9) / 100) * 100;
  const estStr =
    (lo > 0 ? `ab ${lo.toLocaleString("de-DE")}\u202f€` : "") +
    (totalMo > 0 ? (lo > 0 ? " · " : "") + `${totalMo.toLocaleString("de-DE")}\u202f€/Mo` : "") ||
    "Im Gespräch";

  /* ── Grid style ── */
  const grid2: React.CSSProperties = {
    display: "grid",
    gridTemplateColumns: "repeat(auto-fit,minmax(300px,1fr))",
    gap: 10,
    marginBottom: "3rem",
  };
  const grid3: React.CSSProperties = {
    display: "grid",
    gridTemplateColumns: "repeat(auto-fit,minmax(280px,1fr))",
    gap: 10,
    marginBottom: "3rem",
  };

  /* ─────────────────────── RENDER ─────────────────────────── */
  return (
    <>
      <div
        ref={pageRef}
        style={{
          position: "relative",
          overflow: "hidden",
          minHeight: "100vh",
          overflowAnchor: "none",
        }}
      >
        {/* Ambient orbs */}
        <div aria-hidden style={{
          position: "absolute", top: "-15%", left: "-8%",
          width: "50vw", height: "50vw", borderRadius: "50%",
          background: "radial-gradient(circle,rgba(96,165,250,0.06),transparent 70%)",
          pointerEvents: "none",
        }} />
        <div aria-hidden style={{
          position: "absolute", bottom: "-10%", right: "-8%",
          width: "45vw", height: "45vw", borderRadius: "50%",
          background: "radial-gradient(circle,rgba(173,43,238,0.06),transparent 70%)",
          pointerEvents: "none",
        }} />

        <div style={{
          position: "relative",
          zIndex: 1,
          maxWidth: 920,
          margin: "0 auto",
          padding: "clamp(3rem,7vw,6rem) clamp(1.25rem,4vw,2.5rem)",
          paddingBottom: 160,
        }}>

          {/* Back link */}
          <Link
            href="/"
            className="k-reveal"
            style={{
              display: "inline-flex", alignItems: "center", gap: "0.5rem",
              fontSize: "0.68rem", fontFamily: "monospace",
              letterSpacing: "0.18em", textTransform: "uppercase",
              color: "rgba(251,251,244,0.22)", textDecoration: "none",
              marginBottom: "3rem", transition: "color 0.2s",
            }}
            onMouseEnter={(e) => ((e.currentTarget as HTMLAnchorElement).style.color = "rgba(251,251,244,0.5)")}
            onMouseLeave={(e) => ((e.currentTarget as HTMLAnchorElement).style.color = "rgba(251,251,244,0.22)")}
          >
            <svg width="11" height="11" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
              <path d="M19 12H5M5 12l7 7M5 12l7-7" />
            </svg>
            Zurück zur Startseite
          </Link>

          {/* Header */}
          <p className="k-reveal" style={{
            fontFamily: "monospace", fontSize: "0.6rem",
            letterSpacing: "0.25em", textTransform: "uppercase",
            color: "rgba(251,251,244,0.25)", marginBottom: "0.9rem",
          }}>
            Anfragen
          </p>

          <h1 className="k-reveal" style={{
            fontSize: "clamp(2.5rem,5.5vw,4.5rem)",
            fontWeight: 800, letterSpacing: "-0.04em",
            lineHeight: 0.95, marginBottom: "1rem",
          }}>
            Was soll{" "}
            <span style={{
              background: "linear-gradient(135deg,#60a5fa 0%,#8b6ff7 50%,#ad2bee 100%)",
              WebkitBackgroundClip: "text", WebkitTextFillColor: "transparent", backgroundClip: "text",
            }}>
              entstehen?
            </span>
          </h1>

          <p className="k-reveal" style={{
            fontSize: "clamp(0.9rem,1.2vw,1rem)",
            color: "rgba(251,251,244,0.4)", lineHeight: 1.75,
            marginBottom: "clamp(3rem,6vw,5rem)", maxWidth: 480,
          }}>
            Wähle was du brauchst — der Rest blendet sich passend dazu ein.
            Keine versteckten Kosten, kein Paket-Denken.
          </p>

          {/* ── 01 Hauptleistungen ── */}
          <div className="k-reveal">
            <SecLabel label="Was brauchst du?" />
            <div style={grid3}>
              {([
                { key: "web",  name: "Website",            desc: "Responsive, modern, schnell" },
                { key: "buch", name: "Buchungssystem",      desc: "Kalender, Termine, Auto-Mails" },
                { key: "auto", name: "Automatisierung",     desc: "Workflows, CRM, Prozesse" },
                { key: "seo",  name: "SEO & Sichtbarkeit",  desc: "Google, Rankings, lokale Suche" },
                { key: "ber",  name: "Beratung / Audit",    desc: "Einmalige Analyse, kein Abo" },
              ] as { key: MainKey; name: string; desc: string }[]).map((item) => (
                <Tile
                  key={item.key}
                  name={item.name}
                  desc={item.desc}
                  selected={main.includes(item.key)}
                  onClick={() => toggleMain(item.key)}
                />
              ))}
            </div>
          </div>

          {/* ── Detail-Blöcke ── */}

          <Collapsible open={main.includes("web")}>
            <SecLabel label="Website — Paket wählen" />
            <div style={grid2}>
              {([
                { label: "1–3 Seiten",       once: 499,  mo: 29, desc: "Start, Leistungen, Kontakt — kompakt und fertig",           price: "ab 499 € · 29 €/Mo" },
                { label: "4–7 Seiten",       once: 799,  mo: 39, desc: "+ Galerie, Über uns, Preise, Blog-Grundstruktur",           price: "ab 799 € · 39 €/Mo" },
                { label: "8–12 Seiten",      once: 1199, mo: 59, desc: "Vollständige Unternehmensseite, viele Inhalte",             price: "ab 1.199 € · 59 €/Mo" },
                { label: "Premium / Custom", once: 2500, mo: 89, desc: "Kein Template — GSAP, Storytelling, individuelles Konzept", price: "ab 2.500 € · 89 €/Mo" },
              ] as (Pkg & { desc: string; price: string })[]).map((pkg) => (
                <Tile key={pkg.label} name={pkg.label} desc={pkg.desc} price={pkg.price}
                  selected={web?.label === pkg.label}
                  onClick={() => setWeb(web?.label === pkg.label ? null : pkg)} />
              ))}
            </div>
          </Collapsible>

          <Collapsible open={main.includes("buch")}>
            <SecLabel label="Buchungssystem" />
            <div style={grid2}>
              {([
                { label: "Buchung Basis", once: 299, mo: 19, desc: "1 Kalender, Echtzeit-Slots, Bestätigungs-Mail",    price: "ab 299 € · 19 €/Mo" },
                { label: "Buchung Pro",   once: 499, mo: 29, desc: "+ Serviceauswahl, Erinnerungen, Multi-Mitarbeiter", price: "ab 499 € · 29 €/Mo" },
              ] as (Pkg & { desc: string; price: string })[]).map((pkg) => (
                <Tile key={pkg.label} name={pkg.label} desc={pkg.desc} price={pkg.price}
                  selected={buch?.label === pkg.label}
                  onClick={() => setBuch(buch?.label === pkg.label ? null : pkg)} />
              ))}
            </div>
          </Collapsible>

          <Collapsible open={main.includes("auto")}>
            <SecLabel label="Automatisierung" />
            <div style={grid2}>
              {([
                { label: "1 Workflow",    once: 349, mo: 29, desc: "z.B. Lead-Routing, Auto-Rechnung, CRM-Eintrag", price: "ab 349 € · 29 €/Mo Hosting" },
                { label: "2–3 Workflows", once: 599, mo: 49, desc: "Verkettete Prozesse, mehrere Auslöser",          price: "ab 599 € · 49 €/Mo Hosting" },
              ] as (Pkg & { desc: string; price: string })[]).map((pkg) => (
                <Tile key={pkg.label} name={pkg.label} desc={pkg.desc} price={pkg.price}
                  selected={auto?.label === pkg.label}
                  onClick={() => setAuto(auto?.label === pkg.label ? null : pkg)} />
              ))}
            </div>
          </Collapsible>

          <Collapsible open={main.includes("seo")}>
            <SecLabel label="SEO" />
            <div style={grid2}>
              {([
                { label: "Basis-SEO",       once: 0, mo: 29, desc: "Meta, Schema.org, Google Business, Search Console",    price: "inklusive · 29 €/Mo" },
                { label: "Erweitertes SEO", once: 0, mo: 79, desc: "+ Keyword-Tracking, monatlicher Report, Content-Tipps", price: "inklusive · 79 €/Mo" },
              ] as (Pkg & { desc: string; price: string })[]).map((pkg) => (
                <Tile key={pkg.label} name={pkg.label} desc={pkg.desc} price={pkg.price}
                  selected={seo?.label === pkg.label}
                  onClick={() => setSeo(seo?.label === pkg.label ? null : pkg)} />
              ))}
            </div>
          </Collapsible>

          <Collapsible open={main.includes("ber")}>
            <SecLabel label="Beratung — Mehrfachauswahl möglich" />
            <div style={grid2}>
              {([
                { label: "SEO-Audit",                once: 149, mo: 0, desc: "Vollanalyse mit PDF-Report und Prio-Liste",   price: "149 € einmalig" },
                { label: "Website-Check",            once: 149, mo: 0, desc: "Design, Performance, Mobile, Rechtliches",    price: "149 € einmalig" },
                { label: "Prozess-Audit",            once: 249, mo: 0, desc: "Welche Abläufe lassen sich automatisieren?",  price: "249 € einmalig" },
                { label: "Erstgespräch (kostenlos)", once: 0,   mo: 0, desc: "Kostenlos — schauen was wirklich Sinn macht", price: "kostenlos" },
              ] as (Pkg & { desc: string; price: string })[]).map((pkg) => {
                const isSel = bers.some((b) => b.label === pkg.label);
                return (
                  <Tile key={pkg.label} name={pkg.label} desc={pkg.desc} price={pkg.price}
                    selected={isSel}
                    onClick={() => setBers((prev) =>
                      isSel ? prev.filter((b) => b.label !== pkg.label) : [...prev, pkg]
                    )} />
                );
              })}
            </div>
          </Collapsible>

          {/* ── Upsells ── */}
          {main.length > 0 && visibleUpsells.length > 0 && (
            <div>
              <div style={{ display: "flex", alignItems: "center", gap: "0.75rem", marginBottom: "1rem" }}>
                <span style={{
                  fontFamily: "monospace", fontSize: "0.6rem",
                  letterSpacing: "0.22em", textTransform: "uppercase",
                  color: "rgba(139,111,247,0.6)",
                  flexShrink: 0,
                }}>
                  Vielleicht auch interessant
                </span>
                <div style={{ flex: 1, height: 1, background: "linear-gradient(90deg,rgba(139,111,247,0.2),transparent)" }} />
              </div>
              <div style={grid3}>
                {visibleUpsells.map((k) => {
                  const u = UPSELLS[k];
                  return (
                    <Tile key={k} name={u.name} desc={u.desc} price={u.price}
                      badge={u.badge ?? undefined} selected={!!upsells[k]}
                      onClick={() => toggleUpsell(k)} />
                  );
                })}
              </div>
            </div>
          )}

        </div>
      </div>

      {/* ══ Sticky Bar ══ */}
      <div style={{
        position: "fixed", bottom: 0, left: 0, right: 0, zIndex: 100,
        background: "rgba(0,0,0,0.88)",
        backdropFilter: "blur(20px)", WebkitBackdropFilter: "blur(20px)",
      }}>
        {/* Gradient top line */}
        <div aria-hidden style={{
          height: 1,
          background: "linear-gradient(90deg,transparent,rgba(96,165,250,0.3),rgba(139,111,247,0.4),rgba(173,43,238,0.3),transparent)",
        }} />

        <div style={{ maxWidth: 920, margin: "0 auto", padding: "1.1rem clamp(1.25rem,4vw,2.5rem)" }}>
          <div style={{
            display: "flex", alignItems: "center",
            justifyContent: "space-between", gap: "1.5rem", flexWrap: "wrap",
          }}>
            {/* Left — Preise + Auswahl */}
            <div style={{ display: "flex", flexDirection: "column", gap: "0.3rem", minWidth: 0 }}>
              <div style={{ display: "flex", alignItems: "baseline", gap: "0.75rem", flexWrap: "wrap" }}>
                <span style={{
                  fontSize: "1.6rem", fontWeight: 800, letterSpacing: "-0.03em", lineHeight: 1,
                  background: "linear-gradient(90deg,#60a5fa,#8b6ff7,#ad2bee)",
                  WebkitBackgroundClip: "text", WebkitTextFillColor: "transparent", backgroundClip: "text",
                }}>
                  {totalMo.toLocaleString("de-DE")}&thinsp;€/Mo
                </span>
                {totalOnce > 0 && (
                  <span style={{ fontSize: 14, color: "rgba(251,251,244,0.55)", letterSpacing: "0.01em" }}>
                    + {totalOnce.toLocaleString("de-DE")}&thinsp;€ einmalig
                  </span>
                )}
              </div>
              {selectedItems.length > 0 && (
                <span style={{
                  fontSize: 12, color: "rgba(251,251,244,0.35)",
                  maxWidth: 420, whiteSpace: "nowrap", overflow: "hidden", textOverflow: "ellipsis",
                }}>
                  {selectedItems.join(" · ")}
                </span>
              )}
            </div>

            {/* Right — Aktionen */}
            <div style={{ display: "flex", gap: "1rem", alignItems: "center", flexShrink: 0 }}>
              {(main.length > 0 || selectedItems.length > 0) && (
                <button
                  onClick={reset}
                  style={{
                    background: "none",
                    border: "1px solid rgba(251,251,244,0.15)",
                    borderRadius: 999,
                    cursor: "pointer",
                    fontSize: "0.72rem", fontFamily: "'Geist',sans-serif",
                    fontWeight: 600, letterSpacing: "0.06em", textTransform: "uppercase",
                    color: "rgba(251,251,244,0.5)", transition: "all 0.2s",
                    padding: "0.75rem 1.25rem",
                  }}
                  onMouseEnter={(e) => {
                    (e.currentTarget as HTMLButtonElement).style.color = "#fbfbf4";
                    (e.currentTarget as HTMLButtonElement).style.borderColor = "rgba(251,251,244,0.35)";
                  }}
                  onMouseLeave={(e) => {
                    (e.currentTarget as HTMLButtonElement).style.color = "rgba(251,251,244,0.5)";
                    (e.currentTarget as HTMLButtonElement).style.borderColor = "rgba(251,251,244,0.15)";
                  }}
                >
                  Zurücksetzen
                </button>
              )}
              <button
                onClick={() => setModalOpen(true)}
                className="hero-cta"
                style={{
                  fontFamily: "'Geist',sans-serif",
                  fontSize: "0.78rem", fontWeight: 700,
                  letterSpacing: "0.08em", textTransform: "uppercase",
                  padding: "0.9rem 2rem", borderRadius: 999,
                  border: "none",
                  background: "linear-gradient(135deg,#60a5fa,#8b6ff7,#ad2bee)",
                  color: "#fff", cursor: "pointer",
                  transition: "opacity 0.18s, transform 0.15s",
                }}
                onMouseEnter={(e) => {
                  (e.currentTarget as HTMLButtonElement).style.opacity = "0.85";
                  (e.currentTarget as HTMLButtonElement).style.transform = "translateY(-1px)";
                }}
                onMouseLeave={(e) => {
                  (e.currentTarget as HTMLButtonElement).style.opacity = "1";
                  (e.currentTarget as HTMLButtonElement).style.transform = "translateY(0)";
                }}
              >
                Unverbindlich anfragen →
              </button>
            </div>
          </div>
        </div>
      </div>

      {/* ══ Modal ══ */}
      {modalOpen && (
        <div
          onClick={(e) => { if (e.target === e.currentTarget) { setModalOpen(false); setStatus("idle"); } }}
          style={{
            position: "fixed", inset: 0, zIndex: 200,
            background: "rgba(0,0,0,0.82)",
            display: "flex", alignItems: "center", justifyContent: "center",
            padding: "1.25rem",
            animation: "kFadeIn 0.2s ease",
          }}
        >
          <style>{`
            @keyframes kFadeIn { from { opacity: 0 } to { opacity: 1 } }
            @keyframes kSlideUp { from { transform: translateY(20px); opacity: 0 } to { transform: translateY(0); opacity: 1 } }
          `}</style>

          <div style={{
            background: "#080808",
            border: "1px solid rgba(251,251,244,0.07)",
            borderRadius: 20,
            width: "100%", maxWidth: 520,
            position: "relative", overflow: "hidden",
            animation: "kSlideUp 0.3s ease",
            maxHeight: "90vh", overflowY: "auto",
          }}>
            {/* Top gradient line */}
            <div aria-hidden style={{
              position: "absolute", top: 0, left: 0, right: 0, height: 1,
              background: "linear-gradient(90deg,transparent,#60a5fa,#8b6ff7,#ad2bee,transparent)",
              opacity: 0.5,
            }} />

            <div style={{ padding: "2.5rem" }}>

              {status === "success" ? (
                /* ── Success ── */
                <div style={{ textAlign: "center", paddingTop: "0.5rem" }}>
                  <div style={{
                    width: 52, height: 52, borderRadius: "50%",
                    background: "linear-gradient(135deg,#60a5fa,#ad2bee)",
                    display: "flex", alignItems: "center", justifyContent: "center",
                    margin: "0 auto 1.5rem",
                  }}>
                    <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="white" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
                      <polyline points="20 6 9 17 4 12" />
                    </svg>
                  </div>
                  <h3 style={{ fontSize: "1.5rem", fontWeight: 800, letterSpacing: "-0.03em", marginBottom: "0.5rem" }}>
                    Dein Potenzial{" "}
                    <span style={{
                      background: "linear-gradient(135deg,#60a5fa,#ad2bee)",
                      WebkitBackgroundClip: "text", WebkitTextFillColor: "transparent", backgroundClip: "text",
                    }}>
                      wird analysiert.
                    </span>
                  </h3>
                  <p style={{ fontSize: 13, color: "rgba(251,251,244,0.45)", lineHeight: 1.7, maxWidth: 360, margin: "0 auto 2rem" }}>
                    Anfrage erhalten — ich melde mich innerhalb von 24 Stunden persönlich bei dir.
                  </p>
                  {[
                    { n: "01", b: "Analyse deines Projekts", t: "Ich schaue mir deine Angaben an und bereite konkrete Ideen vor." },
                    { n: "02", b: "Persönliche Rückmeldung",  t: "Kein Standardangebot — ein konkreter Plan, nur für dich." },
                    { n: "03", b: "Gemeinsamer nächster Schritt", t: "Wir klären im Gespräch was wirklich Sinn macht." },
                  ].map((s) => (
                    <div key={s.n} style={{
                      display: "flex", gap: 12, alignItems: "flex-start",
                      padding: "12px 0", borderBottom: "1px solid rgba(251,251,244,0.06)",
                      textAlign: "left",
                    }}>
                      <span style={{ fontFamily: "monospace", fontSize: "0.58rem", letterSpacing: "0.1em", color: "#60a5fa", flexShrink: 0, paddingTop: 1 }}>
                        {s.n}
                      </span>
                      <div style={{ fontSize: 12, color: "rgba(251,251,244,0.55)", lineHeight: 1.6 }}>
                        <strong style={{ color: "rgba(251,251,244,0.85)", fontWeight: 600, display: "block", marginBottom: 2 }}>{s.b}</strong>
                        {s.t}
                      </div>
                    </div>
                  ))}
                </div>
              ) : (
                /* ── Form ── */
                <>
                  <h2 style={{ fontSize: "1.5rem", fontWeight: 800, letterSpacing: "-0.03em", marginBottom: "0.4rem" }}>
                    Fast{" "}
                    <span style={{
                      background: "linear-gradient(135deg,#60a5fa,#ad2bee)",
                      WebkitBackgroundClip: "text", WebkitTextFillColor: "transparent", backgroundClip: "text",
                    }}>
                      geschafft.
                    </span>
                  </h2>
                  <p style={{ fontSize: 13, color: "rgba(251,251,244,0.4)", lineHeight: 1.65, marginBottom: "1.75rem" }}>
                    Deine Konfiguration wird mit übermittelt — ich melde mich innerhalb von 24 Stunden persönlich.
                  </p>

                  {/* Summary */}
                  <div style={{
                    background: "rgba(96,165,250,0.05)",
                    border: "1px solid rgba(96,165,250,0.12)",
                    borderRadius: 10, padding: "1rem 1.1rem", marginBottom: "2rem",
                  }}>
                    <p style={{ fontFamily: "monospace", fontSize: "0.58rem", letterSpacing: "0.18em", textTransform: "uppercase", color: "rgba(251,251,244,0.25)", marginBottom: 6 }}>
                      Geschätzter Rahmen
                    </p>
                    <div style={{
                      fontSize: "1.35rem", fontWeight: 800, letterSpacing: "-0.03em",
                      background: "linear-gradient(90deg,#60a5fa,#ad2bee)",
                      WebkitBackgroundClip: "text", WebkitTextFillColor: "transparent", backgroundClip: "text",
                      lineHeight: 1, marginBottom: 6,
                    }}>
                      {estStr}
                    </div>
                    {selectedItems.length > 0 && (
                      <p style={{ fontSize: 12, color: "rgba(251,251,244,0.35)", lineHeight: 1.6 }}>
                        {selectedItems.join(" · ")}
                      </p>
                    )}
                  </div>

                  <form onSubmit={handleSubmit} autoComplete="on">
                    <div style={{ display: "flex", flexDirection: "column", gap: "2rem", marginBottom: "2rem" }}>

                      <div className="contact-field">
                        <input type="text" name="name" value={formData.name} required placeholder=" " autoComplete="name"
                          onChange={(e) => setFormData((f) => ({ ...f, name: e.target.value }))} />
                        <label>Name</label>
                      </div>

                      <div className="contact-field">
                        <input type="text" name="company" value={formData.company} placeholder=" "
                          onChange={(e) => setFormData((f) => ({ ...f, company: e.target.value }))} />
                        <label>Unternehmen & Branche (optional)</label>
                      </div>

                      <div className="contact-field">
                        <input type="email" name="email" value={formData.email} required placeholder=" " autoComplete="email"
                          onChange={(e) => setFormData((f) => ({ ...f, email: e.target.value }))} />
                        <label>E-Mail</label>
                      </div>

                      <div className="contact-field">
                        <input type="tel" name="phone" value={formData.phone} placeholder=" " autoComplete="tel"
                          onChange={(e) => setFormData((f) => ({ ...f, phone: e.target.value }))} />
                        <label>Telefon (optional)</label>
                      </div>

                      <div className="contact-field">
                        <textarea name="message" value={formData.message} placeholder=" " rows={3}
                          onChange={(e) => setFormData((f) => ({ ...f, message: e.target.value }))} />
                        <label>Noch etwas? (optional)</label>
                      </div>

                    </div>

                    {status === "error" && (
                      <p style={{ color: "#f87171", fontSize: "0.875rem", marginBottom: "1rem" }}>
                        Etwas ist schiefgelaufen. Bitte versuche es nochmal.
                      </p>
                    )}

                    <div style={{ display: "flex", gap: 10, justifyContent: "flex-end" }}>
                      <button
                        type="button"
                        onClick={() => { setModalOpen(false); setStatus("idle"); }}
                        style={{
                          fontFamily: "'Geist',sans-serif", fontSize: "0.68rem", fontWeight: 600,
                          letterSpacing: "0.08em", textTransform: "uppercase",
                          padding: "0.85rem 1.25rem", borderRadius: 999,
                          border: "1px solid rgba(251,251,244,0.1)", background: "transparent",
                          color: "rgba(251,251,244,0.4)", cursor: "pointer", transition: "all 0.18s",
                        }}
                        onMouseEnter={(e) => { (e.currentTarget as HTMLButtonElement).style.borderColor = "rgba(251,251,244,0.2)"; (e.currentTarget as HTMLButtonElement).style.color = "rgba(251,251,244,0.65)"; }}
                        onMouseLeave={(e) => { (e.currentTarget as HTMLButtonElement).style.borderColor = "rgba(251,251,244,0.1)"; (e.currentTarget as HTMLButtonElement).style.color = "rgba(251,251,244,0.4)"; }}
                      >
                        Abbrechen
                      </button>
                      <button
                        type="submit"
                        disabled={!canSubmit}
                        className={status === "loading" ? "btn-shimmer" : ""}
                        style={{
                          fontFamily: "'Geist',sans-serif", fontSize: "0.72rem", fontWeight: 700,
                          letterSpacing: "0.1em", textTransform: "uppercase",
                          padding: "0.85rem 1.75rem", borderRadius: 999, border: "none",
                          background: "linear-gradient(135deg,#60a5fa,#8b6ff7,#ad2bee)",
                          color: "#fff", cursor: canSubmit ? "pointer" : "not-allowed",
                          opacity: canSubmit ? 1 : 0.3, transition: "opacity 0.18s, transform 0.15s",
                        }}
                        onMouseEnter={(e) => { if (canSubmit) (e.currentTarget as HTMLButtonElement).style.transform = "translateY(-1px)"; }}
                        onMouseLeave={(e) => { (e.currentTarget as HTMLButtonElement).style.transform = "translateY(0)"; }}
                      >
                        {status === "loading" ? LOADING_TEXTS[loadingIdx] : "Absenden →"}
                      </button>
                    </div>
                  </form>
                </>
              )}
            </div>
          </div>
        </div>
      )}
    </>
  );
}
