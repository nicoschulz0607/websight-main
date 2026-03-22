"use client";

import { useEffect, useRef } from "react";
import { gsap } from "@/lib/gsap";

export default function Hero() {
  const sectionRef   = useRef<HTMLElement>(null);
  const badgeRef     = useRef<HTMLDivElement>(null);
  const headlineRef  = useRef<HTMLHeadingElement>(null);
  const descRef      = useRef<HTMLParagraphElement>(null);
  const ctaRef       = useRef<HTMLDivElement>(null);
  const scrollHintRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const ctx = gsap.context(() => {
      gsap.set([badgeRef.current, headlineRef.current, descRef.current, ctaRef.current], {
        opacity: 0, y: 28,
      });
      gsap.set(scrollHintRef.current, { opacity: 0 });

      const tl = gsap.timeline({ defaults: { ease: "power3.out" } });
      tl.to(badgeRef.current,    { opacity: 1, y: 0, duration: 0.6 }, 0.4);
      tl.to(headlineRef.current, { opacity: 1, y: 0, duration: 0.8 }, 0.6);
      tl.to(descRef.current,     { opacity: 1, y: 0, duration: 0.6 }, 0.95);
      tl.to(ctaRef.current,      { opacity: 1, y: 0, duration: 0.55 }, 1.15);
      tl.to(scrollHintRef.current, { opacity: 1, duration: 0.5 }, 1.45);
    }, sectionRef);

    return () => ctx.revert();
  }, []);

  return (
    <section
      ref={sectionRef}
      className="relative w-full h-screen overflow-hidden"
      style={{ background: "#000" }}
    >
      {/* ── Background image — Ken Burns slow scale ──────────────────────── */}
      {/* eslint-disable-next-line @next/next/no-img-element */}
      <img
        src="/hero-bg.png"
        alt=""
        aria-hidden
        className="absolute inset-0 w-full h-full object-cover"
        style={{ animation: "heroBgScale 22s ease-in-out infinite alternate" }}
      />

      {/* ── Gradient overlay — dark left (text), open right (image) ──────── */}
      <div
        aria-hidden
        className="absolute inset-0"
        style={{
          background:
            "linear-gradient(108deg, rgba(0,0,0,0.82) 0%, rgba(0,0,0,0.55) 38%, rgba(0,0,0,0.18) 65%, rgba(0,0,0,0.05) 100%)",
        }}
      />

      {/* ── Bottom fade to black (smooth section transition) ─────────────── */}
      <div
        aria-hidden
        className="absolute bottom-0 left-0 right-0"
        style={{
          height: "180px",
          background: "linear-gradient(to bottom, transparent, #000)",
        }}
      />

      {/* ── Content — bottom left ─────────────────────────────────────────── */}
      <div
        className="absolute flex flex-col"
        style={{
          left: "clamp(2rem, 6vw, 7rem)",
          bottom: "clamp(5rem, 10vh, 9rem)",
          maxWidth: "min(560px, 46vw)",
        }}
      >
        {/* Badge */}
        <div
          ref={badgeRef}
          className="flex items-center gap-3 mb-7"
        >
          <span className="block w-8 h-px" style={{ background: "rgba(96,165,250,0.6)" }} />
          <span
            className="text-cream/50 text-[10px] tracking-[0.28em] uppercase"
          >
            Digitale Agentur
          </span>
        </div>

        {/* Headline */}
        <h1
          ref={headlineRef}
          className="text-cream font-bold leading-[1.06]"
          style={{
            fontSize: "clamp(2.6rem, 5.5vw, 5.8rem)",
            letterSpacing: "-0.03em",
          }}
        >
          Wir gestalten<br />
          <span style={{
            background: "linear-gradient(135deg, #60a5fa 0%, #8b6ff7 50%, #ad2bee 100%)",
            WebkitBackgroundClip: "text",
            WebkitTextFillColor: "transparent",
            backgroundClip: "text",
          }}>
            digitale
          </span>
          <br />
          Erlebnisse.
        </h1>

        {/* Description */}
        <p
          ref={descRef}
          className="text-cream/55 leading-relaxed mt-5"
          style={{ fontSize: "clamp(0.9rem, 1.4vw, 1.1rem)", maxWidth: "420px" }}
        >
          Maßgeschneiderte Websites, starke Marken und digitale Produkte
          — die nicht nur schön aussehen, sondern auch performen.
        </p>

        {/* CTA buttons */}
        <div ref={ctaRef} className="flex items-center gap-4 mt-8 flex-wrap">
          {/* Primary: gradient fill */}
          <a
            href="#work"
            className="flex items-center justify-center rounded-full text-xs font-bold tracking-widest uppercase"
            style={{
              padding: "0.8rem 2rem",
              background: "linear-gradient(135deg, #60a5fa 0%, #8b6ff7 50%, #ad2bee 100%)",
              color: "#fff",
              textDecoration: "none",
              transition: "opacity 0.2s, transform 0.2s, box-shadow 0.2s",
              boxShadow: "0 0 0 rgba(139,111,247,0)",
              letterSpacing: "0.1em",
            }}
            onMouseEnter={(e) => {
              (e.currentTarget as HTMLAnchorElement).style.opacity = "0.88";
              (e.currentTarget as HTMLAnchorElement).style.transform = "translateY(-2px)";
              (e.currentTarget as HTMLAnchorElement).style.boxShadow = "0 8px 30px rgba(139,111,247,0.45)";
            }}
            onMouseLeave={(e) => {
              (e.currentTarget as HTMLAnchorElement).style.opacity = "1";
              (e.currentTarget as HTMLAnchorElement).style.transform = "translateY(0)";
              (e.currentTarget as HTMLAnchorElement).style.boxShadow = "0 0 0 rgba(139,111,247,0)";
            }}
          >
            Unsere Projekte
          </a>
          {/* Secondary: gradient border */}
          <a
            href="#contact"
            className="flex items-center justify-center rounded-full text-xs font-semibold tracking-widest uppercase"
            style={{
              padding: "0.8rem 2rem",
              border: "1px solid transparent",
              background: "linear-gradient(rgba(0,0,0,0.4), rgba(0,0,0,0.4)) padding-box, linear-gradient(135deg, rgba(96,165,250,0.5), rgba(173,43,238,0.5)) border-box",
              color: "rgba(251,251,244,0.8)",
              textDecoration: "none",
              letterSpacing: "0.1em",
              transition: "color 0.25s, background 0.25s, transform 0.2s",
              backdropFilter: "blur(4px)",
            }}
            onMouseEnter={(e) => {
              (e.currentTarget as HTMLAnchorElement).style.background = "linear-gradient(135deg, #60a5fa 0%, #8b6ff7 50%, #ad2bee 100%) padding-box, linear-gradient(135deg, #60a5fa, #ad2bee) border-box";
              (e.currentTarget as HTMLAnchorElement).style.color = "#fff";
              (e.currentTarget as HTMLAnchorElement).style.transform = "translateY(-2px)";
            }}
            onMouseLeave={(e) => {
              (e.currentTarget as HTMLAnchorElement).style.background = "linear-gradient(rgba(0,0,0,0.4), rgba(0,0,0,0.4)) padding-box, linear-gradient(135deg, rgba(96,165,250,0.5), rgba(173,43,238,0.5)) border-box";
              (e.currentTarget as HTMLAnchorElement).style.color = "rgba(251,251,244,0.8)";
              (e.currentTarget as HTMLAnchorElement).style.transform = "translateY(0)";
            }}
          >
            Gespräch starten →
          </a>
        </div>
      </div>

      {/* ── Scroll hint ───────────────────────────────────────────────────── */}
      <div
        ref={scrollHintRef}
        className="absolute flex flex-col items-center gap-2.5"
        style={{ bottom: "5%", left: "50%", transform: "translateX(-50%)", zIndex: 2 }}
      >
        <span className="text-cream/25 text-[10px] tracking-widest uppercase">Scrollen</span>
        <div className="w-px h-9 bg-gradient-to-b from-cream/20 to-transparent" />
      </div>
    </section>
  );
}
