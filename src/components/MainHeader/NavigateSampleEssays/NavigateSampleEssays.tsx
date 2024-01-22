import { NavLink } from 'react-router-dom'
import path from 'src/constants/path'

interface Props {
  itemClassNames?: string
  wrapperClassNames?: string
}

export default function NavigateSampleEssays({ itemClassNames, wrapperClassNames }: Props) {
  return (
    <div className={wrapperClassNames}>
      <NavLink to={path.home} className={itemClassNames}>
        Lớp 8
      </NavLink>
      <NavLink to={path.home} className={itemClassNames}>
        Lớp 9
      </NavLink>
      <NavLink to={path.home} className={itemClassNames}>
        Lớp 10
      </NavLink>
      <NavLink to={path.home} className={itemClassNames}>
        Lớp 11
      </NavLink>
      <NavLink to={path.home} className={itemClassNames}>
        Lớp 12
      </NavLink>
    </div>
  )
}
