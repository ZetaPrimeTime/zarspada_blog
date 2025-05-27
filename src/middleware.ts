import { NextResponse } from 'next/server';
import type { NextRequest } from 'next/server';

// Public routes that don't require authentication
const publicRoutes = [
  '/',
  '/posts',
  '/about',
  '/search',
  '/api/search',
  '/api/posts/public',
  '/api/auth/gridgate',
  '/api/auth/logout',
  '/api/auth/user',
  '/gridgate'
];

// Protected routes that require authentication
const protectedRoutes = [
  '/posts/new',
  '/posts/edit',
  '/dashboard',
  '/api/posts',
  '/welcome'
];

// Simple token validation without crypto
function isValidToken(token: string): boolean {
  try {
    // Basic JWT structure validation
    const parts = token.split('.');
    if (parts.length !== 3) return false;
    
    // Check if token is expired
    const payload = JSON.parse(atob(parts[1]));
    const expirationTime = payload.exp * 1000; // Convert to milliseconds
    return Date.now() < expirationTime;
  } catch {
    return false;
  }
}

export function middleware(request: NextRequest) {
  const pathname = request.nextUrl.pathname;
  
  // Debug logging
  console.log('=== Middleware Request ===');
  console.log('Path:', pathname);
  console.log('Method:', request.method);
  console.log('URL:', request.url);
  console.log('Cookies:', request.cookies.getAll().reduce((acc, cookie) => ({
    ...acc,
    [cookie.name]: cookie.value
  }), {}));

  // Skip middleware for API routes
  if (pathname.startsWith('/api/')) {
    console.log('Skipping middleware for API route:', pathname);
    return NextResponse.next();
  }

  // Check if the path is public
  if (publicRoutes.some(path => pathname === path || pathname.startsWith(path + '/'))) {
    console.log('Public route accessed:', pathname);
    return NextResponse.next();
  }

  // Check if the path is protected
  if (protectedRoutes.some(path => pathname === path || pathname.startsWith(path + '/'))) {
    const token = request.cookies.get('gridgate_token')?.value;
    console.log('Protected route check:', {
      path: pathname,
      hasToken: !!token
    });

    if (!token) {
      console.log('Protected route accessed without token:', pathname);
      return NextResponse.redirect(new URL('/gridgate', request.url));
    }

    if (!isValidToken(token)) {
      console.error('Invalid token for protected route:', {
        path: pathname,
        error: 'Token validation failed'
      });
      return NextResponse.redirect(new URL('/gridgate', request.url));
    }

    console.log('Protected route accessed with valid token:', {
      path: pathname
    });
    return NextResponse.next();
  }

  // Default to public access for any other routes
  console.log('Default route access:', pathname);
  return NextResponse.next();
}

// Configure which paths the middleware should run on
export const config = {
  matcher: [
    // Protected paths
    '/admin/:path*',
    '/api/admin/:path*',
    '/posts/new',
    '/posts/edit/:path*',
    '/api/posts/:path*',
    '/welcome'
  ],
}; 