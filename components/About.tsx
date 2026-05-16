"use client";

import { useEffect, useRef } from "react";
import { motion, useInView, useScroll, useTransform } from "framer-motion";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

// Register GSAP plugins
if (typeof window !== "undefined") {
  gsap.registerPlugin(ScrollTrigger);
}

// ── Types ──────────────────────────────────────────────────────────────────
interface Experience {
  company: string;
  role: string;
  period: string;
  description: string;
  tags: string[];
}

// ── Data ───────────────────────────────────────────────────────────────────
const experiences: Experience[] = [
  {
    company: "360Xpert Solution",
    role: "Full Stack Developer (Trainee)",
    period: "May 2026 – Present",
    description:
      "Contributing to the development of a comprehensive e-commerce platform, implementing responsive UI components and optimizing backend APIs for performance and scalability.",
    tags: ["Next.js", "TypeScript", "PostgreSQL","fastify", "Node.js", "Tailwind CSS"],
  },
  {
    company: "ATS Global Solutions",
    role: "Frontend Developer",
    period: "Feb 2026 – Apr 2026",
    description:
      "Led the frontend development of a data visualization dashboard for enterprise clients, utilizing D3.js to create interactive charts and PostgreSQL for efficient data management.",
    tags: ["Node.js", "D3.js", "PostgreSQL",],
  },
  {
    company: "ATS Global Solutions",
    role: "Technical Support Associate & Project-Based Frontend Developer",
    period: "Aug 2025 – Jan 2026",
    description:
      "Crafted pixel-perfect interfaces and motion systems for early-stage startups, working across branding to deployment.",
    tags: ["Vue.js", "GSAP", "Webflow"],
  },
];

