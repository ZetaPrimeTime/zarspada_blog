import { NextResponse } from 'next/server';
import { prisma } from '@/lib/prisma';
import { getCurrentUser } from '@/lib/auth';

export async function GET() {
  try {
    const user = await getCurrentUser();
    
    if (!user) {
      return NextResponse.json(
        { error: 'Unauthorized' },
        { status: 401 }
      );
    }

    const posts = await prisma.post.findMany({
      where: {
        authorId: user.username, // Using username as authorId since we don't have numeric IDs
      },
      orderBy: {
        createdAt: 'desc',
      },
      select: {
        id: true,
        title: true,
        excerpt: true,
        published: true,
        createdAt: true,
        updatedAt: true,
      },
    });

    return NextResponse.json(posts);
  } catch (error) {
    console.error('Error fetching posts:', error);
    return NextResponse.json(
      { error: 'Internal server error' },
      { status: 500 }
    );
  }
}

export async function POST(req: Request) {
  try {
    const user = await getCurrentUser();
    
    if (!user) {
      return NextResponse.json(
        { error: 'Unauthorized' },
        { status: 401 }
      );
    }

    const body = await req.json();
    const { title, content, status = 'draft', tags = [], featuredImage, metaDescription } = body;

    if (!title || !content) {
      return NextResponse.json(
        { error: 'Title and content are required' },
        { status: 400 }
      );
    }

    const post = await prisma.post.create({
      data: {
        title,
        content,
        published: status === 'published',
        authorId: user.username, // Using username as authorId
        tags: {
          connect: tags.map((tagId: string) => ({ id: tagId }))
        },
        // Add other fields as needed
      },
      include: {
        author: true,
        tags: true,
      },
    });

    return NextResponse.json({ success: true, data: post });
  } catch (error) {
    console.error('Error creating post:', error);
    return NextResponse.json(
      { error: 'Internal server error' },
      { status: 500 }
    );
  }
} 