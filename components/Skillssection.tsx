"use client";

import { useEffect, useRef, useState } from "react";
import { motion, useInView } from "framer-motion";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import AnalogClock from "./AnalogClock";

if (typeof window !== "undefined") {
  gsap.registerPlugin(ScrollTrigger);
}

// ── Skill data ─────────────────────────────────────────────────────────────
interface Skill {
  name: string;
  level: number;   // 0–100
  category: string;
}

const skills: Skill[] = [
  // Frontend
  { name: "React.js",      level: 95, category: "Frontend" },
  { name: "Next.js",       level: 90, category: "Frontend" },
  { name: "TypeScript",    level: 88, category: "Frontend" },
  { name: "JavaScript",    level: 95, category: "Frontend" },
  { name: "HTML",          level: 98, category: "Frontend" },
  { name: "CSS",           level: 92, category: "Frontend" },
  { name: "Tailwind",      level: 90, category: "Frontend" },
  { name: "Material UI",   level: 82, category: "Frontend" },
  { name: "Bootstrap",     level: 80, category: "Frontend" },
  { name: "Redux",         level: 85, category: "Frontend" },
  // Backend
  { name: "Node.js",       level: 88, category: "Backend" },
  { name: "Express",       level: 85, category: "Backend" },
  { name: "Fastify",       level: 78, category: "Backend" },
  { name: "PostgreSQL",    level: 80, category: "Backend" },
  { name: "MongoDB",       level: 83, category: "Backend" },
  // Tools
  { name: "Git",           level: 92, category: "Tools" },
  { name: "GitHub",        level: 90, category: "Tools" },
  { name: "API",           level: 88, category: "Tools" },
];

const categories = ["All", "Frontend", "Backend", "Tools"];

const categoryColor: Record<string, string> = {
  Frontend: "rgba(59,130,246,0.18)",
  Backend:  "rgba(34,197,94,0.14)",
  Tools:    "rgba(168,85,247,0.14)",
};
const categoryBorder: Record<string, string> = {
  Frontend: "rgba(59,130,246,0.35)",
  Backend:  "rgba(34,197,94,0.3)",
  Tools:    "rgba(168,85,247,0.3)",
};
const categoryText: Record<string, string> = {
  Frontend: "#60a5fa",
  Backend:  "#4ade80",
  Tools:    "#c084fc",
};
const categoryBar: Record<string, string> = {
  Frontend: "linear-gradient(90deg,#2563eb,#60a5fa)",
  Backend:  "linear-gradient(90deg,#16a34a,#4ade80)",
  Tools:    "linear-gradient(90deg,#7c3aed,#c084fc)",
};

