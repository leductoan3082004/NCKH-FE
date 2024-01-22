import { faMagnifyingGlass } from '@fortawesome/free-solid-svg-icons'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'

export default function SearchBar() {
  return (
    <div className='w-full'>
      <form className='relative flex w-full items-center rounded-lg bg-sidebarItemLight shadow-sm duration-300 dark:bg-sidebarItemDark'>
        <input
          className='focus:ring-primaryHoverGreen ring-primaryGreen  w-full rounded-md bg-transparent px-4 py-1 text-base text-[#6d6d6d] caret-black outline-none ring-1 ring-haretaColor duration-300 autofill:text-textDark focus:ring-2 dark:text-textLight  dark:ring-haretaColor dark:autofill:text-textLight dark:focus:ring-primaryColor lg:py-2 lg:text-lg'
          placeholder='Tìm kiếm...'
        />
        <button className='absolute right-1 flex items-center justify-center px-3 py-1 duration-300 hover:text-primaryGreen lg:right-4 lg:px-3'>
          <FontAwesomeIcon icon={faMagnifyingGlass} />
        </button>
      </form>
    </div>
  )
}
