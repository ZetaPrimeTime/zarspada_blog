import { NextResponse } from 'next/server';
import { verify } from 'jsonwebtoken';
import type { NextRequest } from 'next/server';
import type { JwtPayload } from 'jsonwebtoken';

interface UserPayload extends JwtPayload {
  username: string;
}

export async function GET(request: NextRequest) {
  const token = request.cookies.get('gridgate_token')?.value;

  if (!token) {
    return NextResponse.json({ isAuthenticated: false }, { status: 200 });
  }

  try {
    const decoded = verify(token, process.env.NEXTAUTH_SECRET || 'your-secret-key') as UserPayload;
    return NextResponse.json({
      isAuthenticated: true,
      username: decoded.username
    });
  } catch (error) {
    console.error('Error verifying token:', error);
    return NextResponse.json({ isAuthenticated: false }, { status: 200 });
  }
} 