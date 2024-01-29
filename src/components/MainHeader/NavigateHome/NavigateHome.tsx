import { NavLink } from 'react-router-dom'
import path from 'src/constants/path'

interface Props {
  itemClassNames?: string
  wrapperClassNames?: string
}

export default function NavigateHome({ itemClassNames, wrapperClassNames }: Props) {
  return (
    <div className={wrapperClassNames}>
      <NavLink to={path.home} className={itemClassNames}>
        Giới thiệu về trang web
      </NavLink>
      <NavLink to={path.home} className={itemClassNames}>
        Góp ý
      </NavLink>
      <NavLink to={path.home} className={itemClassNames}>
        Thông tin liên hệ
      </NavLink>
    </div>
  )
}
