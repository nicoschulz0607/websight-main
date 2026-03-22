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

  return (
    <>
      <nav
        ref={navRef}
        className="fixed top-0 left-0 right-0 z-50 flex items-center justify-between px-8 py-6 transition-all duration-500"
        style={{
          background: scrolled ? "rgba(0,0,0,0.7)" : "transparent",
          backdropFilter: scrolled ? "blur(12px)" : "none",
        }}
      >
        {/* Logo */}
        <a
          href="#"
          className="font-bold text-xl tracking-tight"
          style={{
            background: "linear-gradient(135deg, #60a5fa 0%, #8b6ff7 50%, #ad2bee 100%)",
            WebkitBackgroundClip: "text",
            WebkitTextFillColor: "transparent",
            backgroundClip: "text",
          }}
        >
          Websight
        </a>

        {/* Desktop nav */}
        <ul className="hidden md:flex items-center gap-8">
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

        {/* CTA */}
        <a
          href="#contact"
          className="hidden md:flex items-center gap-2 text-xs font-bold tracking-widest uppercase text-white transition-colors duration-200 border border-cream/25 hover:border-cream/60 rounded-full px-5 py-2"
        >
          Gespräch starten
        </a>

        {/* Mobile hamburger */}
        <button
          className="md:hidden flex flex-col gap-1.5 p-1"
          onClick={() => setMenuOpen(!menuOpen)}
          aria-label="Toggle menu"
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
      </nav>

      {/* Mobile menu overlay */}
      <div
        className="fixed inset-0 z-40 bg-black flex flex-col items-center justify-center md:hidden transition-all duration-500"
        style={{
          opacity: menuOpen ? 1 : 0,
          pointerEvents: menuOpen ? "all" : "none",
        }}
      >
        <ul className="flex flex-col items-center gap-8">
          {NAV_LINKS.map((link) => (
            <li key={link.label}>
              <a
                href={link.href}
                className="text-cream text-4xl font-bold tracking-tight hover:text-primary-blue transition-colors"
                onClick={() => setMenuOpen(false)}
              >
                {link.label}
              </a>
            </li>
          ))}
        </ul>
      </div>
    </>
  );
}
