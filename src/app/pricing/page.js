'use client'
import Link from 'next/link';
import { Check, Infinity, ShieldCheck, ArrowRight } from 'lucide-react';
import { PayPalButtons, PayPalScriptProvider } from "@paypal/react-paypal-js";
import { useAuth } from "@clerk/nextjs"; // <--- ADD THIS IMPORT

export default function PricingPage() {
  const { userId } = useAuth(); // <--- ADD THIS LINE to get the actual ID

  return (
    <main className="bg-[#050505] text-white min-h-[100dvh] flex items-center justify-center px-6 lg:px-20">
      <div className="max-w-7xl w-full grid grid-cols-1 lg:grid-cols-2 gap-16 items-center">
        
        {/* --- LEFT SIDE: THE PITCH --- */}
        <div className="space-y-8 text-left">
          <div className="space-y-4">
            <h2 className="text-orange-500 font-black uppercase tracking-[0.3em] text-sm">
              Simple Pr
            </h2>
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
              <span className="text-9xl font-black text-white tracking-tighter">$2</span>
              <span className="text-gray-500 font-black uppercase text-xl italic">USD</span>
            </div>

            <div className="space-y-6 mb-12">
              <PriceFeature text="Complete German Curriculum" />
              <PriceFeature text="All 45 Specialty Units" />
              <PriceFeature text="Interactive Progress Tracking" />
              <PriceFeature text="Future Content Additions" />
            </div>

            {/* PAYPAL INTEGRATION */}
            <div className="w-full min-h-[150px]"> {/* Container to prevent layout shift */}
              <PayPalScriptProvider options={{ "client-id": process.env.NEXT_PUBLIC_PAYPAL_CLIENT_ID }}>
                <PayPalButtons
                  style={{ layout: "vertical", shape: "rect", color: "gold", label: "pay" }}
                  createOrder={(data, actions) => {
                    return actions.order.create({
                      purchase_units: [{
                        amount: { value: "0.01" },
                        custom_id: userId || "guest", // <--- userId from useAuth()
                        description: "Langster Lifetime Access"
                      }],
                    });
                  }}
                  onApprove={async (data, actions) => {
                    await actions.order.capture();
                    window.location.href = "/dashboard?payment=success";
                  }}
                />
              </PayPalScriptProvider>
            </div>
            
            <p className="text-center mt-8 text-[10px] text-white/20 font-black uppercase tracking-[0.3em]">
              Instant Activation • Secured by PayPal
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