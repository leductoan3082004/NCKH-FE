import { createSearchParams, useLocation, useNavigate } from 'react-router-dom'
import { AnimatePresence, motion } from 'framer-motion'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faCaretDown } from '@fortawesome/free-solid-svg-icons'
import useClickOutside from 'src/hooks/useClickOutside'
import AnimateChangeInHeight from '../AnimateChangeInHeight'
import { Categories } from 'src/pages/AdminPage/components/AdminCategories/AdminCategories'
import { omit } from 'lodash'
import usePostListQueryConfig from 'src/hooks/usePostListQueryConfig'
import classNames from 'classnames'

export default function SortByCategory() {
  //? Hanlde open/close
  const { visible, setVisible, ref } = useClickOutside(false)
  const toggleOpenClose = () => {
    setVisible(!visible)
  }

  //? Handle sort by category
  const path = useLocation().pathname
  const queryConfig = usePostListQueryConfig()
  const navigate = useNavigate()
  const handleSort = (index: number) => () => {
    setVisible(false)
    if (index == 0) {
      navigate({
        pathname: path,
        search: createSearchParams(
          omit(
            {
              ...queryConfig
            },
            ['category', 'page', 'limit']
          )
        ).toString()
      })
    } else {
      navigate({
        pathname: path,
        search: createSearchParams(
          omit(
            {
              ...queryConfig,
              category: Categories[index]
            },
            ['page', 'limit']
          )
        ).toString()
      })
    }
  }

  return (
    <div
      className={classNames('w-full relative border border-black/40 rounded-md', {
        'border-primaryBlue': visible
      })}
      ref={ref}
    >
      <button
        className='flex px-1 text-xs tablet:text-sm desktop:text-base hover:text-primaryBlue font-semibold space-x-1 py-1 w-full justify-center items-center'
        onClick={toggleOpenClose}
      >
        <p className=''>Lọc theo danh mục</p>
        {queryConfig.category && (
          <div className='flex p-1 rounded-md text-darkText hover:text-darkText bg-primaryBackground items-center justify-center'>
            <span className=''>{queryConfig.category}</span>
          </div>
        )}

        <motion.div
          className=''
          animate={{
            rotate: visible ? 180 : 0
          }}
        >
          <FontAwesomeIcon icon={faCaretDown} />
        </motion.div>
      </button>
      <AnimateChangeInHeight className='w-full'>
        <AnimatePresence>
          {visible && (
            <motion.div className='grid gap-2 grid-cols-2 py-1 px-2'>
              {Categories.map((category, index) => (
                <div className='col-span-1' key={index}>
                  <button
                    className='border h-12 border-black/40 rounded-sm px-2 hover:bg-primaryBackground text-xs desktop:text-sm flex items-center justify-center w-full'
                    onClick={handleSort(index)}
                  >
                    {category}
                  </button>
                </div>
              ))}
            </motion.div>
          )}
        </AnimatePresence>
      </AnimateChangeInHeight>
    </div>
  )
}
