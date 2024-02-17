import classNames from 'classnames'
import { useContext } from 'react'
import { AppContext } from 'src/contexts/app.context'

interface Props {
  itemClassNames?: string
  wrapperClassNames?: string
}

export default function NavigateDocumentsUsageOrientation({ itemClassNames, wrapperClassNames }: Props) {
  const { getPostListByCategory } = useContext(AppContext)

  return (
    <div className={wrapperClassNames}>
      <button
        className={classNames(itemClassNames, 'flex items-center w-full justify-between uppercase')}
        onClick={() => getPostListByCategory('Quy trình thiết kế công cụ đánh giá')}
      >
        Quy trình thiết kế công cụ đánh giá
      </button>

      <button
        className={classNames(itemClassNames, 'flex items-center w-full justify-between uppercase')}
        onClick={() => getPostListByCategory('Đề minh họa')}
      >
        Đề minh họa
      </button>
    </div>
  )
}
