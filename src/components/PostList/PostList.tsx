import { useQuery } from '@tanstack/react-query'
import postApi from 'src/apis/post.api'
import usePostListQueryConfig from 'src/hooks/usePostListQueryConfig'
import { PostListConfig } from 'src/types/post.type'
import LoadingSection from '../LoadingSection'
import Post from '../Post'
import EmptySection from 'src/pages/AdminPage/components/EmptySection'
import { Fragment } from 'react'
import PathBar from '../PathBar'
import { CategoriesPathname, CategoriesURL } from 'src/constants/categories'
import { PathElement } from '../PathBar/PathBar'

interface Props {
  category: string
}

export default function PostList({ category }: Props) {
  //! GET POST LIST
  const postListConfig = {
    ...usePostListQueryConfig(),
    category: category
  }
  const { data: postListData } = useQuery({
    queryKey: ['post-list', postListConfig],
    queryFn: () => {
      return postApi.getPostList(postListConfig as PostListConfig)
    },
    staleTime: 1000 * 60 * 3
  })
  const { category: currentCategory } = postListConfig

  //! PATH LIST
  const pathNameList = CategoriesPathname.get(category) as string[]
  const pathList: PathElement[] = pathNameList.map((pathName) => {
    return { pathName: pathName, url: CategoriesURL.get(pathName) as string }
  })

  return (
    <div className='py-2 tablet:py-3 desktop:py-4 container'>
      <PathBar pathList={pathList} />
      <div className='flex items-center justify-center uppercase text-xl tablet:text-2xl desktop:text-3xl text-primaryBlue font-bold py-4'>
        {currentCategory}
      </div>
      {!postListData && <LoadingSection />}
      {postListData && (
        <Fragment>
          {postListData.data.data.length == 0 && <EmptySection />}
          {postListData.data.data.length > 0 && (
            <div className='grid grid-cols-1 gap-2 tablet:grid-cols-2 tablet:gap-3 desktop:gap-4'>
              {postListData.data.data.map((post) => (
                <div key={post._id} className=''>
                  <Post post={post} />
                </div>
              ))}
            </div>
          )}
        </Fragment>
      )}
    </div>
  )
}
