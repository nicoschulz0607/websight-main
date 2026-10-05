"use client";

import { useEffect, useRef } from "react";
import Image from "next/image";
import { gsap } from "@/lib/gsap";
import { PROJECTS, TESTIMONIALS, WORK_SECTION, type Project } from "@/lib/constants";
import { BrowserFrame, PhoneFrame } from "@/components/visuals/Devices";

const PAD_X = "clamp(1.5rem, 9vw, 8.5rem)";
const GRADIENT = "linear-gradient(135deg, #60a5fa 0%, #8b6ff7 50%, #ad2bee 100%)";
const LINE = "1px solid rgba(251,251,244,0.08)";

/** Video läuft nur, solange es sichtbar ist (und nie bei reduced motion). */
function useVisiblePlayback(ref: React.RefObject<HTMLVideoElement | null>) {
  useEffect(() => {
    const v = ref.current;
    if (!v) return;
    if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) return;
    const io = new IntersectionObserver(
      ([e]) => {
        if (e.isIntersecting) {
          if (v.preload === "none") v.preload = "auto";
          v.play().catch(() => {});
        } else {
          v.pause();
        }
      },
      { threshold: 0.25 },
    );
    io.observe(v);
    return () => io.disconnect();
  }, [ref]);
}

function CaseStudy({ project }: { project: Project }) {
  const rootRef = useRef<HTMLElement>(null);
  const stageRef = useRef<HTMLDivElement>(null);
  const browserRef = useRef<HTMLDivElement>(null);
  const phoneRef = useRef<HTMLDivElement>(null);
  const videoRef = useRef<HTMLVideoElement>(null);
  useVisiblePlayback(videoRef);

  const quote = project.quoteBy ? TESTIMONIALS.find((t) => t.name === project.quoteBy) : undefined;
  const media = project.media ?? {};

  useEffect(() => {
    const ctx = gsap.context(() => {
      const mm = gsap.matchMedia();
      mm.add("(prefers-reduced-motion: no-preference)", () => {
        // Bühne öffnet sich per clip-path, Text folgt gestaffelt
        gsap.fromTo(
          browserRef.current,
          { clipPath: "inset(8% 6% 8% 6% round 14px)", autoAlpha: 0.4 },
          {
            clipPath: "inset(0% 0% 0% 0% round 14px)", autoAlpha: 1,
            duration: 1.1, ease: "expo.out", clearProps: "clipPath",
            scrollTrigger: { trigger: stageRef.current, start: "top 80%", once: true },
          },
        );
        if (phoneRef.current) {
          gsap.fromTo(
            phoneRef.current,
            { autoAlpha: 0, y: 60 },
            {
              autoAlpha: 1, y: 0, duration: 1, ease: "power3.out", delay: 0.25,
              scrollTrigger: { trigger: stageRef.current, start: "top 80%", once: true },
            },
          );
          // Ruhige Parallaxe: Handy läuft minimal schneller als der Browser
          gsap.fromTo(
            phoneRef.current.firstElementChild,
            { yPercent: 8 },
            {
              yPercent: -8, ease: "none",
              scrollTrigger: { trigger: stageRef.current, start: "top bottom", end: "bottom top", scrub: 1.5 },
            },
          );
        }
        gsap.fromTo(
          rootRef.current?.querySelectorAll(".fw-in") ?? [],
          { autoAlpha: 0, y: 40 },
          {
            autoAlpha: 1, y: 0, duration: 0.7, ease: "power3.out", stagger: 0.08,
            scrollTrigger: { trigger: rootRef.current?.querySelector(".fw-meta"), start: "top 80%", once: true },
          },
        );
      });
    }, rootRef);
    return () => ctx.revert();
  }, []);

  return (
    <article
      ref={rootRef}
      className="grid gap-y-12 lg:grid-cols-12 lg:gap-x-16 lg:items-center"
      style={{ padding: `0 ${PAD_X}` }}
    >
      {/* ── Bühne: echte Seite im Browser + echter Handy-Screenshot ── */}
      <div ref={stageRef} className="relative lg:col-span-7" style={{ fontSize: "clamp(11px, 1.15vw, 16px)", paddingBottom: "8%" }}>
        <div ref={browserRef}>
          <BrowserFrame url={project.displayUrl}>
            <div className="relative" style={{ aspectRatio: "16 / 10", background: "#0b0b0b" }}>
              {media.video ? (
                <video
                  ref={videoRef}
                  className="absolute inset-0 h-full w-full object-cover"
                  poster={media.video.poster}
                  muted
                  loop
                  playsInline
                  preload="none"
                  aria-label={`Bildschirmaufnahme von ${project.displayUrl ?? project.title}`}
                >
                  {media.video.webm && <source src={media.video.webm} type="video/webm" />}
                  {media.video.mp4 && <source src={media.video.mp4} type="video/mp4" />}
                </video>
              ) : media.desktop ? (
                <Image src={media.desktop} alt={`Startseite von ${project.title}`} fill sizes="(min-width:1024px) 55vw, 90vw" className="object-cover object-top" />
              ) : null}
            </div>
          </BrowserFrame>
        </div>

        {media.mobile && (
          <div
            ref={phoneRef}
            className="absolute"
            style={{ right: "-4%", bottom: 0, width: "26%", minWidth: 92 }}
          >
            <div style={{ willChange: "transform" }}>
              <PhoneFrame style={{ fontSize: "clamp(6px, 0.75vw, 11px)" }}>
                <div className="relative" style={{ aspectRatio: "9 / 19" }}>
                  <Image
                    src={media.mobile}
                    alt={`${project.title} auf dem Handy`}
                    fill
                    sizes="(min-width:1024px) 16vw, 28vw"
                    className="object-cover object-top"
                  />
                </div>
              </PhoneFrame>
            </div>
          </div>
        )}
      </div>

      {/* ── Fakten + echtes Kundenzitat ── */}
      <div className="fw-meta lg:col-span-5">
        <div className="fw-in flex items-center gap-3" style={{ marginBottom: "1.25rem" }}>
          <span style={{ fontFamily: "ui-monospace, monospace", fontSize: "0.65rem", letterSpacing: "0.25em", color: project.accentColor }}>
            {project.number}
          </span>
          <span
            className="inline-flex items-center gap-2"
            style={{
              fontSize: "0.65rem", letterSpacing: "0.2em", textTransform: "uppercase",
              color: "rgba(251,251,244,0.55)", fontFamily: "ui-monospace, monospace",
            }}
          >
            <span style={{ width: 6, height: 6, borderRadius: 9999, background: "#4ade80" }} />
            {WORK_SECTION.statusLabels[project.status]}
          </span>
        </div>

        <h3
          className="fw-in text-cream"
          style={{ fontSize: "clamp(2.4rem, 4.2vw, 3.8rem)", fontWeight: 700, letterSpacing: "-0.04em", lineHeight: 1 }}
        >
          {project.title}
        </h3>
        <p className="fw-in" style={{ marginTop: "0.9rem", color: "rgba(251,251,244,0.6)", fontSize: "clamp(1rem, 1.25vw, 1.15rem)", lineHeight: 1.6 }}>
          {project.subtitle}
        </p>

        <dl className="fw-in grid grid-cols-2 gap-x-6" style={{ marginTop: "2rem", borderTop: LINE }}>
          {project.industry && (
            <div style={{ paddingTop: "1rem" }}>
              <dt style={{ fontSize: "0.65rem", letterSpacing: "0.22em", textTransform: "uppercase", color: "rgba(251,251,244,0.35)", fontFamily: "ui-monospace, monospace" }}>Branche</dt>
              <dd style={{ marginTop: "0.4rem", color: "rgba(251,251,244,0.85)", fontSize: "0.95rem" }}>{project.industry}</dd>
            </div>
          )}
          <div style={{ paddingTop: "1rem" }}>
            <dt style={{ fontSize: "0.65rem", letterSpacing: "0.22em", textTransform: "uppercase", color: "rgba(251,251,244,0.35)", fontFamily: "ui-monospace, monospace" }}>Leistung</dt>
            <dd style={{ marginTop: "0.4rem", color: "rgba(251,251,244,0.85)", fontSize: "0.95rem" }}>{project.tags.join(" · ")}</dd>
          </div>
        </dl>

        {project.href && (
          <a href={project.href} target="_blank" rel="noopener noreferrer" className="fw-in link-quiet" style={{ marginTop: "1.25rem" }}>
            {WORK_SECTION.liveLabel} <span aria-hidden>↗</span>
          </a>
        )}

        {quote && (
          <figure className="fw-in" style={{ marginTop: "2rem", paddingLeft: "1.25rem", position: "relative" }}>
            <span aria-hidden className="absolute left-0 top-1 bottom-1" style={{ width: 1, background: GRADIENT }} />
            <blockquote style={{ color: "rgba(251,251,244,0.8)", fontSize: "clamp(1rem, 1.15vw, 1.1rem)", lineHeight: 1.7, textWrap: "pretty" }}>
              „{quote.quote}“
            </blockquote>
            <figcaption className="flex items-center gap-3" style={{ marginTop: "1.1rem" }}>
              {quote.image && (
                <Image src={quote.image} alt={quote.name} width={40} height={40} className="viz-img rounded-full object-cover" style={{ width: 40, height: 40 }} />
              )}
              <span style={{ fontSize: "0.85rem", lineHeight: 1.4 }}>
                <span className="block text-cream" style={{ fontWeight: 600 }}>{quote.name}</span>
                <span style={{ color: "rgba(251,251,244,0.45)" }}>{quote.role}, {quote.company}</span>
              </span>
            </figcaption>
          </figure>
        )}
      </div>

      {/* Optional: Vorher/Nachher (für künftige Pitch-Referenzen) */}
      {project.vorher && project.nachher && (
        <div className="grid gap-6 sm:grid-cols-2 lg:col-span-12" style={{ fontSize: "clamp(10px, 1vw, 14px)" }}>
          {[{ label: "Vorher", src: project.vorher }, { label: "Nachher", src: project.nachher }].map((b) => (
            <figure key={b.label}>
              <BrowserFrame url={project.displayUrl}>
                <div className="relative" style={{ aspectRatio: "16 / 10" }}>
                  <Image src={b.src} alt={`${project.title} – ${b.label}`} fill sizes="(min-width:640px) 45vw, 90vw" className="object-cover object-top" />
                </div>
              </BrowserFrame>
              <figcaption style={{ marginTop: "0.75rem", fontSize: "0.65rem", letterSpacing: "0.22em", textTransform: "uppercase", color: "rgba(251,251,244,0.45)", fontFamily: "ui-monospace, monospace" }}>
                {b.label}
              </figcaption>
            </figure>
          ))}
        </div>
      )}
    </article>
  );
}

