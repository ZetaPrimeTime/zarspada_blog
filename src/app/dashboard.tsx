'use client';

import { useEffect, useState } from 'react';
import { useRouter } from 'next/navigation';
import TerminalMenu from '@/components/terminal-menu';
import { Post } from '@/types/post';

export default function DashboardPage() {
  const router = useRouter();
  const [posts, setPosts] = useState<Post[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState('');

  useEffect(() => {
    const fetchPosts = async () => {
      try {
        const response = await fetch('/api/posts', {
          credentials: 'include',
          cache: 'no-store'
        });

        if (!response.ok) {
          if (response.status === 401) {
            router.replace('/gridgate');
            return;
          }
          throw new Error('Failed to fetch posts');
        }

        const data = await response.json();
        setPosts(data);
      } catch (error) {
        console.error('Error fetching posts:', error);
        setError('Failed to load posts');
      } finally {
        setIsLoading(false);
      }
    };

    fetchPosts();
  }, [router]);

  const handleNewPost = () => {
    router.push('/posts/new');
  };

  const handleEditPost = (postId: string) => {
    router.push(`/posts/edit/${postId}`);
  };

  if (isLoading) {
    return (
      <div className="min-h-screen bg-black text-white flex items-center justify-center">
        <div className="text-[#0ceef3]">Loading...</div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-black text-white p-8">
      <div className="max-w-4xl mx-auto">
        <div className="flex justify-end mb-8">
          <TerminalMenu />
        </div>

        <div className="bg-gray-900/50 border border-[#0ceef3]/20 rounded-lg p-6">
          <div className="flex justify-between items-center mb-6">
            <h1 className="text-2xl font-bold text-[#0ceef3]">Dashboard</h1>
            <button
              onClick={handleNewPost}
              className="px-4 py-2 bg-[#0ceef3] text-black rounded hover:bg-[#0ceef3]/90 transition-colors"
            >
              New Post
            </button>
          </div>

          {error && (
            <div className="bg-red-500/10 border border-red-500 text-red-500 px-4 py-2 rounded mb-4">
              {error}
            </div>
          )}

          {posts.length === 0 ? (
            <p className="text-gray-400">No posts found. Create your first post to get started.</p>
          ) : (
            <div className="space-y-4">
              {posts.map((post) => (
                <div
                  key={post.id}
                  className="bg-gray-800/50 border border-gray-700 rounded p-4 hover:border-[#0ceef3]/50 transition-colors"
                >
                  <div className="flex justify-between items-start">
                    <div>
                      <h2 className="text-xl font-semibold text-[#0ceef3]">{post.title}</h2>
                      <p className="text-gray-400 mt-1">{post.excerpt}</p>
                    </div>
                    <button
                      onClick={() => handleEditPost(post.id)}
                      className="px-3 py-1 text-sm bg-gray-700 text-white rounded hover:bg-gray-600 transition-colors"
                    >
                      Edit
                    </button>
                  </div>
                  <div className="mt-2 text-sm text-gray-500">
                    Last updated: {new Date(post.updatedAt).toLocaleDateString()}
                  </div>
                </div>
              ))}
            </div>
          )}
        </div>
      </div>
    </div>
  );
} 