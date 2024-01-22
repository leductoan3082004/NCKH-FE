import { useViewport } from 'src/hooks/useViewport'
import MobileSidebar from '../MobileSidebarSection/MobileSidebar'

export default function MainHeader() {
  const viewport = useViewport()
  const isMobile = viewport.width <= 768

  return (
    <div className='bg-headerBg'>
      <div className='container'>
        <div className='py-4'>{isMobile && <MobileSidebar />}</div>
      </div>
    </div>
  )
}
