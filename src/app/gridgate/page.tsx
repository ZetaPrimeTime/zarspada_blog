'use client';

import { useState } from 'react';
import { useRouter } from 'next/navigation';
import { useAuth } from '../context/AuthContext';

export default function GridGatePage() {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const router = useRouter();
  const { checkAuth } = useAuth();

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError('');
    setIsLoading(true);
    console.log('=== Login Form Submit Start ===');

    try {
      console.log('Sending authentication request...');
      const response = await fetch('/api/auth/gridgate', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ username, password }),
        credentials: 'include'
      });

      console.log('Response status:', response.status);
      const data = await response.json();
      console.log('Response data:', data);

      if (!response.ok) {
        throw new Error(data.message || 'Authentication failed');
      }

      if (!data.isAuthenticated) {
        throw new Error('Authentication failed');
      }

      // Update auth state
      await checkAuth();
      
      // Redirect to welcome page
      console.log('Authentication successful, redirecting...');
      router.replace('/welcome');
    } catch (err) {
      console.error('Login error:', err);
      setError(err instanceof Error ? err.message : 'An error occurred during login');
    } finally {
      setIsLoading(false);
      console.log('=== Login Form Submit End ===');
    }
  };

  return (
    <div className="min-h-screen bg-black text-white flex items-center justify-center p-4">
      <div className="w-full max-w-md">
        <div>
          <h2 className="text-3xl font-bold text-center">Grid Gate</h2>
          <p className="mt-2 text-center text-gray-400">
            Enter your credentials to access the system
          </p>
        </div>

        <form className="mt-8 space-y-6" onSubmit={handleSubmit}>
          {error && (
            <div className="bg-red-500/10 border border-red-500 text-red-500 px-4 py-2 rounded">
              {error}
            </div>
          )}

          <div className="space-y-4">
            <div>
              <label htmlFor="username" className="block text-sm font-medium">
                Username
              </label>
              <input
                id="username"
                name="username"
                type="text"
                required
                value={username}
                onChange={(e) => setUsername(e.target.value)}
                className="mt-1 block w-full px-4 py-2 rounded bg-gray-900 border border-gray-800 text-white focus:outline-none focus:border-[#0ceef3]"
              />
            </div>

            <div>
              <label htmlFor="password" className="block text-sm font-medium">
                Password
              </label>
              <input
                id="password"
                name="password"
                type="password"
                required
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                className="mt-1 block w-full px-4 py-2 rounded bg-gray-900 border border-gray-800 text-white focus:outline-none focus:border-[#0ceef3]"
              />
            </div>
          </div>

          <button
            type="submit"
            disabled={isLoading}
            className="w-full flex justify-center py-2 px-4 rounded bg-[#0ceef3] text-black font-medium hover:bg-[#0ceef3]/90 transition-colors disabled:opacity-50"
          >
            {isLoading ? 'Accessing...' : 'Access Grid'}
          </button>
        </form>
      </div>
    </div>
  );
} 