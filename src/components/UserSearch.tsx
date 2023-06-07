'use client';
import { SearchUser } from '@/model/user';
import React, { FormEvent, useState } from 'react';
import useSWR from 'swr';
import GridSpinner from './ui/GridSpinner';
import UserCard from './UserCard';
import useDebounce from '@/hooks/debounce';
export default function UserSearch() {
  // /api/search/${keyword}
  // 검색하는 keyword가 있다면 /api/search/bob -> 유저네임이나, 이름
  // 검색하는 keyword가 없다면 /api/search ->전체유저
  const [keyword, setKeyword] = useState('');
  const debouncedKeyword = useDebounce(keyword);
  const {
    data: users,
    isLoading,
    error,
  } = useSWR<SearchUser[]>(`/api/search/${debouncedKeyword}`);
  const onSubmit = (e: FormEvent) => {
    e.preventDefault();
  };
  return (
    <section className='w-full max-w-2xl my-4 flex flex-col items-center'>
      <form className='w-full mb-4' onSubmit={onSubmit}>
        <input
          className='w-full text-xl p-3 outline-none border border-gray-400'
          type='text'
          autoFocus
          placeholder='Search for a username or name'
          value={keyword}
          onChange={(e) => setKeyword(e.target.value)}
        />
      </form>
      {error && <p>somethings wrong</p>}
      {isLoading && <GridSpinner />}
      {!isLoading && !error && users?.length === 0 && <p>찾는 유저가 없음</p>}
      <ul className='w-full p-4'>
        {users &&
          users?.map((user) => (
            <li key={user.username}>
              <UserCard user={user} />
            </li>
          ))}
      </ul>
    </section>
  );
}
