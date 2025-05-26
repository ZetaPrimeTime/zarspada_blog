import { verify } from 'jsonwebtoken';
import { cookies } from 'next/headers';

export interface User {
  username: string;
  role: string;
}

export async function getCurrentUser(): Promise<User | null> {
  try {
    const cookieStore = await cookies();
    const token = cookieStore.get('gridgate_token')?.value;

    if (!token) {
      return null;
    }

    const decoded = verify(token, process.env.NEXTAUTH_SECRET || 'your-secret-key') as User;
    return decoded;
  } catch (error) {
    console.error('Error getting current user:', error);
    return null;
  }
}

export async function isAuthenticated(): Promise<boolean> {
  const user = await getCurrentUser();
  return !!user;
}

export async function requireAuth() {
  const user = await getCurrentUser();
  if (!user) {
    throw new Error('Authentication required');
  }
  return user;
} 