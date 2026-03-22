"use client";

import { useEffect, useRef } from "react";
import { gsap } from "@/lib/gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

export default function CTABanner() {
  const sectionRef = useRef<HTMLDivElement>(null);
  const leftRef    = useRef<HTMLDivElement>(null);
  const rightRef   = useRef<HTMLDivElement>(null);

  useEffect(() => {
    gsap.registerPlugin(ScrollTrigger);

    const ctx = gsap.context(() => {
      gsap.fromTo(
        leftRef.current,
        { autoAlpha: 0, y: 30 },
        { autoAlpha: 1, y: 0, duration: 0.9, ease: "power3.out",
          scrollTrigger: { trigger: sectionRef.current, start: "top 75%", once: true } }
      );
      gsap.fromTo(
        rightRef.current,
        { autoAlpha: 0, y: 30 },
        { autoAlpha: 1, y: 0, duration: 0.9, ease: "power3.out", delay: 0.15,
          scrollTrigger: { trigger: sectionRef.current, start: "top 75%", once: true } }
      );
    }, sectionRef);

    return () => ctx.revert();
  }, []);

  return (
    <div
      ref={sectionRef}
      style={{
        position: "relative",
        minHeight: "100vh",
        padding: "clamp(12rem, 22vh, 22rem) clamp(2rem, 8vw, 8rem)",
        borderTop: "1px solid rgba(251,251,244,0.07)",
        borderBottom: "1px solid rgba(251,251,244,0.07)",
        background: "#080808",
        display: "flex",
        alignItems: "center",
        justifyContent: "space-between",
        gap: "4rem",
        flexWrap: "wrap",
        overflow: "hidden",
      }}
    >
      {/* Background glow */}
      <div style={{
        position: "absolute", inset: 0, pointerEvents: "none",
        background: "radial-gradient(ellipse 50% 80% at 70% 50%, rgba(139,111,247,0.07) 0%, transparent 70%)",
      }} />

      {/* Left — headline + subtext */}
      <div ref={leftRef} style={{ position: "relative", zIndex: 1 }}>
        <p style={{
          fontFamily: "monospace", fontSize: "0.65rem",
          letterSpacing: "0.22em", color: "rgba(251,251,244,0.3)",
          textTransform: "uppercase", marginBottom: "1.5rem",
        }}>
          Nächster Schritt
        </p>
        <h2 style={{
          fontSize: "clamp(2.4rem, 4.5vw, 4.5rem)",
          fontWeight: 700, letterSpacing: "-0.04em", lineHeight: 1,
          color: "#fbfbf4", marginBottom: "1.25rem",
        }}>
          Bereit für dein{" "}
          <span style={{
            background: "linear-gradient(135deg, #60a5fa 0%, #8b6ff7 50%, #ad2bee 100%)",
            WebkitBackgroundClip: "text", WebkitTextFillColor: "transparent", backgroundClip: "text",
          }}>
            Projekt?
          </span>
        </h2>
        <p style={{
          color: "rgba(251,251,244,0.35)",
          fontSize: "clamp(0.9rem, 1.1vw, 1rem)",
          lineHeight: 1.75,
        }}>
          Wir melden uns innerhalb von 24 Stunden.
        </p>
      </div>

      {/* Right — CTA */}
      <div ref={rightRef} style={{ position: "relative", zIndex: 1, flexShrink: 0 }}>
        <a
          href="#kontakt"
          style={{
            display: "inline-flex", alignItems: "center", gap: "0.75rem",
            padding: "1.1rem 2.2rem",
            border: "1px solid rgba(139,111,247,0.5)",
            borderRadius: "4px",
            color: "#fbfbf4",
            textDecoration: "none",
            fontSize: "clamp(0.9rem, 1vw, 1rem)",
            fontWeight: 500,
            letterSpacing: "0.04em",
            background: "rgba(139,111,247,0.08)",
            transition: "background 0.3s ease, border-color 0.3s ease, box-shadow 0.3s ease",
          }}
          onMouseEnter={(e) => {
            e.currentTarget.style.background = "rgba(139,111,247,0.18)";
            e.currentTarget.style.borderColor = "rgba(139,111,247,0.9)";
            e.currentTarget.style.boxShadow = "0 0 28px rgba(139,111,247,0.2)";
          }}
          onMouseLeave={(e) => {
            e.currentTarget.style.background = "rgba(139,111,247,0.08)";
            e.currentTarget.style.borderColor = "rgba(139,111,247,0.5)";
            e.currentTarget.style.boxShadow = "none";
          }}
        >
          Kostenloses Erstgespräch
          <span style={{ fontSize: "1.1em", opacity: 0.7 }}>→</span>
        </a>
        <p style={{
          marginTop: "0.75rem",
          fontSize: "0.72rem",
          color: "rgba(251,251,244,0.2)",
          letterSpacing: "0.05em",
          textAlign: "center",
        }}>
          30 Min · Kostenlos · Unverbindlich
        </p>
      </div>
    </div>
  );
}
