"use client";

import { useEffect, useRef, useState } from "react";
import { motion, useInView } from "framer-motion";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import RadarOrb from "./RadarOrb";

if (typeof window !== "undefined") {
  gsap.registerPlugin(ScrollTrigger);
}

// ── Social links ───────────────────────────────────────────────────────────
const socials = [
  {
    label: "GitHub",
    href: "https://github.com/Muhammad-Ahmed-Ghouri",
    icon: (
      <svg width="18" height="18" viewBox="0 0 24 24" fill="currentColor">
        <path d="M12 2C6.477 2 2 6.484 2 12.017c0 4.425 2.865 8.18 6.839 9.504.5.092.682-.217.682-.483 0-.237-.008-.868-.013-1.703-2.782.605-3.369-1.343-3.369-1.343-.454-1.158-1.11-1.466-1.11-1.466-.908-.62.069-.608.069-.608 1.003.07 1.531 1.032 1.531 1.032.892 1.53 2.341 1.088 2.91.832.092-.647.35-1.088.636-1.338-2.22-.253-4.555-1.113-4.555-4.951 0-1.093.39-1.988 1.029-2.688-.103-.253-.446-1.272.098-2.65 0 0 .84-.27 2.75 1.026A9.564 9.564 0 0112 6.844c.85.004 1.705.115 2.504.337 1.909-1.296 2.747-1.027 2.747-1.027.546 1.379.202 2.398.1 2.651.64.7 1.028 1.595 1.028 2.688 0 3.848-2.339 4.695-4.566 4.943.359.309.678.92.678 1.855 0 1.338-.012 2.419-.012 2.747 0 .268.18.58.688.482A10.019 10.019 0 0022 12.017C22 6.484 17.522 2 12 2z"/>
      </svg>
    ),
  },
{
    label: "LinkedIn",
    href: "https://www.linkedin.com/in/muhammad-ahmed-995b90355/",
    icon: (
      <svg width="18" height="18" viewBox="0 0 24 24" fill="currentColor">
        <path d="M20.447 20.452h-3.554v-5.569c0-1.328-.027-3.037-1.852-3.037-1.853 0-2.136 1.445-2.136 2.939v5.667H9.351V9h3.414v1.561h.046c.477-.9 1.637-1.85 3.37-1.85 3.601 0 4.267 2.37 4.267 5.455v6.286zM5.337 7.433a2.062 2.062 0 01-2.063-2.065 2.064 2.064 0 112.063 2.065zm1.782 13.019H3.555V9h3.564v11.452zM22.225 0H1.771C.792 0 0 .774 0 1.729v20.542C0 23.227.792 24 1.771 24h20.451C23.2 24 24 23.227 24 22.271V1.729C24 .774 23.2 0 22.222 0h.003z"/>
      </svg>
    ),
  },
  {
    label: "WhatsApp",
    href: "https://wa.me/923001296099",
    icon: (
      <svg 
        width="24" 
        height="24" 
        viewBox="0 0 24 24" 
        fill="none" 
        stroke="currentColor" 
        strokeWidth="2" 
        strokeLinecap="round" 
        strokeLinejoin="round"
      >
        <path d="M21 11.5a8.38 8.38 0 0 1-.9 3.8 8.5 8.5 0 0 1-7.6 4.7 8.38 8.38 0 0 1-3.8-.9L3 21l1.9-5.7a8.38 8.38 0 0 1-.9-3.8 8.5 8.5 0 0 1 4.7-7.6 8.38 8.38 0 0 1 3.8-.9h.5a8.48 8.48 0 0 1 8 8v.5z" />
        <path d="M15.05 12.3c-.22-.1-.82-.4-1-.46-.14-.05-.24-.08-.34.08-.1.15-.38.46-.46.56-.1.1-.18.1-.4 0a5.2 5.2 0 0 1-1.48-.92 5.72 5.72 0 0 1-1-1.27c-.12-.22 0-.34.1-.44.1-.1.2-.23.3-.33.1-.1.13-.17.2-.3a.47.47 0 0 0-.02-.43c-.05-.1-.4-.98-.55-1.34-.14-.35-.3-.3-.4-.3h-.35a.8.8 0 0 0-.57.26 2.45 2.45 0 0 0-.77 1.83c0 1.15.83 2.26.95 2.42.1.16 1.64 2.5 4 3.5a8.42 8.42 0 0 0 2.66.52c.57 0 1.05-.05 1.44-.1a1.94 1.94 0 0 0 1.27-.9 1.62 1.62 0 0 0 .1-.9c-.04-.1-.14-.15-.35-.25z" />
      </svg>
    ),
  },
  {
    label: "Email",
    href: "https://mail.google.com/mail/?view=cm&fs=1&to=muhammadahmed7274@gmail.com",
    icon: (
      <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
        <rect width="20" height="16" x="2" y="4" rx="2"/>
        <path d="m22 7-8.97 5.7a1.94 1.94 0 0 1-2.06 0L2 7"/>
      </svg>
    ),
  },
];