// ── Rotating 3D Box ────────────────────────────────────────────────────────
function RotatingBox() {
const boxRef = useRef<HTMLDivElement>(null);
  const handRef = useRef<HTMLDivElement>(null);
  const glowRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const el = boxRef.current;
    const hand = handRef.current;
    const glow = glowRef.current;

    if (!el || !hand || !glow) return;

    // 1. Initial base X rotation set karein
    gsap.set(el, { rotateX: 10 });

    // 2. Smooth Infinite Y Rotation (No jump/glitch)
    gsap.to(el, {
      rotateY: 360,
      duration: 12,
      ease: "none",
      repeat: -1,
    });

    // subtle "thinking wobble"
    gsap.to(el, {
      y: -10,
      scale: 1.04,
      duration: 2.5,
      ease: "sine.inOut",
      yoyo: true,
      repeat: -1,
    });

    // ── HAND (thinking gesture) ──
    gsap.to(hand, {
      y: -8,
      x: 6,
      rotation: -6,
      duration: 1.8,
      ease: "sine.inOut",
      yoyo: true,
      repeat: -1,
    });

    // ── ENERGY LINK PULSE ──
    gsap.to(glow, {
      opacity: 0.9,
      scaleX: 1.2,
      duration: 1.2,
      ease: "sine.inOut",
      yoyo: true,
      repeat: -1,
    });
  }, []);

  return (
    <div className="relative w-[300px] h-[300px] flex items-center justify-center [perspective:700px]">

      {/* ── HAND (thinking finger above cube) ── */}
      <div
        ref={handRef}
        className="absolute top-[0px] right-[40px] w-[50px] h-[50px] z-20"
      >
        <div className="w-full h-full flex items-center justify-center">
          <div className="w-[18px] h-[18px] bg-blue-400 rounded-full shadow-[0_0_20px_rgba(59,130,246,0.6)]" />
          <div className="w-[6px] h-[30px] bg-blue-400 ml-[3px] rounded-full" />
        </div>
      </div>

      {/* ── ENERGY CONNECTION LINE ── */}
      <div
        ref={glowRef}
        className="absolute top-[80px] right-[70px] w-[2px] h-[90px] bg-gradient-to-b from-blue-400/80 to-transparent blur-[1px] origin-top z-10"
      />

      {/* ── CUBE ── */}
      <div
        ref={boxRef}
        className="w-[120px] h-[120px] relative [transform-style:preserve-3d]"
      >
        <div className="absolute w-[120px] h-[120px] bg-blue-500/10 border border-blue-400/30 [transform:translateZ(60px)] backdrop-blur-[4px]" />

        <div className="absolute w-[120px] h-[120px] bg-blue-500/10 border border-blue-400/30 [transform:rotateY(180deg)_translateZ(60px)]" />

        <div className="absolute w-[120px] h-[120px] bg-blue-500/10 border border-blue-400/30 [transform:rotateY(90deg)_translateZ(60px)]" />

        <div className="absolute w-[120px] h-[120px] bg-blue-500/10 border border-blue-400/30 [transform:rotateY(-90deg)_translateZ(60px)]" />

        <div className="absolute w-[120px] h-[120px] bg-blue-500/10 border border-blue-400/30 [transform:rotateX(90deg)_translateZ(60px)]" />

        <div className="absolute w-[120px] h-[120px] bg-blue-500/10 border border-blue-400/30 [transform:rotateX(-90deg)_translateZ(60px)]" />

        <div className="absolute inset-[25%] bg-[radial-gradient(circle,_rgba(59,130,246,0.8)_0%,_transparent_70%)] blur-[14px] animate-pulse" />
      </div>
    </div>
  );
}
// ── Experience Card ────────────────────────────────────────────────────────
function ExperienceCard({
  exp,
  index,
}: {
  exp: Experience;
  index: number;
}) {
  const ref = useRef<HTMLDivElement>(null);
  const isInView = useInView(ref, { once: true, margin: "-80px" });

  return (
    <motion.div
      ref={ref}
      initial={{ opacity: 0, x: index % 2 === 0 ? -40 : 40, y: 20 }}
      animate={isInView ? { opacity: 1, x: 0, y: 0 } : {}}
      transition={{ duration: 0.7, delay: index * 0.15, ease: [0.22, 1, 0.36, 1] }}
      className="group relative bg-[#0b0f1e] border border-blue-500/12 rounded-[16px] overflow-hidden cursor-default transition-all duration-300 hover:border-blue-500/30 hover:shadow-[0_0_40px_rgba(59,130,246,0.08)]"
      whileHover={{ y: -4, transition: { duration: 0.2 } }}
    >
      {/* Left accent bar */}
      <div className="absolute top-0 left-0 w-[3px] h-full bg-gradient-to-b from-[#3b82f6] to-transparent rounded-l-[3px]" />

      <div className="pt-[28px] pb-[28px] pr-[28px] pl-[32px]">
        <div className="flex items-start justify-between gap-4 mb-4">
          <div>
            <p className="font-['Syne'] text-[19px] font-bold text-[#e2e8f5] tracking-tight">{exp.company}</p>
            <p className="text-[13px] text-[#60a5fa] mt-1 font-medium">{exp.role}</p>
          </div>
          <span className="text-[11px] font-semibold tracking-wider text-[#7b8bab] whitespace-nowrap mt-1 bg-blue-500/8 border border-blue-500/12 py-1 px-[10px] rounded-full">
            {exp.period}
          </span>
        </div>

        <p className="text-[14px] leading-[1.75] text-[#7b8bab] mb-5">{exp.description}</p>

        <div className="flex flex-wrap gap-2">
          {exp.tags.map((tag) => (
            <span key={tag} className="text-[11px] font-semibold tracking-wider text-[#3b82f6] bg-blue-500/18 border border-blue-500/20 py-[3px] px-[10px] rounded-[6px]">
              {tag}
            </span>
          ))}
        </div>
      </div>

      {/* Subtle corner glow on hover */}
      <div className="absolute -top-[60px] -right-[60px] w-[160px] h-[160px] bg-[radial-gradient(circle,_rgba(59,130,246,0.35)_0%,_transparent_70%)] opacity-0 rounded-full pointer-events:none transition-opacity duration-400 group-hover:opacity-100" />
    </motion.div>
  );
}

