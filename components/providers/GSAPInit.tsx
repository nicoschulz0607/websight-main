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
    }

    // Sektionen laden per dynamic() nach und Schriften/Medien ändern Höhen
    // nachträglich — ohne Refresh stimmen Start/Ende späterer ScrollTrigger
    // nicht mehr (z. B. Process zeigte am Handy schon Schritt 02).
    // Refresh nur, wenn sich die Seitenhöhe wirklich geändert hat (entprellt).
    let lastH = document.body.scrollHeight;
    let t: ReturnType<typeof setTimeout> | undefined;
    const ro = new ResizeObserver(() => {
      clearTimeout(t);
      t = setTimeout(() => {
        const h = document.body.scrollHeight;
        if (Math.abs(h - lastH) < 2) return;
        ScrollTrigger.refresh();
        lastH = document.body.scrollHeight;
      }, 250);
    });
    ro.observe(document.body);

    return () => {
      window.removeEventListener("load", onLoad);
      ro.disconnect();
      clearTimeout(t);
    };
  }, []);

  return null;
}
