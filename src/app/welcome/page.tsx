'use client';

import { useEffect, useState } from 'react';
import { useRouter } from 'next/navigation';
import TerminalMenu from '@/components/terminal-menu';
import Typewriter from '@/components/typewriter';

export default function WelcomePage() {
  const router = useRouter();
  const [username, setUsername] = useState('');
  const [error, setError] = useState('');

  useEffect(() => {
    // Fetch user info from the token
    const fetchUserInfo = async () => {
      console.log('=== Welcome: Fetching User Info ===');
      try {
        const response = await fetch('/api/auth/user', {
          credentials: 'include'
        });
        
        console.log('User info response:', {
          status: response.status,
          ok: response.ok,
          headers: Object.fromEntries(response.headers.entries())
        });

        if (response.ok) {
          const data = await response.json();
          console.log('User info data:', data);
          setUsername(data.username);
        } else {
          console.log('Failed to fetch user info, redirecting to login');
          router.push('/gridgate');
        }
      } catch (error) {
        console.error('Error fetching user info:', error);
        setError('Failed to load user information');
        router.push('/gridgate');
      }
    };

    fetchUserInfo();
  }, [router]);

  return (
    <div className="min-h-screen bg-black text-white p-8">
      <div className="max-w-4xl mx-auto">
        <div className="flex justify-end mb-8">
          <TerminalMenu />
        </div>

        <div className="bg-gray-900/50 border border-[#0ceef3]/20 rounded-lg p-6">
          <div className="space-y-4">
            {error && (
              <div className="bg-red-500/10 border border-red-500 text-red-500 px-4 py-2 rounded">
                {error}
              </div>
            )}
            
            <div className="min-h-[2rem]">
              <Typewriter 
                text={`Welcome to the Grid, ${username}...`}
                speed={50}
                className="text-2xl font-bold text-[#0ceef3]"
              />
            </div>
            <p className="text-gray-400">
              You have successfully accessed the Grid. Use the terminal menu to navigate through the system.
            </p>
            <div className="mt-6 space-y-2">
              <p className="text-sm text-gray-500">Available commands:</p>
              <ul className="list-disc list-inside text-gray-400 space-y-1">
                <li>New Post - Create a new blog post</li>
                <li>Edit Posts - Manage existing posts</li>
                <li>Logout - Exit the Grid</li>
              </ul>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
} 