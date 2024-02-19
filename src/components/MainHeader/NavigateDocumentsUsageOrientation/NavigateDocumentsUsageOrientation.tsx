import classNames from 'classnames'
import { NavLink } from 'react-router-dom'
import mainPath from 'src/constants/path'

interface Props {
  itemClassNames?: string
  wrapperClassNames?: string
  handleClose?: () => void
}

export default function NavigateDocumentsUsageOrientation({ itemClassNames, wrapperClassNames, handleClose }: Props) {
  const onClick = () => {
    handleClose && handleClose()
  }

  return (
    <div className={wrapperClassNames}>
      <NavLink
        to={mainPath.quyTrinhThietKeCongCuDanhGia}
        onClick={onClick}
        className={({ isActive }) =>
          classNames(itemClassNames, 'flex items-center w-full text-left uppercase overflow-auto', {
            'bg-primaryBlueHovering/80 text-white': isActive
          })
        }
      >
        Quy trình thiết kế công cụ đánh giá
      </NavLink>

      <NavLink
        to={mainPath.deMinhHoa}
        onClick={onClick}
        className={({ isActive }) =>
          classNames(itemClassNames, 'flex items-center w-full text-left uppercase overflow-auto', {
            'bg-primaryBlueHovering/80 text-white': isActive
          })
        }
      >
        Đề minh họa
      </NavLink>
    </div>
  )
}
