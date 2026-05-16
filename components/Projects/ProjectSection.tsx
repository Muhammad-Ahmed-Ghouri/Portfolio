"use client";

import { useEffect, useRef, useState } from "react";
import { motion, useInView } from "framer-motion";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import ConstellationOrb from "./ConstellationOrb";
import ProjectCard, { Project } from "./ProjectCard";

if (typeof window !== "undefined") {
  gsap.registerPlugin(ScrollTrigger);
}

// ── Project data ────────────────────────────────────────────────────────────
const projects: Project[] = [
  {
    id: 0,
    title: "Real-Time Chat App",
    description:
      "Fully functional messaging platform with WebSocket-powered live communication, rooms, user presence indicators, and message history.",
    tags: ["Socket.io", "React", "Node.js", "MongoDB"],
    category: "Full Stack",
    icon: "💬",
    color: "rgba(59,130,246,0.15)",
    colorBorder: "rgba(59,130,246,0.35)",
    colorText: "#60a5fa",
    featured: true,
  },
  {
    id: 1,
    title: "E-Commerce Platform",
    description:
      "Multiple full-featured online stores with product listings, cart, checkout flow, admin dashboard, and order management.",
    tags: ["Next.js", "Redux", "PostgreSQL", "Stripe"],
    category: "Full Stack",
    icon: "🛒",
    color: "rgba(34,197,94,0.12)",
    colorBorder: "rgba(34,197,94,0.3)",
    colorText: "#4ade80",
    featured: true,
  },
  {
    id: 2,
    title: "Restaurant Management",
    description:
      "End-to-end restaurant ops system — table bookings, menu management, order tracking, and kitchen dashboard.",
    tags: ["React", "Express", "MongoDB"],
    category: "Management System",
    icon: "🍽️",
    color: "rgba(251,146,60,0.12)",
    colorBorder: "rgba(251,146,60,0.3)",
    colorText: "#fb923c",
  },
  {
    id: 3,
    title: "Service Management",
    description:
      "Comprehensive platform for managing service requests, technician dispatch, SLA tracking, and client portals.",
    tags: ["Next.js", "PostgreSQL", "Fastify"],
    category: "Enterprise",
    icon: "⚙️",
    color: "rgba(168,85,247,0.12)",
    colorBorder: "rgba(168,85,247,0.3)",
    colorText: "#c084fc",
  },
  {
    id: 4,
    title: "Text Editor",
    description:
      "Browser-based rich text editor with formatting toolbar, live word count, export options, and auto-save.",
    tags: ["React", "JavaScript", "CSS"],
    category: "Productivity",
    icon: "✏️",
    color: "rgba(20,184,166,0.12)",
    colorBorder: "rgba(20,184,166,0.3)",
    colorText: "#2dd4bf",
  },
  {
    id: 5,
    title: "News Aggregator",
    description:
      "Live news website pulling from multiple APIs, with category filters, search, and a clean reading experience.",
    tags: ["React", "API", "Tailwind"],
    category: "Web App",
    icon: "📰",
    color: "rgba(245,158,11,0.12)",
    colorBorder: "rgba(245,158,11,0.3)",
    colorText: "#fbbf24",
  },
  {
    id: 6,
    title: "Calculator App",
    description:
      "Sleek scientific calculator with keyboard support, history log, and smooth button animations.",
    tags: ["JavaScript", "CSS", "HTML"],
    category: "Utility",
    icon: "🔢",
    color: "rgba(239,68,68,0.12)",
    colorBorder: "rgba(239,68,68,0.3)",
    colorText: "#f87171",
  },
  {
    id: 7,
    title: "Clock App",
    description:
      "Analog + digital clock with world timezone support, stopwatch, countdown timer, and dark/light themes.",
    tags: ["React", "JavaScript", "CSS"],
    category: "Utility",
    icon: "🕐",
    color: "rgba(59,130,246,0.12)",
    colorBorder: "rgba(59,130,246,0.3)",
    colorText: "#60a5fa",
  },
  {
    id: 8,
    title: "Quote Generator",
    description:
      "Elegant app that fetches and displays random inspirational quotes with share-to-Twitter and copy features.",
    tags: ["React", "API", "Framer Motion"],
    category: "Mini App",
    icon: "💡",
    color: "rgba(236,72,153,0.12)",
    colorBorder: "rgba(236,72,153,0.3)",
    colorText: "#f472b6",
  },
];

