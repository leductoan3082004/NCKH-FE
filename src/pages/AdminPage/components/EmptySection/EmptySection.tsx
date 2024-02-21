import { useQuery } from '@tanstack/react-query'
import postApi from 'src/apis/post.api'
import SuggestedPostList from 'src/components/SuggestedPostList'
import { PostListConfig } from 'src/types/post.type'

export default function EmptySection() {
  //! GET POST LIST
  const postListConfig = {} as PostListConfig

  const { data: postListData } = useQuery({
    queryKey: ['post-list', postListConfig],
    queryFn: () => {
      return postApi.getPostList(postListConfig as PostListConfig)
    },
    staleTime: 1000 * 60 * 3
  })
  const firstPost = postListData?.data.data[0]
  const { tag, content } = postListConfig

  return (
    <div className='min-h-96 w-full'>
      <div className='py-10 uppercase text-alertRed tablet:py-12 text-center w-full desktop:py-20 font-bold text-xl tablet:text-2xl desktop:text-3xl'>
        Không thể tìm thấy bài viết bạn đang cần
      </div>
      <div className='py-10  tablet:py-12 text-center w-full desktop:py-20 '>
        <p className='uppercase  font-medium text-lg tablet:text-xl desktop:text-2xl'>
          Bạn có thể tham khảo các bài viết dưới đây:
        </p>
        {firstPost && (
          <SuggestedPostList
            postId={firstPost._id}
            type={content ? 'category' : tag ? 'tag' : 'category'}
            limit={4}
            showTitle={false}
          />
        )}
      </div>
    </div>
  )
}
