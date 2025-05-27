'use client';

import { useEffect, useState } from 'react';
import { useRouter } from 'next/navigation';
import TerminalMenu from '@/components/terminal-menu';
import { Post } from '@/types/post';

export default function DashboardPage() {
  const router = useRouter();
  const [posts, setPosts] = useState<Post[]>([]);
  const [error, setError] = useState('');
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    const fetchPosts = async () => {
      console.log('=== Dashboard: Fetching Posts ===');
      try {
        // First check if user is authenticated
        const authResponse = await fetch('/api/auth/user', {
          credentials: 'include',
          cache: 'no-store'
        });

        if (!authResponse.ok) {
          console.log('User not authenticated, redirecting to login');
          router.replace('/gridgate');
          return;
        }

        // If authenticated, fetch posts
        const response = await fetch('/api/posts', {
          method: 'GET',
          headers: {
            'Accept': 'application/json',
          },
          credentials: 'include',
          cache: 'no-store'
        });
        
        console.log('Posts response:', {
          status: response.status,
          ok: response.ok,
          headers: Object.fromEntries(response.headers.entries())
        });

        if (!response.ok) {
          if (response.status === 401) {
            console.log('Unauthorized, redirecting to login');
            router.replace('/gridgate');
            return;
          }
          const errorText = await response.text();
          console.error('Error response:', errorText);
          setError('Failed to load posts');
          return;
        }

        const contentType = response.headers.get('content-type');
        if (!contentType || !contentType.includes('application/json')) {
          console.error('Invalid content type:', contentType);
          setError('Invalid response format from server');
          return;
        }

        const data = await response.json();
        console.log('Posts data:', data);
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

  const handleCreatePost = () => {
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
              onClick={handleCreatePost}
              className="px-4 py-2 bg-[#0ceef3]/10 hover:bg-[#0ceef3]/20 text-[#0ceef3] rounded border border-[#0ceef3]/20"
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
            <div className="text-gray-400 text-center py-8">
              No posts found. Click "New Post" to create your first post.
            </div>
          ) : (
            <div className="space-y-4">
              {posts.map((post) => (
                <div
                  key={post.id}
                  className="bg-gray-900/30 border border-[#0ceef3]/10 rounded p-4 hover:border-[#0ceef3]/30 transition-colors"
                >
                  <div className="flex justify-between items-start">
                    <div>
                      <h2 className="text-lg font-medium text-[#0ceef3]">{post.title}</h2>
                      <p className="text-sm text-gray-500 mt-1">
                        By {post.author.name} • {new Date(post.createdAt).toLocaleDateString()}
                      </p>
                    </div>
                    <button
                      onClick={() => handleEditPost(post.id)}
                      className="text-sm text-gray-400 hover:text-[#0ceef3] transition-colors"
                    >
                      Edit
                    </button>
                  </div>
                  <p className="text-gray-400 mt-2">{post.content.substring(0, 150)}...</p>
                </div>
              ))}
            </div>
          )}
        </div>
      </div>
    </div>
  );
} 