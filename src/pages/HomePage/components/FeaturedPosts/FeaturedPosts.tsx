import { useQuery } from '@tanstack/react-query'
import { ceil } from 'lodash'
import postApi from 'src/apis/post.api'
import Post from 'src/components/Post'
import UsePagination from 'src/components/UsePagination'
import usePostListQueryConfig, { POST_LIMIT } from 'src/hooks/usePostListQueryConfig'
import { Post as PostType, PostListConfig } from 'src/types/post.type'

export default function FeaturedPosts() {
  const queryConfig = usePostListQueryConfig()

  //? GET POST LIST
  const { data: postsData, isFetching } = useQuery({
    queryKey: ['postList', queryConfig],
    queryFn: () => {
      return postApi.getPostList(queryConfig as PostListConfig)
    },
    staleTime: 3 * 60 * 1000
  })

  return (
    <div className='w-full text-darkText flex text-center items-center py-2 tablet:py-3 desktop:py-4'>
      <div className='container'>
        {postsData && (
          <div className=''>
            <div className='grid grid-cols-1 gap-2 tablet:grid-cols-2 tablet:gap-3 desktop:gap-4'>
              {/* {isFetching &&
                Array(12)
                  .fill(0)
                  .map((_, index) => (
                    <div key={index} className='col-span-1'>
                      <ProductSekeleton />
                    </div>
                  ))} */}
              {!isFetching &&
                postsData.data.data.map((post: PostType) => (
                  <div className='col-span-1' key={post._id}>
                    <Post post={post} />
                  </div>
                ))}
            </div>
            <UsePagination queryConfig={queryConfig} totalPage={ceil(postsData.data.paging.total / POST_LIMIT)} />
          </div>
        )}
        <div className='py-2 px-1 grid grid-cols-3 gap-2 tablet:gap-4 desktopLarge:gap-6'>
          {/* <div className='relative w-full pt-[75%]'>
            <div className='absolute left-0 top-0 h-full w-full'>
              {avatarUrl ? (
                <img src={avatarUrl} alt={product.name} className='absolute left-0 top-0 h-full w-full object-cover' />
              ) : (
                <div className='absolute left-0 top-0 flex h-full w-full items-center justify-center'>
                  <FontAwesomeIcon icon={faTriangleExclamation} fontSize={60} />
                </div>
              )}
            </div>
          </div> */}
          <div className='min-h-full'></div>
        </div>
      </div>
    </div>
  )
}
