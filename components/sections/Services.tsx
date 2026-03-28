"use client";

import { useEffect, useRef, useState } from "react";
import { gsap } from "@/lib/gsap";
import { SERVICES } from "@/lib/constants";
import ServiceModal from "@/components/ServiceModal";

// Thematisch passende Pexels-Bilder (dunkel, professionell)
const BG_IMAGES = [
  "https://images.pexels.com/photos/574077/pexels-photo-574077.jpeg?auto=compress&cs=tinysrgb&w=1440&h=800&dpr=1",  // Code/Laptop – Webdesign
  "https://images.pexels.com/photos/590022/pexels-photo-590022.jpeg?auto=compress&cs=tinysrgb&w=1440&h=800&dpr=1",  // Analytics-Dashboard – SEO
  "https://images.pexels.com/photos/3861969/pexels-photo-3861969.jpeg?auto=compress&cs=tinysrgb&w=1440&h=800&dpr=1", // Keyboard/Tech – Automatisierung
  "https://images.pexels.com/photos/3182812/pexels-photo-3182812.jpeg?auto=compress&cs=tinysrgb&w=1440&h=800&dpr=1", // Team/Creative – Marke
];

const TRUST_TAGS = [
  ["Blitzschnell", "Rechtssicher", "Mobile-First", "React & Next.js"],
  ["Messbar", "Lokal optimiert", "Nachhaltig", "Google-zertifiziert"],
  ["24/7 aktiv", "Vollautomatisch", "ROI-optimiert", "CRM-Ready"],
  ["Einzigartig", "Vertrauensstark", "Markenkonform", "Strategisch"],
];

const EXPANDED_H  = 50;
const COLLAPSED_H = (100 - EXPANDED_H) / (SERVICES.length - 1);
const OVERLAP_PX  = 20; // px each card overlaps the previous

