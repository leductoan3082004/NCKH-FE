import omitBy from 'lodash/omitBy'
import isUndefined from 'lodash/isUndefined'
import useQueryParams from './useQueryParams'
import { PostListConfig } from 'src/types/post.type'

export type PostListQueryConfig = {
  [key in keyof PostListConfig]: string
}

export const POST_LIMIT = 12

export default function usePostListQueryConfig() {
  const queryParams: PostListQueryConfig = useQueryParams()
  const queryConfig: PostListQueryConfig = omitBy(
    {
      tag: queryParams.tag,
      content: queryParams.content,
      category: queryParams.category,
      page: queryParams.page || 1,
      limit: queryParams.limit || POST_LIMIT
    },
    isUndefined
  )
  return queryConfig
}
