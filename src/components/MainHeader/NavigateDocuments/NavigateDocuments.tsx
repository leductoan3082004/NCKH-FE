import { faCaretDown } from '@fortawesome/free-solid-svg-icons'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import classNames from 'classnames'
import { AnimatePresence, motion } from 'framer-motion'
import { useContext } from 'react'
import AnimateChangeInHeight from 'src/components/AnimateChangeInHeight'
import CategoryNavigator from 'src/components/CategoryNavigator'
import { DocumentSystemCategories } from 'src/constants/categories'
import { AppContext } from 'src/contexts/app.context'
import useClickOutside from 'src/hooks/useClickOutside'

interface Props {
  itemClassNames?: string
  wrapperClassNames?: string
  handleClose?: () => void
}

export default function NavigateDocuments({ itemClassNames, wrapperClassNames, handleClose }: Props) {
  const { getPostListByCategory } = useContext(AppContext)

  const { visible, setVisible, ref } = useClickOutside(false)

  const handleClick = (category: string) => () => {
    handleClose && handleClose()
    getPostListByCategory(category)
  }

  return (
    <div className={wrapperClassNames}>
      <button
        className={classNames(itemClassNames, 'flex items-center w-full justify-between uppercase')}
        onClick={handleClick('Tiêu chí lựa chọn văn bản')}
      >
        Tiêu chí lựa chọn văn bản
      </button>

      <div ref={ref}>
        <div className='flex justify-between space-x-1 w-full pr-4 tablet:pr-0'>
          <button
            onClick={handleClick('Hệ thống văn bản')}
            className={classNames(itemClassNames, 'flex items-center w-full justify-between uppercase')}
          >
            <p className=''>Hệ thống văn bản</p>
          </button>
          <button
            onClick={() => setVisible(!visible)}
            className='py-1 text-black px-2 rounded-md border border-black/20 hover:bg-primaryBlueHovering'
          >
            <motion.div
              className=''
              animate={{
                rotate: visible ? 180 : 0
              }}
            >
              <FontAwesomeIcon icon={faCaretDown} />
            </motion.div>
          </button>
        </div>
        <AnimateChangeInHeight className='w-full'>
          <AnimatePresence>
            {visible && (
              <motion.div className='flex w-full flex-col items-start space-y-1 rounded-b-md px-4 tablet:px-2 pt-1'>
                {DocumentSystemCategories.map((category, index) => {
                  return <CategoryNavigator category={category} key={index} />
                })}
              </motion.div>
            )}
          </AnimatePresence>
        </AnimateChangeInHeight>
      </div>
    </div>
  )
}
