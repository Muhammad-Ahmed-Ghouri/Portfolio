'use client';
import { motion, AnimatePresence } from 'framer-motion';
import { useState, useEffect } from 'react';
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

  const particlesOptions = {
    background: { color: { value: "transparent" } },
    fpsLimit: 120,
    interactivity: {
      events: { onHover: { enable: true, mode: "grab" } },
      modes: {
        grab: { distance: 220, links: { opacity: 0.6, color: "#FF4D05" } }
      },
    },
    particles: {
      color: { value: ["#FF4D05", "#ffffff"] },
      links: { color: "#ffffff", distance: 150, enable: true, opacity: 0.15, width: 1 },
      move: { enable: true, speed: 0.8, direction: 0, outModes: { default: "out" } },
      number: { density: { enable: true, area: 800 }, value: 90 },
      opacity: { value: { min: 0.4, max: 0.8 } },
      shape: { type: "circle" },
      size: { value: { min: 1, max: 2 } },
    },
    detectRetina: true,
  };

  return (
    <section className="relative min-h-screen bg-[#000000] flex items-center pt-20 px-6 overflow-hidden">
      
      {init && (
  <Particles
    id="tsparticles"
    options={particlesOptions}
    className="absolute inset-0 z-0"
  />
)}

      <div className="max-w-7xl mx-auto w-full grid grid-cols-1 lg:grid-cols-2 items-center gap-12 relative z-10">
        {/* Left Content */}
        <div className="flex gap-10 items-center">
          <div className="hidden lg:flex flex-col gap-6 text-gray-400 text-xl">
  
  <a href="https://www.linkedin.com/in/muhammad-ahmed-995b90355/" target="_blank" rel="noopener noreferrer">
    <FaLinkedin className="hover:text-[#ffffff] cursor-pointer transition-colors" />
  </a>

  <a href="https://github.com/Muhammad-Ahmed-Ghouri" target="_blank" rel="noopener noreferrer">
    <FaGithub className="hover:text-[#ffffff] cursor-pointer transition-colors" />
  </a>

  <a
  href="https://wa.me/923001296099?text=Hello%20I%20want%20to%20contact%20you"
  target="_blank"
  rel="noopener noreferrer"
>
  <FaPhone className="hover:text-[#ffffff] cursor-pointer transition-colors" />
</a>

  <a
  href="https://mail.google.com/mail/?view=cm&fs=1&to=muhammadahmed7274@gmail.com"
  target="_blank"
  rel="noopener noreferrer"
>
  <FaEnvelope className="hover:text-[#ffffff] cursor-pointer transition-colors" />
</a>

  <div className="w-[1px] h-20 bg-gray-700 mx-auto mt-2"></div>
</div>

          <div>
            <motion.span
              initial={{ opacity: 0, x: -20 }}
              animate={{ opacity: 1, x: 0 }}
              className="bg-[#FF4D05] text-white px-4 py-[5px] text-[25px] font-100 rounded-tr-xl rounded-bl-xl inline-block"
            >
              Hello, I am
            </motion.span>

            <h1 className="text-3xl md:text-[100px] font-black text-white mt-4 mb-2">
              Muhammad Ahmed
            </h1>

            <div className="h-10 flex items-center">
              <AnimatePresence mode="wait">
                <motion.p
                  key={roles[index]}
                  initial={{ opacity: 0, y: 10 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, y: -10 }}
                  className="text-2xl md:text-3xl text-gray-400 font-light"
                >
                  {roles[index]}
                </motion.p>
              </AnimatePresence>
            </div>

            <div className="mt-12 p-4 border-l-4 border-[#FF4D05] bg-white/5 backdrop-blur-sm">
              <p className="text-gray-300 text-lg">
                <span className="font-bold text-white">2+ years</span> of hands-on experience | 
                <span className="font-bold text-white"> 10+ months</span> of professional experience.
              </p>
            </div>
          </div>
        </div>

        {/* Right Content - Curly/Blob Movement */}
        <div className="relative flex justify-center items-center">
          <div className="relative w-[550px] h-[550px] flex items-center justify-center">
            
            {/* Animated SVG Blob Background (The "Curly" Border) */}
            <div className="absolute inset-0 z-0 scale-110">
                <svg viewBox="0 0 200 200" xmlns="http://www.w3.org/2000/svg" className="w-full h-full">
                    <motion.path
                        fill="#FF4D05"
                        opacity="0.2"
                        animate={{
                            d: [
                                "M44.7,-76.4C58.8,-69.2,71.8,-59.1,79.6,-46.5C87.4,-33.9,90.1,-16.9,88.5,-0.9C86.9,15.1,81.1,30.3,72,43.9C62.9,57.5,50.6,69.5,36.4,76C22.2,82.4,6.2,83.4,-10.1,81.6C-26.3,79.8,-42.8,75.2,-56.2,65.4C-69.6,55.5,-79.9,40.4,-84.1,24.1C-88.3,7.8,-86.3,-9.6,-80.7,-25.6C-75.1,-41.6,-65.9,-56.2,-52.8,-63.7C-39.7,-71.2,-22.7,-71.7,-4.9,-63.2C12.9,-54.7,25.8,-37.2,44.7,-76.4Z",
                                "M42.3,-74.1C55.1,-68.1,65.8,-57,74.5,-44.1C83.2,-31.2,89.9,-15.6,89.1,-0.5C88.2,14.6,79.8,29.3,69.4,41.9C59,54.5,46.7,65,32.7,71.2C18.7,77.4,3,79.3,-12.9,77.5C-28.7,75.7,-44.7,70.2,-57.4,60.5C-70.1,50.8,-79.5,36.9,-83.4,21.5C-87.3,6.1,-85.7,-10.8,-79.7,-26.4C-73.7,-42,-63.3,-56.3,-49.7,-63.1C-36.1,-69.9,-19.3,-69.1,-2.4,-65C14.5,-60.9,29.5,-80.1,42.3,-74.1Z",
                                "M44.7,-76.4C58.8,-69.2,71.8,-59.1,79.6,-46.5C87.4,-33.9,90.1,-16.9,88.5,-0.9C86.9,15.1,81.1,30.3,72,43.9C62.9,57.5,50.6,69.5,36.4,76C22.2,82.4,6.2,83.4,-10.1,81.6C-26.3,79.8,-42.8,75.2,-56.2,65.4C-69.6,55.5,-79.9,40.4,-84.1,24.1C-88.3,7.8,-86.3,-9.6,-80.7,-25.6C-75.1,-41.6,-65.9,-56.2,-52.8,-63.7C-39.7,-71.2,-22.7,-71.7,-4.9,-63.2C12.9,-54.7,25.8,-37.2,44.7,-76.4Z"
                            ]
                        }}
                        transition={{
                            duration: 10,
                            repeat: Infinity,
                            ease: "easeInOut"
                        }}
                        transform="translate(100 100)"
                    />
                </svg>
            </div>

            {/* The Portrait Image */}
            <div className="relative w-full h-full z-10 flex items-center justify-center overflow-hidden rounded-full">
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