// ── Contact info items ─────────────────────────────────────────────────────
const contactInfo = [
  {
    label: "Email",
    value: "muhammadahmed7274@gmail.com",
    icon: (
      <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
        <rect width="20" height="16" x="2" y="4" rx="2"/>
        <path d="m22 7-8.97 5.7a1.94 1.94 0 0 1-2.06 0L2 7"/>
      </svg>
    ),
  },
  {
    label: "Location",
    value: "Karachi, Pakistan",
    icon: (
      <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
        <path d="M20 10c0 6-8 12-8 12s-8-6-8-12a8 8 0 0 1 16 0Z"/>
        <circle cx="12" cy="10" r="3"/>
      </svg>
    ),
  },
  {
    label: "Availability",
    value: "Open to opportunities",
    icon: (
      <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
        <circle cx="12" cy="12" r="10"/>
        <polyline points="12 6 12 12 16 14"/>
      </svg>
    ),
  },
];

// ── Input component ────────────────────────────────────────────────────────
function FormField({
  label, type = "text", placeholder, textarea = false, delay = 0,
}: {
  label: string; type?: string; placeholder: string;
  textarea?: boolean; delay?: number;
}) {
  const [focused, setFocused] = useState(false);
  const ref = useRef<HTMLDivElement>(null);
  const isInView = useInView(ref, { once: true, margin: "-40px" });

  const sharedStyle: React.CSSProperties = {
    width: "100%",
    background: focused ? "rgba(59,130,246,0.06)" : "rgba(11,15,30,0.8)",
    border: `1px solid ${focused ? "rgba(59,130,246,0.4)" : "rgba(59,130,246,0.12)"}`,
    borderRadius: 12,
    padding: textarea ? "14px 16px" : "12px 16px",
    color: "#e2e8f5",
    fontSize: 14,
    fontFamily: "'Space Grotesk', sans-serif",
    outline: "none",
    transition: "all 0.25s",
    resize: "none" as const,
    boxShadow: focused ? "0 0 0 3px rgba(59,130,246,0.08)" : "none",
  };

  return (
    <motion.div
      ref={ref}
      initial={{ opacity: 0, y: 18 }}
      animate={isInView ? { opacity: 1, y: 0 } : {}}
      transition={{ duration: 0.55, delay, ease: [0.22, 1, 0.36, 1] }}
      style={{ display: "flex", flexDirection: "column", gap: 8 }}
    >
      <label style={{
        fontSize: 11, fontWeight: 600, letterSpacing: "0.1em",
        textTransform: "uppercase", color: "#7b8bab",
      }}>
        {label}
      </label>
      {textarea ? (
        <textarea
          placeholder={placeholder}
          rows={5}
          onFocus={() => setFocused(true)}
          onBlur={() => setFocused(false)}
          style={sharedStyle}
        />
      ) : (
        <input
          type={type}
          placeholder={placeholder}
          onFocus={() => setFocused(true)}
          onBlur={() => setFocused(false)}
          style={sharedStyle}
        />
      )}
    </motion.div>
  );
}

