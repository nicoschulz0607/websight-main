"use client";

import { useEffect, useRef } from "react";
import Link from "next/link";
import { gsap } from "@/lib/gsap";

const MailIcon = () => (
  <svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
    <rect x="2" y="4" width="20" height="16" rx="2" />
    <path d="m22 7-8.97 5.7a1.94 1.94 0 0 1-2.06 0L2 7" />
  </svg>
);

const HeartIcon = () => (
  <svg width="10" height="10" viewBox="0 0 24 24" fill="currentColor" stroke="none" aria-hidden="true">
    <path d="M20.84 4.61a5.5 5.5 0 0 0-7.78 0L12 5.67l-1.06-1.06a5.5 5.5 0 0 0-7.78 7.78l1.06 1.06L12 21.23l7.78-7.78 1.06-1.06a5.5 5.5 0 0 0 0-7.78z" />
  </svg>
);

export default function Footer() {
  const footerRef = useRef<HTMLElement>(null);
  const currentYear = new Date().getFullYear();

  useEffect(() => {
    const ctx = gsap.context(() => {
      gsap.fromTo(
        footerRef.current,
        { opacity: 0, y: 30 },
        {
          opacity: 1,
          y: 0,
          duration: 1,
          ease: "power2.out",
          scrollTrigger: {
            trigger: footerRef.current,
            start: "top 90%",
            toggleActions: "play none none none",
          },
        }
      );
    }, footerRef);
    return () => ctx.revert();
  }, []);

  return (
    <footer
      ref={footerRef}
      style={{
        position: "relative",
        background: "#0a0a0a",
        padding: "3rem 0 0",
        overflow: "hidden",
        borderTop: "1px solid rgba(251,251,244,0.05)",
      }}
    >
      {/* Gradient line at top */}
      <div style={{
        position: "absolute",
        top: 0, left: "50%",
        transform: "translateX(-50%)",
        width: "100%", height: "1px",
        background: "linear-gradient(90deg, transparent, rgba(139,111,247,0.3), transparent)",
        pointerEvents: "none",
      }} />

      <div style={{ maxWidth: "1400px", margin: "0 auto", padding: "0 clamp(1.5rem, 6vw, 6rem)" }}>
        <div style={{
          display: "flex",
          flexWrap: "wrap",
          justifyContent: "space-between",
          alignItems: "flex-start",
          gap: "3rem",
        }}>

          {/* Brand */}
          <div style={{ display: "flex", flexDirection: "column", gap: "1rem" }}>
            <a
              href="#"
              style={{
                fontSize: "clamp(1.6rem, 2.5vw, 2.2rem)",
                fontWeight: 800,
                letterSpacing: "-0.03em",
                lineHeight: 1,
                background: "linear-gradient(135deg, #60a5fa 0%, #8b6ff7 50%, #ad2bee 100%)",
                WebkitBackgroundClip: "text",
                WebkitTextFillColor: "transparent",
                backgroundClip: "text",
                textDecoration: "none",
              }}
            >
              Websight
            </a>
            <p style={{
              color: "rgba(251,251,244,0.35)",
              fontSize: "0.6rem",
              textTransform: "uppercase",
              letterSpacing: "0.2em",
              fontWeight: 500,
              lineHeight: 1.7,
              maxWidth: "220px",
            }}>
              Webdesign & digitale Strategie.<br />
              Für Unternehmen, die wachsen wollen.
            </p>
          </div>

          {/* Link groups */}
          <div style={{ display: "flex", flexWrap: "wrap", gap: "4rem" }}>

            {/* Navigation */}
            <div style={{ display: "flex", flexDirection: "column", gap: "0.75rem" }}>
              <h5 style={{
                color: "rgba(251,251,244,0.25)",
                fontSize: "0.6rem",
                textTransform: "uppercase",
                letterSpacing: "0.2em",
                fontWeight: 700,
                marginBottom: "0.25rem",
              }}>Menü</h5>
              {[
                { label: "Arbeiten",   href: "#work" },
                { label: "Leistungen", href: "#services" },
                { label: "Über uns",   href: "#about" },
                { label: "Kontakt",    href: "#contact" },
              ].map(({ label, href }) => (
                <a key={label} href={href} style={{
                  color: "rgba(251,251,244,0.45)",
                  fontSize: "0.875rem",
                  textDecoration: "none",
                  transition: "color 0.2s ease",
                }}
                  onMouseEnter={e => (e.currentTarget.style.color = "#fbfbf4")}
                  onMouseLeave={e => (e.currentTarget.style.color = "rgba(251,251,244,0.45)")}
                >
                  {label}
                </a>
              ))}
            </div>

            {/* Leistungen */}
            <div style={{ display: "flex", flexDirection: "column", gap: "0.75rem" }}>
              <h5 style={{
                color: "rgba(251,251,244,0.25)",
                fontSize: "0.6rem",
                textTransform: "uppercase",
                letterSpacing: "0.2em",
                fontWeight: 700,
                marginBottom: "0.25rem",
              }}>Leistungen</h5>
              {["Webdesign & Entwicklung", "SEO & Sichtbarkeit", "Automatisierung", "Marke & Vertrauen"].map((item) => (
                <a key={item} href="#services" style={{
                  color: "rgba(251,251,244,0.45)",
                  fontSize: "0.875rem",
                  textDecoration: "none",
                  transition: "color 0.2s ease",
                }}
                  onMouseEnter={e => (e.currentTarget.style.color = "#fbfbf4")}
                  onMouseLeave={e => (e.currentTarget.style.color = "rgba(251,251,244,0.45)")}
                >
                  {item}
                </a>
              ))}
            </div>

            {/* Kontakt */}
            <div style={{ display: "flex", flexDirection: "column", gap: "0.75rem" }}>
              <h5 style={{
                color: "rgba(251,251,244,0.25)",
                fontSize: "0.6rem",
                textTransform: "uppercase",
                letterSpacing: "0.2em",
                fontWeight: 700,
                marginBottom: "0.25rem",
              }}>Kontakt</h5>
              <a href="mailto:nico@websight-design.de" style={{
                color: "rgba(251,251,244,0.45)", fontSize: "0.875rem", textDecoration: "none",
                display: "flex", alignItems: "center", gap: "0.5rem", transition: "color 0.2s ease",
              }}
                onMouseEnter={e => (e.currentTarget.style.color = "#fbfbf4")}
                onMouseLeave={e => (e.currentTarget.style.color = "rgba(251,251,244,0.45)")}
              >
                <span style={{ color: "#8b6ff7" }}><MailIcon /></span>
                nico@websight-design.de
              </a>
              <a href="tel:+491729249820" style={{
                color: "rgba(251,251,244,0.45)", fontSize: "0.875rem", textDecoration: "none",
                display: "flex", alignItems: "center", gap: "0.5rem", transition: "color 0.2s ease",
              }}
                onMouseEnter={e => (e.currentTarget.style.color = "#fbfbf4")}
                onMouseLeave={e => (e.currentTarget.style.color = "rgba(251,251,244,0.45)")}
              >
                <span style={{ color: "#8b6ff7" }}>
                  <svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
                    <path d="M22 16.92v3a2 2 0 0 1-2.18 2 19.79 19.79 0 0 1-8.63-3.07A19.5 19.5 0 0 1 4.69 12a19.79 19.79 0 0 1-3.07-8.67A2 2 0 0 1 3.6 1.27h3a2 2 0 0 1 2 1.72c.127.96.361 1.903.7 2.81a2 2 0 0 1-.45 2.11L7.91 8.91a16 16 0 0 0 6 6l.91-.91a2 2 0 0 1 2.11-.45c.907.339 1.85.573 2.81.7A2 2 0 0 1 21.73 16.92z"/>
                  </svg>
                </span>
                +49 172 9249820
              </a>
              <a href="#contact"
                style={{
                  marginTop: "0.5rem", display: "inline-flex", alignItems: "center",
                  justifyContent: "center", borderRadius: "999px", padding: "0.5rem 1.25rem",
                  fontSize: "0.8rem", textDecoration: "none", position: "relative",
                  border: "1px solid transparent",
                  background: "linear-gradient(#0a0a0a, #0a0a0a) padding-box, linear-gradient(135deg, rgba(96,165,250,0.3), rgba(173,43,238,0.3)) border-box",
                  color: "rgba(251,251,244,0.7)",
                  transition: "color 0.25s ease, background 0.25s ease",
                }}
                onMouseEnter={e => {
                  e.currentTarget.style.background = "linear-gradient(135deg, #60a5fa 0%, #8b6ff7 50%, #ad2bee 100%) padding-box, linear-gradient(135deg, #60a5fa, #ad2bee) border-box";
                  e.currentTarget.style.color = "#fff";
                }}
                onMouseLeave={e => {
                  e.currentTarget.style.background = "linear-gradient(#0a0a0a, #0a0a0a) padding-box, linear-gradient(135deg, rgba(96,165,250,0.3), rgba(173,43,238,0.3)) border-box";
                  e.currentTarget.style.color = "rgba(251,251,244,0.7)";
                }}
              >
                Gespräch starten →
              </a>
            </div>
          </div>
        </div>

        {/* Bottom bar */}
        <div style={{
          marginTop: "3rem",
          paddingTop: "1.5rem",
          paddingBottom: "1.5rem",
          borderTop: "1px solid rgba(251,251,244,0.05)",
          display: "flex",
          flexWrap: "wrap",
          justifyContent: "space-between",
          alignItems: "center",
          gap: "1rem",
        }}>
          <div style={{ display: "flex", gap: "1.5rem", alignItems: "center" }}>
            {["Impressum", "Datenschutz", "AGB"].map((item) => (
              <Link key={item} href={`/${item.toLowerCase()}`} style={{
                color: "rgba(251,251,244,0.18)",
                fontSize: "0.6rem",
                textTransform: "uppercase",
                letterSpacing: "0.15em",
                textDecoration: "none",
                transition: "color 0.2s ease",
              }}
                onMouseEnter={e => (e.currentTarget.style.color = "rgba(251,251,244,0.5)")}
                onMouseLeave={e => (e.currentTarget.style.color = "rgba(251,251,244,0.18)")}
              >
                {item}
              </Link>
            ))}
            <span style={{ color: "rgba(251,251,244,0.18)", fontSize: "0.6rem", textTransform: "uppercase", letterSpacing: "0.15em" }}>
              © {currentYear} Websight
            </span>
          </div>
          <div style={{
            display: "flex",
            alignItems: "center",
            gap: "0.4rem",
            color: "rgba(251,251,244,0.18)",
            fontSize: "0.6rem",
            textTransform: "uppercase",
            letterSpacing: "0.15em",
          }}>
            MADE WITH{" "}
            <span style={{ color: "rgba(139,111,247,0.5)" }}><HeartIcon /></span>
            {" "}IN BALINGEN
          </div>
        </div>
      </div>
    </footer>
  );
}
