'use client';
import { useState, useEffect } from 'react';
import Link from 'next/link';
import { UserButton, SignedIn, SignedOut, useUser } from "@clerk/nextjs";

export default function Navbar() {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [isGamesOpen, setIsGamesOpen] = useState(false);

  const { user } = useUser();
  const [dbXp, setDbXp] = useState(0);

  useEffect(() => {
    const fetchStats = async () => {
      if (user) {
        try {
          const res = await fetch('/api/user/stats');
          const data = await res.json();
          setDbXp(data.xp || 0);
        } catch (err) {
          console.error("Navbar fetch error:", err);
        }
      }
    };

    fetchStats();
  }, [user]);

  const walletBalance = (Number(dbXp) * 0.15).toFixed(2);

  const navLinks = [
    { name: 'My Words', href: '/my-words' },
    { name: 'Pricing', href: '/pricing' },
  ];

  const gameOptions = [
    { name: 'LevelUp', href: '/dashboard' },
    { name: 'Selector', href: '/selector' },
  ];

  return (
    <nav className="sticky top-0 z-50 w-full border-b border-orange-500/20 bg-black/90 backdrop-blur-md">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex h-20 items-center justify-between relative">
          
          {/* 1. LOGO (Left Corner) */}
          <div className="flex-shrink-0 z-10">
            <Link href="/" prefetch={false} className="group flex items-center gap-2">
              <div className="bg-orange-500 p-2 rounded-xl group-hover:rotate-12 transition-transform duration-300 shadow-[0_0_15px_rgba(249,115,22,0.4)]">
                <span className="text-black font-black text-xl">L</span>
              </div>
              <span className="text-2xl font-black tracking-tighter text-white">
                LANG<span className="text-orange-500">STR</span>
              </span>
            </Link>
          </div>

          {/* 2. CENTER NAV (Absolutely Centered) */}
          <div className="hidden md:flex absolute left-1/2 -translate-x-1/2 items-center space-x-10 h-full">
            {navLinks.map((link) => (
              <Link 
                key={link.name} 
                href={link.href}
                className="text-sm font-bold text-gray-400 hover:text-orange-500 transition-colors uppercase tracking-widest"
              >
                {link.name}
              </Link>
            ))}

            <div 
              className="relative h-full flex items-center"
              onMouseEnter={() => setIsGamesOpen(true)}
              onMouseLeave={() => setIsGamesOpen(false)}
            >
              <button className={`text-sm font-bold transition-colors uppercase tracking-widest flex items-center gap-1 ${isGamesOpen ? 'text-orange-500' : 'text-gray-400'}`}>
                Games
                <svg className={`w-4 h-4 transition-transform duration-200 ${isGamesOpen ? 'rotate-180 text-orange-500' : ''}`} fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
                </svg>
              </button>
              
              {isGamesOpen && (
                <div className="absolute top-[70%] left-1/2 -translate-x-1/2 w-48 pt-4 z-50 animate-in fade-in slide-in-from-top-2 duration-200">
                  <div className="bg-[#0a0a0a] border border-orange-500/30 rounded-2xl py-3 shadow-[0_10px_40px_rgba(0,0,0,0.8)] overflow-hidden">
                    {gameOptions.map((game) => (
                      <Link
                        key={game.name}
                        href={game.href}
                        className="block px-6 py-3 text-xs font-black text-gray-400 hover:text-orange-500 hover:bg-orange-500/5 transition-all uppercase tracking-widest text-center"
                      >
                        {game.name}
                      </Link>
                    ))}
                  </div>
                </div>
              )}
            </div>
          </div>

          {/* 3. RIGHT AUTH & STATS (Right Corner) */}
          <div className="hidden md:flex items-center z-10">
            <SignedOut>
              <div className="flex items-center space-x-4">
                <Link href="/sign-in" className="text-sm font-bold text-gray-300 hover:text-white transition-all">
                  Sign In
                </Link>
                <Link href="/sign-up">
                  <button className="bg-orange-500 hover:bg-orange-600 text-black text-sm font-black py-3 px-8 rounded-full transition-all hover:scale-105 shadow-[0_0_20px_rgba(249,115,22,0.3)]">
                    TRY FREE
                  </button>
                </Link>
              </div>
            </SignedOut>

            <SignedIn>
              <div className="flex items-center">
                {/* WALLET WITH MARGIN */}
                <Link 
                  href="/billing" 
                  className="group flex items-center gap-2 bg-zinc-900 hover:bg-zinc-800 border border-white/5 px-4 py-2 rounded-xl transition-all active:scale-95 ml-4"
                >
                  <svg 
                    xmlns="http://www.w3.org/2000/svg" 
                    width="20" 
                    height="20" 
                    viewBox="0 0 24 24" 
                    fill="none" 
                    stroke="currentColor" 
                    strokeWidth="2.5" 
                    strokeLinecap="round" 
                    strokeLinejoin="round" 
                    className="text-orange-500 group-hover:scale-110 transition-transform"
                  >
                    <path d="M21 12V7a2 2 0 0 0-2-2H5a2 2 0 0 0-2 2v10a2 2 0 0 0 2 2h14a2 2 0 0 0 2-2v-3.5" />
                    <path d="M16 12h5" />
                  </svg>
                  <span className="text-white font-black text-sm tracking-tight">
                    ${walletBalance}
                  </span>
                </Link>

                <Link href="/dashboard" className="text-sm font-bold text-gray-300 hover:text-orange-500 transition-all px-4 ml-2">
                  Dashboard
                </Link>

                <div className="pl-2 border-l border-white/10 ml-2">
                  <UserButton 
                    afterSignOutUrl="/" 
                    appearance={{
                      elements: {
                        avatarBox: "w-10 h-10 border-2 border-orange-500"
                      }
                    }}
                  />
                </div>
              </div>
            </SignedIn>
          </div>

          {/* MOBILE BUTTON */}
          <div className="md:hidden flex items-center">
            <button onClick={() => setIsMenuOpen(!isMenuOpen)} className="text-gray-400 hover:text-orange-500">
              <svg className="h-8 w-8" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                {isMenuOpen ? (
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                ) : (
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 6h16M4 12h16m-7 6h7" />
                )}
              </svg>
            </button>
          </div>
        </div>
      </div>

      {/* MOBILE MENU */}
      {isMenuOpen && (
        <div className="md:hidden bg-neutral-950 border-b border-orange-500/20">
          <div className="px-4 pt-4 pb-8 space-y-4">
            <SignedIn>
              <div className="grid grid-cols-2 gap-3 mx-4">
                <div className="bg-zinc-900 border border-white/10 p-4 rounded-2xl">
                   <p className="text-[10px] font-black text-gray-500 uppercase">Your XP</p>
                   <p className="text-white font-black text-lg">{dbXp}</p>
                </div>
                <Link href="/billing" className="bg-zinc-900 border border-white/10 p-4 rounded-2xl active:bg-zinc-800">
                  <p className="text-[10px] font-black text-orange-500 uppercase">Wallet</p>
                  <p className="text-white font-black text-lg">${walletBalance}</p>
                </Link>
              </div>
            </SignedIn>
          </div>
        </div>
      )}
    </nav>
  );
}