import { NavLink } from 'react-router-dom'
import path from 'src/constants/path'

export default function MobileSidebarContest() {
  const className = 'hover:text-black px-7 py-3 duration-300'
  return (
    <div className='text-unhoverText flex flex-col mt-4'>
      <NavLink to={path.home} className={className}>
        THPT
      </NavLink>
      <NavLink to={path.home} className={className}>
        THCS
      </NavLink>
    </div>
  )
}
