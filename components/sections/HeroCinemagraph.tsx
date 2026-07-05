"use client";

import { useEffect, useRef } from "react";

/**
 * Subtle, perfectly-seamless hero cinemagraph drawn on a <canvas> over the
 * static hero still. Three ambient layers, all driven by requestAnimationFrame
 * so they repeat forever with no visible cut:
 *   • individual stars that twinkle in place (no sky drift/rotation)
 *   • rare shooting stars that streak across the upper sky
 *   • a very calm, slow shimmer on the water's light reflections
 *
 * Honors prefers-reduced-motion (renders nothing). Purely decorative: the sharp
 * still underneath is the real image, so this never affects LCP or legibility.
 */
export default function HeroCinemagraph({ className }: { className?: string }) {
  const canvasRef = useRef<HTMLCanvasElement>(null);

  useEffect(() => {
    if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) return;
    const canvas = canvasRef.current;
    const ctx = canvas?.getContext("2d");
    if (!canvas || !ctx) return;

    const rand = (a: number, b: number) => a + Math.random() * (b - a);
    let W = 0, H = 0, raf = 0, last = 0;

    // Stars twinkle in place: brightness = base + amp·sin(t·speed + phase).
    type Star = { x: number; y: number; r: number; base: number; amp: number; speed: number; phase: number };
    // Slow water glints on the reflection band.
    type Glint = { x: number; y: number; w: number; h: number; base: number; amp: number; speed: number; phase: number; sway: number };
    // Transient meteor.
    type Meteor = { x: number; y: number; vx: number; vy: number; life: number; ttl: number; len: number };

    let stars: Star[] = [];
    let glints: Glint[] = [];
    const meteors: Meteor[] = [];
    let nextMeteorIn = rand(3, 6);

    function build() {
      const mobile = W < 768;
      // Stars live in the open sky (upper band, right of the left cliff).
      stars = [];
      const starCount = mobile ? 65 : 120;
      for (let i = 0; i < starCount; i++) {
        stars.push({
          x: 0.3 + Math.pow(Math.random(), 0.8) * 0.69, // bias to the open right
          y: 0.03 + Math.random() * 0.42,               // upper ~45%
          r: rand(0.4, 1.5),
          base: rand(0.1, 0.5),
          amp: rand(0.12, 0.5),
          speed: rand(0.4, 1.9),
          phase: rand(0, Math.PI * 2),
        });
      }
      // Water shimmer over the central/right reflection band — slow + faint.
      glints = [];
      const glintCount = mobile ? 6 : 11;
      for (let i = 0; i < glintCount; i++) {
        glints.push({
          x: rand(0.34, 0.92),
          y: rand(0.57, 0.79),
          w: rand(0.05, 0.15),
          h: rand(0.004, 0.011),
          base: rand(0.02, 0.07),
          amp: rand(0.02, 0.055),
          speed: rand(0.12, 0.4), // slow, calm
          phase: rand(0, Math.PI * 2),
          sway: rand(0.06, 0.18),
        });
      }
    }

    function resize() {
      const rect = canvas.getBoundingClientRect();
      const dpr = Math.min(window.devicePixelRatio || 1, 2);
      W = rect.width; H = rect.height;
      canvas.width = Math.max(1, Math.round(W * dpr));
      canvas.height = Math.max(1, Math.round(H * dpr));
      ctx.setTransform(dpr, 0, 0, dpr, 0, 0);
      build();
    }

    function frame(now: number) {
      const dt = last ? Math.min(0.05, (now - last) / 1000) : 0;
      last = now;
      const t = now / 1000;
      ctx.clearRect(0, 0, W, H);

      // ── Stars ──────────────────────────────────────────────
      ctx.fillStyle = "#eaf2ff";
      for (const s of stars) {
        const a = s.base + s.amp * Math.sin(t * s.speed + s.phase);
        if (a <= 0.02) continue;
        const px = s.x * W, py = s.y * H;
        ctx.globalAlpha = Math.min(1, a);
        ctx.beginPath(); ctx.arc(px, py, s.r, 0, Math.PI * 2); ctx.fill();
        if (a > 0.55) { // faint glow on the brightest
          ctx.globalAlpha = (a - 0.55) * 0.35;
          ctx.beginPath(); ctx.arc(px, py, s.r * 2.6, 0, Math.PI * 2); ctx.fill();
        }
      }

      // ── Water shimmer (additive, slow) ─────────────────────
      ctx.globalCompositeOperation = "lighter";
      for (const g of glints) {
        const a = Math.max(0, g.base + g.amp * Math.sin(t * g.speed + g.phase));
        if (a <= 0.005) continue;
        const gx = (g.x + Math.sin(t * g.speed * 0.5 + g.phase) * g.sway * 0.03) * W;
        const gy = g.y * H;
        const gw = g.w * W, gh = Math.max(1, g.h * H);
        const grad = ctx.createLinearGradient(gx - gw / 2, gy, gx + gw / 2, gy);
        grad.addColorStop(0, "rgba(190,212,255,0)");
        grad.addColorStop(0.5, `rgba(205,224,255,${a.toFixed(3)})`);
        grad.addColorStop(1, "rgba(190,212,255,0)");
        ctx.fillStyle = grad;
        ctx.beginPath(); ctx.ellipse(gx, gy, gw / 2, gh, 0, 0, Math.PI * 2); ctx.fill();
      }
      ctx.globalCompositeOperation = "source-over";

      // ── Shooting stars (rare, transient) ───────────────────
      nextMeteorIn -= dt;
      if (nextMeteorIn <= 0 && meteors.length === 0) {
        const dir = Math.random() < 0.5 ? 1 : -1;
        const sp = rand(0.5, 0.85);
        meteors.push({
          x: dir === 1 ? rand(0.35, 0.6) : rand(0.55, 0.85),
          y: rand(0.05, 0.2),
          vx: dir * sp * rand(0.55, 0.8),
          vy: sp * rand(0.32, 0.5),
          life: 0,
          ttl: rand(0.7, 1.2),
          len: rand(0.07, 0.13),
        });
        nextMeteorIn = rand(6, 13);
      }
      for (let i = meteors.length - 1; i >= 0; i--) {
        const m = meteors[i];
        m.life += dt;
        const p = m.life / m.ttl;
        if (p >= 1) { meteors.splice(i, 1); continue; }
        const cx = (m.x + m.vx * m.life) * W;
        const cy = (m.y + m.vy * m.life) * H;
        const tx = cx - m.vx * W * m.len;
        const ty = cy - m.vy * H * m.len;
        const fade = Math.sin(Math.PI * p); // ease in and out
        const grad = ctx.createLinearGradient(tx, ty, cx, cy);
        grad.addColorStop(0, "rgba(255,255,255,0)");
        grad.addColorStop(1, `rgba(255,255,255,${(0.75 * fade).toFixed(3)})`);
        ctx.strokeStyle = grad;
        ctx.lineWidth = 1.4;
        ctx.lineCap = "round";
        ctx.beginPath(); ctx.moveTo(tx, ty); ctx.lineTo(cx, cy); ctx.stroke();
      }

      ctx.globalAlpha = 1;
      raf = requestAnimationFrame(frame);
    }

    resize();
    raf = requestAnimationFrame(frame);

    const onResize = () => resize();
    window.addEventListener("resize", onResize);
    const onVisibility = () => {
      if (document.hidden) {
        cancelAnimationFrame(raf);
      } else {
        last = 0;
        raf = requestAnimationFrame(frame);
      }
    };
    document.addEventListener("visibilitychange", onVisibility);

    return () => {
      cancelAnimationFrame(raf);
      window.removeEventListener("resize", onResize);
      document.removeEventListener("visibilitychange", onVisibility);
    };
  }, []);

  return <canvas ref={canvasRef} aria-hidden className={className} style={{ pointerEvents: "none" }} />;
}
