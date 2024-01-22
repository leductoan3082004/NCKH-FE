import { faMagnifyingGlass } from '@fortawesome/free-solid-svg-icons'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { Fragment } from 'react'
import Popover from 'src/components/Popover'
import SearchBar from 'src/components/SearchBar'
import { useViewport } from 'src/hooks/useViewport'

export default function HeaderSearch() {
  //? Responsive
  const viewport = useViewport()
  const largeMobile = viewport.width >= 390 && viewport.width < 768
  const desktop = useViewport().width >= 1024

  return (
    <Fragment>
      {(desktop || largeMobile) && (
        <div className='w-40'>
          <SearchBar />
        </div>
      )}
      {!desktop && !largeMobile && (
        <div>
          <Popover
            renderPopover={
              <div className='py-8 px-10'>
                <SearchBar />
              </div>
            }
            className=''
            offsetValue={2}
            backgroundColor='#f5f5f5'
            haveArrow
            placement='bottom-end'
          >
            <div className='bg-primaryGreen text-white hover:bg-primaryHoverGreen p-2 rounded-md'>
              <FontAwesomeIcon icon={faMagnifyingGlass} />
            </div>
          </Popover>
        </div>
      )}
    </Fragment>
  )
}
