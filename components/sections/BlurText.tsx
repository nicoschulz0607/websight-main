"use client";

import { useEffect, useRef } from "react";
import { gsap, ScrollTrigger } from "@/lib/gsap";

interface TextLine {
  text: string;
  colored?: boolean;
}

interface BlurTextProps {
  lines: TextLine[];
  className?: string;
}

export default function BlurText({ lines, className = "" }: BlurTextProps) {
  const containerRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const ctx = gsap.context(() => {
      const words = containerRef.current?.querySelectorAll<HTMLSpanElement>("[data-word]");
      if (!words || words.length === 0) return;

      gsap.fromTo(
        words,
        {
          filter: "blur(20px)",
          opacity: 0.15,
          y: 30,
        },
        {
          filter: "blur(0px)",
          opacity: 1,
          y: 0,
          stagger: 0.06,
          ease: "power2.out",
          scrollTrigger: {
            trigger: containerRef.current,
            start: "top 80%",
            end: "top 20%",
            scrub: 1.2,
          },
        }
      );
    }, containerRef);

    return () => ctx.revert();
  }, []);

  return (
    <section className={`py-32 px-8 md:px-16 lg:px-24 ${className}`}>
      <div ref={containerRef} className="max-w-5xl mx-auto">
        <p className="text-4xl md:text-6xl lg:text-7xl font-bold leading-[1.15] text-cream">
          {lines.map((line, lineIdx) =>
            line.text.split(" ").map((word, wordIdx) => (
              <span
                key={`${lineIdx}-${wordIdx}`}
                data-word
                className={`inline-block mr-[0.3em] ${line.colored ? "gradient-text" : ""}`}
                style={{ willChange: "filter, opacity, transform" }}
              >
                {word}
              </span>
            ))
          )}
        </p>
      </div>
    </section>
  );
}
