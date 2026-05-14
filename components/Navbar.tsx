"use client";
import { useState, useEffect } from "react";
import { motion } from "framer-motion";
import Link from "next/link";

const Navbar = () => {
  const [scrolled, setScrolled] = useState(false);

  useEffect(() => {
    const handleScroll = () => setScrolled(window.scrollY > 50);
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  return (
    <motion.nav
      initial={{ y: -100 }}
      animate={{ y: 0 }}
      className={`fixed top-0 w-full z-50 transition-all duration-300 px-6 py-4 ${
        scrolled 
        ? "bg-black/60 backdrop-blur-md border-b border-white/10" 
        : "bg-transparent"
      }`}
    >
      <div className="max-w-7xl mx-auto flex items-center justify-between">
        {/* Logo - Reference image_856a39.png */}
        <div className="text-2xl font-bold text-white flex items-center gap-1">
          Cod
          <div className="flex flex-col gap-[3px] mt-1">
            <span className="w-5 h-[3px] bg-[#FF4D05]"></span>
            <span className="w-5 h-[3px] bg-[#FF4D05]"></span>
            <span className="w-5 h-[3px] bg-[#FF4D05]"></span>
          </div>
          r
        </div>

        {/* Navigation - Reference image_856a31.png */}
        <div className="hidden md:flex items-center gap-8 text-sm font-medium text-gray-300">
          {["Home", "About", "Portfolio", "Service", "Blog", "Contact"].map((item) => (
            <Link key={item} href={`#${item.toLowerCase()}`} className="hover:text-[#FF4D05] transition-colors">
              {item}
            </Link>
          ))}
        </div>

        {/* Action Button */}
        <button className="px-6 py-2 border-2 border-[#FF4D05] text-white rounded-full hover:bg-[#FF4D05] transition-all text-sm font-semibold">
          Download CV
        </button>
      </div>
    </motion.nav>
  );
};

export default Navbar;