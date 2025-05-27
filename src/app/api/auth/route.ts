import { NextResponse } from 'next/server';
import { sign } from 'jsonwebtoken';

export async function POST(request: Request) {
  console.log('=== Auth API Start ===');

  try {
    const { username, password } = await request.json();
    console.log('Extracted credentials:', { 
      username, 
      passwordLength: password?.length,
      usernameLength: username?.length 
    });

    if (!username || !password) {
      console.log('Missing credentials');
      return NextResponse.json({ 
        success: false,
        message: 'Username and password are required',
        isAuthenticated: false 
      }, { status: 400 });
    }

    // Check credentials against environment variables
    const isUsernameMatch = username === process.env.ADMINUSER;
    const isPasswordMatch = password === process.env.GRIDGATEKEY;

    if (!isUsernameMatch || !isPasswordMatch) {
      console.log('Invalid credentials');
      return NextResponse.json({ 
        success: false,
        message: 'Invalid credentials',
        isAuthenticated: false 
      }, { status: 401 });
    }

    console.log('Credentials matched, creating session token');

    // Create session token
    const token = sign(
      { username, role: 'ADMIN' },
      process.env.NEXTAUTH_SECRET || 'your-secret-key',
      { expiresIn: '24h' }
    );

    // Create response with authentication data
    const responseData = {
      success: true,
      message: 'Authentication successful',
      isAuthenticated: true
    };
    
    console.log('=== Response Data Structure ===');
    console.log('Response data:', JSON.stringify(responseData, null, 2));
    console.log('Has isAuthenticated:', 'isAuthenticated' in responseData);
    console.log('isAuthenticated value:', responseData.isAuthenticated);
    
    // Create response with explicit body
    const response = new NextResponse(JSON.stringify(responseData), {
      status: 200,
      headers: {
        'Content-Type': 'application/json',
        'Cache-Control': 'no-store'
      }
    });

    // Log the exact response being sent
    console.log('=== Final Response Being Sent ===');
    console.log('Response status:', response.status);
    console.log('Response headers:', Object.fromEntries(response.headers.entries()));
    const responseBody = await response.clone().text();
    console.log('Response body:', responseBody);
    console.log('Response body parsed:', JSON.parse(responseBody));

    // Set cookie
    response.cookies.set('gridgate_token', token, {
      httpOnly: true,
      secure: process.env.NODE_ENV === 'production',
      sameSite: 'lax',
      maxAge: 60 * 60 * 24, // 24 hours
      path: '/'
    });

    console.log('Cookie set, sending response');
    return response;
  } catch (error) {
    console.error('Error in authentication:', error);
    return NextResponse.json({ 
      success: false,
      message: 'Internal server error',
      isAuthenticated: false
    }, { status: 500 });
  }
} 