"use client";

import { useEffect, useRef } from "react";
import { gsap, ScrollTrigger } from "@/lib/gsap";
import { TESTIMONIALS } from "@/lib/constants";

const QUOTE_WORDS: { text: string; colored?: boolean }[] = [
  { text: "Seit" },
  { text: "dem" },
  { text: "Launch" },
  { text: "haben" },
  { text: "wir" },
  { text: "deutlich" },
  { text: "mehr",     colored: true },
  { text: "Anfragen\u00a0\u2014", colored: true },
  { text: "und" },
  { text: "die" },
  { text: "Qualit\u00e4t" },
  { text: "der" },
  { text: "Kontakte" },
  { text: "ist" },
  { text: "eine" },
  { text: "andere." },
  { text: "Kunden" },
  { text: "kommen" },
  { text: "bereits" },
  { text: "mit" },
  { text: "Vertrauen", colored: true },
  { text: "auf" },
  { text: "uns" },
  { text: "zu," },
  { text: "bevor" },
  { text: "wir" },
  { text: "das" },
  { text: "erste" },
  { text: "Gespr\u00e4ch" },
  { text: "gef\u00fchrt" },
  { text: "haben." },
];

export default function Testimonials() {
  const sectionRef  = useRef<HTMLElement>(null);
  const quoteRef    = useRef<HTMLParagraphElement>(null);
  const authorRef   = useRef<HTMLDivElement>(null);
  const bgQuoteRef  = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const ctx = gsap.context(() => {
      // Background quote mark — blurs in first
      if (bgQuoteRef.current) {
        gsap.fromTo(
          bgQuoteRef.current,
          { autoAlpha: 0, filter: "blur(3rem)", scale: 1.08 },
          {
            autoAlpha: 1, filter: "blur(0rem)", scale: 1,
            ease: "power2.out",
            scrollTrigger: {
              trigger: sectionRef.current,
              start: "top top",
              end: "+=40%",
              scrub: 1.5,
            },
          }
        );
      }

      const words = quoteRef.current?.querySelectorAll<HTMLSpanElement>("[data-word]");
      if (words && words.length > 0) {
        gsap.fromTo(
          words,
          { autoAlpha: 0, filter: "blur(1.8rem)", y: 32 },
          {
            autoAlpha: 1, filter: "blur(0rem)", y: 0,
            ease: "power2.out",
            stagger: 0.06,
            scrollTrigger: {
              trigger: sectionRef.current,
              start: "top top",
              end: "+=180%",
              scrub: 1.5,
              pin: true,
              anticipatePin: 1,
              onLeave: () => {
                // Author appears once quote is fully revealed
                gsap.to(authorRef.current, {
                  autoAlpha: 1, y: 0, duration: 0.8, ease: "power3.out",
                });
              },
              onEnterBack: () => {
                // Hide author if user scrolls back up
                gsap.to(authorRef.current, { autoAlpha: 0, y: 20, duration: 0.4 });
              },
            },
          }
        );
      }
    }, sectionRef);
    return () => ctx.revert();
  }, []);

  const t = TESTIMONIALS[0];

  return (
    <section
      ref={sectionRef}
      id="testimonials"
      style={{
        padding: "clamp(8rem, 14vw, 14rem) clamp(2rem, 9vw, 8.5rem)",
        borderTop: "1px solid rgba(251,251,244,0.06)",
        borderBottom: "1px solid rgba(251,251,244,0.06)",
        position: "relative",
        overflow: "hidden",
        background: "#0a0a0a",
      }}
    >
      {/* Large decorative quote mark — fades in behind text */}
      <div
        ref={bgQuoteRef}
        style={{
          position: "absolute",
          top: "50%",
          left: "50%",
          transform: "translate(-50%, -54%)",
          fontSize: "clamp(18rem, 38vw, 36rem)",
          fontWeight: 900,
          lineHeight: 1,
          color: "transparent",
          background: "linear-gradient(135deg, rgba(96,165,250,0.07) 0%, rgba(139,111,247,0.07) 50%, rgba(173,43,238,0.07) 100%)",
          WebkitBackgroundClip: "text",
          backgroundClip: "text",
          WebkitTextFillColor: "transparent",
          userSelect: "none",
          pointerEvents: "none",
          zIndex: 0,
          opacity: 0,
          fontFamily: "Georgia, serif",
          letterSpacing: "-0.05em",
        }}
        aria-hidden
      >
        &#8220;
      </div>

      {/* Quote — blur reveal */}
      <p
        ref={quoteRef}
        style={{
          position: "relative", zIndex: 1,
          fontSize: "clamp(1.8rem, 3.2vw, 3rem)",
          fontWeight: 500,
          lineHeight: 1.55,
          letterSpacing: "-0.025em",
          maxWidth: "1050px",
          margin: "0 auto 4rem",
          textAlign: "center",
        }}
      >
        {QUOTE_WORDS.map((w, i) => (
          <span
            key={i}
            data-word
            style={{
              display: "inline-block",
              marginRight: "0.28em",
              willChange: "filter, opacity, transform",
              ...(w.colored ? {
                background: "linear-gradient(135deg, #60a5fa 0%, #8b6ff7 50%, #ad2bee 100%)",
                WebkitBackgroundClip: "text",
                WebkitTextFillColor: "transparent",
                backgroundClip: "text",
              } : { color: "#fbfbf4" }),
            }}
          >
            {w.text}
          </span>
        ))}
      </p>

      {/* Author — appears after quote is fully revealed */}
      <div
        ref={authorRef}
        style={{
          position: "relative", zIndex: 1,
          display: "flex", alignItems: "center", justifyContent: "center", gap: "1.25rem",
          opacity: 0, transform: "translateY(20px)",
        }}
      >
        <div style={{
          width: 48, height: 48, borderRadius: "50%", flexShrink: 0,
          background: "linear-gradient(135deg, #60a5fa, #ad2bee)",
        }} />
        <div>
          <p style={{ fontSize: "1rem", fontWeight: 600, color: "#fbfbf4", marginBottom: "0.2rem" }}>
            {t.name}
          </p>
          <p style={{ fontSize: "0.78rem", color: "rgba(251,251,244,0.35)", letterSpacing: "0.06em", textTransform: "uppercase" }}>
            {t.role} · {t.company}
          </p>
        </div>
      </div>
    </section>
  );
}
