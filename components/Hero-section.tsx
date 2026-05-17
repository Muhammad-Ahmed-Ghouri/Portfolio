'use client';
import { motion, AnimatePresence } from 'framer-motion';
import { useState, useEffect, useMemo } from 'react';
import { FaEnvelope, FaGithub, FaLinkedin, FaPhone } from 'react-icons/fa';
import Image from 'next/image';
import Particles, { initParticlesEngine } from "@tsparticles/react";
import { loadSlim } from "@tsparticles/slim";

const roles = [
  'MERN Stack Developer',
  'Frontend Developer',
  'Full Stack Developer',
];

const Hero = () => {
  const [index, setIndex] = useState(0);
  const [init, setInit] = useState(false);

  useEffect(() => {
    initParticlesEngine(async (engine) => {
      await loadSlim(engine);
    }).then(() => {
      setInit(true);
    });
  }, []);

  useEffect(() => {
    const timer = setInterval(() => {
      setIndex((prev) => (prev + 1) % roles.length);
    }, 3000);
    return () => clearInterval(timer);
  }, []);

  const particlesOptions = useMemo(() => ({
    fullScreen: { enable: false }, 
    background: { color: { value: "transparent" } },
    fpsLimit: 60,
    interactivity: {
      events: { onHover: { enable: true, mode: "grab" } },
      modes: {
        grab: { distance: 200, links: { opacity: 0.9, color: "#3b82f6" } }
      },
    },
    particles: {
      color: { value: ["#3b82f6", "#ffffff"] },
      links: { color: "#ffffff", distance: 140, enable: true, opacity: 0.2, width: 1 },
      move: { 
        enable: true, 
        speed: 0.6, 
        direction: "none", 
        outModes: { default: "out" },
        random: true,
        straight: false
      },
      number: { density: { enable: true, area: 800 }, value: 70 },
      opacity: { value: { min: 0.3, max: 0.7 } },
      shape: { type: "circle" },
      size: { value: { min: 1, max: 2 } },
    },
    detectRetina: true,
  }), []);

  const memoizedParticles = useMemo(() => {
    if (!init) return null;
    return (
      <Particles
        id="tsparticles"
        options={particlesOptions}
        className="absolute inset-0 z-0 pointer-events-none"
      />
    );
  }, [init, particlesOptions]);

  return (
    <section className="relative min-h-screen bg-[#000000] flex items-center pt-24 pb-12 md:pt-20 px-4 sm:px-6 overflow-hidden font-['Space_Grotesk',_sans-serif] before:absolute before:inset-0 before:bg-[linear-gradient(rgba(59,130,246,0.03)_1px,_transparent_1px),_linear-gradient(90deg,_rgba(59,130,246,0.03)_1px,_transparent_1px)] before:bg-[size:60px_60px] before:pointer-events-none">
      
      {memoizedParticles}

      <div className="max-w-7xl mx-auto w-full grid grid-cols-1 lg:grid-cols-2 items-center gap-12 lg:gap-8 relative z-10">
        
        {/* Left Content */}
        <div className="flex gap-4 md:gap-10 items-center w-full order-2 lg:order-1">
          {/* Side Social Links (Visible only on Desktop) */}
          <div className="hidden lg:flex flex-col gap-6 text-[#7b8bab] text-xl flex-shrink-0">
            <a href="https://www.linkedin.com/in/muhammad-ahmed-995b90355/" target="_blank" rel="noopener noreferrer">
              <FaLinkedin className="hover:text-[#ffffff] cursor-pointer transition-colors" />
            </a>
            <a href="https://github.com/Muhammad-Ahmed-Ghouri" target="_blank" rel="noopener noreferrer">
              <FaGithub className="hover:text-[#ffffff] cursor-pointer transition-colors" />
            </a>
            <a href="https://wa.me/923001296099?text=Hello%20I%20want%20to%20contact%20you" target="_blank" rel="noopener noreferrer">
              <FaPhone className="hover:text-[#ffffff] cursor-pointer transition-colors" />
            </a>
            <a href="https://mail.google.com/mail/?view=cm&fs=1&to=muhammadahmed7274@gmail.com" target="_blank" rel="noopener noreferrer">
              <FaEnvelope className="hover:text-[#ffffff] cursor-pointer transition-colors" />
            </a>
            <div className="w-[1px] h-20 bg-blue-500/12 mx-auto mt-2"></div>
          </div>

          {/* Main Info Blocks */}
          <div className="w-full">
            <motion.span
              initial={{ opacity: 0, x: -20 }}
              animate={{ opacity: 1, x: 0 }}
              className="bg-[#3b82f6] text-white px-3 py-[4px] md:px-4 md:py-[5px] text-sm md:text-lg font-[300] rounded-tr-xl rounded-bl-xl inline-block"
            >
              Hello, I am
            </motion.span>

            <h1 className="sm:text-5xl lg:text-[50px] xl:text-[70px] font-['Syne'] font-[800] text-[#e2e8f5] mt-3 mb-2 tracking-tight leading-[1.1] md:leading-[1.05]">
              Muhammad Ahmed
            </h1>

            {/* Dynamic Roles Display */}
            <div className="h-[20px] md:h-[40px] text-[12px] md:text-sm relative flex items-center w-full overflow-hidden">
              <AnimatePresence mode="wait">
                <motion.p
                  key={roles[index]}
                  initial={{ opacity: 0, y: 15 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, y: -15 }}
                  transition={{ duration: 0.4 }}
                  className="absolute text-lg sm:text-xl md:text-3xl text-[#7b8bab] font-light left-0 top-0 bottom-0 flex items-center whitespace-nowrap"
                >
                  {roles[index]}
                </motion.p>
              </AnimatePresence>
            </div>

            <div className="mt-8 md:mt-12 p-4 border-l-4 border-[#3b82f6] bg-[#0b0f1e]/50 backdrop-blur-sm border-blue-500/12 max-w-xl">
              <p className="text-[#7b8bab] text-sm sm:text-base md:text-lg leading-relaxed">
                <span className="font-bold text-[#e2e8f5]">2+ years</span> of hands-on experience | 
                <span className="font-bold text-[#e2e8f5]"> 10+ months</span> of professional experience.
              </p>
            </div>
            
            {/* Mobile Social Links Block (Only visible on small screens to maintain layout flow) */}
            <div className="flex lg:hidden gap-6 text-[#7b8bab] text-xl mt-8 items-center justify-start raw-links">
              <a href="https://www.linkedin.com/in/muhammad-ahmed-995b90355/" target="_blank" rel="noopener noreferrer">
                <FaLinkedin className="hover:text-[#ffffff] transition-colors" />
              </a>
              <a href="https://github.com/Muhammad-Ahmed-Ghouri" target="_blank" rel="noopener noreferrer">
                <FaGithub className="hover:text-[#ffffff] transition-colors" />
              </a>
              <a href="https://wa.me/923001296099?text=Hello%20I%20want%20to%20contact%20you" target="_blank" rel="noopener noreferrer">
                <FaPhone className="hover:text-[#ffffff] transition-colors" />
              </a>
              <a href="https://mail.google.com/mail/?view=cm&fs=1&to=muhammadahmed7274@gmail.com" target="_blank" rel="noopener noreferrer">
                <FaEnvelope className="hover:text-[#ffffff] transition-colors" />
              </a>
            </div>
          </div>
        </div>

        {/* Right Content - Portrait Image */}
        <div className="relative flex justify-center items-center order-1 lg:order-2 w-full mt-4 lg:mt-0">
          <div className="relative w-[280px] h-[280px] sm:w-[400px] sm:h-[400px] lg:w-[500px] lg:w-[500px] xl:w-[550px] xl:h-[550px] flex items-center justify-center transition-all duration-300">
            <div className="relative w-full h-full md:min-h-[350px] lg:min-h-[600px] z-10 flex items-center justify-center overflow-hidden">
              <Image
                src="/assets/image/user.png"
                alt="Muhammad Ahmed"
                fill
                className="object-cover"
                priority
              />
            </div>
          </div>
        </div>

      </div>
    </section>
  );
};

export default Hero;