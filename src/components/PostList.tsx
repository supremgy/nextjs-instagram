'use client';
import PostListCard from './PostListCard';
import GridSpinner from './ui/GridSpinner';
import usePosts from '@/hooks/posts';
export default function PostList() {
  const { posts, isLoading: loading } = usePosts();

  return (
    <section>
      {loading && (
        <div className='text-center mt-32'>
          <GridSpinner color='red' />
        </div>
      )}
      {posts && (
        <ul>
          {posts &&
            posts.map((post, index) => (
              <li key={post.id} className='mb-4'>
                <PostListCard post={post} priority={index < 2} />
              </li>
            ))}
        </ul>
      )}
    </section>
  );
}
