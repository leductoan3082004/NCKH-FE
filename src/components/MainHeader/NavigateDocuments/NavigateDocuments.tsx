import { faCaretDown } from '@fortawesome/free-solid-svg-icons'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import classNames from 'classnames'
import { AnimatePresence, motion } from 'framer-motion'
import { NavLink } from 'react-router-dom'
import AnimateChangeInHeight from 'src/components/AnimateChangeInHeight'
import path, { documentSystemPath } from 'src/constants/path'
import useClickOutside from 'src/hooks/useClickOutside'

interface Props {
  itemClassNames?: string
  wrapperClassNames?: string
}

export default function NavigateDocuments({ itemClassNames, wrapperClassNames }: Props) {
  const { visible, setVisible, ref } = useClickOutside(false)

  const itemStyle =
    'w-full tablet:hover:text-white hover:text-black px-4 tablet:px-2 py-1.5 duration-200 tablet:hover:bg-primarayBlueHovering/80 tablet:rounded-md text-sm'

  return (
    <div className={wrapperClassNames}>
      <NavLink to={path.home} className={itemClassNames}>
        Tiêu chí lựa chọn văn bản
      </NavLink>
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
              <motion.div
                className='flex w-full flex-col items-start space-y-1 rounded-b-md px-4 pt-1'
                // initial={{ opacity: 0, y: '-20%' }}
                // animate={{
                //   opacity: 1,
                //   y: 0,
                //   color: theme === 'dark' ? '#eeeeee' : '#222222'
                // }}
                // exit={{ opacity: 0, y: '-20%' }}
                // transition={{ duration: 0.3 }}
              >
                <NavLink to={documentSystemPath.tho} className={itemStyle}>
                  Thơ
                </NavLink>

                <NavLink to={documentSystemPath.truyenTho} className={itemStyle}>
                  Truyện thơ
                </NavLink>

                <NavLink to={documentSystemPath.truyenKi} className={itemStyle}>
                  Truyện kí
                </NavLink>

                <NavLink to={documentSystemPath.truyenNganHienDai} className={itemStyle}>
                  Truyện ngắn hiện đại
                </NavLink>

                <NavLink to={documentSystemPath.biKich} className={itemStyle}>
                  Bi kịch
                </NavLink>

                <NavLink to={documentSystemPath.tuyButTanVan} className={itemStyle}>
                  Tùy bút, tản văn
                </NavLink>
              </motion.div>
            )}
          </AnimatePresence>
        </AnimateChangeInHeight>
      </div>
    </div>
  )
}