const CATEGORIES = ["All", "Full Stack", "Management System", "Enterprise", "Web App", "Utility", "Mini App", "Productivity"];

// ── Main component ──────────────────────────────────────────────────────────
export default function ProjectsSection() {
  const sectionRef   = useRef<HTMLElement>(null);
  const lineRef      = useRef<HTMLDivElement>(null);
  const [activeId, setActiveId]     = useState<number | null>(null);
  const [activeFilter, setFilter]   = useState("All");

  const filtered = activeFilter === "All"
    ? projects
    : projects.filter((p) => p.category === activeFilter);

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
      <style>{`
        @import url('https://fonts.googleapis.com/css2?family=Space+Grotesk:wght@300;400;500;600;700&family=Syne:wght@700;800&display=swap');
      `}</style>

      <section
        ref={sectionRef}
        id="projects"
        style={{
          position: "relative", overflow: "hidden",
          background: "#050810", minHeight: "100vh",
          padding: "120px 0 120px",
          fontFamily: "'Space Grotesk', sans-serif",
          color: "#e2e8f5",
        }}
      >
        {/* Grid overlay */}
        <div style={{
          position: "absolute", inset: 0, pointerEvents: "none",
          backgroundImage:
            "linear-gradient(rgba(59,130,246,0.03) 1px,transparent 1px)," +
            "linear-gradient(90deg,rgba(59,130,246,0.03) 1px,transparent 1px)",
          backgroundSize: "60px 60px",
        }} />

        {/* Ambients */}
        <div style={{
          position: "absolute", width: 700, height: 700,
          top: -200, left: -200, borderRadius: "50%",
          background: "radial-gradient(circle,rgba(37,99,235,0.13) 0%,transparent 70%)",
          filter: "blur(90px)", pointerEvents: "none",
        }} />
        <div style={{
          position: "absolute", width: 500, height: 500,
          bottom: -100, right: -150, borderRadius: "50%",
          background: "radial-gradient(circle,rgba(59,130,246,0.08) 0%,transparent 70%)",
          filter: "blur(80px)", pointerEvents: "none",
        }} />

        {/* BG watermark */}
        <div aria-hidden style={{
          position: "absolute", top: "50%", left: "50%",
          transform: "translate(-50%,-50%)",
          fontFamily: "'Syne',sans-serif",
          fontSize: "clamp(90px,15vw,210px)", fontWeight: 800,
          letterSpacing: "-0.02em", whiteSpace: "nowrap",
          color: "transparent",
          WebkitTextStroke: "1.5px rgba(59,130,246,0.06)",
          userSelect: "none", pointerEvents: "none", lineHeight: 1,
        }}>
          PROJECTS
        </div>

        <div style={{
          position: "relative", zIndex: 2,
          maxWidth: 1160, margin: "0 auto", padding: "0 40px",
        }}>

          {/* ── Header + Constellation ── */}
          <div style={{
            display: "flex", alignItems: "flex-end",
            justifyContent: "space-between", gap: 40, marginBottom: 72,
          }}>
            <div style={{ maxWidth: 560 }}>
              <motion.div
                initial={{ opacity: 0, x: -20 }}
                whileInView={{ opacity: 1, x: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.6 }}
                style={{
                  display: "inline-flex", alignItems: "center", gap: 10,
                  fontSize: 11, fontWeight: 600, letterSpacing: "0.18em",
                  textTransform: "uppercase", color: "#60a5fa", marginBottom: 18,
                }}
              >
                <div style={{ width: 28, height: 1, background: "#60a5fa" }} />
                Selected work
              </motion.div>

              <motion.h2
                initial={{ opacity: 0, y: 28 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.85, delay: 0.1, ease: [0.22, 1, 0.36, 1] }}
                style={{
                  fontFamily: "'Syne',sans-serif",
                  fontSize: "clamp(38px,5.5vw,64px)", fontWeight: 800,
                  lineHeight: 1.06, letterSpacing: "-0.03em", color: "#e2e8f5",
                }}
              >
                Things I&rsquo;ve{" "}
                <span style={{
                  background: "linear-gradient(135deg,#3b82f6 0%,#93c5fd 100%)",
                  WebkitBackgroundClip: "text", WebkitTextFillColor: "transparent",
                  backgroundClip: "text",
                }}>
                  shipped.
                </span>
              </motion.h2>

              <div ref={lineRef} style={{
                height: 1, background: "linear-gradient(90deg,#2563eb,transparent)",
                transformOrigin: "left", margin: "28px 0",
              }} />

              <motion.p
                initial={{ opacity: 0, y: 16 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.7, delay: 0.3 }}
                style={{ fontSize: 15, lineHeight: 1.8, color: "#7b8bab" }}
              >
                A collection of real-world projects — from full-stack platforms
                to sharp utility apps. Hover a card to illuminate its node in
                the constellation.
              </motion.p>
            </div>

            {/* Constellation orb */}
            <motion.div
              initial={{ opacity: 0, scale: 0.75 }}
              whileInView={{ opacity: 1, scale: 1 }}
              viewport={{ once: true }}
              transition={{ duration: 1.1, ease: [0.22, 1, 0.36, 1] }}
              style={{ flexShrink: 0, position: "relative" }}
            >
              <div style={{
                width: 260, height: 260,
                position: "relative",
              }}>
                {/* Spinning outer deco rings */}
                <div style={{
                  position: "absolute", inset: -16, borderRadius: "50%",
                  border: "1px solid rgba(59,130,246,0.1)",
                  animation: "spin-cw 50s linear infinite",
                }} />
                <div style={{
                  position: "absolute", inset: -8, borderRadius: "50%",
                  border: "1px dashed rgba(59,130,246,0.07)",
                  animation: "spin-ccw 32s linear infinite",
                }} />
                <style>{`
                  @keyframes spin-cw  { to { transform: rotate(360deg);  } }
                  @keyframes spin-ccw { to { transform: rotate(-360deg); } }
                `}</style>

                <div style={{ width: "100%", height: "100%", borderRadius: "50%", overflow: "hidden" }}>
                  <ConstellationOrb activeIndex={activeId} totalProjects={projects.length} />
                </div>

                {/* Label */}
                <div style={{
                  position: "absolute", bottom: -26, left: "50%",
                  transform: "translateX(-50%)",
                  fontSize: 9, fontWeight: 600, letterSpacing: "0.15em",
                  textTransform: "uppercase", color: "#7b8bab",
                  whiteSpace: "nowrap", display: "flex", alignItems: "center", gap: 6,
                }}>
                  <div style={{
                    width: 5, height: 5, borderRadius: "50%", background: "#3b82f6",
                    animation: "pulse-d 2s ease-in-out infinite",
                  }} />
                  {activeId !== null
                    ? projects.find((p) => p.id === activeId)?.title ?? "Hover a project"
                    : `${projects.length} projects`}
                  <style>{`
                    @keyframes pulse-d{0%,100%{opacity:1;transform:scale(1)}50%{opacity:.4;transform:scale(.6)}}
                  `}</style>
                </div>
              </div>
            </motion.div>
          </div>

          {/* ── Filter strip ── */}
          <motion.div
            initial={{ opacity: 0, y: 14 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.55 }}
            style={{
              display: "flex", flexWrap: "wrap", gap: 8,
              marginBottom: 28, alignItems: "center",
            }}
          >
            {CATEGORIES.map((cat) => (
              <button
                key={cat}
                onClick={() => setFilter(cat)}
                style={{
                  fontSize: 11, fontWeight: 600,
                  letterSpacing: "0.08em", textTransform: "uppercase",
                  padding: "6px 16px", borderRadius: 99, cursor: "pointer",
                  border: `1px solid ${activeFilter === cat ? "rgba(59,130,246,0.45)" : "rgba(59,130,246,0.1)"}`,
                  background: activeFilter === cat ? "rgba(59,130,246,0.16)" : "transparent",
                  color: activeFilter === cat ? "#60a5fa" : "#7b8bab",
                  fontFamily: "'Space Grotesk', sans-serif",
                  transition: "all 0.22s",
                }}
              >
                {cat}
              </button>
            ))}
            <span style={{
              marginLeft: "auto", fontSize: 11, color: "#7b8bab",
              display: "flex", alignItems: "center", gap: 7,
            }}>
              <div style={{ width: 1, height: 14, background: "rgba(59,130,246,0.15)" }} />
              {filtered.length} project{filtered.length !== 1 ? "s" : ""}
            </span>
          </motion.div>

          {/* ── Projects grid ── */}
          <div style={{
            display: "grid",
            gridTemplateColumns: "repeat(3, 1fr)",
            gap: 18,
          }}>
            {filtered.map((project, i) => (
              <ProjectCard
                key={project.id}
                project={project}
                index={i}
                isActive={activeId === project.id}
                onHover={setActiveId}
              />
            ))}
          </div>
        </div>
      </section>
    </>
  );
}