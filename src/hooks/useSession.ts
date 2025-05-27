import { useState, useEffect } from 'react';
import { getSession, type Session } from '@/lib/session';

export function useSession() {
  const [session, setSession] = useState<Session | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    async function loadSession() {
      try {
        const sessionData = await getSession();
        setSession(sessionData);
      } catch (error) {
        console.error('Error loading session:', error);
        setSession(null);
      } finally {
        setLoading(false);
      }
    }

    loadSession();
  }, []);

  return { session, loading };
} 