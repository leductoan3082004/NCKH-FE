import { useQuery } from '@tanstack/react-query'
import DOMPurify from 'dompurify'
import postApi from 'src/apis/post.api'
import LoadingRing from 'src/components/LoadingRing'
import { PostListConfig } from 'src/types/post.type'

export default function HomePageIntroduction() {
  //! GET INTRODUCTION POST
  //:: get post list
  const introductionConfig: PostListConfig = {
    category: 'Giới thiệu trang web'
  }
  const { data: introductionPostData, isFetching: isFetchingIntroductionPostList } = useQuery({
    queryKey: ['introductionPostList', introductionConfig],
    queryFn: () => {
      return postApi.getPostList(introductionConfig as PostListConfig)
    },
    staleTime: 3 * 60 * 1000
  })
  const introductionPost = introductionPostData?.data.data[0] || null
  const postId = introductionPost?._id || ''
  //:: get post detail
  const { data: introductionData, isFetching: isFetchingIntroduction } = useQuery({
    queryKey: ['introduction'],
    queryFn: () => {
      return postApi.getPostDetail(postId)
    },
    enabled: postId != ''
  })

  return (
    <div className='container'>
      {(isFetchingIntroduction || isFetchingIntroductionPostList) && (
        <div className='min-h-96 flex items-center justify-center'>
          <LoadingRing />
        </div>
      )}
      {introductionData && (
        <div className=''>
          <div
            dangerouslySetInnerHTML={{
              __html: DOMPurify.sanitize(introductionData?.data.data.content)
            }}
            className='overflow-visible'
          />
        </div>
      )}
    </div>
  )
}
