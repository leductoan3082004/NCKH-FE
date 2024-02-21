import { useQuery } from '@tanstack/react-query'
import classNames from 'classnames'
import DOMPurify from 'dompurify'
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
    <div className='flex w-full hover:bg-mainBlue100 grid-cols-12 gap-2 px-4 border-b cursor-pointer hover:shadow-md border-black/20'>
      <div className={classNames('flex items-center visible', { invisible: !deletingMode })}>
        <input
          name='is_selected'
          type='checkbox'
          className='h-4 w-4 accent-primaryBackground'
          checked={feedback.checked}
          onChange={handleChecking(index)}
        />
      </div>
      <button className='w-full grid grid-cols-12 gap-2 py-4' onClick={handleClickItem(feedback)}>
        <div className='col-span-2'>
          <p className='font-bold text-left'>{feedback.name}</p>
        </div>
        <div className='col-span-8 desktopLarge:col-span-9'>
          <div className='flex space-x-2 px-1 overflow-hidden'>
            <p className='font-bold shrink-0'>{feedback.topic}</p>
            <p
              dangerouslySetInnerHTML={{
                __html: DOMPurify.sanitize(feedback.content)
              }}
              className='line-clamp-1 opacity-50 text-left'
            />
            {/* <p className='text-darkText/40 truncate'>{feedback.content}</p> */}
          </div>
        </div>
        <div className='col-span-2 desktopLarge:col-span-1 text-sm flex items-center justify-end'>
          <p className='font-medium'>{formatDate(feedback.created_at)}</p>
        </div>
      </button>
    </div>
  )
}

const SmallFeedbackItem = ({ feedback, index, handleChecking, handleClickItem }: ItemProps) => {
  const { deletingMode } = useContext(FeedbackContext)

  return (
    <div className='w-full border-b hover:shadow-md hover:cursor-pointer hover:bg-mainBlue100 border-black/20 mainBlue100 flex px-1 mobileLarge:px-2 space-x-2'>
      <div className={classNames('min-h-full flex items-center justify-center visible', { invisible: !deletingMode })}>
        <input
          name='is_selected'
          type='checkbox'
          className='h-4 w-4 accent-primaryBackground'
          checked={feedback.checked}
          onChange={handleChecking(index)}
        />
      </div>
      <button className='w-full relative overflow-hidden space-y-1 py-3' onClick={handleClickItem(feedback)}>
        <div className='flex justify-between items-center'>
          <p className='font-bold'>{feedback.name}</p>
          <div className='flex space-x-4 items-center'>
            <p className='font-medium'>{formatDate(feedback.created_at)}</p>
          </div>
        </div>
        <p className='font-bold text-left'>{feedback.topic}</p>
        <p
          dangerouslySetInnerHTML={{
            __html: DOMPurify.sanitize(feedback.content)
          }}
          className='line-clamp-1 opacity-50 text-left'
        />
      </button>
    </div>
  )
}

export default function AdminFeedbackManagement() {
  const { extendedFeedbacks, setExtendedFeedbacks, setDeletingMode } = useContext(FeedbackContext)

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
    setExtendedFeedbacks((prev) =>
      prev.map((feedback) => ({
        ...feedback,
        checked: false
      }))
    )
    setDeletingMode(false)
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
            <div className='flex flex-col'>
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
            <div className='flex flex-col'>
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
