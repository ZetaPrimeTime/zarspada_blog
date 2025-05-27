'use client';

import { useState } from 'react';
import { useRouter } from 'next/navigation';

export default function GridGatePage() {
  const router = useRouter();
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const [debugInfo, setDebugInfo] = useState<string>('');

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsLoading(true);
    setError('');
    setDebugInfo('');

    try {
      console.log('=== Login Attempt Start ===');
      console.log('Sending credentials:', { username, password });
      
      const response = await fetch('/api/auth/gridgate', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ username, password }),
        credentials: 'include',
      });

      const data = await response.json();
      console.log('Login response:', {
        status: response.status,
        ok: response.ok,
        data,
        headers: Object.fromEntries(response.headers.entries())
      });

      if (response.ok) {
        console.log('Login successful, redirecting to welcome page');
        // Use replace instead of push to prevent back button issues
        router.replace('/welcome');
      } else {
        console.log('Login failed:', data.error);
        setError(data.error || 'Invalid credentials');
        setDebugInfo(JSON.stringify({
          status: response.status,
          data,
          headers: Object.fromEntries(response.headers.entries())
        }, null, 2));
      }
    } catch (error) {
      console.error('Login error:', error);
      setError('An error occurred. Please try again.');
      setDebugInfo(error instanceof Error ? error.message : String(error));
    } finally {
      setIsLoading(false);
      console.log('=== Login Attempt End ===');
    }
  };

  return (
    <div className="min-h-screen bg-black text-white flex items-center justify-center p-4">
      <div className="w-full max-w-md space-y-8">
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

          {debugInfo && (
            <div className="bg-gray-800 border border-gray-700 text-gray-300 px-4 py-2 rounded text-xs font-mono whitespace-pre overflow-auto">
              {debugInfo}
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

          <div>
            <button
              type="submit"
              disabled={isLoading}
              className="w-full flex justify-center py-2 px-4 rounded bg-[#0ceef3] text-black font-medium hover:bg-[#0ceef3]/90 transition-colors disabled:opacity-50"
            >
              {isLoading ? 'Accessing...' : 'Access Grid'}
            </button>
          </div>
        </form>
      </div>
    </div>
  );
} 