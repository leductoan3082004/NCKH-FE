import { useQuery } from '@tanstack/react-query'
import { produce } from 'immer'
import { keyBy } from 'lodash'
import { Fragment, useContext, useEffect } from 'react'
import { ColorRing } from 'react-loader-spinner'
import { feedbackApi } from 'src/apis/feedback.api'
import useFeedbackListQueryConfig from 'src/hooks/useFeedbackListQueryConfig'
import { useViewport } from 'src/hooks/useViewport'
import { ExtendedFeedback, FeedbackContext } from 'src/layouts/AdminFeedbackLayout/AdminFeedbackLayout'
import { FeedbackListConfig } from 'src/types/feedback.type'

interface ItemProps {
  feedback: ExtendedFeedback
  index: number
  handleChecking: (feedbackIndex: number) => (event: React.ChangeEvent<HTMLInputElement>) => void
}

const LargeFeedbackItem = ({ feedback, handleChecking, index }: ItemProps) => {
  const { deletingMode } = useContext(FeedbackContext)

  return (
    <div className='w-full relative border border-black/40 rounded-md overflow-hidden'>
      <div className='grid grid-cols-12 gap-2 desktopLarge:gap-4 py-4 px-4'>
        <div className='col-span-8 space-y-4'>
          <p className='font-bold text-lg desktopLarge:text-xl'>{feedback.topic}</p>
          <div className='w-full h-20 desktopLarge:h-40 overflow-hidden'>{feedback.content}</div>
        </div>
        <div className='col-span-4 space-y-4 border-l text-sm md border-black/20 pl-4'>
          <div className='italic'>{feedback.name}</div>
          <div className='italic'>{feedback.email}</div>
        </div>
      </div>
      {deletingMode && (
        <div className='absolute top-2 right-2'>
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
  )
}

const SmallFeedbackItem = ({ feedback, index, handleChecking }: ItemProps) => {
  const { deletingMode } = useContext(FeedbackContext)

  return (
    <div className='w-full relative border border-black/40 rounded-md overflow-hidden'>
      <div className='p-2'>
        <div className='space-y-2'>
          <p className='font-bold text-base tabletSmall:text-lg'>{feedback.topic}</p>
          <p className='h-20 text-sm tabletSmall:h-32 overflow-hidden truncate'>{feedback.content}</p>
          <p className='font-thin text-sm italic'>{feedback.name}</p>
          <p className='font-thin text-sm italic'>{feedback.email}</p>
        </div>
      </div>
      {deletingMode && (
        <div className='absolute top-2 right-2'>
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
            <div className='flex flex-col space-y-4'>
              {extendedFeedbacks.map((feedback, index) => (
                <div className='' key={feedback._id}>
                  <LargeFeedbackItem feedback={feedback} index={index} handleChecking={handleChecking} />
                </div>
              ))}
            </div>
          )}
          {isMobile && (
            <div className='flex flex-col space-y-2'>
              {extendedFeedbacks.map((feedback, index) => (
                <div className='' key={feedback._id}>
                  <SmallFeedbackItem feedback={feedback} index={index} handleChecking={handleChecking} />
                </div>
              ))}
            </div>
          )}
        </Fragment>
      )}
    </div>
  )
}
