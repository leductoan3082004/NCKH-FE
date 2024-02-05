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
import { ElementType, useRef, useState } from 'react'
import { NavLink } from 'react-router-dom'

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
  path: string
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
  path
}: Props) {
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

  const { getReferenceProps, getFloatingProps } = useInteractions([hover])

  return (
    <div>
      <Element ref={refs.setReference} {...getReferenceProps()}>
        <NavLink
          to={path}
          className={({ isActive }) =>
            classNames(
              'flex items-center hover:bg-primaryBlueHovering text-sm desktop:text-base duration-200 font-semibold px-3 desktop:px-4 py-1.5 rounded-md space-x-1.5 hover:text-white',
              {
                'bg-primaryBlueHovering text-white': isActive || isOpen
              }
            )
          }
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
        </NavLink>
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
