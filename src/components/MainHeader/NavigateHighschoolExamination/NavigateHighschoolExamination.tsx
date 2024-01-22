import { NavLink } from 'react-router-dom'
import path from 'src/constants/path'

interface Props {
  itemClassNames?: string
  wrapperClassNames?: string
}

export default function NavigateHighschoolExamination({ itemClassNames, wrapperClassNames }: Props) {
  return (
    <div className={wrapperClassNames}>
      <NavLink to={path.home} className={itemClassNames}>
        nghị luận văn học
      </NavLink>
      <NavLink to={path.home} className={itemClassNames}>
        nghị luận xã hội
      </NavLink>
      <NavLink to={path.home} className={itemClassNames}>
        đề minh họa
      </NavLink>
    </div>
  )
}
