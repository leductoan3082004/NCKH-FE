import { NavLink } from 'react-router-dom'
import path from 'src/constants/path'

interface Props {
  itemClassNames?: string
  wrapperClassNames?: string
}

export default function NavigateDocuments({ itemClassNames, wrapperClassNames }: Props) {
  return (
    <div className={wrapperClassNames}>
      <NavLink to={path.home} className={itemClassNames}>
        Lý luận văn học
      </NavLink>
      <NavLink to={path.home} className={itemClassNames}>
        Tác giả
      </NavLink>
      <NavLink to={path.home} className={itemClassNames}>
        Tác phẩm
      </NavLink>
    </div>
  )
}
