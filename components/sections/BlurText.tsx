"use client";

import { useEffect, useRef } from "react";
import { gsap, ScrollTrigger } from "@/lib/gsap";
import { useIsMobile } from "@/lib/useIsMobile";

interface TextLine {
  text: string;
  colored?: boolean;
}

interface BlurTextProps {
  lines: TextLine[];
  className?: string;
  noBorderTop?: boolean;
}

export default function BlurText({ lines, className = "", noBorderTop = false }: BlurTextProps) {
  const isMobile     = useIsMobile();
  const wrapperRef   = useRef<HTMLDivElement>(null);  // tall scroll-driver
  const stickyRef    = useRef<HTMLElement>(null);      // sticky viewport-height section
  const containerRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const ctx = gsap.context(() => {
      const words = containerRef.current?.querySelectorAll<HTMLSpanElement>("[data-word]");
      if (!words || words.length === 0) return;

      gsap.fromTo(
        words,
        { autoAlpha: 0, filter: "blur(1.8rem)", y: 32 },
        {
          autoAlpha: 1,
          filter: "blur(0rem)",
          y: 0,
          ease: "none",
          stagger: 0.1,
          scrollTrigger: {
            trigger: wrapperRef.current,
            start: isMobile ? "top 60%" : "top 40%",
            end: isMobile ? "bottom bottom" : "bottom 85%",
            scrub: 1.5,
          },
        }
      );
    }, wrapperRef);

    return () => ctx.revert();
  }, [isMobile]);

  return (
    /* Tall wrapper — provides scroll distance without GSAP pin */
    <div ref={wrapperRef} style={{ height: isMobile ? "250vh" : "190vh" }}>
      <section
        ref={stickyRef}
        className={className}
        style={{
          position: "sticky",
          top: 0,
          height: "100vh",
          background: "#000",
          display: "flex",
          flexDirection: "column",
          alignItems: "center",
          justifyContent: "center",
          borderTop: noBorderTop ? "none" : "1px solid rgba(251,251,244,0.06)",
        }}
      >
        <div ref={containerRef} style={{ maxWidth: "1000px", width: "100%", padding: "0 clamp(2rem, 8vw, 8rem)", position: "relative", zIndex: 1 }}>
          <p
            style={{
              fontSize: "clamp(2.8rem, 6vw, 5.8rem)",
              fontWeight: 700,
              lineHeight: 1.18,
              letterSpacing: "-0.035em",
              color: "#fbfbf4",
              textAlign: "center",
            }}
          >
            {lines.map((line, lineIdx) =>
              line.text.split(" ").map((word, wordIdx) => (
                <span
                  key={`${lineIdx}-${wordIdx}`}
                  data-word
                  style={{
                    display: "inline-block",
                    marginRight: "0.28em",
                    willChange: "filter, opacity, transform",
                    ...(line.colored
                      ? {
                          background: "linear-gradient(135deg, #60a5fa 0%, #8b6ff7 50%, #ad2bee 100%)",
                          WebkitBackgroundClip: "text",
                          WebkitTextFillColor: "transparent",
                          backgroundClip: "text",
                        }
                      : {}),
                  }}
                >
                  {word}
                </span>
              ))
            )}
          </p>
        </div>
      </section>
    </div>
  );
}
