import classNames from 'classnames'
import React, { Fragment, createContext, useState } from 'react'
import { Feedback } from 'src/types/feedback.type'

interface Props {
  children?: React.ReactNode
}

export interface ExtendedFeedback extends Feedback {
  disabled: boolean
  checked: boolean
}

interface FeedbackContextInterface {
  deletingMode: boolean
  setDeletingMode: React.Dispatch<React.SetStateAction<boolean>>
  extendedFeedbacks: ExtendedFeedback[]
  setExtendedFeedbacks: React.Dispatch<React.SetStateAction<ExtendedFeedback[]>>
}

const initialFeedbackContext: FeedbackContextInterface = {
  deletingMode: false,
  setDeletingMode: () => null,
  extendedFeedbacks: [],
  setExtendedFeedbacks: () => null
}

export const FeedbackContext = createContext<FeedbackContextInterface>(initialFeedbackContext)

export default function AdminFeedbackLayout({ children }: Props) {
  const [deletingMode, setDeletingMode] = useState<boolean>(initialFeedbackContext.deletingMode)
  const [extendedFeedbacks, setExtendedFeedbacks] = useState<ExtendedFeedback[]>(
    initialFeedbackContext.extendedFeedbacks
  )

  //! SELECT FEEDBACK
  const isAllChecked = extendedFeedbacks.every((feedback) => feedback.checked)
  const checkedFeedbacksCount = extendedFeedbacks.length

  const cancelDelete = () => {
    setExtendedFeedbacks((prev) =>
      prev.map((feedback) => ({
        ...feedback,
        checked: false
      }))
    )
    setDeletingMode(false)
  }

  const handleSelectAll = () => {
    setExtendedFeedbacks((prev) =>
      prev.map((purchase) => ({
        ...purchase,
        checked: !isAllChecked
      }))
    )
  }

  return (
    <FeedbackContext.Provider value={{ deletingMode, setDeletingMode, extendedFeedbacks, setExtendedFeedbacks }}>
      <Fragment>
        <div className='w-full justify-end space-y-4'>
          <div className='flex justify-end space-x-10 tablet:space-x-20'>
            <button
              onClick={cancelDelete}
              className={classNames(
                'py-1 px-2 text-xs tablet:text-sm tablet:px-4 bg-primaryBackground/80 hover:bg-primaryBackground rounded-lg',
                {
                  invisible: !deletingMode
                }
              )}
            >
              Hủy
            </button>

            <button
              onClick={() => setDeletingMode(true)}
              className='py-1  px-2 text-xs tablet:text-sm tablet:px-4 bg-alertRed/80 hover:bg-alertRed rounded-lg'
            >
              {deletingMode ? 'Xóa' : 'Xóa feedback'}
            </button>
          </div>
          <div
            className={classNames('flex text-xs  tablettext-sm w-full space-x-4 justify-end', {
              invisible: !deletingMode
            })}
          >
            <div className='items-center flex space-x-1'>
              <input
                name='is_selected'
                type='checkbox'
                className='h-5 w-5 accent-primaryBackground'
                checked={isAllChecked}
                onChange={handleSelectAll}
              />
              <span className='italic font-bold'>Chọn tất cả</span>
            </div>
            <div className='flex items-center space-x-1 '>
              <span className='italic'>Đã chọn:</span>
              <span className='font-bold'>{checkedFeedbacksCount}</span>
            </div>
          </div>
        </div>

        <div className='mt-4 tablet:mt-6 desktop:mt-8 border border-black/40 rounded-lg py-2 tablet:py-4 desktop:py-6 px-2 tablet:px-4'>
          {children}
        </div>
      </Fragment>
    </FeedbackContext.Provider>
  )
}
