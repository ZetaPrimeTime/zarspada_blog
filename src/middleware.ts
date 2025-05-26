import { NextResponse } from 'next/server';
import type { NextRequest } from 'next/server';
import { verify } from 'jsonwebtoken';

// Add paths that require authentication
const protectedPaths = [
  '/admin',
  '/api/admin',
  '/posts/new',
  '/posts/edit',
  '/api/posts',
  '/welcome'
];

export function middleware(request: NextRequest) {
  const token = request.cookies.get('gridgate_token')?.value;

  // Debug logging
  console.log('Middleware check:', {
    path: request.nextUrl.pathname,
    hasToken: !!token,
    cookieNames: request.cookies.getAll().map(c => c.name)
  });

  // Check if the path requires authentication
  const isProtectedPath = protectedPaths.some(path => 
    request.nextUrl.pathname.startsWith(path)
  );

  if (isProtectedPath) {
    if (!token) {
      console.log('No token found, redirecting to login');
      // Redirect to login if no token is present
      return NextResponse.redirect(new URL('/gridgate', request.url));
    }

    try {
      // Verify the token
      const decoded = verify(token, process.env.NEXTAUTH_SECRET || 'your-secret-key');
      console.log('Token verified:', decoded);
      return NextResponse.next();
    } catch (error) {
      console.error('Token verification failed:', error);
      // If token is invalid, redirect to login
      return NextResponse.redirect(new URL('/gridgate', request.url));
    }
  }

  return NextResponse.next();
}

// Configure which paths the middleware should run on
export const config = {
  matcher: [
    '/admin/:path*',
    '/api/admin/:path*',
    '/posts/new',
    '/posts/edit/:path*',
    '/api/posts/:path*',
    '/welcome'
  ],
}; 