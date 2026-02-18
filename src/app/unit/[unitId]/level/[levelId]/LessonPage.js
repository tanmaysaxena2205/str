"use client";

import React, { useState, useMemo } from "react";
import { useRouter, useParams } from "next/navigation";
import Link from "next/link";
import { X, Volume2, CheckCircle2, AlertCircle, Trophy } from "lucide-react";
import { SECTION_1_DATA } from "@/data/sections/section-1";
import { completeSublevel } from "@/lib/actions/user.actions";

export default function LessonPage({ user }) {
  const router = useRouter();
  const { unitId, levelId } = useParams();

  const [currentIdx, setCurrentIdx] = useState(0);
  const [selected, setSelected] = useState(null);
  // jumbledOrder now stores objects: { word: string, id: number }
  const [jumbledOrder, setJumbledOrder] = useState([]);
  const [status, setStatus] = useState("idle"); 
  const [finished, setFinished] = useState(false);
  const [isSaving, setIsSaving] = useState(false);

  const isLocked = useMemo(() => {
    if (user?.role !== 'free' || !user?.lastLevelCompletedAt) return false;
    const lastDate = new Date(user.lastLevelCompletedAt).toDateString();
    const today = new Date().toDateString();
    return lastDate === today;
  }, [user]);

  if (isLocked) {
    return (
      <main className="fixed inset-0 bg-[#050505] flex items-center justify-center p-6 text-center z-50">
        <div className="bg-[#0a0a0a] border border-[#ff6600]/30 p-10 rounded-[3rem] max-w-sm">
          <h2 className="text-4xl font-black italic uppercase text-[#ff6600] mb-4">LIMIT REACHED</h2>
          <p className="text-white/40 font-bold mb-8 uppercase text-xs tracking-widest leading-relaxed">
            FREE TIER ALLOWS 1 LEVEL PER DAY.<br/>COME BACK TOMORROW!
          </p>
          <Link href="/dashboard">
            <button className="bg-[#ff6600] text-black w-full py-4 rounded-2xl font-black uppercase italic">
              Back to Dashboard
            </button>
          </Link>
        </div>
      </main>
    );
  }

  const unit = SECTION_1_DATA.find((u) => u.unitId === unitId);
  const levelData = unit?.levels.find((l) => l.levelId === levelId);
  const questions = levelData?.questions || [];
  const current = questions[currentIdx];

  const speakGerman = (text) => {
    if (typeof window !== "undefined" && window.speechSynthesis) {
      window.speechSynthesis.cancel();
      const utterance = new SpeechSynthesisUtterance(text);
      utterance.lang = "de-DE";
      utterance.rate = 0.9;
      window.speechSynthesis.speak(utterance);
    }
  };

  const handleCheck = () => {
    if (!current) return;
    if (current.type === "intro") {
      setStatus("correct");
      return;
    }
    let isCorrect = false;
    if (current.type === "choice" || current.type === "boss") {
      isCorrect = selected === current.a;
    } else if (current.type === "jumble") {
      // Extract just the words for the comparison
      const attemptSentence = jumbledOrder.map(item => item.word).join(" ");
      const attemptSpelling = jumbledOrder.map(item => item.word).join("");
      isCorrect = attemptSentence === current.a || attemptSpelling === current.a;
    }
    if (isCorrect) {
      setStatus("correct");
      speakGerman(current.a || current.word);
    } else {
      setStatus("wrong");
    }
  };

  const handleNext = () => {
    if (currentIdx < questions.length - 1) {
      setCurrentIdx(prev => prev + 1);
      setSelected(null);
      setJumbledOrder([]);
      setStatus("idle");
    } else {
      setFinished(true);
    }
  };

  if (finished) {
    return (
      <div className="fixed inset-0 bg-black flex flex-col items-center justify-center text-white p-6 text-center z-50">
        <Trophy size={80} className="text-[#ff6600] mb-6 animate-bounce" />
        <h1 className="text-5xl font-black italic uppercase mb-2">COMPLETE</h1>
        <p className="text-white/40 mb-10 font-bold tracking-widest">LEVEL {unitId}-{levelId} MASTERED</p>
        <button 
          disabled={isSaving}
          onClick={async () => {
            const clerkId = user?.clerkId;
            if (!clerkId) return;
            setIsSaving(true);
            try {
                await completeSublevel(clerkId, `${unitId}-${levelId}`);
                window.location.href = "/dashboard";
            } catch (err) {
                setIsSaving(false);
            }
          }} 
          className="bg-[#ff6600] text-black px-20 py-5 rounded-3xl font-black text-2xl active:scale-95 transition-transform"
        >
          {isSaving ? "SAVING..." : "CONTINUE"}
        </button>
      </div>
    );
  }

  if (!current) return null;

  return (
    <div className="fixed inset-0 flex flex-col bg-[#0a0a0a] text-white overflow-hidden touch-none">
      
      {/* HEADER */}
      <div className="shrink-0 flex items-center gap-6 px-6 h-20 w-full max-w-5xl mx-auto z-10">
        <button onClick={() => router.push("/dashboard")} className="hover:opacity-70 transition-opacity">
          <X size={28} />
        </button>
        <div className="flex-1 h-3 bg-white/10 rounded-full overflow-hidden border border-white/5">
          <div 
            className="h-full bg-[#ff6600] transition-all duration-500 shadow-[0_0_15px_rgba(255,102,0,0.5)]" 
            style={{ width: `${((currentIdx + 1) / questions.length) * 100}%` }} 
          />
        </div>
        <span className="font-black italic text-[#ff6600] text-lg tabular-nums">
          {currentIdx + 1}/{questions.length}
        </span>
      </div>

      {/* MAIN CONTENT AREA */}
      <div className="flex-1 w-full max-w-3xl mx-auto flex flex-col items-center justify-center px-6 overflow-hidden">
        
        {current.type === "boss" && (
          <div className="w-full flex flex-col">
            <div className="flex justify-center mb-4">
              <span className="bg-red-600/20 text-red-500 border border-red-500/50 px-4 py-1 rounded-full font-black uppercase italic tracking-tighter text-xs animate-pulse">
                Final Challenge
              </span>
            </div>
            <h1 className="text-4xl font-black italic text-center mb-10 uppercase tracking-tighter leading-tight">
              {current.q}
            </h1>
            <div className="grid grid-cols-1 gap-3 w-full">
              {current.options.map((opt) => (
                <button 
                  key={opt} 
                  disabled={status !== "idle"} 
                  onClick={() => { setSelected(opt); speakGerman(opt); }}
                  className={`p-6 text-2xl font-black uppercase border-2 rounded-2xl transition-all active:scale-[0.98] ${
                    selected === opt 
                      ? "border-[#ff6600] bg-[#ff6600] text-black shadow-[0_0_20px_rgba(255,102,0,0.3)]" 
                      : "border-white/5 bg-white/5 hover:bg-white/10"
                  }`}
                >
                  {opt}
                </button>
              ))}
            </div>
          </div>
        )}

        {current.type === "intro" && (
          <div className="w-full flex flex-col items-center">
            <div className="bg-white/5 p-12 rounded-[3.5rem] border-2 border-white/10 w-full text-center shadow-2xl">
              <Volume2 
                size={72} 
                className="text-[#ff6600] mb-8 cursor-pointer mx-auto hover:scale-110 transition-transform" 
                onClick={() => speakGerman(current.word)} 
              />
              <h1 className="text-7xl font-black italic uppercase mb-2 tracking-tighter">
                {current.word}
              </h1>
              <p className="text-3xl text-white/30 font-bold uppercase tracking-[0.2em] mb-10">
                {current.translation}
              </p>
              <div className="bg-[#ff6600]/10 p-6 rounded-2xl border border-[#ff6600]/20 max-w-md mx-auto">
                <p className="text-2xl text-[#ff6600] font-black italic leading-tight">
                  {current.content}
                </p>
              </div>
            </div>
          </div>
        )}

        {current.type === "choice" && (
          <div className="w-full flex flex-col">
            <h1 className="text-4xl font-black italic text-center mb-10 uppercase tracking-tighter leading-tight">
              {current.q}
            </h1>
            <div className="grid gap-4 w-full max-w-xl mx-auto">
              {current.options.map((opt) => (
                <button 
                  key={opt} 
                  disabled={status !== "idle"} 
                  onClick={() => { setSelected(opt); speakGerman(opt); }}
                  className={`flex items-center justify-between p-6 text-2xl font-black uppercase border-2 rounded-2xl transition-all active:scale-[0.98] ${
                    selected === opt 
                      ? "border-[#ff6600] bg-[#ff6600] text-black shadow-[0_0_20px_rgba(255,102,0,0.3)]" 
                      : "border-white/5 bg-white/5 hover:bg-white/10"
                  }`}
                >
                  <span>{opt}</span>
                  <Volume2 size={28} className={selected === opt ? "text-black" : "text-white/20"} />
                </button>
              ))}
            </div>
          </div>
        )}

        {current.type === "jumble" && (
          <div className="w-full flex flex-col items-center gap-8">
            <h1 className="text-4xl font-black italic text-center uppercase tracking-tighter leading-tight">
              {current.q}
            </h1>
            
            {/* TARGET AREA - Words already picked */}
            <div className={`min-h-[140px] w-full border-2 flex flex-wrap gap-3 justify-center items-center p-8 bg-white/[0.03] rounded-[2.5rem] transition-all ${
              status === 'wrong' ? 'border-red-500/50' : 'border-white/10'
            }`}>
              {jumbledOrder.map((item, i) => (
                <button 
                  key={`${item.id}-${i}`} 
                  onClick={() => setJumbledOrder(prev => prev.filter((_, idx) => idx !== i))} 
                  className="bg-[#ff6600] text-black px-6 py-3 rounded-xl font-black text-xl shadow-lg active:scale-90"
                >
                  {item.word}
                </button>
              ))}
            </div>

            {/* OPTIONS AREA - Available words */}
            <div className="flex flex-wrap gap-3 justify-center">
              {current.options.map((word, i) => {
                // Check if this specific index is already in the jumbledOrder
                const isUsed = jumbledOrder.some(item => item.id === i);
                
                return (
                  <button 
                    key={i} 
                    disabled={status !== "idle" || isUsed} 
                    onClick={() => { 
                      setJumbledOrder(prev => [...prev, { word, id: i }]); 
                      speakGerman(word); 
                    }}
                    className={`px-7 py-4 border-2 rounded-xl font-black text-lg transition-all ${
                      isUsed 
                        ? "opacity-0 pointer-events-none" 
                        : "border-white/10 bg-white/5 hover:border-[#ff6600] active:scale-90"
                    }`}
                  >
                    {word}
                  </button>
                );
              })}
            </div>
          </div>
        )}
      </div>

      {/* FOOTER */}
      <div className={`shrink-0 h-28 flex items-center px-6 transition-all duration-300 border-t-2 ${
        status === 'correct' ? 'bg-green-600 border-green-400' : 
        status === 'wrong' ? 'bg-red-600 border-red-400' : 'bg-[#0f0f0f] border-white/5'
      }`}>
        <div className="max-w-4xl mx-auto w-full flex justify-between items-center">
          <div className="flex items-center gap-4">
            {status !== 'idle' && (
              <div className="bg-white p-2.5 rounded-full text-black">
                {status === 'correct' ? <CheckCircle2 size={32} /> : <AlertCircle size={32} />}
              </div>
            )}
            <div className="flex flex-col">
              <p className="font-black text-2xl uppercase italic leading-none">
                {status === 'idle' ? "GO FOR IT!" : status === 'correct' ? "PERFECT!" : "NOT QUITE"}
              </p>
              {status === 'wrong' && (
                <p className="text-white/90 font-bold text-sm uppercase tracking-widest mt-1">
                  Correct: {current.a}
                </p>
              )}
            </div>
          </div>
          <button
            onClick={status === "idle" ? handleCheck : handleNext}
            disabled={status === "idle" && (
              ((current.type === "choice" || current.type === "boss") && !selected) || 
              (current.type === "jumble" && jumbledOrder.length === 0)
            )}
            className="bg-white text-black px-12 py-4 rounded-2xl font-black text-xl uppercase transition-all active:scale-95 disabled:opacity-20 shadow-xl"
          >
            {status === "idle" ? "Check" : "Next"}
          </button>
        </div>
      </div>
    </div>
  );
}