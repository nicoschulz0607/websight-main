"use client";

import { useEffect } from "react";
import { ScrollTrigger } from "@/lib/gsap";

export default function GSAPInit() {
  useEffect(() => {
    // Mobile browsers resize the viewport when the address bar hides/shows
    // while scrolling — without this, that resize triggers a full ScrollTrigger
    // refresh mid-scroll and the scrub animations visibly jump.
    ScrollTrigger.config({ ignoreMobileResize: true });

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
