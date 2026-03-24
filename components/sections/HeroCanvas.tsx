"use client";

import { useEffect, useRef } from "react";

// ── Types ─────────────────────────────────────────────────────────────────────
interface Particle {
  x: number; y: number;
  vx: number; vy: number;
  baseVx: number; baseVy: number;
  radius: number;
  color: string;
  opacity: number; baseOpacity: number;
  glowRadius: number;
  trail: { x: number; y: number }[];
  isComet: boolean;
}

interface Star {
  x: number; y: number;
  r: number; opacity: number;
}

interface Nebula {
  x: number; y: number;
  radius: number;
  color: string;
  opacity: number;
  vx: number; vy: number;
}

// ── Constants ─────────────────────────────────────────────────────────────────
const COLORS = ["#60a5fa", "#ad2bee", "#60a5fa", "#8b6ff7", "#ad2bee", "#60a5fa"];
const PARTICLE_COUNT   = 140;
const COMET_COUNT      = 5;
const STAR_COUNT       = 220;
const NEBULA_COUNT     = 6;
const CONNECTION_DIST  = 120;
const MOUSE_DIST       = 240;
const MOUSE_STRENGTH   = 0.02;
const TRAIL_LEN        = 18;

function rnd(min: number, max: number) { return min + Math.random() * (max - min); }

function makeParticle(w: number, h: number, isComet = false): Particle {
  const color = COLORS[Math.floor(Math.random() * COLORS.length)];
  const speed = isComet ? rnd(1.2, 2.4) : rnd(0.08, 0.28);
  const angle = Math.random() * Math.PI * 2;
  const baseOpacity = isComet ? rnd(0.55, 0.9) : rnd(0.18, 0.65);
  return {
    x: Math.random() * w, y: Math.random() * h,
    vx: Math.cos(angle) * speed, vy: Math.sin(angle) * speed,
    baseVx: Math.cos(angle) * speed, baseVy: Math.sin(angle) * speed,
    radius: isComet ? rnd(1.5, 2.8) : rnd(0.8, 2.4),
    color, opacity: baseOpacity, baseOpacity,
    glowRadius: isComet ? rnd(12, 22) : rnd(6, 22),
    trail: [],
    isComet,
  };
}

function makeStar(w: number, h: number): Star {
  return {
    x: Math.random() * w, y: Math.random() * h,
    r: rnd(0.3, 1.1),
    opacity: rnd(0.08, 0.35),
  };
}

function makeNebula(w: number, h: number): Nebula {
  const color = Math.random() > 0.5 ? "#60a5fa" : "#ad2bee";
  return {
    x: rnd(w * 0.1, w * 0.9), y: rnd(h * 0.05, h * 0.95),
    radius: rnd(w * 0.12, w * 0.22),
    color, opacity: rnd(0.025, 0.06),
    vx: rnd(-0.06, 0.06), vy: rnd(-0.04, 0.04),
  };
}

