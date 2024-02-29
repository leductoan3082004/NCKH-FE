import { useQuery } from '@tanstack/react-query'
import postApi from 'src/apis/post.api'
import LoadingRing from '../LoadingRing'
import { Post } from 'src/types/post.type'
import { useNavigate } from 'react-router-dom'
import mainPath from 'src/constants/path'
import { generatePostId } from 'src/utils/utils'

interface Props {
  type: 'tag' | 'category'
  limit: number
  postId: string
  showTitle?: boolean
}

function SuggestedPost({ post, handleEnterPost }: { post: Post; handleEnterPost: () => void }) {
  return (
    <button className='w-full space-y-2 p-2 rounded-lg group' onClick={handleEnterPost}>
      <div className='w-full pt-[100%] overflow-hidden relative'>
        <img src={post.image_url} alt={post.title} className='absolute top-0 left-0   object-cover' />
      </div>
      <div className='border-t border-black/10'></div>
      <p className='flex items-start justify-center font-medium group-hover:text-primaryBlue'>{post.title}</p>
    </button>
  )
}

export default function SuggestedPostList({ type, limit, postId, showTitle = true }: Props) {
  //! GET POST LIST
  const suggestionsConfig = { post_id: postId, type: type, limit: limit }
  const { data: suggestionsData } = useQuery({
    queryKey: ['suggestion-list', suggestionsConfig],
    queryFn: () => {
      return postApi.listSuggestions(suggestionsConfig)
    },
    staleTime: 1000 * 60 * 3
  })

  //! HANDLE ENTER POST
  const navigate = useNavigate()
  const handleEnterItem = (post: Post) => () => {
    navigate({ pathname: `${mainPath.post}/${generatePostId({ title: post.title, id: post._id })}` })
  }

  return (
    <div className='space-y-2 px-4 py-2'>
      {showTitle && (
        <p className='uppercase font-medium text-darkPrimaryBlue text-lg tablet:text-xl desktop:text-xl'>
          Các bài viết có cùng {type == 'tag' ? 'Từ khóa' : 'Danh mục'}:
        </p>
      )}
      {!suggestionsData && (
        <div className='flex items-center justify-center h-40'>
          <LoadingRing />
        </div>
      )}
      {suggestionsData && (
        <div className='grid grid-cols-2 tablet:grid-cols-3 desktop:grid-cols-4 gap-2 desktop:gap-3'>
          {suggestionsData.data.data.map((post) => (
            <div key={post._id} className='col-span-1'>
              <SuggestedPost post={post} handleEnterPost={handleEnterItem(post)} />
            </div>
          ))}
        </div>
      )}
    </div>
  )
}
