"use client";
import { useState, useEffect } from "react";

export function useIsMobile(breakpoint = 768): boolean {
  // Always start false so the first client render matches the server-rendered
  // HTML (SSR has no window) — the real value is set after mount in the effect.
  const [isMobile, setIsMobile] = useState(false);
  useEffect(() => {
    const check = () => setIsMobile(window.innerWidth < breakpoint);
    check();
    window.addEventListener("resize", check);
    return () => window.removeEventListener("resize", check);
  }, [breakpoint]);
  return isMobile;
}
