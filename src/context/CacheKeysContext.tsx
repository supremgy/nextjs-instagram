import { createContext, useContext } from 'react';

type CachekeysValue = {
  postsKey: string;
};
export const CachekeysContext = createContext<CachekeysValue>({
  postsKey: '/api/posts',
});

export const useCacheKeys = () => useContext(CachekeysContext);
