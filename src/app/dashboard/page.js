export const dynamic = "force-dynamic";
export const revalidate = 0;

import React from "react";
import { auth } from "@clerk/nextjs/server";
import { getUserById } from "@/lib/actions/user.actions";
import { Star } from "lucide-react";
import { SCROLL_DATA } from "@/data/scroll-data";
import LevelButton from "@/components/LevelButton";

export default async function DashboardPage() {
  const { userId } = await auth();
  const user = await getUserById(userId);

  const progress = user?.currentProgress || "1-1-1";
  const [activeSec, activeUnit, activeLevel] = progress.split("-").map(Number);

  const isFreeUser = user?.role === "free";
  const hasCompletedLevelToday =
    user?.lastLevelCompletedAt &&
    new Date(user.lastLevelCompletedAt).toDateString() === new Date().toDateString();

  const isDailyLimitReached = isFreeUser && hasCompletedLevelToday;

  return (
    <div className="min-h-screen bg-[#0a0a0a] text-white font-sans pb-20 overflow-x-hidden">
      
      {/* HEADER - FIXED Z-INDEX AND OPACITY */}
      <header className="sticky top-0 z-[100] w-full bg-[#0a0a0a]/95 backdrop-blur-md border-b border-white/5 p-4 md:p-6">
        <div className="max-w-5xl mx-auto flex justify-between items-center">
          <h1 className="text-xl md:text-3xl font-black italic tracking-tighter text-[#ff6600]">
            LANGSTER
          </h1>
          <div className="flex gap-2 md:gap-4 items-center">
            {isFreeUser && (
              <span className="bg-orange-500/10 text-[#ff6600] px-2 py-0.5 rounded-md text-[8px] md:text-[10px] font-black uppercase border border-orange-500/20">
                Free
              </span>
            )}
            <div className="bg-white/5 px-3 py-1.5 md:px-4 md:py-2 rounded-full border border-white/10 flex items-center gap-2">
              <Star size={14} className="text-yellow-400 fill-yellow-400 md:size-[18px]" />
              <span className="font-black text-xs md:text-base">{user?.xp || 0} XP</span>
            </div>
          </div>
        </div>
      </header>

      {/* CONTENT AREA - Lower Z-Index */}
      <main className="relative z-10 max-w-5xl mx-auto px-4 md:px-6 mt-8 md:mt-16">
        {SCROLL_DATA.map((section) => {
          const sectionIdNum = Number(section.sectionId);

          return (
            <section key={section.sectionId} className="mb-16 md:mb-32">
              <div className="mb-8 md:mb-14">
                <h2 className="text-3xl sm:text-4xl md:text-6xl font-black uppercase italic tracking-tighter leading-none mb-3">
                  {section.sectionTitle}
                </h2>
                <div className="h-1.5 md:h-2 w-20 md:w-32 bg-[#ff6600] rounded-full shadow-[0_0_15px_rgba(255,102,0,0.5)]" />
              </div>

              <div className="flex flex-col gap-8 md:gap-16">
                {section.units.map((unit) => {
                  const unitIdNum = Number(unit.unitId);

                  return (
                    <div
                      key={unit.unitId}
                      className="bg-white/[0.03] border border-white/5 md:border-2 rounded-[2rem] md:rounded-[3rem] p-6 md:p-12"
                    >
                      <div className="mb-8 md:mb-12">
                        <p className="text-[#ff6600] font-black uppercase tracking-[0.2em] text-[10px] md:text-xs mb-2">
                          Unit {unit.unitId}
                        </p>
                        <h3 className="text-2xl md:text-4xl font-black uppercase italic leading-none">
                          {unit.unitTitle}
                        </h3>
                      </div>

                      <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-5 gap-6 md:gap-10">
                        {unit.levels.map((level, idx) => {
                          const levelIdNum = Number(level.levelId);
                          const isUnlockedByProgress = sectionIdNum < activeSec || (sectionIdNum === activeSec && (unitIdNum < activeUnit || (unitIdNum === activeUnit && levelIdNum <= activeLevel)));
                          const isCompleted = sectionIdNum < activeSec || (sectionIdNum === activeSec && (unitIdNum < activeUnit || (unitIdNum === activeUnit && levelIdNum < activeLevel)));
                          const isActive = sectionIdNum === activeSec && unitIdNum === activeUnit && levelIdNum === activeLevel;
                          const showTimeLock = isActive && isDailyLimitReached;

                          return (
                            <div key={level.levelId} className="flex flex-col items-center">
                              <LevelButton
                                level={level}
                                idx={idx}
                                isUnlockedByProgress={isUnlockedByProgress}
                                showTimeLock={showTimeLock}
                                isActive={isActive}
                                isCompleted={isCompleted}
                                unitId={unit.unitId}
                                levelIdNum={levelIdNum}
                              />
                              
                              <p className={`mt-3 text-[9px] md:text-[11px] font-black uppercase text-center tracking-tighter leading-tight max-w-[90px] md:max-w-[110px]
                                ${!isUnlockedByProgress || showTimeLock ? "text-white/10" : "text-white/60"}
                              `}>
                                {level.title}
                              </p>
                            </div>
                          );
                        })}
                      </div>
                    </div>
                  );
                })}
              </div>
            </section>
          );
        })}
      </main>
    </div>
  );
}