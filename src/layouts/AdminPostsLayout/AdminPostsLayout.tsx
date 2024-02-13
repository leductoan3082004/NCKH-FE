import classNames from 'classnames'
import { NavLink } from 'react-router-dom'
import { adminPath } from 'src/constants/path'

interface Props {
  children?: React.ReactNode
}

export default function AdminPostManagementLayout({ children }: Props) {
  return (
    <div className=''>
      <div className='relative bg-white rounded-xl border border-primaryBlue grid grid-cols-2 desktopLarge:text-xl text-xs tablet:text-sm desktop:text-base overflow-hidden'>
        <NavLink
          end
          to={adminPath.postManagement}
          className={({ isActive }) =>
            classNames('text-center border-r border-black/40 py-1 uppercase col-span-1', {
              'bg-primaryBackground': isActive,
              'hover:bg-primaryBackground': !isActive
            })
          }
        >
          Quản lí bài viết
        </NavLink>

        <NavLink
          end
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
      </div>
      <div className='mt-2 tablet:mt-3 desktop:mt-4 border border-black/40 rounded-lg p-2 tablet:p-3 desktop:p-4'>
        {children}
      </div>
    </div>
  )
}
