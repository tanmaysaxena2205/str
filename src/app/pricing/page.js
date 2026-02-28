'use client';
import Link from 'next/link';
import { Check, Infinity, ShieldCheck, ArrowRight } from 'lucide-react';
import { useAuth, useUser } from "@clerk/nextjs"; 
import { upgradeUserRole } from "@/lib/actions/user.actions";

export default function PricingPage() {
  const { userId } = useAuth();
  const { user } = useUser();

  // POLAR HANDLER
const handlePolar = () => {
  if (!userId) return;

  // 1. Use your REAL Product ID here
  const productId = "2036d8ea-3685-4237-8b62-17eae052f8c0"; 
  
  // 2. Prepare metadata (keep this as is)
  const metadata = JSON.stringify({ userId: userId });
  
  // 3. IMPORTANT: Change 'checkoutId' to 'products' in the URL below
  const checkoutUrl = `/api/checkout?products=${productId}&metadata=${encodeURIComponent(metadata)}`;
  
  window.location.href = checkoutUrl;
};

  // RAZORPAY HANDLER
  const handleRazorpay = async () => {
    const scriptLoaded = await new Promise((resolve) => {
      const script = document.createElement("script");
      script.src = "https://checkout.razorpay.com/v1/checkout.js";
      script.onload = () => resolve(true);
      script.onerror = () => resolve(false);
      document.body.appendChild(script);
    });

    if (!scriptLoaded) {
      alert("Razorpay SDK failed to load.");
      return;
    }

    const options = {
      key: process.env.NEXT_PUBLIC_RAZORPAY_KEY_ID,
      amount: 35000, // ₹350 approx $4
      currency: "INR",
      name: "Langster",
      description: "Lifetime Premium Access",
      handler: async function (response) {
        try {
          if (userId) await upgradeUserRole(userId);
          window.location.href = "/dashboard?payment=success";
        } catch (error) {
          console.error("Upgrade failed:", error);
        }
      },
      prefill: { 
        name: user?.fullName || "Learner",
        email: user?.primaryEmailAddress?.emailAddress || "",
        contact: "918888888888" 
      },
      readonly: {
        contact: true,
        email: true,
        name: true
      },
      theme: { color: "#3395FF" },
    };

    const paymentObject = new window.Razorpay(options);
    paymentObject.open();
  };

  return (
    <main className="bg-[#050505] text-white min-h-[100dvh] flex items-center justify-center px-6 lg:px-20">
      <div className="max-w-7xl w-full grid grid-cols-1 lg:grid-cols-2 gap-16 items-center py-12">
       
        {/* --- LEFT SIDE: THE PITCH --- */}
        <div className="space-y-8 text-left">
          <div className="space-y-4">
            <h2 className="text-orange-500 font-black uppercase tracking-[0.3em] text-sm">Simple Pricing</h2>
            <h1 className="text-6xl md:text-8xl font-black uppercase tracking-tighter leading-[0.9]">
              UNLIMITED <br />
              <span className="text-white/20">LEARNING.</span>
            </h1>
            <p className="text-gray-400 text-xl md:text-2xl font-medium max-w-lg leading-relaxed">
              Unlock every lesson, unit, and feature we offer. No subscriptions, no monthly bills. Just a one-time path to mastery.
            </p>
          </div>
          <div className="flex flex-col gap-4">
             <div className="flex items-center gap-3 text-white/60">
                <Infinity className="text-orange-500" size={24} />
                <span className="font-bold uppercase tracking-wide text-sm">Lifetime updates included</span>
             </div>
             <div className="flex items-center gap-3 text-white/60">
                <ShieldCheck className="text-orange-500" size={24} />
                <span className="font-bold uppercase tracking-wide text-sm">Secure one-time checkout</span>
             </div>
          </div>
          <Link href="/" className="inline-flex items-center gap-2 text-white/20 hover:text-white transition-colors font-black uppercase tracking-widest text-xs">
            <ArrowRight className="rotate-180" size={16} /> Back to Home
          </Link>
        </div>

        {/* --- RIGHT SIDE: THE LARGE CARD --- */}
        <div className="relative w-full max-w-xl justify-self-center lg:justify-self-end">
          <div className="absolute -inset-2 bg-orange-500 rounded-[3.5rem] blur-2xl opacity-10"></div>
         
          <div className="relative bg-[#0a0a0a] border-2 border-white/5 rounded-[3.5rem] p-12 md:p-16 shadow-2xl">
            <div className="flex justify-between items-start mb-12">
              <div>
                <h3 className="text-3xl font-black uppercase tracking-tighter mb-2">Full Access</h3>
                <p className="text-gray-500 font-bold uppercase text-xs tracking-widest">Lifetime Membership</p>
              </div>
              <div className="bg-orange-500/10 text-orange-500 px-4 py-1 rounded-full text-xs font-black uppercase tracking-widest border border-orange-500/20">
                Best Value
              </div>
            </div>
            <div className="flex items-baseline gap-2 mb-12">
              <span className="text-9xl font-black text-white tracking-tighter">$4</span>
              <span className="text-gray-500 font-black uppercase text-xl italic">USD</span>
            </div>
            <div className="space-y-6 mb-12">
              <PriceFeature text="Complete German Curriculum" />
              <PriceFeature text="All 45 Specialty Units" />
              <PriceFeature text="Interactive Progress Tracking" />
              <PriceFeature text="Future Content Additions" />
            </div>

            {/* PAYMENT GATEWAYS */}
            <div className="flex flex-col gap-2">
             
              {/* 1. POLAR (REPLACED PAYPAL) */}
              <button
                onClick={handlePolar}
                className="w-full bg-white hover:bg-gray-100 h-[55px] rounded-lg flex items-center justify-center transition-all shadow-md active:scale-[0.98] px-4 group"
              >
                <div className="flex items-center gap-2 font-black text-black uppercase tracking-widest text-sm">
                  <span>Pay with Polar</span>
                  <ArrowRight size={18} className="group-hover:translate-x-1 transition-transform" />
                </div>
              </button>

              {/* SEPARATOR */}
              <div className="relative py-2">
                <div className="absolute inset-0 flex items-center">
                  <span className="w-full border-t border-white/5"></span>
                </div>
                <div className="relative flex justify-center">
                  <span className="bg-[#0a0a0a] px-4 text-[10px] font-black uppercase tracking-widest text-white/20 italic">
                    OR
                  </span>
                </div>
              </div>

              {/* 2. RAZORPAY */}
              <button
                onClick={handleRazorpay}
                className="w-full bg-[#3395FF] hover:bg-[#2a7ed9] h-[55px] rounded-lg flex items-center justify-center transition-all shadow-md active:scale-[0.98] px-4 mb-4"
              >
                <div className="flex items-center gap-2 font-bold italic text-white">
                  <span className="text-lg not-italic font-bold tracking-tight">Pay with</span>
                  <img
                    src="https://upload.wikimedia.org/wikipedia/commons/8/89/Razorpay_logo.svg"
                    alt="Razorpay"
                    className="h-5 w-auto brightness-0 invert"
                    loading="lazy"
                  />
                </div>
              </button>

              {/* SECURE CHECKOUT TEXT */}
              <div className="relative py-2">
                <div className="absolute inset-0 flex items-center">
                  <span className="w-full border-t border-white/5"></span>
                </div>
                <div className="relative flex justify-center">
                  <span className="bg-[#0a0a0a] px-3 text-[10px] font-black uppercase tracking-[0.3em] text-gray-500 italic">
                    Secure Checkout
                  </span>
                </div>
              </div>
            </div>
           
            <p className="text-center mt-6 text-[10px] text-white/20 font-black uppercase tracking-[0.3em]">
              Instant Activation • Lifetime Access
            </p>
          </div>
        </div>
      </div>
    </main>
  );
}

function PriceFeature({ text }) {
  return (
    <div className="flex items-center gap-4 text-left border-b border-white/5 pb-4">
      <div className="h-6 w-6 rounded-full bg-orange-500 flex items-center justify-center shrink-0">
        <Check size={16} className="text-black" strokeWidth={4} />
      </div>
      <span className="text-gray-300 font-bold text-lg">{text}</span>
    </div>
  );
}