"use client";

import { useEffect } from "react";
import { ScrollTrigger } from "@/lib/gsap";

export default function GSAPInit() {
  useEffect(() => {
    // Refresh ScrollTrigger once all content has loaded
    // This ensures pin calculations are correct
    const onLoad = () => ScrollTrigger.refresh();
    if (document.readyState === "complete") {
      ScrollTrigger.refresh();
    } else {
      window.addEventListener("load", onLoad);
      return () => window.removeEventListener("load", onLoad);
    }
  }, []);

  return null;
}
