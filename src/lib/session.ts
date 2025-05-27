import { jwtVerify } from 'jose';

export interface Session {
  isAuthenticated: boolean;
  username?: string;
}

export async function getSession(): Promise<Session | null> {
  try {
    const response = await fetch('/api/auth/user', {
      credentials: 'include'
    });

    if (!response.ok) {
      return { isAuthenticated: false };
    }

    const data = await response.json();
    return {
      isAuthenticated: true,
      username: data.username
    };
  } catch (error) {
    console.error('Error getting session:', error);
    return { isAuthenticated: false };
  }
}

export async function verifyToken(token: string): Promise<Session | null> {
  try {
    const secret = new TextEncoder().encode(process.env.NEXTAUTH_SECRET);
    const { payload } = await jwtVerify(token, secret);
    
    return {
      isAuthenticated: true,
      username: payload.username as string
    };
  } catch (error) {
    console.error('Error verifying token:', error);
    return { isAuthenticated: false };
  }
} 