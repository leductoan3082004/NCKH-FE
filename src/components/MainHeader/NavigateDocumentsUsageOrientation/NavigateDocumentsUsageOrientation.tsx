import { NavLink } from 'react-router-dom'
import path from 'src/constants/path'

interface Props {
  itemClassNames?: string
  wrapperClassNames?: string
}

export default function NavigateDocumentsUsageOrientation({ itemClassNames, wrapperClassNames }: Props) {
  return (
    <div className={wrapperClassNames}>
      <NavLink to={path.thietKeCongCuDanhGia} className={itemClassNames}>
        Quy trình thiết kế công cụ đánh giá
      </NavLink>
      <NavLink to={path.deMinhHoa} className={itemClassNames}>
        Đề minh họa
      </NavLink>
    </div>
  )
}
