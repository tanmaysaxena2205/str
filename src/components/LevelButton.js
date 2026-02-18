"use client";

import React, { useState } from "react";
import Link from "next/link";
import { Lock, Play, CheckCircle2, X, AlertTriangle } from "lucide-react";

export default function LevelButton({ 
  level, 
  idx, 
  isUnlockedByProgress, 
  showTimeLock, 
  isActive, 
  isCompleted, 
  unitId, 
  levelIdNum 
}) {
  const [showModal, setShowModal] = useState(false);

  // If level is locked because of progress (not reached yet)
  if (!isUnlockedByProgress) {
    return (
      <div className="w-full aspect-square rounded-3xl border-2 border-white/5 bg-white/[0.02] flex flex-col items-center justify-center opacity-20 cursor-not-allowed">
        <Lock size={24} className="mb-2" />
        <span className="text-[10px] font-black">{idx + 1}</span>
      </div>
    );
  }

  // If level is unlocked but blocked by daily limit
  if (showTimeLock) {
    return (
      <>
        <button 
          onClick={() => setShowModal(true)}
          className="w-full aspect-square rounded-3xl border-2 border-orange-500/30 bg-orange-500/5 flex flex-col items-center justify-center transition-all hover:bg-orange-500/10 group"
        >
          <Lock size={32} className="text-[#ff6600] mb-1 group-hover:scale-110 transition-transform" />
          <span className="text-[10px] font-black uppercase text-[#ff6600]/50">Lvl {levelIdNum}</span>
        </button>

        {/* LIMIT MESSAGE CARD */}
        {showModal && (
          <div className="fixed inset-0 z-[100] flex items-center justify-center p-6 bg-black/80 backdrop-blur-sm animate-in fade-in duration-200">
            <div className="bg-[#111] border border-orange-500/40 p-10 rounded-[2.5rem] max-w-sm w-full text-center shadow-2xl relative animate-in zoom-in duration-300">
              <button onClick={() => setShowModal(false)} className="absolute top-6 right-6 text-white/20 hover:text-white">
                <X size={24} />
              </button>
              <div className="bg-orange-500/20 w-16 h-16 rounded-2xl flex items-center justify-center mx-auto mb-6">
                <AlertTriangle className="text-orange-500" size={32} />
              </div>
              <h2 className="text-3xl font-black italic uppercase text-white mb-2 leading-none">Daily Limit Reached</h2>
              <p className="text-white/40 font-bold uppercase tracking-widest text-[10px] mb-8">
                The free plan allows 1 level every 24 hours. Come back tomorrow for your next lesson!
              </p>
              <button 
                onClick={() => setShowModal(false)}
                className="w-full bg-[#ff6600] text-black py-4 rounded-xl font-black uppercase italic hover:brightness-110 transition-all"
              >
                Got it
              </button>
            </div>
          </div>
        )}
      </>
    );
  }

  // Normal Unlocked Level
  return (
    <Link href={`/unit/${unitId}/level/${level.levelId}`} className="w-full aspect-square">
      <div className={`w-full h-full rounded-3xl border-2 flex flex-col items-center justify-center transition-all hover:scale-105 active:scale-95 group
        ${isActive 
          ? "bg-[#ff6600] border-[#ff6600] shadow-[0_0_30px_rgba(255,102,0,0.3)] text-black" 
          : "bg-white/5 border-white/5 hover:border-white/20 text-white"}
      `}>
        {isCompleted ? (
          <CheckCircle2 size={32} className="text-green-500 mb-1" />
        ) : (
          <Play size={32} fill={isActive ? "black" : "white"} className="mb-1" />
        )}
        <span className={`text-[10px] font-black uppercase ${isActive ? "text-black/50" : "text-white/20"}`}>
          Lvl {levelIdNum}
        </span>
      </div>
    </Link>
  );
}