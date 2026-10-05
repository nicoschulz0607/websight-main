"use client";

import { useEffect, useRef } from "react";
import { gsap, ScrollTrigger } from "@/lib/gsap";
import { HERO } from "@/lib/constants";

const LETTERS = HERO.wordmark.split("");

/**
 * Hero — die Wortmarke baut sich auf (Buchstaben steigen aus einer Maske, danach
 * ein ruhiger Lichtschimmer), dann Headline mit Wortwechsel, Unterzeile, CTAs.
 * Beim Scrollen wandert die Wortmarke (fixed Layer) per scrub in die Position des
 * Navbar-Logos und dockt dort an — erst dann wird das echte Navbar-Logo sichtbar.
 */
export default function Hero() {
  const sectionRef = useRef<HTMLElement>(null);
  const slotRef = useRef<HTMLDivElement>(null);
  const wmRef = useRef<HTMLDivElement>(null);
  const contentRef = useRef<HTMLDivElement>(null);
  const rotRef = useRef<HTMLSpanElement>(null);

  useEffect(() => {
    const section = sectionRef.current;
    const slot = slotRef.current;
    const wm = wmRef.current;
    const content = contentRef.current;
    const rot = rotRef.current;
    if (!section || !slot || !wm || !content || !rot) return;

    const navLogo = document.querySelector<HTMLElement>("[data-nav-logo]");
    const navText = document.querySelector<HTMLElement>("[data-nav-logo-text]");
    const letters = Array.from(wm.querySelectorAll<HTMLElement>(".hero-wm-letter"));
    const ins = Array.from(content.querySelectorAll<HTMLElement>(".hero-in"));
    const words = Array.from(rot.children) as HTMLElement[];
    const reduce = window.matchMedia("(prefers-reduced-motion: reduce)").matches;

    let alive = true;
    let timer: gsap.core.Tween | null = null;
    let heroVisible = true;
    let current = 0;

    const ctx = gsap.context(() => {}, section);

    /* ── Messen ─────────────────────────────────────────────────────────── */
    // Buchstaben-Offsets in em → jeder Buchstabe zeigt "seinen" Ausschnitt des
    // durchgehenden Brand-Gradients (wie bei einem einzigen Textelement).
    const measureLetters = () => {
      const fs = parseFloat(getComputedStyle(wm).fontSize) || 1;
      wm.style.setProperty("--ww", String(wm.offsetWidth / fs));
      letters.forEach((l) => l.style.setProperty("--lx", String(l.offsetLeft / fs)));
    };
    // Ruheposition der fixed Wortmarke = Platzhalter im Hero (Dokument-Koordinaten).
    const place = () => {
      const r = slot.getBoundingClientRect();
      wm.style.left = `${r.left}px`;
      wm.style.top = `${r.top + window.scrollY}px`;
    };
    const dockTarget = () => {
      const t = navText?.getBoundingClientRect();
      const wl = parseFloat(wm.style.left) || 0;
      const wt = parseFloat(wm.style.top) || 0;
      const fsW = parseFloat(getComputedStyle(wm).fontSize) || 1;
      const fsN = navText ? parseFloat(getComputedStyle(navText).fontSize) : 20;
      return {
        x: (t?.left ?? 32) - wl,
        y: (t?.top ?? 28) - wt,
        scale: fsN / fsW,
      };
    };
    const onRefreshInit = () => place();
    ScrollTrigger.addEventListener("refreshInit", onRefreshInit);

    /* ── Wortwechsel ────────────────────────────────────────────────────── */
    const syncRotation = () => {
      if (!timer) return;
      if (heroVisible && !document.hidden) timer.resume();
      else timer.pause();
    };
    const swap = () => {
      if (!alive) return;
      const a = words[current];
      current = (current + 1) % words.length;
      const b = words[current];
      gsap.to(a, { yPercent: -110, duration: 0.55, ease: "power3.in" });
      gsap.fromTo(
        b,
        { yPercent: 110, autoAlpha: 1 },
        { yPercent: 0, duration: 0.85, ease: "power3.out", delay: 0.32 },
      );
      timer = gsap.delayedCall(HERO.wordInterval, swap);
      syncRotation();
    };
    const startRotation = () => {
      if (!alive || reduce || words.length < 2) return;
      timer = gsap.delayedCall(HERO.wordInterval, swap);
      syncRotation();
    };
    const onVisibility = () => syncRotation();
    document.addEventListener("visibilitychange", onVisibility);

    /* ── Aufbau + Andocken (nach Font-Load, damit die Messung stimmt) ─────── */
    const fontsReady = Promise.race([
      document.fonts?.ready ?? Promise.resolve(),
      new Promise((r) => setTimeout(r, 900)),
    ]);

    fontsReady.then(() => {
      if (!alive) return;
      measureLetters();
      place();

      ctx.add(() => {
        if (navLogo) gsap.set(navLogo, { opacity: 0 });
        gsap.set(words.slice(1), { yPercent: 110, autoAlpha: 0 });

        // Sichtbarkeit des Heros → Wortwechsel pausieren, wenn er weg ist
        ScrollTrigger.create({
          trigger: section,
          start: "top bottom",
          end: "bottom top",
          onToggle: (self) => {
            heroVisible = self.isActive;
            syncRotation();
          },
        });

        if (reduce) {
          gsap.set(letters, { yPercent: 0, y: 0 });
          gsap.set(ins, { opacity: 1, y: 0 });
          // Wortmarke scrollt wie normaler Inhalt mit und blendet sanft über
          gsap.timeline({
            scrollTrigger: {
              trigger: section,
              start: "top top",
              end: () => `+=${window.innerHeight * 0.5}`,
              scrub: true,
              invalidateOnRefresh: true,
            },
          })
            .to(wm, { y: () => -window.innerHeight * 0.5, ease: "none", duration: 1 }, 0)
            .to(wm, { autoAlpha: 0, ease: "none", duration: 0.6 }, 0.4)
            .to(navLogo, { opacity: 1, ease: "none", duration: 0.6 }, 0.4);
          return;
        }

        // 1) Aufbau — ca. 2 s gesamt
        const intro = gsap.timeline({ delay: 0.12 });
        intro
          .fromTo(
            letters,
            { yPercent: 140, y: 0 },
            { yPercent: 0, duration: 0.95, ease: "expo.out", stagger: 0.055 },
            0,
          )
          .fromTo(
            wm,
            { "--shine": -2.2 * parseFloat(wm.style.getPropertyValue("--ww") || "4.6") },
            { "--shine": 0, duration: 1.15, ease: "power2.inOut" },
            0.85,
          )
          .fromTo(
            ins,
            { opacity: 0, y: 22 },
            { opacity: 1, y: 0, duration: 0.8, ease: "power3.out", stagger: 0.12 },
            0.95,
          )
          .call(startRotation, [], ">-0.2");

        // 2) Andocken ans Navbar-Logo — scrub, nur transform/opacity
        gsap.timeline({
          scrollTrigger: {
            trigger: section,
            start: "top top",
            end: () => `+=${Math.round(window.innerHeight * 0.55)}`,
            scrub: 1.5,
            invalidateOnRefresh: true,
          },
        })
          .to(wm, {
            x: () => dockTarget().x,
            y: () => dockTarget().y,
            scale: () => dockTarget().scale,
            ease: "power2.inOut",
            duration: 1,
          }, 0)
          .to(content, { autoAlpha: 0, y: -36, ease: "power1.in", duration: 0.45 }, 0)
          .to(navLogo, { opacity: 1, ease: "none", duration: 0.04 }, 0.96)
          .set(wm, { autoAlpha: 0 }, 1);

        ScrollTrigger.refresh();
      });
    });

    return () => {
      alive = false;
      timer?.kill();
      document.removeEventListener("visibilitychange", onVisibility);
      ScrollTrigger.removeEventListener("refreshInit", onRefreshInit);
      gsap.killTweensOf(words);
      ctx.revert();
      if (navLogo) navLogo.style.opacity = "";
    };
  }, []);

  return (
    <section
      ref={sectionRef}
      className="relative w-full overflow-hidden"
      style={{ minHeight: "100svh", background: "#000" }}
    >
      {/* ── Hintergrund: fast schwarz, feines Raster + sehr leiser Brand-Glow ── */}
      <div aria-hidden className="pointer-events-none absolute inset-0">
        <div
          className="absolute inset-0"
          style={{
            backgroundImage:
              "linear-gradient(rgba(251,251,244,0.035) 1px, transparent 1px), linear-gradient(90deg, rgba(251,251,244,0.035) 1px, transparent 1px)",
            backgroundSize: "72px 72px",
            backgroundPosition: "-1px -1px",
            WebkitMaskImage: "radial-gradient(ellipse 70% 60% at 30% 45%, #000 0%, transparent 75%)",
            maskImage: "radial-gradient(ellipse 70% 60% at 30% 45%, #000 0%, transparent 75%)",
          }}
        />
        <div
          className="absolute"
          style={{
            width: "min(90vw, 1100px)",
            aspectRatio: "1",
            right: "-18%",
            top: "-30%",
            background: "radial-gradient(closest-side, rgba(139,111,247,0.14), rgba(173,43,238,0.05) 55%, transparent 100%)",
          }}
        />
        <div
          className="absolute"
          style={{
            width: "min(80vw, 900px)",
            aspectRatio: "1",
            left: "-25%",
            bottom: "-45%",
            background: "radial-gradient(closest-side, rgba(96,165,250,0.09), transparent 100%)",
          }}
        />
        {/* Aurora: weicher, stark geblurter Brand-Verlauf hinter der Wortmarke */}
        <div className="hero-aurora" />
        {/* Rahmen: feine vertikale Linien an den Inhaltskanten + Divider mit Kreuzmarken */}
        <div className="hero-rails" />
        <div
          className="absolute bottom-0 left-0 right-0"
          style={{ height: "160px", background: "linear-gradient(to bottom, transparent, #000)" }}
        />
      </div>

      {/* ── Inhalt ── */}
      <div
        className="relative flex flex-col justify-center"
        style={{
          minHeight: "100svh",
          padding: "clamp(6.5rem, 15vh, 9rem) clamp(1.5rem, 6vw, 7rem) clamp(3rem, 9vh, 6rem)",
        }}
      >
        {/* Platzhalter: hält den Platz der (fixed) Wortmarke im Layout frei */}
        <div ref={slotRef} aria-hidden className="hero-wm-size" style={{ height: "1em", width: "1px" }} />

        <div
          ref={contentRef}
          className="grid items-start gap-x-12 gap-y-6 md:grid-cols-[minmax(0,1fr)_minmax(0,28rem)]"
          style={{ marginTop: "clamp(1.75rem, 4.5vh, 3.25rem)" }}
        >
          <h1
            className="hero-in font-bold text-cream"
            style={{
              fontSize: "clamp(2.4rem, 4.6vw, 4.5rem)",
              lineHeight: 1.04,
              letterSpacing: "-0.035em",
            }}
          >
            {HERO.prefix}{" "}
            <span className="sr-only">{HERO.words[0]}</span>
            <span ref={rotRef} aria-hidden className="hero-rot">
              {HERO.words.map((w) => (
                <span key={w}>{w}</span>
              ))}
            </span>
          </h1>

          <div className="flex flex-col gap-6">
            <p
              className="hero-in"
              style={{
                color: "rgba(251,251,244,0.6)",
                fontSize: "clamp(1rem, 1.25vw, 1.1rem)",
                lineHeight: 1.65,
                textWrap: "pretty",
                maxWidth: "26rem",
              }}
            >
              {HERO.sub}
            </p>
            <div className="hero-in flex flex-wrap items-center gap-x-6 gap-y-1">
              <a href={HERO.ctaPrimary.href} className="btn-cream">
                {HERO.ctaPrimary.label}
                <span aria-hidden className="arrow">→</span>
              </a>
              <a href={HERO.ctaSecondary.href} className="link-quiet">
                {HERO.ctaSecondary.label}
                <span aria-hidden>↓</span>
              </a>
            </div>
          </div>

          <ul className="hero-in hero-facts md:col-span-2" aria-label="Was jede Website mitbringt">
            {HERO.facts.map((f) => (
              <li key={f}>{f}</li>
            ))}
          </ul>
        </div>
      </div>

      {/* ── Wortmarke: fixed Layer, damit sie ohne Scroll-Ruckeln an die Navbar andocken kann ── */}
      <div className="hero-wm-layer" aria-hidden>
        <div ref={wmRef} className="hero-wm hero-wm-size">
          {LETTERS.map((ch, i) => (
            <span key={i} className="hero-wm-mask">
              <span className="hero-wm-letter">{ch}</span>
            </span>
          ))}
        </div>
      </div>
      <p className="sr-only">{HERO.wordmark}</p>
    </section>
  );
}
