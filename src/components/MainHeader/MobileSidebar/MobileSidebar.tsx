import { faBars, faChevronRight, faXmark } from '@fortawesome/free-solid-svg-icons'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { AnimatePresence, motion } from 'framer-motion'
import { Fragment, useState } from 'react'
import useClickOutside from 'src/hooks/useClickOutside'
import MobileSidebarSection from './MobileSidebarSection'
import NavigateDocuments from '../NavigateDocuments'
import NavigateDocumentsUsageOrientation from '../NavigateDocumentsUsageOrientation'
import { NavLink } from 'react-router-dom'
import mainPath from 'src/constants/path'

export default function MobileSidebar() {
  //? Use state
  const [mainSection, setMainsection] = useState<boolean>(true)
  const [usageOrientationSection, setUsageOrientationSection] = useState<boolean>(false)
  const [documentsSection, setDocumentsSection] = useState<boolean>(false)

  //? Use hooks
  const { visible, setVisible, ref } = useClickOutside(false)

  const openSidebar = () => {
    setVisible(true)
  }
  const closeSidebar = () => {
    setVisible(false)
  }

  //? Handle open/close sections
  const openUsageOrientationSection = () => {
    setMainsection(false)
    setUsageOrientationSection(true)
  }

  const openDocumentsSection = () => {
    setMainsection(false)
    setDocumentsSection(true)
  }

  //? Handle close sidebar
  const closeAndResetSidebar = () => {
    closeSidebar()
    setMainsection(true)
    setUsageOrientationSection(false)
    setDocumentsSection(false)
  }

  //? STYLES
  const itemStyle =
    'rounded-md px-7 tablet:px-4 py-3 duration-200 hover:bg-primaryBlueHovering/80 text-darkText hover:text-white tablet:rounded-md'
  const wrapperStyle = 'text-darkText flex flex-col py-4 space-y-2 px-4'
  const titleStyle =
    'border-black/5 border-y w-full px-6 py-4 text-darkText font-medium hover:bg-black/10 hover:text-darkText duration-200 flex items-center justify-between uppercase'

  return (
    <Fragment>
      <button
        onClick={openSidebar}
        className='bg-primaryBackground/80 p-2 rounded-md text-white hover:bg-primaryBackground duration-200 text-center flex items-center'
      >
        <FontAwesomeIcon icon={faBars} className='h-4 w-5 sm:h-5 sm:w-6' />
      </button>
      <AnimatePresence>
        {visible && (
          <div className='relative'>
            <motion.div
              className='fixed inset-0 z-10'
              initial={{ opacity: 0, backgroundColor: 'black' }}
              animate={{
                opacity: 0.4
              }}
              exit={{ opacity: 0 }}
              transition={{ duration: 0.3 }}
            />
            <motion.div
              className='fixed bottom-0 left-0 z-10 flex h-full mobileSmall:w-[95%] mobileLarge:w-[80%] w-full flex-col justify-start self-center rounded-lg rounded-l-none shadow-sm overflow-hidden tabletSmall:w-[60%]'
              initial={{ opacity: 0, x: '-100%' }}
              animate={{
                opacity: 1,
                x: 0,
                backgroundColor: '#f5f5f5',
                color: '#111111'
              }}
              exit={{ opacity: 0, x: '-100%' }}
              transition={{ duration: 0.3 }}
              ref={ref}
            >
              <button
                onClick={closeSidebar}
                className='absolute top-1 right-2 text-black/40 hover:text-black/60 p-2 sm:h-6 duration-200'
              >
                <FontAwesomeIcon icon={faXmark} className='h-5 sm:h-6' />
              </button>
              <div className='relative my-10'>
                <AnimatePresence>
                  {mainSection && (
                    <motion.div
                      className=''
                      initial={{ opacity: 0, x: '-100%' }}
                      animate={{
                        opacity: 1,
                        x: 0
                      }}
                      exit={{ opacity: 0, x: '-100%' }}
                      transition={{ duration: 0.3 }}
                    >
                      <div className='font-semibold flex flex-col uppercase'>
                        <NavLink to={mainPath.home} className={titleStyle} onClick={closeSidebar}>
                          <p className=''>trang chủ</p>
                        </NavLink>

                        <button onClick={openDocumentsSection} className={titleStyle}>
                          <p className=''>văn bản</p>
                          <span>
                            <FontAwesomeIcon icon={faChevronRight} className='' />
                          </span>
                        </button>

                        <button onClick={openUsageOrientationSection} className={titleStyle}>
                          <p className=''>định hướng sử dụng văn bản</p>
                          <span>
                            <FontAwesomeIcon icon={faChevronRight} className='' />
                          </span>
                        </button>

                        <NavLink to={mainPath.contact} className={titleStyle} onClick={closeSidebar}>
                          <p className=''>liên hệ</p>
                        </NavLink>
                      </div>
                    </motion.div>
                  )}
                </AnimatePresence>

                <div className='absolute top-0 left-0 w-full'>
                  <MobileSidebarSection
                    title='Văn bản'
                    handleOnClick={closeAndResetSidebar}
                    isOpen={documentsSection}
                    openMainSection={() => setMainsection(true)}
                    setIsOpen={setDocumentsSection}
                  >
                    <NavigateDocuments
                      itemClassNames={itemStyle}
                      wrapperClassNames={wrapperStyle}
                      handleClose={closeAndResetSidebar}
                    />
                  </MobileSidebarSection>

                  <MobileSidebarSection
                    title='Định hướng sử dụng văn bản'
                    handleOnClick={closeAndResetSidebar}
                    isOpen={usageOrientationSection}
                    openMainSection={() => setMainsection(true)}
                    setIsOpen={setUsageOrientationSection}
                  >
                    <NavigateDocumentsUsageOrientation
                      itemClassNames={itemStyle}
                      wrapperClassNames={wrapperStyle}
                      handleClose={closeAndResetSidebar}
                    />
                  </MobileSidebarSection>
                </div>
              </div>
            </motion.div>
          </div>
        )}
      </AnimatePresence>
    </Fragment>
  )
}
