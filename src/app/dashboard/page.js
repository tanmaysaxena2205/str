import React, { Suspense } from "react";
import { auth } from "@clerk/nextjs/server";
import { getUserById } from "@/lib/actions/user.actions";
import { SCROLL_DATA } from "@/data/scroll-data";
import LevelButton from "@/components/LevelButton";
import { redirect } from "next/navigation";

export default async function DashboardPage() {
  const { userId } = await auth();
  if (!userId) redirect("/sign-in");

 
  const user = await getUserById(userId);
  if (!user) redirect("/onboarding");
          
  return ( 
    <div className="min-h-screen bg-[#0a0a0a] text-white font-sans pb-20 overflow-x-hidden">
      <main className="relative z-10 max-w-5xl mx-auto px-4 md:px-6 mt-8 md:mt-16">
        <CurriculumList user={user} />
      </main>
    </div>
  );
}

function CurriculumList({ user }) {
  // --- CPU SAVER 1: Pre-calculate constants once ---
  const progress = user?.currentProgress || "1-1-1";
  const [activeSec, activeUnit, activeLevel] = progress.split("-").map(Number);
  const isFreeUser = user?.role === "free";
  
  const today = new Date().toDateString();
  const isDailyLimitReached = isFreeUser && user?.lastLevelCompletedAt && 
  new Date(user.lastLevelCompletedAt).toDateString() === today;
  return (
    <>
      {SCROLL_DATA.map((section) => {
        const sectionIdNum = Number(section.sectionId);
        const isPastSection = sectionIdNum < activeSec;
        const isCurrentSection = sectionIdNum === activeSec;

        return (
          <section key={`section-${section.sectionId}`} className="mb-16 md:mb-32">
            <div className="mb-8 md:mb-14">
              <h2 className="text-3xl sm:text-4xl md:text-6xl font-black uppercase italic tracking-tighter leading-none mb-3">
                {section.sectionTitle}
              </h2>
              <div className="h-1.5 md:h-2 w-20 md:w-32 bg-[#ff6600] rounded-full shadow-[0_0_15px_rgba(255,102,0,0.5)]" />
            </div>

            <div className="flex flex-col gap-8 md:gap-16">
              {section.units.map((unit) => {
                const unitIdNum = Number(unit.unitId);
                // --- CPU SAVER 2: Pre-calculate unit status ---
                const isPastUnit = isPastSection || (isCurrentSection && unitIdNum < activeUnit);
                const isCurrentUnit = isCurrentSection && unitIdNum === activeUnit;

                return (
                  <div key={`unit-${unit.unitId}`} className="bg-white/[0.03] border border-white/5 md:border-2 rounded-[2rem] md:rounded-[3rem] p-6 md:p-12">
                    <div className="mb-8 md:mb-12">
                      <p className="text-[#ff6600] font-black uppercase tracking-[0.2em] text-[10px] md:text-xs mb-2">Unit {unit.unitId}</p>
                      <h3 className="text-2xl md:text-4xl font-black uppercase italic leading-none">{unit.unitTitle}</h3>
                    </div>

                    <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-5 gap-6 md:gap-10">
                      {unit.levels.map((level, idx) => {
                        const levelIdNum = Number(level.levelId);
                        
                        // --- CPU SAVER 3: Simplified logic ---
                        const isUnlockedByProgress = isPastUnit || (isCurrentUnit && levelIdNum <= activeLevel);
                        const isCompleted = isPastUnit || (isCurrentUnit && levelIdNum < activeLevel);
                        const isActive = isCurrentUnit && levelIdNum === activeLevel;
                        const showTimeLock = isActive && isDailyLimitReached;

                        return (
                          <div key={`level-${level.levelId}`} className="flex flex-col items-center">
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
                              ${!isUnlockedByProgress || showTimeLock ? "text-white/10" : "text-white/60"}`}>
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
    </>
  );
}