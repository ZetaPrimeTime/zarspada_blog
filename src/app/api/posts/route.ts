import { NextRequest, NextResponse } from 'next/server';
import { prisma } from '@/lib/prisma';
import { getCurrentUser } from '@/lib/auth';

export const dynamic = 'force-dynamic';
export const revalidate = 0;

export async function GET(request: NextRequest) {
  try {
    console.log('=== Posts API: GET Request ===');
    const user = await getCurrentUser();
    
    if (!user) {
      console.log('Unauthorized: No user found');
      return NextResponse.json(
        { error: 'Unauthorized' },
        { status: 401 }
      );
    }

    console.log('User found:', user.username);

    // First find the user by username
    const dbUser = await prisma.user.findFirst({
      where: {
        name: user.username
      }
    });

    if (!dbUser) {
      console.log('User not found in database');
      return NextResponse.json(
        { error: 'User not found' },
        { status: 404 }
      );
    }

    console.log('Database user found:', dbUser.id);

    const posts = await prisma.post.findMany({
      where: {
        authorId: dbUser.id,
      },
      orderBy: {
        createdAt: 'desc',
      },
      select: {
        id: true,
        title: true,
        content: true,
        published: true,
        createdAt: true,
        updatedAt: true,
        author: {
          select: {
            name: true
          }
        }
      },
    });

    console.log('Posts found:', posts.length);
    return NextResponse.json(posts);
  } catch (error) {
    console.error('Error fetching posts:', error);
    return NextResponse.json(
      { error: 'Internal server error' },
      { status: 500 }
    );
  }
}

export async function POST(request: NextRequest) {
  try {
    console.log('=== Posts API: POST Request ===');
    const user = await getCurrentUser();
    
    if (!user) {
      console.log('Unauthorized: No user found');
      return NextResponse.json(
        { error: 'Unauthorized' },
        { status: 401 }
      );
    }

    console.log('User found:', user.username);

    // First find the user by username
    const dbUser = await prisma.user.findFirst({
      where: {
        name: user.username
      }
    });

    if (!dbUser) {
      console.log('User not found in database');
      return NextResponse.json(
        { error: 'User not found' },
        { status: 404 }
      );
    }

    console.log('Database user found:', dbUser.id);

    const body = await request.json();
    const { title, content, status = 'draft', tags = [], featuredImage, metaDescription } = body;

    if (!title || !content) {
      console.log('Missing required fields');
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
        authorId: dbUser.id,
        tags: {
          connect: tags.map((tagId: string) => ({ id: tagId }))
        },
      },
      include: {
        author: {
          select: {
            name: true
          }
        },
        tags: true,
      },
    });

    console.log('Post created:', post.id);
    return NextResponse.json({ success: true, data: post });
  } catch (error) {
    console.error('Error creating post:', error);
    return NextResponse.json(
      { error: 'Internal server error' },
      { status: 500 }
    );
  }
} 