/** Ehrliche Karte für Projekte in Arbeit — rein typografisch, kein Fake-Screen. */
function ProjectRow({ project }: { project: Project }) {
  return (
    <div
      className="fw-row grid items-baseline gap-x-6 gap-y-2 md:grid-cols-[4rem_minmax(0,1fr)_auto]"
      style={{ padding: "1.75rem 0", borderTop: LINE }}
    >
      <span style={{ fontFamily: "ui-monospace, monospace", fontSize: "0.65rem", letterSpacing: "0.25em", color: project.accentColor }}>
        {project.number}
      </span>
      <div>
        <h3 className="text-cream" style={{ fontSize: "clamp(1.5rem, 2.6vw, 2.25rem)", fontWeight: 700, letterSpacing: "-0.03em", lineHeight: 1.1 }}>
          {project.title}
        </h3>
        <p style={{ marginTop: "0.35rem", color: "rgba(251,251,244,0.45)", fontSize: "0.95rem" }}>
          {project.subtitle} <span style={{ color: "rgba(251,251,244,0.3)" }}>· {project.tags.join(" · ")}</span>
        </p>
      </div>
      <span
        className="inline-flex items-center gap-2 justify-self-start md:justify-self-end"
        style={{
          fontSize: "0.65rem", letterSpacing: "0.2em", textTransform: "uppercase", fontFamily: "ui-monospace, monospace",
          color: "rgba(251,251,244,0.6)", padding: "0.4rem 0.75rem", borderRadius: 9999,
          boxShadow: "0 0 0 1px rgba(251,251,244,0.12)",
        }}
      >
        <span style={{ width: 6, height: 6, borderRadius: 9999, background: project.accentColor }} />
        {WORK_SECTION.statusLabels[project.status]}
      </span>
    </div>
  );
}