// ── Skill Card ─────────────────────────────────────────────────────────────
function SkillCard({ skill, index }: { skill: Skill; index: number }) {
  const ref    = useRef<HTMLDivElement>(null);
  const isInView = useInView(ref, { once: true, margin: "-60px" });
  const [hovered, setHovered] = useState(false);

  return (
    <motion.div
      ref={ref}
      initial={{ opacity: 0, y: 28, scale: 0.95 }}
      animate={isInView ? { opacity: 1, y: 0, scale: 1 } : {}}
      transition={{ duration: 0.55, delay: index * 0.045, ease: [0.22, 1, 0.36, 1] }}
      onMouseEnter={() => setHovered(true)}
      onMouseLeave={() => setHovered(false)}
      style={{
        background: hovered ? categoryColor[skill.category] : "rgba(11,15,30,0.9)",
        border: `1px solid ${hovered ? categoryBorder[skill.category] : "rgba(59,130,246,0.1)"}`,
        borderRadius: "14px",
        padding: "20px 20px 16px",
        cursor: "default",
        transition: "background 0.3s, border-color 0.3s, transform 0.25s, box-shadow 0.3s",
        transform: hovered ? "translateY(-4px)" : "translateY(0)",
        boxShadow: hovered ? `0 8px 32px ${categoryColor[skill.category]}` : "none",
        position: "relative",
        overflow: "hidden",
      }}
    >
      {/* Corner glow */}
      <div style={{
        position: "absolute", top: -40, right: -40,
        width: 100, height: 100,
        borderRadius: "50%",
        background: `radial-gradient(circle, ${categoryBorder[skill.category]} 0%, transparent 70%)`,
        opacity: hovered ? 1 : 0,
        transition: "opacity 0.4s",
        pointerEvents: "none",
      }} />

      <div style={{ display: "flex", justifyContent: "space-between", alignItems: "flex-start", marginBottom: 12 }}>
        <span style={{
          fontFamily: "'Syne', sans-serif",
          fontSize: 15, fontWeight: 700,
          color: "#e2e8f5", letterSpacing: "-0.01em",
        }}>
          {skill.name}
        </span>
        <span style={{
          fontSize: 10, fontWeight: 600,
          color: categoryText[skill.category],
          background: categoryColor[skill.category],
          border: `1px solid ${categoryBorder[skill.category]}`,
          padding: "2px 8px", borderRadius: 99,
          letterSpacing: "0.05em",
        }}>
          {skill.level}%
        </span>
      </div>

      {/* Progress bar */}
      <div style={{
        height: 3, borderRadius: 99,
        background: "rgba(255,255,255,0.06)",
        overflow: "hidden",
      }}>
        <motion.div
          initial={{ width: 0 }}
          animate={isInView ? { width: `${skill.level}%` } : { width: 0 }}
          transition={{ duration: 1, delay: index * 0.045 + 0.3, ease: [0.22, 1, 0.36, 1] }}
          style={{
            height: "100%",
            background: categoryBar[skill.category],
            borderRadius: 99,
          }}
        />
      </div>

      {/* Category dot */}
      <div style={{ marginTop: 10, display: "flex", alignItems: "center", gap: 5 }}>
        <div style={{
          width: 5, height: 5, borderRadius: "50%",
          background: categoryText[skill.category],
        }} />
        <span style={{ fontSize: 10, color: "#7b8bab", letterSpacing: "0.1em", textTransform: "uppercase" }}>
          {skill.category}
        </span>
      </div>
    </motion.div>
  );
}

