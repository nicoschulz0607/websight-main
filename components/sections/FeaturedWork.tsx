"use client";

import { useEffect, useRef, useState } from "react";
import { gsap } from "@/lib/gsap";
import { useCursor } from "@/components/providers/CursorContext";
import { PROJECTS } from "@/lib/constants";

const TOTAL = 4;
const DEFAULT_W = 100 / TOTAL;
const EXPANDED_W = 44;
const COLLAPSED_W = (100 - EXPANDED_W) / (TOTAL - 1);

// Free Pexels images — dark/moody design agency aesthetic
const PROJECT_IMAGES = [
  "https://images.pexels.com/photos/1779487/pexels-photo-1779487.jpeg?auto=compress&cs=tinysrgb&w=1200&h=900&dpr=1",
  "https://images.pexels.com/photos/1779487/pexels-photo-1779487.jpeg?auto=compress&cs=tinysrgb&w=1200&h=900&dpr=1",
];

export default function FeaturedWork() {
  const [hoveredIndex, setHoveredIndex] = useState<number | null>(null);
  const cardRefs = useRef<(HTMLDivElement | null)[]>([]);
  const { setCursorMode } = useCursor();
  const tweens = useRef<gsap.core.Tween[]>([]);

  useEffect(() => {
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
    <section id="work">
      <div
        className="flex w-full overflow-hidden"
        style={{ height: "70vh" }}
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
              <div style={{ display: "flex", alignItems: "center", gap: "0.5rem", marginBottom: "1.5rem" }}>
                <span style={{ width: 5, height: 5, borderRadius: "50%", background: "#60a5fa", display: "inline-block" }} />
                <span style={{ fontSize: "0.62rem", letterSpacing: "0.25em", textTransform: "uppercase", color: "rgba(251,251,244,0.35)" }}>
                  Ausgewählte Arbeiten
                </span>
              </div>
              <h2 style={{ fontSize: "clamp(1.5rem, 2.5vw, 2.6rem)", fontWeight: 800, lineHeight: 1.1, letterSpacing: "-0.03em", color: "#fbfbf4" }}>
                Unsere{" "}
                <span style={{
                  background: "linear-gradient(135deg, #60a5fa 0%, #8b6ff7 50%, #ad2bee 100%)",
                  WebkitBackgroundClip: "text", WebkitTextFillColor: "transparent", backgroundClip: "text",
                }}>Projekte</span>
              </h2>
              <p style={{ marginTop: "0.875rem", fontSize: "clamp(0.78rem, 0.9vw, 0.9rem)", color: "rgba(251,251,244,0.38)", lineHeight: 1.7, maxWidth: "230px" }}>
                Design ohne Kompromisse. Jedes Projekt eine neue Geschichte — durchdacht, präzise, wirkungsvoll.
              </p>
            </div>

            {/* Stats row */}
            <div style={{ display: "flex", gap: "1.5rem" }}>
              {[["02", "Projekte"], ["100%", "Hingabe"]].map(([num, label]) => (
                <div key={label}>
                  <div style={{ fontSize: "clamp(1.2rem, 2vw, 1.8rem)", fontWeight: 800, letterSpacing: "-0.03em",
                    background: "linear-gradient(135deg, #fbfbf4, rgba(251,251,244,0.5))",
                    WebkitBackgroundClip: "text", WebkitTextFillColor: "transparent", backgroundClip: "text",
                  }}>{num}</div>
                  <div style={{ fontSize: "0.65rem", letterSpacing: "0.15em", textTransform: "uppercase", color: "rgba(251,251,244,0.25)", marginTop: "0.1rem" }}>{label}</div>
                </div>
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
                <span style={{ fontSize: "0.6rem", fontFamily: "monospace", color: "rgba(251,251,244,0.15)", minWidth: "1.5rem" }}>03</span>
                <span style={{ fontSize: "clamp(0.78rem, 1vw, 0.9rem)", color: "rgba(251,251,244,0.18)", fontStyle: "italic" }}>Dein Projekt?</span>
              </div>

              {/* All projects link */}
              <a href="#" style={{ display: "flex", alignItems: "center", gap: "0.5rem", paddingTop: "0.75rem", textDecoration: "none",
                color: "rgba(251,251,244,0.35)", fontSize: "0.75rem", letterSpacing: "0.1em", textTransform: "uppercase",
                transition: "color 0.2s",
              }}
                onMouseEnter={(e) => (e.currentTarget.style.color = "rgba(251,251,244,0.8)")}
                onMouseLeave={(e) => (e.currentTarget.style.color = "rgba(251,251,244,0.35)")}
              >
                Alle Projekte
                <svg width="10" height="10" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
                  <path d="M7 17 17 7M7 7h10v10"/>
                </svg>
              </a>
            </div>
          </div>
        </div>

        {/* ── Tiles 1 & 2: Real projects with image ────────── */}
        {PROJECTS.map((project, i) => {
          const isHovered = hoveredIndex === i + 1;
          return (
            <div
              key={project.id}
              ref={(el) => { cardRefs.current[i + 1] = el; }}
              className="relative h-full flex-shrink-0 overflow-hidden border-r border-cream/[0.06]"
              style={{ width: `${DEFAULT_W}%`, minWidth: 0, willChange: "width", background: "#0a0a0a", cursor: "none" }}
              onMouseEnter={() => { setCursorMode("view-project"); setHoveredIndex(i + 1); }}
            >
              {/* Full-bleed image */}
              <img
                src={PROJECT_IMAGES[i]}
                alt={project.title}
                style={{
                  position: "absolute", inset: 0, width: "100%", height: "100%",
                  objectFit: "cover", objectPosition: "center",
                  transform: isHovered ? "scale(1.07)" : "scale(1.0)",
                  transition: "transform 0.75s cubic-bezier(0.25, 0.46, 0.45, 0.94)",
                }}
              />

              {/* Dark overlay — stronger on hover */}
              <div className="absolute inset-0" style={{
                background: isHovered
                  ? "linear-gradient(to top, rgba(0,0,0,0.85) 0%, rgba(0,0,0,0.3) 50%, rgba(0,0,0,0.15) 100%)"
                  : "linear-gradient(to top, rgba(0,0,0,0.7) 0%, rgba(0,0,0,0.15) 60%, rgba(0,0,0,0.05) 100%)",
                transition: "background 0.45s ease",
              }} />

              {/* Accent top line */}
              <div className="absolute top-0 left-0 right-0 h-px" style={{
                background: `linear-gradient(90deg, transparent, ${project.accentColor}70, transparent)`,
                opacity: isHovered ? 1 : 0, transition: "opacity 0.4s ease",
              }} />

              {/* Number top-left */}
              <div className="absolute top-7 left-7">
                <span style={{ fontSize: "0.62rem", fontFamily: "monospace", letterSpacing: "0.2em",
                  color: "rgba(251,251,244,0.5)", textShadow: "0 1px 4px rgba(0,0,0,0.8)" }}>
                  {project.number}
                </span>
              </div>

              {/* Arrow top-right */}
              <div className="absolute top-7 right-7" style={{
                opacity: isHovered ? 1 : 0, transition: "opacity 0.3s ease",
                fontSize: "1rem", color: "#fbfbf4", textShadow: "0 1px 4px rgba(0,0,0,0.8)",
              }}>↗</div>

              {/* Bottom overlay content */}
              <div className="absolute bottom-0 left-0 right-0 p-7 md:p-8">
                {/* Tags — slide up on hover */}
                <div style={{
                  display: "flex", flexWrap: "wrap", gap: "0.4rem", marginBottom: "0.75rem",
                  transform: isHovered ? "translateY(0)" : "translateY(8px)",
                  opacity: isHovered ? 1 : 0,
                  transition: "transform 0.4s ease, opacity 0.4s ease",
                }}>
                  {project.tags.map((tag) => (
                    <span key={tag} style={{
                      fontSize: "0.65rem", fontWeight: 600, letterSpacing: "0.1em",
                      textTransform: "uppercase", color: "rgba(251,251,244,0.7)",
                      background: "rgba(0,0,0,0.4)", backdropFilter: "blur(4px)",
                      border: "1px solid rgba(251,251,244,0.12)",
                      padding: "0.25rem 0.625rem", borderRadius: "2rem",
                    }}>{tag}</span>
                  ))}
                </div>

                {/* Title — always visible, shifts up on hover */}
                <h3 style={{
                  fontSize: "clamp(1rem, 2vw, 1.75rem)", fontWeight: 700, lineHeight: 1.15,
                  color: "#fbfbf4", marginBottom: "0.5rem",
                  transform: isHovered ? "translateY(0)" : "translateY(4px)",
                  transition: "transform 0.4s ease",
                  textShadow: "0 2px 12px rgba(0,0,0,0.6)",
                }}>
                  {project.title}
                </h3>

                {/* Subtitle — only on hover */}
                <p style={{
                  fontSize: "0.8rem", color: "rgba(251,251,244,0.55)", lineHeight: 1.5,
                  transform: isHovered ? "translateY(0)" : "translateY(6px)",
                  opacity: isHovered ? 1 : 0,
                  transition: "transform 0.4s ease 0.05s, opacity 0.4s ease 0.05s",
                  maxWidth: "280px",
                }}>
                  {project.subtitle}
                </p>
              </div>
            </div>
          );
        })}

        {/* ── Tile 3: CTA ──────────────────────────────────── */}
        <div
          ref={(el) => { cardRefs.current[3] = el; }}
          className="relative h-full flex-shrink-0 overflow-hidden"
          style={{ width: `${DEFAULT_W}%`, minWidth: 0, willChange: "width", background: "#080808" }}
          onMouseEnter={() => setHoveredIndex(3)}
        >
          <div className="absolute inset-0 pointer-events-none" style={{
            background: "radial-gradient(ellipse 80% 60% at 70% 80%, rgba(173,43,238,0.12) 0%, transparent 65%)",
            opacity: hoveredIndex === 3 ? 1 : 0.4, transition: "opacity 0.5s ease",
          }} />
          <div className="absolute top-0 left-0 right-0 h-px" style={{
            background: "linear-gradient(90deg, transparent, rgba(173,43,238,0.5), rgba(96,165,250,0.5), transparent)",
            opacity: hoveredIndex === 3 ? 1 : 0, transition: "opacity 0.4s ease",
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
              <h3 style={{ fontSize: "clamp(1.2rem, 2vw, 1.9rem)", fontWeight: 800, lineHeight: 1.15, letterSpacing: "-0.02em", color: "#fbfbf4", marginBottom: "0.875rem" }}>
                Hier könnte dein Projekt stehen.
              </h3>
              <p style={{ fontSize: "clamp(0.78rem, 0.85vw, 0.875rem)", color: "rgba(251,251,244,0.38)", lineHeight: 1.7, maxWidth: "220px" }}>
                Lass uns gemeinsam etwas Außergewöhnliches schaffen — von der Idee bis zum fertigen Produkt.
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
                opacity: hoveredIndex === 3 ? 1 : 0.65,
                transform: hoveredIndex === 3 ? "translateY(0)" : "translateY(6px)",
                transition: "opacity 0.35s ease, transform 0.35s ease",
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
  );
}
