// src/lib/utils/getUnlockedWords.js
import { SECTION_1_DATA } from "@/data/sections/section-1";

export function getUnlockedWords(userProgressStr) {
  // Use a regex to split by either "-" or ":" just in case
  const [currUnit, currLevel] = (userProgressStr || "1-0")
    .split(/[-:]/) 
    .map(Number);

  const allSections = [...SECTION_1_DATA]; 
  let unlockedIntros = [];

  allSections.forEach((unit) => {
    const unitId = Number(unit.unitId);

    if (unitId <= currUnit) {
      unit.levels.forEach((level) => {
        const levelId = Number(level.levelId);

        // Logic: Unlock if unit is strictly less, 
        // OR if it's the current unit and level is less than or equal
        const isPastUnit = unitId < currUnit;
        const isCurrentUnitCurrentLevel = (unitId === currUnit && levelId <= currLevel);

        if (isPastUnit || isCurrentUnitCurrentLevel) {
          const intros = level.questions
            .filter((q) => q.type === "intro")
            .map((intro) => ({
              ...intro,
              unitTitle: unit.unitTitle,
              displayId: `${unitId}-${levelId}`
            }));
          
          unlockedIntros.push(...intros);
        }
      });
    }
  });

  return unlockedIntros;
}