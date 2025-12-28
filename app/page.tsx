export default function Home() {
  return (
    <main className="flex min-h-screen flex-col items-center justify-center bg-[#020617] text-white px-4">
      {/* Background Decorative Glow */}
      <div className="absolute top-0 left-0 w-full h-full overflow-hidden z-0">
        <div className="absolute top-[-10%] left-[-10%] w-[40%] h-[40%] bg-blue-900/20 blur-[120px] rounded-full"></div>
        <div className="absolute bottom-[-10%] right-[-10%] w-[40%] h-[40%] bg-purple-900/20 blur-[120px] rounded-full"></div>
      </div>

      <div className="z-10 text-center">
        <h1 className="text-7xl md:text-9xl font-extrabold tracking-tighter mb-4 bg-gradient-to-b from-white to-gray-500 bg-clip-text text-transparent">
          KUWINA
        </h1>
        
        <p className="text-gray-400 text-lg md:text-2xl max-w-2xl mx-auto mb-10 font-light">
          Building digital experiences with <span className="text-blue-400">Next.js</span> and <span className="text-purple-400">Modern UI</span>.
        </p>

        <div className="flex flex-wrap justify-center gap-4">
          {/* Main Action Button */}
          <button className="px-8 py-3 bg-white text-black font-semibold rounded-full hover:bg-gray-200 transition-all duration-300">
            View My Projects
          </button>
          
          {/* Secondary Button */}
          <button className="px-8 py-3 border border-gray-700 text-white font-semibold rounded-full hover:bg-gray-800 transition-all duration-300">
            Contact Me
          </button>
        </div>
      </div>

      <footer className="absolute bottom-8 text-gray-600 text-sm">
        © 2025 Kuwina. Built with GitHub Hosting.
      </footer>
    </main>
  );
}