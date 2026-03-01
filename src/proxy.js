import { clerkMiddleware, createRouteMatcher } from "@clerk/nextjs/server";
import { NextResponse } from "next/server";


// 1. Define public routes
const isPublicRoute = createRouteMatcher([
  '/sign-in(.*)', 
  '/sign-up(.*)', 
  '/api/webhooks/clerk(.*)',
  '/api/webhooks/polar(.*)', // Added to ensure payments process
  '/', 
  '/pricing',
  '/my-words',
  '/privacy-policy',
]);

export default clerkMiddleware(async (auth, req) => {
  const { pathname } = req.nextUrl;
  const isPublic = isPublicRoute(req);
  
  // Use your preferred name consistently
  const SESSION_COOKIE = "Langstr_session";
  const hasSessionCookie = req.cookies.has(SESSION_COOKIE);

  // STEP 1: Fast Lane - Skip Clerk if we have our custom session on a public page
  // We exclude '/' so the dashboard redirect logic below can still run
  if (isPublic && pathname !== '/' && hasSessionCookie) {
    return NextResponse.next();
  }

  // STEP 2: The "Heavy" Clerk check
  const { userId } = await auth();

  // Handle Landing Page -> Dashboard redirect
  if (userId && pathname === '/') {
    return NextResponse.redirect(new URL('/dashboard', req.url));
  }

  // Handle Protected Routes
  if (!userId && !isPublic) {
    const response = NextResponse.redirect(new URL('/sign-up', req.url));
    // Clean up cookie if it exists but user is actually logged out
    if (hasSessionCookie) response.cookies.delete(SESSION_COOKIE);
    return response;
  }

  const response = NextResponse.next();

  // STEP 3: Set the "Fast Lane" cookie if user is logged in
  if (userId && !hasSessionCookie) {
    response.cookies.set(SESSION_COOKIE, "true", {
      maxAge: 60 * 60 * 24, // 24 hours
      path: '/',
      httpOnly: true, 
      secure: true,
      sameSite: 'lax',
    });
  }

  return response;
});

export const config = {
  matcher: [
    // This ignores static files to save CPU time
    '/((?!_next|[^?]*\\.(?:html?|css|js(?!on)|jpe?g|webp|png|gif|svg|ttf|woff2?|ico|csv|docx?|xlsx?|zip|webmanifest)).*)',
    '/(api|trpc)(.*)',
  ],
};