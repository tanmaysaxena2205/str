"use client";

import React, { useState } from "react";
import Link from "next/link";
import { Lock, Play, CheckCircle2, X } from "lucide-react";

export default function UnitGrid({ unit, activeUnit, activeLevel, isDailyLimitReached }) {
  const [showLimitModal, setShowLimitModal] = useState(false);

  return (
    <>
      {/* LIMIT MODAL OVERLAY */}
      {showLimitModal && (
        <div className="fixed inset-0 z-[100] flex items-center justify-center p-6">
          <div className="absolute inset-0 bg-black/80 backdrop-blur-md" onClick={() => setShowLimitModal(false)} />
          <div className="relative bg-[#0a0a0a] border border-[#ff6600]/50 p-10 rounded-[3rem] max-w-sm w-full text-center shadow-[0_0_50px_rgba(255,102,0,0.2)] animate-in zoom-in duration-300">
            <button onClick={() => setShowLimitModal(false)} className="absolute top-6 right-6 text-white/20 hover:text-white">
              <X size={24} />
            </button>
            <div className="w-20 h-20 bg-[#ff6600]/10 rounded-full flex items-center justify-center mx-auto mb-6">
              <Lock size={40} className="text-[#ff6600]" />
            </div>
            <h2 className="text-4xl font-black italic uppercase text-[#ff6600] mb-4">Daily Limit</h2>
            <p className="text-white/60 font-bold uppercase tracking-widest text-xs mb-8">
              Free users get 1 level per day.<br/>Upgrade to Premium for unlimited access!
            </p>
            <button className="w-full bg-[#ff6600] text-black py-4 rounded-2xl font-black uppercase italic hover:scale-105 transition-all">
              Go Premium
            </button>
          </div>
        </div>
      )}

      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-5 gap-4">
        {unit.levels.map((level, idx) => {
          const levelIdNum = Number(level.levelId);
          const unitIdNum = Number(unit.unitId);

          const isUnlockedByProgress = unitIdNum < activeUnit || (unitIdNum === activeUnit && levelIdNum <= activeLevel);
          const isCompleted = unitIdNum < activeUnit || (unitIdNum === activeUnit && levelIdNum < activeLevel);
          const isActive = unitIdNum === activeUnit && levelIdNum === activeLevel;
          
          // The level is "Time Locked" if it's the next one to play but they hit their limit
          const isTimeLocked = isActive && isDailyLimitReached;

          return (
            <div key={level.levelId} className="flex flex-col items-center">
              {/* If Progress Locked -> Dull View | If Time Locked -> Clickable Alert | If Open -> Link */}
              {!isUnlockedByProgress ? (
                <div className="w-full aspect-square rounded-3xl border-2 border-white/5 bg-white/[0.02] flex flex-col items-center justify-center opacity-20 cursor-not-allowed">
                  <Lock size={24} className="mb-2" />
                  <span className="text-[10px] font-black">{idx + 1}</span>
                </div>
              ) : isTimeLocked ? (
                <button 
                  onClick={() => setShowLimitModal(true)}
                  className="w-full aspect-square rounded-3xl border-2 border-[#ff6600]/30 bg-[#ff6600]/5 flex flex-col items-center justify-center transition-all hover:bg-[#ff6600]/10 group"
                >
                  <Lock size={32} className="text-[#ff6600] mb-1 group-hover:scale-110 transition-transform" />
                  <span className="text-[10px] font-black uppercase text-[#ff6600]/50">Lvl {levelIdNum}</span>
                </button>
              ) : (
                <Link href={`/unit/${unit.unitId}/level/${level.levelId}`} className="w-full aspect-square">
                  <div className={`w-full h-full rounded-3xl border-2 flex flex-col items-center justify-center transition-all hover:scale-105 active:scale-95
                    ${isActive ? "bg-[#ff6600] border-[#ff6600] text-black shadow-[0_0_30px_rgba(255,102,0,0.3)]" : "bg-white/5 border-white/5 text-white"}
                  `}>
                    {isCompleted ? <CheckCircle2 size={32} className="text-green-500 mb-1" /> : <Play size={32} fill={isActive ? "black" : "white"} className="mb-1" />}
                    <span className={`text-[10px] font-black uppercase ${isActive ? "text-black/50" : "text-white/20"}`}>Lvl {levelIdNum}</span>
                  </div>
                </Link>
              )}
              <p className="mt-3 text-[9px] font-black uppercase text-center text-white/60">{level.title}</p>
            </div>
          );
        })}
      </div>
    </>
  );
}