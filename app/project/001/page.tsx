"use client";
import React, { useState, useRef, useEffect } from 'react';
import Link from 'next/link';
import Image from 'next/image';
import { motion, AnimatePresence, useScroll, useTransform } from 'framer-motion';

// --- BACKGROUND GRID (Subtle Texture) ---
const SpotlightGrid = ({ mousePosition }: { mousePosition: { x: number; y: number } }) => {
  return (
    <div className="absolute inset-0 z-0 pointer-events-none">
      <div
        className="absolute inset-0 opacity-[0.05]"
        style={{
          backgroundImage: `linear-gradient(to right, #ffffff 1px, transparent 1px), linear-gradient(to bottom, #ffffff 1px, transparent 1px)`,
          backgroundSize: '4rem 4rem',
          backgroundAttachment: 'fixed'
        }}
      />
      <div
        className="absolute inset-0 opacity-10 transition-opacity duration-300"
        style={{
          backgroundImage: `linear-gradient(to right, #3B82F6 1px, transparent 1px), linear-gradient(to bottom, #3B82F6 1px, transparent 1px)`,
          backgroundSize: '4rem 4rem',
          maskImage: `radial-gradient(400px circle at ${mousePosition.x}px ${mousePosition.y}px, black, transparent)`,
          WebkitMaskImage: `radial-gradient(400px circle at ${mousePosition.x}px ${mousePosition.y}px, black, transparent)`,
          backgroundAttachment: 'fixed'
        }}
      />
    </div>
  );
};

// --- ELEGANT CAROUSEL ---
const InstagramCarousel = ({ images }: { images: string[] }) => {
  const [index, setIndex] = useState(0);
  const nextImage = () => setIndex((prev) => (prev + 1) % images.length);
  const prevImage = () => setIndex((prev) => (prev - 1 + images.length) % images.length);

  return (
    <div className="relative w-full aspect-[4/3] md:aspect-[16/10] bg-[#151515] rounded-xl overflow-hidden shadow-2xl group">
      <AnimatePresence mode='wait'>
        <motion.div
          key={index}
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          transition={{ duration: 0.3 }}
          className="relative w-full h-full"
        >
          <Image src={images[index]} alt="Phase Image" fill className="object-contain" />
        </motion.div>
      </AnimatePresence>

      {images.length > 1 && (
        <>
          <div className="absolute inset-0 flex items-center justify-between p-2">
            <button onClick={prevImage} className="p-2 md:p-3 rounded-full bg-black/20 hover:bg-black/60 text-white transition-all backdrop-blur-sm">←</button>
            <button onClick={nextImage} className="p-2 md:p-3 rounded-full bg-black/20 hover:bg-black/60 text-white transition-all backdrop-blur-sm">→</button>
          </div>
          <div className="absolute bottom-3 left-0 right-0 flex justify-center gap-2 z-10">
            {images.map((_, i) => (
              <div key={i} className={`h-1.5 rounded-full transition-all duration-300 shadow-sm ${i === index ? 'w-6 bg-blue-500' : 'w-1.5 bg-white/40'}`} />
            ))}
          </div>
        </>
      )}
    </div>
  );
};

