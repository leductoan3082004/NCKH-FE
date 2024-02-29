import { useQuery } from '@tanstack/react-query'
import postApi from 'src/apis/post.api'
import SearchBar from 'src/components/SearchBar'
import SortByCategory from 'src/components/SortByCategory'
import SortByTags from 'src/components/SortByTags'
import usePostListQueryConfig, { POST_LIMIT } from 'src/hooks/usePostListQueryConfig'
import { PostListConfig } from 'src/types/post.type'
import AdminPost from '../../components/AdminPost'
import { Fragment, useEffect } from 'react'
import LoadingSection from 'src/components/LoadingSection'
import UsePagination from 'src/components/UsePagination'
import { useViewport } from 'src/hooks/useViewport'
import { ceil } from 'lodash'

export default function AdminPostManagement() {
  const isMobile = useViewport().width < 768

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
          <SearchBar administrator />
        </div>
      </div>
      <div className='w-full'>
        {isFetching && <LoadingSection />}
        {postsData && (
          <Fragment>
            <div className='grid grid-cols-1 w-full mt-2 gap-2 tablet:grid-cols-2 tablet:gap-3 desktop:gap-4'>
              {postsData.data.data.map((post) => (
                <div className='col-span-1' key={post._id}>
                  <AdminPost post={post} />
                </div>
              ))}
            </div>
            <UsePagination totalPage={ceil(postsData.data.paging.total / POST_LIMIT)} isMobile={isMobile} />
          </Fragment>
        )}
      </div>
    </div>
  )
}
