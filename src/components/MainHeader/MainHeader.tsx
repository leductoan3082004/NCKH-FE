import { useViewport } from 'src/hooks/useViewport'
import MobileSidebar from './MobileSidebar'
import HeaderSearch from './HeaderSearch'
import { NavLink } from 'react-router-dom'
import path from 'src/constants/path'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faCaretDown } from '@fortawesome/free-solid-svg-icons'
import Popover from '../Popover'
import NavigateSampleEssays from './NavigateSampleEssays'
import NavigateContests from './NavigateContests'
import NavigateHighschoolExamination from './NavigateHighschoolExamination'
import NavigateDocuments from './NavigateDocuments'
import classNames from 'classnames'

export default function MainHeader() {
  const viewport = useViewport()
  const isSmall = viewport.width <= 768

  //? Styles
  const titleStyles =
    'flex items-center text-sm tabletLarge:text-base hover:bg-sectionGreen duration-200 font-semibold px-2 tabletLarge:px-3 py-1 rounded-md space-x-1.5'
  const generateTileStyles = (isActive: boolean) =>
    classNames(titleStyles, {
      'bg-sectionGreen': isActive,
      'bg-transparent': !isActive
    })
  const iconStyles = 'h-3 tabletLarge:h-4'
  const wrapperStyles = 'text-unhoverText flex flex-col py-4'
  const popoverStyles = 'border border-black/20 rounded-lg min-w-52 px-3'
  const itemStyles =
    'tabletLarge:hover:text-white hover:text-black px-7 tabletLarge:px-4 py-3 duration-200 tabletLarge:hover:bg-primaryGreen tabletLarge:rounded-md'

  return (
    <div className='bg-headerBg'>
      <div className='container'>
        <div className='flex justify-between items-center py-4'>
          {isSmall && <MobileSidebar />}
          {!isSmall && (
            <div className='uppercase text-primaryGreen font-semibold flex items-center space-x-1 desktopLarge:space-x-4'>
              <NavLink to={path.home} className={({ isActive }) => generateTileStyles(isActive)}>
                Trang chủ
              </NavLink>

              <Popover
                renderPopover={
                  <div className={popoverStyles}>
                    <NavigateSampleEssays itemClassNames={itemStyles} wrapperClassNames={wrapperStyles} />
                  </div>
                }
                placement='bottom-start'
                backgroundColor='#fff'
                offsetValue={2}
              >
                <NavLink to={path.vanMau} className={({ isActive }) => generateTileStyles(isActive)}>
                  <p className=''>văn mẫu</p>
                  <span>
                    <FontAwesomeIcon icon={faCaretDown} className={iconStyles} />
                  </span>
                </NavLink>
              </Popover>

              <Popover
                renderPopover={
                  <div className={popoverStyles}>
                    <NavigateContests itemClassNames={itemStyles} wrapperClassNames={wrapperStyles} />
                  </div>
                }
                placement='bottom-start'
                backgroundColor='#fff'
                offsetValue={2}
              >
                <NavLink to={path.thiHSG} className={({ isActive }) => generateTileStyles(isActive)}>
                  <p className=''>kỳ thi học sinh giỏi</p>
                  <span>
                    <FontAwesomeIcon icon={faCaretDown} className={iconStyles} />
                  </span>
                </NavLink>
              </Popover>

              <Popover
                renderPopover={
                  <div className={popoverStyles}>
                    <NavigateHighschoolExamination itemClassNames={itemStyles} wrapperClassNames={wrapperStyles} />
                  </div>
                }
                placement='bottom-start'
                backgroundColor='#fff'
                offsetValue={2}
              >
                <NavLink to={path.thptqg} className={({ isActive }) => generateTileStyles(isActive)}>
                  <p className=''>kỳ thi thptqg</p>
                  <span>
                    <FontAwesomeIcon icon={faCaretDown} className={iconStyles} />
                  </span>
                </NavLink>
              </Popover>

              <Popover
                renderPopover={
                  <div className={popoverStyles}>
                    <NavigateDocuments itemClassNames={itemStyles} wrapperClassNames={wrapperStyles} />
                  </div>
                }
                placement='bottom-start'
                backgroundColor='#fff'
                offsetValue={2}
              >
                <NavLink to={path.taiLieu} className={({ isActive }) => generateTileStyles(isActive)}>
                  <p className=''>tài liệu</p>
                  <span>
                    <FontAwesomeIcon icon={faCaretDown} className={iconStyles} />
                  </span>
                </NavLink>
              </Popover>

              <NavLink to={path.tanMan} className={({ isActive }) => generateTileStyles(isActive)}>
                tản mạn
              </NavLink>
            </div>
          )}
          <div className=''>
            <HeaderSearch />
          </div>
        </div>
      </div>
    </div>
  )
}
