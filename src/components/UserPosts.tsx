'use client';
import { ProfileUser } from '@/model/user';
import { useState } from 'react';

import BookmarkIcon from './ui/icons/BookmarkIcon';
import HeartIcon from './ui/icons/HeartIcon';
import PostIcon from './ui/icons/PostIcon';
import PostGrid from './PostGrid';
import { CachekeysContext } from '@/context/CacheKeysContext';
type Props = {
  user: ProfileUser;
};
const tabs = [
  {
    type: 'posts',
    icon: <PostIcon />,
  },
  {
    type: 'saved',
    icon: <BookmarkIcon className='w-3 h-3' />,
  },
  {
    type: 'liked',
    icon: <HeartIcon className='w-3 h-3' />,
  },
];
export default function UserPosts({ user: { username } }: Props) {
  // /api/users/${username}/posts
  // /api/users/${username}/liked
  // /api/users/${username}/bookmarks
  const [query, setQuery] = useState(tabs[0].type);

  return (
    <section>
      <ul className='flex justify-center uppercase'>
        {tabs.map(({ type, icon }) => (
          <li
            className={`mx-12 p-4 cursor-pointer border-black${
              type === query && 'font-bold border-t'
            }`}
            key={type}
            onClick={() => setQuery(type)}
          >
            <button className='scale-150 md:scale-100'>{icon}</button>
            <span className='hidden md:inline'>{type}</span>
          </li>
        ))}
      </ul>
      <CachekeysContext.Provider
        value={{ postsKey: `/api/users/${username}/${query}` }}
      >
        <PostGrid />
      </CachekeysContext.Provider>
    </section>
  );
}
