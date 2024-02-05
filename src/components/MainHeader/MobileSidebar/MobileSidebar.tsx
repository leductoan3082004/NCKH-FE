import { faBars, faChevronRight, faXmark } from '@fortawesome/free-solid-svg-icons'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { AnimatePresence, motion } from 'framer-motion'
import { Fragment, useState } from 'react'
import useClickOutside from 'src/hooks/useClickOutside'
import MobileSidebarSection from './MobileSidebarSection'
import NavigateDocuments from '../NavigateDocuments'
import NavigateDocumentsUsageOrientation from '../NavigateDocumentsUsageOrientation'
import NavigateHome from '../NavigateHome'

export default function MobileSidebar() {
  //? Use state
  const [mainSection, setMainsection] = useState<boolean>(true)
  const [homeSection, setHomeSection] = useState<boolean>(false)
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

  const openHomeSection = () => {
    setMainsection(false)
    setHomeSection(true)
  }

  const openDocumentsSection = () => {
    setMainsection(false)
    setDocumentsSection(true)
  }

  //? Classnames
  const itemStyles =
    'tablet:hover:text-white hover:text-black px-7 tablet:px-4 py-3 duration-200 tablet:hover:bg-primaryBlue tablet:rounded-md'
  const wrapperStyles = 'text-unhoverText flex flex-col py-4'

  return (
    <Fragment>
      <button
        onClick={openSidebar}
        className='bg-primaryBlue p-2 rounded-md text-white hover:bg-primaryBlueHovering duration-200 text-center flex items-center'
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
              className='fixed bottom-0 left-0 z-10 flex h-full mobileSmall:w-[95%] mobileLarge:w-[75%] w-full flex-col justify-start self-center rounded-lg rounded-l-none shadow-sm overflow-hidden'
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
                        <button
                          onClick={openHomeSection}
                          className='border-black/5 border-y w-full px-6 py-4 text-grayText hover:bg-black/10 hover:text-darkText duration-200 flex items-center justify-between uppercase'
                        >
                          <p className=''>trang chủ</p>
                          <span>
                            <FontAwesomeIcon icon={faChevronRight} className='font-medium' />
                          </span>
                        </button>

                        <button
                          onClick={openDocumentsSection}
                          className='border-black/5 border-y w-full px-6 py-4 text-grayText hover:bg-black/10 hover:text-darkText duration-200 flex items-center justify-between uppercase'
                        >
                          <p className=''>văn bản</p>
                          <span>
                            <FontAwesomeIcon icon={faChevronRight} className='font-medium' />
                          </span>
                        </button>

                        <button
                          onClick={openUsageOrientationSection}
                          className='border-black/5 border-y w-full px-6 py-4 text-grayText hover:bg-black/10 hover:text-darkText duration-200 flex items-center justify-between uppercase'
                        >
                          <p className=''>định hướng sử dụng văn bản</p>
                          <span>
                            <FontAwesomeIcon icon={faChevronRight} className='font-medium' />
                          </span>
                        </button>
                      </div>
                    </motion.div>
                  )}
                </AnimatePresence>
                <div className='absolute top-0 left-0 w-full'>
                  <MobileSidebarSection
                    title='trang chủ'
                    isOpen={homeSection}
                    openMainSection={() => setMainsection(true)}
                    setIsOpen={setHomeSection}
                  >
                    <NavigateHome itemClassNames={itemStyles} wrapperClassNames={wrapperStyles} />
                  </MobileSidebarSection>

                  <MobileSidebarSection
                    title='văn bản'
                    isOpen={documentsSection}
                    openMainSection={() => setMainsection(true)}
                    setIsOpen={setDocumentsSection}
                  >
                    <NavigateDocuments itemClassNames={itemStyles} wrapperClassNames={wrapperStyles} />
                  </MobileSidebarSection>

                  <MobileSidebarSection
                    title='định hướng sử dụng văn bản'
                    isOpen={usageOrientationSection}
                    openMainSection={() => setMainsection(true)}
                    setIsOpen={setUsageOrientationSection}
                  >
                    <NavigateDocumentsUsageOrientation itemClassNames={itemStyles} wrapperClassNames={wrapperStyles} />
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
