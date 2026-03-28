"use client";

import { useEffect, useRef, useState } from "react";
import { gsap } from "@/lib/gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { FAQ_ITEMS } from "@/lib/constants";

const ACCENTS = ["#60a5fa", "#8b6ff7", "#ad2bee", "#60a5fa", "#8b6ff7", "#ad2bee"];

export default function FAQ() {
  const [openIndex, setOpenIndex] = useState<number | null>(null);
  const sectionRef      = useRef<HTMLElement>(null);
  const containerRef    = useRef<HTMLDivElement>(null);
  const itemRefs        = useRef<(HTMLDivElement | null)[]>([]);
  const answerRefs      = useRef<(HTMLDivElement | null)[]>([]);
  const answerInnerRefs = useRef<(HTMLDivElement | null)[]>([]);
  const numberRefs      = useRef<(HTMLSpanElement | null)[]>([]);
  const barRefs         = useRef<(HTMLSpanElement | null)[]>([]);

  // Scroll reveal
  useEffect(() => {
    gsap.registerPlugin(ScrollTrigger);
    const ctx = gsap.context(() => {
      gsap.fromTo(
        itemRefs.current,
        { autoAlpha: 0, y: 40 },
        {
          autoAlpha: 1, y: 0,
          duration: 0.7, ease: "power3.out",
          stagger: 0.08,
          scrollTrigger: { trigger: sectionRef.current, start: "top 75%", once: true },
        }
      );
    }, sectionRef);
    return () => ctx.revert();
  }, []);

  // Open/close animation
  useEffect(() => {
    FAQ_ITEMS.forEach((_, i) => {
      const wrap      = answerRefs.current[i];
      const inner     = answerInnerRefs.current[i];
      const number    = numberRefs.current[i];
      const bar       = barRefs.current[i];
      if (!wrap || !inner) return;

      const isOpen = openIndex === i;
      gsap.to(wrap,   { height: isOpen ? inner.scrollHeight : 0, duration: 0.55, ease: "power3.out" });
      gsap.to(number, { opacity: isOpen ? 0.85 : 0.28, duration: 0.4 });
      // Vertical bar of "+" disappears on open
      if (bar) gsap.to(bar, { scaleY: isOpen ? 0 : 1, duration: 0.35, ease: "power2.inOut" });
    });
  }, [openIndex]);

  // Original proximity border glow
  useEffect(() => {
    const container = containerRef.current;
    if (!container) return;

    const handleMouseMove = (e: MouseEvent) => {
      const cRect  = container.getBoundingClientRect();
      const mouseY = e.clientY - cRect.top;
      const mouseX = e.clientX - cRect.left;

      container.style.background = `radial-gradient(circle 220px at ${mouseX}px ${mouseY}px, rgba(173,43,238,0.06) 0%, transparent 70%)`;

      itemRefs.current.forEach((item) => {
        if (!item) return;
        const r       = item.getBoundingClientRect();
        const topY    = r.top    - cRect.top;
        const bottomY = r.bottom - cRect.top;
        const localX  = mouseX - (r.left - cRect.left);
        const isInside = mouseY > topY && mouseY < bottomY;

        if (isInside) {
          item.style.background = [
            `radial-gradient(ellipse 280px 2px at ${localX}px 0.5px, rgba(173,43,238,0.75) 0%, transparent 100%)`,
            `radial-gradient(ellipse 280px 2px at ${localX}px calc(100% - 0.5px), rgba(173,43,238,0.75) 0%, transparent 100%)`,
          ].join(", ");
          item.style.borderTopColor = "rgba(251,251,244,0.02)";
        } else {
          const distY    = Math.min(Math.abs(mouseY - topY), Math.abs(mouseY - bottomY));
          const strength = Math.max(0, 1 - distY / 60);
          if (strength > 0.01) {
            item.style.background     = `radial-gradient(ellipse 300px 2px at ${localX}px 0.5px, rgba(173,43,238,${(strength * 0.9).toFixed(3)}) 0%, transparent 100%)`;
            item.style.borderTopColor = `rgba(251,251,244,${(0.08 * (1 - strength * 0.8)).toFixed(3)})`;
          } else {
            item.style.background     = "none";
            item.style.borderTopColor = "rgba(251,251,244,0.08)";
          }
        }
      });
    };

    const handleMouseLeave = () => {
      container.style.background = "none";
      itemRefs.current.forEach((item) => {
        if (!item) return;
        item.style.background     = "none";
        item.style.borderTopColor = "rgba(251,251,244,0.08)";
      });
    };

    container.addEventListener("mousemove", handleMouseMove, { passive: true });
    container.addEventListener("mouseleave", handleMouseLeave, { passive: true });
    return () => {
      container.removeEventListener("mousemove", handleMouseMove);
      container.removeEventListener("mouseleave", handleMouseLeave);
    };
  }, []);

  return (
    <section
      ref={sectionRef}
      id="faq"
      style={{
        padding: "clamp(7rem, 12vw, 12rem) clamp(2rem, 9vw, 8.5rem)",
        position: "relative",
      }}
    >
      {/* Header */}
      <div style={{ marginBottom: "5rem" }}>
        <p style={{
          fontFamily: "monospace",
          fontSize: "0.65rem",
          letterSpacing: "0.25em",
          textTransform: "uppercase",
          color: "rgba(251,251,244,0.25)",
          marginBottom: "1.25rem",
        }}>
          Häufige Fragen
        </p>
        <h2 style={{
          fontSize: "clamp(3.5rem, 6vw, 5.5rem)",
          fontWeight: 700,
          lineHeight: 1,
          letterSpacing: "-0.03em",
          color: "#fbfbf4",
        }}>
          Häufig gestellte{" "}
          <span style={{
            background: "linear-gradient(135deg, #60a5fa 0%, #8b6ff7 50%, #ad2bee 100%)",
            WebkitBackgroundClip: "text",
            WebkitTextFillColor: "transparent",
            backgroundClip: "text",
          }}>
            Fragen.
          </span>
        </h2>
      </div>

      {/* Items */}
      <div ref={containerRef} style={{ borderBottom: "1px solid rgba(251,251,244,0.08)" }}>
        {FAQ_ITEMS.map((item, i) => {
          const accent = ACCENTS[i];
          const isOpen = openIndex === i;

          return (
            <div
              key={item.question}
              ref={(el) => { itemRefs.current[i] = el; }}
              onClick={() => setOpenIndex(isOpen ? null : i)}
              style={{
                borderTop: "1px solid rgba(251,251,244,0.08)",
                borderLeft: isOpen ? `2px solid ${accent}` : "2px solid transparent",
                paddingLeft: "clamp(1rem, 3vw, 2.5rem)",
                paddingTop: "2rem",
                paddingBottom: "2rem",
                cursor: "pointer",
                transition: "border-left-color 0.35s ease",
                position: "relative",
              }}
            >
              <div style={{ display: "flex", alignItems: "flex-start", gap: "clamp(1rem, 3vw, 2.5rem)" }}>
                {/* Number */}
                <span
                  ref={(el) => { numberRefs.current[i] = el; }}
                  style={{
                    flexShrink: 0,
                    fontFamily: "monospace",
                    fontSize: "clamp(0.7rem, 1.1vw, 0.9rem)",
                    fontWeight: 700,
                    letterSpacing: "0.08em",
                    color: accent,
                    opacity: 0.28,
                    marginTop: "0.35rem",
                    minWidth: "2rem",
                    userSelect: "none",
                  }}
                >
                  {String(i + 1).padStart(2, "0")}
                </span>

                {/* Content */}
                <div style={{ flex: 1, minWidth: 0 }}>
                  <div style={{ display: "flex", alignItems: "center", justifyContent: "space-between", gap: "1.5rem" }}>
                    <p style={{
                      fontSize: "clamp(1rem, 1.6vw, 1.35rem)",
                      fontWeight: 500,
                      lineHeight: 1.4,
                      color: isOpen ? "#fbfbf4" : "rgba(251,251,244,0.72)",
                      transition: "color 0.3s ease",
                    }}>
                      {item.question}
                    </p>

                    {/* Icon — two lines forming a + that morphs to — */}
                    <div style={{
                      flexShrink: 0,
                      width: 32, height: 32,
                      borderRadius: "50%",
                      border: `1px solid ${isOpen ? accent : "rgba(251,251,244,0.12)"}`,
                      display: "flex", alignItems: "center", justifyContent: "center",
                      position: "relative",
                      transition: "border-color 0.35s ease",
                    }}>
                      {/* Horizontal bar — always visible */}
                      <span style={{
                        position: "absolute",
                        width: 12, height: 1.5,
                        borderRadius: 2,
                        background: isOpen ? accent : "rgba(251,251,244,0.5)",
                        transition: "background 0.35s ease",
                      }} />
                      {/* Vertical bar — disappears on open */}
                      <span
                        ref={(el) => { barRefs.current[i] = el; }}
                        style={{
                          position: "absolute",
                          width: 1.5, height: 12,
                          borderRadius: 2,
                          background: isOpen ? accent : "rgba(251,251,244,0.5)",
                          transition: "background 0.35s ease",
                          transformOrigin: "center",
                        }}
                      />
                    </div>
                  </div>

                  {/* Answer */}
                  <div
                    ref={(el) => { answerRefs.current[i] = el; }}
                    style={{ height: 0, overflow: "hidden" }}
                  >
                    <div ref={(el) => { answerInnerRefs.current[i] = el; }}>
                      <p style={{
                        paddingTop: "1.25rem",
                        paddingBottom: "0.5rem",
                        fontSize: "clamp(1rem, 1.4vw, 1.15rem)",
                        fontWeight: 400,
                        lineHeight: 1.8,
                        color: "rgba(251,251,244,0.45)",
                        maxWidth: "680px",
                      }}>
                        {item.answer}
                      </p>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          );
        })}
      </div>
    </section>
  );
}
