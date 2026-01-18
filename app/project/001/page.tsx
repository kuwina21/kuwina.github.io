"use client";
import React, { useState, useRef, useEffect } from 'react';
import Link from 'next/link';
import Image from 'next/image';
import { motion, AnimatePresence, useScroll, useTransform } from 'framer-motion';

// --- DARK MODE GRID (For Black Sections Only) ---
const SpotlightGrid = ({ mousePosition }: { mousePosition: { x: number; y: number } }) => {
  return (
    <div className="absolute inset-0 z-0 pointer-events-none">
      <div 
          className="absolute inset-0 opacity-[0.05]"
          style={{
              backgroundImage: `linear-gradient(to right, #333 1px, transparent 1px), linear-gradient(to bottom, #333 1px, transparent 1px)`,
              backgroundSize: '4rem 4rem',
              backgroundAttachment: 'fixed' 
          }}
      />
      <div 
          className="absolute inset-0 opacity-80 transition-opacity duration-300"
          style={{
              backgroundImage: `linear-gradient(to right, rgba(59, 130, 246, 0.6) 1px, transparent 1px), linear-gradient(to bottom, rgba(59, 130, 246, 0.6) 1px, transparent 1px)`,
              backgroundSize: '4rem 4rem',
              maskImage: `radial-gradient(600px circle at ${mousePosition.x}px ${mousePosition.y}px, black, transparent)`,
              WebkitMaskImage: `radial-gradient(600px circle at ${mousePosition.x}px ${mousePosition.y}px, black, transparent)`,
              backgroundAttachment: 'fixed' 
          }}
      />
    </div>
  );
};

