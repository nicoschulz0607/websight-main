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
  { text: "mehr",                colored: true },
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
  { text: "Vertrauen",           colored: true },
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

const CLIP = "polygon(0 10%, 100% 0%, 100% 100%, 0 100%)";

function AuthorPhoto({ src, width, height }: { src: string; width: number; height: number }) {
  return (
    <div style={{
      position: "relative", width, height, flexShrink: 0,
      filter: "drop-shadow(0 12px 40px rgba(139,111,247,0.35))",
    }}>
      <div style={{
        position: "absolute", inset: "-1.5px",
        clipPath: CLIP,
        background: "linear-gradient(135deg, #60a5fa, #8b6ff7, #ad2bee)",
        zIndex: 0,
      }} />
      <div style={{
        position: "relative", zIndex: 1,
        width: "100%", height: "100%",
        clipPath: CLIP,
        backgroundImage: `url(${src})`,
        backgroundSize: "cover",
        backgroundPosition: "center top",
      }} />
    </div>
  );
}

export default function Testimonials() {
  const wrapperRef   = useRef<HTMLDivElement>(null);
  const stickyRef    = useRef<HTMLElement>(null);
  const scrollContRef = useRef<HTMLDivElement>(null); // inner scrolling container
  const quoteRef     = useRef<HTMLParagraphElement>(null);
  const authorRef    = useRef<HTMLDivElement>(null);

  const t = TESTIMONIALS[0];

  useEffect(() => {
    gsap.registerPlugin(ScrollTrigger);

    const ctx = gsap.context(() => {
      const section   = stickyRef.current;
      const container = scrollContRef.current;
      if (!section || !container) return;

      // ── Inner scroll: content moves UP inside the fixed viewport window ──
      // Words at the top "disappear" by exiting through overflow:hidden,
      // not by dimming — this is the natural "reading scroll" feel.
      const sectionH = section.clientHeight;
      const contentH = container.scrollHeight;
      const travel   = Math.max(0, contentH - sectionH + 64);

      gsap.to(container, {
        y: -travel,
        ease: "none",
        scrollTrigger: {
          trigger: wrapperRef.current,
          start: "top top",
          end: "bottom bottom",
          scrub: 1.5,
        },
      });

      // ── Word blur-in: same pattern as BlurText, single fromTo + stagger ──
      // Words once revealed stay at full opacity — no dimming.
      const words = quoteRef.current?.querySelectorAll<HTMLSpanElement>("[data-word]");
      if (words && words.length > 0) {
        gsap.fromTo(words,
          { autoAlpha: 0, filter: "blur(1.8rem)", y: 32 },
          {
            autoAlpha: 1, filter: "blur(0rem)", y: 0,
            ease: "power2.out",
            stagger: 0.08,
            scrollTrigger: {
              trigger: wrapperRef.current,
              start: "4% top",
              end: "78% bottom",
              scrub: 1.5,
            },
          }
        );
      }

      // ── Author fades in after all words are revealed ──
      gsap.fromTo(authorRef.current,
        { autoAlpha: 0, y: 24 },
        {
          autoAlpha: 1, y: 0, duration: 0.8, ease: "power3.out",
          scrollTrigger: {
            trigger: wrapperRef.current,
            start: "78% bottom",
            end: "85% bottom",
            scrub: 1,
          },
        }
      );

    }, wrapperRef);

    return () => ctx.revert();
  }, []);

  return (
    /* Tall wrapper drives all scroll-linked animations */
    <div ref={wrapperRef} style={{ height: "380vh" }}>
      <section
        ref={stickyRef}
        id="testimonials"
        style={{
          position: "sticky", top: 0, height: "100vh",
          background: "#0a0a0a",
          borderTop: "1px solid rgba(251,251,244,0.06)",
          borderBottom: "1px solid rgba(251,251,244,0.06)",
          overflow: "hidden",     // clips content that scrolls off the top/bottom
        }}
      >
        {/* Ambient orbs — decorative, static */}
        <div aria-hidden style={{ position: "absolute", top: "-10%", left: "-5%", width: "40vw", height: "40vw", borderRadius: "50%", background: "radial-gradient(circle, rgba(96,165,250,0.07), transparent 70%)", pointerEvents: "none", zIndex: 0 }} />
        <div aria-hidden style={{ position: "absolute", bottom: "-10%", right: "-5%", width: "40vw", height: "40vw", borderRadius: "50%", background: "radial-gradient(circle, rgba(173,43,238,0.07), transparent 70%)", pointerEvents: "none", zIndex: 0 }} />

        {/* Background quote mark — decorative, static */}
        <div aria-hidden style={{
          position: "absolute", top: "50%", left: "50%",
          transform: "translate(-50%, -54%)",
          fontSize: "clamp(18rem, 38vw, 36rem)",
          fontWeight: 900, lineHeight: 1,
          background: "linear-gradient(135deg, rgba(96,165,250,0.06) 0%, rgba(139,111,247,0.06) 50%, rgba(173,43,238,0.06) 100%)",
          WebkitBackgroundClip: "text", backgroundClip: "text",
          WebkitTextFillColor: "transparent", color: "transparent",
          userSelect: "none", pointerEvents: "none", zIndex: 0,
          fontFamily: "Georgia, serif", letterSpacing: "-0.05em",
        }}>
          &#8220;
        </div>

        {/* ── Inner scrolling container ──
            Starts at top with padding, translates upward as page scrolls.
            overflow:hidden on the parent section clips it naturally. */}
        <div
          ref={scrollContRef}
          style={{
            position: "relative", zIndex: 1,
            display: "flex", flexDirection: "column",
            alignItems: "center", gap: "3.5rem",
            padding: "clamp(10rem, 18vh, 14rem) clamp(2rem, 9vw, 8.5rem) clamp(4rem, 8vh, 6rem)",
          }}
        >
          {/* Quote */}
          <p
            ref={quoteRef}
            style={{
              fontSize: "clamp(2.2rem, 4vw, 4.2rem)",
              fontWeight: 700, lineHeight: 1.18, letterSpacing: "-0.035em",
              maxWidth: "1000px", width: "100%", textAlign: "center",
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
                    WebkitBackgroundClip: "text", WebkitTextFillColor: "transparent", backgroundClip: "text",
                  } : { color: "#fbfbf4" }),
                }}
              >
                {w.text}
              </span>
            ))}
          </p>

          {/* Author — in natural flow below the quote, scrolls in with the container */}
          <div
            ref={authorRef}
            style={{
              display: "flex", flexDirection: "column", alignItems: "center", gap: "1.25rem",
            }}
          >
            <AuthorPhoto src={t.image || ""} width={160} height={200} />
            <div style={{ textAlign: "center" }}>
              <p style={{ fontSize: "1.1rem", fontWeight: 600, color: "#fbfbf4", marginBottom: "0.2rem" }}>
                {t.name}
              </p>
              <p style={{ fontSize: "0.78rem", color: "rgba(251,251,244,0.38)", letterSpacing: "0.08em", textTransform: "uppercase" }}>
                {t.role} · {t.company}
              </p>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}
