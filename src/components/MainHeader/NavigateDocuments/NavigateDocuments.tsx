import { faCaretDown } from '@fortawesome/free-solid-svg-icons'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import classNames from 'classnames'
import { AnimatePresence, motion } from 'framer-motion'
import { NavLink } from 'react-router-dom'
import AnimateChangeInHeight from 'src/components/AnimateChangeInHeight'
import CategoryNavigator from 'src/components/CategoryNavigator'
import { DocumentSystemCategoriesURL } from 'src/constants/categories'
import mainPath from 'src/constants/path'
import useClickOutside from 'src/hooks/useClickOutside'

interface Props {
  itemClassNames?: string
  wrapperClassNames?: string
  handleClose?: () => void
}

export default function NavigateDocuments({ itemClassNames, wrapperClassNames, handleClose }: Props) {
  const { visible, setVisible, ref } = useClickOutside(false)

  const onClick = () => {
    handleClose && handleClose()
  }

  return (
    <div className={wrapperClassNames}>
      <NavLink
        to={mainPath.tieuChiLuaChonVanBan}
        onClick={onClick}
        className={({ isActive }) =>
          classNames(itemClassNames, 'flex items-center w-full justify-between uppercase', {
            'bg-primaryBlueHovering/80 text-white': isActive
          })
        }
      >
        Tiêu chí lựa chọn văn bản
      </NavLink>

      <div ref={ref}>
        <div className='flex justify-between space-x-1 w-full tablet:pr-0'>
          <NavLink
            to={mainPath.heThongVanBan}
            onClick={onClick}
            className={({ isActive }) =>
              classNames(itemClassNames, 'flex items-center w-full justify-between uppercase', {
                'bg-primaryBlueHovering/80 text-white': isActive
              })
            }
          >
            <p className=''>Hệ thống văn bản</p>
          </NavLink>
          <button
            onClick={() => setVisible(!visible)}
            className='py-1 text-black px-2 rounded-md border border-black/20 hover:bg-primaryBlueHovering/80 hover:text-white'
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
              <motion.div className='flex w-full flex-col items-start space-y-1 rounded-b-md pl-4 pr-8 tablet:pl-2 pt-1'>
                {DocumentSystemCategoriesURL.map((category, index) => {
                  return (
                    <CategoryNavigator
                      key={index}
                      category={category.title}
                      pathName={category.pathname}
                      onClick={onClick}
                    />
                  )
                })}
              </motion.div>
            )}
          </AnimatePresence>
        </AnimateChangeInHeight>
      </div>
    </div>
  )
}
