"use client";

import { useEffect, useRef } from "react";
import { gsap } from "@/lib/gsap";
import { useIsMobile } from "@/lib/useIsMobile";

export default function Hero() {
  const isMobile = useIsMobile();
  const sectionRef   = useRef<HTMLElement>(null);
  const headlineRef  = useRef<HTMLHeadingElement>(null);
  const descRef      = useRef<HTMLParagraphElement>(null);
  const ctaRef       = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const ctx = gsap.context(() => {
      gsap.set([headlineRef.current, descRef.current, ctaRef.current], {
        opacity: 0, y: 28,
      });

      const tl = gsap.timeline({ defaults: { ease: "power3.out" } });
      tl.to(headlineRef.current, { opacity: 1, y: 0, duration: 0.85 }, 0.3);
      tl.to(descRef.current,     { opacity: 1, y: 0, duration: 0.65 }, 0.75);
      tl.to(ctaRef.current,      { opacity: 1, y: 0, duration: 0.55 }, 0.98);
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
        src="/hero-bg-optimized.jpg"
        alt=""
        aria-hidden
        width={2206}
        height={1536}
        fetchPriority="high"
        className="absolute inset-0 w-full h-full object-cover"
        style={{ animation: "heroBgScale 22s ease-in-out infinite alternate" }}
      />

      {/* ── Gradient overlay — dark left (text), open right (image) ──────── */}
      <div
        aria-hidden
        className="absolute inset-0"
        style={{
          background: isMobile
            ? "rgba(0,0,0,0.6)"
            : "linear-gradient(108deg, rgba(0,0,0,0.82) 0%, rgba(0,0,0,0.55) 38%, rgba(0,0,0,0.18) 65%, rgba(0,0,0,0.05) 100%)",
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
          left: "clamp(1.5rem, 6vw, 7rem)",
          right: isMobile ? "1.5rem" : "auto",
          bottom: isMobile ? "5.5rem" : "clamp(5rem, 10vh, 9rem)",
          maxWidth: isMobile ? "100%" : "min(560px, 46vw)",
        }}
      >
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
          style={{ fontSize: isMobile ? "0.9rem" : "clamp(0.9rem, 1.4vw, 1.1rem)", maxWidth: isMobile ? "320px" : "420px" }}
        >
          Websites & Marken, die nicht nur schön aussehen —
          sondern auch performen.
        </p>

        {/* CTA button */}
        <div ref={ctaRef} className="flex items-center mt-7">
          <a
            href="#kontakt"
            className="hero-cta flex items-center justify-center rounded-full font-bold tracking-widest uppercase"
            style={{
              padding: isMobile ? "0.85rem 2rem" : "1rem 2.6rem",
              fontSize: isMobile ? "0.72rem" : "clamp(0.75rem, 1.1vw, 0.875rem)",
              background: "linear-gradient(135deg, #60a5fa 0%, #8b6ff7 50%, #ad2bee 100%)",
              color: "#fff",
              textDecoration: "none",
              letterSpacing: "0.12em",
              whiteSpace: "nowrap",
              transition: "opacity 0.2s, transform 0.2s",
            }}
            onMouseEnter={(e) => {
              (e.currentTarget as HTMLAnchorElement).style.opacity = "0.88";
              (e.currentTarget as HTMLAnchorElement).style.transform = "translateY(-2px)";
            }}
            onMouseLeave={(e) => {
              (e.currentTarget as HTMLAnchorElement).style.opacity = "1";
              (e.currentTarget as HTMLAnchorElement).style.transform = "translateY(0)";
            }}
          >
            Kontakt aufnehmen
          </a>
        </div>
      </div>


    </section>
  );
}
