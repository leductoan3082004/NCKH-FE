import { faChevronLeft } from '@fortawesome/free-solid-svg-icons'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { useMutation, useQueryClient } from '@tanstack/react-query'
import classNames from 'classnames'
import React, { Fragment, createContext, useEffect, useState } from 'react'
import { NavLink, useNavigate, useParams } from 'react-router-dom'
import { feedbackApi } from 'src/apis/feedback.api'
import DialogPopup from 'src/components/DialogPopup'
import LoadingRing from 'src/components/LoadingRing'
import { adminPath } from 'src/constants/path'
import { Feedback } from 'src/types/feedback.type'
import { getIdFromUrl } from 'src/utils/utils'

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

  //! SET TITLE
  useEffect(() => {
    document.title = 'Quản trị viên | Feedbacks'
  })

  //? use state
  const [deletingDialog, setDeletingDialog] = useState<boolean>(false)
  const [deleteExcutingDialog, setDeleteExcutingDialog] = useState<boolean>(false)
  const [excuting, setExcuting] = useState<boolean>(false)

  //! SELECT FEEDBACK
  const isAllChecked = extendedFeedbacks.every((feedback) => feedback.checked)
  const checkedFeedbacks = extendedFeedbacks.filter((feedback) => feedback.checked)
  const checkedFeedbacksCount = checkedFeedbacks.length

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
      prev.map((feedback) => ({
        ...feedback,
        checked: !isAllChecked
      }))
    )
  }

  //! HANDLE DELETE FEEDBACK
  const navigate = useNavigate()
  const deleteFeedbacksMutation = useMutation({
    mutationFn: feedbackApi.deleteFeedbacks
  })
  const deleteFeedbacks = (feedbackIDs: string[]) => {
    setExcuting(true)
    deleteFeedbacksMutation.mutate(
      { feedback_ids: feedbackIDs },
      {
        onSuccess: () => {
          isFeedbackDetail && navigate(adminPath.feedbackManagement)
          queryClient.invalidateQueries({ queryKey: ['admin-feedback-list'] })
          setDeletingMode(false)
          setExcuting(false)
        }
      }
    )
  }

  const openDeletingDialog = () => {
    setDeletingDialog(true)
  }

  const queryClient = useQueryClient()
  const handleDeleteMultipleFeedbacks = () => {
    setDeletingDialog(false)
    setDeleteExcutingDialog(true)
    setExtendedFeedbacks((prev) =>
      prev.filter((feedback) => {
        return !feedback.checked
      })
    )

    const feedbackIDs = checkedFeedbacks.map((feedback) => {
      return feedback._id
    })

    deleteFeedbacks(feedbackIDs)
  }

  const handleDeleteCurrentFeedback = () => {
    setDeletingDialog(false)
    setDeleteExcutingDialog(true)
    const feedbackId = getIdFromUrl(isFeedbackDetail as string)
    deleteFeedbacks([feedbackId])
  }

  //! CHEKING IF IN FEEDBACK DETAIL
  const { feedbackId: isFeedbackDetail } = useParams()

  return (
    <FeedbackContext.Provider value={{ deletingMode, setDeletingMode, extendedFeedbacks, setExtendedFeedbacks }}>
      <Fragment>
        <div className='w-full justify-end space-y-4'>
          <div className='flex justify-between items-center'>
            {isFeedbackDetail && (
              <NavLink
                className='py-1 px-2 text-sm flex items-center justify-center rounded-md border border-black/20 hover:bg-primaryBackground'
                to={adminPath.feedbackManagement}
              >
                <FontAwesomeIcon icon={faChevronLeft} />
              </NavLink>
            )}
            <div
              className={classNames('flex text-xs tablet:text-sm w-full space-x-4 justify-start', {
                invisible: !deletingMode
              })}
            >
              <div className='items-center flex space-x-1'>
                <input
                  name='is_selected'
                  type='checkbox'
                  className='h-5 w-5 accent-primaryBackground'
                  checked={checkedFeedbacksCount == 0 ? false : isAllChecked}
                  onChange={handleSelectAll}
                  disabled={extendedFeedbacks.length == 0}
                />
                <span className='italic font-bold'>Chọn tất cả</span>
              </div>
              <div className='flex items-center space-x-1 '>
                <span className='italic'>Đã chọn:</span>
                <span className='font-bold'>{checkedFeedbacksCount}</span>
              </div>
            </div>
            <div className='flex space-x-10 shrink-0'>
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

              {!isFeedbackDetail && (
                <button
                  onClick={deletingMode ? openDeletingDialog : () => setDeletingMode(true)}
                  className={classNames(
                    'py-1 px-2 text-xs tablet:text-sm tablet:px-4 bg-alertRed/80 hover:bg-alertRed rounded-lg',
                    {
                      'opacity-40 cursor-default hover:bg-alertRed/80':
                        (deletingMode && checkedFeedbacksCount == 0) || extendedFeedbacks.length == 0
                    }
                  )}
                  disabled={(deletingMode && checkedFeedbacksCount == 0) || extendedFeedbacks.length == 0}
                >
                  {deletingMode ? 'Xóa' : 'Xóa feedback'}
                </button>
              )}
              {isFeedbackDetail && (
                <button
                  onClick={openDeletingDialog}
                  className={classNames(
                    'py-1 px-2 text-xs tablet:text-sm tablet:px-4 bg-alertRed/80 hover:bg-alertRed rounded-lg'
                  )}
                >
                  {deletingMode ? 'Xóa' : 'Xóa feedback'}
                </button>
              )}
            </div>
          </div>
        </div>

        <div className='mt-4 tablet:mt-6 desktop:mt-8 border border-black/40 rounded-lg p-2 tablet:p-4'>{children}</div>

        <DialogPopup
          isOpen={deletingDialog}
          handleClose={() => {
            setDeletingDialog(false)
          }}
        >
          <div className='space-y-6 w-full'>
            {!isFeedbackDetail && (
              <div className='space-x-1 text-lg'>
                <span>Xóa</span>
                <span className='text-primaryBlue font-bold'>{checkedFeedbacksCount}</span>
                <span>bài viết ?</span>
              </div>
            )}
            {isFeedbackDetail && <div className='space-x-1 text-lg'>Xóa bài viết?</div>}
            <div className='flex justify-between'>
              <button
                onClick={() => setDeletingDialog(false)}
                className='px-4 py-1 text-sm rounded-md bg-primaryBackground/80 hover:bg-primaryBackground'
              >
                Hủy
              </button>
              <button
                onClick={isFeedbackDetail ? handleDeleteCurrentFeedback : handleDeleteMultipleFeedbacks}
                className='px-4 py-1 text-sm rounded-md bg-alertRed/80 hover:bg-alertRed'
              >
                Xóa
              </button>
            </div>
          </div>
        </DialogPopup>

        <DialogPopup
          isOpen={deleteExcutingDialog}
          handleClose={() => {
            setDeleteExcutingDialog(false)
          }}
        >
          {(deleteFeedbacksMutation.isPending || excuting) && <LoadingRing />}
          {(deleteFeedbacksMutation.isSuccess || !excuting) && (
            <p className='text-center text-xl font-medium uppercase leading-6 text-green-500'>Xóa thành công</p>
          )}
        </DialogPopup>
      </Fragment>
    </FeedbackContext.Provider>
  )
}
