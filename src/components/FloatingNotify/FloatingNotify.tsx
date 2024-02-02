import { FloatingOverlay } from '@floating-ui/react'
import { Fragment } from 'react'
import { motion } from 'framer-motion'

interface Props {
  message: string
}

export default function FloatingNotify({ message }: Props) {
  const handleClose = () => {}
  return (
    <FloatingOverlay lockScroll>
      <Fragment>
        <motion.div
          className='fixed inset-0 z-10 bg-black dark:bg-black'
          initial={{ opacity: 0 }}
          animate={{
            opacity: 0.8
          }}
          exit={{ opacity: 0 }}
          transition={{ duration: 0.2 }}
        />
        <motion.div
          className='fixed left-1/2 top-1/2 z-10 flex -translate-x-1/2 -translate-y-1/2 items-center justify-center rounded-2xl shadow-sm w-11/12 mobileLarge:w-10/12 tabletSmall:w-8/12 desktop:w-1/4 text-base desktop:text-lg'
          initial={{ opacity: 0 }}
          animate={{
            opacity: 1
          }}
          exit={{ opacity: 0 }}
          transition={{ duration: 0.2 }}
        >
          <button className='absolute top-1 right-1' onClick={handleClose}></button>
          <p className=''>{message}</p>
        </motion.div>
      </Fragment>
    </FloatingOverlay>
  )
}
