import { useQuery } from '@tanstack/react-query'
import { NavLink, createSearchParams, useLocation, useNavigate, useParams } from 'react-router-dom'
import postApi from 'src/apis/post.api'
import { getIdFromUrl } from 'src/utils/utils'
import PathBar from '../PathBar'
import { CategoriesPathname, CategoriesURL } from 'src/constants/categories'
import { PathElement } from '../PathBar/PathBar'
import LoadingRing from '../LoadingRing'
import DOMPurify from 'dompurify'
import mainPath from 'src/constants/path'
import { omit } from 'lodash'
import usePostListQueryConfig from 'src/hooks/usePostListQueryConfig'
import SuggestedPostList from '../SuggestedPostList'

export default function PostDetail() {
  //! GET POST DETAIL
  const { postId: paramPostId } = useParams()
  const postId = getIdFromUrl(paramPostId as string)
  const { data: postDetailData } = useQuery({
    queryKey: ['post-detail', postId],
    queryFn: () => postApi.getPostDetail(postId as string)
  })
  const postDetail = postDetailData?.data.data

  //? Use hooks
  const location = useLocation()
  const navigate = useNavigate()
  const postListQueryConfig = usePostListQueryConfig()
  const currentUrl = location.pathname

  if (!postDetail)
    return (
      <div className='flex items-center justify-center h-80 tablet:h-[400px] desktop:h-[600px]'>
        <LoadingRing />
      </div>
    )

  //! GET PATH LIST
  const category = postDetail.category[0]
  const pathNameList = CategoriesPathname.get(category as string) as string[]
  const pathList: PathElement[] = pathNameList?.map((pathName) => {
    return { pathName: pathName, url: CategoriesURL.get(pathName) as string, isNotALink: false }
  })

  //! HANDLE CHOOSE TAG
  const handleChoostTag = (tag: string) => () => {
    navigate({
      pathname: mainPath.tagSorting,
      search: createSearchParams(
        omit(
          {
            ...postListQueryConfig,
            tag: tag
          },
          ['page', 'limit']
        )
      ).toString()
    })
  }

  return (
    <div className='container'>
      <div className='py-2 tablet:py-3 desktop:py-4 space-y-4'>
        <PathBar pathList={[...pathList, { pathName: postDetail.title, url: currentUrl }]} />
        <div className='postContainer'>
          <div className='space-y-4 tablet:space-y-6 desktop:space-y-8'>
            <div className=' flex justify-center'>
              <div className='w-full mobileLarge:w-10/12 tabletSmall:w-9/12 tablet:w-8/12 tabletLarge:w-7/12 desktop:w-6/12'>
                <div className='w-full relative overflow-hidden pt-[100%]'>
                  <img
                    src={postDetail.image_url}
                    alt={postDetail.title}
                    className='absolute left-1/2 -translate-x-1/2 -translate-y-1/2 top-1/2 object-cover'
                  />
                </div>
              </div>
            </div>

            <p className='leading-10 font-bold text-xl text-primaryBlue tablet:text-2xl desktop:text-3xl text-center w-full'>
              {postDetail.title}
            </p>

            <div
              dangerouslySetInnerHTML={{
                __html: DOMPurify.sanitize(postDetail.content)
              }}
              className='overflow-visible'
            />

            <div className='border-t border-black/20 border-1' />

            <div className='flex space-x-2 items-center text-xs desktop:text-sm'>
              <span className='py-1 px-3 rounded-md  bg-primaryBackground'>Danh mục:</span>
              {postDetail.category.map((category, index) => (
                <NavLink
                  to={CategoriesURL.get(category) as string}
                  className='py-1 px-3 rounded-md bg-white text-darkText hover:bg-primaryBackground/60'
                  key={index}
                >
                  {category}
                </NavLink>
              ))}
            </div>

            <div className='flex space-x-2 items-center text-xs desktop:text-sm'>
              <span className='py-1 px-3 rounded-md  bg-primaryBackground'>Từ khóa:</span>
              {postDetail.tag.map((tag, index) => (
                <button
                  onClick={handleChoostTag(tag)}
                  className='py-1 px-3 rounded-md bg-white text-darkText hover:bg-primaryBackground/60'
                  key={index}
                >
                  {tag}
                </button>
              ))}
            </div>

            <div className='border-t border-black/20 border-1' />

            <SuggestedPostList postId={postDetail._id} type='category' limit={4} />
            <SuggestedPostList postId={postDetail._id} type='tag' limit={4} />
          </div>
        </div>
      </div>
    </div>
  )
}
