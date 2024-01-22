import { NavLink } from 'react-router-dom'
import path from 'src/constants/path'

export default function MobileSidebarSampleEssay() {
  const className = 'hover:text-black px-7 py-3 duration-300'
  return (
    <div className='text-unhoverText flex flex-col mt-4'>
      <NavLink to={path.home} className={className}>
        Lớp 8
      </NavLink>
      <NavLink to={path.home} className={className}>
        Lớp 9
      </NavLink>
      <NavLink to={path.home} className={className}>
        Lớp 10
      </NavLink>
      <NavLink to={path.home} className={className}>
        Lớp 11
      </NavLink>
      <NavLink to={path.home} className={className}>
        Lớp 12
      </NavLink>
    </div>
  )
}
