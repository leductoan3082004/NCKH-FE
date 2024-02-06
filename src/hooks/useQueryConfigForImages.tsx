import omitBy from 'lodash/omitBy'
import isUndefined from 'lodash/isUndefined'
import useQueryParams from './useQueryParams'
import { PostListConfig } from 'src/types/post.type'

export type QueryConfig = {
  [key in keyof PostListConfig]: string
}

export const IMAGE_LIMIT = 12

export default function useQueryConfigForImages() {
  const queryParams: QueryConfig = useQueryParams()
  const queryConfig: QueryConfig = omitBy(
    {
      page: queryParams.page || 1,
      limit: queryParams.limit || IMAGE_LIMIT
    },
    isUndefined
  )
  return queryConfig
}
