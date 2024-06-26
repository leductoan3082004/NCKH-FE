import { useViewport } from 'src/hooks/useViewport'
import MobileSidebar from './MobileSidebar'
import HeaderSearch from './HeaderSearch'
import mainPath from 'src/constants/path'
import { Fragment } from 'react'
import HeaderPopover from './HeaderPopover'
import NavigateDocuments from './NavigateDocuments'
import NavigateDocumentsUsageOrientation from './NavigateDocumentsUsageOrientation'
import classNames from 'classnames'
import { NavLink } from 'react-router-dom'

export default function MainHeader() {
  const viewport = useViewport()
  const isSmall = viewport.width < 768

  //? Style
  const popoverStyle = 'border border-black/20 rounded-lg min-w-52 py-3 px-2 text-sm dekstop:text-base'
  const wrapperStyle = 'text-darkText font-medium flex flex-col space-y-1'
  const itemStyle =
    'tablet:hover:text-white hover:text-black px-4 tablet:px-3 py-1.5 duration-200 tablet:hover:bg-primaryBlueHovering/80 tablet:rounded-md'

  return (
    <div className='top-0 z-10 flex h-12 w-full items-center bg-headerBg shadow-md duration-200 tablet::h-14'>
      <div className='container'>
        <div className='flex justify-between items-center'>
          {isSmall && <MobileSidebar />}
          {!isSmall && (
            <Fragment>
              <div className='uppercase tracking-wide  text-darkText font-bold flex items-center space-x-3 desktopLarge:space-x-4'>
                <NavLink
                  to={mainPath.home}
                  className={({ isActive }) =>
                    classNames(
                      'flex items-center hover:bg-primaryBlueHovering text-sm desktop:text-base duration-200 font-medium px-2 desktop:px-4 py-1.5 rounded-md hover:text-white',
                      {
                        'bg-primaryBlueHovering text-white': isActive
                      }
                    )
                  }
                >
                  <p className=''>trang chủ</p>
                </NavLink>

                <HeaderPopover
                  pathName={mainPath.vanBan}
                  renderPopover={
                    <div className={popoverStyle}>
                      <NavigateDocuments itemClassNames={itemStyle} wrapperClassNames={wrapperStyle} />
                    </div>
                  }
                  placement='bottom-start'
                  backgroundColor='#fff'
                  offsetValue={2}
                >
                  <p className=''>văn bản</p>
                </HeaderPopover>

                <HeaderPopover
                  pathName={mainPath.dinhHuongSuDungVanBan}
                  renderPopover={
                    <div className={popoverStyle}>
                      <NavigateDocumentsUsageOrientation itemClassNames={itemStyle} wrapperClassNames={wrapperStyle} />
                    </div>
                  }
                  placement='bottom-start'
                  backgroundColor='#fff'
                  offsetValue={2}
                >
                  <p className=''>định hướng sử dụng văn bản</p>
                </HeaderPopover>

                <NavLink
                  to={mainPath.contact}
                  className={({ isActive }) =>
                    classNames(
                      'flex items-center hover:bg-primaryBlueHovering text-sm desktop:text-base duration-200 font-medium px-2 desktop:px-4 py-1.5 rounded-md hover:text-white',
                      {
                        'bg-primaryBlueHovering text-white': isActive
                      }
                    )
                  }
                >
                  <p className=''>liên hệ</p>
                </NavLink>
              </div>
            </Fragment>
          )}

          <div className='w-full mobileSmall:w-auto flex justify-end'>
            <HeaderSearch />
          </div>
        </div>
      </div>
    </div>
  )
}
