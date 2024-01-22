import {
  arrow,
  offset,
  safePolygon,
  shift,
  useFloating,
  useHover,
  useInteractions,
  type Placement,
  FloatingOverlay,
  FloatingArrow
} from '@floating-ui/react'
import { motion } from 'framer-motion'
import { ElementType, useRef, useState } from 'react'

interface Props {
  haveArrow?: boolean
  backgroundColor: string
  children: React.ReactNode
  renderPopover: React.ReactNode
  className?: string
  as?: ElementType
  initialOpen?: boolean
  placement?: Placement
  offsetValue?: number
}

export default function Popover({
  haveArrow = false,
  backgroundColor,
  children,
  className,
  renderPopover,
  as: Element = 'div',
  initialOpen,
  placement,
  offsetValue = 14
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
      <Element className={className} ref={refs.setReference} {...getReferenceProps()}>
        {children}
      </Element>
      {isOpen && (
        <FloatingOverlay lockScroll>
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
            initial={{ opacity: 0, transform: 'scale(0)' }}
            animate={{ opacity: 1, transform: 'scale(1)' }}
            exit={{ opacity: 0, transform: 'scale(0)' }}
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
        </FloatingOverlay>
      )}
    </div>
  )
}
