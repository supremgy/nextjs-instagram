import UserProfile from '@/components/UserProfile';
import { getUserForProfile } from '@/service/user';
import { notFound } from 'next/navigation';
import UserPosts from '@/components/UserPosts';
import { Metadata } from 'next';
import { cache } from 'react';
type Props = {
  params: { username: string };
};
const getUser = cache(async (username: string) => getUserForProfile(username));
export default async function UserPage({ params: { username } }: Props) {
  //상단 : 사용자의 프로필 이미지와 정보 (username, name,숫자)
  //하단: 3개의 탭 (posts,liked, bookmarks)
  const user = await getUser(username);
  if (!user) {
    notFound();
  }

  return (
    <section className='w-full'>
      <UserProfile user={user} />
      <UserPosts user={user} />
    </section>
  );
}

export async function generateMetadata({
  params: { username },
}: Props): Promise<Metadata> {
  const user = await getUser(username);
  return {
    title: `${user?.name} (@${user?.username}) ∙ Instagram Photos`,
    description: `${user?.name}'s all Instagram posts`,
  };
}
