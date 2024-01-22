import { faMagnifyingGlass } from '@fortawesome/free-solid-svg-icons'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import Popover from 'src/components/Popover'
import SearchBar from 'src/components/SearchBar'

export default function HeaderSearch() {
  return (
    <div>
      <Popover
        renderPopover={
          <div className=' py-10 px-4'>
            <SearchBar />
          </div>
        }
        className=''
        offsetValue={2}
        backgroundColor='#f5f5f5'
      >
        <div className='bg-primaryGreen text-white hover:bg-primaryHoverGreen p-2 rounded-md'>
          <FontAwesomeIcon icon={faMagnifyingGlass} />
        </div>
      </Popover>
    </div>
  )
}
