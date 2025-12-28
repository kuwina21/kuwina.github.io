export default function Home() {
  const projects = [
    { title: "E-Commerce App", tech: "Next.js • Tailwind", desc: "A modern shopping experience." },
    { title: "AI Dashboard", tech: "React • OpenAI", desc: "Data visualization for AI metrics." },
    { title: "Portfolio V1", tech: "HTML • CSS", desc: "My very first coding project." },
  ];

  return (
    <div className="bg-[#020617] text-white selection:bg-blue-500/30">
      
      {/* SECTION 1: HERO */}
      <section className="relative flex min-h-screen flex-col items-center justify-center px-4 overflow-hidden">
        {/* Background Glows */}
        <div className="absolute top-[-10%] left-[-10%] w-[40%] h-[40%] bg-blue-900/20 blur-[120px] rounded-full"></div>
        <div className="absolute bottom-[-10%] right-[-10%] w-[40%] h-[40%] bg-purple-900/20 blur-[120px] rounded-full"></div>

        <div className="z-10 text-center">
          <h1 className="text-7xl md:text-9xl font-extrabold tracking-tighter mb-4 bg-gradient-to-b from-white to-gray-500 bg-clip-text text-transparent">
            MAYORES
          </h1>
          <p className="text-gray-400 text-lg md:text-2xl max-w-2xl mx-auto mb-10 font-light">
            Building digital experiences with <span className="text-blue-400">Next.js</span> and <span className="text-purple-400">Modern UI</span>.
          </p>
          <a href="#projects" className="px-8 py-3 bg-white text-black font-semibold rounded-full hover:bg-gray-200 transition-all duration-300">
            Scroll to Work
          </a>
        </div>
      </section>

      {/* SECTION 2: PROJECTS */}
      <section id="projects" className="min-h-screen p-8 md:p-24 bg-[#030712]">
        <header className="mb-16">
          <h2 className="text-4xl md:text-6xl font-bold mb-4 tracking-tight">Selected Work</h2>
          <div className="h-1 w-20 bg-blue-600 rounded-full"></div>
        </header>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {projects.map((p, i) => (
            <div key={i} className="group p-8 rounded-3xl border border-gray-800 bg-gray-900/40 backdrop-blur-md hover:border-blue-500/50 transition-all duration-500 hover:-translate-y-2">
              <div className="mb-4 text-blue-400 font-mono text-xs uppercase tracking-widest">{p.tech}</div>
              <h3 className="text-2xl font-bold mb-2">{p.title}</h3>
              <p className="text-gray-400 mb-6 font-light">{p.desc}</p>
              <div className="text-sm font-bold flex items-center gap-2 group-hover:text-blue-400 cursor-pointer transition-colors">
                LEARN MORE <span>→</span>
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* SECTION 3: CONTACT */}
      <section className="py-32 flex flex-col items-center justify-center border-t border-gray-900">
        <h2 className="text-3xl font-bold mb-8">Ready to start a project?</h2>
        <button className="px-10 py-4 border border-gray-700 rounded-full hover:bg-white hover:text-black transition-all">
          Contact Me
        </button>
        <footer className="mt-20 text-gray-600 text-sm">
          © 2025 Mayores • Built with Next.js
        </footer>
      </section>

    </div>
  );
}