'use client';

import { useEffect, useState } from 'react';
import { useRouter } from 'next/navigation';
import TerminalMenu from '@/components/terminal-menu';
import Image from 'next/image';
import { XMarkIcon } from '@heroicons/react/24/solid';

export default function NewPostPage() {
  const router = useRouter();
  const [isLoading, setIsLoading] = useState(true);
  const [title, setTitle] = useState('');
  const [content, setContent] = useState('');
  const [image, setImage] = useState<File | null>(null);
  const [previewUrl, setPreviewUrl] = useState<string | null>(null);
  const [isUploading, setIsUploading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    // Verify authentication
    const checkAuth = async () => {
      try {
        const response = await fetch('/api/auth/user');
        if (!response.ok) {
          router.push('/gridgate');
        }
      } catch (error) {
        console.error('Auth check failed:', error);
        router.push('/gridgate');
      } finally {
        setIsLoading(false);
      }
    };

    checkAuth();
  }, [router]);

  const handleImageChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      setImage(file);
      // Create preview URL
      const url = URL.createObjectURL(file);
      setPreviewUrl(url);
    }
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsUploading(true);
    setError(null);

    try {
      // First upload the image if one is selected
      let featuredImage = '';
      if (image) {
        const formData = new FormData();
        formData.append('image', image);
        
        console.log('Uploading image...');
        const uploadResponse = await fetch('/api/upload', {
          method: 'POST',
          body: formData,
        });
        
        console.log('Upload response status:', uploadResponse.status);
        const responseText = await uploadResponse.text();
        console.log('Upload response text:', responseText);
        
        if (!uploadResponse.ok) {
          throw new Error(`Failed to upload image: ${responseText}`);
        }
        
        const uploadData = JSON.parse(responseText);
        featuredImage = uploadData.imageUrl;
      }

      // Then create the post with the image URL
      console.log('Creating post with data:', {
        title,
        content: content.substring(0, 100) + '...', // Log first 100 chars
        featuredImage,
        status: 'published',
        metaDescription: content.substring(0, 160)
      });

      const response = await fetch('/api/posts', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          title,
          content,
          featuredImage,
          status: 'published',
          metaDescription: content.substring(0, 160),
        }),
      });

      console.log('Post creation response status:', response.status);
      const responseText = await response.text();
      console.log('Post creation response text:', responseText);

      if (!response.ok) {
        throw new Error(`Failed to create post: ${responseText}`);
      }

      const data = JSON.parse(responseText);
      console.log('Post created successfully:', data);
      router.push('/posts');
    } catch (error) {
      console.error('Failed to create post:', error);
      setError(error instanceof Error ? error.message : 'Failed to create post');
    } finally {
      setIsUploading(false);
    }
  };

  if (isLoading) {
    return (
      <div className="min-h-screen bg-black text-white p-8">
        <div className="max-w-4xl mx-auto">
          <div className="flex justify-end mb-8">
            <TerminalMenu />
          </div>
          <div className="text-[#0ceef3]">Loading...</div>
        </div>
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
          <h1 className="text-2xl font-bold text-[#0ceef3] mb-6">Create New Post</h1>
          
          {error && (
            <div className="mb-6 bg-red-500/10 border border-red-500 text-red-500 px-4 py-2 rounded">
              {error}
            </div>
          )}

          <form onSubmit={handleSubmit} className="space-y-6">
            <div>
              <label htmlFor="title" className="block text-sm font-medium mb-2">
                Title
              </label>
              <input
                type="text"
                id="title"
                value={title}
                onChange={(e) => setTitle(e.target.value)}
                className="w-full px-4 py-2 rounded bg-gray-900 border border-gray-800 text-white focus:outline-none focus:border-[#0ceef3]"
                placeholder="Enter post title"
                required
              />
            </div>

            <div>
              <label htmlFor="image" className="block text-sm font-medium mb-2">
                Featured Image
              </label>
              <div className="space-y-4">
                <input
                  type="file"
                  id="image"
                  accept="image/*"
                  onChange={handleImageChange}
                  className="w-full px-4 py-2 rounded bg-gray-900 border border-gray-800 text-white focus:outline-none focus:border-[#0ceef3]"
                />
                {previewUrl && (
                  <div className="relative w-full h-48 rounded-lg overflow-hidden">
                    <Image
                      src={previewUrl}
                      alt="Preview"
                      fill
                      className="object-cover"
                    />
                    <button
                      type="button"
                      aria-label="Remove image"
                      className="absolute top-2 right-2 bg-black/60 hover:bg-black/80 text-white rounded-full p-1 z-10"
                      onClick={() => {
                        setImage(null);
                        setPreviewUrl(null);
                      }}
                    >
                      <XMarkIcon className="h-6 w-6" />
                    </button>
                  </div>
                )}
              </div>
            </div>

            <div>
              <label htmlFor="content" className="block text-sm font-medium mb-2">
                Content
              </label>
              <textarea
                id="content"
                value={content}
                onChange={(e) => setContent(e.target.value)}
                rows={10}
                className="w-full px-4 py-2 rounded bg-gray-900 border border-gray-800 text-white focus:outline-none focus:border-[#0ceef3]"
                placeholder="Write your post content here..."
                required
              />
            </div>

            <div className="flex justify-end">
              <button
                type="submit"
                disabled={isUploading}
                className="px-6 py-2 rounded bg-[#0ceef3] text-black font-medium hover:bg-[#0ceef3]/90 transition-colors disabled:opacity-50 disabled:cursor-not-allowed"
              >
                {isUploading ? 'Publishing...' : 'Publish Post'}
              </button>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
} 