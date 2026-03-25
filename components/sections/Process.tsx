"use client";

import { useEffect, useRef } from "react";
import { gsap } from "@/lib/gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { useIsMobile } from "@/lib/useIsMobile";

const STEPS = [
  {
    number: "01",
    title: "Erstgespräch",
    description:
      "30 Minuten, kostenlos. Wir lernen uns kennen, besprechen deine Ziele, dein Budget und deine Timeline. Kein Verkaufsgespräch – ein ehrliches Gespräch auf Augenhöhe.",
    accent: "#60a5fa",
    image: "https://images.pexels.com/photos/3183150/pexels-photo-3183150.jpeg?auto=compress&cs=tinysrgb&w=1440&h=900&dpr=1",
  },
  {
    number: "02",
    title: "Strategie & Konzept",
    description:
      "Wir analysieren deine Zielgruppe und Mitbewerber, entwickeln eine Sitemap und erste Konzepte. Die strategische Basis für alles, was danach kommt.",
    accent: "#8b6ff7",
    image: "https://images.pexels.com/photos/3182812/pexels-photo-3182812.jpeg?auto=compress&cs=tinysrgb&w=1440&h=900&dpr=1",
  },
  {
    number: "03",
    title: "Design",
    description:
      "Moodboard, UI Design, Feedback-Runden. Du siehst das Ergebnis bevor eine Zeile Code geschrieben wird – und kannst aktiv mitgestalten.",
    accent: "#ad2bee",
    image: "https://images.pexels.com/photos/196644/pexels-photo-196644.jpeg?auto=compress&cs=tinysrgb&w=1440&h=900&dpr=1",
  },
  {
    number: "04",
    title: "Entwicklung",
    description:
      "React & Next.js, GSAP-Animationen, vollständig responsiv. Wir bauen nicht nur schön – wir bauen schnell, sauber und rechtssicher.",
    accent: "#60a5fa",
    image: "https://images.pexels.com/photos/574077/pexels-photo-574077.jpeg?auto=compress&cs=tinysrgb&w=1440&h=900&dpr=1",
  },
  {
    number: "05",
    title: "Testing & SEO",
    description:
      "Browser-Tests auf allen Geräten, Performance-Optimierung, technische SEO. Alles wird gründlich geprüft bevor du es siehst.",
    accent: "#8b6ff7",
    image: "https://images.pexels.com/photos/590022/pexels-photo-590022.jpeg?auto=compress&cs=tinysrgb&w=1440&h=900&dpr=1",
  },
  {
    number: "06",
    title: "Launch",
    description:
      "Go-live auf Vercel, Domain-Konfiguration, alles eingerichtet. Du musst dich um nichts kümmern – wir übernehmen den gesamten Launch.",
    accent: "#ad2bee",
    image: "https://images.pexels.com/photos/3184291/pexels-photo-3184291.jpeg?auto=compress&cs=tinysrgb&w=1440&h=900&dpr=1",
  },
  {
    number: "07",
    title: "Betreuung",
    description:
      "Support, Updates, laufende Optimierung. Wir sind auch nach dem Launch für dich da – dein verlässlicher Partner für digitales Wachstum.",
    accent: "#60a5fa",
    image: "https://images.pexels.com/photos/3182746/pexels-photo-3182746.jpeg?auto=compress&cs=tinysrgb&w=1440&h=900&dpr=1",
  },
];

