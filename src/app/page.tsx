import Link from 'next/link'
import { Metadata } from 'next'
import Image from 'next/image'

export const metadata: Metadata = {
  title: 'Home | Zarspada Blog',
  description: 'Welcome to my thoughts and musings about technology and development',
}

export default function Home() {
  return (
    <main className="min-h-screen p-8 bg-black">
      <div className="max-w-4xl mx-auto">
        <header className="mb-12">
          <h1 className="text-4xl font-bold mb-4 text-white">Zarspada Blog</h1>
          <p className="text-lg text-gray-300">Welcome to my thoughts and musings</p>
        </header>

        <section className="grid gap-8">
          {/* Placeholder for blog posts */}
          <article className="border border-[#0ceef3]/20 rounded-lg p-6 hover:shadow-lg transition-shadow bg-black">
            <div className="relative w-full h-48 mb-4 rounded-lg overflow-hidden">
              <Image
                src="/placeholder.jpg"
                alt="Getting Started with Next.js"
                fill
                className="object-cover"
                priority
              />
            </div>
            <h2 className="text-2xl font-semibold mb-2 text-white">Getting Started with Next.js</h2>
            <p className="text-gray-300 mb-4">
              Learn how to build modern web applications with Next.js and TypeScript...
            </p>
            <div className="flex justify-between items-center">
              <span className="text-sm text-gray-400">May 26, 2024</span>
              <Link 
                href="/posts/getting-started" 
                className="text-[#0ceef3] hover:text-[#0ceef3]/80"
              >
                Read more →
              </Link>
            </div>
          </article>

          <article className="border border-[#0ceef3]/20 rounded-lg p-6 hover:shadow-lg transition-shadow bg-black">
            <div className="relative w-full h-48 mb-4 rounded-lg overflow-hidden">
              <Image
                src="/placeholder.jpg"
                alt="The Future of Web Development"
                fill
                className="object-cover"
                priority
              />
            </div>
            <h2 className="text-2xl font-semibold mb-2 text-white">The Future of Web Development</h2>
            <p className="text-gray-300 mb-4">
              Exploring the latest trends and technologies shaping the web...
            </p>
            <div className="flex justify-between items-center">
              <span className="text-sm text-gray-400">May 25, 2024</span>
              <Link 
                href="/posts/web-development-future" 
                className="text-[#0ceef3] hover:text-[#0ceef3]/80"
              >
                Read more →
              </Link>
            </div>
          </article>
        </section>
      </div>
    </main>
  )
}
