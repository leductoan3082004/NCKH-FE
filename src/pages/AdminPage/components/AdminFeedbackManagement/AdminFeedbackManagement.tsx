import { useQuery } from '@tanstack/react-query'
import { Fragment, useState } from 'react'
import { ColorRing } from 'react-loader-spinner'
import { feedbackApi } from 'src/apis/feedback.api'
import useFeedbackListQueryConfig from 'src/hooks/useFeedbackListQueryConfig'
import { useViewport } from 'src/hooks/useViewport'
import { Feedback, FeedbackListConfig } from 'src/types/feedback.type'

const LargeFeedbackItem = ({ feedback }: { feedback: Feedback }) => {
  const [hovering, setHovering] = useState<boolean>(false)

  return (
    <div
      className='w-full relative border border-black/40 rounded-md overflow-hidden'
      onMouseEnter={() => setHovering(true)}
      onMouseLeave={() => setHovering(false)}
    >
      <div className='grid grid-cols-12 gap-2 desktopLarge:gap-4 py-4 px-4'>
        <div className='col-span-8 space-y-4'>
          <p className='font-bold text-lg desktopLarge:text-xl'>{feedback.topic}</p>
          <div className='w-full h-20 desktopLarge:h-40 overflow-hidden'>{feedback.content}</div>
        </div>
        <div className='col-span-4 space-y-4 border-l border-black/20 pl-4'>
          <div className='grid grid-cols-4'>
            <div className='col-span-1'>Người đăng</div>
            <div className='col-span-3'>{feedback.name}</div>
          </div>
          <div className='grid grid-cols-4'>
            <div className='col-span-1'>Email</div>
            <div className='col-span-3'>{feedback.email}</div>
          </div>
        </div>
      </div>
      {hovering && (
        <div className='absolute w-10/12 bg-black/80 bottom-1 rounded-md px-2 py-1 left-1/2 -translate-x-1/2 flex items-center space-x-1 text-white text-xs'></div>
      )}
    </div>
  )
}

const SmallFeedbackItem = ({ feedback }: { feedback: Feedback }) => {
  const [hovering, setHovering] = useState<boolean>(false)

  return (
    <div
      className='w-full relative border border-black/40 rounded-md overflow-hidden'
      onMouseEnter={() => setHovering(true)}
      onMouseLeave={() => setHovering(false)}
    >
      <div className='p-2'>
        <div className='space-y-2'>
          <p className='font-bold text-base tabletSmall:text-lg'>{feedback.topic}</p>
          <p className='h-20 text-sm tabletSmall:h-32 overflow-hidden truncate'>{feedback.content}</p>
          <p className='font-thin text-sm italic'>{feedback.name}</p>
          <p className='font-thin text-sm italic'>{feedback.email}</p>
        </div>
      </div>
      {hovering && (
        <div className='absolute w-10/12 bg-black/80 bottom-1 rounded-md px-2 py-1 left-1/2 -translate-x-1/2 flex items-center space-x-1 text-white text-xs'></div>
      )}
    </div>
  )
}

export default function AdminFeedbackManagement() {
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

  //! DELETE FEEDBACK

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
      {feedbackData && (
        <Fragment>
          {!isMobile && (
            <div className='flex flex-col space-y-4'>
              {feedbackData?.data.data.map((feedback) => (
                <div className='' key={feedback._id}>
                  <LargeFeedbackItem feedback={feedback} />
                </div>
              ))}
            </div>
          )}
          {isMobile && (
            <div className='flex flex-col space-y-2'>
              {feedbackData?.data.data.map((feedback) => (
                <div className='' key={feedback._id}>
                  <SmallFeedbackItem feedback={feedback} />
                </div>
              ))}
            </div>
          )}
        </Fragment>
      )}
    </div>
  )
}
