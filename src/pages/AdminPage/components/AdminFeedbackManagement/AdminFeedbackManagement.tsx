import { useQuery } from '@tanstack/react-query'
import { produce } from 'immer'
import { keyBy } from 'lodash'
import { Fragment, useContext, useEffect } from 'react'
import { ColorRing } from 'react-loader-spinner'
import { useNavigate } from 'react-router-dom'
import { feedbackApi } from 'src/apis/feedback.api'
import { adminPath } from 'src/constants/path'
import useFeedbackListQueryConfig from 'src/hooks/useFeedbackListQueryConfig'
import { useViewport } from 'src/hooks/useViewport'
import { ExtendedFeedback, FeedbackContext } from 'src/layouts/AdminFeedbackLayout/AdminFeedbackLayout'
import { Feedback, FeedbackListConfig } from 'src/types/feedback.type'
import { formatDate, generateFeedbackId } from 'src/utils/utils'

interface ItemProps {
  feedback: ExtendedFeedback
  index: number
  handleChecking: (feedbackIndex: number) => (event: React.ChangeEvent<HTMLInputElement>) => void
  handleClickItem: (feedback: Feedback) => () => void
}

const LargeFeedbackItem = ({ feedback, index, handleChecking, handleClickItem }: ItemProps) => {
  const { deletingMode } = useContext(FeedbackContext)

  return (
    <button
      onClick={handleClickItem(feedback)}
      className='grid w-full hover:bg-mainBlue100 grid-cols-12 gap-2 py-3 px-4 rounded-lg border border-black/20'
    >
      <div className='col-span-2'>
        <p className='font-bold text-left'>{feedback.name}</p>
      </div>
      <div className='col-span-7 desktop:col-span-8'>
        <div className='flex space-x-2 px-1 overflow-hidden'>
          <p className='font-bold shrink-0'>{feedback.topic}</p>
          <p className='text-darkText/60 truncate'>{feedback.content}</p>
        </div>
      </div>
      <div className='col-span-2 desktop:col-span-1 text-sm'>
        <p className='font-bold'>{formatDate(feedback.created_at)}</p>
      </div>
      <div className='col-span-1'>
        {deletingMode && (
          <div className='flex items-center justify-center'>
            <input
              name='is_selected'
              type='checkbox'
              className='h-5 w-5 accent-primaryBackground'
              checked={feedback.checked}
              onChange={handleChecking(index)}
            />
          </div>
        )}
      </div>
    </button>
  )
}

const SmallFeedbackItem = ({ feedback, index, handleChecking, handleClickItem }: ItemProps) => {
  const { deletingMode } = useContext(FeedbackContext)

  return (
    <button
      className='w-full relative border overflow-hidden hover:bg-mainBlue100 border-black/20 rounded-md py-3 px-2 mobileLarge:px-4'
      onClick={handleClickItem(feedback)}
    >
      <div className='flex justify-between items-center'>
        <p className='font-bold'>{feedback.name}</p>
        <div className='flex space-x-4'>
          <p className=''>{formatDate(feedback.created_at)}</p>
          <div className='w-6 h-6 flex items-center justify-center'>
            {deletingMode && (
              <input
                name='is_selected'
                type='checkbox'
                className='h-5 w-5 accent-primaryBackground'
                checked={feedback.checked}
                onChange={handleChecking(index)}
              />
            )}
          </div>
        </div>
      </div>
      <p className='font-bold text-left'>{feedback.topic}</p>
      <p className='text-left truncate text-darkText/60'>{feedback.content}</p>
    </button>
  )
}

export default function AdminFeedbackManagement() {
  const { extendedFeedbacks, setExtendedFeedbacks } = useContext(FeedbackContext)

  const isMobile = useViewport().width < 768

  //! GET FEEDBACK LIST
  const feedbackListConfig = useFeedbackListQueryConfig()

  const { data: feedbackData, isFetching } = useQuery({
    queryKey: ['admin-feedback-list', feedbackListConfig],
    queryFn: () => {
      return feedbackApi.getFeedbackList(feedbackListConfig as FeedbackListConfig)
    },
    staleTime: 3 * 60 * 1000
  })
  const feedbackList = feedbackData?.data.data

  useEffect(() => {
    setExtendedFeedbacks((prev) => {
      const extendedPurchasesObject = keyBy(prev, '_id')
      return (
        feedbackList?.map((feedback) => ({
          ...feedback,
          disabled: false,
          checked: Boolean(extendedPurchasesObject[feedback._id]?.checked)
        })) || []
      )
    })
  }, [feedbackList, setExtendedFeedbacks])

  //! HANDLE SELECT FEEDBACK
  const handleChecking = (feedbackIndex: number) => (event: React.ChangeEvent<HTMLInputElement>) => {
    setExtendedFeedbacks(
      produce((draft) => {
        draft[feedbackIndex].checked = event.target.checked
      })
    )
  }

  //! HANDLE ENTER FEEDBACK
  const navigate = useNavigate()
  const handleClickItem = (feedback: Feedback) => () => {
    navigate({
      pathname: `${adminPath.feedbackManagement}/${generateFeedbackId({ topic: feedback.topic, id: feedback._id })}`
    })
  }

  return (
    <div className=''>
      {isFetching && (
        <div className='w-full h-80 flex items-center justify-center'>
          <ColorRing
            visible={true}
            height='80'
            width='80'
            ariaLabel='blocks-loading'
            wrapperStyle={{}}
            wrapperClass='blocks-wrapper'
            colors={['#0096C7', '#0096C7', '#0096C7', '#0096C7', '#0096C7']}
          />
        </div>
      )}
      {extendedFeedbacks.length > 0 && (
        <Fragment>
          {!isMobile && (
            <div className='flex flex-col space-y-2'>
              {extendedFeedbacks.map((feedback, index) => (
                <div className='' key={feedback._id}>
                  {/* <LargeFeedbackItem feedback={feedback} index={index} handleChecking={handleChecking} /> */}
                  <LargeFeedbackItem
                    feedback={feedback}
                    index={index}
                    handleChecking={handleChecking}
                    handleClickItem={handleClickItem}
                  />
                </div>
              ))}
            </div>
          )}
          {isMobile && (
            <div className='flex flex-col space-y-2'>
              {extendedFeedbacks.map((feedback, index) => (
                <div className='' key={feedback._id}>
                  <SmallFeedbackItem
                    feedback={feedback}
                    index={index}
                    handleChecking={handleChecking}
                    handleClickItem={handleClickItem}
                  />
                </div>
              ))}
            </div>
          )}
        </Fragment>
      )}
    </div>
  )
}
