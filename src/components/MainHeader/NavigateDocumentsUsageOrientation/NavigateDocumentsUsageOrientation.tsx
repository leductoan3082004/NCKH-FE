import classNames from 'classnames'
import { NavLink } from 'react-router-dom'
import { documentUsageOrientationPath } from 'src/constants/path'

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
        to={documentUsageOrientationPath.quyTrinhThietKeCongCuDanhGia}
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
        to={documentUsageOrientationPath.deMinhHoa}
        onClick={onClick}
        className={({ isActive }) =>
          classNames(itemClassNames, 'flex items-center w-full text-left uppercase overflow-auto', {
            'bg-primaryBlueHovering/80 text-white': isActive
          })
        }
      >
        Đề minh họa
      </NavLink>

      <NavLink
        to={documentUsageOrientationPath.deMinhHoaXemNhieu}
        onClick={onClick}
        className={({ isActive }) =>
          classNames(itemClassNames, 'flex items-center w-full text-left uppercase overflow-auto', {
            'bg-primaryBlueHovering/80 text-white': isActive
          })
        }
      >
        Đề minh họa xem nhiều
      </NavLink>
    </div>
  )
}
