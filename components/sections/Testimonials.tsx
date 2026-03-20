"use client";

import { useRef, useState } from "react";
import { gsap } from "@/lib/gsap";
import { TESTIMONIALS } from "@/lib/constants";

export default function Testimonials() {
  const [activeIndex, setActiveIndex] = useState(0);
  const [isAnimating, setIsAnimating] = useState(false);
  const cardRef = useRef<HTMLDivElement>(null);

  const goTo = (nextIndex: number, direction: "left" | "right") => {
    if (isAnimating || nextIndex === activeIndex) return;
    setIsAnimating(true);

    const xOut = direction === "right" ? -80 : 80;
    const xIn = direction === "right" ? 80 : -80;

    gsap.to(cardRef.current, {
      x: xOut,
      opacity: 0,
      duration: 0.35,
      ease: "power2.in",
      onComplete: () => {
        setActiveIndex(nextIndex);
        gsap.set(cardRef.current, { x: xIn, opacity: 0 });
        gsap.to(cardRef.current, {
          x: 0,
          opacity: 1,
          duration: 0.45,
          ease: "power2.out",
          onComplete: () => setIsAnimating(false),
        });
      },
    });
  };

  const prev = () => {
    const nextIndex = (activeIndex - 1 + TESTIMONIALS.length) % TESTIMONIALS.length;
    goTo(nextIndex, "left");
  };

  const next = () => {
    const nextIndex = (activeIndex + 1) % TESTIMONIALS.length;
    goTo(nextIndex, "right");
  };

  const testimonial = TESTIMONIALS[activeIndex];

  return (
    <section id="testimonials" className="py-32 px-8 md:px-16 lg:px-24">
      <div className="max-w-4xl mx-auto">
        {/* Header */}
        <div className="mb-16">
          <p className="text-cream/30 text-xs tracking-widest uppercase mb-3">Kundenstimmen</p>
          <h2 className="text-4xl md:text-5xl font-bold text-cream leading-tight">
            Was Kunden über uns <span className="gradient-text">sagen</span>
          </h2>
        </div>

        {/* Card */}
        <div className="relative">
          <div
            ref={cardRef}
            className="relative border border-cream/10 rounded-2xl p-10 md:p-14 overflow-hidden"
            style={{ background: "rgba(255,255,255,0.02)" }}
          >
            {/* Subtle gradient top */}
            <div
              className="absolute top-0 left-0 right-0 h-px"
              style={{
                background: "linear-gradient(90deg, transparent, rgba(96,165,250,0.4), rgba(173,43,238,0.4), transparent)",
              }}
            />

            <blockquote className="text-cream/85 text-xl md:text-2xl leading-relaxed font-light mb-10">
              &ldquo;{testimonial.quote}&rdquo;
            </blockquote>

            <div className="flex items-center gap-4">
              {/* Avatar placeholder */}
              <div
                className="w-10 h-10 rounded-full flex-shrink-0"
                style={{
                  background: `linear-gradient(135deg, #60a5fa, #ad2bee)`,
                }}
              />
              <div>
                <p className="text-cream font-semibold text-sm">{testimonial.name}</p>
                <p className="text-cream/40 text-xs">
                  {testimonial.role}, {testimonial.company}
                </p>
              </div>
            </div>

            {/* Invisible left/right click zones */}
            <div
              className="absolute left-0 top-0 w-1/2 h-full"
              onClick={prev}
              style={{ cursor: "none" }}
            />
            <div
              className="absolute right-0 top-0 w-1/2 h-full"
              onClick={next}
              style={{ cursor: "none" }}
            />
          </div>

          {/* Navigation */}
          <div className="flex items-center justify-between mt-8">
            {/* Dots */}
            <div className="flex items-center gap-2">
              {TESTIMONIALS.map((_, i) => (
                <button
                  key={i}
                  onClick={() => goTo(i, i > activeIndex ? "right" : "left")}
                  className="transition-all duration-300"
                  style={{
                    width: i === activeIndex ? "24px" : "8px",
                    height: "4px",
                    borderRadius: "2px",
                    background: i === activeIndex ? "#60a5fa" : "rgba(251,251,244,0.2)",
                  }}
                />
              ))}
            </div>

            {/* Arrow buttons */}
            <div className="flex items-center gap-3">
              <button
                onClick={prev}
                className="w-10 h-10 rounded-full border border-cream/20 hover:border-primary-blue flex items-center justify-center text-cream/50 hover:text-primary-blue transition-all duration-200"
              >
                ←
              </button>
              <button
                onClick={next}
                className="w-10 h-10 rounded-full border border-cream/20 hover:border-primary-blue flex items-center justify-center text-cream/50 hover:text-primary-blue transition-all duration-200"
              >
                →
              </button>
            </div>
          </div>
        </div>

        {/* Context hint */}
        <p className="text-cream/20 text-xs text-center mt-6 tracking-widest uppercase">
          Links oder rechts auf die Karte klicken zum Navigieren
        </p>
      </div>
    </section>
  );
}
