import classNames from 'classnames'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faAngleLeft, faAngleRight } from '@fortawesome/free-solid-svg-icons'
import { Link, NavLink, createSearchParams, useLocation } from 'react-router-dom'
import usePostListQueryConfig from 'src/hooks/usePostListQueryConfig'

interface Props {
  totalPage: number
  isMobile?: boolean
}
export default function UsePagination({ totalPage, isMobile }: Props) {
  const postListQueryConfig = usePostListQueryConfig()

  const currentPage = Number(postListQueryConfig.page)
  const RANGE = isMobile ? 1 : 2

  //! GET LOCATION
  const pathname = useLocation().pathname

  //? STYLES
  const indexNumberStyle =
    'mx-1 flex h-8 w-8 cursor-pointer items-center justify-center rounded-full border px-2 py-2 text-sm shadow-sm  desktop:mx-2 desktop:h-8 desktop:w-8 desktop:text-base'
  const activeArrowStyle =
    'group mx-2 flex cursor-pointer items-center space-x-1 rounded-xl border border-darkText px-3  py-1 text-sm text-darkText shadow-sm hover:border-primaryBlue desktop:text-base'
  const inactiveArrowStyle =
    'group mx-2 flex cursor-not-allowed items-center space-x-1 rounded-xl border border-darkText px-3 py-1 text-sm text-darkText opacity-40 shadow-sm desktop:text-base'

  const renderPagination = () => {
    let dotAfter = false
    let dotBefore = false
    const renderDotBefore = (index: number) => {
      if (!dotBefore) {
        dotBefore = true
        return (
          <span className='mx-1 rounded bg-transparent px-2 py-2 tracking-[4px] text-darkText shadow-sm' key={index}>
            ...
          </span>
        )
      }
      return null
    }
    const renderDotAfter = (index: number) => {
      if (!dotAfter) {
        dotAfter = true
        return (
          <span className='mx-1 rounded bg-transparent px-2 py-2 tracking-[4px] text-darkText shadow-sm' key={index}>
            ...
          </span>
        )
      }
      return null
    }
    return Array(totalPage)
      .fill(0)
      .map((_, index) => {
        const pageNumber = index + 1
        if (currentPage <= RANGE * 2 + 1 && pageNumber > currentPage + RANGE && pageNumber < totalPage - RANGE + 1) {
          return renderDotAfter(index)
        } else if (currentPage > RANGE * 2 + 1 && currentPage < totalPage - RANGE * 2) {
          if (pageNumber < currentPage - RANGE && pageNumber > RANGE) {
            return renderDotBefore(index)
          } else if (pageNumber > currentPage + RANGE && pageNumber < totalPage - RANGE + 1) {
            return renderDotAfter(index)
          }
        } else if (currentPage >= totalPage - RANGE * 2 && pageNumber > RANGE && pageNumber < currentPage - RANGE) {
          return renderDotBefore(index)
        } else if (pageNumber == currentPage)
          return (
            <div
              className={classNames(indexNumberStyle, 'border-transparent bg-primaryBackground text-darkText')}
              key={index}
            >
              {pageNumber}
            </div>
          )
        return (
          <NavLink
            to={{
              pathname: pathname,
              search: createSearchParams({
                ...postListQueryConfig,
                page: pageNumber.toString()
              }).toString()
            }}
            className={classNames(
              indexNumberStyle,
              'border-darkText text-darkText hover:border-primaryBlue hover:text-primaryBlue'
            )}
            key={index}
          >
            {pageNumber}
          </NavLink>
        )
      })
  }

  if (totalPage === 0) return
  return (
    <div className='mt-6 flex flex-wrap items-center justify-center'>
      {currentPage > 1 ? (
        <Link
          to={{
            pathname: pathname,
            search: createSearchParams({
              ...postListQueryConfig,
              page: (currentPage - 1).toString()
            }).toString()
          }}
          className={activeArrowStyle}
        >
          <FontAwesomeIcon icon={faAngleLeft} className='py-1 text-darkText group-hover:text-primaryBlue' />
        </Link>
      ) : (
        <span className={inactiveArrowStyle}>
          <FontAwesomeIcon icon={faAngleLeft} className='py-1 text-darkText ' />
        </span>
      )}

      {renderPagination()}

      {currentPage < totalPage ? (
        <Link
          to={{
            pathname: pathname,
            search: createSearchParams({
              ...postListQueryConfig,
              page: (currentPage + 1).toString()
            }).toString()
          }}
          className={activeArrowStyle}
        >
          <FontAwesomeIcon icon={faAngleRight} className='py-1 text-darkText group-hover:text-primaryBlue' />
        </Link>
      ) : (
        <span className={inactiveArrowStyle}>
          <FontAwesomeIcon icon={faAngleRight} className='py-1 text-darkText ' />
        </span>
      )}
    </div>
  )
}
