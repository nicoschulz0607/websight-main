"use client";

import type { ReactNode } from "react";

/** Schlanker, im Code gebauter Browser-Rahmen (em-basiert → skaliert mit font-size). */
export function BrowserFrame({
  url,
  children,
  className = "",
  style,
}: {
  url?: string;
  children: ReactNode;
  className?: string;
  style?: React.CSSProperties;
}) {
  return (
    <div
      className={`relative overflow-hidden ${className}`}
      style={{
        borderRadius: "0.85em",
        background: "#0e0e0e",
        boxShadow:
          "0 0 0 1px rgba(251,251,244,0.09), 0 40px 80px -40px rgba(0,0,0,0.95), 0 20px 60px -30px rgba(139,111,247,0.25)",
        ...style,
      }}
    >
      <div
        className="flex items-center"
        style={{ height: "2.1em", padding: "0 0.9em", gap: "0.4em", borderBottom: "1px solid rgba(251,251,244,0.06)" }}
      >
        {[0, 1, 2].map((i) => (
          <span key={i} style={{ width: "0.55em", height: "0.55em", borderRadius: "50%", background: "rgba(251,251,244,0.14)" }} />
        ))}
        {url && (
          <span
            className="flex items-center"
            style={{
              margin: "0 auto",
              gap: "0.4em",
              height: "1.35em",
              padding: "0 0.9em",
              borderRadius: "9999px",
              background: "rgba(251,251,244,0.05)",
              color: "rgba(251,251,244,0.55)",
              fontSize: "0.68em",
              letterSpacing: "0.01em",
            }}
          >
            <svg width="0.85em" height="0.85em" viewBox="0 0 16 16" fill="none" aria-hidden>
              <rect x="3.5" y="7" width="9" height="6.5" rx="1.5" stroke="currentColor" strokeWidth="1.4" />
              <path d="M5.5 7V5.2a2.5 2.5 0 0 1 5 0V7" stroke="currentColor" strokeWidth="1.4" />
            </svg>
            {url}
          </span>
        )}
        {url && <span style={{ width: "2.05em" }} />}
      </div>
      <div className="relative">{children}</div>
    </div>
  );
}

/** Handy-Rahmen ohne Notch-Kitsch: dünner Rand, runde Ecken, kleine Kamera-Pille. */
export function PhoneFrame({
  children,
  className = "",
  style,
}: {
  children: ReactNode;
  className?: string;
  style?: React.CSSProperties;
}) {
  return (
    <div
      className={`relative ${className}`}
      style={{
        padding: "0.42em",
        borderRadius: "2.3em",
        background: "#141414",
        boxShadow:
          "0 0 0 1px rgba(251,251,244,0.12), inset 0 0 0 1px rgba(0,0,0,0.6), 0 40px 70px -30px rgba(0,0,0,0.95)",
        ...style,
      }}
    >
      <div className="relative overflow-hidden" style={{ borderRadius: "1.95em", background: "#000", height: "100%" }}>
        {children}
        <span
          aria-hidden
          className="absolute"
          style={{
            top: "0.55em",
            left: "50%",
            width: "28%",
            height: "1.05em",
            transform: "translateX(-50%)",
            borderRadius: "9999px",
            background: "#000",
          }}
        />
      </div>
    </div>
  );
}
