import { faFilter, faFilterCircleXmark } from '@fortawesome/free-solid-svg-icons'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { omit } from 'lodash'
import React, { useState } from 'react'
import { createSearchParams, useLocation, useNavigate } from 'react-router-dom'
import useQueryConfigForPosts from 'src/hooks/useQueryConfigForPosts'

export default function SortByTags() {
  const [typedTag, setTypedTag] = useState<string>('')

  //? Handle sort by tags
  const handleTypedTag = (event: React.ChangeEvent<HTMLInputElement>) => {
    const { value } = event.target
    setTypedTag(value)
  }

  const queryConfig = useQueryConfigForPosts()
  const navigate = useNavigate()
  const path = useLocation().pathname
  const currentTag = queryConfig.tag

  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault()
    navigate({
      pathname: path,
      search: createSearchParams(
        omit(
          {
            ...queryConfig,
            tag: typedTag
          },
          ['page', 'limit']
        )
      ).toString()
    })
  }

  const handleRemoveTag = () => {
    navigate({
      pathname: path,
      search: createSearchParams(
        omit(
          {
            ...queryConfig,
            tag: typedTag
          },
          ['page', 'limit', 'tag']
        )
      ).toString()
    })
  }

  return (
    <div>
      <form
        className='relative flex w-full items-center rounded-lg bg-sidebarItemLight shadow-sm duration-200'
        onSubmit={handleSubmit}
      >
        <input
          value={typedTag}
          onChange={handleTypedTag}
          className='focus:ring-primaryBlueHovering ring-primaryBlue w-full rounded-md px-4 py-1 text-base text-[#6d6d6d] caret-black outline-none ring-1 duration-200 focus:ring-2 dark:text-textLight lg:py-2 lg:text-lg bg-white'
          placeholder={currentTag ? currentTag : 'Lọc theo tag'}
        />
        {!currentTag && (
          <button className='absolute right-1 flex items-center justify-center px-2 py-1 duration-200 hover:text-primaryBlue lg:right-4'>
            <FontAwesomeIcon icon={faFilter} />
          </button>
        )}
        {currentTag && (
          <button
            className='absolute right-1 flex items-center justify-center px-2 py-1 duration-200 hover:text-red-600 lg:right-4'
            type='button'
            onClick={handleRemoveTag}
          >
            <FontAwesomeIcon icon={faFilterCircleXmark} />
          </button>
        )}
      </form>
      <div className='grid gap-2 grid-cols-2 desktop:grid-cols-3 text-sm'></div>
    </div>
  )
}
