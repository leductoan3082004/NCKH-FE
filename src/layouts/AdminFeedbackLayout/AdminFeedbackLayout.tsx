import classNames from 'classnames'
import React, { useState } from 'react'

interface Props {
  children?: React.ReactNode
}

export default function AdminFeedbackLayout({ children }: Props) {
  const [deletingMode, setDeletingMode] = useState<boolean>(false)

  return (
    <div className=''>
      <div className='flex justify-end space-x-4'>
        <button
          onClick={() => setDeletingMode(false)}
          className={classNames(
            'py-1 visible px-2 text-xs tablet:text-sm tablet:px-4 bg-primaryBackground/80 hover:bg-primaryBackground rounded-lg',
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
      <div className='mt-4 tablet:mt-6 desktop:mt-8 border border-black/40 rounded-lg py-2 tablet:py-4 desktop:py-6 px-2 tablet:px-4'>
        {children}
      </div>
    </div>
  )
}
