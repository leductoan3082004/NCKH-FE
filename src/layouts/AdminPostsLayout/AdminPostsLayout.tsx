import classNames from 'classnames'
import { NavLink } from 'react-router-dom'
import { adminPath } from 'src/constants/path'

interface Props {
  children?: React.ReactNode
}

export default function AdminPostsLayout({ children }: Props) {
  return (
    <div className=''>
      <div className='relative bg-white rounded-xl border border-primaryBlue grid grid-cols-3 font-semibold lg:text-xl text-xs mobileLarge:text-sm tablet:text-base overflow-hidden'>
        <NavLink
          to={adminPath.createPost}
          className={({ isActive }) =>
            classNames('text-center border-r border-black/40 py-1 uppercase col-span-1', {
              'bg-primaryBackground': isActive,
              'hover:bg-primaryBackground': !isActive
            })
          }
        >
          Tạo bài viết
        </NavLink>

        <NavLink
          to={adminPath.updatePost}
          className={({ isActive }) =>
            classNames('text-center border-r border-black/40 py-1 uppercase col-span-1', {
              'bg-primaryBackground': isActive,
              'hover:bg-primaryBackground': !isActive
            })
          }
        >
          Chỉnh sửa
        </NavLink>

        <NavLink
          to={adminPath.deletePost}
          className={({ isActive }) =>
            classNames('text-center py-1 uppercase col-span-1', {
              'bg-primaryBackground': isActive,
              'hover:bg-primaryBackground': !isActive
            })
          }
        >
          Xóa bài viết
        </NavLink>
      </div>
      <div className='mt-4 tablet:mt-6 desktop:mt-8 border border-black/20 rounded-lg py-2 tablet:py-4 desktop:py-6 px-2 tablet:px-4'>
        {children}
      </div>
    </div>
  )
}
