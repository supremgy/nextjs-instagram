import { withSessionUser } from '@/util/session';
import { NextRequest, NextResponse } from 'next/server';
import { getPost } from '@/service/posts';

type Context = {
  params: { id: string };
};
export async function GET(request: NextRequest, context: Context) {
  return withSessionUser(async () => {
    return getPost(context.params.id).then((data) => NextResponse.json(data));
  });
}
