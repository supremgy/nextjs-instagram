import { withSessionUser } from '@/util/session';
import { NextRequest, NextResponse } from 'next/server';
import { createPost, getFollowingPostsOf } from '@/service/posts';

export async function GET() {
  return withSessionUser(async (user) => {
    return getFollowingPostsOf(user.username).then((data) =>
      NextResponse.json(data)
    );
  });
}

export async function POST(req: NextRequest) {
  return withSessionUser(async (user) => {
    const form = await req.formData();
    const text = form.get('text')?.toString();
    const file = form.get('file') as Blob;

    if (!text || !file) {
      return new Response('Bad Request', { status: 400 });
    }

    return createPost(user.id, text, file) //
      .then((data) => NextResponse.json(data));
  });
}
