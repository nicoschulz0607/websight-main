"use client";

import { useEffect, useRef } from "react";
import { gsap } from "@/lib/gsap";
import { useCursor } from "@/components/providers/CursorContext";

export default function CustomCursor() {
  const dotRef = useRef<HTMLDivElement>(null);
  const pillRef = useRef<HTMLDivElement>(null);
  const { cursorMode } = useCursor();

  useEffect(() => {
    if (!dotRef.current || !pillRef.current) return;

    const dot = dotRef.current;
    const pill = pillRef.current;

    // Initial state
    gsap.set(dot, { x: -100, y: -100 });
    gsap.set(pill, { x: -200, y: -200, scale: 0, opacity: 0 });

    const xToDot = gsap.quickTo(dot, "x", { duration: 0.15, ease: "power2.out" });
    const yToDot = gsap.quickTo(dot, "y", { duration: 0.15, ease: "power2.out" });
    const xToPill = gsap.quickTo(pill, "x", { duration: 0.4, ease: "power3.out" });
    const yToPill = gsap.quickTo(pill, "y", { duration: 0.4, ease: "power3.out" });

    const onMouseMove = (e: MouseEvent) => {
      xToDot(e.clientX);
      yToDot(e.clientY);
      xToPill(e.clientX);
      yToPill(e.clientY);
    };

    window.addEventListener("mousemove", onMouseMove);
    return () => window.removeEventListener("mousemove", onMouseMove);
  }, []);

  useEffect(() => {
    if (!pillRef.current || !dotRef.current) return;

    if (cursorMode === "view-project") {
      gsap.to(pillRef.current, { scale: 1, opacity: 1, duration: 0.3, ease: "power2.out" });
      gsap.to(dotRef.current, { scale: 0, opacity: 0, duration: 0.2 });
    } else {
      gsap.to(pillRef.current, { scale: 0, opacity: 0, duration: 0.2 });
      gsap.to(dotRef.current, { scale: 1, opacity: 1, duration: 0.3, ease: "power2.out" });
    }
  }, [cursorMode]);

  return (
    <>
      {/* Small dot cursor */}
      <div
        ref={dotRef}
        className="fixed top-0 left-0 z-[9999] pointer-events-none"
        style={{ transform: "translate(-50%, -50%)" }}
      >
        <div className="w-2 h-2 rounded-full bg-cream" />
      </div>

      {/* "View Project" pill cursor */}
      <div
        ref={pillRef}
        className="fixed top-0 left-0 z-[9999] pointer-events-none"
        style={{
          transform: "translate(-50%, -50%) scale(0)",
          opacity: 0,
        }}
      >
        <div
          className="flex items-center justify-center rounded-full border border-cream/40 bg-black/80 backdrop-blur-sm px-5 py-2.5 whitespace-nowrap"
          style={{ minWidth: "120px" }}
        >
          <span className="text-cream text-xs font-medium tracking-widest uppercase">
            View Project
          </span>
        </div>
      </div>
    </>
  );
}
