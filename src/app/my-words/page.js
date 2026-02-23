// src/app/my-words/page.js
import { auth } from "@clerk/nextjs/server";
import { connectToDatabase } from "@/lib/mongodb/mongoose";
import User from "@/lib/models/user.model";
import { getUnlockedWords } from "@/lib/utils/getUnlockedWords";
import { redirect } from "next/navigation";



export default async function MyWordsPage() {
  // 1. Authenticate (Wait time, zero active CPU risk)
  const { userId } = await auth(); 
  if (!userId) redirect("/sign-in");
  
  await connectToDatabase();
  
  // 2. Fetch only what is needed. 
  // .lean() ensures we get a plain JS object which is faster to read.
  const user = await User.findOne({ clerkId: userId })
    .select("currentProgress") 
    .lean();
  
  // 3. Extract the string (Identical value to your original code)
  const progressString = user?.currentProgress || "1-0";
  
  // 4. Transform data (Active CPU work)
  const words = getUnlockedWords(progressString);

  return (
    <main className="min-h-screen bg-[#050505] text-white p-8 lg:p-20">
      <div className="max-w-6xl mx-auto">
        <header className="mb-12">
          <h1 className="text-6xl font-black uppercase tracking-tighter">
            MY <span className="text-orange-500">WORDS</span>
          </h1>
          <p className="text-white/30 font-bold mt-2 uppercase tracking-widest text-xs">
            {/* The string replacement works exactly as before */}
            Progress: Unit {progressString.replace('-', ' • Level ')}
          </p>
        </header>

        {words.length > 0 ? (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {words.map((item, index) => (
              <div 
                key={`${item.displayId}-${index}`} 
                className="bg-[#0a0a0a] border border-white/5 p-8 rounded-[2rem] hover:border-orange-500/50 transition-all group relative overflow-hidden"
              >
                <div className="absolute -right-2 -top-2 text-6xl font-black text-white/[0.02] group-hover:text-orange-500/10 transition-colors">
                  {item.displayId}
                </div>

                <span className="text-[10px] text-orange-500 font-black uppercase tracking-[0.2em] mb-4 block">
                  {item.unitTitle}
                </span>

                <h2 className="text-3xl font-bold mb-1 group-hover:text-orange-500 transition-colors">
                  {item.word || item.title}
                </h2>
                
                <p className="text-white/40 italic text-sm mb-6">
                  {item.translation || "Grammar Focus"}
                </p>

                <div className="pt-6 border-t border-white/5">
                  <p className="text-sm text-gray-400 leading-relaxed italic">
                    "{item.content}"
                  </p>
                </div>
              </div>
            ))}
          </div>
        ) : (
          <div className="py-20 text-center bg-white/5 rounded-[3rem] border-2 border-dashed border-white/5">
            <p className="text-white/20 font-black uppercase tracking-widest">
              Unlock your first words in Unit 1-1
            </p>
          </div>
        )}
      </div>
    </main>
  );
}