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
      <div className='w-4/5 mobileSmall:w-40 desktop:w-60'>
        <SearchBar />
      </div>
    </Fragment>
  )
}