// ── Component ─────────────────────────────────────────────────────────────────
export default function HeroCanvas() {
  const canvasRef    = useRef<HTMLCanvasElement>(null);
  const mouseRef     = useRef({ x: -9999, y: -9999, active: false });
  const particlesRef = useRef<Particle[]>([]);
  const starsRef     = useRef<Star[]>([]);
  const nebulaeRef   = useRef<Nebula[]>([]);
  const rafRef       = useRef<number>(0);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext("2d");
    if (!ctx) return;

    const init = () => {
      const w = canvas.offsetWidth;
      const h = canvas.offsetHeight;
      canvas.width  = w;
      canvas.height = h;

      starsRef.current     = Array.from({ length: STAR_COUNT },     () => makeStar(w, h));
      nebulaeRef.current   = Array.from({ length: NEBULA_COUNT },   () => makeNebula(w, h));
      particlesRef.current = [
        ...Array.from({ length: PARTICLE_COUNT }, () => makeParticle(w, h, false)),
        ...Array.from({ length: COMET_COUNT },    () => makeParticle(w, h, true)),
      ];
    };

    init();
    window.addEventListener("resize", init);

    const onMove  = (e: MouseEvent) => {
      const r = canvas.getBoundingClientRect();
      mouseRef.current = { x: e.clientX - r.left, y: e.clientY - r.top, active: true };
    };
    const onLeave = () => { mouseRef.current = { x: -9999, y: -9999, active: false }; };

    // ── Draw helpers ─────────────────────────────────────────────────────────
    const drawGlow = (
      x: number, y: number, r: number, gr: number,
      color: string, opacity: number
    ) => {
      const g = ctx.createRadialGradient(x, y, 0, x, y, gr);
      const a1 = Math.round(opacity * 200).toString(16).padStart(2, "0");
      const a2 = Math.round(opacity * 55).toString(16).padStart(2, "0");
      g.addColorStop(0,   color + a1);
      g.addColorStop(0.4, color + a2);
      g.addColorStop(1,   color + "00");
      ctx.beginPath(); ctx.arc(x, y, gr, 0, Math.PI * 2);
      ctx.fillStyle = g; ctx.fill();
      ctx.beginPath(); ctx.arc(x, y, r, 0, Math.PI * 2);
      ctx.fillStyle = color + Math.round(opacity * 255).toString(16).padStart(2, "0");
      ctx.fill();
    };

    const tick = () => {
      const W = canvas.width;
      const H = canvas.height;
      const mouse = mouseRef.current;

      ctx.clearRect(0, 0, W, H);

      // ── 1. Starfield ───────────────────────────────────────────────────────
      for (const s of starsRef.current) {
        ctx.beginPath();
        ctx.arc(s.x, s.y, s.r, 0, Math.PI * 2);
        ctx.fillStyle = `rgba(251,251,244,${s.opacity})`;
        ctx.fill();
      }

      // ── 2. Nebula blobs ────────────────────────────────────────────────────
      for (const n of nebulaeRef.current) {
        const g = ctx.createRadialGradient(n.x, n.y, 0, n.x, n.y, n.radius);
        g.addColorStop(0,   n.color + Math.round(n.opacity * 255).toString(16).padStart(2, "0"));
        g.addColorStop(0.5, n.color + Math.round(n.opacity * 80).toString(16).padStart(2, "0"));
        g.addColorStop(1,   n.color + "00");
        ctx.beginPath(); ctx.arc(n.x, n.y, n.radius, 0, Math.PI * 2);
        ctx.fillStyle = g; ctx.fill();
        n.x += n.vx; n.y += n.vy;
        const pad = 80;
        if (n.x < -pad) n.x = W + pad;
        if (n.x > W + pad) n.x = -pad;
        if (n.y < -pad) n.y = H + pad;
        if (n.y > H + pad) n.y = -pad;
      }

      // ── 3. Connection lines ────────────────────────────────────────────────
      const particles = particlesRef.current;
      for (let i = 0; i < particles.length; i++) {
        if (particles[i].isComet) continue;
        for (let j = i + 1; j < particles.length; j++) {
          if (particles[j].isComet) continue;
          const dx = particles[j].x - particles[i].x;
          const dy = particles[j].y - particles[i].y;
          const d  = Math.sqrt(dx * dx + dy * dy);
          if (d < CONNECTION_DIST) {
            ctx.beginPath();
            ctx.moveTo(particles[i].x, particles[i].y);
            ctx.lineTo(particles[j].x, particles[j].y);
            ctx.strokeStyle = particles[i].color +
              Math.round((1 - d / CONNECTION_DIST) * 0.14 * 255).toString(16).padStart(2, "0");
            ctx.lineWidth = 0.7;
            ctx.stroke();
          }
        }
      }

      // ── 4. Particles + comets ──────────────────────────────────────────────
      for (const p of particles) {
        // Mouse interaction
        const dx = mouse.x - p.x;
        const dy = mouse.y - p.y;
        const d  = Math.sqrt(dx * dx + dy * dy);
        if (mouse.active && d < MOUSE_DIST) {
          const f = (1 - d / MOUSE_DIST) * MOUSE_STRENGTH;
          p.vx += dx * f; p.vy += dy * f;
          const prox = 1 - d / MOUSE_DIST;
          p.opacity    = Math.min(1, p.baseOpacity + prox * 0.7);
          p.glowRadius = p.glowRadius * 0.93 + (6 + prox * 32) * 0.07;
        } else {
          p.vx += (p.baseVx - p.vx) * 0.025;
          p.vy += (p.baseVy - p.vy) * 0.025;
          p.opacity += (p.baseOpacity - p.opacity) * 0.04;
        }

        // Speed cap
        const spd = Math.sqrt(p.vx * p.vx + p.vy * p.vy);
        const cap = p.isComet ? 3.5 : 2.0;
        if (spd > cap) { p.vx = (p.vx / spd) * cap; p.vy = (p.vy / spd) * cap; }

        // Trail update for comets
        if (p.isComet) {
          p.trail.push({ x: p.x, y: p.y });
          if (p.trail.length > TRAIL_LEN) p.trail.shift();
          // Draw trail
          for (let t = 0; t < p.trail.length - 1; t++) {
            const prog = t / p.trail.length;
            ctx.beginPath();
            ctx.moveTo(p.trail[t].x,     p.trail[t].y);
            ctx.lineTo(p.trail[t + 1].x, p.trail[t + 1].y);
            ctx.strokeStyle = p.color +
              Math.round(prog * p.opacity * 0.7 * 255).toString(16).padStart(2, "0");
            ctx.lineWidth = p.radius * prog * 1.4;
            ctx.stroke();
          }
        }

        // Move
        p.x += p.vx; p.y += p.vy;
        const pad = 50;
        if (p.x < -pad) p.x = W + pad;
        if (p.x > W + pad) p.x = -pad;
        if (p.y < -pad) p.y = H + pad;
        if (p.y > H + pad) p.y = -pad;

        drawGlow(p.x, p.y, p.radius, p.glowRadius, p.color, p.opacity);
      }

      rafRef.current = requestAnimationFrame(tick);
    };

    rafRef.current = requestAnimationFrame(tick);

    return () => {
      cancelAnimationFrame(rafRef.current);
      window.removeEventListener("resize", init);
    };
  }, []);

  return (
    <canvas
      ref={canvasRef}
      className="absolute inset-0 w-full h-full"
      style={{ display: "block" }}
    />
  );
}