// ── Main About Section ─────────────────────────────────────────────────────
export default function AboutSection() {
  const sectionRef = useRef<HTMLElement>(null);
  const bgTextRef = useRef<HTMLDivElement>(null);
  const lineRef = useRef<HTMLDivElement>(null);

  const { scrollYProgress } = useScroll({
    target: sectionRef,
    offset: ["start end", "end start"],
  });

  // Parallax for bg "ABOUT" text
  const bgY = useTransform(scrollYProgress, [0, 1], ["-10%", "10%"]);
  const bgOpacity = useTransform(scrollYProgress, [0, 0.3, 0.7, 1], [0, 0.07, 0.07, 0]);

  useEffect(() => {
    const ctx = gsap.context(() => {
      // Animated reveal line
      gsap.from(lineRef.current, {
        scaleX: 0,
        duration: 1.2,
        ease: "power3.out",
        scrollTrigger: {
          trigger: lineRef.current,
          start: "top 85%",
        },
      });
    }, sectionRef);

    return () => ctx.revert();
  }, []);

  return (
    <>
      {/* ── Core Custom Fonts & Core Animation Keyframes ──────────────── */}
      <style>{`
        @import url('https://fonts.googleapis.com/css2?family=Space+Grotesk:wght@300;400;500;600;700&family=Syne:wght@700;800&display=swap');
        
        @keyframes pulse-core {
          0%, 100% { opacity: 0.5; transform: scale(0.9); }
          50%      { opacity: 1;   transform: scale(1.15); }
        }
      `}</style>

      {/* ── Section ────────────────────────────────────────────────────── */}
      <section 
        ref={sectionRef} 
        id="about"
        className="relative min-h-screen bg-[#050810] overflow-hidden pt-[190px] pb-[30px] px-0 font-['Space_Grotesk',_sans-serif] text-[#e2e8f5] before:absolute before:inset-0 before:bg-[linear-gradient(rgba(59,130,246,0.03)_1px,_transparent_1px),_linear-gradient(90deg,_rgba(59,130,246,0.03)_1px,_transparent_1px)] before:bg-[size:60px_60px] before:pointer-events-none"
      >
        {/* Ambients */}
        <div className="absolute rounded-full pointer-events-none blur-[90px] w-[700px] h-[700px] -top-[200px] -right-[200px] bg-[radial-gradient(circle,_rgba(37,99,235,0.18)_0%,_transparent_70%)]" />
        <div className="absolute rounded-full pointer-events-none blur-[90px] w-[500px] h-[500px] -bottom-[100px] -left-[100px] bg-[radial-gradient(circle,_rgba(59,130,246,0.1)_0%,_transparent_70%)]" />

        {/* Giant bg ABOUT text — parallax */}
        <motion.div
          ref={bgTextRef}
          className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 font-['Syne'] text-[clamp(140px,_22vw,_280px)] font-[800] tracking-tight whitespace-nowrap text-transparent [-webkit-text-stroke:1.5px_rgba(59,130,246,0.15)] select-none pointer-events-none line-height-1"
          style={{ y: bgY, opacity: bgOpacity }}
          aria-hidden
        >
          ABOUT
        </motion.div>

        <div className="relative z-10 max-w-[1160px] mx-auto px-10 md:px-10 sm:px-6">
          {/* ── Header row ─────────────────────────────────────────────── */}
          <div className="flex flex-col md:flex-row md:items-start justify-between mb-[72px] gap-10">
            <div className="max-w-[580px]">
              {/* Eyebrow */}
              <motion.div
                className="inline-flex items-center gap-[10px] text-[12px] font-semibold tracking-[0.18em] uppercase text-[#60a5fa] mb-5"
                initial={{ opacity: 0, x: -20 }}
                whileInView={{ opacity: 1, x: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.6 }}
              >
                <span className="w-8 h-[1px] bg-[#60a5fa]" />
                Who I am
              </motion.div>

              {/* Title */}
              <motion.h2
                className="font-['Syne'] text-[clamp(42px,_6vw,_72px)] font-[800] leading-[1.05] tracking-tight text-[#e2e8f5]"
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.8, delay: 0.1, ease: [0.22, 1, 0.36, 1] }}
              >
                Building with{" "}
                <span className="bg-gradient-to-r from-[#3b82f6] to-[#93c5fd] bg-clip-text text-transparent">purpose</span>
                <br />& precision.
              </motion.h2>

              {/* Divider */}
              <div ref={lineRef} className="h-[1px] bg-gradient-to-r from-[#2563eb] to-transparent origin-left my-8" />

              {/* Bio */}
              <motion.p
                className="text-[16px] leading-[1.8] text-[#7b8bab] max-w-[520px]"
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.7, delay: 0.3 }}
              >
                I&rsquo;m a Full Stack Engineer who sits at the intersection of design and engineering, focused on building fast, scalable, and intuitive web applications. I turn complex ideas into simple, elegant products and obsess over the details that make interfaces feel smooth, intentional, and inevitable.
              </motion.p>
            </div>

            {/* 3D rotating box - Hidden on specific breakpoints matching original media query */}
            <motion.div
              className="flex-shrink-0 hidden md:block"
              initial={{ opacity: 0, scale: 0.7 }}
              whileInView={{ opacity: 1, scale: 1 }}
              viewport={{ once: true }}
              transition={{ duration: 1, delay: 0.2, ease: [0.22, 1, 0.36, 1] }}
            >
              <RotatingBox />
            </motion.div>
          </div>

          {/* ── Experience ─────────────────────────────────────────────── */}
          <motion.p
            className="text-[11px] font-semibold tracking-[0.2em] uppercase text-[#7b8bab] mb-[28px] flex items-center gap-3 after:content-[''] after:flex-1 after:h-[1px] after:bg-blue-500/12"
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5 }}
          >
            Experience
          </motion.p>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-5">
            {experiences.map((exp, i) => (
              <ExperienceCard key={exp.company} exp={exp} index={i} />
            ))}
          </div>
        </div>
      </section>
    </>
  );
}
