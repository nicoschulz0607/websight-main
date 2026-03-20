"use client";

import { useState, useRef, useEffect, FormEvent } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

gsap.registerPlugin(ScrollTrigger);

type Status = "idle" | "loading" | "success" | "error";

export default function Contact() {
  const [formData, setFormData] = useState({ name: "", email: "", message: "" });
  const [status, setStatus] = useState<Status>("idle");
  const sectionRef = useRef<HTMLElement>(null);

  useEffect(() => {
    if (!sectionRef.current) return;
    const ctx = gsap.context(() => {
      gsap.from(".c-reveal", {
        opacity: 0,
        y: 50,
        duration: 0.9,
        stagger: 0.12,
        ease: "power3.out",
        scrollTrigger: {
          trigger: sectionRef.current,
          start: "top 78%",
        },
      });
    }, sectionRef);
    return () => ctx.revert();
  }, []);

  const handleSubmit = async (e: FormEvent) => {
    e.preventDefault();
    setStatus("loading");
    try {
      const res = await fetch("/api/contact", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(formData),
      });
      if (!res.ok) throw new Error();
      setStatus("success");
      setFormData({ name: "", email: "", message: "" });
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
      <div
        aria-hidden
        style={{
          position: "absolute",
          inset: 0,
          background:
            "radial-gradient(ellipse 60% 50% at 80% 60%, rgba(173,43,238,0.08) 0%, transparent 65%), " +
            "radial-gradient(ellipse 40% 40% at 20% 40%, rgba(96,165,250,0.06) 0%, transparent 65%)",
          pointerEvents: "none",
        }}
      />

      <div
        style={{
          maxWidth: "1280px",
          margin: "0 auto",
          display: "flex",
          flexDirection: "row",
          gap: "clamp(2.5rem, 6vw, 6rem)",
          alignItems: "center",
          flexWrap: "wrap",
        }}
      >
        {/* ── Left: headline + contact info ───────────────── */}
        <div
          className="c-reveal"
          style={{ flex: "1 1 340px", minWidth: 0 }}
        >
          <span
            style={{
              display: "block",
              fontSize: "0.7rem",
              fontWeight: 700,
              letterSpacing: "0.3em",
              textTransform: "uppercase",
              color: "#60a5fa",
              marginBottom: "1.5rem",
            }}
          >
            Bereit zu starten
          </span>

          <h2
            style={{
              fontSize: "clamp(2.6rem, 5.5vw, 5rem)",
              fontWeight: 800,
              lineHeight: 1.08,
              letterSpacing: "-0.03em",
              color: "#fbfbf4",
              marginBottom: "1.5rem",
            }}
          >
            Lass uns dein{" "}
            <span
              style={{
                background: "linear-gradient(135deg, #60a5fa 0%, #8b6ff7 50%, #ad2bee 100%)",
                WebkitBackgroundClip: "text",
                WebkitTextFillColor: "transparent",
                backgroundClip: "text",
              }}
            >
              Potenzial
            </span>{" "}
            analysieren.
          </h2>

          <p
            style={{
              fontSize: "clamp(0.95rem, 1.3vw, 1.1rem)",
              color: "rgba(251,251,244,0.5)",
              lineHeight: 1.7,
              maxWidth: "420px",
              marginBottom: "2.5rem",
            }}
          >
            Vereinbare ein kostenloses Erstgespräch oder starte direkt mit
            einer High-Impact Digital-Strategie.
          </p>

          {/* Contact buttons */}
          <div style={{ display: "flex", flexDirection: "column", gap: "0.75rem" }}>
            {[
              {
                href: "mailto:hello@websight.studio",
                label: "E-Mail",
                value: "hello@websight.studio",
                accent: "#60a5fa",
                accentBg: "rgba(96,165,250,0.08)",
                accentBorder: "rgba(96,165,250,0.25)",
                gradient: "linear-gradient(135deg, rgba(96,165,250,0.15), rgba(139,111,247,0.1))",
                icon: (
                  <svg width="15" height="15" viewBox="0 0 24 24" fill="none" stroke="#60a5fa" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                    <rect x="2" y="4" width="20" height="16" rx="2"/>
                    <path d="m22 7-8.97 5.7a1.94 1.94 0 0 1-2.06 0L2 7"/>
                  </svg>
                ),
              },
              {
                href: "tel:+491729249820",
                label: "Telefon",
                value: "+49 172 9249820",
                accent: "#8b6ff7",
                accentBg: "rgba(139,111,247,0.08)",
                accentBorder: "rgba(139,111,247,0.25)",
                gradient: "linear-gradient(135deg, rgba(139,111,247,0.15), rgba(173,43,238,0.1))",
                icon: (
                  <svg width="15" height="15" viewBox="0 0 24 24" fill="none" stroke="#8b6ff7" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                    <path d="M22 16.92v3a2 2 0 0 1-2.18 2 19.79 19.79 0 0 1-8.63-3.07A19.5 19.5 0 0 1 4.69 12a19.79 19.79 0 0 1-3.07-8.67A2 2 0 0 1 3.6 1.27h3a2 2 0 0 1 2 1.72c.127.96.361 1.903.7 2.81a2 2 0 0 1-.45 2.11L7.91 8.91a16 16 0 0 0 6 6l.91-.91a2 2 0 0 1 2.11-.45c.907.339 1.85.573 2.81.7A2 2 0 0 1 21.73 16.92z"/>
                  </svg>
                ),
              },
              {
                href: "https://wa.me/491729249820",
                label: "WhatsApp",
                value: "Direkt schreiben",
                accent: "#25d366",
                accentBg: "rgba(37,211,102,0.08)",
                accentBorder: "rgba(37,211,102,0.25)",
                gradient: "linear-gradient(135deg, rgba(37,211,102,0.12), rgba(37,211,102,0.05))",
                target: "_blank",
                icon: (
                  <svg width="15" height="15" viewBox="0 0 24 24" fill="#25d366">
                    <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 0 1-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 0 1-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 0 1 2.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0 0 12.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 0 0 5.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 0 0-3.48-8.413z"/>
                  </svg>
                ),
              },
            ].map((btn) => (
              <a
                key={btn.label}
                href={btn.href}
                target={btn.target}
                rel={btn.target ? "noopener noreferrer" : undefined}
                style={{
                  display: "flex",
                  alignItems: "center",
                  gap: "1rem",
                  padding: "0.5rem 0",
                  background: "none",
                  border: "none",
                  textDecoration: "none",
                  transition: "transform 0.2s, opacity 0.2s",
                  opacity: 0.75,
                }}
                onMouseEnter={(e) => {
                  const el = e.currentTarget as HTMLAnchorElement;
                  el.style.transform = "translateX(5px)";
                  el.style.opacity = "1";
                }}
                onMouseLeave={(e) => {
                  const el = e.currentTarget as HTMLAnchorElement;
                  el.style.transform = "translateX(0)";
                  el.style.opacity = "0.75";
                }}
              >
                <span
                  style={{
                    width: 36,
                    height: 36,
                    borderRadius: "0.6rem",
                    background: btn.accentBg,
                    border: `1px solid ${btn.accentBorder}`,
                    display: "flex",
                    alignItems: "center",
                    justifyContent: "center",
                    flexShrink: 0,
                  }}
                >
                  {btn.icon}
                </span>
                <div style={{ minWidth: 0 }}>
                  <div style={{ fontSize: "0.7rem", fontWeight: 600, letterSpacing: "0.1em", textTransform: "uppercase", color: btn.accent, marginBottom: "0.1rem" }}>
                    {btn.label}
                  </div>
                  <div style={{ fontSize: "0.9rem", color: "rgba(251,251,244,0.8)", fontWeight: 500, whiteSpace: "nowrap", overflow: "hidden", textOverflow: "ellipsis" }}>
                    {btn.value}
                  </div>
                </div>
              </a>
            ))}
          </div>
        </div>

        {/* ── Right: Form card ─────────────────────────────── */}
        <div
          className="c-reveal"
          style={{
            flex: "1 1 420px",
            minWidth: 0,
            background: "rgba(251,251,244,0.025)",
            border: "1px solid rgba(251,251,244,0.07)",
            borderRadius: "1.5rem",
            padding: "clamp(1.75rem, 4vw, 3rem)",
            position: "relative",
            overflow: "hidden",
          }}
        >
          {/* Subtle top accent line */}
          <div
            aria-hidden
            style={{
              position: "absolute",
              top: 0,
              left: "10%",
              right: "10%",
              height: "1px",
              background:
                "linear-gradient(90deg, transparent, rgba(96,165,250,0.5), rgba(173,43,238,0.5), transparent)",
            }}
          />

          {status === "success" ? (
            <div
              style={{
                display: "flex",
                flexDirection: "column",
                alignItems: "center",
                justifyContent: "center",
                gap: "1.25rem",
                padding: "3rem 1rem",
                textAlign: "center",
              }}
            >
              <div
                style={{
                  width: 56,
                  height: 56,
                  borderRadius: "50%",
                  background: "rgba(34,197,94,0.1)",
                  border: "1px solid rgba(34,197,94,0.3)",
                  display: "flex",
                  alignItems: "center",
                  justifyContent: "center",
                }}
              >
                <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="#22c55e" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
                  <polyline points="20 6 9 17 4 12"/>
                </svg>
              </div>
              <p style={{ color: "#fbfbf4", fontWeight: 700, fontSize: "1.15rem" }}>
                Nachricht gesendet!
              </p>
              <p style={{ color: "rgba(251,251,244,0.5)", fontSize: "0.9rem" }}>
                Wir melden uns in Kürze bei dir.
              </p>
              <button
                onClick={() => setStatus("idle")}
                style={{
                  marginTop: "0.5rem",
                  background: "none",
                  border: "1px solid rgba(251,251,244,0.15)",
                  color: "rgba(251,251,244,0.6)",
                  borderRadius: "0.5rem",
                  padding: "0.5rem 1.25rem",
                  fontSize: "0.85rem",
                  cursor: "pointer",
                }}
              >
                Neue Anfrage
              </button>
            </div>
          ) : (
            <form onSubmit={handleSubmit} autoComplete="off" style={{ display: "flex", flexDirection: "column", gap: "2rem" }}>
              {/* Name */}
              <div className="contact-field">
                <input
                  type="text"
                  name="name"
                  value={formData.name}
                  onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                  required
                  placeholder=" "
                  autoComplete="off"
                />
                <label>Dein Name</label>
              </div>

              {/* Email */}
              <div className="contact-field">
                <input
                  type="email"
                  name="email"
                  value={formData.email}
                  onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                  required
                  placeholder=" "
                  autoComplete="off"
                />
                <label>E-Mail Adresse</label>
              </div>

              {/* Message */}
              <div className="contact-field">
                <textarea
                  name="message"
                  value={formData.message}
                  onChange={(e) => setFormData({ ...formData, message: e.target.value })}
                  required
                  placeholder=" "
                  rows={4}
                />
                <label>Projekt Details</label>
              </div>

              {/* Error */}
              {status === "error" && (
                <p style={{ color: "#f87171", fontSize: "0.875rem", margin: "-0.75rem 0" }}>
                  Etwas ist schiefgelaufen. Bitte versuche es nochmal.
                </p>
              )}

              {/* Submit */}
              <button
                type="submit"
                disabled={status === "loading"}
                style={{
                  background:
                    status === "loading"
                      ? "rgba(251,251,244,0.08)"
                      : "linear-gradient(135deg, #60a5fa 0%, #8b6ff7 50%, #ad2bee 100%)",
                  color: "#fbfbf4",
                  border: "none",
                  borderRadius: "0.875rem",
                  padding: "1.1rem 2rem",
                  fontSize: "0.85rem",
                  fontWeight: 700,
                  letterSpacing: "0.12em",
                  textTransform: "uppercase",
                  cursor: status === "loading" ? "default" : "pointer",
                  display: "flex",
                  alignItems: "center",
                  justifyContent: "center",
                  gap: "0.75rem",
                  transition: "opacity 0.2s, transform 0.2s",
                  opacity: status === "loading" ? 0.6 : 1,
                }}
                onMouseEnter={(e) => {
                  if (status !== "loading")
                    (e.currentTarget as HTMLButtonElement).style.transform = "translateY(-1px)";
                }}
                onMouseLeave={(e) => {
                  (e.currentTarget as HTMLButtonElement).style.transform = "translateY(0)";
                }}
              >
                {status === "loading" ? (
                  "Wird gesendet…"
                ) : (
                  <>
                    Analyse starten
                    <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
                      <path d="M7 17 17 7M7 7h10v10"/>
                    </svg>
                  </>
                )}
              </button>
            </form>
          )}
        </div>
      </div>
    </section>
  );
}
