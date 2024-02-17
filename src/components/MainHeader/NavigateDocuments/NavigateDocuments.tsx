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
}

export default function NavigateDocuments({ itemClassNames, wrapperClassNames }: Props) {
  const { getPostListByCategory } = useContext(AppContext)

  const { visible, setVisible, ref } = useClickOutside(false)

  return (
    <div className={wrapperClassNames}>
      <button
        className={classNames(itemClassNames, 'flex items-center w-full justify-between uppercase')}
        onClick={() => getPostListByCategory('Tiêu chí lựa chọn văn bản')}
      >
        Tiêu chí lựa chọn văn bản
      </button>

      <div ref={ref}>
        <div className='flex justify-between w-full '>
          <button
            onClick={() => setVisible(!visible)}
            className={classNames(itemClassNames, 'flex items-center w-full justify-between uppercase')}
          >
            <p className=''>Hệ thống văn bản</p>
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
