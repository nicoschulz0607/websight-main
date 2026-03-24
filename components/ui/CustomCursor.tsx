"use client";

import { useEffect, useRef } from "react";
import { gsap } from "@/lib/gsap";
import { useCursor } from "@/components/providers/CursorContext";
import { useIsMobile } from "@/lib/useIsMobile";

export default function CustomCursor() {
  const pillRef = useRef<HTMLDivElement>(null);
  const { cursorMode, setCursorMode } = useCursor();
  const isMobile = useIsMobile();

  useEffect(() => {
    if (isMobile || !pillRef.current) return;

    const pill = pillRef.current;

    // Initial state
    gsap.set(pill, { x: -200, y: -200, scale: 0, opacity: 0 });

    const xToPill = gsap.quickTo(pill, "x", { duration: 0.15, ease: "power2.out" });
    const yToPill = gsap.quickTo(pill, "y", { duration: 0.15, ease: "power2.out" });

    const onMouseMove = (e: MouseEvent) => {
      xToPill(e.clientX);
      yToPill(e.clientY);
    };

    const onScroll = () => {
      // If we scroll, optionally clear the cursor if we left the section
      // The easiest way to fix the stuck cursor is to force it to re-evaluate or just hide it
      // if the hovered element is no longer a project card.
      // But simply checking document.elementFromPoint can be expensive. 
      // Let's just let the normal mouseleave events handle it, or we can force cursorMode to default 
      // when scrolling heavily.
    };

    window.addEventListener("mousemove", onMouseMove);
    return () => {
      window.removeEventListener("mousemove", onMouseMove);
    };
  }, [isMobile]);

  useEffect(() => {
    if (isMobile || !pillRef.current) return;

    if (cursorMode === "view-project") {
      gsap.to(pillRef.current, { scale: 1, opacity: 1, duration: 0.3, ease: "power2.out" });
    } else {
      gsap.to(pillRef.current, { scale: 0, opacity: 0, duration: 0.2 });
    }
  }, [cursorMode, isMobile]);

  // Fix: global scroll listener to remove cursor if wheel is scrolled
  // This helps when the user scrolls away without moving the mouse!
  useEffect(() => {
    const handleScroll = () => {
      if (cursorMode === "view-project") {
        setCursorMode("default");
      }
    };
    window.addEventListener("wheel", handleScroll, { passive: true });
    window.addEventListener("touchmove", handleScroll, { passive: true });
    return () => {
      window.removeEventListener("wheel", handleScroll);
      window.removeEventListener("touchmove", handleScroll);
    };
  }, [cursorMode, setCursorMode]);

  if (isMobile) return null;

  return (
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
  );
}
