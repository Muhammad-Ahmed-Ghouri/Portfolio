"use client";

import { useRef } from "react";
import { motion, useInView } from "framer-motion";

export interface Project {
  id: number;
  title: string;
  description: string;
  tags: string[];
  category: string;
  icon: string;
  color: string;
  colorBorder: string;
  colorText: string;
  featured?: boolean;
}

interface ProjectCardProps {
  project: Project;
  index: number;
  isActive: boolean;
  onHover: (id: number | null) => void;
}

export default function ProjectCard({ project, index, isActive, onHover }: ProjectCardProps) {
  const ref      = useRef<HTMLDivElement>(null);
  const isInView = useInView(ref, { once: true, margin: "-60px" });

  return (
    <motion.div
      ref={ref}
      initial={{ opacity: 0, y: 32, scale: 0.96 }}
      animate={isInView ? { opacity: 1, y: 0, scale: 1 } : {}}
      transition={{ duration: 0.6, delay: index * 0.07, ease: [0.22, 1, 0.36, 1] }}
      onMouseEnter={() => onHover(project.id)}
      onMouseLeave={() => onHover(null)}
      /* Change: Added dynamic class layout scaling for featured cards on smaller displays */
      className={project.featured ? "col-span-1 sm:col-span-2" : "col-span-1"}
      style={{
        position: "relative",
        background: isActive
          ? "rgba(15,22,45,0.98)"
          : "rgba(11,15,30,0.9)",
        border: `1px solid ${isActive ? project.colorBorder : "rgba(59,130,246,0.1)"}`,
        borderRadius: 18,
        padding: project.featured ? "28px 28px 24px" : "22px 22px 18px",
        cursor: "default",
        overflow: "hidden",
        transition: "all 0.3s cubic-bezier(0.22,1,0.36,1)",
        transform: isActive ? "translateY(-6px)" : "translateY(0)",
        boxShadow: isActive
          ? `0 16px 48px ${project.color}`
          : "none",
        /* Change: Removed hardcoded gridColumn from inline styles to prevent layout breakages */
      }}
    >
      {/* Accent bar */}
      <div style={{
        position: "absolute", top: 0, left: 0,
        width: "100%", height: 2,
        background: isActive
          ? `linear-gradient(90deg, ${project.colorText}, transparent)`
          : "transparent",
        transition: "all 0.3s",
        borderRadius: "18px 18px 0 0",
      }} />

      {/* Top glow */}
      <div style={{
        position: "absolute", top: -50, right: -50,
        width: 140, height: 140, borderRadius: "50%",
        background: `radial-gradient(circle, ${project.color} 0%, transparent 70%)`,
        opacity: isActive ? 1 : 0,
        transition: "opacity 0.35s",
        pointerEvents: "none",
      }} />

      {/* Header row */}
      <div style={{ display: "flex", alignItems: "flex-start", justifyContent: "space-between", marginBottom: 14 }}>
        <div style={{ display: "flex", alignItems: "center", gap: 12 }}>
          {/* Icon blob */}
          <div style={{
            width: project.featured ? 48 : 40,
            height: project.featured ? 48 : 40,
            borderRadius: 12,
            background: project.color,
            border: `1px solid ${project.colorBorder}`,
            display: "flex", alignItems: "center", justifyContent: "center",
            fontSize: project.featured ? 22 : 18,
            flexShrink: 0,
            transition: "transform 0.3s",
            transform: isActive ? "scale(1.1) rotate(-4deg)" : "scale(1)",
          }}>
            {project.icon}
          </div>
          <div>
            <p style={{
              fontFamily: "'Syne', sans-serif",
              fontSize: project.featured ? 18 : 15,
              fontWeight: 800, color: "#e2e8f5",
              letterSpacing: "-0.02em", lineHeight: 1.2,
            }}>
              {project.title}
            </p>
            <p style={{
              fontSize: 10, fontWeight: 600,
              color: project.colorText,
              letterSpacing: "0.1em", textTransform: "uppercase",
              marginTop: 3,
            }}>
              {project.category}
            </p>
          </div>
        </div>
      </div>

      {/* Description */}
      <p style={{
        fontSize: project.featured ? 14 : 13,
        lineHeight: 1.75, color: "#7b8bab",
        marginBottom: 16,
      }}>
        {project.description}
      </p>

      {/* Tags */}
      <div style={{ display: "flex", flexWrap: "wrap", gap: 6 }}>
        {project.tags.map((tag) => (
          <span key={tag} style={{
            fontSize: 10, fontWeight: 600,
            letterSpacing: "0.06em",
            color: isActive ? project.colorText : "#7b8bab",
            background: isActive ? project.color : "rgba(255,255,255,0.04)",
            border: `1px solid ${isActive ? project.colorBorder : "rgba(255,255,255,0.07)"}`,
            padding: "3px 9px", borderRadius: 6,
            transition: "all 0.3s",
          }}>
            {tag}
          </span>
        ))}
      </div>

      {/* Featured badge */}
      {project.featured && (
        <div style={{
          position: "absolute", top: 18, right: 18,
          fontSize: 9, fontWeight: 700,
          letterSpacing: "0.12em", textTransform: "uppercase",
          color: project.colorText,
          background: project.color,
          border: `1px solid ${project.colorBorder}`,
          padding: "3px 10px", borderRadius: 99,
        }}>
          Featured
        </div>
      )}
    </motion.div>
  );
}