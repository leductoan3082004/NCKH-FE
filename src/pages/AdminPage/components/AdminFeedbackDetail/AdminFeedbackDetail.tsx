import { useQuery } from '@tanstack/react-query'
import React from 'react'
import { useNavigate, useParams } from 'react-router-dom'
import { feedbackApi } from 'src/apis/feedback.api'
import LoadingRing from 'src/components/LoadingRing'
import { adminPath } from 'src/constants/path'
import { getIdFromUrl } from 'src/utils/utils'

export default function AdminFeedbackDetail() {
  //! GET FEEDBACK DETAIL
  const { feedbackId: paramFeedbackId } = useParams()
  const feedbackId = getIdFromUrl(paramFeedbackId as string)
  const { data: feedbackData, isFetched } = useQuery({
    queryKey: ['admin-feedback-detail', feedbackId],
    queryFn: () => feedbackApi.getFeedbackDetail(feedbackId as string)
  })
  const feedback = feedbackData?.data.data

  return (
    <div>
      {!isFetched && (
        <div className='h-96 flex items-center justify-center'>
          <LoadingRing />
        </div>
      )}
      <div className=''></div>
    </div>
  )
}
