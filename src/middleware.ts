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
    cookieNames: request.cookies.getAll().map(c => c.name),
    url: request.url,
    referer: request.headers.get('referer')
  });

  // Check if the path requires authentication
  const isProtectedPath = protectedPaths.some(path => 
    request.nextUrl.pathname.startsWith(path)
  );

  // If this is a direct navigation to /welcome from /gridgate, allow it
  const isFromGridGate = request.headers.get('referer')?.includes('/gridgate');
  if (request.nextUrl.pathname === '/welcome' && isFromGridGate) {
    console.log('Allowing direct navigation from GridGate to Welcome');
    return NextResponse.next();
  }

  // If this is a navigation between protected pages, allow it
  const isFromProtectedPath = protectedPaths.some(path => 
    request.headers.get('referer')?.includes(path)
  );
  if (isProtectedPath && isFromProtectedPath) {
    console.log('Allowing navigation between protected pages:', {
      from: request.headers.get('referer'),
      to: request.nextUrl.pathname
    });
    return NextResponse.next();
  }

  if (isProtectedPath) {
    if (!token) {
      console.log('No token found, redirecting to login');
      // Redirect to login if no token is present
      const response = NextResponse.redirect(new URL('/gridgate', request.url));
      console.log('Redirect response:', {
        status: response.status,
        headers: Object.fromEntries(response.headers.entries())
      });
      return response;
    }

    try {
      // Verify the token
      const decoded = verify(token, process.env.NEXTAUTH_SECRET || 'your-secret-key');
      console.log('Token verified:', decoded);
      return NextResponse.next();
    } catch (error) {
      console.error('Token verification failed:', error);
      // If token is invalid, redirect to login
      const response = NextResponse.redirect(new URL('/gridgate', request.url));
      console.log('Invalid token redirect response:', {
        status: response.status,
        headers: Object.fromEntries(response.headers.entries())
      });
      return response;
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