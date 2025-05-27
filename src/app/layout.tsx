import type { Metadata } from "next";
import { Orbitron } from "next/font/google";
import "./globals.css";
import Link from "next/link";
import { ThemeProvider } from "@/components/theme-provider";
import { ThemeToggle } from "@/components/theme-toggle";
import { SeoProvider } from "@/components/seo-provider";
import { SearchBar } from "@/components/search-bar";
import { SocialLinks } from "@/components/social-links";
import { AuthProvider } from './context/AuthContext';

const orbitron = Orbitron({ subsets: ["latin"] });

export const metadata: Metadata = {
  title: "Zarspada Blog",
  description: "A personal blog about technology, development, and thoughts",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  // Check if this is an API route by checking the URL
  if (typeof window === 'undefined') {
    const url = new URL(process.env.NEXT_PUBLIC_BASE_URL || 'http://localhost:3000');
    if (url.pathname.startsWith('/api/')) {
      return children;
    }
  }

  return (
    <html lang="en" suppressHydrationWarning>
      <body className={`${orbitron.className} min-h-screen bg-white dark:bg-black text-gray-900 dark:text-white`}>
        <AuthProvider>
          <ThemeProvider>
            <div className="flex flex-col min-h-screen">
              <nav className="bg-white dark:bg-black shadow-sm">
                <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
                  <div className="flex justify-between h-16">
                    <div className="flex items-center space-x-8">
                      <Link href="/" className="flex items-center">
                        <span className="text-xl font-bold">Zarspada</span>
                      </Link>
                      <div className="hidden md:block w-64">
                        <SearchBar />
                      </div>
                    </div>
                    <div className="flex items-center space-x-4">
                      <Link href="/posts" className="hover:text-[#0ceef3]">
                        Posts
                      </Link>
                      <Link href="/about" className="hover:text-[#0ceef3]">
                        About
                      </Link>
                      <ThemeToggle />
                    </div>
                  </div>
                </div>
              </nav>

              <main className="flex-1">
                {children}
              </main>

              <footer className="bg-white dark:bg-black mt-12">
                <div className="max-w-4xl mx-auto px-4 py-8 sm:px-6 lg:px-8">
                  <div className="border-t border-gray-200 dark:border-gray-800 pt-8">
                    <div className="flex flex-col items-center space-y-4">
                      <SocialLinks />
                      <p className="text-center text-gray-500 dark:text-gray-400">
                        © {new Date().getFullYear()} Zarspada Blog. All rights reserved.
                      </p>
                    </div>
                  </div>
                </div>
              </footer>
            </div>
          </ThemeProvider>
        </AuthProvider>
      </body>
    </html>
  );
}