// --- CAROUSEL COMPONENT ---
const InstagramCarousel = ({ images }: { images: string[] }) => {
  const [index, setIndex] = useState(0);
  const nextImage = () => setIndex((prev) => (prev + 1) % images.length);
  const prevImage = () => setIndex((prev) => (prev - 1 + images.length) % images.length);

  return (
    <div className="relative w-full aspect-square bg-black rounded-[30px] overflow-hidden group border border-white/10">
      <AnimatePresence mode='wait'>
        <motion.div
          key={index}
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          transition={{ duration: 0.3 }}
          className="relative w-full h-full"
        >
          <Image src={images[index]} alt="Carousel" fill className="object-contain" />
        </motion.div>
      </AnimatePresence>
      {images.length > 1 && (
        <>
          <button onClick={prevImage} className="absolute left-4 top-1/2 -translate-y-1/2 w-10 h-10 bg-white/10 backdrop-blur-md rounded-full flex items-center justify-center text-white hover:bg-white hover:text-black transition-all opacity-0 group-hover:opacity-100 z-10">←</button>
          <button onClick={nextImage} className="absolute right-4 top-1/2 -translate-y-1/2 w-10 h-10 bg-white/10 backdrop-blur-md rounded-full flex items-center justify-center text-white hover:bg-white hover:text-black transition-all opacity-0 group-hover:opacity-100 z-10">→</button>
          <div className="absolute bottom-4 left-0 right-0 flex justify-center gap-2 z-10">
            {images.map((_, i) => (
              <div key={i} className={`w-2 h-2 rounded-full transition-all shadow-sm ${i === index ? 'bg-white scale-125' : 'bg-white/30'}`} />
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
  
  // Extended offset to manage the long scroll transitions
  const { scrollYProgress } = useScroll({ 
      target: containerRef, 
      offset: ["start start", "end start"] 
  });

  // --- TRANSFORMS ---
  
  // 1. Text Zoom
  const textScale = useTransform(scrollYProgress, [0, 0.4], [1, 150]); 

  // 2. White Fade In
  const whiteLayerOpacity = useTransform(scrollYProgress, [0.3, 0.4], [0, 1]); 

  // 3. Content Slide Up
  const contentY = useTransform(scrollYProgress, [0.3, 0.45], [100, 0]);
  const contentOpacity = useTransform(scrollYProgress, [0.3, 0.4], [0, 1]);

  // 4. NEW STACKING EFFECT: "Ghost Exit"
  // Instead of scaling down, the white page blurs and fades out as the black page approaches.
  const overviewExitBlur = useTransform(scrollYProgress, [0.75, 0.95], ["0px", "10px"]);
  const overviewExitOpacity = useTransform(scrollYProgress, [0.8, 0.95], [1, 0.3]);

  // --- CONTENT PHASES ---
  const phases = [
    {
      id: "01",
      title: "Consultation",
      desc: "We met with our advisers to present the initial prototype. This phase was critical for refining the User Interface (UI). Based on their feedback, we integrated new features such as the Inventory Module and streamlined the appointment setting process.",
      images: ["/Consultation1.jpg", "/Consultation2.jpg"]
    },
    {
      id: "02",
      title: "The Defense",
      desc: "The culmination of our research. We successfully presented the system's architecture and logic to the panel. After demonstrating the backend reliability and real-time features, we secured our official approval.",
      images: ["/Re def.jpg"]
    },
    {
      id: "03",
      title: "Symposium",
      desc: "With the system approved, we showcased the full Furever Care ecosystem at the STI Research Symposium. We demonstrated the real-time sync between the web dashboard and mobile app to students and faculty.",
      images: ["/Symposium1.jpg", "/Symposium2.jpg"]
    },
    {
      id: "04",
      title: "Final Submission",
      desc: "Mission Accomplished. The system was fully deployed, the manuscript was bound, and we officially passed the Capstone requirement. The journey from concept to code is complete.",
      images: ["/final2.jpg", "/final1.jpg"]
    }
  ];

  return (
    <main className="bg-black text-white font-sans selection:bg-blue-100 relative">

      {/* --- HEADER --- */}
      <nav className="fixed top-0 left-0 w-full z-[60] flex justify-between items-center p-8 pointer-events-none">
        <Link href="/" className="pointer-events-auto px-6 py-3 bg-white/10 backdrop-blur-md border border-white/20 rounded-full text-black bg-white/80 shadow-lg text-xs font-mono uppercase tracking-widest hover:scale-105 transition-all">
           ← Return Home
        </Link>
      </nav>
      
      {/* --- PAGE 1: ZOOM + PROJECT OVERVIEW (Sticky Container) --- */}
      <div ref={containerRef} className="relative h-[300vh] bg-black z-10">
        <div className="sticky top-0 w-full h-screen overflow-hidden flex items-center justify-center">
          
          <SpotlightGrid mousePosition={mousePosition} />
          
          {/* BLACK LAYER (TITLE) */}
          <motion.div style={{ scale: textScale }} className="absolute inset-0 z-30 flex flex-col items-center justify-center pointer-events-none origin-center">
             <h1 className="text-[12vw] font-black tracking-tighter leading-none text-white italic text-center drop-shadow-2xl">
               FUREVERCARE
             </h1>
          </motion.div>
          
          {/* WHITE LAYER (PROJECT OVERVIEW) */}
          <motion.div 
            style={{ 
                opacity: whiteLayerOpacity,
                filter: overviewExitBlur // Applies the blur effect on exit
            }} 
            className="absolute inset-0 z-40 overflow-hidden bg-white flex flex-col items-center justify-center"
          >
              <div className="absolute inset-0 z-0 bg-white" />

              <motion.div 
                 style={{ 
                     y: contentY, 
                     opacity: contentOpacity 
                 }}
                 className="relative z-10 max-w-7xl mx-auto w-full px-6 md:px-12 h-full flex flex-col justify-center"
              >
                  {/* Apply the fade out on exit specifically to the content container */}
                  <motion.div 
                    style={{ opacity: overviewExitOpacity }}
                    className="grid grid-cols-1 lg:grid-cols-2 gap-12 lg:gap-24 items-center"
                  >
                      {/* LEFT SIDE: TEXT CONTENT */}
                      <div className="flex flex-col items-start text-left space-y-8 order-2 lg:order-1">
                           <div>
                               <div className="inline-block w-12 h-1 bg-black mb-4"></div>
                               <h2 className="text-5xl md:text-7xl font-black uppercase tracking-tighter leading-[0.9] text-black">
                                  Project <br/> Overview
                               </h2>
                           </div>
                           <p className="text-lg md:text-xl text-gray-700 font-light leading-relaxed">
                              "Furever-Care solves record fragmentation in local veterinary services by implementing a <span className="text-black font-bold border-b border-black/20">real-time cloud architecture</span>. It bridges the gap between pet owners and clinics instantly."
                           </p>
                           <div className="flex flex-col items-start gap-6">
                              <div className="flex flex-wrap gap-2 text-[10px] font-mono text-gray-400 uppercase tracking-widest">
                                  <span className="bg-gray-100 px-3 py-1 rounded-full border border-gray-200 text-black font-bold">Flutter</span>
                                  <span className="bg-gray-100 px-3 py-1 rounded-full border border-gray-200 text-black font-bold">Firebase</span>
                                  <span className="bg-gray-100 px-3 py-1 rounded-full border border-gray-200 text-black font-bold">Javascript</span>
                              </div>
                              <a href="https://furevercare-5b8f9.web.app/" target="_blank" className="group relative px-10 py-5 bg-black text-white font-bold rounded-full overflow-hidden flex items-center gap-4 transition-all hover:scale-105 hover:shadow-xl hover:shadow-black/20">
                                  <span className="relative z-10 text-xs uppercase tracking-widest">Launch System</span>
                                  <span className="relative z-10">↗</span>
                                  <div className="absolute inset-0 bg-blue-600 translate-y-full group-hover:translate-y-0 transition-transform duration-300 ease-in-out" />
                              </a>
                           </div>
                      </div>

                      {/* RIGHT SIDE: IMAGE */}
                      <div className="relative order-1 lg:order-2 w-full aspect-[4/3] lg:aspect-square">
                          <div className="w-full h-full relative rounded-2xl overflow-hidden shadow-2xl shadow-blue-900/10 border border-gray-200 bg-gray-100">
                              <Image src="/furevercare.png" alt="Dashboard" fill className="object-cover" />
                          </div>
                      </div>
                  </motion.div>
              </motion.div>
          </motion.div>
        </div>
      </div>

      {/* --- PAGE 2: SYSTEM ARCHITECTURE (Slides over) --- */}
      <section className="relative z-50 bg-[#0a0a0a] text-white py-32 px-8 md:px-24 overflow-hidden border-t border-white/5 shadow-[0_-50px_100px_rgba(0,0,0,0.8)]">
         <SpotlightGrid mousePosition={mousePosition} />
         <div className="max-w-7xl mx-auto relative z-10">
            
            {/* Header Animation */}
            <motion.div 
                initial={{ opacity: 0, y: 50 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, margin: "-100px" }}
                transition={{ duration: 0.8 }}
                className="flex flex-col items-center text-center mb-24"
            >
                <h2 className="text-4xl md:text-6xl font-black uppercase tracking-tighter mb-4">System Architecture</h2>
                <div className="h-1 w-20 bg-blue-600 rounded-full mb-8 mx-auto"></div>
                <p className="text-gray-400 max-w-2xl mx-auto text-lg">
                    Built using a dual-platform approach to ensure seamless connectivity between veterinary clinics and pet owners.
                </p>
                
                {/* Tech Stack Pop-in Animation */}
                <div className="flex gap-8 mt-8">
                    {[
                        { icon: "📱", label: "Flutter", color: "text-blue-400" },
                        { icon: "🔥", label: "Firebase", color: "text-orange-400" },
                        { icon: "⚡", label: "Javascript", color: "text-yellow-400" }
                    ].map((tech, i) => (
                        <motion.div 
                            key={i}
                            initial={{ opacity: 0, scale: 0 }}
                            whileInView={{ opacity: 1, scale: 1 }}
                            viewport={{ once: true }}
                            transition={{ delay: i * 0.2, type: "spring", stiffness: 200 }}
                            className="flex flex-col items-center gap-2"
                        >
                            <div className="w-16 h-16 bg-white/5 border border-white/10 rounded-2xl flex items-center justify-center text-2xl shadow-lg shadow-black/50">{tech.icon}</div>
                            <span className={`font-mono text-xs uppercase tracking-widest ${tech.color}`}>{tech.label}</span>
                        </motion.div>
                    ))}
                </div>
            </motion.div>

            {/* Feature Grid Animation */}
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-12">
                
                {/* VETERINARY MODULE (Slides from LEFT) */}
                <motion.div 
                    initial={{ opacity: 0, x: -100 }}
                    whileInView={{ opacity: 1, x: 0 }}
                    viewport={{ once: true }}
                    transition={{ duration: 0.8, ease: "easeOut" }}
                    className="p-8 rounded-[30px] bg-white/5 border border-white/10 hover:border-blue-500/50 transition-colors duration-300 backdrop-blur-sm"
                >
                    <div className="flex items-center justify-between mb-8">
                        <h3 className="text-2xl font-bold uppercase tracking-tight">Veterinary Module</h3>
                        <span className="px-3 py-1 bg-blue-500/20 text-blue-400 text-xs font-mono rounded-full uppercase">Web & Mobile</span>
                    </div>
                    <ul className="space-y-4">
                        {[
                            { icon: "📊", title: "Analytics Dashboard", desc: "Real-time clinic performance metrics" },
                            { icon: "📅", title: "Smart Scheduling", desc: "Appointments, procedures & calendar sync" },
                            { icon: "🖨️", title: "Medical Records", desc: "Generate & print official PDF records" },
                            { icon: "🔔", title: "Auto-Reminders", desc: "Automated SMS/Email for vaccinations" },
                            { icon: "🛍️", title: "Shop Management", desc: "Inventory & sales tracking" },
                            { icon: "💬", title: "Support Chat", desc: "Direct communication line with clients" },
                            { icon: "📈", title: "Report Generation", desc: "Printable overall analytics reports" },
                            { icon: "📢", title: "Ad Manager", desc: "Push promotions to customer dashboards" },
                        ].map((item, i) => (
                            <li key={i} className="flex items-start gap-4 p-3 hover:bg-white/5 rounded-xl transition-colors">
                                <span className="text-xl">{item.icon}</span>
                                <div>
                                    <h4 className="font-bold text-sm text-gray-200">{item.title}</h4>
                                    <p className="text-xs text-gray-500">{item.desc}</p>
                                </div>
                            </li>
                        ))}
                    </ul>
                </motion.div>

                {/* CUSTOMER MODULE (Slides from RIGHT) */}
                <motion.div 
                    initial={{ opacity: 0, x: 100 }}
                    whileInView={{ opacity: 1, x: 0 }}
                    viewport={{ once: true }}
                    transition={{ duration: 0.8, ease: "easeOut", delay: 0.2 }} // Slight delay for staggered effect
                    className="p-8 rounded-[30px] bg-white/5 border border-white/10 hover:border-green-500/50 transition-colors duration-300 backdrop-blur-sm"
                >
                    <div className="flex items-center justify-between mb-8">
                        <h3 className="text-2xl font-bold uppercase tracking-tight">Customer Module</h3>
                        <span className="px-3 py-1 bg-green-500/20 text-green-400 text-xs font-mono rounded-full uppercase">Web & Mobile</span>
                    </div>
                    <ul className="space-y-4">
                        {[
                            { icon: "🐕", title: "Digital Pet Card", desc: "Full medical history & pet profile" },
                            { icon: "📅", title: "Book Appointments", desc: "Instant booking requests" },
                            { icon: "🔔", title: "Smart Notifications", desc: "Receive alerts via App & Gmail" },
                            { icon: "🛍️", title: "Pet Shop", desc: "Browse products & supplies" },
                            { icon: "💬", title: "Vet Chat", desc: "Consult with vets remotely" },
                            { icon: "🎁", title: "Promotions", desc: "View exclusive clinic offers" },
                            { icon: "⚙️", title: "Settings", desc: "Profile management & preferences" },
                            { icon: "🌓", title: "Dark Mode", desc: "Adaptive UI for all lighting conditions" },
                        ].map((item, i) => (
                            <li key={i} className="flex items-start gap-4 p-3 hover:bg-white/5 rounded-xl transition-colors">
                                <span className="text-xl">{item.icon}</span>
                                <div>
                                    <h4 className="font-bold text-sm text-gray-200">{item.title}</h4>
                                    <p className="text-xs text-gray-500">{item.desc}</p>
                                </div>
                            </li>
                        ))}
                    </ul>
                </motion.div>

            </div>
         </div>
      </section>

      {/* --- PAGE 3: THE TIMELINE --- */}
      <section className="relative z-50 bg-[#050505] text-white pb-32 px-8 md:px-24 border-t border-white/0 overflow-hidden">
        <SpotlightGrid mousePosition={mousePosition} />
        
        <div className="max-w-7xl mx-auto relative z-10 pt-24">
          <div className="space-y-40">
            {phases.map((phase, i) => (
              <motion.div 
                key={i}
                initial={{ opacity: 0, y: 50 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, margin: "-20%" }}
                transition={{ duration: 0.8 }}
                className="flex flex-col md:flex-row items-center gap-16 md:gap-24"
              >
                <div className="w-full md:w-1/2 space-y-8">
                  <div className="inline-block px-4 py-2 border border-white/20 rounded-full text-blue-500 font-mono text-xs uppercase tracking-widest">
                    Phase {phase.id}
                  </div>
                  <h3 className="text-4xl md:text-5xl font-black uppercase tracking-tight leading-none">
                    {phase.title}
                  </h3>
                  <p className="text-gray-400 text-lg leading-relaxed">
                    {phase.desc}
                  </p>
                </div>
                <div className="w-full md:w-1/2">
                    <InstagramCarousel images={phase.images} />
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* --- MANUSCRIPT VIEWER --- */}
      <div className="relative z-50 p-8 md:p-24 bg-white">
        <div className="max-w-7xl mx-auto">
          <div className="flex justify-between items-end mb-8">
              <h2 className="text-4xl md:text-6xl font-black uppercase tracking-tighter italic text-black">Project Manuscript</h2>
              <a href="/furevercare_manuscript.pdf" download className="hidden md:block text-sm font-bold underline hover:text-blue-600 text-black">Download PDF ↓</a>
            </div>
            <div className="w-full h-[80vh] bg-gray-100 rounded-[30px] overflow-hidden border border-gray-200 shadow-inner relative">
              <object data="/furevercare_manuscript.pdf" type="application/pdf" className="w-full h-full">
                <div className="flex flex-col items-center justify-center h-full text-center p-10">
                  <p className="text-gray-500 mb-4">Your browser does not support inline PDF viewing.</p>
                  <a href="/furevercare_manuscript.pdf" className="px-8 py-3 bg-blue-600 text-white rounded-full font-bold uppercase text-xs tracking-widest">Download Manuscript</a>
                </div>
              </object>
            </div>
        </div>
      </div>

    </main>
  );
}