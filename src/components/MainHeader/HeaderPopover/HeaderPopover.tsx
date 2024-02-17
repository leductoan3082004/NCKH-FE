import {
  arrow,
  offset,
  safePolygon,
  shift,
  useFloating,
  useHover,
  useInteractions,
  type Placement,
  FloatingArrow
} from '@floating-ui/react'
import { faCaretDown } from '@fortawesome/free-solid-svg-icons'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import classNames from 'classnames'
import { motion } from 'framer-motion'
import { ElementType, useContext, useRef, useState } from 'react'
import { AppContext } from 'src/contexts/app.context'
import usePostListQueryConfig from 'src/hooks/usePostListQueryConfig'

interface Props {
  haveArrow?: boolean
  backgroundColor: string
  renderPopover: React.ReactNode
  className?: string
  as?: ElementType
  initialOpen?: boolean
  placement?: Placement
  offsetValue?: number
  children: React.ReactNode
  category: string
}

export default function HeaderPopover({
  haveArrow = false,
  backgroundColor,
  renderPopover,
  as: Element = 'div',
  initialOpen,
  placement,
  offsetValue = 14,
  children,
  category
}: Props) {
  //? USE CONTEXT
  const { getPostListByCategory } = useContext(AppContext)

  //? USE STATE
  const [isOpen, setIsOpen] = useState<boolean>(initialOpen || false)

  const arrowRef = useRef(null)
  const { x, y, refs, strategy, middlewareData, context } = useFloating({
    open: isOpen,
    onOpenChange: setIsOpen,
    middleware: [offset(offsetValue), shift(), arrow({ element: arrowRef })],
    placement: placement || 'bottom'
  })
  const hover = useHover(context, {
    handleClose: safePolygon({
      requireIntent: false,
      blockPointerEvents: true
    })
  })

  //? Check if current category is active
  const postConfig = usePostListQueryConfig()
  const { category: activeCategory } = postConfig
  const isActive = activeCategory == category

  const { getReferenceProps, getFloatingProps } = useInteractions([hover])

  //! HANDLE CLICK CATEGORY
  const handleSelect = () => {
    getPostListByCategory(category)
  }

  return (
    <div>
      <Element ref={refs.setReference} {...getReferenceProps()}>
        <button
          className={classNames(
            'flex items-center hover:bg-primaryBlueHovering text-sm desktop:text-base duration-200 font-semibold px-3 uppercase desktop:px-4 py-1.5 rounded-md space-x-1.5 hover:text-white',
            {
              'bg-primaryBlueHovering text-white': isActive || isOpen
            }
          )}
          onClick={handleSelect}
        >
          {children}
          <motion.div
            className=''
            animate={{
              rotate: isOpen ? 180 : 0
            }}
          >
            <FontAwesomeIcon icon={faCaretDown} />
          </motion.div>
        </button>
      </Element>
      {isOpen && (
        <motion.div
          ref={refs.setFloating}
          style={{
            position: strategy,
            top: y ?? 0,
            left: x ?? 0,
            zIndex: 10,
            width: 'max-content',
            transformOrigin: `${middlewareData.arrow?.x}px top`
          }}
          {...getFloatingProps()}
          initial={{ opacity: 0, transform: 'scale(1)' }}
          animate={{ opacity: 1, transform: 'scale(1)' }}
          exit={{ opacity: 0, transform: 'scale(1)' }}
          transition={{ duration: 0.2 }}
        >
          {haveArrow && (
            <FloatingArrow ref={arrowRef} context={context} width={20} height={10} fill={backgroundColor} />
          )}

          <div
            className='shadow-md rounded-lg'
            style={{
              background: backgroundColor
            }}
          >
            {renderPopover}
          </div>
        </motion.div>
      )}
    </div>
  )
}
