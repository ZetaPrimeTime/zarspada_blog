import { Metadata } from 'next';
import Link from 'next/link';

export const metadata: Metadata = {
  title: 'Search Results | Zarspada Blog',
  description: 'Search results for blog posts',
};

// This will be replaced with actual database search
const searchPosts = (query: string) => {
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

  const searchQuery = query.toLowerCase();
  return Object.entries(posts)
    .filter(([_, post]) => 
      post.title.toLowerCase().includes(searchQuery) || 
      post.content.toLowerCase().includes(searchQuery)
    )
    .map(([slug, post]) => ({ slug, ...post }));
};

interface SearchPageProps {
  searchParams: { q?: string };
}

export default function SearchPage({ searchParams }: SearchPageProps) {
  const query = searchParams.q || '';
  const results = query ? searchPosts(query) : [];

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
            {results.length} {results.length === 1 ? 'result' : 'results'} found
          </p>
        </header>

        {results.length > 0 ? (
          <section className="grid gap-8">
            {results.map((post) => (
              <article 
                key={post.slug}
                className="border border-[#0ceef3]/20 rounded-lg p-6 hover:shadow-lg transition-shadow bg-black"
              >
                <h2 className="text-2xl font-semibold mb-2 text-white">
                  {post.title}
                </h2>
                <p className="text-gray-300 mb-4">
                  {post.content}
                </p>
                <div className="flex justify-between items-center">
                  <span className="text-sm text-gray-400">
                    {new Date(post.date).toLocaleDateString('en-US', {
                      year: 'numeric',
                      month: 'long',
                      day: 'numeric'
                    })}
                  </span>
                  <Link 
                    href={`/posts/${post.slug}`}
                    className="text-[#0ceef3] hover:text-[#0ceef3]/80"
                  >
                    Read more →
                  </Link>
                </div>
              </article>
            ))}
          </section>
        ) : query ? (
          <div className="text-center py-12">
            <p className="text-gray-300 text-lg">
              No posts found matching "{query}"
            </p>
          </div>
        ) : null}
      </div>
    </main>
  );
} 