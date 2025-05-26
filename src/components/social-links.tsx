'use client';

import { Twitter, Youtube, Linkedin } from 'lucide-react';

export function SocialLinks() {
  return (
    <div className="flex items-center space-x-4">
      <a
        href="https://twitter.com/zarspada"
        target="_blank"
        rel="noopener noreferrer"
        className="text-gray-400 hover:text-[#0ceef3] transition-colors"
        aria-label="Twitter"
      >
        <Twitter className="h-5 w-5" />
      </a>
      <a
        href="https://youtube.com/@zarspada"
        target="_blank"
        rel="noopener noreferrer"
        className="text-gray-400 hover:text-[#0ceef3] transition-colors"
        aria-label="YouTube"
      >
        <Youtube className="h-5 w-5" />
      </a>
      <a
        href="https://linkedin.com/in/zarspada"
        target="_blank"
        rel="noopener noreferrer"
        className="text-gray-400 hover:text-[#0ceef3] transition-colors"
        aria-label="LinkedIn"
      >
        <Linkedin className="h-5 w-5" />
      </a>
    </div>
  );
} 