export default function FeaturedWork() {
  const headRef = useRef<HTMLDivElement>(null);
  const listRef = useRef<HTMLDivElement>(null);
  const live = PROJECTS.filter((p) => p.status === "live" && (p.media?.video || p.media?.desktop));
  const rest = PROJECTS.filter((p) => !live.includes(p));

  useEffect(() => {
    const ctx = gsap.context(() => {
      const mm = gsap.matchMedia();
      mm.add("(prefers-reduced-motion: no-preference)", () => {
        gsap.fromTo(
          headRef.current?.children ?? [],
          { autoAlpha: 0, y: 40 },
          { autoAlpha: 1, y: 0, duration: 0.7, ease: "power3.out", stagger: 0.08, scrollTrigger: { trigger: headRef.current, start: "top 75%", once: true } },
        );
        gsap.fromTo(
          listRef.current?.querySelectorAll(".fw-row") ?? [],
          { autoAlpha: 0, y: 40 },
          { autoAlpha: 1, y: 0, duration: 0.7, ease: "power3.out", stagger: 0.08, scrollTrigger: { trigger: listRef.current, start: "top 80%", once: true } },
        );
      });
    });
    return () => ctx.revert();
  }, []);

  return (
    <section id="work" className="relative" style={{ background: "#000", padding: "clamp(5rem, 11vw, 10rem) 0", overflowX: "clip" }}>
      <div ref={headRef} style={{ padding: `0 ${PAD_X}`, marginBottom: "clamp(3rem, 7vw, 6rem)" }}>
        <p
          className="flex items-center gap-3"
          style={{ fontSize: "0.65rem", letterSpacing: "0.25em", textTransform: "uppercase", color: "rgba(251,251,244,0.4)", fontFamily: "ui-monospace, monospace" }}
        >
          <span style={{ width: 24, height: 1, background: GRADIENT }} />
          {WORK_SECTION.overline}
        </p>
        <h2
          className="text-cream"
          style={{ marginTop: "1.1rem", fontSize: "clamp(2.8rem, 6vw, 5.5rem)", fontWeight: 700, letterSpacing: "-0.04em", lineHeight: 1 }}
        >
          {WORK_SECTION.title}{" "}
          <span className="gradient-text" style={{ background: GRADIENT, WebkitBackgroundClip: "text", backgroundClip: "text" }}>
            {WORK_SECTION.titleAccent}
          </span>
        </h2>
        <p style={{ marginTop: "1.1rem", color: "rgba(251,251,244,0.5)", fontSize: "clamp(1rem, 1.25vw, 1.15rem)", lineHeight: 1.7, maxWidth: "34rem" }}>
          {WORK_SECTION.intro}
        </p>
      </div>

      <div className="flex flex-col" style={{ gap: "clamp(5rem, 10vw, 9rem)" }}>
        {live.map((p) => (
          <CaseStudy key={p.id} project={p} />
        ))}
      </div>

      <div ref={listRef} style={{ padding: `0 ${PAD_X}`, marginTop: "clamp(4rem, 8vw, 7rem)" }}>
        {rest.map((p) => (
          <ProjectRow key={p.id} project={p} />
        ))}
        <a
          href={WORK_SECTION.nextHref}
          className="fw-row group grid items-baseline gap-x-6 gap-y-2 md:grid-cols-[4rem_minmax(0,1fr)_auto]"
          style={{ padding: "1.75rem 0", borderTop: LINE, borderBottom: LINE, textDecoration: "none" }}
        >
          <span style={{ fontFamily: "ui-monospace, monospace", fontSize: "0.65rem", letterSpacing: "0.25em", color: "rgba(251,251,244,0.3)" }}>
            {String(PROJECTS.length + 1).padStart(2, "0")}
          </span>
          <span style={{ fontSize: "clamp(1.5rem, 2.6vw, 2.25rem)", fontWeight: 700, letterSpacing: "-0.03em", lineHeight: 1.1, color: "rgba(251,251,244,0.35)" }}>
            {WORK_SECTION.nextTitle}
          </span>
          <span className="link-quiet justify-self-start md:justify-self-end">
            {WORK_SECTION.nextCta} <span aria-hidden>→</span>
          </span>
        </a>
      </div>
    </section>
  );
}
