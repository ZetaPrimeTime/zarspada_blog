'use client';

import { useState } from 'react';
import { useRouter } from 'next/navigation';

export default function TerminalMenu() {
  const [isOpen, setIsOpen] = useState(false);
  const router = useRouter();

  const menuItems = [
    { label: 'New Post', path: '/posts/new' },
    { label: 'Edit Posts', path: '/posts/edit' },
    { label: 'Logout', path: '/api/auth/logout' },
  ];

  const handleLogout = async () => {
    try {
      await fetch('/api/auth/logout', { method: 'POST' });
      router.push('/gridgate');
    } catch (error) {
      console.error('Logout failed:', error);
    }
  };

  return (
    <div className="relative">
      <button
        onClick={() => setIsOpen(!isOpen)}
        className="flex items-center space-x-2 text-[#0ceef3] hover:text-[#0ceef3]/80 transition-colors"
      >
        <span className="text-lg">$</span>
        <span className="text-sm">_</span>
      </button>

      {isOpen && (
        <div className="absolute top-full left-0 mt-2 w-48 bg-black border border-[#0ceef3]/20 rounded shadow-lg">
          <div className="p-2 border-b border-[#0ceef3]/20">
            <p className="text-[#0ceef3] text-sm">Grid Terminal</p>
          </div>
          <div className="py-1">
            {menuItems.map((item) => (
              <button
                key={item.path}
                onClick={() => {
                  if (item.path === '/api/auth/logout') {
                    handleLogout();
                  } else {
                    router.push(item.path);
                  }
                  setIsOpen(false);
                }}
                className="w-full text-left px-4 py-2 text-sm text-white hover:bg-[#0ceef3]/10 transition-colors"
              >
                {item.label}
              </button>
            ))}
          </div>
        </div>
      )}
    </div>
  );
} 