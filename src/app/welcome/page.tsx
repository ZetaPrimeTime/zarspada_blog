'use client';

import { useEffect, useState } from 'react';
import { useRouter } from 'next/navigation';
import TerminalMenu from '@/components/terminal-menu';
import Typewriter from '@/components/typewriter';

export default function WelcomePage() {
  const router = useRouter();
  const [username, setUsername] = useState('');
  const [error, setError] = useState('');
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    // Fetch user info from the token
    const fetchUserInfo = async () => {
      console.log('=== Welcome: Fetching User Info ===');
      try {
        console.log('Making request to /api/auth/user...');
        const response = await fetch('/api/auth/user', {
          credentials: 'include',
          cache: 'no-store' // Prevent caching
        });
        
        console.log('User info response:', {
          status: response.status,
          ok: response.ok,
          headers: Object.fromEntries(response.headers.entries())
        });

        if (response.ok) {
          const data = await response.json();
          console.log('User info data:', data);
          if (data.isAuthenticated) {
            setUsername(data.username);
          } else {
            console.log('User not authenticated, redirecting to login');
            router.replace('/gridgate');
          }
        } else {
          console.log('Failed to fetch user info, redirecting to login');
          router.replace('/gridgate');
        }
      } catch (error) {
        console.error('Error fetching user info:', error);
        setError('Failed to load user information');
        router.replace('/gridgate');
      } finally {
        setIsLoading(false);
      }
    };

    fetchUserInfo();
  }, [router]);

  if (isLoading) {
    return (
      <div className="min-h-screen bg-black text-white flex items-center justify-center">
        <div className="text-[#0ceef3]">Loading...</div>
      </div>
    );
  }

  if (error) {
    return (
      <div className="min-h-screen bg-black text-white flex items-center justify-center">
        <div className="text-red-500">{error}</div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-black text-white">
      <div className="container mx-auto px-4 py-8">
        <h1 className="text-4xl font-bold mb-8">Welcome, {username}!</h1>
        <TerminalMenu />
        <Typewriter text={`Welcome to the Grid, ${username}...`} speed={50} />
      </div>
    </div>
  );
} 