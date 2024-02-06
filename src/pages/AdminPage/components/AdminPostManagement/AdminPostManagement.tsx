import { useQuery } from '@tanstack/react-query'
import { useLocation } from 'react-router-dom'
import postApi from 'src/apis/post.api'
import LoadingRing from 'src/components/LoadingRing'
import Post from 'src/components/Post'
import SearchBar from 'src/components/SearchBar'
import SortByCategory from 'src/components/SortByCategory'
import SortByTags from 'src/components/SortByTags'
import { adminPath } from 'src/constants/path'
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
    <div className='relative'>
      <div className='sticky top-0 w-full bg-white rounded-md p-2 shadow-md z-10 grid grid-cols-1 tablet:grid-cols-3 gap-2 '>
        <div className='col-span-1'>
          <SortByCategory />
        </div>
        <div className='col-span-1'>
          <SortByTags />
        </div>
        <div className='col-span-1'>
          <SearchBar />
        </div>
      </div>
      <div className='grid grid-cols-1 mt-2 gap-2 tablet:grid-cols-2 tablet:gap-3 desktop:gap-4'>
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
