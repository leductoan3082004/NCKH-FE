import { useQuery } from '@tanstack/react-query'
import postApi from 'src/apis/post.api'
import usePostListQueryConfig, { POST_LIMIT } from 'src/hooks/usePostListQueryConfig'
import { PostListConfig } from 'src/types/post.type'
import EmptySection from 'src/components/EmptySection'
import { Fragment, useEffect } from 'react'
import { CategoriesPathname, CategoriesURL } from 'src/constants/categories'
import { ceil } from 'lodash'
import { useViewport } from 'src/hooks/useViewport'
import PathBar, { PathElement } from 'src/components/PathBar/PathBar'
import LoadingSection from 'src/components/LoadingSection'
import Post from 'src/components/Post'
import UsePagination from 'src/components/UsePagination'

interface Props {
  category?: string
}

export default function PostListPage({ category }: Props) {
  const isMobile = useViewport().width < 768

  //! GET POST LIST
  const currentPostListConfig = usePostListQueryConfig()
  const postListConfig =
    category == ''
      ? { ...currentPostListConfig }
      : {
          ...currentPostListConfig,
          category: category
        }
  const { data: postListData } = useQuery({
    queryKey: ['post-list', postListConfig],
    queryFn: () => {
      return postApi.getPostList(postListConfig as PostListConfig)
    },
    staleTime: 1000 * 60 * 3
  })
  const { tag: activeTag, content: keyWord } = postListConfig

  //! SET TITLE
  const title = 'Ngữ Liệu Số | '.concat(keyWord ? keyWord : ((activeTag ? activeTag : category) as string))
  useEffect(() => {
    document.title = title
  }, [title])

  //! PATH LIST
  let pathList: PathElement[] = []
  if (category) {
    const pathNameList = CategoriesPathname.get(category) as string[]
    pathList = pathNameList.map((pathName) => {
      return { pathName: pathName, url: CategoriesURL.get(pathName) as string, isNotALink: false }
    })
  } else if (activeTag) {
    pathList = [{ pathName: activeTag || '', url: '', isNotALink: true }]
  } else {
    pathList = [{ pathName: keyWord ? `Từ khóa: "${keyWord}"` : 'Tất cả bài viết', url: '', isNotALink: true }]
  }

  return (
    <div className='py-2 tablet:py-3 desktop:py-4 container'>
      <PathBar pathList={pathList} />
      <div className='flex items-center justify-center uppercase text-xl tablet:text-2xl desktop:text-3xl text-primaryBlue font-medium py-4'>
        {category || activeTag}
      </div>
      {!postListData && <LoadingSection />}
      {postListData && (
        <Fragment>
          {postListData.data.data.length == 0 && <EmptySection />}
          {postListData.data.data.length > 0 && (
            <Fragment>
              <div className='grid grid-cols-1 gap-2 tablet:grid-cols-2 tablet:gap-3 desktop:gap-4'>
                {postListData.data.data.map((post) => {
                  if (post.category[0] == 'Giới thiệu trang web') return
                  return (
                    <div key={post._id} className=''>
                      <Post post={post} />
                    </div>
                  )
                })}
              </div>

              <UsePagination totalPage={ceil(postListData.data.paging.total / POST_LIMIT)} isMobile={isMobile} />
            </Fragment>
          )}
        </Fragment>
      )}
    </div>
  )
}
