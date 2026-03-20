"use client";

import { useEffect, useRef } from "react";
import { gsap, ScrollTrigger } from "@/lib/gsap";

const TICKER_TEXT = "STRATEGY · DESIGN · DIGITAL · EXPERIENCE · MOTION · WEBSIGHT · ";

export default function Footer() {
  const footerRef = useRef<HTMLElement>(null);
  const bannerRef = useRef<HTMLDivElement>(null);
  const tickerAnim = useRef<gsap.core.Tween | null>(null);

  useEffect(() => {
    const ctx = gsap.context(() => {
      // Reveal animation
      gsap.fromTo(
        footerRef.current,
        { opacity: 0, y: 40 },
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

      // Ticker banner
      if (bannerRef.current) {
        tickerAnim.current = gsap.to(bannerRef.current, {
          x: "-50%",
          duration: 25,
          ease: "none",
          repeat: -1,
        });
      }
    }, footerRef);

    return () => ctx.revert();
  }, []);

  return (
    <footer ref={footerRef} className="border-t border-cream/10 mt-32">
      {/* Main footer content */}
      <div className="px-8 py-20">
        <div className="flex flex-col md:flex-row justify-between items-start gap-16">
          {/* Brand */}
          <div className="flex-1">
            <p className="text-[8vw] font-bold text-cream leading-none tracking-tight mb-4">
              Websight
            </p>
            <p className="text-cream/40 text-sm max-w-xs leading-relaxed">
              People-first digital agency crafting experiences that matter.
            </p>
          </div>

          {/* Links */}
          <div className="flex gap-16">
            <div>
              <p className="text-cream/30 text-xs tracking-widest uppercase mb-4">Navigate</p>
              <ul className="flex flex-col gap-3">
                {["Work", "Services", "About", "Contact"].map((item) => (
                  <li key={item}>
                    <a
                      href={`#${item.toLowerCase()}`}
                      className="text-cream/60 hover:text-cream text-sm transition-colors"
                    >
                      {item}
                    </a>
                  </li>
                ))}
              </ul>
            </div>
            <div>
              <p className="text-cream/30 text-xs tracking-widest uppercase mb-4">Connect</p>
              <ul className="flex flex-col gap-3">
                {["Instagram", "LinkedIn", "Behance", "Dribbble"].map((item) => (
                  <li key={item}>
                    <a
                      href="#"
                      className="text-cream/60 hover:text-cream text-sm transition-colors"
                    >
                      {item}
                    </a>
                  </li>
                ))}
              </ul>
            </div>
          </div>

          {/* Contact CTA */}
          <div className="flex flex-col gap-4">
            <p className="text-cream/30 text-xs tracking-widest uppercase">Say Hello</p>
            <a
              href="mailto:hello@websight.studio"
              className="text-cream/80 hover:text-cream text-sm transition-colors"
            >
              hello@websight.studio
            </a>
            <a
              href="#contact"
              className="mt-2 inline-flex items-center justify-center border border-cream/20 hover:border-primary-purple hover:text-primary-purple text-cream text-sm rounded-full px-6 py-3 transition-all duration-300"
            >
              Start a project →
            </a>
          </div>
        </div>

        {/* Bottom bar */}
        <div className="flex flex-col md:flex-row justify-between items-center gap-4 pt-12 mt-12 border-t border-cream/10">
          <p className="text-cream/30 text-xs">© 2025 Websight. All rights reserved.</p>
          <p className="text-cream/30 text-xs">Designed & Built with purpose.</p>
        </div>
      </div>

      {/* Scrolling ticker banner */}
      <div className="overflow-hidden border-t border-cream/10 py-5">
        <div ref={bannerRef} className="flex whitespace-nowrap gap-0">
          <span className="text-cream/20 text-sm tracking-[0.3em] uppercase">{TICKER_TEXT}</span>
          <span className="text-cream/20 text-sm tracking-[0.3em] uppercase">{TICKER_TEXT}</span>
          <span className="text-cream/20 text-sm tracking-[0.3em] uppercase">{TICKER_TEXT}</span>
          <span className="text-cream/20 text-sm tracking-[0.3em] uppercase">{TICKER_TEXT}</span>
        </div>
      </div>
    </footer>
  );
}
