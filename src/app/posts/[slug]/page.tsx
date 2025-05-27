import { notFound } from "next/navigation";
import Link from "next/link";

// This will be replaced with actual data fetching from the database
const getPost = (slug: string) => {
  const posts = {
    "getting-started-with-nextjs-14": {
      title: "Getting Started with Next.js 14",
      content: "This is a sample post about getting started with Next.js 14...",
      date: "2024-03-20",
    },
    "understanding-typescript": {
      title: "Understanding TypeScript",
      content: "This is a sample post about understanding TypeScript...",
      date: "2024-03-19",
    },
    "building-with-tailwind-css": {
      title: "Building with Tailwind CSS",
      content: "This is a sample post about building with Tailwind CSS...",
      date: "2024-03-18",
    },
  };

  return posts[slug as keyof typeof posts];
};

type Props = {
  params: { slug: string }
  searchParams: { [key: string]: string | string[] | undefined }
}

export default async function PostPage({ params }: Props) {
  const post = getPost(params.slug);

  if (!post) {
    notFound();
  }

  return (
    <article className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
      <Link 
        href="/posts" 
        className="inline-block mb-8 text-sm hover:text-gray-900 dark:hover:text-[#0ceef3]"
      >
        ← Back to Posts
      </Link>
      
      <h1 className="text-4xl font-bold mb-4 text-white">{post.title}</h1>
      
      <time className="block text-gray-400 mb-8">
        {new Date(post.date).toLocaleDateString('en-US', {
          year: 'numeric',
          month: 'long',
          day: 'numeric'
        })}
      </time>

      <div className="prose dark:prose-invert max-w-none text-gray-300">
        {post.content}
      </div>
    </article>
  );
} 