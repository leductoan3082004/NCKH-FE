import { useViewport } from 'src/hooks/useViewport'
import MobileSidebar from './MobileSidebar'
import HeaderSearch from './HeaderSearch'
import path from 'src/constants/path'
import { Fragment } from 'react'
import HeaderPopover from './HeaderPopover'
import NavigateDocuments from './NavigateDocuments'
import NavigateDocumentsUsageOrientation from './NavigateDocumentsUsageOrientation'
import NavigateHome from './NavigateHome'

export default function MainHeader() {
  const viewport = useViewport()
  const isSmall = viewport.width < 768

  //? Style
  const popoverStyle = 'border border-black/20 rounded-lg min-w-52 py-3 px-2 text-sm dekstop:text-base'
  const wrapperStyle = 'text-unhoverText flex flex-col '
  const itemStyle =
    'tablet:hover:text-white hover:text-black px-4 tablet:px-3 py-1.5 duration-200 tablet:hover:bg-primaryBlueHovering tablet:rounded-md'

  return (
    <div className='top-0 z-10 flex h-10 w-full items-center bg-headerBg shadow-md duration-200 tablet:h-12 desktop:h-14'>
      <div className='container'>
        <div className='flex justify-between items-center'>
          {isSmall && <MobileSidebar />}
          {!isSmall && (
            <Fragment>
              <div className='uppercase tracking-wide text-primaryBlue font-semibold flex items-center space-x-3 desktopLarge:space-x-4'>
                <HeaderPopover
                  renderPopover={
                    <div className={popoverStyle}>
                      <NavigateHome itemClassNames={itemStyle} wrapperClassNames={wrapperStyle} />
                    </div>
                  }
                  placement='bottom-start'
                  backgroundColor='#fff'
                  offsetValue={2}
                  path={path.home}
                >
                  <p className=''>trang chủ</p>
                </HeaderPopover>

                <HeaderPopover
                  renderPopover={
                    <div className={popoverStyle}>
                      <NavigateDocuments itemClassNames={itemStyle} wrapperClassNames={wrapperStyle} />
                    </div>
                  }
                  placement='bottom-start'
                  backgroundColor='#fff'
                  offsetValue={2}
                  path={path.vanBan}
                >
                  <p className=''>văn bản</p>
                </HeaderPopover>

                <HeaderPopover
                  renderPopover={
                    <div className={popoverStyle}>
                      <NavigateDocumentsUsageOrientation itemClassNames={itemStyle} wrapperClassNames={wrapperStyle} />
                    </div>
                  }
                  placement='bottom-start'
                  backgroundColor='#fff'
                  offsetValue={2}
                  path={path.dinhHuongSuDung}
                >
                  <p className=''>định hướng sử dụng văn bản</p>
                </HeaderPopover>
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
