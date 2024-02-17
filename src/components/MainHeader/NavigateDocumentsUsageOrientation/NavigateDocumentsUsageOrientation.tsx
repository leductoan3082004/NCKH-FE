import classNames from 'classnames'
import { useContext } from 'react'
import { AppContext } from 'src/contexts/app.context'

interface Props {
  itemClassNames?: string
  wrapperClassNames?: string
  handleClose?: () => void
}

export default function NavigateDocumentsUsageOrientation({ itemClassNames, wrapperClassNames, handleClose }: Props) {
  const { getPostListByCategory } = useContext(AppContext)

  const handleClick = (category: string) => () => {
    handleClose && handleClose()
    getPostListByCategory(category)
  }

  return (
    <div className={wrapperClassNames}>
      <button
        className={classNames(itemClassNames, 'flex items-center w-full text-left uppercase overflow-auto')}
        onClick={handleClick('Quy trình thiết kế công cụ đánh giá')}
      >
        Quy trình thiết kế công cụ đánh giá
      </button>

      <button
        className={classNames(itemClassNames, 'flex items-center w-full text-left uppercase')}
        onClick={handleClick('Đề minh họa')}
      >
        Đề minh họa
      </button>
    </div>
  )
}
