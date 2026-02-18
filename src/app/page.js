import Link from 'next/link';
import { Zap, Globe, BarChart3, ShieldCheck } from "lucide-react";

export default function HomePage() {
  return (
    <main className="bg-[#050505] text-white min-h-screen">
      {/* --- HERO SECTION: Restored Cinematic Experience --- */}
      <section className="relative h-[90vh] flex items-center justify-center px-4 overflow-hidden">
        {/* Background Video Overlay / Original Image Restored */}
        <div className="absolute inset-0 z-0 opacity-40">
          <div className="absolute inset-0 bg-gradient-to-b from-transparent via-black/60 to-[#050505]" />
          <div className="w-full h-full bg-[url('https://images.unsplash.com/photo-1467226632440-65f0b495746d?q=80&w=2000')] bg-cover bg-center grayscale group-hover:grayscale-0 transition-all duration-700" />
        </div>

        <div className="max-w-5xl mx-auto text-center relative z-10 space-y-8">
          <div className="flex justify-center">
            <span className="bg-orange-600 text-black text-[10px] font-black px-2 py-0.5 rounded uppercase tracking-widest">
              Live Cinema
            </span>
          </div>
          
          <h1 className="text-6xl md:text-9xl font-black tracking-tighter leading-none">
            WATCH. LEARN. <br />
            <span className="text-orange-500">DOMINATE.</span>
          </h1>

          <p className="text-gray-300 text-lg md:text-2xl max-w-3xl mx-auto font-medium">
            Master German through high-definition precision. 
            Interactive training. Real-world context. Zero fluff.
          </p>

          <div className="flex flex-col sm:flex-row gap-6 justify-center pt-4">
            <Link href="/dashboard">
              <button className="group relative px-12 py-5 bg-orange-500 text-black font-black rounded-full overflow-hidden transition-all hover:scale-105 active:scale-95">
                <span className="relative z-10 uppercase">Enter the Gauntlet</span>
                <div className="absolute inset-0 bg-white/20 translate-y-full group-hover:translate-y-0 transition-transform duration-300" />
              </button>
            </Link>
          </div>
        </div>
      </section>

      {/* --- PREMIUM BENEFITS SECTION: Replaces High-Velocity --- */}
      <section className="max-w-7xl mx-auto px-6 py-32">
        <div className="bg-[#0a0a0a] border border-white/5 rounded-[3rem] p-8 md:p-16 relative overflow-hidden">
          {/* Subtle Glow */}
          <div className="absolute -top-24 -right-24 w-96 h-96 bg-orange-500/10 blur-[120px] rounded-full" />
          
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 items-center">
            <div className="space-y-6">
              <h2 className="text-5xl md:text-7xl font-black italic uppercase tracking-tighter leading-none">
                THE <span className="text-orange-500">PREMIUM</span><br />ADVANTAGE.
              </h2>
              <p className="text-gray-400 text-lg font-medium max-w-md italic">
                No distractions. No limits. Just pure linguistic dominance.
              </p>
              <button className="bg-white text-black px-10 py-4 rounded-2xl font-black uppercase italic hover:bg-orange-500 hover:text-white transition-all">
                Upgrade to Pro
              </button>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
              <div className="bg-white/[0.03] p-8 rounded-[2rem] border border-white/5 hover:border-orange-500/50 transition-colors group">
                <Globe className="text-orange-500 mb-4 group-hover:scale-110 transition-transform" size={32} />
                <h4 className="text-xl font-black uppercase italic italic mb-2">10,000+ Words</h4>
                <p className="text-sm text-gray-500 font-bold uppercase tracking-tighter">Complete access to the entire German lexicon.</p>
              </div>

              <div className="bg-white/[0.03] p-8 rounded-[2rem] border border-white/5 hover:border-orange-500/50 transition-colors group">
                <Zap className="text-orange-500 mb-4 group-hover:scale-110 transition-transform" size={32} />
                <h4 className="text-xl font-black uppercase italic mb-2">Flawless Flow</h4>
                <p className="text-sm text-gray-500 font-bold uppercase tracking-tighter">Zero ads. Instant loading. High-speed retention.</p>
              </div>

              <div className="bg-white/[0.03] p-8 rounded-[2rem] border border-white/5 hover:border-orange-500/50 transition-colors group">
                <BarChart3 className="text-orange-500 mb-4 group-hover:scale-110 transition-transform" size={32} />
                <h4 className="text-xl font-black uppercase italic mb-2">Word Tracker</h4>
                <p className="text-sm text-gray-500 font-bold uppercase tracking-tighter">Real-time tracking of every word you've mastered.</p>
              </div>

              <div className="bg-white/[0.03] p-8 rounded-[2rem] border border-white/5 hover:border-orange-500/50 transition-colors group">
                <ShieldCheck className="text-orange-500 mb-4 group-hover:scale-110 transition-transform" size={32} />
                <h4 className="text-xl font-black uppercase italic mb-2">Elite Rank</h4>
                <p className="text-sm text-gray-500 font-bold uppercase tracking-tighter">Priority support and premium member badges.</p>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* --- MINIMALIST FOOTER: Perfected --- */}
      <footer className="py-20 border-t border-white/5 text-center">
         <Link href="/dashboard" className="text-4xl font-black italic uppercase text-white/20 hover:text-orange-500 transition-colors tracking-tighter">
            Begin the Journey &rarr;
         </Link>
      </footer>
    </main>
  );
}