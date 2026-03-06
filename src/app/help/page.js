'use client'
import Link from 'next/link';
import { 
  Search, 
  BookOpen, 
  MessageCircle, 
  Zap, 
  ShieldCheck, 
  ChevronRight, 
  ArrowRight,
  LifeBuoy,
  FileText
} from 'lucide-react';

export default function HelpPage() {
  const categories = [
    {
      title: "Getting Started",
      description: "Learn the basics of Langster and how to start your first lesson.",
      icon: <Zap className="text-orange-500" size={24} />,
      links: ["Account Creation", "Choosing a Language", "Platform Overview"]
    },
    {
      title: "Payments & Billing",
      description: "Everything you need to know about your lifetime membership.",
      icon: <ShieldCheck className="text-orange-500" size={24} />,
      links: ["PayPal Support", "Razorpay Troubleshooting", "Refund Policy"]
    },
    {
      title: "Learning Content",
      description: "Details about our curriculum, levels, and specialty units.",
      icon: <BookOpen className="text-orange-500" size={24} />,
      links: ["Lesson Structure", "Progress Tracking", "Vocabulary Drills"]
    },
    {
      title: "Legal & Privacy",
      description: "How we handle your data and our commitment to your privacy.",
      icon: <FileText className="text-orange-500" size={24} />,
      links: ["Privacy Policy", "Data Deletion", "Cookie Usage"]
    }
  ];

  return (
    <main className="bg-[#050505] text-white min-h-screen">
      {/* --- HERO SECTION --- */}
      <section className="px-6 pt-32 pb-20 lg:px-20 border-b border-white/5 relative overflow-hidden">
        <div className="absolute top-0 right-0 -translate-y-1/2 translate-x-1/4 w-[600px] h-[600px] bg-orange-500/5 blur-[120px] rounded-full"></div>
        
        <div className="max-w-7xl mx-auto relative z-10">
          <Link href="/" prefetch={false} className="inline-flex items-center gap-2 text-white/20 hover:text-white transition-colors font-black uppercase tracking-widest text-xs mb-8">
            <ArrowRight className="rotate-180" size={16} /> Back to Dashboard
          </Link>
          
          <h1 className="text-6xl md:text-8xl font-black uppercase tracking-tighter leading-[0.9] mb-8">
            HOW CAN WE <br /> 
            <span className="text-white/20">HELP YOU?</span>
          </h1>

          {/* SEARCH BAR */}
          <div className="relative max-w-2xl group">
            <Search className="absolute left-6 top-1/2 -translate-y-1/2 text-white/20 group-focus-within:text-orange-500 transition-colors" size={24} />
            <input 
              type="text" 
              placeholder="Search for articles, guides, or payments..."
              className="w-full bg-[#0a0a0a] border-2 border-white/5 rounded-2xl py-6 pl-16 pr-6 text-xl focus:outline-none focus:border-orange-500/50 transition-all placeholder:text-white/10"
            />
          </div>
        </div>
      </section>

      {/* --- CATEGORY GRID --- */}
      <section className="px-6 py-20 lg:px-20 max-w-7xl mx-auto">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
          {categories.map((cat, i) => (
            <div key={i} className="group bg-[#0a0a0a] border border-white/5 p-8 rounded-[2.5rem] hover:border-orange-500/30 transition-all">
              <div className="mb-6 p-4 bg-white/5 w-fit rounded-2xl group-hover:bg-orange-500/10 transition-colors">
                {cat.icon}
              </div>
              <h3 className="text-2xl font-black uppercase tracking-tight mb-4">{cat.title}</h3>
              <p className="text-gray-500 font-medium mb-8 leading-relaxed text-sm">
                {cat.description}
              </p>
              <ul className="space-y-4">
                {cat.links.map((link, j) => (
                  <li key={j}>
                    <button className="flex items-center justify-between w-full text-white/40 hover:text-white font-bold uppercase text-[10px] tracking-widest group/link transition-colors">
                      {link}
                      <ChevronRight size={14} className="group-hover/link:translate-x-1 transition-transform" />
                    </button>
                  </li>
                ))}
              </ul>
            </div>
          ))}
        </div>
      </section>

      {/* --- PRIVACY POLICY SECTION --- */}
      <section className="px-6 py-20 lg:px-20 max-w-4xl mx-auto border-t border-white/5">
        <div className="mb-16">
          <h2 className="text-sm font-black text-orange-500 uppercase tracking-[0.4em] mb-4">Legal Documentation</h2>
          <h3 className="text-4xl md:text-5xl font-black uppercase italic tracking-tighter mb-4">Privacy Policy</h3>
          <p className="text-white/30 font-bold uppercase tracking-widest text-xs">Last updated: 3/3/2026</p>
        </div>

        <div className="space-y-12">
          <PolicyBlock title="1. Data We Collect">
            To provide our service, we collect the minimum amount of data necessary:
            <ul className="mt-4 space-y-2 text-white/80">
              <li><strong className="text-orange-500">Consumer ID:</strong> An anonymous identifier to track your learning progress.</li>
              <li><strong className="text-orange-500">Learning Progress:</strong> Your quiz scores, completed exercises, and level status.</li>
              <li><strong className="text-orange-500">Email Address:</strong> Only if you choose to sign in with Google to sync your progress across devices.</li>
            </ul>
          </PolicyBlock>

          <PolicyBlock title="2. Purpose of Collection">
            We collect this data solely to provide and improve the Langey learning experience. Specifically, it allows us to save your progress, personalize your exercises, and sync your data if you choose to log in.
          </PolicyBlock>

          <PolicyBlock title="3. Legal Basis">
            We process your data based on:
            <ul className="mt-4 space-y-2 text-white/80">
              <li><strong className="text-orange-500 text-xs uppercase tracking-widest block mb-1">Legitimate Interest</strong> For anonymous usage and progress tracking.</li>
              <li><strong className="text-orange-500 text-xs uppercase tracking-widest block mb-1">Contract</strong> When you create an account/login, to fulfill our service of syncing your data.</li>
            </ul>
          </PolicyBlock>

          <PolicyBlock title="4. Data Storage">
            Your data is securely stored in Supabase database services.
          </PolicyBlock>

          <PolicyBlock title="5. Cookies and Local Storage">
            <strong className="text-white block mb-2 underline decoration-orange-500/50 underline-offset-4">Strictly Necessary Storage</strong> 
            We use local storage and a strictly necessary cookie to maintain your session and save your learning progress. This is required for the application to function correctly. We do <strong className="text-orange-500 italic">not</strong> use cookies for third-party analytics, tracking, or advertising.
          </PolicyBlock>

          <PolicyBlock title="6. Your Rights & Data Deletion">
            You have the right to request access to or deletion of your data at any time. To request data deletion, please contact us at: <span className="text-orange-500">langeyapp@gmail.com</span>
          </PolicyBlock>

          <PolicyBlock title="7. Contact Us">
            If you have any questions about this Privacy Policy, please contact us at: <span className="text-orange-500 font-bold underline decoration-white/10">langeyapp@gmail.com</span>
          </PolicyBlock>
        </div>
      </section>

      {/* --- POPULAR QUESTIONS (FAQ) --- */}
      <section className="px-6 py-20 lg:px-20 max-w-7xl mx-auto border-t border-white/5">
        <h2 className="text-sm font-black text-orange-500 uppercase tracking-[0.4em] mb-12">Common Questions</h2>
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-x-20 gap-y-12">
          <FAQItem 
            question="Is the lifetime access really one-time?" 
            answer="Yes. One payment of $2 gives you access to all current and future lessons. No subscriptions, ever." 
          />
          <FAQItem 
            question="I paid via Razorpay but my account isn't premium." 
            answer="Don't worry. Sometimes it takes 1-2 minutes for the payment gateway to ping our server. Try refreshing your dashboard." 
          />
          <FAQItem 
            question="Can I learn multiple languages?" 
            answer="Currently, Langstr specializes in an intensive German curriculum, with more languages coming in late 2026." 
          />
          <FAQItem 
            question="How do I request a refund?" 
            answer="Since we offer instant digital access, refunds are handled case-by-case within 7 days of purchase." 
          />
        </div>
      </section>

      {/* --- CONTACT CTA --- */}
      <section className="px-6 py-32 lg:px-20 text-center">
        <div className="relative inline-block">
          <div className="absolute -inset-4 bg-orange-500 blur-3xl opacity-10 rounded-full"></div>
          <div className="relative bg-[#0a0a0a] border border-white/10 px-12 py-16 rounded-[3.5rem] max-w-3xl mx-auto">
            <LifeBuoy className="mx-auto text-orange-500 mb-6" size={48} />
            <h2 className="text-4xl font-black uppercase tracking-tight mb-4 text-white">Still stuck?</h2>
            <p className="text-gray-400 font-medium text-lg mb-8">
              Our support team usually responds within 2 hours.
            </p>
            <button className="bg-white text-black font-black uppercase tracking-widest px-10 py-5 rounded-full hover:bg-orange-500 transition-colors inline-flex items-center gap-3 group">
              <MessageCircle size={20} />
              Chat with Support
            </button>
          </div>
        </div>
      </section>

      {/* FOOTER MINI */}
      <footer className="py-12 border-t border-white/5 text-center">
        <p className="text-[10px] text-white/10 font-black uppercase tracking-[0.5em]">
          Langster Support • Dedicated to your progress
        </p>
      </footer>
    </main>
  );
}

function PolicyBlock({ title, children }) {
  return (
    <div className="group">
      <h4 className="text-xl font-black uppercase tracking-tight text-white mb-4 group-hover:text-orange-500 transition-colors">{title}</h4>
      <div className="text-gray-400 font-medium leading-relaxed max-w-3xl">
        {children}
      </div>
    </div>
  );
}

function FAQItem({ question, answer }) {
  return (
    <div className="space-y-3">
      <h4 className="text-xl font-black uppercase tracking-tight text-white/90 italic">{question}</h4>
      <p className="text-gray-500 font-medium leading-relaxed max-w-xl">
        {answer}
      </p>
    </div>
  );
}