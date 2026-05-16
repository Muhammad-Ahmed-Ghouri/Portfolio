"use client";

import { useEffect, useRef } from "react";
import { gsap } from "gsap";

export default function AnalogClock() {
  const hourRef   = useRef<SVGLineElement>(null);
  const minRef    = useRef<SVGLineElement>(null);
  const secRef    = useRef<SVGLineElement>(null);
  const secDotRef = useRef<SVGCircleElement>(null);
  const rafRef    = useRef<number>(0);

  useEffect(() => {
    // Entry animation — hands sweep in from 12
    gsap.fromTo(
      [hourRef.current, minRef.current, secRef.current],
      { opacity: 0, scale: 0, transformOrigin: "50px 50px" },
      { opacity: 1, scale: 1, duration: 1, stagger: 0.15, ease: "back.out(1.7)" }
    );

    function tick() {
      const now  = new Date();
      const ms   = now.getMilliseconds();
      const s    = now.getSeconds()    + ms / 1000;
      const m    = now.getMinutes()    + s  / 60;
      const h    = (now.getHours() % 12) + m / 60;

      const sDeg = s * 6;
      const mDeg = m * 6;
      const hDeg = h * 30;

      if (hourRef.current)   hourRef.current.style.transform   = `rotate(${hDeg}deg)`;
      if (minRef.current)    minRef.current.style.transform    = `rotate(${mDeg}deg)`;
      if (secRef.current)    secRef.current.style.transform    = `rotate(${sDeg}deg)`;
      if (secDotRef.current) secDotRef.current.style.transform = `rotate(${sDeg}deg)`;

      rafRef.current = requestAnimationFrame(tick);
    }

    rafRef.current = requestAnimationFrame(tick);
    return () => cancelAnimationFrame(rafRef.current);
  }, []);

  // tick marks
  const ticks = Array.from({ length: 60 }, (_, i) => {
    const isMajor = i % 5 === 0;
    const angle   = (i / 60) * 360;
    const r       = 44;
    const len     = isMajor ? 5 : 2.5;
    const x1 = 50 + r * Math.sin((angle * Math.PI) / 180);
    const y1 = 50 - r * Math.cos((angle * Math.PI) / 180);
    const x2 = 50 + (r - len) * Math.sin((angle * Math.PI) / 180);
    const y2 = 50 - (r - len) * Math.cos((angle * Math.PI) / 180);
    return { x1, y1, x2, y2, isMajor };
  });

  // Hour numerals at 12, 3, 6, 9
  const numerals = [12, 3, 6, 9].map((n) => {
    const angle = ((n / 12) * 360 - 90) * (Math.PI / 180);
    return {
      n,
      x: 50 + 35 * Math.cos(angle),
      y: 50 + 35 * Math.sin(angle),
    };
  });

  return (
    <svg
      viewBox="0 0 100 100"
      className="w-full h-full"
      style={{ overflow: "visible" }}
    >
      {/* Outer ring glow */}
      <defs>
        <filter id="glow" x="-30%" y="-30%" width="160%" height="160%">
          <feGaussianBlur stdDeviation="1.5" result="blur" />
          <feMerge>
            <feMergeNode in="blur" />
            <feMergeNode in="SourceGraphic" />
          </feMerge>
        </filter>
        <filter id="secglow" x="-50%" y="-50%" width="200%" height="200%">
          <feGaussianBlur stdDeviation="0.8" result="blur" />
          <feMerge>
            <feMergeNode in="blur" />
            <feMergeNode in="SourceGraphic" />
          </feMerge>
        </filter>
        <radialGradient id="faceGrad" cx="50%" cy="40%" r="60%">
          <stop offset="0%"   stopColor="#0f1a35" />
          <stop offset="100%" stopColor="#050810" />
        </radialGradient>
        <radialGradient id="coreGlow" cx="50%" cy="50%" r="50%">
          <stop offset="0%"   stopColor="#3b82f6" stopOpacity="0.6" />
          <stop offset="100%" stopColor="#3b82f6" stopOpacity="0"   />
        </radialGradient>
      </defs>

      {/* Face */}
      <circle cx="50" cy="50" r="47" fill="url(#faceGrad)" />

      {/* Outer decorative ring */}
      <circle cx="50" cy="50" r="47"
        fill="none" stroke="rgba(59,130,246,0.18)" strokeWidth="0.5" />
      <circle cx="50" cy="50" r="44"
        fill="none" stroke="rgba(59,130,246,0.08)" strokeWidth="0.3" />

      {/* Tick marks */}
      {ticks.map((t, i) => (
        <line
          key={i}
          x1={t.x1} y1={t.y1} x2={t.x2} y2={t.y2}
          stroke={t.isMajor ? "rgba(96,165,250,0.7)" : "rgba(59,130,246,0.25)"}
          strokeWidth={t.isMajor ? 0.6 : 0.35}
          strokeLinecap="round"
        />
      ))}

      {/* Numerals */}
      {numerals.map(({ n, x, y }) => (
        <text
          key={n} x={x} y={y}
          textAnchor="middle" dominantBaseline="central"
          fontSize="5.5" fontFamily="'Syne', sans-serif" fontWeight="700"
          fill="rgba(96,165,250,0.6)"
        >
          {n}
        </text>
      ))}

      {/* Centre ambient glow */}
      <circle cx="50" cy="50" r="16" fill="url(#coreGlow)" />

      {/* ── Hour hand ── */}
      <line
        ref={hourRef}
        x1="50" y1="50" x2="50" y2="22"
        stroke="#e2e8f5"
        strokeWidth="1.8"
        strokeLinecap="round"
        filter="url(#glow)"
        style={{ transformOrigin: "50px 50px" }}
      />

      {/* ── Minute hand ── */}
      <line
        ref={minRef}
        x1="50" y1="50" x2="50" y2="14"
        stroke="#60a5fa"
        strokeWidth="1.1"
        strokeLinecap="round"
        filter="url(#glow)"
        style={{ transformOrigin: "50px 50px" }}
      />

      {/* ── Second hand ── */}
      <g ref={secRef} style={{ transformOrigin: "50px 50px" }}>
        {/* tail */}
        <line
          x1="50" y1="50" x2="50" y2="56"
          stroke="#3b82f6"
          strokeWidth="0.6"
          strokeLinecap="round"
          filter="url(#secglow)"
        />
        {/* main */}
        <line
          x1="50" y1="50" x2="50" y2="10"
          stroke="#3b82f6"
          strokeWidth="0.6"
          strokeLinecap="round"
          filter="url(#secglow)"
        />
        {/* tip glow dot */}
        <circle cx="50" cy="10" r="1.2" fill="#60a5fa" filter="url(#secglow)" />
      </g>

      {/* ── Second dot track (orbiting) ── */}
      <g ref={secDotRef} style={{ transformOrigin: "50px 50px" }}>
        <circle cx="50" cy="5.5" r="0.9" fill="#3b82f6" filter="url(#secglow)" />
      </g>

      {/* Centre cap */}
      <circle cx="50" cy="50" r="2.2" fill="#3b82f6" filter="url(#glow)" />
      <circle cx="50" cy="50" r="1"   fill="#e2e8f5" />
    </svg>
  );
}