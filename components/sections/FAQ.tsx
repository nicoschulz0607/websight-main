"use client";

import { useEffect, useRef, useState } from "react";
import { gsap } from "@/lib/gsap";
import { FAQ_ITEMS } from "@/lib/constants";

interface FAQItemProps {
  question: string;
  answer: string;
  isOpen: boolean;
  onToggle: () => void;
  itemRef: (el: HTMLDivElement | null) => void;
}

function FAQItem({ question, answer, isOpen, onToggle, itemRef }: FAQItemProps) {
  const answerWrapRef  = useRef<HTMLDivElement>(null);
  const answerInnerRef = useRef<HTMLDivElement>(null);
  const toggleRef      = useRef<HTMLDivElement>(null);
  const vLineRef       = useRef<HTMLSpanElement>(null);

  useEffect(() => {
    const wrap   = answerWrapRef.current;
    const inner  = answerInnerRef.current;
    const toggle = toggleRef.current;
    const vLine  = vLineRef.current;
    if (!wrap || !inner || !toggle || !vLine) return;

    if (isOpen) {
      gsap.to(wrap,   { height: inner.scrollHeight, duration: 0.55, ease: "power3.inOut" });
      gsap.to(toggle, { rotation: 180, duration: 0.5, ease: "power2.inOut" });
      gsap.to(vLine,  { opacity: 0, duration: 0.25, delay: 0.1, ease: "power2.inOut" });
    } else {
      gsap.to(wrap,   { height: 0, duration: 0.45, ease: "power3.inOut" });
      gsap.to(toggle, { rotation: 0, duration: 0.5, ease: "power2.inOut" });
      gsap.to(vLine,  { opacity: 1, duration: 0.3, ease: "power2.inOut" });
    }
  }, [isOpen]);

  return (
    <div
      ref={itemRef}
      className="faq-item"
      style={{
        position: "relative",
        borderTop: "1px solid rgba(251,251,244,0.1)",
        willChange: "box-shadow",
      }}
    >
      {/* Clickable row — matches Estrela's .faq-inner flex layout */}
      <div
        onClick={onToggle}
        style={{
          display: "flex",
          alignItems: "flex-start",
          padding: "2rem 3.5rem 3rem 0",
          cursor: "none",
        }}
      >
        {/* Question — left column */}
        <p
          style={{
            flexShrink: 0,
            width: "48%",
            marginRight: "3rem",
            fontSize: "1.125rem",
            fontWeight: 400,
            lineHeight: 1.5,
            color: "#fbfbf4",
          }}
        >
          {question}
        </p>

        {/* Answer — right column, animated height */}
        <div ref={answerWrapRef} style={{ flex: 1, height: 0, overflow: "hidden" }}>
          <div ref={answerInnerRef}>
            <p
              style={{
                fontSize: "1.125rem",
                fontWeight: 400,
                lineHeight: 1.75,
                color: "rgba(251,251,244,0.5)",
                paddingBottom: "0.5rem",
              }}
            >
              {answer}
            </p>
          </div>
        </div>
      </div>

      {/* Toggle — absolutely positioned top-right, Estrela-style */}
      <div
        ref={toggleRef}
        onClick={onToggle}
        className="faq-toggle-abs"
        style={{
          position: "absolute",
          top: "1.6rem",
          right: 0,
          display: "flex",
          alignItems: "center",
          cursor: "none",
          fontSize: "2.4rem",
          fontStyle: "italic",
          color: "rgba(251,251,244,0.45)",
        }}
      >
        <span className="faq-bracket faq-bracket-left">(</span>

        {/* Cross icon — horizontal + vertical lines */}
        <div
          style={{
            position: "relative",
            width: "0.9rem",
            height: "0.9rem",
            margin: "0 0.45rem",
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
          }}
        >
          {/* Horizontal line (always visible) */}
          <span
            style={{
              position: "absolute",
              width: "1rem",
              height: "1px",
              background: "rgba(251,251,244,0.5)",
              display: "block",
            }}
          />
          {/* Vertical line (fades out when open) */}
          <span
            ref={vLineRef}
            style={{
              position: "absolute",
              width: "1px",
              height: "1rem",
              background: "rgba(251,251,244,0.5)",
              display: "block",
            }}
          />
        </div>

        <span className="faq-bracket faq-bracket-right">)</span>
      </div>
    </div>
  );
}

