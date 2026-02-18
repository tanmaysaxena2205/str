import { AuthenticateWithRedirectCallback } from "@clerk/nextjs";

export default function SSOCallback() {
  return (
    <div className="min-h-screen bg-black flex flex-col items-center justify-center gap-4">
      {/* Visual confirmation that the page is active */}
      <div className="w-12 h-12 border-4 border-orange-500 border-t-transparent rounded-full animate-spin" />
      <p className="text-white font-black italic tracking-widest animate-pulse">
        VERIFYING SESSION...
      </p>
      
      {/* This component handles the actual redirect to /dashboard */}
      <AuthenticateWithRedirectCallback signUpForceRedirectUrl="/dashboard" />
    </div>
  );
}