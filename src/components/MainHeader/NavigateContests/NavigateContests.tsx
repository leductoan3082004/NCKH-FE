import { NavLink } from 'react-router-dom'
import path from 'src/constants/path'

interface Props {
  itemClassNames?: string
  wrapperClassNames?: string
}

export default function NavigateContests({ itemClassNames, wrapperClassNames }: Props) {
  return (
    <div className={wrapperClassNames}>
      <NavLink to={path.home} className={itemClassNames}>
        THPT
      </NavLink>
      <NavLink to={path.home} className={itemClassNames}>
        THCS
      </NavLink>
    </div>
  )
}
