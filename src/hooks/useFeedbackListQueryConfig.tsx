import omitBy from 'lodash/omitBy'
import isUndefined from 'lodash/isUndefined'
import useQueryParams from './useQueryParams'
import { FeedbackListConfig } from 'src/types/feedback.type'

export type FeedbackListQueryConfig = {
  [key in keyof FeedbackListConfig]: string
}

export const FEEDBACK_LIMIT = 20

export default function useFeedbackListQueryConfig() {
  const queryParams: FeedbackListQueryConfig = useQueryParams()
  const queryConfig: FeedbackListQueryConfig = omitBy(
    {
      page: queryParams.page || 1,
      limit: queryParams.limit || FEEDBACK_LIMIT,
      cursor: queryParams.cursor
    },
    isUndefined
  )
  return queryConfig
}