export default function Process() {
  const isMobile  = useIsMobile();
  const stepsRef  = useRef<HTMLDivElement>(null);
  const panelRefs = useRef<(HTMLDivElement | null)[]>([]);
  const bgNumRefs = useRef<(HTMLSpanElement | null)[]>([]);
  const dotRefs   = useRef<(HTMLDivElement | null)[]>([]);

  useEffect(() => {
    gsap.registerPlugin(ScrollTrigger);

    const ctx = gsap.context(() => {
      panelRefs.current.forEach((panel, i) => {
        gsap.set(panel, { autoAlpha: i === 0 ? 1 : 0, y: i === 0 ? 0 : 70 });
      });
      bgNumRefs.current.forEach((num, i) => {
        gsap.set(num, { opacity: i === 0 ? 0.18 : 0, scale: i === 0 ? 1 : 1.2, x: i === 0 ? 0 : 40 });
      });
      dotRefs.current.forEach((dot, i) => {
        gsap.set(dot, { opacity: i === 0 ? 1 : 0.18, scaleX: i === 0 ? 1 : 0.4 });
      });

      const tl = gsap.timeline({
        scrollTrigger: {
          trigger: stepsRef.current,
          start: "top top",
          end: "bottom bottom",
          scrub: 1,
          invalidateOnRefresh: true,
        },
      });

      STEPS.forEach((_, i) => {
        if (i === STEPS.length - 1) return;
        tl
          .to(panelRefs.current[i],    { autoAlpha: 0, y: -60, duration: 0.4 }, "+=0.7")
          .to(bgNumRefs.current[i],    { opacity: 0, scale: 0.8, x: -40, duration: 0.4 }, "<")
          .to(dotRefs.current[i],      { opacity: 0.18, scaleX: 0.4, duration: 0.3 }, "<")
          .fromTo(panelRefs.current[i + 1], { autoAlpha: 0, y: 70 }, { autoAlpha: 1, y: 0, duration: 0.5 }, "<0.15")
          .fromTo(bgNumRefs.current[i + 1], { opacity: 0, scale: 1.2, x: 40 }, { opacity: 0.18, scale: 1, x: 0, duration: 0.5 }, "<")
          .to(dotRefs.current[i + 1],  { opacity: 1, scaleX: 1, duration: 0.3 }, "<0.1");
      });
    }, stepsRef);

    // Refresh ScrollTrigger to ensure correct top positions after dynamic component loading
    const t1 = setTimeout(() => ScrollTrigger.refresh(), 500);
    const t2 = setTimeout(() => ScrollTrigger.refresh(), 1500);

    return () => {
      clearTimeout(t1);
      clearTimeout(t2);
      ctx.revert();
    };
  }, []);

  return (
    <>
      {/* ── Steps — sticky scroll, 6 × 100vh ── */}
      <div ref={stepsRef} style={{ height: `${(STEPS.length - 1) * 100}vh` }}>
        <div style={{
          position: "sticky", top: 0, height: "100vh",
          overflow: "hidden", background: "#080808",
        }}>
          {/* Progress dots */}
          <div style={{
            position: "absolute", right: "2rem", top: "50%",
            transform: "translateY(-50%)",
            display: "flex", flexDirection: "column", gap: "0.5rem", zIndex: 20,
          }}>
            {STEPS.map((step, i) => (
              <div
                key={i}
                ref={(el) => { dotRefs.current[i] = el; }}
                style={{
                  height: "2px", width: "1.5rem", borderRadius: "2px",
                  background: step.accent, opacity: 0.18,
                  transformOrigin: "left center",
                }}
              />
            ))}
          </div>

          {/* Step panels */}
          {STEPS.map((step, i) => (
            <div
              key={i}
              ref={(el) => { panelRefs.current[i] = el; }}
              style={{
                position: "absolute", inset: 0,
                display: "flex", alignItems: "center",
                paddingLeft: "clamp(2rem, 8vw, 8rem)",
                paddingRight: "clamp(4rem, 12vw, 14rem)",
              }}
            >
              {/* Background image */}
              <div style={{
                position: "absolute", inset: 0,
                backgroundImage: `url(${step.image})`,
                backgroundSize: "cover",
                backgroundPosition: "center",
                opacity: 0.3,
                pointerEvents: "none",
              }} />

              {/* Dark overlay — lighter so image is visible in the middle */}
              <div style={{
                position: "absolute", inset: 0,
                background: isMobile 
                  ? "linear-gradient(105deg, rgba(8,8,8,0.65) 35%, rgba(8,8,8,0.2) 100%)"
                  : "linear-gradient(105deg, rgba(8,8,8,0.78) 35%, rgba(8,8,8,0.48) 100%)",
                pointerEvents: "none",
              }} />

              <span
                ref={(el) => { bgNumRefs.current[i] = el; }}
                aria-hidden
                style={{
                  position: "absolute",
                  right: "clamp(1rem, 5vw, 5rem)",
                  top: "50%", transform: "translateY(-50%)",
                  fontSize: "clamp(18rem, 38vw, 44rem)",
                  fontWeight: 900, lineHeight: 1, color: step.accent,
                  opacity: 0.18, letterSpacing: "-0.06em",
                  userSelect: "none", pointerEvents: "none",
                }}
              >
                {step.number}
              </span>

              <div style={{ position: "relative", zIndex: 2, maxWidth: "660px" }}>
                <h2 style={{
                  fontSize: "clamp(3.2rem, 7.5vw, 7rem)",
                  fontWeight: 700, letterSpacing: "-0.04em",
                  color: "#fbfbf4", lineHeight: 0.92, marginBottom: "2rem",
                }}>
                  {step.title}
                </h2>

                <p style={{
                  color: "rgba(251,251,244,0.45)",
                  fontSize: "clamp(1rem, 1.25vw, 1.15rem)",
                  lineHeight: 1.85, maxWidth: "480px",
                }}>
                  {step.description}
                </p>
              </div>
            </div>
          ))}

          <div style={{ position: "absolute", bottom: "2.5rem", left: "clamp(2rem, 8vw, 8rem)", zIndex: 20 }}>
            <a
              href="#kontakt"
              style={{
                color: "rgba(251,251,244,0.25)", fontSize: "0.8rem",
                textDecoration: "none", letterSpacing: "0.06em",
                fontFamily: "monospace", transition: "color 0.25s",
              }}
              onMouseEnter={(e) => (e.currentTarget.style.color = "rgba(251,251,244,0.7)")}
              onMouseLeave={(e) => (e.currentTarget.style.color = "rgba(251,251,244,0.25)")}
            >
              Erstgespräch vereinbaren →
            </a>
          </div>
        </div>
      </div>
    </>
  );
}
