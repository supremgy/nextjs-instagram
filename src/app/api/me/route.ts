import { withSessionUser } from '@/util/session';
import { NextResponse } from 'next/server';
import { getUserByUsername } from '@/service/user';

export async function GET() {
  return withSessionUser(async (user) => {
    return getUserByUsername(user.username).then((data) =>
      NextResponse.json(data)
    );
  });
}