export default function Services() {
  const [hoveredIndex,    setHoveredIndex]    = useState<number | null>(null);
  const [selectedIndex,   setSelectedIndex]   = useState<number | null>(null);
  const [activeCardC,     setActiveCardC]     = useState(0);
  const scrollRefC = useRef<HTMLDivElement>(null);

  const cardRefs    = useRef<(HTMLDivElement | null)[]>([]);
  const imgRefs     = useRef<(HTMLDivElement | null)[]>([]);
  const titleRefs   = useRef<(HTMLHeadingElement | null)[]>([]);
  const contentRefs = useRef<(HTMLDivElement | null)[]>([]);
  const numRefs     = useRef<(HTMLSpanElement | null)[]>([]);
  const tweens      = useRef<gsap.core.Tween[]>([]);

  useEffect(() => {
    if (window.matchMedia("(max-width: 768px)").matches) return;
    tweens.current.forEach((t) => t.kill());
    tweens.current = [];

    if (hoveredIndex === null) {
      cardRefs.current.forEach((card, i) => {
        if (!card) return;
        tweens.current.push(
          gsap.to(card, { height: `${100 / SERVICES.length}%`, duration: 0.7, ease: "power3.out" })
        );
        tweens.current.push(
          gsap.to(imgRefs.current[i], { scale: 1.05, duration: 0.7, ease: "power3.out" })
        );
        tweens.current.push(
          gsap.to(titleRefs.current[i], {
            fontSize: "clamp(1.4rem, 2.2vw, 2rem)", y: 0,
            duration: 0.5, ease: "power2.out",
          })
        );
        tweens.current.push(
          gsap.to(contentRefs.current[i], { autoAlpha: 0, y: 12, duration: 0.25 })
        );
        tweens.current.push(
          gsap.to(numRefs.current[i], { opacity: 0.35, duration: 0.3 })
        );
      });
    } else {
      cardRefs.current.forEach((card, i) => {
        if (!card) return;
        const isActive = i === hoveredIndex;

        tweens.current.push(
          gsap.to(card, {
            height: `${isActive ? EXPANDED_H : COLLAPSED_H}%`,
            duration: 0.7, ease: "power3.out",
          })
        );
        tweens.current.push(
          gsap.to(imgRefs.current[i], {
            scale: isActive ? 1.0 : 1.08,
            duration: 0.7, ease: "power3.out",
          })
        );
        tweens.current.push(
          gsap.to(titleRefs.current[i], {
            fontSize: isActive ? "clamp(3rem, 6vw, 5.5rem)" : "clamp(0.9rem, 1.4vw, 1.2rem)",
            y: isActive ? 0 : 0,
            duration: 0.6, ease: "power3.out",
          })
        );
        tweens.current.push(
          gsap.to(contentRefs.current[i], {
            autoAlpha: isActive ? 1 : 0,
            y: isActive ? 0 : 10,
            duration: isActive ? 0.45 : 0.2,
            delay: isActive ? 0.18 : 0,
          })
        );
        tweens.current.push(
          gsap.to(numRefs.current[i], {
            opacity: isActive ? 0.08 : 0.2,
            duration: 0.4,
          })
        );
      });
    }
  }, [hoveredIndex]);

  const selectedService = selectedIndex !== null ? SERVICES[selectedIndex] : null;

  /* ── Layouts ─────────────────────────────────────── */
  return (
    <>
      {/* ── Mobile layout ── */}
      <div className="block md:hidden">
        <section id="services" style={{ position: "relative" }}>

          {/* Shared header */}
          <div style={{ padding: "4rem 1.5rem 2rem" }}>
            <p style={{ color: "rgba(251,251,244,0.28)", fontSize: "0.65rem", letterSpacing: "0.2em", textTransform: "uppercase", marginBottom: "0.9rem" }}>
              Was wir machen
            </p>
            <h2 style={{ fontSize: "clamp(2.2rem, 8vw, 3.5rem)", fontWeight: 700, letterSpacing: "-0.03em", lineHeight: 1, color: "#fbfbf4" }}>
              Unsere{" "}
              <span style={{ background: "linear-gradient(135deg, #60a5fa 0%, #8b6ff7 50%, #ad2bee 100%)", WebkitBackgroundClip: "text", WebkitTextFillColor: "transparent", backgroundClip: "text" }}>
                Leistungen
              </span>
            </h2>
          </div>

          {/* ── Mobile: Swipe Gallery ── */}
          <div style={{ paddingBottom: "0.5rem" }}>
            <div
              ref={scrollRefC}
              onScroll={() => {
                const el = scrollRefC.current;
                if (!el) return;
                const pct = el.scrollLeft / (el.scrollWidth - el.clientWidth);
                setActiveCardC(Math.round(pct * (SERVICES.length - 1)));
              }}
              style={{ display: "flex", gap: "0.75rem", overflowX: "scroll", scrollSnapType: "x mandatory", padding: "1.5rem 1.25rem 1rem", scrollbarWidth: "none" }}
            >
              {SERVICES.map((service, i) => (
                <div key={i} style={{ minWidth: "78vw", height: "62vh", flexShrink: 0, borderRadius: "16px", position: "relative", overflow: "hidden", scrollSnapAlign: "start" }}>
                  {/* eslint-disable-next-line @next/next/no-img-element */}
                  <img src={BG_IMAGES[i]} alt="" aria-hidden style={{ position: "absolute", inset: 0, width: "100%", height: "100%", objectFit: "cover" }} />
                  <div style={{ position: "absolute", inset: 0, background: "linear-gradient(to top, rgba(0,0,0,0.93) 45%, rgba(0,0,0,0.3) 100%)" }} />
                  <div style={{ position: "absolute", top: "1.25rem", left: "1.25rem", fontSize: "0.6rem", color: service.accentColor, letterSpacing: "0.18em", fontWeight: 700, background: `${service.accentColor}18`, border: `1px solid ${service.accentColor}35`, borderRadius: "100px", padding: "0.2rem 0.6rem" }}>
                    {String(i + 1).padStart(2, "0")} / {String(SERVICES.length).padStart(2, "0")}
                  </div>
                  <div style={{ position: "absolute", bottom: 0, left: 0, right: 0, padding: "0 1.25rem 1.5rem" }}>
                    <h3 style={{ fontSize: "clamp(1.4rem, 6vw, 2rem)", fontWeight: 700, color: "#fbfbf4", letterSpacing: "-0.02em", lineHeight: 1.1, marginBottom: "0.75rem" }}>
                      {service.title}
                    </h3>
                    <p style={{ color: "rgba(251,251,244,0.5)", fontSize: "0.82rem", lineHeight: 1.6, marginBottom: "1rem", overflow: "hidden", maxHeight: "3.2em" }}>
                      {service.description}
                    </p>
                    <button onClick={() => setSelectedIndex(i)} style={{ background: "none", border: "none", cursor: "pointer", color: service.accentColor, fontSize: "0.8rem", fontWeight: 700, letterSpacing: "0.07em", padding: 0, display: "flex", alignItems: "center", gap: "0.3rem" }}>
                      Details →
                    </button>
                  </div>
                </div>
              ))}
            </div>
            {/* Scroll dots */}
            <div style={{ display: "flex", gap: "0.5rem", justifyContent: "center", paddingBottom: "2.5rem" }}>
              {SERVICES.map((service, i) => (
                <div key={i} style={{ height: "0.35rem", borderRadius: "100px", background: activeCardC === i ? service.accentColor : "rgba(251,251,244,0.18)", width: activeCardC === i ? "1.5rem" : "0.35rem", transition: "all 0.3s ease" }} />
              ))}
            </div>
          </div>

        </section>

        <ServiceModal service={selectedService} onClose={() => setSelectedIndex(null)} />
      </div>

      {/* ── Desktop layout ── */}
      <div className="hidden md:block">
        <section id="services-desktop" style={{ position: "relative" }}>

        {/* ── Header ── */}
        <div style={{ padding: "5rem clamp(2rem, 8vw, 8rem) 3rem" }}>
          <p style={{
            color: "rgba(251,251,244,0.28)", fontSize: "0.65rem",
            letterSpacing: "0.2em", textTransform: "uppercase", marginBottom: "0.9rem",
          }}>
            Was wir machen
          </p>
          <h2 style={{
            fontSize: "clamp(2.4rem, 4.5vw, 4.5rem)",
            fontWeight: 700, letterSpacing: "-0.03em", lineHeight: 1, color: "#fbfbf4",
          }}>
            Unsere{" "}
            <span style={{
              background: "linear-gradient(135deg, #60a5fa 0%, #8b6ff7 50%, #ad2bee 100%)",
              WebkitBackgroundClip: "text", WebkitTextFillColor: "transparent", backgroundClip: "text",
            }}>
              Leistungen
            </span>
          </h2>
        </div>

        {/* ── Card stack — full width, overlapping ── */}
        <div
          style={{
            display: "flex", flexDirection: "column",
            height: "86vh",
            // Compensate for overlaps so total visual height = 86vh
          }}
          onMouseLeave={() => setHoveredIndex(null)}
        >
          {SERVICES.map((service, i) => (
            <div
              key={i}
              ref={(el) => { cardRefs.current[i] = el; }}
              style={{
                height: `${100 / SERVICES.length}%`,
                flexShrink: 0, minHeight: 0,
                position: "relative", overflow: "hidden",
                willChange: "height",
                // Overlap: each card covers bottom of previous by OVERLAP_PX
                marginTop: i === 0 ? 0 : `-${OVERLAP_PX}px`,
                // Cards further down stack on top of earlier ones
                zIndex: hoveredIndex === i ? 10 : SERVICES.length + i,
                // Rounded top corners to make overlap visible
                borderRadius: i === 0 ? 0 : "14px 14px 0 0",
                cursor: "pointer",
              }}
              onMouseEnter={() => setHoveredIndex(i)}
              onClick={() => hoveredIndex === i && setSelectedIndex(i)}
            >
              {/* Background image with parallax zoom */}
              <div
                ref={(el) => { imgRefs.current[i] = el; }}
                style={{
                  position: "absolute", inset: 0,
                  backgroundImage: `url(${BG_IMAGES[i]})`,
                  backgroundSize: "cover",
                  backgroundPosition: "center",
                  transform: "scale(1.05)",
                  willChange: "transform",
                }}
              />

              {/* Dark gradient — adjusts on hover */}
              <div style={{
                position: "absolute", inset: 0,
                background: hoveredIndex === i
                  ? "linear-gradient(105deg, rgba(8,8,8,0.93) 38%, rgba(8,8,8,0.55) 100%)"
                  : "linear-gradient(to right, rgba(8,8,8,0.86) 40%, rgba(8,8,8,0.72) 100%)",
                transition: "background 0.55s ease",
              }} />

              {/* Accent radial glow (appears on hover) */}
              <div style={{
                position: "absolute", inset: 0,
                background: `radial-gradient(ellipse 55% 110% at 85% 50%, ${service.accentColor}14, transparent 70%)`,
                opacity: hoveredIndex === i ? 1 : 0,
                transition: "opacity 0.55s ease",
              }} />

              {/* Bottom-right shadow for depth */}
              <div style={{
                position: "absolute", bottom: 0, left: 0, right: 0, height: "40%",
                background: "linear-gradient(to top, rgba(8,8,8,0.5), transparent)",
                pointerEvents: "none",
              }} />

              {/* Giant watermark number */}
              <span
                ref={(el) => { numRefs.current[i] = el; }}
                aria-hidden
                style={{
                  position: "absolute", right: "3%", bottom: "-5%",
                  fontSize: "clamp(8rem, 22vw, 22rem)",
                  fontWeight: 900, lineHeight: 1,
                  color: service.accentColor,
                  opacity: 0.35,
                  letterSpacing: "-0.07em", userSelect: "none", pointerEvents: "none",
                }}
              >
                {String(i + 1).padStart(2, "0")}
              </span>

              {/* ── Foreground content ── */}
              <div style={{
                position: "relative", zIndex: 2, height: "100%",
                display: "flex", flexDirection: "column", justifyContent: "center",
                padding: `${OVERLAP_PX + 12}px clamp(2rem, 8vw, 8rem) 1.5rem`,
              }}>

                {/* Title — GSAP animates fontSize */}
                <h3
                  ref={(el) => { titleRefs.current[i] = el; }}
                  style={{
                    fontSize: "clamp(1.4rem, 2.2vw, 2rem)",
                    fontWeight: 700, letterSpacing: "-0.03em",
                    color: "#fbfbf4", lineHeight: 1, margin: 0,
                  }}
                >
                  {service.title}
                </h3>

                {/* Accent divider — only when expanded */}
                <div style={{
                  width: "2.5rem", height: "2px", borderRadius: "2px",
                  background: `linear-gradient(90deg, ${service.accentColor}, transparent)`,
                  marginTop: "1.5rem",
                  opacity: hoveredIndex === i ? 1 : 0,
                  transition: "opacity 0.4s ease 0.1s",
                }} />

                {/* Expanded content */}
                <div
                  ref={(el) => { contentRefs.current[i] = el; }}
                  style={{ opacity: 0, visibility: "hidden", marginTop: "1.5rem" }}
                >
                  {/* Description */}
                  <p style={{
                    color: "rgba(251,251,244,0.55)",
                    fontSize: "clamp(0.875rem, 1vw, 0.975rem)",
                    lineHeight: 1.85, maxWidth: "480px",
                    marginBottom: "1.75rem",
                  }}>
                    {service.description}
                  </p>

                  {/* Trust tags */}
                  <div style={{ display: "flex", gap: "0.5rem", flexWrap: "wrap", marginBottom: "2rem" }}>
                    {TRUST_TAGS[i].map((tag, j) => (
                      <span key={j} style={{
                        padding: "0.28rem 0.8rem",
                        border: `1px solid ${service.accentColor}38`,
                        borderRadius: "100px",
                        color: service.accentColor,
                        fontSize: "0.65rem", letterSpacing: "0.09em",
                        background: `${service.accentColor}0d`,
                        whiteSpace: "nowrap",
                      }}>
                        {tag}
                      </span>
                    ))}
                  </div>

                  {/* CTA */}
                  <button
                    onClick={(e) => { e.stopPropagation(); setSelectedIndex(i); }}
                    style={{
                      display: "inline-flex", alignItems: "center", gap: "0.5rem",
                      padding: "0.65rem 1.4rem",
                      background: "rgba(251,251,244,0.05)",
                      border: "1px solid rgba(251,251,244,0.18)",
                      color: "#fbfbf4", fontSize: "0.78rem",
                      letterSpacing: "0.07em", cursor: "pointer",
                      borderRadius: "3px",
                      transition: "border-color 0.2s, background 0.2s",
                    }}
                    onMouseEnter={(e) => {
                      e.currentTarget.style.borderColor = service.accentColor;
                      e.currentTarget.style.background = `${service.accentColor}18`;
                    }}
                    onMouseLeave={(e) => {
                      e.currentTarget.style.borderColor = "rgba(251,251,244,0.18)";
                      e.currentTarget.style.background = "rgba(251,251,244,0.05)";
                    }}
                  >
                    Details ansehen →
                  </button>
                </div>
              </div>

              {/* Right accent line (visible on hover) */}
              <div style={{
                position: "absolute", right: 0, top: "15%", bottom: "15%",
                width: "1px",
                background: `linear-gradient(to bottom, transparent, ${service.accentColor}70, transparent)`,
                opacity: hoveredIndex === i ? 1 : 0,
                transition: "opacity 0.4s ease",
              }} />
            </div>
          ))}
        </div>

      </section>

        <ServiceModal
          service={selectedService}
          onClose={() => setSelectedIndex(null)}
        />
      </div>
    </>
  );
}