// ── Main ContactSection ────────────────────────────────────────────────────
export default function ContactSection() {
  const sectionRef = useRef<HTMLElement>(null);
  const lineRef    = useRef<HTMLDivElement>(null);
  const [sent, setSent] = useState(false);
  const [sending, setSending] = useState(false);

  useEffect(() => {
    const ctx = gsap.context(() => {
      gsap.from(lineRef.current, {
        scaleX: 0, duration: 1.2, ease: "power3.out",
        scrollTrigger: { trigger: lineRef.current, start: "top 85%" },
      });
    }, sectionRef);
    return () => ctx.revert();
  }, []);

  function handleSend() {
    setSending(true);
    setTimeout(() => { setSending(false); setSent(true); }, 1800);
  }

  return (
    <>
      <style>{`
        @import url('https://fonts.googleapis.com/css2?family=Space+Grotesk:wght@300;400;500;600;700&family=Syne:wght@700;800&display=swap');
        input::placeholder, textarea::placeholder { color: #3d4d6b; }
        input, textarea { caret-color: #60a5fa; }
      `}</style>

      <section
        ref={sectionRef}
        id="contact"
        className="contact-section-wrapper"
        style={{
          position: "relative", overflow: "hidden",
          background: "#050810", minHeight: "100vh",
          fontFamily: "'Space Grotesk', sans-serif",
        }}
      >
        {/* Grid overlay */}
        <div style={{
          position: "absolute", inset: 0, pointerEvents: "none",
          backgroundImage:
            "linear-gradient(rgba(59,130,246,0.03) 1px,transparent 1px),linear-gradient(90deg,rgba(59,130,246,0.03) 1px,transparent 1px)",
          backgroundSize: "60px 60px",
        }} />

        {/* Ambients */}
        <div style={{
          position: "absolute", width: 700, height: 700,
          top: -250, right: -200, borderRadius: "50%",
          background: "radial-gradient(circle,rgba(37,99,235,0.13) 0%,transparent 70%)",
          filter: "blur(90px)", pointerEvents: "none",
        }} />
        <div style={{
          position: "absolute", width: 500, height: 500,
          bottom: -100, left: -150, borderRadius: "50%",
          background: "radial-gradient(circle,rgba(59,130,246,0.08) 0%,transparent 70%)",
          filter: "blur(80px)", pointerEvents: "none",
        }} />

        {/* BG watermark */}
        <div aria-hidden style={{
          position: "absolute", top: "50%", left: "50%",
          transform: "translate(-50%,-50%)",
          fontFamily: "'Syne',sans-serif",
          fontSize: "clamp(100px,17vw,220px)",
          fontWeight: 800, letterSpacing: "-0.02em",
          whiteSpace: "nowrap", color: "transparent",
          WebkitTextStroke: "1.5px rgba(59,130,246,0.06)",
          userSelect: "none", pointerEvents: "none", lineHeight: 1,
        }}>
          CONTACT
        </div>

        {/* ── Content ── */}
        <div className="contact-main-container" style={{
          position: "relative", zIndex: 2,
          maxWidth: 1100, margin: "0 auto",
        }}>

          {/* ── Header ── */}
          <div className="contact-header-block" style={{ textAlign: "center" }}>
            <motion.div
              initial={{ opacity: 0, y: -16 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6 }}
              style={{
                display: "inline-flex", alignItems: "center", gap: 10,
                fontSize: 11, fontWeight: 600, letterSpacing: "0.18em",
                textTransform: "uppercase", color: "#60a5fa", marginBottom: 20,
              }}
            >
              <div style={{ width: 28, height: 1, background: "#60a5fa" }} />
              Get in touch
              <div style={{ width: 28, height: 1, background: "#60a5fa" }} />
            </motion.div>

            <motion.h2
              initial={{ opacity: 0, y: 28 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.85, delay: 0.1, ease: [0.22, 1, 0.36, 1] }}
              style={{
                fontFamily: "'Syne',sans-serif",
                fontSize: "clamp(38px,5.5vw,66px)", fontWeight: 800,
                lineHeight: 1.06, letterSpacing: "-0.03em", color: "#e2e8f5",
              }}
              className="wrap-break-word"
            >
              Let&rsquo;s build something{" "}
              <span style={{
                background: "linear-gradient(135deg,#3b82f6 0%,#93c5fd 100%)",
                WebkitBackgroundClip: "text", WebkitTextFillColor: "transparent",
                backgroundClip: "text",
              }}>
                remarkable.
              </span>
            </motion.h2>

            <div ref={lineRef} style={{
              height: 1, maxWidth: 200, margin: "24px auto",
              background: "linear-gradient(90deg,transparent,#2563eb,transparent)",
              transformOrigin: "center",
            }} />

            <motion.p
              initial={{ opacity: 0 }}
              whileInView={{ opacity: 1 }}
              viewport={{ once: true }}
              transition={{ duration: 0.7, delay: 0.3 }}
              style={{ fontSize: 15, lineHeight: 1.8, color: "#7b8bab", maxWidth: 480, margin: "0 auto" }}
            >
              Whether it&rsquo;s a project, opportunity, or just a hello — my signal
              is always open. Drop a message below.
            </motion.p>
          </div>

          {/* ── Two-column layout ── */}
          <div className="contact-grid-layout" style={{
            display: "grid",
            alignItems: "start",
          }}>

            {/* ── LEFT — Radar + Info ── */}
            <div className="contact-info-column" style={{ display: "flex", flexDirection: "column" }}>

              {/* Radar */}
              <motion.div
                initial={{ opacity: 0, scale: 0.8 }}
                whileInView={{ opacity: 1, scale: 1 }}
                viewport={{ once: true }}
                transition={{ duration: 1, ease: [0.22, 1, 0.36, 1] }}
                className="radar-orb-container"
                style={{
                  position: "relative",
                  width: 260, height: 260,
                }}
              >
                {/* Outer decorative rings */}
                <div style={{
                  position: "absolute", inset: -18, borderRadius: "50%",
                  border: "1px solid rgba(59,130,246,0.1)",
                  animation: "spin-cw 40s linear infinite",
                }} />
                <div style={{
                  position: "absolute", inset: -10, borderRadius: "50%",
                  border: "1px dashed rgba(59,130,246,0.08)",
                  animation: "spin-ccw 25s linear infinite",
                }} />

                {/* Canvas radar */}
                <div style={{ width: "100%", height: "100%", borderRadius: "50%", overflow: "hidden" }}>
                  <RadarOrb />
                </div>

                {/* Status badge */}
                <div style={{
                  position: "absolute", bottom: -20, left: "50%",
                  transform: "translateX(-50%)",
                  fontSize: 9, fontWeight: 600,
                  letterSpacing: "0.15em", textTransform: "uppercase",
                  color: "#7b8bab", whiteSpace: "nowrap",
                  display: "flex", alignItems: "center", gap: 6,
                }}>
                  <div style={{
                    width: 5, height: 5, borderRadius: "50%", background: "#3b82f6",
                    animation: "pulse-dot 2s ease-in-out infinite",
                  }} />
                  Signal active
                </div>
              </motion.div>

              {/* Contact info cards */}
              <div className="info-cards-stack" style={{ display: "flex", flexDirection: "column", gap: 12 }}>
                {contactInfo.map((item, i) => (
                  <motion.div
                    key={item.label}
                    initial={{ opacity: 0, x: -24 }}
                    whileInView={{ opacity: 1, x: 0 }}
                    viewport={{ once: true }}
                    transition={{ duration: 0.55, delay: i * 0.1, ease: [0.22, 1, 0.36, 1] }}
                    className="individual-info-card"
                    style={{
                      display: "flex", alignItems: "center", gap: 14,
                      background: "rgba(11,15,30,0.9)",
                      border: "1px solid rgba(59,130,246,0.1)",
                      borderRadius: 12, padding: "14px 18px",
                    }}
                  >
                    <div style={{
                      width: 36, height: 36, borderRadius: 10,
                      background: "rgba(59,130,246,0.12)",
                      border: "1px solid rgba(59,130,246,0.2)",
                      display: "flex", alignItems: "center", justifyContent: "center",
                      color: "#60a5fa", flexShrink: 0,
                    }}>
                      {item.icon}
                    </div>
                    <div className="info-card-text">
                      <div style={{ fontSize: 10, color: "#7b8bab", letterSpacing: "0.1em", textTransform: "uppercase", marginBottom: 3 }}>
                        {item.label}
                      </div>
                      <div className="info-card-value" style={{ color: "#e2e8f5", fontWeight: 500 }}>
                        {item.value}
                      </div>
                    </div>

                    {item.label === "Availability" && (
                      <div style={{ marginLeft: "auto" }}>
                        <div style={{
                          width: 8, height: 8, borderRadius: "50%", background: "#4ade80",
                          boxShadow: "0 0 8px rgba(74,222,128,0.6)",
                          animation: "pulse-dot 2s ease-in-out infinite",
                        }} />
                      </div>
                    )}
                  </motion.div>
                ))}
              </div>

              {/* Social links */}
              <motion.div
                initial={{ opacity: 0, y: 16 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.6, delay: 0.4 }}
                className="social-links-row"
                style={{ display: "flex", gap: 12 }}
              >
                {socials.map(({ label, href, icon }) => (
                  <a
                    key={label}
                    href={href}
                    target="_blank"
                    rel="noopener noreferrer"
                    title={label}
                    style={{
                      width: 42, height: 42, borderRadius: 12,
                      background: "rgba(11,15,30,0.9)",
                      border: "1px solid rgba(59,130,246,0.12)",
                      display: "flex", alignItems: "center", justifyContent: "center",
                      color: "#7b8bab",
                      transition: "all 0.25s",
                      textDecoration: "none",
                    }}
                    onMouseEnter={(e) => {
                      (e.currentTarget as HTMLAnchorElement).style.color = "#60a5fa";
                      (e.currentTarget as HTMLAnchorElement).style.borderColor = "rgba(59,130,246,0.4)";
                      (e.currentTarget as HTMLAnchorElement).style.background = "rgba(59,130,246,0.12)";
                      (e.currentTarget as HTMLAnchorElement).style.transform = "translateY(-3px)";
                    }}
                    onMouseLeave={(e) => {
                      (e.currentTarget as HTMLAnchorElement).style.color = "#7b8bab";
                      (e.currentTarget as HTMLAnchorElement).style.borderColor = "rgba(59,130,246,0.12)";
                      (e.currentTarget as HTMLAnchorElement).style.background = "rgba(11,15,30,0.9)";
                      (e.currentTarget as HTMLAnchorElement).style.transform = "translateY(0)";
                    }}
                  >
                    {icon}
                  </a>
                ))}
              </motion.div>
            </div>

            {/* ── RIGHT — Form ── */}
            <motion.div
              initial={{ opacity: 0, x: 40 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.8, delay: 0.15, ease: [0.22, 1, 0.36, 1] }}
              className="contact-form-card"
              style={{
                background: "rgba(11,15,30,0.9)",
                border: "1px solid rgba(59,130,246,0.12)",
                borderRadius: 20,
                position: "relative", overflow: "hidden",
              }}
            >
              {/* Card top glow */}
              <div style={{
                position: "absolute", top: -60, right: -60,
                width: 200, height: 200, borderRadius: "50%",
                background: "radial-gradient(circle,rgba(59,130,246,0.12) 0%,transparent 70%)",
                pointerEvents: "none",
              }} />

              {/* Left accent */}
              <div style={{
                position: "absolute", top: 0, left: 0,
                width: 3, height: "100%",
                background: "linear-gradient(180deg,#3b82f6,transparent)",
                borderRadius: "3px 0 0 3px",
              }} />

              {sent ? (
                // ── Success state ──
                <motion.div
                  initial={{ opacity: 0, scale: 0.8 }}
                  animate={{ opacity: 1, scale: 1 }}
                  transition={{ duration: 0.6, ease: [0.22, 1, 0.36, 1] }}
                  style={{
                    display: "flex", flexDirection: "column",
                    alignItems: "center", justifyContent: "center",
                    minHeight: 360, gap: 20, textAlign: "center",
                  }}
                >
                  <div style={{
                    width: 72, height: 72, borderRadius: "50%",
                    background: "rgba(59,130,246,0.12)",
                    border: "1px solid rgba(59,130,246,0.3)",
                    display: "flex", alignItems: "center", justifyContent: "center",
                    color: "#60a5fa",
                  }}>
                    <svg width="32" height="32" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                      <path d="M22 11.08V12a10 10 0 1 1-5.93-9.14"/>
                      <polyline points="22 4 12 14.01 9 11.01"/>
                    </svg>
                  </div>
                  <div style={{ padding: "0 20px" }}>
                    <p style={{ fontFamily: "'Syne',sans-serif", fontSize: 22, fontWeight: 800, color: "#e2e8f5", marginBottom: 8 }}>
                      Signal received!
                    </p>
                    <p style={{ fontSize: 14, color: "#7b8bab", lineHeight: 1.7 }}>
                      Thanks for reaching out. I&rsquo;ll ping you back shortly.
                    </p>
                  </div>
                  <button
                    onClick={() => setSent(false)}
                    style={{
                      marginTop: 8, fontSize: 12, fontWeight: 600,
                      letterSpacing: "0.08em", textTransform: "uppercase",
                      padding: "8px 20px", borderRadius: 99, cursor: "pointer",
                      border: "1px solid rgba(59,130,246,0.25)",
                      background: "transparent", color: "#60a5fa",
                      fontFamily: "'Space Grotesk',sans-serif",
                    }}
                  >
                    Send another
                  </button>
                </motion.div>
              ) : (
                // ── Form ──
                <div style={{ display: "flex", flexDirection: "column", gap: 22 }}>
                  <div>
                    <p style={{
                      fontFamily: "'Syne',sans-serif", fontSize: 20,
                      fontWeight: 800, color: "#e2e8f5", letterSpacing: "-0.02em",
                      marginBottom: 6,
                    }}>
                      Send a message
                    </p>
                    <p style={{ fontSize: 13, color: "#7b8bab" }}>
                      I typically respond within 24 hours.
                    </p>
                  </div>

                  <div className="form-name-email-row" style={{ display: "grid", gap: 16 }}>
                    <FormField label="Name"  placeholder="Your name"  delay={0.1} />
                    <FormField label="Email" type="email" placeholder="your@email.com" delay={0.15} />
                  </div>

                  <FormField label="Subject" placeholder="What's this about?" delay={0.2} />
                  <FormField label="Message" placeholder="Tell me about your project or idea..." textarea delay={0.25} />

                  {/* Send button */}
                  <motion.button
                    onClick={handleSend}
                    disabled={sending}
                    whileHover={{ scale: 1.02 }}
                    whileTap={{ scale: 0.98 }}
                    style={{
                      width: "100%", padding: "14px 24px",
                      borderRadius: 12, cursor: sending ? "not-allowed" : "pointer",
                      border: "none",
                      background: sending
                        ? "rgba(59,130,246,0.4)"
                        : "linear-gradient(135deg,#2563eb 0%,#3b82f6 100%)",
                      color: "#fff",
                      fontFamily: "'Space Grotesk',sans-serif",
                      fontSize: 14, fontWeight: 700,
                      letterSpacing: "0.05em",
                      display: "flex", alignItems: "center",
                      justifyContent: "center", gap: 10,
                      boxShadow: sending ? "none" : "0 4px 24px rgba(59,130,246,0.35)",
                      transition: "all 0.25s",
                    }}
                  >
                    {sending ? (
                      <>
                        <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" style={{ animation: "spin-cw 1s linear infinite" }}>
                          <path d="M21 12a9 9 0 1 1-6.219-8.56"/>
                        </svg>
                        Transmitting…
                      </>
                    ) : (
                      <>
                        Send message
                        <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                          <line x1="22" x2="11" y1="2" y2="13"/>
                          <polygon points="22 2 15 22 11 13 2 9 22 2"/>
                        </svg>
                      </>
                    )}
                  </motion.button>
                </div>
              )}
            </motion.div>
          </div>

          {/* ── Footer strip ── */}
          <motion.div
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8, delay: 0.5 }}
            className="contact-footer-strip"
            style={{
              borderTop: "1px solid rgba(59,130,246,0.1)",
              display: "flex", alignItems: "center", justifyContent: "space-between",
              fontSize: 12, color: "#7b8bab",
              paddingTop: 28,
              marginTop: 28,
            }}
          >
            <span style={{ fontFamily: "'Syne',sans-serif", fontNav: "bold", fontWeight: 700, color: "#e2e8f5", letterSpacing: "-0.01em" }}>
              Muhammad Ahmed<span style={{ color: "#3b82f6" }}>.</span>
            </span>
            <span className="footer-copyright-text">Crafted with precision · {new Date().getFullYear()}</span>
            <span style={{ display: "flex", alignItems: "center", gap: 6 }}>
              <div style={{ width: 6, height: 6, borderRadius: "50%", background: "#4ade80", boxShadow: "0 0 6px rgba(74,222,128,0.5)" }} />
              Available for work
            </span>
          </motion.div>
        </div>
      </section>

      {/* ── Seamless Custom Adaptive CSS ── */}
      <style>{`
        .contact-section-wrapper { padding: 120px 0 80px; }
        .contact-main-container { padding: 0 40px; }
        .contact-header-block { margin-bottom: 72px; }
        .contact-grid-layout { grid-template-columns: 1fr 1fr; gap: 48px; }
        .contact-info-column { gap: 36px; }
        .radar-orb-container { margin: 0 auto; }
        .form-name-email-row { grid-template-columns: 1fr 1fr; }
        .contact-form-card { padding: 40px 36px; }
        .contact-footer-strip { marginTop: 72px; paddingTop: 28px; }

        @media (max-width: 991px) {
          .contact-grid-layout { grid-template-columns: 1fr !important; gap: 56px; }
          .contact-info-column { gap: 40px; items: center; text-align: center; }
          .individual-info-card { width: 100%; max-w-xl; text-align: left; }
          .social-links-row { justify-content: center; width: 100%; }
          .contact-form-card { max-w-xl; width: 100%; margin: 0 auto; }
        }

        @media (max-width: 768px) {
          .contact-section-wrapper { padding: 100px 0 60px; }
          .contact-main-container { padding: 0 24px !important; }
          .contact-header-block { margin-bottom: 48px; }
          .contact-form-card { padding: 32px 24px !important; }
          .contact-footer-strip { flex-direction: column; gap: 16px; text-align: center; margin-top: 56px; }
          .footer-copyright-text { order: 3; }
        }

        @media (max-width: 480px) {
          .contact-main-container { padding: 0 18px !important; }
          .form-name-email-row { grid-template-columns: 1fr !important; }
          .info-card-value { font-size: 13px !important; word-break: break-all; }
          .info-card-text { max-w-[calc(100%-60px)]; }
        }
      `}</style>
    </>
  );
}