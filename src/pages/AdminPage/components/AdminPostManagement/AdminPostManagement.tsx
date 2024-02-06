import { useQuery } from '@tanstack/react-query'
import postApi from 'src/apis/post.api'
import LoadingRing from 'src/components/LoadingRing'
import Post from 'src/components/Post'
import useQueryConfigForPosts from 'src/hooks/useQueryConfigForPosts'
import { PostListConfig } from 'src/types/post.type'

export default function AdminPostManagement() {
  //? GET POST LIST
  const queryConfigForPosts = useQueryConfigForPosts()
  const { data: postsData, isFetching } = useQuery({
    queryKey: ['adminPostList', queryConfigForPosts],
    queryFn: () => {
      return postApi.getPostList(queryConfigForPosts as PostListConfig)
    },
    staleTime: 3 * 60 * 1000
  })
  return (
    <div>
      <div className='grid grid-cols-1 gap-2 tablet:grid-cols-2 tablet:gap-3 desktop:gap-4'>
        {isFetching && (
          <div className='col-span-1 tablet:col-span-2 h-80 flex items-center justify-center'>
            <LoadingRing />
          </div>
        )}
        {!isFetching &&
          postsData &&
          postsData.data.data.map((post) => (
            <div className='col-span-1' key={post._id}>
              <Post post={post} />
            </div>
          ))}
      </div>
    </div>
  )
}