// ── Main Skills Section ────────────────────────────────────────────────────
export default function SkillsSection() {
  const sectionRef  = useRef<HTMLElement>(null);
  const lineRef     = useRef<HTMLDivElement>(null);
  const [active, setActive] = useState("All");

  const filtered = active === "All" ? skills : skills.filter(s => s.category === active);

  useEffect(() => {
    const ctx = gsap.context(() => {
      gsap.from(lineRef.current, {
        scaleX: 0, duration: 1.2, ease: "power3.out",
        scrollTrigger: { trigger: lineRef.current, start: "top 85%" },
      });
    }, sectionRef);
    return () => ctx.revert();
  }, []);

  return (
    <>
      {/* ── Global font import (same as About) ── */}
      <style>{`
        @import url('https://fonts.googleapis.com/css2?family=Space+Grotesk:wght@300;400;500;600;700&family=Syne:wght@700;800&display=swap');
      `}</style>

      <section
        ref={sectionRef}
        id="skills"
        className="relative overflow-hidden"
        style={{
          background: "#050810",
          minHeight: "100vh",
          padding: "120px 0 140px",
          fontFamily: "'Space Grotesk', sans-serif",
        }}
      >
        {/* ── Grid overlay ── */}
        <div className="absolute inset-0 pointer-events-none" style={{
          backgroundImage:
            "linear-gradient(rgba(59,130,246,0.03) 1px,transparent 1px),linear-gradient(90deg,rgba(59,130,246,0.03) 1px,transparent 1px)",
          backgroundSize: "60px 60px",
        }} />

        {/* ── Ambient glows ── */}
        <div className="absolute pointer-events-none" style={{
          width: 600, height: 600, top: -200, left: -200, borderRadius: "50%",
          background: "radial-gradient(circle,rgba(37,99,235,0.15) 0%,transparent 70%)",
          filter: "blur(80px)",
        }} />
        <div className="absolute pointer-events-none" style={{
          width: 400, height: 400, bottom: -100, right: -100, borderRadius: "50%",
          background: "radial-gradient(circle,rgba(59,130,246,0.09) 0%,transparent 70%)",
          filter: "blur(70px)",
        }} />

        {/* ── BG watermark ── */}
        <div
          aria-hidden
          className="absolute select-none pointer-events-none"
          style={{
            top: "50%", left: "50%",
            transform: "translate(-50%,-50%)",
            fontFamily: "'Syne',sans-serif",
            fontSize: "clamp(120px,18vw,240px)",
            fontWeight: 800,
            letterSpacing: "-0.02em",
            whiteSpace: "nowrap",
            color: "transparent",
            WebkitTextStroke: "1.5px rgba(59,130,246,0.07)",
            lineHeight: 1,
          }}
        >
          SKILLS
        </div>

        {/* ── Content ── */}
        <div className="relative z-10 max-w-6xl mx-auto px-10">

          {/* ── Header + Clock row ── */}
          <div className="flex items-end justify-between gap-10 mb-16">

            {/* Left: title block */}
            <div className="max-w-xl">
              <motion.div
                initial={{ opacity: 0, x: -20 }}
                whileInView={{ opacity: 1, x: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.6 }}
                className="flex items-center gap-3 mb-5"
                style={{ fontSize: 11, fontWeight: 600, letterSpacing: "0.18em",
                  textTransform: "uppercase", color: "#60a5fa" }}
              >
                <div style={{ width: 28, height: 1, background: "#60a5fa" }} />
                What I work with
              </motion.div>

              <motion.h2
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.8, delay: 0.1, ease: [0.22, 1, 0.36, 1] }}
                style={{
                  fontFamily: "'Syne',sans-serif",
                  fontSize: "clamp(38px,5.5vw,64px)",
                  fontWeight: 800, lineHeight: 1.06,
                  letterSpacing: "-0.03em", color: "#e2e8f5",
                }}
              >
                Crafted with the{" "}
                <span style={{
                  background: "linear-gradient(135deg,#3b82f6 0%,#93c5fd 100%)",
                  WebkitBackgroundClip: "text", WebkitTextFillColor: "transparent",
                  backgroundClip: "text",
                }}>
                  right tools.
                </span>
              </motion.h2>

              <div ref={lineRef} style={{
                height: 1,
                background: "linear-gradient(90deg,#2563eb,transparent)",
                transformOrigin: "left",
                margin: "28px 0",
              }} />

              <motion.p
                initial={{ opacity: 0, y: 16 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.7, delay: 0.3 }}
                style={{ fontSize: 15, lineHeight: 1.8, color: "#7b8bab" }}
              >
                A curated stack of technologies I use daily to ship fast, scalable,
                and beautiful products — from pixel-perfect UIs to robust APIs.
              </motion.p>
            </div>

            {/* Right: Analog Clock */}
            <motion.div
              initial={{ opacity: 0, scale: 0.7 }}
              whileInView={{ opacity: 1, scale: 1 }}
              viewport={{ once: true }}
              transition={{ duration: 1, delay: 0.2, ease: [0.22, 1, 0.36, 1] }}
              className="flex-shrink-0"
            >
              {/* Clock card */}
              <div style={{
                width: 200, height: 200,
                position: "relative",
                borderRadius: "50%",
              }}>
                {/* Outer ring decoration */}
                <div style={{
                  position: "absolute", inset: -12,
                  borderRadius: "50%",
                  border: "1px solid rgba(59,130,246,0.15)",
                  animation: "spin-slow 30s linear infinite",
                }} />
                <div style={{
                  position: "absolute", inset: -6,
                  borderRadius: "50%",
                  border: "1px dashed rgba(59,130,246,0.1)",
                  animation: "spin-slow 20s linear infinite reverse",
                }} />
                <style>{`
                  @keyframes spin-slow { to { transform: rotate(360deg); } }
                `}</style>

                <AnalogClock />

                {/* Live label */}
                <div style={{
                  position: "absolute", bottom: -28, left: "50%",
                  transform: "translateX(-50%)",
                  fontSize: 10, fontWeight: 600,
                  letterSpacing: "0.15em", textTransform: "uppercase",
                  color: "#7b8bab",
                  display: "flex", alignItems: "center", gap: 6,
                  whiteSpace: "nowrap",
                }}>
                  <div style={{
                    width: 5, height: 5, borderRadius: "50%",
                    background: "#3b82f6",
                    animation: "pulse-dot 2s ease-in-out infinite",
                  }} />
                  Live time
                  <style>{`
                    @keyframes pulse-dot {
                      0%,100%{opacity:1;transform:scale(1)}
                      50%{opacity:.5;transform:scale(0.7)}
                    }
                  `}</style>
                </div>
              </div>
            </motion.div>
          </div>

          {/* ── Filter tabs ── */}
          <motion.div
            initial={{ opacity: 0, y: 16 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
            className="flex items-center gap-3 mb-8 flex-wrap"
          >
            {categories.map((cat) => (
              <button
                key={cat}
                onClick={() => setActive(cat)}
                style={{
                  fontSize: 12, fontWeight: 600,
                  letterSpacing: "0.08em", textTransform: "uppercase",
                  padding: "7px 18px", borderRadius: 99, cursor: "pointer",
                  border: `1px solid ${active === cat ? "rgba(59,130,246,0.5)" : "rgba(59,130,246,0.12)"}`,
                  background: active === cat ? "rgba(59,130,246,0.18)" : "transparent",
                  color: active === cat ? "#60a5fa" : "#7b8bab",
                  transition: "all 0.25s",
                }}
              >
                {cat}
                <span style={{
                  marginLeft: 6, fontSize: 10,
                  color: active === cat ? "#60a5fa" : "#7b8bab",
                }}>
                  {cat === "All" ? skills.length : skills.filter(s => s.category === cat).length}
                </span>
              </button>
            ))}

            {/* Separator + count */}
            <div style={{ marginLeft: "auto", fontSize: 11, color: "#7b8bab",
              display: "flex", alignItems: "center", gap: 8 }}>
              <div style={{ width: 1, height: 16, background: "rgba(59,130,246,0.15)" }} />
              {filtered.length} skills
            </div>
          </motion.div>

          {/* ── Skills Grid ── */}
          <motion.div
            layout
            style={{
              display: "grid",
              gridTemplateColumns: "repeat(auto-fill, minmax(220px, 1fr))",
              gap: 16,
            }}
          >
            {filtered.map((skill, i) => (
              <SkillCard key={skill.name} skill={skill} index={i} />
            ))}
          </motion.div>

          {/* ── Bottom stats strip ── */}
          <motion.div
            initial={{ opacity: 0, y: 24 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8, delay: 0.3 }}
            className="mt-16 flex gap-0 overflow-hidden"
            style={{
              border: "1px solid rgba(59,130,246,0.12)",
              borderRadius: 16,
              background: "rgba(11,15,30,0.9)",
            }}
          >
            {[
              { label: "Frontend", count: skills.filter(s => s.category === "Frontend").length, color: "#60a5fa" },
              { label: "Backend",  count: skills.filter(s => s.category === "Backend").length,  color: "#4ade80" },
              { label: "Tools",    count: skills.filter(s => s.category === "Tools").length,    color: "#c084fc" },
              { label: "Total",    count: skills.length,                                        color: "#e2e8f5" },
            ].map(({ label, count, color }, i, arr) => (
              <div
                key={label}
                style={{
                  flex: 1, padding: "24px 20px",
                  borderRight: i < arr.length - 1 ? "1px solid rgba(59,130,246,0.1)" : "none",
                  textAlign: "center",
                }}
              >
                <div style={{
                  fontFamily: "'Syne',sans-serif", fontSize: 34,
                  fontWeight: 800, letterSpacing: "-0.04em",
                  lineHeight: 1, color,
                }}>
                  {count}
                </div>
                <div style={{
                  fontSize: 10, color: "#7b8bab", marginTop: 6,
                  letterSpacing: "0.1em", textTransform: "uppercase", fontWeight: 600,
                }}>
                  {label}
                </div>
              </div>
            ))}
          </motion.div>
        </div>
      </section>
    </>
  );
}