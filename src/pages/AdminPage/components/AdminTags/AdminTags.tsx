import { faXmark } from '@fortawesome/free-solid-svg-icons'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import classNames from 'classnames'
import { useContext, useState } from 'react'
import { useLocation } from 'react-router-dom'
import { adminPath } from 'src/constants/path'
import { AdminContext } from 'src/contexts/admin.context'

interface Props {
  errorMessage?: string
}

export default function AdminTags({ errorMessage }: Props) {
  const { tags, setTags, updateTags, setUpdateTags } = useContext(AdminContext)
  const [typedTag, setTypedTag] = useState<string>('')

  //? Check if is CREATING or UPDATING
  const pathName = useLocation().pathname
  const isCreating = pathName == adminPath.createPost

  //? Tag actions
  const handleTypedTag = (event: React.ChangeEvent<HTMLInputElement>) => {
    const { value } = event.target
    setTypedTag(value)
  }

  const addTag = (tag: string) => {
    const testTag = tag.replace(/\s/g, '')
    if (tag == '' || testTag == '') {
      setTypedTag('')
      return
    }
    if (isCreating) {
      if (!tags.includes(tag)) {
        setTags([...tags, tag])
      }
      setTypedTag('')
    } else {
      if (!updateTags.includes(tag)) {
        setUpdateTags([...updateTags, tag])
      }
      setTypedTag('')
    }
  }

  const handleMouseClick = () => {
    addTag(typedTag)
  }

  const handlePressEnter = (e: React.KeyboardEvent<HTMLInputElement>) => {
    if (e.code === 'Enter') {
      e.preventDefault()
      addTag(typedTag)
    }
  }

  const removeTag = (tagIndex: number) => () => {
    if (isCreating) {
      setTags(tags.filter((_, index) => index != tagIndex))
    } else {
      setUpdateTags(updateTags.filter((_, index) => index != tagIndex))
    }
  }

  const activeTags = isCreating ? tags : updateTags

  return (
    <div>
      <div className='flex space-x-2'>
        <input
          type='text'
          value={typedTag}
          onChange={handleTypedTag}
          className={classNames(
            'text-darkText bg-white py-1 px-2 text-base lg:text-lg rounded-lg outline-none focus:outline-primaryBlue',
            { 'outline-alertRed': errorMessage }
          )}
          onKeyDown={handlePressEnter}
        />
        <button
          type='button'
          onClick={handleMouseClick}
          className='py-1 px-3 rounded-md bg-white hover:bg-primaryBackground border  border-black/20'
        >
          Thêm từ khóa
        </button>
        <div className='text-sm flex items-center text-alertRed'>{errorMessage}</div>
      </div>
      <div className='h-20 bg-white mt-2 rounded-lg overflow-auto grid gap-2 grid-cols-1 tablet:grid-cols-2 tabletLarge:grid-cols-3 desktop:grid-cols-4 desktopLarge:grid-cols-5 p-1 text-sm'>
        {activeTags.map((tag, index) => (
          <div key={index} className='col-span-1 '>
            <div className='flex items-center h-10 line-clamp-2 justify-center rounded-md px-0.5 bg-primaryBackground/50 relative'>
              {tag}
              <button type='button' className='absolute hover:text-red-600 top-1 right-2' onClick={removeTag(index)}>
                <FontAwesomeIcon icon={faXmark} />
              </button>
            </div>
          </div>
        ))}
      </div>
    </div>
  )
}
