"use client";

import { useEffect, useRef } from "react";
import { gsap } from "gsap";

interface Ping {
  x: number;
  y: number;
  born: number;
}

export default function RadarOrb() {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const angleRef  = useRef(0);
  const pingsRef  = useRef<Ping[]>([]);
  const rafRef    = useRef(0);

  // Fixed ping positions (relative to centre, radius 0–1)
  const PING_SPOTS = [
    { r: 0.45, a: 42  },
    { r: 0.70, a: 130 },
    { r: 0.30, a: 220 },
    { r: 0.60, a: 305 },
    { r: 0.80, a: 75  },
    { r: 0.55, a: 175 },
    { r: 0.38, a: 260 },
  ];

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext("2d")!;

    // Entry animation — scale in with GSAP
    gsap.fromTo(canvas,
      { opacity: 0, scale: 0.6 },
      { opacity: 1, scale: 1, duration: 1.2, ease: "back.out(1.4)" }
    );

    function resize() {
      const currentCanvas = canvasRef.current;
      if (!currentCanvas) return;

      const size = currentCanvas.offsetWidth;
      currentCanvas.width  = size * window.devicePixelRatio;
      currentCanvas.height = size * window.devicePixelRatio;
      ctx.scale(window.devicePixelRatio, window.devicePixelRatio);
    }
    
    resize();
    
    const handleResize = () => resize();
    window.addEventListener("resize", handleResize);

    const SPEED = 0.6; // degrees per frame

    function draw() {
      const currentCanvas = canvasRef.current;
      if (!currentCanvas) return;

      const W = currentCanvas.offsetWidth;
      const H = currentCanvas.offsetHeight;
      const cx = W / 2;
      const cy = H / 2;
      const R  = W * 0.46;

      ctx.clearRect(0, 0, W, H);

      // ── Outer glow ring ──
      const outerGlow = ctx.createRadialGradient(cx, cy, R * 0.8, cx, cy, R * 1.1);
      outerGlow.addColorStop(0, "rgba(59,130,246,0.0)");
      outerGlow.addColorStop(0.6, "rgba(59,130,246,0.06)");
      outerGlow.addColorStop(1, "rgba(59,130,246,0.0)");
      ctx.beginPath();
      ctx.arc(cx, cy, R * 1.1, 0, Math.PI * 2);
      ctx.fillStyle = outerGlow;
      ctx.fill();

      // ── Face gradient ──
      const faceGrad = ctx.createRadialGradient(cx, cy * 0.85, 0, cx, cy, R);
      faceGrad.addColorStop(0,   "rgba(15,26,53,0.95)");
      faceGrad.addColorStop(0.7, "rgba(8,13,28,0.98)");
      faceGrad.addColorStop(1,   "rgba(5,8,16,1)");
      ctx.beginPath();
      ctx.arc(cx, cy, R, 0, Math.PI * 2);
      ctx.fillStyle = faceGrad;
      ctx.fill();

      // ── Concentric rings ──
      [0.25, 0.5, 0.75, 1].forEach((t) => {
        ctx.beginPath();
        ctx.arc(cx, cy, R * t, 0, Math.PI * 2);
        ctx.strokeStyle = "rgba(59,130,246,0.12)";
        ctx.lineWidth = 0.6;
        ctx.stroke();
      });

      // ── Cross-hair lines ──
      const lines = [0, 45, 90, 135];
      lines.forEach((deg) => {
        const rad = (deg * Math.PI) / 180;
        ctx.beginPath();
        ctx.moveTo(cx + Math.cos(rad) * R, cy + Math.sin(rad) * R);
        ctx.lineTo(cx - Math.cos(rad) * R, cy - Math.sin(rad) * R);
        ctx.strokeStyle = "rgba(59,130,246,0.07)";
        ctx.lineWidth = 0.5;
        ctx.stroke();
      });

      // ── Degree marks every 30° ──
      for (let d = 0; d < 360; d += 30) {
        const rad = (d * Math.PI) / 180;
        const isMajor = d % 90 === 0;
        const inner = R * (isMajor ? 0.93 : 0.96);
        ctx.beginPath();
        ctx.moveTo(cx + Math.cos(rad) * inner, cy + Math.sin(rad) * inner);
        ctx.lineTo(cx + Math.cos(rad) * R,     cy + Math.sin(rad) * R);
        ctx.strokeStyle = isMajor ? "rgba(96,165,250,0.5)" : "rgba(59,130,246,0.2)";
        ctx.lineWidth = isMajor ? 0.8 : 0.4;
        ctx.stroke();
      }

      // ── Sweep beam (cone) ──
      const sweepAngle = (angleRef.current * Math.PI) / 180;
      const coneSpan   = (50 * Math.PI) / 180; // 50° wide cone

      // Draw cone as filled arc segment with radial fade
      const coneGrad = ctx.createRadialGradient(cx, cy, 0, cx, cy, R);
      coneGrad.addColorStop(0,   "rgba(59,130,246,0.35)");
      coneGrad.addColorStop(0.5, "rgba(59,130,246,0.12)");
      coneGrad.addColorStop(1,   "rgba(59,130,246,0.0)");

      ctx.save();
      ctx.beginPath();
      ctx.moveTo(cx, cy);
      ctx.arc(cx, cy, R, sweepAngle - coneSpan, sweepAngle, false);
      ctx.closePath();
      ctx.fillStyle = coneGrad;
      ctx.fill();
      ctx.restore();

      // ── Sweep leading edge line ──
      ctx.beginPath();
      ctx.moveTo(cx, cy);
      ctx.lineTo(
        cx + Math.cos(sweepAngle) * R,
        cy + Math.sin(sweepAngle) * R
      );
      ctx.strokeStyle = "rgba(96,165,250,0.75)";
      ctx.lineWidth = 1.2;
      ctx.shadowColor = "#3b82f6";
      ctx.shadowBlur = 8;
      ctx.stroke();
      ctx.shadowBlur = 0;

      // ── Check for new pings ──
      const now = performance.now();
      PING_SPOTS.forEach(({ r, a }) => {
        const pingAngle = a % 360;
        const sweepDeg  = ((angleRef.current % 360) + 360) % 360;

        const diff = Math.abs(sweepDeg - pingAngle);
        if (diff < SPEED * 1.5 || diff > 360 - SPEED * 1.5) {
          const px = cx + Math.cos((a * Math.PI) / 180) * R * r;
          const py = cy + Math.sin((a * Math.PI) / 180) * R * r;
          
          const alreadyAlive = pingsRef.current.some(
            (p) => Math.hypot(p.x - px, p.y - py) < 4 && now - p.born < 1800
          );
          if (!alreadyAlive) {
            pingsRef.current.push({ x: px, y: py, born: now });
          }
        }
      });

      // ── Draw & age pings ──
      pingsRef.current = pingsRef.current.filter((p) => now - p.born < 3000);
      pingsRef.current.forEach((p) => {
        const age      = (now - p.born) / 3000;
        const opacity  = Math.max(0, 1 - age);
        const ringSize = 2 + age * 12;

        // Ripple ring
        ctx.beginPath();
        ctx.arc(p.x, p.y, ringSize, 0, Math.PI * 2);
        ctx.strokeStyle = `rgba(96,165,250,${opacity * 0.6})`;
        ctx.lineWidth   = 0.8;
        ctx.stroke();

        // Second ripple (delayed)
        if (age > 0.15) {
          const age2 = age - 0.15;
          const ring2 = 2 + age2 * 10;
          ctx.beginPath();
          ctx.arc(p.x, p.y, ring2, 0, Math.PI * 2);
          ctx.strokeStyle = `rgba(59,130,246,${Math.max(0, 1 - age2 - age2) * 0.4})`;
          ctx.lineWidth   = 0.5;
          ctx.stroke();
        }

        // Core dot
        ctx.beginPath();
        ctx.arc(p.x, p.y, 2, 0, Math.PI * 2);
        ctx.fillStyle = `rgba(96,165,250,${opacity})`;
        ctx.shadowColor = "#60a5fa";
        ctx.shadowBlur  = 6;
        ctx.fill();
        ctx.shadowBlur  = 0;
      });

      // ── Centre dot ──
      const centreGlow = ctx.createRadialGradient(cx, cy, 0, cx, cy, 8);
      centreGlow.addColorStop(0,   "rgba(96,165,250,0.9)");
      centreGlow.addColorStop(0.4, "rgba(59,130,246,0.5)");
      centreGlow.addColorStop(1,   "rgba(59,130,246,0)");
      ctx.beginPath();
      ctx.arc(cx, cy, 8, 0, Math.PI * 2);
      ctx.fillStyle = centreGlow;
      ctx.fill();
      ctx.beginPath();
      ctx.arc(cx, cy, 2.5, 0, Math.PI * 2);
      ctx.fillStyle = "#93c5fd";
      ctx.shadowColor = "#3b82f6";
      ctx.shadowBlur  = 10;
      ctx.fill();
      ctx.shadowBlur  = 0;

      // ── Border ring ──
      ctx.beginPath();
      ctx.arc(cx, cy, R, 0, Math.PI * 2);
      ctx.strokeStyle = "rgba(59,130,246,0.25)";
      ctx.lineWidth   = 1;
      ctx.stroke();

      // ── Advance angle ──
      angleRef.current += SPEED;

      rafRef.current = requestAnimationFrame(draw);
    }

    rafRef.current = requestAnimationFrame(draw);

    return () => {
      cancelAnimationFrame(rafRef.current);
      window.removeEventListener("resize", handleResize);
    };
  }, []);

  return (
    <canvas
      ref={canvasRef}
      style={{ width: "100%", height: "100%", display: "block" }}
    />
  );
}