"use client";

import { useEffect, useRef } from "react";
import { gsap } from "@/lib/gsap";

type Service = {
  title: string;
  accentColor: string;
  description: string;
  details: string[];
  forWho: string;
};

type Props = {
  service: Service | null;
  onClose: () => void;
};

export default function ServiceModal({ service, onClose }: Props) {
  const drawerRef = useRef<HTMLDivElement>(null);
  const overlayRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (!service) return;
    gsap.fromTo(
      drawerRef.current,
      { x: "100%" },
      { x: "0%", duration: 0.6, ease: "cubic-bezier(0.16, 1, 0.3, 1)" }
    );
    gsap.fromTo(overlayRef.current, { opacity: 0 }, { opacity: 1, duration: 0.35 });
  }, [service]);

  const handleClose = () => {
    gsap.to(drawerRef.current, { x: "100%", duration: 0.5, ease: "power2.in" });
    gsap.to(overlayRef.current, { opacity: 0, duration: 0.3, onComplete: onClose });
  };

  useEffect(() => {
    const onKey = (e: KeyboardEvent) => { if (e.key === "Escape") handleClose(); };
    document.addEventListener("keydown", onKey);
    return () => document.removeEventListener("keydown", onKey);
  });

  if (!service) return null;

  return (
    <div style={{ position: "fixed", inset: 0, zIndex: 100 }}>
      {/* Overlay */}
      <div
        ref={overlayRef}
        onClick={handleClose}
        style={{ position: "absolute", inset: 0, background: "rgba(0,0,0,0.65)", cursor: "none" }}
      />

      {/* Drawer */}
      <div
        ref={drawerRef}
        style={{
          position: "absolute", top: 0, right: 0, bottom: 0,
          width: "min(540px, 90vw)",
          background: "#080808",
          borderLeft: "1px solid rgba(251,251,244,0.08)",
          display: "flex", flexDirection: "column",
          overflowY: "auto",
          transform: "translateX(100%)",
        }}
      >
        {/* Top bar */}
        <div style={{
          display: "flex", alignItems: "center", justifyContent: "space-between",
          padding: "2rem 2.5rem",
          borderBottom: "1px solid rgba(251,251,244,0.07)",
          flexShrink: 0,
        }}>
          <span style={{
            color: service.accentColor, fontFamily: "monospace",
            fontSize: "0.65rem", letterSpacing: "0.15em", textTransform: "uppercase",
          }}>
            Leistung
          </span>
          <button
            onClick={handleClose}
            style={{
              background: "none", border: "none",
              color: "rgba(251,251,244,0.35)", fontSize: "1.3rem",
              lineHeight: 1, cursor: "none", transition: "color 0.2s",
            }}
            onMouseEnter={(e) => (e.currentTarget.style.color = "#fbfbf4")}
            onMouseLeave={(e) => (e.currentTarget.style.color = "rgba(251,251,244,0.35)")}
          >
            ✕
          </button>
        </div>

        {/* Content */}
        <div style={{ padding: "2.5rem", flex: 1 }}>
          {/* Accent dot + title */}
          <div style={{ display: "flex", alignItems: "flex-start", gap: "1rem", marginBottom: "1.75rem" }}>
            <span style={{
              width: 10, height: 10, borderRadius: "50%",
              background: service.accentColor,
              flexShrink: 0, marginTop: "0.65rem",
            }} />
            <h3 style={{
              fontSize: "clamp(1.7rem, 3vw, 2.3rem)",
              fontWeight: 700, letterSpacing: "-0.03em",
              color: "#fbfbf4", lineHeight: 1.1,
            }}>
              {service.title}
            </h3>
          </div>

          {/* Description */}
          <p style={{
            color: "rgba(251,251,244,0.55)",
            fontSize: "clamp(0.875rem, 1.1vw, 1rem)",
            lineHeight: 1.85, marginBottom: "2.25rem",
          }}>
            {service.description}
          </p>

          {/* What you get */}
          <div style={{ marginBottom: "2rem" }}>
            <p style={{
              fontSize: "0.65rem", letterSpacing: "0.13em",
              color: "rgba(251,251,244,0.25)", textTransform: "uppercase",
              marginBottom: "1rem",
            }}>
              Was du bekommst
            </p>
            <ul style={{ listStyle: "none", padding: 0, margin: 0, display: "flex", flexDirection: "column", gap: "0.8rem" }}>
              {service.details.map((d, i) => (
                <li key={i} style={{ display: "flex", gap: "0.75rem", alignItems: "flex-start" }}>
                  <span style={{ color: service.accentColor, flexShrink: 0, marginTop: "0.1rem", fontSize: "0.85rem" }}>✓</span>
                  <span style={{ color: "rgba(251,251,244,0.65)", fontSize: "0.9rem", lineHeight: 1.65 }}>{d}</span>
                </li>
              ))}
            </ul>
          </div>

          {/* For who */}
          <div style={{
            padding: "1rem 1.25rem",
            background: "rgba(251,251,244,0.03)",
            border: "1px solid rgba(251,251,244,0.07)",
            borderRadius: "6px", marginBottom: "2.5rem",
          }}>
            <p style={{
              fontSize: "0.65rem", letterSpacing: "0.12em",
              color: "rgba(251,251,244,0.25)", textTransform: "uppercase", marginBottom: "0.4rem",
            }}>
              Ideal für
            </p>
            <p style={{ color: "rgba(251,251,244,0.6)", fontSize: "0.88rem" }}>{service.forWho}</p>
          </div>

          {/* CTA */}
          <a
            href="#kontakt"
            onClick={handleClose}
            style={{
              display: "flex", alignItems: "center", justifyContent: "center",
              padding: "1rem 2rem",
              background: `linear-gradient(135deg, ${service.accentColor}18, ${service.accentColor}38)`,
              border: `1px solid ${service.accentColor}50`,
              color: "#fbfbf4", fontSize: "0.9rem", fontWeight: 500,
              letterSpacing: "0.03em", textDecoration: "none",
              borderRadius: "4px", cursor: "none",
              transition: "background 0.3s, border-color 0.3s",
            }}
            onMouseEnter={(e) => {
              (e.currentTarget as HTMLAnchorElement).style.background =
                `linear-gradient(135deg, ${service.accentColor}28, ${service.accentColor}50)`;
            }}
            onMouseLeave={(e) => {
              (e.currentTarget as HTMLAnchorElement).style.background =
                `linear-gradient(135deg, ${service.accentColor}18, ${service.accentColor}38)`;
            }}
          >
            Jetzt anfragen →
          </a>
        </div>
      </div>
    </div>
  );
}
