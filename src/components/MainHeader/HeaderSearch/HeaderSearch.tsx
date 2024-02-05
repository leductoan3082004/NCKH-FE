import { Fragment } from 'react'
import SearchBar from 'src/components/SearchBar'
// import { useViewport } from 'src/hooks/useViewport'

export default function HeaderSearch() {
  //? Responsive
  // const viewport = useViewport()
  // const largeMobile = viewport.width >= 390 && viewport.width < 768
  // const desktop = useViewport().width >= 1024

  return (
    <Fragment>
      <div className='w-4/5 mobileSmall:w-52 tabletSmall:w-60'>
        <SearchBar />
      </div>
      {/* {!desktop && !largeMobile && (
        <div>
          <Popover
            renderPopover={
              <div className='py-8 px-10'>
                <SearchBar />
              </div>
            }
            offsetValue={2}
            backgroundColor='#f5f5f5'
            haveArrow
            placement='bottom-end'
          >
            <div className='bg-primaryBlue text-white hover:bg-primaryBlueHovering p-2 rounded-md'>
              <FontAwesomeIcon icon={faMagnifyingGlass} />
            </div>
          </Popover>
        </div>
      )} */}
    </Fragment>
  )
}
