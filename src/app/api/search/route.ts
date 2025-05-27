import { NextRequest, NextResponse } from 'next/server';

export const dynamic = 'force-dynamic';

// Pre-rendered posts data
const preRenderedPosts = {
  "getting-started-with-nextjs-14": {
    id: "getting-started-with-nextjs-14",
    title: "Getting Started with Next.js 14",
    content: "This is a sample post about getting started with Next.js 14...",
    createdAt: "2024-03-20",
    author: {
      name: "Admin"
    }
  },
  "understanding-typescript": {
    id: "understanding-typescript",
    title: "Understanding TypeScript",
    content: "This is a sample post about understanding TypeScript...",
    createdAt: "2024-03-19",
    author: {
      name: "Admin"
    }
  },
  "building-with-tailwind-css": {
    id: "building-with-tailwind-css",
    title: "Building with Tailwind CSS",
    content: "This is a sample post about building with Tailwind CSS...",
    createdAt: "2024-03-18",
    author: {
      name: "Admin"
    }
  }
};

export async function GET(request: NextRequest) {
  try {
    console.log('=== Search API: Processing Request ===');
    const searchParams = request.nextUrl.searchParams;
    const query = searchParams.get('q');
    console.log('Search query:', query);

    if (!query) {
      console.log('No query provided, returning empty results');
      return NextResponse.json({ posts: [] });
    }

    // Search in pre-rendered posts
    console.log('Searching in pre-rendered posts...');
    const searchQuery = query.toLowerCase();
    const staticPosts = Object.values(preRenderedPosts)
      .filter(post => 
        post.title.toLowerCase().includes(searchQuery) || 
        post.content.toLowerCase().includes(searchQuery)
      );
    console.log('Static search results:', staticPosts.length);

    return NextResponse.json({ posts: staticPosts });
  } catch (error) {
    console.error('Search API error:', error);
    return NextResponse.json(
      { error: 'Failed to perform search', details: error instanceof Error ? error.message : 'Unknown error' },
      { status: 500 }
    );
  }
} 