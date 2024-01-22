import { NavLink } from 'react-router-dom'
import path from 'src/constants/path'

export default function MobileSidebarHighschoolExamination() {
  const className = 'hover:text-black px-7 py-3 duration-300'
  return (
    <div className='text-unhoverText flex flex-col mt-4 capitalize'>
      <NavLink to={path.home} className={className}>
        nghị luận văn học
      </NavLink>
      <NavLink to={path.home} className={className}>
        nghị luận xã hội
      </NavLink>
      <NavLink to={path.home} className={className}>
        đề minh họa
      </NavLink>
    </div>
  )
}
