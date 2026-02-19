import { clerkMiddleware, createRouteMatcher } from "@clerk/nextjs/server";
import { NextResponse } from "next/server";

// 1. Define public routes
const isPublicRoute = createRouteMatcher([
  '/sign-in(.*)', 
  '/sign-up(.*)', 
  '/api/webhooks/clerk(.*)',
  '/', 
  '/pricing',
  '/my-words'
]);

export default clerkMiddleware(async (auth, req) => {
  const { pathname } = req.nextUrl;

  // STEP A: IMMEDIATE BYPASS (The Speed Fix)
  // If it's a static file or the webhook, exit NOW. 
  // Do not wait for auth() or sessions.
  if (
    pathname.startsWith('/_next') || 
    pathname.includes('.') || 
    pathname.startsWith('/api/webhooks')
  ) {
    return NextResponse.next();
  }

  // STEP B: CHECK AUTH (Only for actual page loads)
  const { userId } = await auth();

  // Redirect logged-in users away from landing page
  if (userId && pathname === '/') {
    return NextResponse.redirect(new URL('/dashboard', req.url));
  }

  // Protect private routes
  if (!userId && !isPublicRoute(req)) {
    return NextResponse.redirect(new URL('/sign-up', req.url));
  }

  return NextResponse.next();
});

export const config = {
  matcher: [
    /*
     * Match all request paths except for the ones starting with:
     * - _next/static (static files)
     * - _next/image (image optimization files)
     * - favicon.ico (favicon file)
     */
    '/((?!_next/static|_next/image|favicon.ico|.*\\.(?:html?|css|js(?!on)|jpe?g|webp|png|gif|svg|ttf|woff2?|ico|csv|docx?|xlsx?|zip|webmanifest)).*)',
    // Always run for API routes
    '/(api|trpc)(.*)',
  ],
};

