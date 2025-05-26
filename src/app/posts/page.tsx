import Link from "next/link";

export default function PostsPage() {
  // Sample posts data - this will be replaced with actual data from the database
  const posts = [
    {
      id: 1,
      title: "Getting Started with Next.js 14",
      excerpt: "Learn how to build modern web applications with Next.js 14 and its new features.",
      date: "2024-03-20",
      slug: "getting-started-with-nextjs-14"
    },
    {
      id: 2,
      title: "Understanding TypeScript",
      excerpt: "A comprehensive guide to TypeScript and its benefits for modern web development.",
      date: "2024-03-19",
      slug: "understanding-typescript"
    },
    {
      id: 3,
      title: "Building with Tailwind CSS",
      excerpt: "How to create beautiful and responsive designs using Tailwind CSS.",
      date: "2024-03-18",
      slug: "building-with-tailwind-css"
    }
  ];

  return (
    <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
      <h1 className="text-4xl font-bold mb-8">Blog Posts</h1>
      <div className="space-y-8">
        {posts.map((post) => (
          <article key={post.id} className="border-b border-gray-200 dark:border-gray-800 pb-8">
            <Link href={`/posts/${post.slug}`} className="block">
              <h2 className="text-2xl font-bold mb-2 hover:text-gray-900 dark:hover:text-[#0ceef3]">
                {post.title}
              </h2>
              <p className="text-gray-600 dark:text-gray-400 mb-2">
                {post.excerpt}
              </p>
              <time className="text-sm text-gray-500 dark:text-gray-500">
                {new Date(post.date).toLocaleDateString('en-US', {
                  year: 'numeric',
                  month: 'long',
                  day: 'numeric'
                })}
              </time>
            </Link>
          </article>
        ))}
      </div>
    </div>
  );
} 