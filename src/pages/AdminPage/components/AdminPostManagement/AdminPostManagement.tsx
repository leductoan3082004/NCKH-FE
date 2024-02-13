import { useQuery } from '@tanstack/react-query'
import postApi from 'src/apis/post.api'
import LoadingRing from 'src/components/LoadingRing'
import SearchBar from 'src/components/SearchBar'
import SortByCategory from 'src/components/SortByCategory'
import SortByTags from 'src/components/SortByTags'
import usePostListQueryConfig from 'src/hooks/usePostListQueryConfig'
import { PostListConfig } from 'src/types/post.type'
import AdminPost from '../AdminPost'
import { useEffect } from 'react'

export default function AdminPostManagement() {
  //? After navigated
  useEffect(() => {
    document.title = 'Quản lí bài viết'
  })

  //? GET POST LIST
  const queryConfigForPosts = usePostListQueryConfig()
  const { data: postsData, isFetching } = useQuery({
    queryKey: ['admin-post-list', queryConfigForPosts],
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
              <AdminPost post={post} />
            </div>
          ))}
      </div>
    </div>
  )
}
