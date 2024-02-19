import { faAngleRight } from '@fortawesome/free-solid-svg-icons'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import classNames from 'classnames'
import { Fragment } from 'react'
import { NavLink } from 'react-router-dom'

interface PathElement {
  pathName: string
  url: string
}

interface Props {
  pathList: PathElement[]
}

export default function PathBar({ pathList }: Props) {
  return (
    <div className='relative mb-2 flex shrink items-center justify-start space-x-2 rounded-lg border border-black/40 bg-mainBlue100 px-3 py-1 text-xs font-bold uppercase duration-200 text-darkText/80 desktop:mb-3 desktop:px-4 desktop:py-2 desktop:text-sm '>
      {pathList.map((pathElemnt, index) => (
        <Fragment key={index}>
          {index !== 0 && <FontAwesomeIcon icon={faAngleRight} />}
          <NavLink
            to={`${pathElemnt.url}`}
            className={({ isActive }) =>
              classNames({
                'text-primaryBlue': isActive,
                'hover:text-primaryBlue': !isActive
              })
            }
          >
            {pathElemnt.pathName}
          </NavLink>
        </Fragment>
      ))}
    </div>
  )
}
