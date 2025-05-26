import { NextResponse } from 'next/server';
import { getCurrentUser } from '@/lib/auth';

export async function GET() {
  console.log('=== User Info API: Start ===');
  try {
    const user = await getCurrentUser();
    console.log('Current user:', user);

    if (!user) {
      console.log('No user found, returning 401');
      return NextResponse.json(
        { error: 'Not authenticated' },
        { status: 401 }
      );
    }

    console.log('User found, returning user info');
    return NextResponse.json({
      username: user.username,
      role: user.role,
    });
  } catch (error) {
    console.error('Error in user info API:', error);
    return NextResponse.json(
      { error: 'Invalid token' },
      { status: 401 }
    );
  } finally {
    console.log('=== User Info API: End ===');
  }
} 