'use client';

import { useState } from 'react';

export default function TestUpload() {
  const [imageUrl, setImageUrl] = useState<string>('');
  const [error, setError] = useState<string>('');
  const [isLoading, setIsLoading] = useState(false);

  const handleUpload = async (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;

    setIsLoading(true);
    setError('');

    try {
      const formData = new FormData();
      formData.append('image', file);

      const response = await fetch('/api/upload', {
        method: 'POST',
        body: formData,
      });

      const data = await response.json();

      if (!response.ok) {
        throw new Error(data.error || 'Upload failed');
      }

      console.log('Upload successful:', data);
      setImageUrl(data.imageUrl);
    } catch (err) {
      console.error('Upload error:', err);
      setError(err instanceof Error ? err.message : 'Upload failed');
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-white dark:bg-black p-8">
      <div className="max-w-2xl mx-auto">
        <h1 className="text-2xl font-bold mb-6">Test Cloudinary Upload</h1>
        
        <div className="space-y-4">
          <div className="border-2 border-dashed border-gray-300 dark:border-gray-700 rounded-lg p-6">
            <input
              type="file"
              accept="image/*"
              onChange={handleUpload}
              disabled={isLoading}
              className="block w-full text-sm text-gray-500 dark:text-gray-400
                file:mr-4 file:py-2 file:px-4
                file:rounded-full file:border-0
                file:text-sm file:font-semibold
                file:bg-[#0ceef3] file:text-black
                hover:file:bg-[#0ceef3]/90"
            />
          </div>

          {isLoading && (
            <div className="text-center text-gray-500 dark:text-gray-400">
              Uploading...
            </div>
          )}

          {error && (
            <div className="bg-red-500/10 border border-red-500 text-red-500 px-4 py-2 rounded">
              {error}
            </div>
          )}

          {imageUrl && (
            <div className="space-y-2">
              <h2 className="text-lg font-semibold">Uploaded Image:</h2>
              <div className="relative aspect-video w-full overflow-hidden rounded-lg">
                <img
                  src={imageUrl}
                  alt="Uploaded"
                  className="object-cover w-full h-full"
                />
              </div>
              <div className="text-sm text-gray-500 dark:text-gray-400 break-all">
                URL: {imageUrl}
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
} 