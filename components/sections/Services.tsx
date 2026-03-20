"use client";

import { useEffect, useRef, useState } from "react";
import { gsap } from "@/lib/gsap";
import { SERVICES } from "@/lib/constants";

export default function Services() {
  const [hoveredIndex, setHoveredIndex] = useState<number | null>(null);
  const cardRefs = useRef<(HTMLDivElement | null)[]>([]);
  const descRefs = useRef<(HTMLParagraphElement | null)[]>([]);
  const imgRefs  = useRef<(HTMLDivElement | null)[]>([]);
  const tweens   = useRef<gsap.core.Tween[]>([]);

  useEffect(() => {
    // Initial state: all images slightly zoomed (collapsed look)
    gsap.set(imgRefs.current.filter(Boolean), { scale: 1.08 });
  }, []);

  useEffect(() => {
    tweens.current.forEach((t) => t.kill());
    tweens.current = [];

    const total = SERVICES.length; // 4

    if (hoveredIndex === null) {
      cardRefs.current.forEach((card, i) => {
        if (!card) return;
        tweens.current.push(
          gsap.to(card, { height: `${100 / total}%`, duration: 0.65, ease: "power2.out" })
        );
        tweens.current.push(
          gsap.to(descRefs.current[i], { autoAlpha: 0, duration: 0.2 })
        );
        tweens.current.push(
          gsap.to(imgRefs.current[i], { scale: 1.08, duration: 0.65, ease: "power2.out" })
        );
      });
    } else {
      const expandedH  = 55;
      const collapsedH = (100 - expandedH) / (total - 1);

      cardRefs.current.forEach((card, i) => {
        if (!card) return;
        const isActive = i === hoveredIndex;
        tweens.current.push(
          gsap.to(card, {
            height: `${isActive ? expandedH : collapsedH}%`,
            duration: 0.65,
            ease: "power2.out",
          })
        );
        tweens.current.push(
          gsap.to(descRefs.current[i], {
            autoAlpha: isActive ? 1 : 0,
            duration: isActive ? 0.35 : 0.2,
          })
        );
        tweens.current.push(
          gsap.to(imgRefs.current[i], {
            scale: isActive ? 1 : 1.08,
            duration: 0.65,
            ease: "power2.out",
          })
        );
      });
    }
  }, [hoveredIndex]);

  return (
    <section id="services" className="py-28 px-8 md:px-16 lg:px-24">
      <div className="max-w-7xl mx-auto">

        {/* ── Header ───────────────────────────────────────────────────── */}
        <div className="mb-12">
          <p className="text-cream/30 text-xs tracking-widest uppercase mb-3">
            Was wir machen
          </p>
          <h2
            className="text-cream font-bold"
            style={{
              fontSize: "clamp(2.4rem, 4.5vw, 4.5rem)",
              letterSpacing: "-0.03em",
              lineHeight: 1,
            }}
          >
            Unsere{" "}
            <span
              style={{
                background:
                  "linear-gradient(135deg, #60a5fa 0%, #8b6ff7 50%, #ad2bee 100%)",
                WebkitBackgroundClip: "text",
                WebkitTextFillColor: "transparent",
                backgroundClip: "text",
              }}
            >
              Leistungen
            </span>
          </h2>
        </div>

        {/* ── Card container ────────────────────────────────────────────── */}
        <div
          className="flex flex-col w-full overflow-hidden"
          style={{ height: "70vh" }}
          onMouseLeave={() => setHoveredIndex(null)}
        >
          {SERVICES.map((service, i) => (
            <div
              key={i}
              ref={(el) => { cardRefs.current[i] = el; }}
              className="flex-shrink-0"
              style={{
                height: `${100 / SERVICES.length}%`,
                minHeight: 0,
                willChange: "height",
                display: "flex",
                flexDirection: "row",
                overflow: "hidden",       /* clips image when collapsed */
                borderTop: "1px solid rgba(251,251,244,0.08)",
                cursor: "none",
              }}
              onMouseEnter={() => setHoveredIndex(i)}
            >
              {/* Top accent line on hover */}
              <div
                aria-hidden
                style={{
                  position: "absolute",
                  top: 0, left: 0, right: 0,
                  height: "1px",
                  background: `linear-gradient(90deg, transparent, ${service.accentColor}70, transparent)`,
                  opacity: hoveredIndex === i ? 1 : 0,
                  transition: "opacity 0.4s ease",
                  zIndex: 2,
                }}
              />

              {/* ── Left: image panel ─────────────────────────────────── */}
              <div
                style={{
                  width: "38%",
                  flexShrink: 0,
                  position: "relative",
                  overflow: "hidden",
                }}
              >
                <div
                  ref={(el) => { imgRefs.current[i] = el; }}
                  style={{
                    width: "100%",
                    height: "100%",
                    transformOrigin: "center center",
                    position: "relative",
                    background: "#0a0a0a",
                  }}
                >
                  {/* Main radial glow — stronger on hover */}
                  <div style={{
                    position: "absolute", inset: 0,
                    background: `radial-gradient(ellipse 90% 80% at 40% 50%, ${service.accentColor}35 0%, transparent 65%)`,
                    opacity: hoveredIndex === i ? 1 : 0.5,
                    transition: "opacity 0.5s ease",
                  }} />
                  {/* Bottom glow */}
                  <div style={{
                    position: "absolute", bottom: 0, left: 0, right: 0, height: "50%",
                    background: `linear-gradient(to top, ${service.accentColor}20, transparent)`,
                    opacity: hoveredIndex === i ? 1 : 0.3,
                    transition: "opacity 0.5s ease",
                  }} />
                  {/* Subtle grid */}
                  <svg
                    aria-hidden
                    style={{ position: "absolute", inset: 0, width: "100%", height: "100%", opacity: 0.04 }}
                    viewBox="0 0 400 300"
                    preserveAspectRatio="xMidYMid slice"
                  >
                    {[0,1,2,3,4,5].map(n => (
                      <line key={`v${n}`} x1={n*80} y1="0" x2={n*80} y2="300" stroke="#fbfbf4" strokeWidth="0.5"/>
                    ))}
                    {[0,1,2,3,4].map(n => (
                      <line key={`h${n}`} x1="0" y1={n*75} x2="400" y2={n*75} stroke="#fbfbf4" strokeWidth="0.5"/>
                    ))}
                  </svg>
                  {/* Large number watermark */}
                  <span
                    aria-hidden
                    style={{
                      position: "absolute", bottom: "0.6rem", right: "1rem",
                      fontSize: "clamp(3.5rem, 8vw, 8rem)", fontWeight: 800,
                      color: service.accentColor,
                      opacity: hoveredIndex === i ? 0.18 : 0.06,
                      transition: "opacity 0.4s ease",
                      lineHeight: 1, letterSpacing: "-0.06em", userSelect: "none",
                    }}
                  >
                    {String(i + 1).padStart(2, "0")}
                  </span>
                  {/* Top-left accent corner */}
                  <div style={{
                    position: "absolute", top: "1rem", left: "1rem",
                    width: 24, height: 24,
                    borderTop: `1.5px solid ${service.accentColor}`,
                    borderLeft: `1.5px solid ${service.accentColor}`,
                    opacity: hoveredIndex === i ? 0.8 : 0.2,
                    transition: "opacity 0.4s ease",
                  }} />
                </div>
              </div>

              {/* ── Right: content panel ──────────────────────────────── */}
              <div
                style={{
                  flex: 1,
                  minWidth: 0,
                  display: "flex",
                  flexDirection: "column",
                  justifyContent: "center",
                  padding: "1.5rem 2.5rem",
                  borderLeft: `1px solid rgba(251,251,244,0.06)`,
                  position: "relative",
                }}
              >
                {/* Title row — always visible, always centered */}
                <div
                  style={{
                    display: "flex",
                    alignItems: "center",
                    justifyContent: "space-between",
                  }}
                >
                  <div style={{ display: "flex", alignItems: "center", gap: "1rem" }}>
                    <span
                      style={{
                        width: 7, height: 7, borderRadius: "50%",
                        flexShrink: 0,
                        background: service.accentColor,
                        opacity: hoveredIndex === i ? 1 : 0.25,
                        transition: "opacity 0.3s ease",
                      }}
                    />
                    <h3
                      style={{
                        fontSize: "clamp(1.1rem, 1.9vw, 1.55rem)",
                        fontWeight: 500,
                        letterSpacing: "-0.02em",
                        color: hoveredIndex === i ? "#fbfbf4" : "rgba(251,251,244,0.45)",
                        transition: "color 0.3s ease",
                      }}
                    >
                      {service.title}
                    </h3>
                  </div>
                  <div style={{ display: "flex", alignItems: "center", gap: "0.75rem", flexShrink: 0, marginLeft: "1rem" }}>
                    <span
                      style={{
                        color: service.accentColor,
                        fontFamily: "monospace",
                        fontSize: "0.7rem",
                        opacity: hoveredIndex === i ? 0.6 : 0.18,
                        transition: "opacity 0.3s ease",
                      }}
                    >
                      0{i + 1}
                    </span>
                    <span
                      style={{
                        color: "rgba(251,251,244,0.4)",
                        fontSize: "1rem",
                        opacity: hoveredIndex === i ? 1 : 0,
                        transition: "opacity 0.3s ease",
                      }}
                    >
                      ↗
                    </span>
                  </div>
                </div>

                {/* Description — absolute, starts below the centered title */}
                <p
                  ref={(el) => { descRefs.current[i] = el; }}
                  style={{
                    position: "absolute",
                    top: "calc(50% + 2rem)",
                    left: "2.5rem",
                    right: "2.5rem",
                    color: "rgba(251,251,244,0.5)",
                    fontSize: "clamp(0.875rem, 1.1vw, 1rem)",
                    lineHeight: 1.75,
                    maxWidth: "520px",
                    opacity: 0,
                    visibility: "hidden",
                  }}
                >
                  {service.description}
                </p>
              </div>
            </div>
          ))}

          {/* Bottom border */}
          <div style={{ borderTop: "1px solid rgba(251,251,244,0.08)" }} />
        </div>

      </div>
    </section>
  );
}
