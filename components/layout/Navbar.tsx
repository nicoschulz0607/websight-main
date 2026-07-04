"use client";

import { useEffect, useRef, useState } from "react";
import { NAV_LINKS } from "@/lib/constants";

export default function Navbar() {
  const [scrolled, setScrolled] = useState(false);
  const [menuOpen, setMenuOpen] = useState(false);
  const navRef = useRef<HTMLElement>(null);

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 60);
    window.addEventListener("scroll", onScroll, { passive: true }); // client-passive-event-listeners
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  useEffect(() => {
    document.body.style.overflow = menuOpen ? "hidden" : "";
    return () => { document.body.style.overflow = ""; };
  }, [menuOpen]);

  return (
    <>
      <nav
        ref={navRef}
        className="fixed top-0 left-0 right-0 z-50 grid items-center px-8 py-6 transition-all duration-500"
        style={{
          gridTemplateColumns: "1fr auto 1fr",
          background: scrolled ? "rgba(0,0,0,0.7)" : "transparent",
          backdropFilter: scrolled ? "blur(12px)" : "none",
        }}
      >
        {/* Logo — left column */}
        <a
          href="#"
          className="font-bold text-xl tracking-tight justify-self-start"
          style={{
            background: "linear-gradient(135deg, #60a5fa 0%, #8b6ff7 50%, #ad2bee 100%)",
            WebkitBackgroundClip: "text",
            WebkitTextFillColor: "transparent",
            backgroundClip: "text",
          }}
        >
          Websight
        </a>

        {/* Desktop nav — middle column, truly centered on the viewport (equal 1fr tracks on both sides) */}
        <ul className="hidden md:flex items-center gap-8 justify-self-center">
          {NAV_LINKS.map((link, i) => {
            const total = NAV_LINKS.length - 1;
            const t = total === 0 ? 0 : i / total;
            // interpolate #60a5fa → #8b6ff7 → #ad2bee
            const r = Math.round(96  + (173 - 96)  * t);
            const g = Math.round(165 + (43  - 165) * t);
            const b = Math.round(250 + (238 - 250) * t);
            const color = `rgb(${r},${g},${b})`;
            return (
              <li key={link.label}>
                <a
                  href={link.href}
                  className="text-sm tracking-wide"
                  style={{ color: "rgba(251,251,244,0.6)", transition: "color 0.2s ease" }}
                  onMouseEnter={(e) => { (e.currentTarget as HTMLAnchorElement).style.color = color; }}
                  onMouseLeave={(e) => { (e.currentTarget as HTMLAnchorElement).style.color = "rgba(251,251,244,0.6)"; }}
                >
                  {link.label}
                </a>
              </li>
            );
          })}
        </ul>

        {/* Right column — CTA (desktop) + hamburger (mobile) */}
        <div className="flex items-center justify-self-end">
          <span className="nav-cta-wrap hidden md:inline-flex">
            <a href="#kontakt" className="nav-cta-inner">
              Gespräch aufnehmen
            </a>
          </span>

          <button
            className="md:hidden flex flex-col items-center justify-center gap-1.5 p-2.5"
            style={{ minWidth: 44, minHeight: 44 }}
            onClick={() => setMenuOpen(!menuOpen)}
            aria-label="Menü umschalten"
            aria-expanded={menuOpen}
            aria-controls="mobile-menu"
          >
            <span
              className="block w-6 h-px bg-cream transition-all duration-300"
              style={{
                transform: menuOpen ? "rotate(45deg) translate(2px, 2px)" : "none",
              }}
            />
            <span
              className="block w-6 h-px bg-cream transition-all duration-300"
              style={{ opacity: menuOpen ? 0 : 1 }}
            />
            <span
              className="block w-6 h-px bg-cream transition-all duration-300"
              style={{
                transform: menuOpen ? "rotate(-45deg) translate(2px, -2px)" : "none",
              }}
            />
          </button>
        </div>
      </nav>

      {/* Mobile menu overlay */}
      <div
        id="mobile-menu"
        aria-hidden={!menuOpen}
        className="fixed inset-0 z-40 bg-black flex flex-col items-center justify-center md:hidden transition-all duration-500"
        style={{
          opacity: menuOpen ? 1 : 0,
          visibility: menuOpen ? "visible" : "hidden",
          pointerEvents: menuOpen ? "all" : "none",
        }}
      >
        <ul className="flex flex-col items-center gap-8">
          {NAV_LINKS.map((link) => (
            <li key={link.label}>
              <a
                href={link.href}
                tabIndex={menuOpen ? 0 : -1}
                className="text-cream text-4xl font-bold tracking-tight hover:text-primary-blue transition-colors"
                onClick={() => setMenuOpen(false)}
              >
                {link.label}
              </a>
            </li>
          ))}
        </ul>
        <span className="nav-cta-wrap mt-10">
          <a href="#kontakt" tabIndex={menuOpen ? 0 : -1} className="nav-cta-inner" onClick={() => setMenuOpen(false)}>
            Gespräch aufnehmen
          </a>
        </span>
      </div>
    </>
  );
}