export default function FureverCareDetails() {
  const [mousePosition, setMousePosition] = useState({ x: 0, y: 0 });
  useEffect(() => {
    const updateMouse = (e: MouseEvent) => setMousePosition({ x: e.clientX, y: e.clientY });
    window.addEventListener('mousemove', updateMouse);
    return () => window.removeEventListener('mousemove', updateMouse);
  }, []);

  const containerRef = useRef<HTMLDivElement>(null);

  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ["start start", "end start"]
  });

  // --- ANIMATION VALUES ---
  const textScale = useTransform(scrollYProgress, [0, 0.4], [1, 150]);
  const whiteLayerOpacity = useTransform(scrollYProgress, [0.3, 0.4], [0, 1]);
  const contentY = useTransform(scrollYProgress, [0.3, 0.45], [100, 0]);
  const contentOpacity = useTransform(scrollYProgress, [0.3, 0.4], [0, 1]);
  const overviewExitBlur = useTransform(scrollYProgress, [0.75, 0.95], ["0px", "10px"]);
  const overviewExitOpacity = useTransform(scrollYProgress, [0.8, 0.95], [1, 0.3]);

  // --- DATA ---
  const phases = [
    {
      id: "01",
      title: "Consultation",
      tags: ["UI/UX Design", "Stakeholder Meeting"],
      desc: "We met with our advisers to present the initial prototype. This phase was critical for refining the User Interface (UI). Based on their feedback, we integrated new features such as the Inventory Module and streamlined the appointment setting process.",
      images: ["/Consultation1.jpg", "/Consultation2.jpg"]
    },
    {
      id: "02",
      title: "The Defense",
      tags: ["System Architecture", "Panel Approval"],
      desc: "The culmination of our research. We successfully presented the system's architecture and logic to the panel. After demonstrating the backend reliability and real-time features, we secured our official approval.",
      images: ["/Re def.jpg"]
    },
    {
      id: "03",
      title: "Symposium",
      tags: ["Public Demo", "Live Sync"],
      desc: "With the system approved, we showcased the full Furever Care ecosystem at the STI Research Symposium. We demonstrated the real-time sync between the web dashboard and mobile app to students and faculty.",
      images: ["/Symposium1.jpg", "/Symposium2.jpg"]
    },
    {
      id: "04",
      title: "Final Submission",
      tags: ["Deployment", "Manuscript"],
      desc: "Mission Accomplished. The system was fully deployed, the manuscript was bound, and we officially passed the Capstone requirement. The journey from concept to code is complete.",
      images: ["/final2.jpg", "/final1.jpg"]
    }
  ];

  return (
    <main className="bg-[#050505] text-white font-sans selection:bg-blue-500 selection:text-white relative">

      {/* --- HEADER --- */}
      <nav className="fixed top-0 left-0 w-full z-[60] flex justify-between items-center p-4 md:p-8 pointer-events-none">
        <Link href="/" className="pointer-events-auto px-4 py-2 md:px-6 md:py-3 bg-black/80 backdrop-blur-md border border-white/20 rounded-full text-white text-xs font-bold uppercase tracking-widest hover:bg-white hover:text-black hover:border-white transition-all flex items-center gap-2 shadow-2xl">
          <span className="text-lg">←</span>
          <span className="hidden md:inline">Return Home</span>
        </Link>
      </nav>

      {/* --- HERO SECTION --- */}
      <div ref={containerRef} className="relative h-[300vh] bg-black z-10">
        <div className="sticky top-0 w-full h-screen overflow-hidden flex items-center justify-center">

          <SpotlightGrid mousePosition={mousePosition} />

          {/* TITLE LAYER */}
          <motion.div style={{ scale: textScale }} className="absolute inset-0 z-30 flex flex-col items-center justify-center pointer-events-none origin-center">
            {/* Typography scales with viewport width */}
            <h1 className="text-[14vw] md:text-[12vw] font-black tracking-tighter leading-none text-white italic text-center drop-shadow-2xl">
              FUREVERCARE
            </h1>
          </motion.div>

          {/* WHITE CONTENT LAYER */}
          <motion.div
            style={{
              opacity: whiteLayerOpacity,
              filter: overviewExitBlur
            }}
            className="absolute inset-0 z-40 overflow-y-auto overflow-x-hidden bg-white text-black flex flex-col items-center justify-center"
          >
            <motion.div
              style={{
                y: contentY,
                opacity: contentOpacity
              }}
              className="relative z-10 max-w-7xl mx-auto w-full px-4 md:px-12 py-12 md:py-0 h-full flex flex-col justify-center"
            >
              <motion.div
                style={{ opacity: overviewExitOpacity }}
                className="grid grid-cols-1 lg:grid-cols-2 gap-8 md:gap-12 lg:gap-24 items-center"
              >
                {/* Left Column (Text) */}
                <div className="flex flex-col items-start text-left space-y-6 md:space-y-8 order-2 lg:order-1 pb-12 lg:pb-0">
                  <h2 className="text-4xl md:text-6xl lg:text-7xl font-black uppercase tracking-tighter leading-[0.9]">
                    Project <br /> Overview
                  </h2>
                  <p className="text-lg md:text-xl text-gray-600 font-light leading-relaxed max-w-lg">
                    Furever-Care solves record fragmentation in local veterinary services by implementing a <span className="text-black font-bold underline decoration-blue-500 decoration-4 underline-offset-4">real-time cloud architecture</span>.
                  </p>
                  <a href="https://furevercare-5b8f9.web.app/" target="_blank" className="w-full md:w-auto px-8 py-4 bg-black text-white rounded-xl font-bold uppercase tracking-wider text-xs flex justify-center items-center gap-3 hover:bg-blue-600 transition-colors shadow-xl shadow-black/20">
                    Launch System ↗
                  </a>
                </div>

                {/* Right Column (Image) */}
                <div className="relative order-1 lg:order-2 w-full aspect-square p-2 md:p-4 bg-gray-50 rounded-[30px] md:rounded-[40px]">
                  <div className="w-full h-full relative rounded-[20px] md:rounded-[30px] overflow-hidden shadow-2xl bg-white border border-gray-100">
                    <Image src="/furevercare.png" alt="Dashboard" fill className="object-cover" />
                  </div>
                </div>
              </motion.div>
            </motion.div>
          </motion.div>
        </div>
      </div>

      {/* --- ARCHITECTURE SECTION --- */}
      <section className="relative z-50 bg-[#0a0a0a] text-white py-16 md:py-32 px-4 md:px-12 border-t border-white/5">
        <SpotlightGrid mousePosition={mousePosition} />
        <div className="max-w-7xl mx-auto relative z-10">

          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="mb-12 md:mb-20 text-center"
          >
            <h2 className="text-3xl md:text-6xl font-black uppercase tracking-tighter mb-4">System Architecture</h2>
            <div className="w-24 h-1 bg-blue-600 mx-auto rounded-full"></div>
          </motion.div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-6 md:gap-8">
            {/* Vet Card */}
            <motion.div
              whileHover={{ y: -5 }}
              className="bg-[#111] p-6 md:p-10 rounded-[20px] md:rounded-[30px] border border-white/5 hover:border-blue-500/30 transition-all shadow-2xl"
            >
              <h3 className="text-xl md:text-2xl font-bold uppercase mb-2 text-white">Veterinary Module</h3>
              <p className="text-blue-400 font-mono text-xs uppercase mb-6 md:mb-8">Web Dashboard • Admin</p>
              <ul className="space-y-3 md:space-y-4">
                {["Analytics Dashboard", "Smart Scheduling", "Medical Records", "Inventory Management"].map((item, i) => (
                  <li key={i} className="flex items-center gap-3 text-gray-400 text-sm md:text-base">
                    <span className="w-1.5 h-1.5 bg-white rounded-full flex-shrink-0" />
                    {item}
                  </li>
                ))}
              </ul>
            </motion.div>

            {/* Customer Card */}
            <motion.div
              whileHover={{ y: -5 }}
              className="bg-[#111] p-6 md:p-10 rounded-[20px] md:rounded-[30px] border border-white/5 hover:border-green-500/30 transition-all shadow-2xl"
            >
              <h3 className="text-xl md:text-2xl font-bold uppercase mb-2 text-white">Customer Module</h3>
              <p className="text-green-400 font-mono text-xs uppercase mb-6 md:mb-8">Mobile App • Client</p>
              <ul className="space-y-3 md:space-y-4">
                {["Digital Pet Cards", "Instant Booking", "Push Notifications", "Remote Consultation"].map((item, i) => (
                  <li key={i} className="flex items-center gap-3 text-gray-400 text-sm md:text-base">
                    <span className="w-1.5 h-1.5 bg-white rounded-full flex-shrink-0" />
                    {item}
                  </li>
                ))}
              </ul>
            </motion.div>
          </div>
        </div>
      </section>

      {/* --- TIMELINE: MODERN EDITORIAL LAYOUT --- */}
      <section className="relative z-50 bg-[#050505] text-white py-16 md:py-32 px-4 md:px-12">
        <div className="max-w-5xl mx-auto relative z-10">

          <div className="text-center mb-16 md:mb-24">
            <span className="text-blue-500 font-mono text-xs uppercase tracking-[0.3em]">The Process</span>
            <h2 className="text-3xl md:text-6xl font-black uppercase tracking-tight mt-4">Development Log</h2>
          </div>

          <div className="relative">
            {/* Center Line: Left on mobile, Center on desktop */}
            <div className="absolute left-[15px] md:left-1/2 top-0 bottom-0 w-px bg-gradient-to-b from-blue-500 via-white/10 to-transparent" />

            <div className="space-y-12 md:space-y-24">
              {phases.map((phase, i) => (
                <motion.div
                  key={i}
                  initial={{ opacity: 0, y: 50 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true, margin: "-50px" }}
                  // Stack on mobile, Alternate on desktop
                  className={`flex flex-col md:flex-row gap-6 md:gap-16 items-start md:items-center relative ${i % 2 === 1 ? 'md:flex-row-reverse' : ''}`}
                >

                  {/* Timeline Dot: Left on mobile, Center on desktop */}
                  <div className="absolute left-[11px] md:left-1/2 md:-translate-x-1/2 w-2 h-2 bg-blue-500 rounded-full ring-4 ring-black z-20" />

                  {/* CONTENT CARD (Text) */}
                  <div className="w-full md:w-1/2 pl-10 md:pl-0">
                    <div className="bg-[#111] border border-white/5 p-6 md:p-8 rounded-2xl hover:border-white/20 transition-colors shadow-lg group relative overflow-hidden">

                      <div className="flex flex-wrap items-center justify-between mb-4 md:mb-6 gap-2">
                        <span className="text-3xl md:text-4xl font-black text-white/10 font-mono">
                          {phase.id}
                        </span>
                        <div className="flex flex-wrap gap-2">
                          {phase.tags.map(tag => (
                            <span key={tag} className="px-2 py-1 bg-white/5 border border-white/5 rounded text-[10px] uppercase tracking-wider text-gray-400">
                              {tag}
                            </span>
                          ))}
                        </div>
                      </div>

                      <h3 className="text-xl md:text-2xl font-bold uppercase mb-3 md:mb-4 text-white group-hover:text-blue-400 transition-colors">
                        {phase.title}
                      </h3>
                      <p className="text-gray-400 leading-relaxed text-sm md:text-base">
                        {phase.desc}
                      </p>
                    </div>
                  </div>

                  {/* IMAGE CARD */}
                  <div className="w-full md:w-1/2 pl-10 md:pl-0">
                    <div className="opacity-100">
                      <InstagramCarousel images={phase.images} />
                    </div>
                  </div>

                </motion.div>
              ))}
            </div>
          </div>

        </div>
      </section>

      {/* --- MANUSCRIPT VIEWER --- */}
      <section className="relative z-50 py-16 md:py-24 bg-white text-black px-4 md:px-12 border-t border-gray-200">
        <div className="max-w-6xl mx-auto">
          <div className="flex flex-col md:flex-row items-start md:items-end justify-between gap-6 mb-8 md:mb-10">
            <div>
              <h2 className="text-3xl md:text-5xl font-black uppercase tracking-tight mb-2">Project Manuscript</h2>
              <p className="text-gray-500 text-sm md:text-base">Read the full documentation below.</p>
            </div>
            <a
              href="/furevercare_manuscript.pdf"
              download
              className="w-full md:w-auto text-center px-6 py-3 bg-black text-white rounded-full text-xs font-bold uppercase tracking-widest hover:bg-blue-600 transition-colors"
            >
              Download PDF ↓
            </a>
          </div>

          {/* PDF VIEWER CONTAINER */}
          <div className="w-full h-[60vh] md:h-[85vh] bg-gray-100 rounded-[20px] md:rounded-[30px] border border-gray-200 overflow-hidden shadow-2xl">
            <object
              data="/furevercare_manuscript.pdf"
              type="application/pdf"
              className="w-full h-full"
            >
              {/* Fallback for mobile (since many mobile browsers don't support inline PDF) */}
              <div className="flex flex-col items-center justify-center h-full text-center p-8 md:p-12">
                <p className="text-gray-500 mb-4 text-lg">Your device might not support inline PDF viewing.</p>
                <a href="/furevercare_manuscript.pdf" className="px-6 py-3 bg-blue-600 text-white rounded-full font-bold shadow-lg">
                  Download Manuscript
                </a>
              </div>
            </object>
          </div>
        </div>
      </section>

    </main>
  );
}