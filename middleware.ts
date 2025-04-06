import { clerkMiddleware, createRouteMatcher } from "@clerk/nextjs/server";
import { NextResponse } from "next/server";

const ProtectedRoute = createRouteMatcher([
  "/",
  "/upcoming",
  "/meeting(.*)",
  "/previous",
  "/recordings",
  "/personal-room",
]);

const publicRoutes = ['/sign-in(.*)', '/sign-up(.*)'];

export default clerkMiddleware(async (auth, req) => {
  // Handle successful sign-in and redirect to home if coming from sign-in
  if (req.nextUrl.pathname.startsWith('/sign-in')) {
    try {
      // Call auth.protect() to ensure the user is authenticated.
      // If not authenticated, it might throw an error or redirect internally.
      await auth.protect();
      // If auth.protect() doesn't throw and we reach here, it means the user is signed in.
      return NextResponse.redirect(new URL('/', req.url));
    } catch (e) {
      // If auth.protect() throws (indicating not authenticated), let the request proceed
      // so Clerk's internal redirection or error handling can take place.
      return NextResponse.next();
    }
  }

  // Allow access to public routes without authentication
  if (publicRoutes.some(route => req.nextUrl.pathname.match(route))) {
    return NextResponse.next();
  }

  // Protect other routes using auth.protect().
  // If auth.protect() fails, it will handle the redirection.
  if (ProtectedRoute(req)) {
    try {
      await auth.protect();
    } catch (e) {
      // Let auth.protect() handle the redirection
      return NextResponse.redirect(new URL('/sign-in', req.url));
    }
  }

  // If none of the above conditions apply, allow the request to proceed.
  return NextResponse.next();
});

export const config = {
  matcher: [
    '/((?!_next|[^?]*\\.(?:html?|css|js(?!on)|jpe?g|webp|png|gif|svg|ttf|woff2?|ico|csv|docx?|xlsx?|zip|webmanifest)).*)',
    '/',
    '/(api|trpc)(.*)',
  ],
};