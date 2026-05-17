"use client";

import { useEffect, useRef, useCallback } from "react";
import { gsap } from "gsap";

interface Node {
  x: number;
  y: number;
  vx: number;
  vy: number;
  r: number;
  pulse: number;
  pulseSpeed: number;
  opacity: number;
  glowing: boolean;
}

interface ConstellationOrbProps {
  activeIndex: number | null;
  totalProjects: number;
}

export default function ConstellationOrb({ activeIndex, totalProjects }: ConstellationOrbProps) {
  const canvasRef  = useRef<HTMLCanvasElement>(null);
  const nodesRef   = useRef<Node[]>([]);
  const rafRef     = useRef(0);
  const activeRef  = useRef<number | null>(null);

  // Sync active index into ref for canvas loop
  useEffect(() => {
    activeRef.current = activeIndex;
  }, [activeIndex]);

  const initNodes = useCallback((W: number, H: number) => {
    const count = 38;
    nodesRef.current = Array.from({ length: count }, (_, i) => {
      const angle  = (i / count) * Math.PI * 2;
      const spread = 0.28 + Math.random() * 0.38;
      return {
        x:          W / 2 + Math.cos(angle) * W * spread * (0.6 + Math.random() * 0.4),
        y:          H / 2 + Math.sin(angle) * H * spread * (0.6 + Math.random() * 0.4),
        vx:         (Math.random() - 0.5) * 0.18,
        vy:         (Math.random() - 0.5) * 0.18,
        r:          1.2 + Math.random() * 2.2,
        pulse:      Math.random() * Math.PI * 2,
        pulseSpeed: 0.015 + Math.random() * 0.02,
        opacity:    0.25 + Math.random() * 0.55,
        glowing:    Math.random() > 0.72,
      };
    });
  }, []);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext("2d")!;

    // Entry animation
    gsap.fromTo(canvas,
      { opacity: 0, scale: 0.85 },
      { opacity: 1, scale: 1, duration: 0.8, ease: "power3.out" }
    );

    function resize() {
      const currentCanvas = canvasRef.current;
      if (!currentCanvas) return; // <── FIX 1: Strict condition check inside resize block

      const dpr = window.devicePixelRatio || 1;
      const w   = currentCanvas.offsetWidth;
      const h   = currentCanvas.offsetHeight;
      currentCanvas.width  = w * dpr;
      currentCanvas.height = h * dpr;
      ctx.scale(dpr, dpr);
      initNodes(w, h);
    }
    
    resize();
    
    // Fix 2: Named reference function variable initialized for robust window removal tracking
    const handleResize = () => {
      ctx.resetTransform();
      resize();
    };
    window.addEventListener("resize", handleResize);

    const CONNECT_DIST = 90;
    const ACTIVE_DIST  = 120;

    function draw() {
      const currentCanvas = canvasRef.current;
      if (!currentCanvas) return; // <── FIX 3: Safety Guard clause inserted to stop background canvas reference crashes on route shifts

      const W = currentCanvas.offsetWidth;
      const H = currentCanvas.offsetHeight;
      ctx.clearRect(0, 0, W, H);

      const nodes  = nodesRef.current;
      const active = activeRef.current;

      // Move nodes
      nodes.forEach((n) => {
        n.x += n.vx;
        n.y += n.vy;
        n.pulse += n.pulseSpeed;
        // Soft bounce
        if (n.x < 20 || n.x > W - 20) n.vx *= -1;
        if (n.y < 20 || n.y > H - 20) n.vy *= -1;
        n.x = Math.max(10, Math.min(W - 10, n.x));
        n.y = Math.max(10, Math.min(H - 10, n.y));
      });

      // Draw connections
      for (let i = 0; i < nodes.length; i++) {
        for (let j = i + 1; j < nodes.length; j++) {
          const dx   = nodes[i].x - nodes[j].x;
          const dy   = nodes[i].y - nodes[j].y;
          const dist = Math.sqrt(dx * dx + dy * dy);

          const threshold = active !== null ? ACTIVE_DIST : CONNECT_DIST;
          if (dist < threshold) {
            const strength  = 1 - dist / threshold;
            const isActive  = active !== null && (i % totalProjects === active || j % totalProjects === active);
            const lineAlpha = isActive
              ? Math.min(0.7, strength * 1.2)
              : strength * 0.18;
            const lineColor = isActive
              ? `rgba(96,165,250,${lineAlpha})`
              : `rgba(59,130,246,${lineAlpha})`;

            ctx.beginPath();
            ctx.moveTo(nodes[i].x, nodes[i].y);
            ctx.lineTo(nodes[j].x, nodes[j].y);
            ctx.strokeStyle = lineColor;
            ctx.lineWidth   = isActive ? strength * 1.2 : strength * 0.5;
            if (isActive) {
              ctx.shadowColor = "#3b82f6";
              ctx.shadowBlur  = 4;
            }
            ctx.stroke();
            ctx.shadowBlur = 0;
          }
        }
      }

      // Draw nodes
      nodes.forEach((n, i) => {
        const pulseScale   = 1 + Math.sin(n.pulse) * 0.3;
        const isHighlighted = active !== null && i % totalProjects === active;
        const r  = isHighlighted ? n.r * 2.8 * pulseScale : n.r * pulseScale;
        const op = isHighlighted ? 1 : n.opacity;

        if (isHighlighted || n.glowing) {
          // Glow halo
          const haloR = r * (isHighlighted ? 4 : 2.5);
          const glow  = ctx.createRadialGradient(n.x, n.y, 0, n.x, n.y, haloR);
          glow.addColorStop(0, isHighlighted ? `rgba(96,165,250,${op * 0.5})` : `rgba(59,130,246,0.2)`);
          glow.addColorStop(1, "rgba(59,130,246,0)");
          ctx.beginPath();
          ctx.arc(n.x, n.y, haloR, 0, Math.PI * 2);
          ctx.fillStyle = glow;
          ctx.fill();
        }

        // Core dot
        ctx.beginPath();
        ctx.arc(n.x, n.y, r, 0, Math.PI * 2);
        ctx.fillStyle = isHighlighted
          ? `rgba(147,197,253,${op})`
          : n.glowing
          ? `rgba(96,165,250,${op})`
          : `rgba(59,130,246,${op * 0.7})`;
        if (isHighlighted) {
          ctx.shadowColor = "#60a5fa";
          ctx.shadowBlur  = 14;
        }
        ctx.fill();
        ctx.shadowBlur = 0;
      });

      // Central hub
      const hubGlow = ctx.createRadialGradient(W/2, H/2, 0, W/2, H/2, 22);
      hubGlow.addColorStop(0, "rgba(59,130,246,0.4)");
      hubGlow.addColorStop(1, "rgba(59,130,246,0)");
      ctx.beginPath();
      ctx.arc(W/2, H/2, 22, 0, Math.PI * 2);
      ctx.fillStyle = hubGlow;
      ctx.fill();

      ctx.beginPath();
      ctx.arc(W/2, H/2, 4, 0, Math.PI * 2);
      ctx.fillStyle = "#93c5fd";
      ctx.shadowColor = "#3b82f6";
      ctx.shadowBlur  = 12;
      ctx.fill();
      ctx.shadowBlur = 0;

      // Outer ring (static)
      ctx.beginPath();
      ctx.arc(W/2, H/2, Math.min(W, H) * 0.46, 0, Math.PI * 2);
      ctx.strokeStyle = "rgba(59,130,246,0.06)";
      ctx.lineWidth   = 0.8;
      ctx.stroke();

      rafRef.current = requestAnimationFrame(draw);
    }

    rafRef.current = requestAnimationFrame(draw);
    
    return () => {
      cancelAnimationFrame(rafRef.current);
      window.removeEventListener("resize", handleResize); // <── Fix 4: Clean memory pointers explicitly
    };
  }, [initNodes, totalProjects]);

  return (
    <canvas
      ref={canvasRef}
      style={{ width: "100%", height: "100%", display: "block" }}
    />
  );
}