export default function FAQ() {
  const [openIndices, setOpenIndices] = useState<Set<number>>(new Set());
  const containerRef = useRef<HTMLDivElement>(null);
  const itemRefs     = useRef<(HTMLDivElement | null)[]>([]);

  const handleToggle = (index: number) => {
    setOpenIndices((prev) => {
      const next = new Set(prev);
      next.has(index) ? next.delete(index) : next.add(index);
      return next;
    });
  };

  // Proximity glow
  useEffect(() => {
    const container = containerRef.current;
    if (!container) return;

    const handleMouseMove = (e: MouseEvent) => {
      const cRect  = container.getBoundingClientRect();
      const mouseY = e.clientY - cRect.top;
      const mouseX = e.clientX - cRect.left;

      // Soft circular glow on the container background — follows the mouse
      container.style.background = `radial-gradient(circle 220px at ${mouseX}px ${mouseY}px, rgba(173,43,238,0.07) 0%, transparent 70%)`;

      itemRefs.current.forEach((item) => {
        if (!item) return;
        const r        = item.getBoundingClientRect();
        const topY     = r.top    - cRect.top;
        const bottomY  = r.bottom - cRect.top;
        const itemLeft = r.left   - cRect.left;
        const localX   = mouseX   - itemLeft;

        const isInside = mouseY > topY && mouseY < bottomY;

        if (isInside) {
          // Mouse is inside this item → glow on BOTH top and bottom border lines
          const a = 0.75;
          item.style.background = [
            `radial-gradient(ellipse 280px 2px at ${localX}px 0.5px,            rgba(173,43,238,${a}) 0%, transparent 100%)`,
            `radial-gradient(ellipse 280px 2px at ${localX}px calc(100% - 0.5px), rgba(173,43,238,${a}) 0%, transparent 100%)`,
          ].join(", ");
          item.style.borderTopColor = "rgba(251,251,244,0.02)";
          item.style.boxShadow      = "none";
        } else {
          // Outside item — proximity glow on nearest top border line
          const distY    = Math.abs(mouseY - topY);
          const strength = Math.max(0, 1 - distY / 60);

          if (strength > 0.01) {
            item.style.background     = `radial-gradient(ellipse 300px 2px at ${localX}px 0.5px, rgba(173,43,238,${(strength * 0.9).toFixed(3)}) 0%, transparent 100%)`;
            item.style.borderTopColor = `rgba(251,251,244,${(0.1 * (1 - strength * 0.8)).toFixed(3)})`;
            item.style.boxShadow      = `0 -1px 10px 0 rgba(173,43,238,${(strength * 0.2).toFixed(3)})`;
          } else {
            item.style.background     = "none";
            item.style.borderTopColor = "rgba(251,251,244,0.1)";
            item.style.boxShadow      = "none";
          }
        }
      });
    };

    const handleMouseLeave = () => {
      container.style.background = "none";
      itemRefs.current.forEach((item) => {
        if (!item) return;
        item.style.background     = "none";
        item.style.borderTopColor = "rgba(251,251,244,0.1)";
        item.style.boxShadow      = "none";
      });
    };

    container.addEventListener("mousemove", handleMouseMove, { passive: true });
    container.addEventListener("mouseleave", handleMouseLeave, { passive: true });
    return () => {
      container.removeEventListener("mousemove", handleMouseMove);
      container.removeEventListener("mouseleave", handleMouseLeave);
    };
  }, []);

  return (
    <section
      id="faq"
      style={{
        paddingTop: "14rem",
        paddingBottom: "12rem",
        paddingLeft:  "clamp(2rem, 9.5vw, 8.5rem)",
        paddingRight: "clamp(2rem, 9.5vw, 8.5rem)",
      }}
    >
      {/* Title — Estrela style: font-weight 400, same heading font */}
      <h2
        style={{
          fontSize: "clamp(3.5rem, 5vw, 5.4rem)",
          fontWeight: 400,
          lineHeight: 1,
          letterSpacing: "-0.02em",
          color: "#fbfbf4",
          marginBottom: "5rem",
        }}
      >
        FAQ
      </h2>

      {/* Items */}
      <div
        ref={containerRef}
        style={{ borderBottom: "1px solid rgba(251,251,244,0.1)" }}
      >
        {FAQ_ITEMS.map((item, i) => (
          <FAQItem
            key={item.question}
            question={item.question}
            answer={item.answer}
            isOpen={openIndices.has(i)}
            onToggle={() => handleToggle(i)}
            itemRef={(el) => { itemRefs.current[i] = el; }}
          />
        ))}
      </div>
    </section>
  );
}
