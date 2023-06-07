'use client';
import { ProfileUser } from '@/model/user';
import Button from './ui/Button';
import useMe from '@/hooks/me';
import { useState, useTransition } from 'react';
import { useRouter } from 'next/navigation';
import { PulseLoader } from 'react-spinners';
type Props = {
  user: ProfileUser;
};
export default function FollowButton({ user }: Props) {
  const { username } = user;
  const { user: loggedInUser, toggleFollow } = useMe();
  const router = useRouter();
  const [isPeding, startTransition] = useTransition();
  const [isFetchigng, setIsFetching] = useState(false);
  const isUpdating = isPeding || isFetchigng;
  const showButton = loggedInUser && loggedInUser.username !== username;
  const following =
    loggedInUser &&
    loggedInUser.following.find((item) => item.username == username);

  const text = following ? 'Unfollow' : 'Follow';

  const handleFollow = async () => {
    setIsFetching(true);
    await toggleFollow(user.id, !following);
    setIsFetching(false);
    startTransition(() => {
      router.refresh();
    });
  };
  return (
    <>
      {showButton && (
        <div className='relative'>
          {isUpdating && (
            <div className='absolute z-20 inset-0 flex justify-center items-center'>
              <PulseLoader size={6} />
            </div>
          )}
          <Button
            disabled={isUpdating}
            text={text}
            onClick={handleFollow}
            red={text === 'Unfollow'}
          />
        </div>
      )}
    </>
  );
}
