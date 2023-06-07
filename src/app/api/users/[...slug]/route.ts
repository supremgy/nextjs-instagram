import { getLikedPostOf, getPostsOf, getSavedPostOf } from '@/service/posts';
import { NextRequest, NextResponse } from 'next/server';
type Context = {
  params: {
    slug: string[];
  };
};
export async function GET(_: NextRequest, context: Context) {
  const { slug } = context.params;

  if (!slug || !Array.isArray(slug) || slug.length < 2) {
    return new NextResponse('Bad Request', { status: 400 });
  }
  const [username, query] = slug;
  let request = getPostsOf;
  if (query === 'saved') {
    request = getSavedPostOf;
  } else if (query === 'liked') {
    request = getLikedPostOf;
  }

  return request(username).then((data) => NextResponse.json(data));
}
