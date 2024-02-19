import { useQuery } from '@tanstack/react-query'
import { useParams } from 'react-router-dom'
import postApi from 'src/apis/post.api'
import { getIdFromUrl } from 'src/utils/utils'
import LoadingSection from '../LoadingSection'
import PathBar from '../PathBar'
import usePostListQueryConfig from 'src/hooks/usePostListQueryConfig'

export default function PostDetail() {
  //! GET POST DETAIL
  const { postId: paramPostId } = useParams()
  const postId = getIdFromUrl(paramPostId as string)
  const { data: postDetailData } = useQuery({
    queryKey: ['post-detail', postId],
    queryFn: () => postApi.getPostDetail(postId as string)
  })
  const postDetail = postDetailData?.data.data

  //? Get current category
  const { category: activeCategory } = usePostListQueryConfig()

  return (
    <div className='container'>
      <div className='py-2 tablet:py-3 desktop:py-4 space-y-4'>
        <PathBar
          pathList={[
            { pathName: 'Trang chủ', url: '/' },
            { pathName: activeCategory as string, url: activeCategory as string }
          ]}
        />
        {!postDetail && <LoadingSection />}
        {postDetail && <div className='postContainer'></div>}
      </div>
    </div>
  )
}
