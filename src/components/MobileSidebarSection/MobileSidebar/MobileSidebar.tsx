import { faBars, faChevronRight, faXmark } from '@fortawesome/free-solid-svg-icons'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { AnimatePresence, motion } from 'framer-motion'
import { Fragment, useState } from 'react'
import useClickOutside from 'src/hooks/useClickOutside'
import SearchBar from '../../SearchBar'
import { NavLink } from 'react-router-dom'
import path from 'src/constants/path'
import MobileSidebarSampleEssay from '../MobileSidebarSampleEssay'
import MobileSidebarSection from '..'
import MobileSidebarContest from '../MobileSidebarContest'
import MobileSidebarHighschoolExamination from '../MobileSidebarHighschoolExamination'
import MobileSidebarDocuments from '../MobileSidebarDocuments'

export default function MobileSidebar() {
  //? Use state
  const [mainSection, setMainsection] = useState<boolean>(true)
  const [essaysSection, setEssaysSection] = useState<boolean>(false)
  const [contestsSection, setContestsSection] = useState<boolean>(false)
  const [highSchoolExaminationSection, setHighSchoolExaminationSection] = useState<boolean>(false)
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
  const openContestsSection = () => {
    setMainsection(false)
    setContestsSection(true)
  }

  const openEssaysSection = () => {
    setMainsection(false)
    setEssaysSection(true)
  }

  const openHighSchoolExaminationSection = () => {
    setMainsection(false)
    setHighSchoolExaminationSection(true)
  }

  const openDocumentsSection = () => {
    setMainsection(false)
    setDocumentsSection(true)
  }

  return (
    <Fragment>
      <button
        onClick={openSidebar}
        className='bg-primaryGreen p-2 rounded-md text-white hover:bg-primaryHoverGreen duration-300 text-center flex items-center'
      >
        <FontAwesomeIcon icon={faBars} className='h-4 w-5 sm:h-5 sm:w-6' />
      </button>
      <AnimatePresence>
        {visible && (
          <div className='relative'>
            <motion.div
              className='fixed inset-0'
              initial={{ opacity: 0, backgroundColor: 'black' }}
              animate={{
                opacity: 0.4
              }}
              exit={{ opacity: 0 }}
              transition={{ duration: 0.3 }}
            />
            <motion.div
              className='fixed bottom-0 left-0 z-10 flex h-full mobileS:w-[70%] mobileL:w-[60%] sm:w-[50%] w-full flex-col justify-start self-center rounded-lg rounded-l-none shadow-sm overflow-hidden'
              initial={{ opacity: 0, x: '-100%' }}
              animate={{
                opacity: 1,
                x: 0,
                backgroundColor: '#f6f6f6',
                color: '#111111'
              }}
              exit={{ opacity: 0, x: '-100%' }}
              transition={{ duration: 0.3 }}
              ref={ref}
            >
              <button
                onClick={closeSidebar}
                className='absolute top-1 right-2 text-black/40 hover:text-black/60 p-2 sm:h-6 duration-300'
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
                      <div className='w-full px-4 py-4'>
                        <SearchBar />
                      </div>
                      <div className='font-semibold flex flex-col uppercase'>
                        <NavLink
                          to={path.home}
                          className='border-black/5 border-y w-full px-6 py-4 text-grayText hover:bg-black/10 hover:text-darkText duration-300'
                        >
                          <p>trang chủ</p>
                        </NavLink>
                        <button
                          onClick={openEssaysSection}
                          className='border-black/5 border-y w-full px-6 py-4 text-grayText hover:bg-black/10 hover:text-darkText duration-300 flex items-center justify-between uppercase'
                        >
                          <p className=''>văn mẫu</p>
                          <span>
                            <FontAwesomeIcon icon={faChevronRight} className='font-medium' />
                          </span>
                        </button>
                        <button
                          onClick={openContestsSection}
                          className='border-black/5 border-y w-full px-6 py-4 text-grayText hover:bg-black/10 hover:text-darkText duration-300 flex items-center justify-between uppercase'
                        >
                          <p className=''>kỳ thi học sinh giỏi</p>
                          <span>
                            <FontAwesomeIcon icon={faChevronRight} className='font-medium' />
                          </span>
                        </button>
                        <button
                          onClick={openHighSchoolExaminationSection}
                          className='border-black/5 border-y w-full px-6 py-4 text-grayText hover:bg-black/10 hover:text-darkText duration-300 flex items-center justify-between uppercase'
                        >
                          <p className=''>kỳ thi THPTQG</p>
                          <span>
                            <FontAwesomeIcon icon={faChevronRight} className='font-medium' />
                          </span>
                        </button>
                        <button
                          onClick={openDocumentsSection}
                          className='border-black/5 border-y w-full px-6 py-4 text-grayText hover:bg-black/10 hover:text-darkText duration-300 flex items-center justify-between uppercase'
                        >
                          <p className=''>tài liệu</p>
                          <span>
                            <FontAwesomeIcon icon={faChevronRight} className='font-medium' />
                          </span>
                        </button>
                        <NavLink
                          to={path.home}
                          className='border-black/5 border-b w-full px-6 py-4 text-grayText hover:bg-black/10 hover:text-darkText duration-300'
                        >
                          <p>tản mạn</p>
                        </NavLink>
                      </div>
                    </motion.div>
                  )}
                </AnimatePresence>
                <div className='absolute top-0 left-0 w-full'>
                  <MobileSidebarSection
                    title='văn mẫu'
                    isOpen={essaysSection}
                    openMainSection={() => setMainsection(true)}
                    setIsOpen={setEssaysSection}
                  >
                    <MobileSidebarSampleEssay />
                  </MobileSidebarSection>

                  <MobileSidebarSection
                    title='kỳ thi học sinh giỏi'
                    isOpen={contestsSection}
                    openMainSection={() => setMainsection(true)}
                    setIsOpen={setContestsSection}
                  >
                    <MobileSidebarContest />
                  </MobileSidebarSection>

                  <MobileSidebarSection
                    title='kỳ thi THPTQG'
                    isOpen={highSchoolExaminationSection}
                    openMainSection={() => setMainsection(true)}
                    setIsOpen={setHighSchoolExaminationSection}
                  >
                    <MobileSidebarHighschoolExamination />
                  </MobileSidebarSection>

                  <MobileSidebarSection
                    title='tài liệu'
                    isOpen={documentsSection}
                    openMainSection={() => setMainsection(true)}
                    setIsOpen={setDocumentsSection}
                  >
                    <MobileSidebarDocuments />
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
