'use client'
import Link from 'next/link';
import { Check, Infinity, ShieldCheck, ArrowRight, Users } from 'lucide-react';
import { PayPalButtons, PayPalScriptProvider } from "@paypal/react-paypal-js";
import { useAuth } from "@clerk/nextjs";
import { upgradeUserRole } from "@/lib/actions/user.actions";

export default function PricingPage() {
  const { userId } = useAuth();

  // UPDATED RAZORPAY HANDLER WITH SERVER-SIDE ORDER & VERIFICATION
  const handleRazorpay = async () => {
    // 1. Load the Razorpay Checkout Script
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

    try {
      // 2. Create Order on your Server (api/razorpay/order/route.js)
      // This is more secure than creating it on the client
      const response = await fetch("/api/razorpay/order", {
  method: "POST",
  headers: { "Content-Type": "application/json" },
  body: JSON.stringify({ 
    amount: 175, 
    userId: userId 
  }),
});
      const orderData = await response.json();

      if (!orderData.id) throw new Error("No Order ID returned from server");

      // 3. Configure Razorpay Modal Options
      const options = {
        key: process.env.NEXT_PUBLIC_RAZORPAY_KEY_ID, 
        amount: orderData.amount,
        currency: "INR",
        name: "Langster",
        description: "Lifetime Premium Access",
        order_id: orderData.id, // Linking to the server-side order
        handler: async function (response) {
          // 4. Verify payment on your server (api/razorpay/verify/route.js)
          // This prevents signature spoofing
          const verifyRes = await fetch("/api/razorpay/verify", {
            method: "POST",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify({
              razorpay_order_id: response.razorpay_order_id,
              razorpay_payment_id: response.razorpay_payment_id,
              razorpay_signature: response.razorpay_signature,
            }),
          });

          const verifyData = await verifyRes.json();

          if (verifyData.success) {
            // 5. Upgrade User and Redirect
            if (userId) await upgradeUserRole(userId);
            window.location.href = "/dashboard?payment=success";
          } else {
            alert("Payment verification failed. Please contact support.");
          }
        },
        prefill: { 
          name: "Learner",
          email: "" // Optional: Add user email from Clerk here
        },
        theme: { color: "#3395FF" },
      };

      const paymentObject = new window.Razorpay(options);
      paymentObject.open();

    } catch (error) {
      console.error("Razorpay Error:", error);
      alert("Something went wrong with the payment initiation.");
    }
  };

  return (
    <main className="bg-[#050505] text-white min-h-[100dvh] flex items-center justify-center px-6 lg:px-20 relative">
      
      {/* --- NAVBAR-STYLE SOCIAL PROOF BOX --- */}
      <div className="absolute top-8 right-10 hidden xl:block">
        <div className="flex items-center gap-3 bg-white/[0.03] backdrop-blur-2xl border border-white/10 p-1.5 pr-4 rounded-xl shadow-2xl transition-all hover:border-orange-500/40 group cursor-default">
          <div className="relative">
            <div className="w-8 h-8 rounded-lg bg-orange-500 flex items-center justify-center text-black">
              <Users size={16} strokeWidth={3} />
            </div>
            <span className="absolute -top-1 -right-1 flex h-2.5 w-2.5">
              <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-orange-400 opacity-75"></span>
              <span className="relative inline-flex rounded-full h-2.5 w-2.5 bg-orange-600 border-2 border-[#050505]"></span>
            </span>
          </div>
          <div className="flex flex-col">
            <span className="text-white font-black text-[9px] tracking-tighter uppercase leading-none">10,000+ Active</span>
            <span className="text-orange-500/70 text-[8px] font-bold uppercase tracking-[0.1em] mt-1 group-hover:text-orange-500 transition-colors">Paid Members</span>
          </div>
        </div>
      </div>

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
              <span className="text-9xl font-black text-white tracking-tighter">$2</span>
              <span className="text-gray-500 font-black uppercase text-xl italic">USD</span>
            </div>

            <div className="space-y-6 mb-12">
              <PriceFeature text="Complete German Curriculum" />
              <PriceFeature text="All 45 Specialty Units" />
              <PriceFeature text="Interactive Progress Tracking" />
              <PriceFeature text="Future Content Additions" />
            </div>

            <div className="flex flex-col gap-2">
              <div className="w-full">
                <PayPalScriptProvider options={{ "client-id": process.env.NEXT_PUBLIC_PAYPAL_CLIENT_ID || "" }}>
                  <PayPalButtons
                    style={{ layout: "vertical", shape: "rect", color: "gold", label: "pay" }}
                    createOrder={(data, actions) => {
                      return actions.order.create({
                        purchase_units: [{
                          amount: { value: "2.00" },
                          custom_id: userId || "guest",
                          description: "Langster Lifetime Access"
                        }],
                      });
                    }}
                    onApprove={async (data, actions) => {
                      try {
                        await actions.order.capture();
                        if (userId) await upgradeUserRole(userId);
                        window.location.href = "/dashboard?payment=success";
                      } catch (error) {
                        console.error("Payment Capture Failed:", error);
                      }
                    }}
                  />
                </PayPalScriptProvider>
              </div>

              <div className="relative py-2">
                <div className="absolute inset-0 flex items-center">
                  <span className="w-full border-t border-white/5"></span>
                </div>
                <div className="relative flex justify-center">
                  <span className="bg-[#0a0a0a] px-4 text-[10px] font-black uppercase tracking-widest text-white/20 italic">OR</span>
                </div>
              </div>

              <button 
                onClick={handleRazorpay}
                className="w-full bg-[#3395FF] hover:bg-[#2a7ed9] h-[50px] rounded-sm flex items-center justify-center transition-all shadow-md active:scale-[0.98] px-4 mb-4"
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

              <div className="relative py-2">
                <div className="absolute inset-0 flex items-center">
                  <span className="w-full border-t border-white/5"></span>
                </div>
                <div className="relative flex justify-center">
                  <span className="bg-[#0a0a0a] px-3 text-[10px] font-black uppercase tracking-[0.3em] text-gray-500 italic">Secure Checkout</span>
                </div>
              </div>
            </div>
            
            <p className="text-center mt-6 text-[10px] text-white/20 font-black uppercase tracking-[0.3em]">Instant Activation • Lifetime Access</p>
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