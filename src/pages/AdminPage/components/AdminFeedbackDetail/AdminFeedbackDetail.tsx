import { useQuery } from '@tanstack/react-query'
import { useParams } from 'react-router-dom'
import { feedbackApi } from 'src/apis/feedback.api'
import LoadingRing from 'src/components/LoadingRing'
import { formatDate, getIdFromUrl } from 'src/utils/utils'

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
      {isFetched && feedback && (
        <div className='space-y-4'>
          <div className='flex justify-between '>
            <div className='col-span-9 tablet:col-span-10 overflow-hidden shrink-0'>
              <p className='text-xl desktop:text-3xl truncate font-bold items-center'>{feedback.topic}</p>
            </div>
            <div className='col-span-3 tablet:col-span-2 flex items-center'>
              <p className='text-darkText/60 desktop:text-lg'>{formatDate(feedback.created_at)}</p>
            </div>
          </div>
          <div className='text-base desktop:text-lg'>{feedback.content}</div>
          <div className='desktop:text-lg overflow-hidden flex flex-col items-end'>
            <p className='truncate font-bold'>{feedback.name}</p>
            <p className='truncate text-darkText/60'>{feedback.email}</p>
            <p className='truncate text-darkText/60'>{feedback.phone}</p>
          </div>
        </div>
      )}
    </div>
  )
}
