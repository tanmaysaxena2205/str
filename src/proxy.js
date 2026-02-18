import { clerkMiddleware, createRouteMatcher } from "@clerk/nextjs/server";
import { NextResponse } from "next/server";

// 1. Define which routes are public (don't need login)
const isPublicRoute = createRouteMatcher([
  '/sign-in(.*)', 
  '/sign-up(.*)', 
  '/api/webhooks/clerk(.*)',
  '/',
  '/pricing'
  ,'/my-words'
]);

export default clerkMiddleware(async (auth, req) => {
  const { userId } = await auth();

  // 2. If the user is NOT logged in and trying to access a PRIVATE route
  if (!userId && !isPublicRoute(req)) {
    // Force redirect to your custom sign-up page
    const signUpUrl = new URL('/sign-up', req.url);
    return NextResponse.redirect(signUpUrl);
  }
});

export const config = {
  matcher: [
    // Skip Next.js internals and all static files
    '/((?!_next|[^?]*\\.(?:html?|css|js(?!on)|jpe?g|webp|png|gif|svg|ttf|woff2?|ico|csv|docx?|xlsx?|zip|webmanifest)).*)',
    // Always run for API routes
    '/(api|trpc)(.*)',
  ],
};