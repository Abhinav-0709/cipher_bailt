
import Link from 'next/link';

export default function Home() {
  return (
    <div className="min-h-screen bg-black text-white font-sans selection:bg-emerald-500 selection:text-black">
      {/* Navbar */}
      <nav className="fixed w-full z-50 border-b border-white/10 bg-black/80 backdrop-blur-md">
        <div className="max-w-7xl mx-auto px-6 h-20 flex items-center justify-between">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 bg-emerald-500/10 rounded-lg flex items-center justify-center border border-emerald-500/20">
              <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="text-emerald-500">
                <path d="M12 22s8-4 8-10V5l-8-3-8 3v7c0 6 8 10 8 10"/>
                <path d="m9 12 2 2 4-4"/>
              </svg>
            </div>
            <span className="text-xl font-bold tracking-tighter bg-gradient-to-r from-white to-white/60 bg-clip-text text-transparent">
              Cipher Bait
            </span>
          </div>
          <div className="hidden md:flex items-center gap-8 text-sm font-medium text-zinc-400">
            <Link href="#features" className="hover:text-white transition-colors">Features</Link>
            <Link href="#how-it-works" className="hover:text-white transition-colors">How it Works</Link>
            <Link href="https://github.com/Abhinav-0709/cipher_bailt" className="hover:text-white transition-colors">GitHub</Link>
          </div>
          <Link href="/demo" className="px-5 py-2.5 bg-white text-black text-sm font-semibold rounded-full hover:bg-zinc-200 transition-colors">
            Live Demo
          </Link>
        </div>
      </nav>

      {/* Hero Section */}
      <section className="relative pt-32 pb-20 md:pt-48 md:pb-32 px-6 overflow-hidden">
        <div className="absolute top-0 left-1/2 -translate-x-1/2 w-[1000px] h-[400px] bg-emerald-500/20 blur-[120px] rounded-full opacity-20 pointer-events-none" />
        
        <div className="max-w-4xl mx-auto text-center relative z-10">
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-emerald-500/10 border border-emerald-500/20 text-emerald-500 text-xs font-medium mb-8 animate-fade-in-up">
            <span className="relative flex h-2 w-2">
              <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-emerald-400 opacity-75"></span>
              <span className="relative inline-flex rounded-full h-2 w-2 bg-emerald-500"></span>
            </span>
            System Operational
          </div>
          
          <h1 className="text-5xl md:text-7xl font-bold tracking-tight mb-8 bg-gradient-to-b from-white to-white/40 bg-clip-text text-transparent">
            Turning the Tables on <br />
            <span className="text-white">Digital Fraud</span>
          </h1>
          
          <p className="text-lg md:text-xl text-zinc-400 mb-12 max-w-2xl mx-auto leading-relaxed">
            Cipher Bait is an autonomous Agentic Honeypot designed to detect, engage, and extract intelligence from scammers using advanced AI personas.
          </p>
          
          <div className="flex flex-col md:flex-row items-center justify-center gap-4">
            <Link href="/demo" className="w-full md:w-auto px-8 py-4 bg-emerald-500 hover:bg-emerald-400 text-black font-semibold rounded-xl transition-all flex items-center justify-center gap-2">
              Try Live Demo
              <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                <path d="M5 12h14"/>
                <path d="m12 5 7 7-7 7"/>
              </svg>
            </Link>
            <Link href="https://github.com/Abhinav-0709/cipher_bailt" className="w-full md:w-auto px-8 py-4 bg-zinc-900 hover:bg-zinc-800 text-white font-semibold rounded-xl border border-zinc-800 transition-all flex items-center justify-center gap-2">
              View Source
            </Link>
          </div>
        </div>
      </section>

      {/* Stats/Grid Section */}
      <section className="py-24 px-6 border-t border-white/5 bg-zinc-950/50">
        <div className="max-w-7xl mx-auto grid grid-cols-1 md:grid-cols-3 gap-8">
          {/* Card 1 */}
          <div className="p-8 rounded-2xl bg-zinc-900/50 border border-white/5 hover:border-emerald-500/20 transition-colors group">
            <div className="w-12 h-12 bg-zinc-800 rounded-lg flex items-center justify-center mb-6 group-hover:bg-emerald-500/10 group-hover:text-emerald-500 transition-colors">
              <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                <path d="M12 8V4H8"/>
                <rect width="16" height="12" x="4" y="8" rx="2"/>
                <path d="M2 14h2"/>
                <path d="M20 14h2"/>
                <path d="M15 13v2"/>
                <path d="M9 13v2"/>
              </svg>
            </div>
            <h3 className="text-xl font-semibold mb-3">AI Persona "Dada Ji"</h3>
            <p className="text-zinc-400 leading-relaxed">
              A 72-year-old grandfather persona that wastes scammers' time with confusing, polite, and endless conversations.
            </p>
          </div>

          {/* Card 2 */}
          <div className="p-8 rounded-2xl bg-zinc-900/50 border border-white/5 hover:border-emerald-500/20 transition-colors group">
            <div className="w-12 h-12 bg-zinc-800 rounded-lg flex items-center justify-center mb-6 group-hover:bg-emerald-500/10 group-hover:text-emerald-500 transition-colors">
              <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                <path d="M21 15v4a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2v-4"/>
                <polyline points="7 10 12 15 17 10"/>
                <line x1="12" x2="12" y1="15" y2="3"/>
              </svg>
            </div>
            <h3 className="text-xl font-semibold mb-3">Intel Extraction</h3>
            <p className="text-zinc-400 leading-relaxed">
              Automatically captures UPI IDs, Bank Account numbers, and Phishing Links for reporting to law enforcement.
            </p>
          </div>

          {/* Card 3 */}
          <div className="p-8 rounded-2xl bg-zinc-900/50 border border-white/5 hover:border-emerald-500/20 transition-colors group">
            <div className="w-12 h-12 bg-zinc-800 rounded-lg flex items-center justify-center mb-6 group-hover:bg-emerald-500/10 group-hover:text-emerald-500 transition-colors">
              <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                <path d="m12 14 4-4"/>
                <path d="M3.34 19a10 10 0 1 1 17.32 0"/>
              </svg>
            </div>
            <h3 className="text-xl font-semibold mb-3">Real-time Analysis</h3>
            <p className="text-zinc-400 leading-relaxed">
              Powered by Google Gemini 1.5 Flash for ultra-low latency detection and response generation.
            </p>
          </div>
        </div>
      </section>

      {/* Terminal/Demo Section */}
      <section className="py-24 px-6 bg-black">
        <div className="max-w-4xl mx-auto">
          <div className="rounded-xl border border-emerald-500/20 bg-zinc-900/50 backdrop-blur overflow-hidden shadow-2xl shadow-emerald-500/5">
            <div className="flex items-center gap-2 px-4 py-3 border-b border-white/5 bg-white/5">
              <div className="w-3 h-3 rounded-full bg-red-500/80"/>
              <div className="w-3 h-3 rounded-full bg-yellow-500/80"/>
              <div className="w-3 h-3 rounded-full bg-emerald-500/80"/>
              <div className="ml-4 text-xs text-zinc-500 font-mono">live-interception.log</div>
            </div>
            <div className="p-6 font-mono text-sm space-y-4">
              <div className="flex gap-4">
                <span className="text-red-400 shrink-0">[SCAMMER]</span>
                <span className="text-zinc-300">Hello sir, your KYC is pending. Send OTP immediately or block.</span>
              </div>
              <div className="flex gap-4">
                <span className="text-emerald-400 shrink-0">[DADA JI]</span>
                <span className="text-zinc-300">"Arre beta, kya block ho jayega? Main thoda purana aadmi hoon. OTP kahan aata hai? TV pe?"</span>
              </div>
              <div className="flex gap-4 opacity-50">
                <span className="text-blue-400 shrink-0">[SYSTEM]</span>
                <span className="text-zinc-500">Analysis: Scam Detected (98%) | Intent: Urgency/Fear</span>
              </div>
            </div>
          </div>
          <div className="mt-8 text-center">
            <p className="text-zinc-500 text-sm">
              Cipher Bait Project • Built for GUVI India AI Impact Buildathon 2026
            </p>
          </div>
        </div>
      </section>
    </div>
  );
}
