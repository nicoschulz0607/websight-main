"use client";

import { useState, useRef, useEffect } from "react";
import Link from "next/link";
import gsap from "gsap";
import { ScrollTrigger } from "@/lib/gsap";

gsap.registerPlugin(ScrollTrigger);

type Status = "idle" | "loading" | "success" | "error";

const LOADING_TEXTS = ["Analysiere…", "Verarbeite…", "Fast fertig…"];

export default function Contact() {
  const [formData, setFormData] = useState({ name: "", email: "", message: "" });
  const [status, setStatus]     = useState<Status>("idle");
  const [loadingIdx, setLoadingIdx] = useState(0);

  const sectionRef     = useRef<HTMLElement>(null);
  const cardWrapperRef = useRef<HTMLDivElement>(null);
  const shineRef       = useRef<HTMLDivElement>(null);
  const formRef        = useRef<HTMLFormElement>(null);
  const submitBtnRef   = useRef<HTMLButtonElement>(null);
  const successRef     = useRef<HTMLDivElement>(null);
  const checkRef       = useRef<SVGPolylineElement>(null);

  /* ── Border glow ─────────────────────────────────────────── */
  const handleMouseMove = (e: React.MouseEvent<HTMLDivElement>) => {
    const rect = cardWrapperRef.current?.getBoundingClientRect();
    if (!rect) return;
    const x = (e.clientX - rect.left) / rect.width;
    const y = (e.clientY - rect.top)  / rect.height;
    if (shineRef.current)
      shineRef.current.style.background =
        `radial-gradient(circle at ${x * 100}% ${y * 100}%, rgba(255,255,255,0.045) 0%, transparent 60%)`;
    if (cardWrapperRef.current)
      cardWrapperRef.current.style.background =
        `radial-gradient(circle at ${x * 100}% ${y * 100}%, rgba(200,80,255,1) 0%, rgba(173,43,238,1) 8%, rgba(139,111,247,0.7) 20%, rgba(20,20,20,1) 40%)`;
  };

  const handleMouseLeave = () => {
    if (shineRef.current) shineRef.current.style.background = "none";
    if (cardWrapperRef.current) cardWrapperRef.current.style.background = "rgba(251,251,244,0.07)";
  };

  /* ── Scroll reveal ───────────────────────────────────────── */
  useEffect(() => {
    if (!sectionRef.current) return;
    const ctx = gsap.context(() => {
      gsap.from(".c-reveal", {
        opacity: 0, y: 50, duration: 0.9, stagger: 0.12, ease: "power3.out",
        scrollTrigger: { trigger: sectionRef.current, start: "top 78%" },
      });
    }, sectionRef);
    return () => ctx.revert();
  }, []);

  /* ── Loading text cycle ──────────────────────────────────── */
  useEffect(() => {
    if (status !== "loading") { setLoadingIdx(0); return; }
    let i = 0;
    const id = setInterval(() => { i = (i + 1) % LOADING_TEXTS.length; setLoadingIdx(i); }, 1000);
    return () => clearInterval(id);
  }, [status]);

  /* ── Success animation ───────────────────────────────────── */
  useEffect(() => {
    if (status !== "success" || !successRef.current) return;
    gsap.fromTo(successRef.current,
      { opacity: 0, y: 28 },
      { opacity: 1, y: 0, duration: 0.55, ease: "power3.out" }
    );
    if (checkRef.current) {
      gsap.fromTo(checkRef.current,
        { strokeDashoffset: 30 },
        { strokeDashoffset: 0, duration: 0.55, ease: "power2.out", delay: 0.3 }
      );
    }
  }, [status]);

  /* ── Submit ──────────────────────────────────────────────── */
  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    // Micro-bounce on button
    if (submitBtnRef.current)
      gsap.to(submitBtnRef.current, { scale: 0.95, duration: 0.1, yoyo: true, repeat: 1, ease: "power2.inOut" });

    setStatus("loading");

    try {
      const res = await fetch("/api/contact", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(formData),
      });
      if (!res.ok) throw new Error();

      // Stagger form fields out before switching state
      if (formRef.current) {
        const fields = [...formRef.current.querySelectorAll(".contact-field, .submit-btn-wrap")];
        await new Promise<void>((resolve) => {
          gsap.to(fields, { opacity: 0, y: -14, stagger: 0.07, duration: 0.28, ease: "power2.in", onComplete: resolve });
        });
      }

      setFormData({ name: "", email: "", message: "" });
      setStatus("success");
    } catch {
      setStatus("error");
    }
  };

  return (
    <section
      ref={sectionRef}
      id="kontakt"
      style={{
        background: "#000",
        padding: "clamp(5rem, 10vw, 9rem) clamp(1.5rem, 6vw, 7rem)",
        position: "relative",
        overflow: "hidden",
      }}
    >
      {/* Radial glow backdrop */}
      <div aria-hidden style={{
        position: "absolute", inset: 0,
        background:
          "radial-gradient(ellipse 60% 50% at 80% 60%, rgba(173,43,238,0.08) 0%, transparent 65%), " +
          "radial-gradient(ellipse 40% 40% at 20% 40%, rgba(96,165,250,0.06) 0%, transparent 65%)",
        pointerEvents: "none",
      }} />

      <div style={{
        maxWidth: "1280px", margin: "0 auto",
        display: "flex", flexDirection: "row",
        gap: "clamp(2.5rem, 6vw, 6rem)", alignItems: "center", flexWrap: "wrap",
      }}>

        {/* ── Left ─────────────────────────────────────────── */}
        <div className="c-reveal" style={{ flex: "1 1 300px", minWidth: 0, width: "100%" }}>
          <span style={{
            display: "block", fontSize: "0.7rem", fontWeight: 700,
            letterSpacing: "0.3em", textTransform: "uppercase", color: "#60a5fa", marginBottom: "1.5rem",
          }}>Bereit zu starten</span>

          <h2 style={{
            fontSize: "clamp(2.2rem, 4vw, 4.5rem)", fontWeight: 800,
            lineHeight: 1.08, letterSpacing: "-0.03em", color: "#fbfbf4", marginBottom: "1.5rem",
          }}>
            Lass uns dein{" "}
            <span style={{
              background: "linear-gradient(135deg, #60a5fa 0%, #8b6ff7 50%, #ad2bee 100%)",
              WebkitBackgroundClip: "text", WebkitTextFillColor: "transparent", backgroundClip: "text",
            }}>Potenzial</span>{" "}analysieren.
          </h2>

          <p style={{
            fontSize: "clamp(0.95rem, 1.3vw, 1.1rem)", color: "rgba(251,251,244,0.5)",
            lineHeight: 1.7, maxWidth: "420px", marginBottom: "1.5rem",
          }}>
            Vereinbare ein kostenloses Erstgespräch oder starte direkt mit einer High-Impact Digital-Strategie.
          </p>

          <Link
            href="/anfragen"
            style={{
              display: "inline-flex", alignItems: "center", gap: "0.5rem",
              fontSize: "0.75rem", fontWeight: 700,
              letterSpacing: "0.1em", textTransform: "uppercase",
              padding: "0.75rem 1.5rem", borderRadius: 999,
              border: "1px solid rgba(139,111,247,0.35)",
              color: "#8b6ff7", textDecoration: "none",
              marginBottom: "2.5rem",
              transition: "border-color 0.2s, background 0.2s, color 0.2s",
            }}
            onMouseEnter={(e) => {
              (e.currentTarget as HTMLAnchorElement).style.borderColor = "rgba(139,111,247,0.7)";
              (e.currentTarget as HTMLAnchorElement).style.background = "rgba(139,111,247,0.08)";
              (e.currentTarget as HTMLAnchorElement).style.color = "#ad2bee";
            }}
            onMouseLeave={(e) => {
              (e.currentTarget as HTMLAnchorElement).style.borderColor = "rgba(139,111,247,0.35)";
              (e.currentTarget as HTMLAnchorElement).style.background = "transparent";
              (e.currentTarget as HTMLAnchorElement).style.color = "#8b6ff7";
            }}
          >
            Projekt berechnen
            <svg width="13" height="13" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
              <path d="M7 17 17 7M7 7h10v10"/>
            </svg>
          </Link>

          <div style={{ display: "flex", flexDirection: "column", gap: "0.75rem" }}>
            {[
              {
                href: "mailto:nico@websight-design.de", label: "E-Mail", value: "nico@websight-design.de",
                accent: "#60a5fa", accentBg: "rgba(96,165,250,0.08)", accentBorder: "rgba(96,165,250,0.25)",
                icon: <svg width="15" height="15" viewBox="0 0 24 24" fill="none" stroke="#60a5fa" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><rect x="2" y="4" width="20" height="16" rx="2"/><path d="m22 7-8.97 5.7a1.94 1.94 0 0 1-2.06 0L2 7"/></svg>,
              },
              {
                href: "tel:+491729249820", label: "Telefon", value: "+49 172 9249820",
                accent: "#8b6ff7", accentBg: "rgba(139,111,247,0.08)", accentBorder: "rgba(139,111,247,0.25)",
                icon: <svg width="15" height="15" viewBox="0 0 24 24" fill="none" stroke="#8b6ff7" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M22 16.92v3a2 2 0 0 1-2.18 2 19.79 19.79 0 0 1-8.63-3.07A19.5 19.5 0 0 1 4.69 12a19.79 19.79 0 0 1-3.07-8.67A2 2 0 0 1 3.6 1.27h3a2 2 0 0 1 2 1.72c.127.96.361 1.903.7 2.81a2 2 0 0 1-.45 2.11L7.91 8.91a16 16 0 0 0 6 6l.91-.91a2 2 0 0 1 2.11-.45c.907.339 1.85.573 2.81.7A2 2 0 0 1 21.73 16.92z"/></svg>,
              },
              {
                href: "https://wa.me/491729249820", label: "WhatsApp", value: "Direkt schreiben",
                accent: "#25d366", accentBg: "rgba(37,211,102,0.08)", accentBorder: "rgba(37,211,102,0.25)",
                target: "_blank",
                icon: <svg width="15" height="15" viewBox="0 0 24 24" fill="#25d366"><path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 0 1-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 0 1-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 0 1 2.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0 0 12.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 0 0 5.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 0 0-3.48-8.413z"/></svg>,
              },
            ].map((btn) => (
              <a
                key={btn.label} href={btn.href} target={(btn as {target?: string}).target}
                rel={(btn as {target?: string}).target ? "noopener noreferrer" : undefined}
                style={{ display: "flex", alignItems: "center", gap: "1rem", padding: "0.5rem 0",
                  background: "none", border: "none", textDecoration: "none",
                  transition: "transform 0.2s, opacity 0.2s", opacity: 0.75 }}
                onMouseEnter={(e) => { (e.currentTarget as HTMLAnchorElement).style.transform = "translateX(5px)"; (e.currentTarget as HTMLAnchorElement).style.opacity = "1"; }}
                onMouseLeave={(e) => { (e.currentTarget as HTMLAnchorElement).style.transform = "translateX(0)"; (e.currentTarget as HTMLAnchorElement).style.opacity = "0.75"; }}
              >
                <span style={{ width: 36, height: 36, borderRadius: "0.6rem", background: btn.accentBg,
                  border: `1px solid ${btn.accentBorder}`, display: "flex", alignItems: "center", justifyContent: "center", flexShrink: 0 }}>
                  {btn.icon}
                </span>
                <div style={{ minWidth: 0 }}>
                  <div style={{ fontSize: "0.7rem", fontWeight: 600, letterSpacing: "0.1em", textTransform: "uppercase", color: btn.accent, marginBottom: "0.1rem" }}>{btn.label}</div>
                  <div style={{ fontSize: "0.9rem", color: "rgba(251,251,244,0.8)", fontWeight: 500, whiteSpace: "nowrap", overflow: "hidden", textOverflow: "ellipsis" }}>{btn.value}</div>
                </div>
              </a>
            ))}
          </div>
        </div>

        {/* ── Right: Form card ──────────────────────────────── */}
        <div
          ref={cardWrapperRef}
          className="c-reveal"
          onMouseMove={handleMouseMove}
          onMouseLeave={handleMouseLeave}
          style={{
            flex: "1 1 300px", minWidth: 0, width: "100%",
            borderRadius: "1.5rem", padding: "1px",
            background: "rgba(251,251,244,0.07)",
          }}
        >
          <div style={{
            background: "#0d0d0d", borderRadius: "calc(1.5rem - 1px)",
            padding: "clamp(1.75rem, 4vw, 3rem)", position: "relative", overflow: "hidden",
          }}>
            {/* Shine overlay */}
            <div ref={shineRef} aria-hidden style={{
              position: "absolute", inset: 0, borderRadius: "1.5rem", pointerEvents: "none", zIndex: 0,
            }} />

            {/* ── Success state ─────────────────────────────── */}
            {status === "success" && (
              <div ref={successRef} style={{
                display: "flex", flexDirection: "column", alignItems: "center",
                justifyContent: "center", gap: "1.5rem", padding: "3.5rem 1.5rem",
                textAlign: "center", position: "relative", zIndex: 1, opacity: 0,
              }}>
                {/* Ambient glow behind icon */}
                <div aria-hidden style={{
                  position: "absolute", top: "10%", left: "50%", transform: "translateX(-50%)",
                  width: 220, height: 220, borderRadius: "50%",
                  background: "radial-gradient(circle, rgba(139,111,247,0.18) 0%, transparent 70%)",
                  pointerEvents: "none",
                }} />

                {/* Icon */}
                <div style={{ position: "relative" }}>
                  {/* Outer ring */}
                  <div style={{
                    position: "absolute", inset: -6, borderRadius: "50%",
                    background: "linear-gradient(135deg, rgba(96,165,250,0.3), rgba(173,43,238,0.3))",
                    filter: "blur(4px)",
                  }} />
                  <div style={{
                    width: 68, height: 68, borderRadius: "50%", position: "relative",
                    background: "linear-gradient(135deg, #60a5fa 0%, #8b6ff7 50%, #ad2bee 100%)",
                    display: "flex", alignItems: "center", justifyContent: "center",
                  }}>
                    <svg width="26" height="26" viewBox="0 0 24 24" fill="none" stroke="#fff" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
                      <polyline ref={checkRef} points="20 6 9 17 4 12"
                        style={{ strokeDasharray: 30, strokeDashoffset: 30 }} />
                    </svg>
                  </div>
                </div>

                {/* Text */}
                <div style={{ display: "flex", flexDirection: "column", gap: "0.5rem" }}>
                  <p style={{ color: "#fbfbf4", fontWeight: 800, fontSize: "1.4rem", letterSpacing: "-0.02em" }}>
                    Nachricht{" "}
                    <span style={{
                      background: "linear-gradient(135deg, #60a5fa 0%, #8b6ff7 50%, #ad2bee 100%)",
                      WebkitBackgroundClip: "text", WebkitTextFillColor: "transparent", backgroundClip: "text",
                    }}>gesendet!</span>
                  </p>
                  <p style={{ color: "rgba(251,251,244,0.45)", fontSize: "0.9rem", lineHeight: 1.6 }}>
                    Wir melden uns innerhalb von 24 Stunden bei dir.
                  </p>
                </div>

                {/* Divider */}
                <div aria-hidden style={{
                  width: 48, height: 1,
                  background: "linear-gradient(90deg, transparent, rgba(139,111,247,0.4), transparent)",
                }} />

                {/* Button */}
                <button onClick={() => setStatus("idle")} style={{
                  background: "none", cursor: "pointer",
                  border: "1px solid rgba(139,111,247,0.3)", color: "rgba(251,251,244,0.7)",
                  borderRadius: "0.75rem", padding: "0.6rem 1.5rem",
                  fontSize: "0.8rem", fontWeight: 600, letterSpacing: "0.08em",
                  textTransform: "uppercase", transition: "border-color 0.2s, color 0.2s",
                }}
                  onMouseEnter={(e) => { (e.currentTarget as HTMLButtonElement).style.borderColor = "rgba(139,111,247,0.7)"; (e.currentTarget as HTMLButtonElement).style.color = "#fbfbf4"; }}
                  onMouseLeave={(e) => { (e.currentTarget as HTMLButtonElement).style.borderColor = "rgba(139,111,247,0.3)"; (e.currentTarget as HTMLButtonElement).style.color = "rgba(251,251,244,0.7)"; }}
                >Neue Anfrage</button>
              </div>
            )}

            {/* ── Form ──────────────────────────────────────── */}
            {status !== "success" && (
              <form ref={formRef} onSubmit={handleSubmit} autoComplete="on"
                style={{ display: "flex", flexDirection: "column", gap: "2rem", position: "relative", zIndex: 1 }}>

                <div className="contact-field">
                  <input type="text" name="name" value={formData.name}
                    onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                    required placeholder=" " autoComplete="name" />
                  <label>Dein Name</label>
                </div>

                <div className="contact-field">
                  <input type="email" name="email" value={formData.email}
                    onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                    required placeholder=" " autoComplete="email" />
                  <label>E-Mail Adresse</label>
                </div>

                <div className="contact-field">
                  <textarea name="message" value={formData.message}
                    onChange={(e) => setFormData({ ...formData, message: e.target.value })}
                    required placeholder=" " rows={4} />
                  <label>Projekt Details</label>
                </div>

                {status === "error" && (
                  <p style={{ color: "#f87171", fontSize: "0.875rem", margin: "-0.75rem 0" }}>
                    Etwas ist schiefgelaufen. Bitte versuche es nochmal.
                  </p>
                )}

                <div className="submit-btn-wrap">
                  <button
                    ref={submitBtnRef}
                    type="submit"
                    disabled={status === "loading"}
                    className={status === "loading" ? "btn-shimmer" : ""}
                    style={{
                      width: "100%",
                      background: status === "loading"
                        ? "linear-gradient(135deg, #60a5fa 0%, #8b6ff7 50%, #ad2bee 100%)"
                        : "linear-gradient(135deg, #60a5fa 0%, #8b6ff7 50%, #ad2bee 100%)",
                      color: "#fbfbf4", border: "none", borderRadius: "0.875rem",
                      padding: "1.1rem 2rem", fontSize: "0.85rem", fontWeight: 700,
                      letterSpacing: "0.12em", textTransform: "uppercase",
                      cursor: status === "loading" ? "default" : "pointer",
                      display: "flex", alignItems: "center", justifyContent: "center",
                      gap: "0.75rem", transition: "opacity 0.2s, transform 0.2s",
                    }}
                    onMouseEnter={(e) => { if (status !== "loading") (e.currentTarget as HTMLButtonElement).style.transform = "translateY(-1px)"; }}
                    onMouseLeave={(e) => { (e.currentTarget as HTMLButtonElement).style.transform = "translateY(0)"; }}
                  >
                    {status === "loading" ? (
                      LOADING_TEXTS[loadingIdx]
                    ) : (
                      <>
                        Analyse starten
                        <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
                          <path d="M7 17 17 7M7 7h10v10"/>
                        </svg>
                      </>
                    )}
                  </button>
                </div>
              </form>
            )}
          </div>
        </div>
      </div>
    </section>
  );
}
