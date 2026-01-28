"use client";

import React, { useRef } from "react";
import { motion, useScroll, useTransform, useSpring } from "framer-motion";
import Link from "next/link";
import Image from "next/image";

export default function ProjectFall() {
    const containerRef = useRef(null);
    const { scrollYProgress } = useScroll({
        target: containerRef,
        offset: ["start start", "end end"],
    });

    const smoothProgress = useSpring(scrollYProgress, { damping: 20 });

    // Parallax for the hero image
    const heroScale = useTransform(scrollYProgress, [0, 0.2], [1, 1.1]);
    const heroY = useTransform(scrollYProgress, [0, 0.2], ["0%", "20%"]);

    return (
        <div ref={containerRef} className="bg-[#2eb5e6] text-white min-h-[300vh] font-sans relative overflow-hidden selection:bg-[#92cc4f] selection:text-[#4e342e]">

            {/* --- RETRO CLOUD DECORATIONS --- */}
            <div className="fixed inset-0 z-0 opacity-20 pointer-events-none"
                style={{ backgroundImage: 'radial-gradient(white 2px, transparent 0)', backgroundSize: '40px 40px' }}>
            </div>

            {/* --- NAVIGATION --- */}
            <nav className="fixed top-0 left-0 w-full z-[60] flex justify-between items-center p-4 md:p-8 pointer-events-none">
                <Link
                    href="/"
                    className="pointer-events-auto px-4 py-2 md:px-6 md:py-3 bg-black/80 backdrop-blur-md border border-white/20 rounded-full text-white text-xs font-bold uppercase tracking-widest hover:bg-white hover:text-black hover:border-white transition-all flex items-center gap-2 shadow-2xl"
                >
                    <span className="text-lg">←</span>
                    <span className="hidden md:inline">Return Home</span>
                </Link>
            </nav>

            {/* --- HERO SECTION --- */}
            <section className="h-screen sticky top-0 flex flex-col items-center justify-end overflow-hidden z-10 pb-20">
                <motion.div
                    style={{ scale: heroScale, y: heroY }}
                    className="absolute inset-0 z-0"
                >
                    <Image
                        src="/FALL_L.jpg"
                        alt="Fall: Rise to Glory Landscape"
                        fill
                        className="object-cover object-top"
                        priority
                    />
                    <div className="absolute inset-0 bg-gradient-to-t from-[#2eb5e6] via-transparent to-transparent opacity-90" />
                </motion.div>

                <motion.div
                    initial={{ opacity: 0, y: 50 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: 0.5 }}
                    className="relative z-10 text-center"
                >
                    <p className="font-mono text-white/90 bg-black/40 backdrop-blur-md px-6 py-2 rounded-full inline-block uppercase tracking-widest text-xs border border-white/20">
                        Game Development Project
                    </p>
                </motion.div>
            </section>

            {/* --- GAME OVERVIEW (Redesigned: No Portrait) --- */}
            <section className="relative z-20 bg-[#2eb5e6] pt-20 pb-24 px-6">
                <div className="max-w-4xl mx-auto text-center space-y-12">

                    <div className="bg-[#4e342e] text-[#92cc4f] inline-block px-4 py-1 rounded-sm font-bold text-xs uppercase tracking-widest mb-4 shadow-[4px_4px_0px_rgba(0,0,0,0.2)]">
                        Nov 28, 2025
                    </div>

                    <h2 className="text-5xl md:text-7xl font-black text-white leading-tight drop-shadow-lg uppercase italic">
                        Rise to Glory
                    </h2>

                    <div className="text-white/90 text-xl leading-relaxed font-medium max-w-2xl mx-auto">
                        <p>
                            Play as <strong>Loyd</strong>, a frog ninja seeking redemption. After a tragic fall,
                            he must challenge the deadly <strong>Labyrinth of Ascension</strong> to prove his worth
                            and regain his honor.
                        </p>
                        <p className="mt-6 text-base opacity-80 italic">
                            Design Pillars: Precision (Celeste), Challenge (Super Meat Boy), and Rhythm (Rayman Legends).
                        </p>
                    </div>

                    {/* Tech Stack (Removed Aseprite) */}
                    <div className="flex justify-center gap-3 flex-wrap">
                        {["Unity", "C#", "Pixel Art"].map((tech) => (
                            <span key={tech} className="bg-white/20 border-2 border-white/40 px-6 py-3 rounded-lg font-bold text-sm uppercase">
                                {tech}
                            </span>
                        ))}
                    </div>
                </div>
            </section>

            {/* --- NEW: MAIN MENU INTERFACE --- */}
            <section className="relative z-20 bg-[#2eb5e6] pb-24 px-6">
                <div className="max-w-5xl mx-auto">
                    <div className="relative bg-black p-2 rounded-xl shadow-2xl border-[6px] border-[#4e342e]">
                        <div className="relative aspect-video rounded-lg overflow-hidden">
                            <Image src="/MainMenu.png" alt="Main Menu UI" fill className="object-cover" />
                        </div>
                    </div>
                    <p className="text-center text-white/60 font-mono text-xs mt-6 uppercase tracking-widest">
                        Retro-Inspired User Interface
                    </p>
                </div>
            </section>

            {/* --- LEVEL SHOWCASE --- */}
            <section className="relative z-20 bg-[#2eb5e6] pb-24 px-6">
                <div className="max-w-7xl mx-auto">
                    <div className="text-center mb-16">
                        <h3 className="text-3xl font-black uppercase text-white tracking-widest drop-shadow-md">Level Progression</h3>
                        <div className="h-1 w-24 bg-white/30 mx-auto mt-4 rounded-full"></div>
                    </div>

                    <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                        {/* Level 1 */}
                        <div className="group relative bg-[#4e342e] p-2 rounded-xl shadow-xl hover:-translate-y-2 transition-transform">
                            <div className="relative aspect-video overflow-hidden rounded-lg border-4 border-white/20">
                                <Image src="/Level1.png" alt="Level 1: The Beginning" fill className="object-cover" />
                            </div>
                            <div className="p-4">
                                <h4 className="font-bold text-[#92cc4f] uppercase tracking-widest text-sm">Level 01: The Ascent</h4>
                                <p className="text-white/70 text-xs mt-2 font-mono">Basic platforming mechanics. No enemies. Just you and the gravity.</p>
                            </div>
                        </div>

                        {/* Level 2 */}
                        <div className="group relative bg-[#4e342e] p-2 rounded-xl shadow-xl hover:-translate-y-2 transition-transform">
                            <div className="relative aspect-video overflow-hidden rounded-lg border-4 border-white/20">
                                <Image src="/Level2.png" alt="Level 2: Moving Platforms" fill className="object-cover" />
                            </div>
                            <div className="p-4">
                                <h4 className="font-bold text-[#92cc4f] uppercase tracking-widest text-sm">Level 02: Momentum</h4>
                                <p className="text-white/70 text-xs mt-2 font-mono">Introduction of moving platforms and precise timing jumps.</p>
                            </div>
                        </div>

                        {/* Level 3 */}
                        <div className="group relative bg-[#4e342e] p-2 rounded-xl shadow-xl hover:-translate-y-2 transition-transform">
                            <div className="relative aspect-video overflow-hidden rounded-lg border-4 border-white/20">
                                <Image src="/Level3.png" alt="Level 3: The Trap Room" fill className="object-cover" />
                            </div>
                            <div className="p-4">
                                <h4 className="font-bold text-[#92cc4f] uppercase tracking-widest text-sm">Level 03: The Gauntlet</h4>
                                <p className="text-white/70 text-xs mt-2 font-mono">Tight corridors filled with spikes. One mistake sends you back to the start.</p>
                            </div>
                        </div>

                        {/* Level 4 */}
                        <div className="group relative bg-[#4e342e] p-2 rounded-xl shadow-xl hover:-translate-y-2 transition-transform">
                            <div className="relative aspect-video overflow-hidden rounded-lg border-4 border-white/20">
                                <Image src="/Level4.png" alt="Level 4: Boss Room" fill className="object-cover" />
                            </div>
                            <div className="p-4">
                                <h4 className="font-bold text-[#92cc4f] uppercase tracking-widest text-sm">Level 04: Final Boss</h4>
                                <p className="text-white/70 text-xs mt-2 font-mono">The Giant Stone Head awaits. Survive the sawblades and falling rocks.</p>
                            </div>
                        </div>
                    </div>
                </div>
            </section>

            {/* --- BOSS SPOTLIGHT --- */}
            <section className="relative z-20 bg-[#5d4037] py-24 px-6 overflow-hidden">
                <div className="absolute inset-0 opacity-5" style={{ backgroundImage: 'radial-gradient(#000 2px, transparent 0)', backgroundSize: '20px 20px' }} />

                <div className="max-w-6xl mx-auto flex flex-col-reverse md:flex-row items-center gap-12 relative z-10">
                    <div className="w-full md:w-1/2">
                        <div className="bg-[#4e342e] border-[6px] border-[#92cc4f] rounded-2xl p-4 shadow-2xl rotate-[-2deg]">
                            <div className="relative aspect-video bg-[#bfa69b] rounded-lg overflow-hidden pixelated">
                                <Image src="/FinalBoss.png" alt="Giant Stone Head Boss" fill className="object-contain" />
                            </div>
                        </div>
                    </div>
                    <div className="w-full md:w-1/2 text-center md:text-left">
                        <h3 className="text-4xl md:text-6xl font-black uppercase text-[#92cc4f] drop-shadow-md mb-6">
                            Giant Stone Head
                        </h3>
                        <p className="text-[#e8dacb] text-lg leading-relaxed mb-6">
                            The guardian of the labyrinth. This boss fight combines bullet-hell mechanics with platforming.
                            Players must dodge rotating sawblades and falling debris while maintaining their footing on
                            moving platforms.
                        </p>
                        <div className="inline-block bg-black/30 px-6 py-2 rounded-full border border-[#e8dacb]/20">
                            <span className="font-mono text-xs uppercase text-[#92cc4f] tracking-widest">⚠️ Danger Level: Extreme</span>
                        </div>
                    </div>
                </div>
            </section>

            {/* --- GAMEPLAY VIDEO --- */}
            <section className="relative z-20 bg-[#2eb5e6] py-24 px-6">
                <div className="max-w-5xl mx-auto">
                    <div className="text-center mb-8">
                        <h3 className="text-2xl font-black uppercase text-white tracking-widest">Alpha Gameplay</h3>
                    </div>

                    <div className="relative bg-black p-2 md:p-4 rounded-xl shadow-2xl border-[6px] border-[#4e342e]">
                        <video
                            className="w-full h-auto rounded-lg bg-black"
                            controls
                            autoPlay
                            loop
                            muted
                            playsInline
                            poster="/FALL_L.jpg"
                        >
                            <source src="/fall.mp4" type="video/mp4" />
                            Your browser does not support the video tag.
                        </video>
                    </div>
                </div>
            </section>

            {/* --- HALL OF FAME --- */}
            <section className="relative z-20 bg-[#2eb5e6] px-6 pb-32 pt-12">
                <div className="max-w-7xl mx-auto">
                    <div className="flex items-center gap-4 mb-12">
                        <div className="h-1 flex-grow bg-white/20 rounded-full"></div>
                        <h3 className="text-2xl font-black uppercase text-white tracking-widest text-center">Recognition & Awards</h3>
                        <div className="h-1 flex-grow bg-white/20 rounded-full"></div>
                    </div>

                    <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
                        <div className="group relative bg-white p-2 rounded-lg shadow-xl hover:-translate-y-2 transition-transform duration-300">
                            <div className="relative aspect-[4/3] overflow-hidden rounded border border-gray-200">
                                <Image src="/Certificate2.jpg" alt="Best Game Logo Award" fill className="object-cover" />
                            </div>
                            <div className="p-4 text-center">
                                <h4 className="text-black font-black uppercase text-sm">Best Game Logo</h4>
                                <p className="text-zinc-500 text-xs font-mono uppercase mt-1">1st Runner Up</p>
                            </div>
                        </div>

                        <div className="group relative bg-white p-2 rounded-lg shadow-xl hover:-translate-y-2 transition-transform duration-300 md:-mt-8 z-10">
                            <div className="relative aspect-[4/3] overflow-hidden rounded border border-gray-200">
                                <Image src="/Certificate3.jpg" alt="Best Game Project Award" fill className="object-cover" />
                            </div>
                            <div className="p-4 text-center">
                                <h4 className="text-black font-black uppercase text-sm">Best Game Project</h4>
                                <p className="text-zinc-500 text-xs font-mono uppercase mt-1">3rd Runner Up</p>
                            </div>
                            <div className="absolute top-[-10px] right-[-10px] bg-[#92cc4f] text-[#4e342e] w-12 h-12 flex items-center justify-center rounded-full font-bold text-xl shadow-lg border-2 border-white">🏆</div>
                        </div>

                        <div className="group relative bg-white p-2 rounded-lg shadow-xl hover:-translate-y-2 transition-transform duration-300">
                            <div className="relative aspect-[4/3] overflow-hidden rounded border border-gray-200">
                                <Image src="/Certificate1.jpg" alt="Participation Certificate" fill className="object-cover" />
                            </div>
                            <div className="p-4 text-center">
                                <h4 className="text-black font-black uppercase text-sm">TimplaTEK Symposium</h4>
                                <p className="text-zinc-500 text-xs font-mono uppercase mt-1">Official Participant</p>
                            </div>
                        </div>
                    </div>
                </div>
            </section>

            {/* --- STUDIO GALLERY --- */}
            <section className="relative z-20 bg-[#2186ab] py-24 px-6 border-t-[8px] border-[#1a6b8a]">
                <div className="max-w-6xl mx-auto">
                    <h3 className="text-4xl font-black text-white uppercase italic mb-16 text-center drop-shadow-md">
                        Behind the Scenes
                    </h3>

                    <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
                        <div className="relative rotate-[-2deg] hover:rotate-0 transition-transform duration-500">
                            <div className="bg-white p-3 shadow-[10px_10px_0px_rgba(0,0,0,0.2)]">
                                <div className="relative aspect-video">
                                    <Image src="/Completion.jpg" alt="Team Completion" fill className="object-cover" />
                                </div>
                                <p className="text-black font-mono text-[10px] uppercase text-center mt-3 tracking-widest text-opacity-50">FourHead Studio — Dec 2025</p>
                            </div>
                            <div className="absolute top-[-15px] left-[50%] translate-x-[-50%] w-32 h-8 bg-white/30 backdrop-blur-sm rotate-2"></div>
                        </div>

                        <div className="relative rotate-[2deg] hover:rotate-0 transition-transform duration-500">
                            <div className="bg-white p-3 shadow-[10px_10px_0px_rgba(0,0,0,0.2)]">
                                <div className="relative aspect-video">
                                    <Image src="/OverallProject.jpg" alt="Project Exhibit" fill className="object-cover" />
                                </div>
                                <p className="text-black font-mono text-[10px] uppercase text-center mt-3 tracking-widest text-opacity-50">The Exhibit Hall</p>
                            </div>
                            <div className="absolute top-[-15px] left-[50%] translate-x-[-50%] w-32 h-8 bg-white/30 backdrop-blur-sm rotate-[-2]"></div>
                        </div>
                    </div>
                </div>
            </section>

            {/* --- MANUSCRIPT --- */}
            <section className="relative z-20 bg-[#e0e0e0] text-black py-24 px-6 border-t-[8px] border-[#c0c0c0]">
                <div className="max-w-6xl mx-auto">
                    <div className="flex flex-col md:flex-row items-end justify-between gap-6 mb-12">
                        <div>
                            <h3 className="text-4xl font-black uppercase tracking-tighter mb-2">Game Design Document</h3>
                            <p className="text-zinc-600 font-medium">Read the full technical specification and mechanics breakdown.</p>
                        </div>
                        <a href="/GameDV.pdf" download className="bg-black text-white px-8 py-3 rounded-full font-bold uppercase tracking-widest text-xs hover:bg-[#92cc4f] hover:text-black transition-colors shadow-xl">
                            Download PDF ↓
                        </a>
                    </div>

                    <div className="w-full h-[80vh] bg-white rounded-xl overflow-hidden shadow-2xl border-4 border-white">
                        <object data="/GameDV.pdf" type="application/pdf" className="w-full h-full">
                            <div className="flex items-center justify-center h-full flex-col gap-4 bg-zinc-100">
                                <p className="text-zinc-500">Your browser does not support inline PDF viewing.</p>
                                <a href="/GameDV.pdf" className="px-6 py-3 bg-black text-white rounded-full text-sm font-bold uppercase">Download the PDF</a>
                            </div>
                        </object>
                    </div>
                </div>
            </section>

            {/* --- TEAM & CREDITS --- */}
            <section className="relative z-30 bg-[#5d4037] text-[#e8dacb] py-32 px-6 border-t-[8px] border-[#432e29]">
                <div className="max-w-4xl mx-auto">
                    <div className="text-center mb-16">
                        <div className="w-24 h-24 mx-auto rounded-full border-4 border-[#92cc4f] mb-8 overflow-hidden relative bg-white shadow-lg">
                            <Image src="/FALL_L.jpg" fill className="object-cover object-top" alt="Logo" />
                        </div>
                        <h3 className="text-2xl font-black uppercase mb-2 tracking-widest text-[#92cc4f]">FourHead Studio</h3>
                        <p className="text-sm font-mono opacity-60 uppercase">STI College Naga — SY2526</p>
                    </div>

                    <div className="grid grid-cols-1 md:grid-cols-2 gap-8 text-left max-w-2xl mx-auto bg-[#4e342e] p-10 rounded-2xl shadow-inner border-2 border-[#6d4c41] mb-12">
                        <div>
                            <span className="block text-[10px] uppercase opacity-50 font-bold tracking-widest mb-1">Group Leader / Programmer</span>
                            <div className="text-xl font-bold text-white">Basil Santos</div>
                        </div>
                        <div>
                            <span className="block text-[10px] uppercase opacity-50 font-bold tracking-widest mb-1">Lead Developer / Programmer</span>
                            <div className="text-xl font-bold text-[#92cc4f]">Shandy Mayores</div>
                        </div>
                        <div>
                            <span className="block text-[10px] uppercase opacity-50 font-bold tracking-widest mb-1">Documentation</span>
                            <div className="text-xl font-bold text-white">Ben Vergara</div>
                        </div>
                        <div>
                            <span className="block text-[10px] uppercase opacity-50 font-bold tracking-widest mb-1">Documentation</span>
                            <div className="text-xl font-bold text-white">Jon Jon Gomez</div>
                        </div>
                    </div>

                    <div className="border-t border-[#6d4c41] pt-12 text-center max-w-lg mx-auto">
                        <h4 className="font-bold uppercase tracking-widest text-[#92cc4f] mb-6 text-sm">Credits & Resources</h4>
                        <div className="space-y-4 font-mono text-xs opacity-70">
                            <div>
                                <span className="block text-white/40 uppercase text-[10px] mb-1">Academic Inspiration</span>
                                <span className="text-[#e8dacb]">Celeste, Super Meat Boy, Rayman Legends</span>
                            </div>
                            <div>
                                <span className="block text-white/40 uppercase text-[10px] mb-1">Gameplay Mechanics Inspired By</span>
                                <span className="text-[#e8dacb]">Ninja Frog (Steam)</span>
                            </div>
                            <div>
                                <span className="block text-white/40 uppercase text-[10px] mb-1">Base Engine Reference</span>
                                <a href="https://github.com/chrisgodfrey/Robobunny" target="_blank" className="hover:text-white transition-colors underline decoration-[#92cc4f]">
                                    Robobunny by Chris Godfrey
                                </a>
                            </div>
                            <div className="pt-8">
                                Submitted to: Everild Gerd R. Pablo, MBA <br />
                                Subject: Computer Graphics Programming & Game Development
                            </div>
                        </div>
                    </div>
                </div>
            </section>

        </div>
    );
}