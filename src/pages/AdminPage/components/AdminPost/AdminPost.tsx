import { faTriangleExclamation } from '@fortawesome/free-solid-svg-icons'
import {} from '@fortawesome/free-regular-svg-icons'
import { memo } from 'react'
import { useNavigate } from 'react-router-dom'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'

import { Post as PostType } from 'src/types/post.type'
import { formatDate, generatePostId } from 'src/utils/utils'
import { adminPath } from 'src/constants/path'

export const showSuccessDialog = (setIsOpen: React.Dispatch<React.SetStateAction<boolean>>, time?: number) => {
  setIsOpen(true)
  setTimeout(() => {
    setIsOpen(false)
  }, time || 1500)
}

interface Props {
  post: PostType
  initialLoading?: boolean
  disableClick?: boolean
}

function AdminPost({ post, disableClick = false }: Props) {
  const navigate = useNavigate()

  //? HANDLE ENTER ITEM
  const handleClickItem = (event: React.MouseEvent<HTMLButtonElement, MouseEvent>) => {
    if (disableClick) {
      event.preventDefault()
    } else {
      navigate({ pathname: `${adminPath.postManagement}/${generatePostId({ title: post.title, id: post._id })}` })
    }
  }

  //? Avatar
  const avatarUrl = post.image_url ? post.image_url : null

  return (
    <button
      className='relative w-full grid grid-cols-5 gap-2 tablet:gap-4 desktop:gap-6 overflow-hidden rounded-xl p-2 tablet:p-3 desktop:p-4 duration-200 bg-primaryBlue/10 hover:bg-primaryBlueHovering/20 border border-black/20'
      onClick={handleClickItem}
    >
      <div className='col-span-2'>
        <div className='relative w-full pt-[75%]'>
          <div className='absolute left-0 top-0 h-full w-full'>
            {avatarUrl ? (
              <img src={avatarUrl} alt={post.title} className='absolute left-0 top-0 h-full w-full object-cover' />
            ) : (
              <div className='absolute left-0 top-0 flex h-full w-full items-center justify-center'>
                <FontAwesomeIcon icon={faTriangleExclamation} fontSize={60} />
              </div>
            )}
          </div>
        </div>
      </div>
      <div className='col-span-3 flex items-center min-h-full'>
        <div className='flex flex-col items-center justify-between space-x-1 space-y-1  px-2 pt-2 sm:px-3 lg:px-4 lg:pt-4'>
          <p className='h-full justify-center overflow-hidden text-center text-sm font-semibold uppercase text-darkPrimaryBlue duration-200 tablet:text-lg desktop:text-lg'>
            {post.title}
          </p>
          <div className='grid grid-cols-3 gap-2 w-full text-xs desktop:text-sm'>
            <div className='col-span-1 flex font-semibold'>Category:</div>
            <div className='col-span-2 text-left'>
              {post.category.map((category, index) => (
                <span key={index} className='pr-1'>
                  {category}
                  {index != post.category.length - 1 && <span className=''>,</span>}
                </span>
              ))}
            </div>
          </div>
          <div className='grid grid-cols-3 gap-2 w-full text-xs desktop:text-sm'>
            <div className='col-span-1 flex font-semibold'>Tag:</div>
            <div className='col-span-2 text-left'>
              {post.tag.map((tag, index) => (
                <span key={index} className='pr-1'>
                  {tag}
                  {index != post.tag.length - 1 && <span className=''>,</span>}
                </span>
              ))}
            </div>
          </div>
          <div className='grid grid-cols-3 gap-2 w-full text-xs desktop:text-sm'>
            <div className='col-span-1 flex items-center font-semibold'>Ngày tạo:</div>
            <div className='col-span-2 text-left'>{formatDate(post.created_at)}</div>
          </div>
        </div>
      </div>
    </button>
  )
}

export default memo(AdminPost)
