// components/LanguageSwitcher.jsx
"use client";
import { useUser } from "@clerk/nextjs";
import { setUserLanguage } from "@/lib/actions/user.actions";

export default function LanguageSwitcher() {
  const { user, isLoaded } = useUser();
  
  // Get current language from Clerk Metadata, default to 'en'
  const currentLang = user?.publicMetadata?.language || "en";

  const handleLanguageChange = async (newLang) => {
    if (!user) return;
    await setUserLanguage(user.id, newLang);
    // Optional: Force a refresh to trigger translation changes
    window.location.reload();
  };

  if (!isLoaded) return null;

  return (
    <div className="flex gap-4 p-4 bg-white/5 rounded-2xl border border-white/10">
      <button
        onClick={() => handleLanguageChange("en")}
        className={`px-4 py-2 rounded-lg font-bold transition ${
          currentLang === "en" ? "bg-[#ff6600] text-black" : "hover:bg-white/5"
        }`}
      >
        English
      </button>
      <button
        onClick={() => handleLanguageChange("de")}
        className={`px-4 py-2 rounded-lg font-bold transition ${
          currentLang === "de" ? "bg-[#ff6600] text-black" : "hover:bg-white/5"
        }`}
      >
        Deutsch
      </button>
    </div>
  );
}