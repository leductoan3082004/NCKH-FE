import { useQuery } from '@tanstack/react-query'
import postApi from 'src/apis/post.api'
import { PostListQueryConfig } from 'src/hooks/usePostListQueryConfig'
import LoadingSection from '../LoadingSection'
import Post from '../Post'
import { NavLink } from 'react-router-dom'

interface Props {
  title: string
  category: string
  limit: number
  url: string
}

export default function CustomPostList({ title, category, limit, url }: Props) {
  //! GET POST LIST
  const customPostListConfig: PostListQueryConfig = { category: category, limit: limit.toString() }
  const { data: postListData } = useQuery({
    queryKey: ['custom-list', customPostListConfig],
    queryFn: () => {
      return postApi.getPostList(customPostListConfig)
    },
    staleTime: 1000 * 60 * 3
  })

  return (
    <div className='space-y-6 px-2 desktop:px-4 py-4'>
      <NavLink
        to={url}
        className='flex hover:text-primaryBlue items-center justify-center uppercase text-xl tablet:text-2xl desktop:text-3xl text-mainBlue500 font-medium'
      >
        {title}
      </NavLink>
      {!postListData && <LoadingSection />}
      {postListData && postListData.data.data.length > 0 && (
        <div className='grid grid-cols-1 gap-2 tablet:grid-cols-2 tablet:gap-4 desktop:gap-6'>
          {postListData.data.data.map((post) => {
            if (post.category[0] == 'Giới thiệu trang web') return
            return (
              <div key={post._id} className=''>
                <Post post={post} />
              </div>
            )
          })}
        </div>
      )}
    </div>
  )
}
