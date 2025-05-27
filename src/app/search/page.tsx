'use client';

import { useEffect, useState } from 'react';
import Link from 'next/link';
import { useSearchParams } from 'next/navigation';

interface Post {
  id: string;
  title: string;
  content: string;
  createdAt: string;
  author: {
    name: string;
  };
}

export default function SearchPage() {
  const searchParams = useSearchParams();
  const query = searchParams?.get('q') || '';
  const [posts, setPosts] = useState<Post[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState('');

  useEffect(() => {
    const fetchPosts = async () => {
      if (!query) {
        setPosts([]);
        setIsLoading(false);
        return;
      }

      try {
        console.log('Fetching search results for:', query);
        const response = await fetch(`/api/search?q=${encodeURIComponent(query)}`);
        console.log('Search response status:', response.status);
        
        if (!response.ok) {
          const errorText = await response.text();
          console.error('Search failed with status:', response.status, 'Error:', errorText);
          throw new Error(`Search failed: ${errorText}`);
        }

        const data = await response.json();
        console.log('Search results:', data);
        setPosts(data.posts);
      } catch (err) {
        console.error('Search error details:', err);
        setError(err instanceof Error ? err.message : 'Failed to perform search');
      } finally {
        setIsLoading(false);
      }
    };

    fetchPosts();
  }, [query]);

  return (
    <main className="min-h-screen p-8 bg-black">
      <div className="max-w-4xl mx-auto">
        <header className="mb-12">
          <h1 className="text-4xl font-bold mb-4">
            <span className="text-white">Search Results</span>
            {query && (
              <>
                <span className="text-white"> for </span>
                <span className="text-[#0ceef3]">"{query}"</span>
              </>
            )}
          </h1>
          <p className="text-lg text-gray-300">
            {isLoading ? 'Searching...' : `${posts.length} ${posts.length === 1 ? 'result' : 'results'} found`}
          </p>
        </header>

        {error && (
          <div className="bg-red-500/10 border border-red-500 text-red-500 px-4 py-2 rounded mb-4">
            {error}
          </div>
        )}

        {!isLoading && (
          <section className="grid gap-8">
            {posts.map((post) => (
              <article 
                key={post.id}
                className="border border-[#0ceef3]/20 rounded-lg p-6 hover:shadow-lg transition-shadow bg-black"
              >
                <h2 className="text-2xl font-semibold mb-2 text-white">
                  {post.title}
                </h2>
                <p className="text-gray-300 mb-4">
                  {post.content.substring(0, 200)}...
                </p>
                <div className="flex justify-between items-center">
                  <span className="text-sm text-gray-400">
                    By {post.author.name} • {new Date(post.createdAt).toLocaleDateString('en-US', {
                      year: 'numeric',
                      month: 'long',
                      day: 'numeric'
                    })}
                  </span>
                  <Link 
                    href={`/posts/${post.id}`}
                    className="text-[#0ceef3] hover:text-[#0ceef3]/80"
                  >
                    Read more →
                  </Link>
                </div>
              </article>
            ))}
          </section>
        )}

        {!isLoading && !error && posts.length === 0 && query && (
          <div className="text-center py-12">
            <p className="text-gray-300 text-lg">
              No posts found matching "{query}"
            </p>
          </div>
        )}
      </div>
    </main>
  );
} 