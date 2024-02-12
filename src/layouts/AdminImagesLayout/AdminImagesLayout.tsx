import classNames from 'classnames'
import { NavLink } from 'react-router-dom'
import { adminPath } from 'src/constants/path'

interface Props {
  children?: React.ReactNode
}

export default function AdminImagesLayout({ children }: Props) {
  return (
    <div className=''>
      <div className='relative bg-white rounded-xl border border-primaryBlue grid grid-cols-3 font-semibold lg:text-xl text-xs mobileLarge:text-sm tablet:text-base overflow-hidden'>
        <NavLink
          end
          to={adminPath.imageManagement}
          className={({ isActive }) =>
            classNames('text-center border-r border-black/40 py-1 uppercase col-span-1', {
              'bg-primaryBackground': isActive,
              'hover:bg-primaryBackground': !isActive
            })
          }
        >
          Danh sách ảnh
        </NavLink>

        <NavLink
          to={adminPath.uploadImage}
          className={({ isActive }) =>
            classNames('text-center border-r border-black/40 py-1 uppercase col-span-1', {
              'bg-primaryBackground': isActive,
              'hover:bg-primaryBackground': !isActive
            })
          }
        >
          Tải ảnh lên
        </NavLink>

        <NavLink
          to={adminPath.deleteImage}
          className={({ isActive }) =>
            classNames('text-center py-1 uppercase col-span-1', {
              'bg-primaryBackground': isActive,
              'hover:bg-primaryBackground': !isActive
            })
          }
        >
          Xóa ảnh
        </NavLink>
      </div>
      <div className='mt-4 tablet:mt-6 desktop:mt-8 border border-black/40 rounded-lg py-2 tablet:py-4 desktop:py-6 px-2 tablet:px-4'>
        {children}
      </div>
    </div>
  )
}
