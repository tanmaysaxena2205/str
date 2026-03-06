import { Geist, Geist_Mono } from "next/font/google";
import "./globals.css";
import Navbar from "@/components/Navbar";
import { ClerkProvider } from '@clerk/nextjs';
import CookieCleaner from "@/components/CookieCleaner";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

export const metadata = {
  title: "Langstr - Master Languages with AI",
  description: "Personalized german language learning platform",
};

export default function RootLayout({ children }) {
  return (
    <ClerkProvider>
      <html lang="en">
        <head>
          {/* 1. Preconnect to Google Auth - This makes the popup appear instantly */}
          <link rel="preconnect" href="https://accounts.google.com" />
          
          {/* 2. Preconnect to Clerk's Frontend API */}
          <link rel="preconnect" href="https://clerk.lang-peach.vercel.app" />
          
          {/* 3. DNS Prefetch as a fallback */}
          <link rel="dns-prefetch" href="https://accounts.google.com" />
        </head>
        <body className={`${geistSans.variable} ${geistMono.variable} antialiased bg-black text-white`}>
          <CookieCleaner />
          <Navbar />
          {children}
        </body>
      </html>
    </ClerkProvider>
  );
}