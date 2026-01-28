"use client";

import React, { useState, useEffect } from "react";
import { motion, useScroll, useSpring, useTransform } from "framer-motion";
import Link from "next/link";
import Image from "next/image";

export default function Home() {
  const { scrollYProgress } = useScroll();
  const scaleX = useSpring(scrollYProgress, { stiffness: 100, damping: 30 });

  // --- ZOOM LOGIC ---
  const backgroundScale = useTransform(scrollYProgress, [0, 0.20], [1, 2.5]);

  // --- MOUSE TRACKING ---
  const [mousePos, setMousePos] = useState({ x: 50, y: 50 });
  useEffect(() => {
    const handleMouseMove = (e) => {
      const x = (e.clientX / window.innerWidth) * 100;
      const y = (e.clientY / window.innerHeight) * 100;
      setMousePos({ x, y });
    };
    window.addEventListener("mousemove", handleMouseMove);
    return () => window.removeEventListener("mousemove", handleMouseMove);
  }, []);

  // --- SPOTLIGHT STYLE ---
  const chromeStyle = {
    backgroundImage: `radial-gradient(circle at ${mousePos.x}% ${mousePos.y}%, #ffffff 0%, #e0e0e0 20%, #71717a 50%, #171717 100%)`,
    WebkitBackgroundClip: "text",
    WebkitTextFillColor: "transparent",
    backgroundClip: "text",
    backgroundRepeat: "no-repeat",
    backgroundSize: "150% 150%",
    backgroundPosition: "center",
  };

  const projects = [
    {
      id: "001",
      title: "Capstone Project",
      tech: "Flutter / Firebase",
      desc: "A Web-Based and Mobile System​ for Pet Health Management and Veterinary Clinic Operations​",
      link: "/project/001",
      imgSrc: "/furevercare.png",
      imgPos: "object-center"
    },
    {
      id: "002",
      title: "Game Development Project",
      tech: "Unity / C#",
      // UPDATED DESCRIPTION BASED ON PDF LORE
      desc: "Rise to Glory: Guide Loyd, a frog ninja, through the deadly Labyrinth of Ascension in this precision 2D platformer.",
      link: "/project/002",
      imgSrc: "/FALL_L.jpg",
      imgPos: "object-top"
    },
    {
      id: "003",
      title: "Echo Social",
      tech: "Web3 / Solidity",
      desc: "Decentralized social protocol focused on privacy and user data ownership.",
      link: "#",
      imgPos: "object-center"
    }
  ];

  return (
    <div className="bg-transparent text-white selection:bg-blue-600 font-sans overflow-x-hidden relative">

      {/* --- FIXED BACKGROUND LAYER --- */}
      <motion.div
        style={{ scale: backgroundScale }}
        className="fixed inset-0 z-[-1] w-full h-screen"
      >
        <Image
          src="/mayores1.png"
          alt="Background Image"
          fill
          className="object-cover object-[65%_center]"
          priority
        />

        {/* OVERLAY: 3 INCH DARKNESS */}
        <div
          className="absolute inset-0 z-10"
          style={{
            background: "linear-gradient(to right, #000000 0%, #000000 3in, transparent 100%)"
          }}
        />
      </motion.div>


      {/* GLOBAL PROGRESS BAR */}
      <motion.div
        className="fixed top-0 left-0 right-0 h-1 bg-blue-600 origin-left z-[100]"
        style={{ scaleX }}
      />

      {/* --- PAGE 1: HERO --- */}
      <section className="relative h-screen flex flex-col items-center justify-center px-6 overflow-hidden">
        <motion.div
          initial={{ opacity: 0, y: 50 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 1, ease: "easeOut" }}
          className="relative z-20 text-center w-full max-w-7xl flex justify-between items-center overflow-visible"
        >
          <motion.h1
            initial={{ x: -300, opacity: 0 }}
            whileInView={{ x: 0, opacity: 1 }}
            transition={{ duration: 1.5, ease: [0.22, 1, 0.36, 1], delay: 0.1 }}
            style={chromeStyle}
            className="text-[12vw] font-black tracking-tighter italic uppercase leading-none drop-shadow-2xl pr-12 py-4"
          >
            MAYO
          </motion.h1>
          <motion.h1
            initial={{ x: -300, opacity: 0 }}
            whileInView={{ x: -90, opacity: 1 }}
            transition={{ duration: 1.5, ease: [0.22, 1, 0.36, 1], delay: 0.2 }}
            style={chromeStyle}
            className="text-[12vw] font-black tracking-tighter italic uppercase leading-none drop-shadow-2xl pr-12 py-4"
          >
            RES
          </motion.h1>
        </motion.div>
        <motion.p
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          transition={{ delay: 0.8, duration: 1 }}
          className="relative z-20 text-white/80 font-mono tracking-[0.3em] uppercase text-sm md:text-base mt-6 drop-shadow-md"
        >
          Shandy Mayores Portfolio
        </motion.p>
      </section>

      {/* --- PAGE 2: PHILOSOPHY --- */}
      <section className="min-h-screen relative z-10 py-32 px-8 md:px-24 flex flex-col md:flex-row items-center justify-between">
        <div className="w-full md:w-1/2 text-left">
          <motion.h2
            initial={{ opacity: 0, x: -50 }}
            whileInView={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.8 }}
            className="text-6xl md:text-[8vw] font-black tracking-tighter leading-[0.9] mb-8 uppercase italic text-white drop-shadow-lg"
          >
            DESIGNING <br /> THE FUTURE.
          </motion.h2>
        </div>
        <div className="w-full md:w-1/3 text-right flex flex-col items-end">
          <p className="text-xl md:text-2xl font-light leading-relaxed mb-6 text-white/90 drop-shadow-md">
            I craft digital artifacts that combine aesthetic elegance with deep technical complexity.
          </p>
          <div className="h-1.5 w-16 bg-blue-600"></div>
        </div>
      </section>

      {/* --- PAGE 3: WHO IS SHANDY --- */}
      <section className="min-h-screen relative z-10 py-32 px-8 flex items-center justify-center">

        <motion.div
          initial={{ opacity: 0, y: 50 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
          className="max-w-4xl w-full bg-black/40 backdrop-blur-md border border-white/10 p-12 md:p-20 rounded-[40px] shadow-2xl"
        >
          <h3 className="text-blue-500 font-mono tracking-widest uppercase mb-4">The Architect</h3>

          <h2 className="text-5xl md:text-7xl font-black mb-8 italic uppercase tracking-tighter text-white">
            Who is Shandy?
          </h2>

          <div className="flex flex-col md:flex-row gap-10">
            <div className="w-full md:w-1/2">
              <p className="text-lg text-white/80 leading-relaxed mb-6">
                I am a developer driven by the convergence of <span className="text-white font-bold">logic and creativity</span>.
                My journey isn't just about writing code; it's about solving real-world problems through immersive digital solutions.
              </p>
              <p className="text-lg text-white/80 leading-relaxed">
                From conceptualizing 2D pixel art worlds to architecting robust cloud-based systems, I thrive in the details that others overlook.
              </p>
            </div>

            <div className="w-full md:w-1/2 border-l border-white/20 pl-0 md:pl-10 flex flex-col justify-center gap-4">
              <div className="flex items-center gap-4">
                <div className="w-12 h-[1px] bg-blue-500"></div>
                <span className="font-bold uppercase tracking-wider">Full Stack Development</span>
              </div>
              <div className="flex items-center gap-4">
                <div className="w-12 h-[1px] bg-blue-500"></div>
                <span className="font-bold uppercase tracking-wider">UI/UX Engineering</span>
              </div>
              <div className="flex items-center gap-4">
                <div className="w-12 h-[1px] bg-blue-500"></div>
                <span className="font-bold uppercase tracking-wider">Game Design</span>
              </div>
            </div>
          </div>

        </motion.div>
      </section>

      {/* --- PAGE 4: PROJECTS --- */}
      <section className="relative z-20 py-32 px-4 md:px-20 bg-[#050505]">
        <div className="max-w-7xl mx-auto">
          <h2 className="text-5xl md:text-7xl font-black mb-20 italic uppercase tracking-tighter text-white">Projects</h2>

          <div className="flex flex-col gap-8">
            {projects.map((project, i) => (
              <motion.div
                key={i}
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                className="group relative w-full h-[450px] md:h-[550px] bg-[#0f0f0f] border border-white/5 rounded-[30px] overflow-hidden flex"
              >
                {/* (Project Card Content) */}
                <div className="absolute inset-0 z-0 opacity-100 transition-all duration-700 group-hover:scale-105">
                  <div className="absolute inset-0 bg-gradient-to-r from-black/60 via-transparent to-black/30 z-10" />
                  {project.imgSrc ? (
                    <Image
                      src={project.imgSrc}
                      alt={project.title}
                      fill
                      className={`object-cover ${project.imgPos || "object-center"}`}
                    />
                  ) : (<div className="w-full h-full bg-[#1a1a1a]" />)}
                </div>
                <div className="w-full md:w-1/2 h-full p-10 flex flex-col justify-between relative z-20 pointer-events-none">
                  <div className="text-blue-500 font-mono text-xs uppercase tracking-widest drop-shadow-lg">{project.id} — {project.tech}</div>
                  <h3 className="text-5xl md:text-7xl font-black uppercase tracking-tighter leading-none drop-shadow-2xl">{project.title}</h3>
                </div>
                <div className="absolute right-0 top-0 w-full md:w-[40%] h-full p-10 flex flex-col justify-center items-end text-right z-30 opacity-0 translate-x-10 group-hover:opacity-100 group-hover:translate-x-0 transition-all duration-500 delay-100">
                  <h4 className="text-xl font-bold mb-4 text-blue-400 uppercase tracking-widest drop-shadow-lg">Details</h4>
                  <p className="text-white text-lg font-medium leading-tight mb-8 drop-shadow-[0_2px_10px_rgba(0,0,0,0.8)] max-w-[280px]">{project.desc}</p>

                  {/* BUTTON */}
                  <Link
                    href={project.link}
                    target="_blank"
                    className="inline-flex items-center gap-3 px-8 py-3 border border-white/30 rounded-full backdrop-blur-sm text-white font-bold uppercase tracking-widest text-xs hover:bg-white hover:text-black hover:border-white transition-all duration-300 shadow-xl"
                  >
                    Explore Project ↗
                  </Link>

                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* --- PAGE 5: FINALE --- */}
      <section className="relative z-20 h-screen bg-blue-600 flex flex-col items-center justify-center text-center px-8">
        <h2 className="text-7xl md:text-[10vw] font-black tracking-tighter mb-8 leading-none italic uppercase">Let's Connect</h2>
        <a href="mailto:hello@mayores.dev" className="px-12 py-5 bg-black text-white font-black rounded-full text-xl hover:scale-110 transition-transform">SEND EMAIL</a>
      </section>
    </div>
  );
}