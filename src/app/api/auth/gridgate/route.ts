import { NextResponse } from 'next/server';
import { cookies } from 'next/headers';
import { sign } from 'jsonwebtoken';

export async function POST(req: Request) {
  console.log('=== GridGate Authentication Start ===');
  
  try {
    const body = await req.json();
    console.log('Request body:', body);
    
    const { username, password } = body;
    console.log('Extracted credentials:', { username, password });

    if (!username || !password) {
      console.log('❌ Missing credentials');
      return NextResponse.json(
        { error: 'Username and password are required' },
        { status: 400 }
      );
    }

    // Debug logging for environment variables
    console.log('Environment Variables Check:', {
      ADMINUSER: process.env.ADMINUSER,
      GRIDGATEKEY: process.env.GRIDGATEKEY,
      NEXTAUTH_SECRET: process.env.NEXTAUTH_SECRET ? 'Set' : 'Not Set',
      NODE_ENV: process.env.NODE_ENV
    });

    // Check credentials against environment variables
    const isUsernameMatch = username === process.env.ADMINUSER;
    const isPasswordMatch = password === process.env.GRIDGATEKEY;

    console.log('Credential Comparison:', {
      isUsernameMatch,
      isPasswordMatch,
      providedUsername: username,
      providedPassword: password,
      expectedUsername: process.env.ADMINUSER,
      expectedPassword: process.env.GRIDGATEKEY,
      usernameLength: username.length,
      passwordLength: password.length,
      expectedUsernameLength: process.env.ADMINUSER?.length,
      expectedPasswordLength: process.env.GRIDGATEKEY?.length
    });

    if (isUsernameMatch && isPasswordMatch) {
      console.log('✅ Credentials matched, generating token');
      
      // Create a session token
      const token = sign(
        { username, role: 'ADMIN' },
        process.env.NEXTAUTH_SECRET || 'your-secret-key',
        { expiresIn: '24h' }
      );

      console.log('Token generated:', token.substring(0, 20) + '...');

      // Create the response
      const response = NextResponse.json({
        success: true,
        message: 'Authentication successful',
      });

      // Set the token in a cookie with more permissive settings
      response.cookies.set({
        name: 'gridgate_token',
        value: token,
        httpOnly: true,
        secure: process.env.NODE_ENV === 'production',
        sameSite: 'lax',
        maxAge: 60 * 60 * 24, // 24 hours
        path: '/', // Make sure the cookie is available for all paths
      });

      // Log the cookie being set
      console.log('Cookie being set:', {
        name: 'gridgate_token',
        value: token.substring(0, 20) + '...',
        maxAge: 60 * 60 * 24,
        path: '/',
        sameSite: 'lax',
        secure: process.env.NODE_ENV === 'production'
      });

      console.log('Cookie set in response');
      console.log('=== GridGate Authentication Success ===');
      return response;
    }

    console.log('❌ Invalid credentials');
    console.log('=== GridGate Authentication Failed ===');
    return NextResponse.json(
      { error: 'Invalid credentials' },
      { status: 401 }
    );
  } catch (error) {
    console.error('❌ Error in gridgate authentication:', error);
    console.log('=== GridGate Authentication Error ===');
    return NextResponse.json(
      { error: 'Internal server error' },
      { status: 500 }
    );
  }
} 