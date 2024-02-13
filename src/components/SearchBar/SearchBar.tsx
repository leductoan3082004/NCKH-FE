import { faMagnifyingGlass } from '@fortawesome/free-solid-svg-icons'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { yupResolver } from '@hookform/resolvers/yup'
import { omit } from 'lodash'
import { useForm } from 'react-hook-form'
import { createSearchParams, useLocation, useNavigate } from 'react-router-dom'
import usePostListQueryConfig from 'src/hooks/usePostListQueryConfig'
import { FindPostSchema, findPostSchema } from 'src/utils/rules'

type FormData = FindPostSchema

export default function SearchBar() {
  const path = useLocation().pathname
  const queryConfig = usePostListQueryConfig()
  const navigate = useNavigate()
  const { register, handleSubmit } = useForm<FormData>({
    defaultValues: {
      content: ''
    },
    resolver: yupResolver(findPostSchema)
  })
  const handleSearch = handleSubmit((data) => {
    // console.log(data.name)
    const config =
      data.content === ''
        ? omit(
            {
              ...queryConfig
            },
            ['tag', 'category', 'content', 'page', 'limit']
          )
        : omit(
            {
              ...queryConfig,
              content: data.content
            },
            ['tag', 'category', 'page', 'limit']
          )
    navigate({
      pathname: path,
      search: createSearchParams(config).toString()
    })
  })

  return (
    <div className='w-full'>
      <form
        onSubmit={handleSearch}
        className='relative flex w-full items-center rounded-lg bg-sidebarItemLight shadow-sm duration-200'
      >
        <input
          className='focus:ring-primaryBlueHovering ring-primaryBlue w-full rounded-md px-4 py-1 text-base text-[#6d6d6d] caret-black outline-none ring-1 duration-200 focus:ring-2 dark:text-textLight lg:py-2 lg:text-lg bg-white'
          placeholder='Tìm kiếm...'
          {...register('content')}
        />
        <button className='absolute right-1 flex items-center justify-center px-2 py-1 duration-200 hover:text-primaryBlue lg:right-4'>
          <FontAwesomeIcon icon={faMagnifyingGlass} />
        </button>
      </form>
    </div>
  )
}
