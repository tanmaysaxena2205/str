// src/lib/utils/checkAccess.js
export function canAccessNextLevel(user) {
  // 1. Premium users always have access
  if (user.isPremium) return { allowed: true };

  // 2. If they haven't completed a level yet, allow access
  if (!user.lastLevelCompletedAt) return { allowed: true };

  const lastDate = new Date(user.lastLevelCompletedAt).toDateString();
  const today = new Date().toDateString();

  // 3. If the last completion was today, block access
  if (lastDate === today) {
    return { 
      allowed: false, 
      message: "Free tier limit reached. Come back tomorrow or Go Premium for unlimited access!" 
    };
  }

  return { allowed: true };
}