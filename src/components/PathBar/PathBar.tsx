import { faAngleRight } from '@fortawesome/free-solid-svg-icons'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import classNames from 'classnames'
import { Fragment } from 'react'
import { NavLink } from 'react-router-dom'
import mainPath from 'src/constants/path'

export interface PathElement {
  pathName: string
  url: string
  isNotALink?: boolean
}

interface Props {
  pathList: PathElement[]
}

export default function PathBar({ pathList }: Props) {
  return (
    <div className='relative mb-2 overflow-hidden truncate flex shrink items-center justify-start space-x-2 rounded-lg border border-black/40 px-3 py-1 text-xs font-bold uppercase duration-200 text-darkText/80 desktop:mb-3 desktop:px-4 desktop:py-2 desktop:text-sm '>
      <Fragment>
        <NavLink
          to={mainPath.home}
          className={({ isActive }) =>
            classNames({
              'text-mainBlue600': isActive,
              'hover:text-mainBlue600': !isActive
            })
          }
        >
          Trang chủ
        </NavLink>
      </Fragment>
      {pathList.map((pathElement, index) => {
        if (pathElement.isNotALink) {
          return (
            <Fragment key={index}>
              <FontAwesomeIcon icon={faAngleRight} />
              <button className={classNames('text-mainBlue600')}>{pathElement.pathName}</button>
            </Fragment>
          )
        } else {
          return (
            <Fragment key={index}>
              <FontAwesomeIcon icon={faAngleRight} />
              <NavLink
                end
                to={pathElement.url}
                className={({ isActive }) =>
                  classNames('truncate', {
                    'text-mainBlue600': isActive,
                    'hover:text-mainBlue600': !isActive
                  })
                }
              >
                {pathElement.pathName}
              </NavLink>
            </Fragment>
          )
        }
      })}
    </div>
  )
}
