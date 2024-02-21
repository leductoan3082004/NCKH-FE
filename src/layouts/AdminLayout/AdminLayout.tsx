import classNames from 'classnames'
import { useContext } from 'react'
import { NavLink } from 'react-router-dom'
import { adminPath } from 'src/constants/path'
import { AdminProvider } from 'src/contexts/admin.context'
import { AppContext } from 'src/contexts/app.context'

interface Props {
  children?: React.ReactNode
}

export default function AdminLayout({ children }: Props) {
  const { isAuthenticated } = useContext(AppContext)

  return (
    <div className='bg-mainBg py-2 tablet:py-4 desktop:py-6'>
      <div className='container'>
        {isAuthenticated && (
          <div className='relative flex bg-white items-center justify-around rounded-xl border border-primaryBlue py-2 text-xs tablet:text-sm desktop:text-base font-bold text-textLight/80 desktopLarge:text-xl'>
            {/* <div className='absolute left-1/2 top-0 h-full border-l border-white/40'></div> */}
            <NavLink
              to={adminPath.mainPage}
              end
              className={({ isActive }) =>
                classNames('px-4 py-1 uppercase ', {
                  'text-primaryBlue': isActive,
                  'hover:text-primaryBlue': !isActive
                })
              }
            >
              Trang chính
            </NavLink>

            <NavLink
              to={adminPath.postManagement}
              className={({ isActive }) =>
                classNames('px-4 py-1 uppercase ', {
                  'text-primaryBlue': isActive,
                  'hover:text-primaryBlue': !isActive
                })
              }
            >
              Bài viết
            </NavLink>
            <NavLink
              to={adminPath.imageManagement}
              className={({ isActive }) =>
                classNames('px-4 py-1 uppercase ', {
                  'text-primaryBlue': isActive,
                  'hover:text-primaryBlue': !isActive
                })
              }
            >
              Hình ảnh
            </NavLink>

            <NavLink
              to={adminPath.feedbackManagement}
              className={({ isActive }) =>
                classNames('px-4 py-1 uppercase ', {
                  'text-primaryBlue': isActive,
                  'hover:text-primaryBlue': !isActive
                })
              }
            >
              Feedback
            </NavLink>
          </div>
        )}
        <AdminProvider>
          <div className='pt-2 tablet:pt-3 desktop:pt-4'>{children}</div>
        </AdminProvider>
      </div>
    </div>
  )
}
