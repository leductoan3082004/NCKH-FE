import { NavLink } from 'react-router-dom'
import path from 'src/constants/path'

export default function MobileSidebarDocuments() {
  const className = 'hover:text-black px-7 py-3 duration-300'
  return (
    <div className='text-unhoverText flex flex-col mt-4'>
      <NavLink to={path.home} className={className}>
        Lý luận văn học
      </NavLink>
      <NavLink to={path.home} className={className}>
        Tác giả
      </NavLink>
      <NavLink to={path.home} className={className}>
        Tác phẩm
      </NavLink>
    </div>
  )
}
