import { clerkMiddleware, createRouteMatcher } from "@clerk/nextjs/server";

// Define pages that are strictly public
const isPublicRoute = createRouteMatcher([
  '/',
  '/pricing',
  '/my-words',
  '/sign-in(.*)',
  '/sign-up(.*)',
  '/api/webhooks/clerk(.*)'
]);

export default clerkMiddleware(async (auth, req) => {
  // Only check auth if the route isn't in the ignore list below
  const { userId } = await auth();

  if (!userId && !isPublicRoute(req)) {
    // Redirect to sign-up if trying to access private content
    const signUpUrl = new URL('/sign-up', req.url);
    return Response.redirect(signUpUrl);
  }
});

export const config = {
  matcher: [
    /*
     * This regex is your "Shield." 
     * It tells Vercel to IGNORE these paths entirely:
     * - Homepage ($)
     * - Pricing
     * - My Words
     * - Static assets (_next, images, etc.)
     */
    '/((?!_next/static|_next/image|favicon.ico|pricing|my-words|$).*)',
    '/(api|trpc)(.*)',
  ],
};