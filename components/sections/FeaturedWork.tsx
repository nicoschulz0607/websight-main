"use client";

import { useEffect, useRef, useState } from "react";
import { gsap } from "@/lib/gsap";
import { useCursor } from "@/components/providers/CursorContext";
import { PROJECTS } from "@/lib/constants";

const TOTAL = 3;
const DEFAULT_W = 100 / TOTAL;
const EXPANDED_W = 52;
const COLLAPSED_W = (100 - EXPANDED_W) / (TOTAL - 1);


export default function FeaturedWork() {
  const [hoveredIndex, setHoveredIndex] = useState<number | null>(null);
  const cardRefs = useRef<(HTMLDivElement | null)[]>([]);
  const { setCursorMode } = useCursor();
  const tweens = useRef<gsap.core.Tween[]>([]);

  useEffect(() => {
    if (window.matchMedia("(max-width: 768px)").matches) return;
    tweens.current.forEach((t) => t.kill());
    tweens.current = [];
    cardRefs.current.forEach((card, i) => {
      if (!card) return;
      const w = hoveredIndex === null
        ? DEFAULT_W
        : i === hoveredIndex ? EXPANDED_W : COLLAPSED_W;
      tweens.current.push(gsap.to(card, { width: `${w}%`, duration: 0.65, ease: "power2.out" }));
    });
  }, [hoveredIndex]);

  return (
    <>
      <div className="block md:hidden">
        <section id="work">
          {/* Heading */}
          <div style={{ padding: "2.5rem 1.5rem 1.5rem", background: "#000", display: "flex", alignItems: "center", gap: "1rem" }}>
            <div style={{ flex: 1, height: "1px", background: "linear-gradient(90deg, rgba(251,251,244,0.06), transparent)" }} />
            <span style={{ fontSize: "0.65rem", fontWeight: 700, letterSpacing: "0.3em", textTransform: "uppercase", color: "rgba(251,251,244,0.25)", whiteSpace: "nowrap" }}>Ausgewählte Arbeiten</span>
            <div style={{ flex: 1, height: "1px", background: "linear-gradient(90deg, transparent, rgba(251,251,244,0.06))" }} />
          </div>

          {/* Info card */}
          <div style={{ background: "#080808", padding: "2rem 1.5rem", position: "relative", overflow: "hidden", borderBottom: "1px solid rgba(251,251,244,0.05)" }}>
            <div style={{ position: "absolute", inset: 0, backgroundImage: "linear-gradient(rgba(251,251,244,0.02) 1px, transparent 1px), linear-gradient(90deg, rgba(251,251,244,0.02) 1px, transparent 1px)", backgroundSize: "40px 40px", pointerEvents: "none" }} />
            <div style={{ position: "absolute", inset: 0, background: "radial-gradient(ellipse 80% 60% at 20% 90%, rgba(96,165,250,0.08) 0%, transparent 65%)", pointerEvents: "none" }} />
            <div style={{ position: "relative" }}>
              <div style={{ display: "flex", alignItems: "center", gap: "0.5rem", marginBottom: "1.25rem" }}>
                <span style={{ width: 5, height: 5, borderRadius: "50%", background: "#60a5fa", display: "inline-block" }} />
                <span style={{ fontSize: "0.62rem", letterSpacing: "0.25em", textTransform: "uppercase", color: "rgba(251,251,244,0.35)" }}>Portfolio</span>
              </div>
              <h2 style={{ fontSize: "2.1rem", fontWeight: 800, lineHeight: 1.05, letterSpacing: "-0.04em", color: "#fbfbf4", marginBottom: "0.75rem" }}>
                Unsere{" "}
                <span style={{ background: "linear-gradient(135deg, #60a5fa 0%, #8b6ff7 50%, #ad2bee 100%)", WebkitBackgroundClip: "text", WebkitTextFillColor: "transparent", backgroundClip: "text" }}>Projekte.</span>
              </h2>
              <p style={{ fontSize: "0.82rem", color: "rgba(251,251,244,0.32)", lineHeight: 1.75 }}>
                Design ohne Kompromisse — durchdacht, präzise, wirkungsvoll.
              </p>
            </div>
          </div>

          {/* Project cards — atmospheric full-bleed */}
          {PROJECTS.map((project) => (
            <a key={project.id} href={project.href} target="_blank" rel="noopener noreferrer"
              style={{ display: "block", textDecoration: "none", height: 280, position: "relative", overflow: "hidden", borderBottom: "1px solid rgba(251,251,244,0.05)" }}>
              <img src={project.bgImage} alt={project.title}
                style={{ position: "absolute", inset: 0, width: "100%", height: "100%", objectFit: "cover", objectPosition: "center" }} />
              <div style={{ position: "absolute", inset: 0, background: "linear-gradient(to top, rgba(0,0,0,0.88) 0%, rgba(0,0,0,0.35) 55%, rgba(0,0,0,0.1) 100%)" }} />
              <div style={{ position: "absolute", top: 0, left: 0, right: 0, height: "1px", background: `linear-gradient(90deg, transparent, ${project.accentColor}70, transparent)` }} />
              <span style={{ position: "absolute", top: "1rem", left: "1.25rem", fontSize: "0.62rem", fontFamily: "monospace", letterSpacing: "0.2em", color: "rgba(251,251,244,0.55)", zIndex: 2 }}>{project.number}</span>
              <div style={{ position: "absolute", bottom: 0, left: 0, right: 0, padding: "1.25rem", zIndex: 2 }}>
                <div style={{ display: "flex", flexWrap: "wrap", gap: "0.35rem", marginBottom: "0.5rem" }}>
                  {project.tags.map((tag) => (
                    <span key={tag} style={{ fontSize: "0.62rem", fontWeight: 600, letterSpacing: "0.08em", textTransform: "uppercase", color: "rgba(251,251,244,0.75)", background: "rgba(0,0,0,0.45)", backdropFilter: "blur(4px)", border: "1px solid rgba(251,251,244,0.15)", padding: "0.2rem 0.5rem", borderRadius: "2rem" }}>{tag}</span>
                  ))}
                </div>
                <h3 style={{ fontSize: "1.35rem", fontWeight: 700, color: "#fbfbf4", lineHeight: 1.15, textShadow: "0 2px 10px rgba(0,0,0,0.8)" }}>{project.title}</h3>
                <p style={{ fontSize: "0.78rem", color: "rgba(251,251,244,0.55)", marginTop: "0.3rem" }}>{project.subtitle}</p>
              </div>
            </a>
          ))}

          {/* CTA card */}
          <div style={{ background: "#080808", padding: "2.25rem 1.5rem", position: "relative", overflow: "hidden" }}>
            <div style={{ position: "absolute", inset: 0, background: "radial-gradient(ellipse 80% 60% at 70% 80%, rgba(173,43,238,0.12) 0%, transparent 65%)", pointerEvents: "none" }} />
            <div style={{ position: "relative" }}>
              <div style={{ display: "inline-flex", alignItems: "center", gap: "0.4rem", background: "rgba(173,43,238,0.1)", border: "1px solid rgba(173,43,238,0.25)", borderRadius: "2rem", padding: "0.3rem 0.75rem", marginBottom: "1.25rem" }}>
                <span style={{ width: 5, height: 5, borderRadius: "50%", background: "#ad2bee", display: "inline-block" }} />
                <span style={{ fontSize: "0.62rem", fontWeight: 600, letterSpacing: "0.15em", textTransform: "uppercase", color: "#ad2bee" }}>Nächstes Projekt</span>
              </div>
              <p style={{ fontSize: "0.65rem", color: "rgba(251,251,244,0.3)", letterSpacing: "0.2em", textTransform: "uppercase", marginBottom: "0.6rem" }}>Zusammenarbeiten</p>
              <h3 style={{ fontSize: "1.45rem", fontWeight: 800, lineHeight: 1.15, letterSpacing: "-0.02em", color: "#fbfbf4", marginBottom: "0.75rem" }}>
                Hier könnte dein Projekt stehen.
              </h3>
              <p style={{ fontSize: "0.82rem", color: "rgba(251,251,244,0.38)", lineHeight: 1.7, marginBottom: "1.5rem" }}>
                Lass uns gemeinsam etwas Außergewöhnliches schaffen.
              </p>
              <a
                href="#kontakt"
                style={{ display: "inline-flex", alignItems: "center", gap: "0.6rem", background: "linear-gradient(135deg, #60a5fa, #ad2bee)", color: "#fbfbf4", textDecoration: "none", borderRadius: "0.75rem", padding: "0.9rem 1.6rem", fontSize: "0.78rem", fontWeight: 700, letterSpacing: "0.1em", textTransform: "uppercase" }}
              >
                Gespräch starten
                <svg width="11" height="11" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
                  <path d="M7 17 17 7M7 7h10v10"/>
                </svg>
              </a>
            </div>
          </div>
        </section>
      </div>

      <div className="hidden md:block">
        <section id="work-desktop">
      {/* Section heading */}
      <div style={{
        padding: "4rem clamp(2rem, 8vw, 8rem) 2rem",
        background: "#000",
        display: "flex",
        alignItems: "center",
        gap: "1.25rem",
      }}>
        <div style={{ flex: 1, height: "1px", background: "linear-gradient(90deg, rgba(251,251,244,0.06), transparent)" }} />
        <span style={{
          fontSize: "0.65rem", fontWeight: 700, letterSpacing: "0.3em",
          textTransform: "uppercase", color: "rgba(251,251,244,0.25)",
        }}>Ausgewählte Arbeiten</span>
        <div style={{ flex: 1, height: "1px", background: "linear-gradient(90deg, transparent, rgba(251,251,244,0.06))" }} />
      </div>

      <div
        className="flex w-full overflow-hidden cursor-none"
        style={{ height: "80vh" }}
        onMouseLeave={() => { setCursorMode("default"); setHoveredIndex(null); }}
      >
        {/* ── Tile 0: Info panel ───────────────────────────── */}
        <div
          ref={(el) => { cardRefs.current[0] = el; }}
          className="relative h-full flex-shrink-0 overflow-hidden border-r border-cream/[0.06]"
          style={{ width: `${DEFAULT_W}%`, minWidth: 0, willChange: "width", background: "#080808" }}
          onMouseEnter={() => setHoveredIndex(0)}
        >
          {/* Background glow */}
          <div className="absolute inset-0 pointer-events-none" style={{
            background: "radial-gradient(ellipse 80% 60% at 20% 90%, rgba(96,165,250,0.08) 0%, transparent 65%)",
            opacity: hoveredIndex === 0 ? 1 : 0.5, transition: "opacity 0.5s ease",
          }} />

          {/* Grid lines decoration */}
          <div className="absolute inset-0 pointer-events-none" style={{
            backgroundImage: "linear-gradient(rgba(251,251,244,0.02) 1px, transparent 1px), linear-gradient(90deg, rgba(251,251,244,0.02) 1px, transparent 1px)",
            backgroundSize: "40px 40px",
          }} />

          <div className="absolute inset-0 flex flex-col justify-between p-8 md:p-10">
            {/* Top */}
            <div>
              <div style={{ display: "flex", alignItems: "center", gap: "0.5rem", marginBottom: "2rem" }}>
                <span style={{ width: 5, height: 5, borderRadius: "50%", background: "#60a5fa", display: "inline-block" }} />
                <span style={{ fontSize: "0.62rem", letterSpacing: "0.25em", textTransform: "uppercase", color: "rgba(251,251,244,0.35)" }}>
                  Ausgewählte Arbeiten
                </span>
              </div>
              <h2 style={{ fontSize: "clamp(1.8rem, 3vw, 3.2rem)", fontWeight: 800, lineHeight: 1.05, letterSpacing: "-0.04em", color: "#fbfbf4" }}>
                Unsere<br />
                <span style={{
                  background: "linear-gradient(135deg, #60a5fa 0%, #8b6ff7 50%, #ad2bee 100%)",
                  WebkitBackgroundClip: "text", WebkitTextFillColor: "transparent", backgroundClip: "text",
                }}>Projekte.</span>
              </h2>
              <p style={{ marginTop: "1.25rem", fontSize: "clamp(0.78rem, 0.9vw, 0.875rem)", color: "rgba(251,251,244,0.32)", lineHeight: 1.75, maxWidth: "210px" }}>
                Design ohne Kompromisse — durchdacht, präzise, wirkungsvoll.
              </p>
            </div>

            {/* Year / discipline tags */}
            <div style={{ display: "flex", flexDirection: "column", gap: "0.5rem" }}>
              {["Webdesign", "Entwicklung", "SEO", "Strategie"].map((tag) => (
                <span key={tag} style={{
                  fontSize: "0.62rem", letterSpacing: "0.15em", textTransform: "uppercase",
                  color: "rgba(251,251,244,0.18)", fontFamily: "monospace",
                }}>— {tag}</span>
              ))}
            </div>

            {/* Project list */}
            <div style={{ display: "flex", flexDirection: "column", gap: "0.6rem" }}>
              {PROJECTS.map((p) => (
                <div key={p.id} style={{ display: "flex", alignItems: "center", gap: "0.875rem", padding: "0.5rem 0", borderBottom: "1px solid rgba(251,251,244,0.05)" }}>
                  <span style={{ fontSize: "0.6rem", fontFamily: "monospace", color: p.accentColor, opacity: 0.8, minWidth: "1.5rem" }}>{p.number}</span>
                  <span style={{ fontSize: "clamp(0.78rem, 1vw, 0.9rem)", color: "rgba(251,251,244,0.55)", fontWeight: 500, flex: 1 }}>{p.title}</span>
                  <span style={{ fontSize: "0.6rem", color: "rgba(251,251,244,0.2)", letterSpacing: "0.1em" }}>{p.tags[0]}</span>
                </div>
              ))}
              {/* Placeholder row */}
              <div style={{ display: "flex", alignItems: "center", gap: "0.875rem", padding: "0.5rem 0" }}>
                <span style={{ fontSize: "0.6rem", fontFamily: "monospace", color: "rgba(251,251,244,0.15)", minWidth: "1.5rem" }}>02</span>
                <span style={{ fontSize: "clamp(0.78rem, 1vw, 0.9rem)", color: "rgba(251,251,244,0.18)", fontStyle: "italic" }}>Dein Projekt?</span>
              </div>

            </div>
          </div>
        </div>

        {/* ── Tiles 1 & 2: Real projects with image ────────── */}
        {PROJECTS.map((project, i) => {
          const isHovered = hoveredIndex === i + 1;
          return (
            <a
              key={project.id}
              href={project.href}
              target="_blank"
              rel="noopener noreferrer"
              ref={(el) => { cardRefs.current[i + 1] = el as HTMLDivElement | null; }}
              className="relative h-full flex-shrink-0 overflow-hidden border-r border-cream/[0.06]"
              style={{ width: `${DEFAULT_W}%`, minWidth: 0, willChange: "width", cursor: "none", display: "block", textDecoration: "none" }}
              onMouseEnter={() => { setCursorMode("view-project"); setHoveredIndex(i + 1); }}
            >
              {/* Full-bleed atmospheric background photo */}
              <img
                src={project.bgImage}
                alt=""
                aria-hidden
                style={{
                  position: "absolute", inset: 0, width: "100%", height: "100%",
                  objectFit: "cover", objectPosition: "center",
                  transform: isHovered ? "scale(1.06)" : "scale(1.0)",
                  transition: "transform 0.9s cubic-bezier(0.25,0.46,0.45,0.94)",
                }}
              />

              {/* Dark gradient overlay */}
              <div className="absolute inset-0" style={{
                background: isHovered
                  ? "linear-gradient(to top, rgba(0,0,0,0.82) 0%, rgba(0,0,0,0.45) 45%, rgba(0,0,0,0.18) 100%)"
                  : "linear-gradient(to top, rgba(0,0,0,0.72) 0%, rgba(0,0,0,0.35) 45%, rgba(0,0,0,0.12) 100%)",
                transition: "background 0.5s ease",
              }} />

              {/* Accent top line */}
              <div className="absolute top-0 left-0 right-0 h-px" style={{
                background: `linear-gradient(90deg, transparent, ${project.accentColor}90, transparent)`,
                opacity: isHovered ? 1 : 0, transition: "opacity 0.4s ease",
              }} />

              {/* Number top-left */}
              <div className="absolute top-7 left-7" style={{ zIndex: 2 }}>
                <span style={{ fontSize: "0.62rem", fontFamily: "monospace", letterSpacing: "0.2em",
                  color: "rgba(251,251,244,0.55)", textShadow: "0 1px 6px rgba(0,0,0,0.9)" }}>
                  {project.number}
                </span>
              </div>

              {/* Browser mockup — top-right, visible on hover */}
              <div className="absolute top-7 right-7" style={{
                zIndex: 2, width: "min(260px, 42%)",
                opacity: isHovered ? 1 : 0,
                transform: isHovered ? "translateY(0)" : "translateY(10px)",
                transition: "opacity 0.45s ease, transform 0.45s ease",
              }}>
                <div style={{
                  borderRadius: 7, overflow: "hidden",
                  boxShadow: "0 12px 40px rgba(0,0,0,0.75), 0 0 0 1px rgba(255,255,255,0.1)",
                }}>
                  <div style={{ background: "#1c1c1c", borderBottom: "1px solid #2a2a2a", padding: "0 8px", height: 22, display: "flex", alignItems: "center", gap: 4 }}>
                    {["#ff5f57", "#ffbd2e", "#28c840"].map((c) => (
                      <span key={c} style={{ width: 7, height: 7, borderRadius: "50%", background: c, display: "inline-block", flexShrink: 0 }} />
                    ))}
                    <div style={{ flex: 1, margin: "0 6px", background: "#111", borderRadius: 3, height: 13, display: "flex", alignItems: "center", justifyContent: "center" }}>
                      <span style={{ fontSize: "0.52rem", color: "rgba(251,251,244,0.25)", letterSpacing: "0.03em" }}>{project.href?.replace("https://", "")}</span>
                    </div>
                  </div>
                  <img src={project.image} alt={project.title}
                    style={{ width: "100%", height: 130, objectFit: "cover", objectPosition: "top", display: "block" }} />
                </div>
              </div>

              {/* Bottom info */}
              <div className="absolute bottom-0 left-0 right-0 p-7 md:p-8" style={{ zIndex: 2 }}>
                <div style={{
                  display: "flex", flexWrap: "wrap", gap: "0.4rem", marginBottom: "0.65rem",
                  opacity: isHovered ? 1 : 0,
                  transform: isHovered ? "translateY(0)" : "translateY(8px)",
                  transition: "opacity 0.4s ease, transform 0.4s ease",
                }}>
                  {project.tags.map((tag) => (
                    <span key={tag} style={{
                      fontSize: "0.6rem", fontWeight: 600, letterSpacing: "0.1em", textTransform: "uppercase",
                      color: "rgba(251,251,244,0.75)", background: "rgba(0,0,0,0.45)", backdropFilter: "blur(6px)",
                      border: "1px solid rgba(251,251,244,0.15)", padding: "0.22rem 0.55rem", borderRadius: "2rem",
                    }}>{tag}</span>
                  ))}
                </div>
                <h3 style={{
                  fontSize: "1.85rem", fontWeight: 800, lineHeight: 1.1, letterSpacing: "-0.03em",
                  color: "#fbfbf4", marginBottom: "0.35rem",
                  transform: isHovered ? "translateY(0)" : "translateY(4px)",
                  transition: "transform 0.4s ease",
                  textShadow: "0 2px 16px rgba(0,0,0,0.7)",
                }}>
                  {project.title}
                </h3>
                <p style={{
                  fontSize: "0.8rem", color: "rgba(251,251,244,0.6)", lineHeight: 1.5,
                  opacity: isHovered ? 1 : 0,
                  transform: isHovered ? "translateY(0)" : "translateY(4px)",
                  transition: "opacity 0.4s ease 0.06s, transform 0.4s ease 0.06s",
                  maxWidth: "280px",
                }}>
                  {project.subtitle}
                </p>
              </div>
            </a>
          );
        })}

        {/* ── Tile 2: CTA ──────────────────────────────────── */}
        <div
          ref={(el) => { cardRefs.current[2] = el; }}
          className="relative h-full flex-shrink-0 overflow-hidden"
          style={{ width: `${DEFAULT_W}%`, minWidth: 0, willChange: "width", background: "#080808" }}
          onMouseEnter={() => setHoveredIndex(2)}
        >
          <div className="absolute inset-0 pointer-events-none" style={{
            background: "radial-gradient(ellipse 80% 60% at 70% 80%, rgba(173,43,238,0.12) 0%, transparent 65%)",
            opacity: hoveredIndex === 2 ? 1 : 0.4, transition: "opacity 0.5s ease",
          }} />
          <div className="absolute top-0 left-0 right-0 h-px" style={{
            background: "linear-gradient(90deg, transparent, rgba(173,43,238,0.5), rgba(96,165,250,0.5), transparent)",
            opacity: hoveredIndex === 2 ? 1 : 0, transition: "opacity 0.4s ease",
          }} />

          <div className="absolute inset-0 flex flex-col justify-between p-8 md:p-10">
            <div style={{
              display: "inline-flex", alignItems: "center", gap: "0.4rem",
              background: "rgba(173,43,238,0.1)", border: "1px solid rgba(173,43,238,0.25)",
              borderRadius: "2rem", padding: "0.3rem 0.75rem", width: "fit-content",
            }}>
              <span style={{ width: 5, height: 5, borderRadius: "50%", background: "#ad2bee", display: "inline-block" }} />
              <span style={{ fontSize: "0.62rem", fontWeight: 600, letterSpacing: "0.15em", textTransform: "uppercase", color: "#ad2bee" }}>
                Nächstes Projekt
              </span>
            </div>

            <div>
              <p style={{ fontSize: "0.65rem", color: "rgba(251,251,244,0.3)", letterSpacing: "0.2em", textTransform: "uppercase", marginBottom: "1rem" }}>
                Zusammenarbeiten
              </p>
              <h3 style={{ fontSize: "1.35rem", fontWeight: 800, lineHeight: 1.2, letterSpacing: "-0.02em", color: "#fbfbf4", marginBottom: "0.75rem" }}>
                Hier könnte dein Projekt stehen.
              </h3>
              <p style={{ fontSize: "0.78rem", color: "rgba(251,251,244,0.38)", lineHeight: 1.7 }}>
                Lass uns gemeinsam etwas Außergewöhnliches schaffen.
              </p>
            </div>

            <a
              href="#kontakt"
              style={{
                display: "inline-flex", alignItems: "center", gap: "0.6rem",
                background: "linear-gradient(135deg, #60a5fa, #ad2bee)",
                color: "#fbfbf4", textDecoration: "none",
                borderRadius: "0.75rem", padding: "0.875rem 1.5rem",
                fontSize: "0.75rem", fontWeight: 700, letterSpacing: "0.1em", textTransform: "uppercase",
                width: "fit-content",
                opacity: hoveredIndex === 2 ? 1 : 0.65,
                transition: "opacity 0.35s ease",
              }}
            >
              Gespräch starten
              <svg width="11" height="11" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
                <path d="M7 17 17 7M7 7h10v10"/>
              </svg>
            </a>
          </div>
        </div>
      </div>
    </section>
  </div>
</>
  );
}
