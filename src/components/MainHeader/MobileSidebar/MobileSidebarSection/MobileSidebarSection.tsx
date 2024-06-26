import { faChevronLeft } from '@fortawesome/free-solid-svg-icons'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { AnimatePresence, motion } from 'framer-motion'
import { NavLink } from 'react-router-dom'
import { CategoriesURL } from 'src/constants/categories'

interface Props {
  title: string
  children: React.ReactNode
  isOpen: boolean
  setIsOpen: React.Dispatch<React.SetStateAction<boolean>>
  openMainSection: () => void
  handleOnClick?: () => void
}

export default function MobileSidebarSection({
  title,
  children,
  openMainSection,
  isOpen,
  setIsOpen,
  handleOnClick
}: Props) {
  const closeSection = () => {
    setIsOpen(false)
    openMainSection()
  }

  return (
    <AnimatePresence>
      {isOpen && (
        <motion.div
          className='w-full relative'
          initial={{ opacity: 0, x: '100%' }}
          animate={{
            opacity: 1,
            x: 0
          }}
          exit={{ opacity: 0, x: '100%' }}
          transition={{ duration: 0.3 }}
        >
          <div className='relative w-full text-center py-2 text-darkText'>
            <button
              onClick={closeSection}
              className='absolute top-1/2 -translate-y-1/2 left-1 hover:text-black p-2 duration-200'
            >
              <FontAwesomeIcon icon={faChevronLeft} className='h-5' />
            </button>
            <NavLink
              onClick={handleOnClick}
              to={CategoriesURL.get(title) as string}
              className='uppercase font-bold hover:text-primaryBlue text-center text-lg px-6'
            >
              {title}
            </NavLink>
          </div>
          {children}
        </motion.div>
      )}
    </AnimatePresence>
  )
}
