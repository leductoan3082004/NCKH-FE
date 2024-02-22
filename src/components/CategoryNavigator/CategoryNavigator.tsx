import classNames from 'classnames'
import { NavLink } from 'react-router-dom'

interface Props {
  category: string
  pathName: string
  onClick?: () => void
}

export default function CategoryNavigator({ category, pathName, onClick }: Props) {
  //? STYLES
  const itemStyle =
    'w-full hover:text-white text-darkText font-normal rounded-md px-4 tablet:px-2 py-1.5 duration-200 hover:bg-primaryBlueHovering/80 tablet:rounded-md text-sm text-left uppercase'

  return (
    <NavLink
      to={pathName}
      onClick={onClick}
      className={({ isActive }) => classNames(itemStyle, { 'bg-primaryBlueHovering/80 text-white': isActive })}
    >
      {category}
    </NavLink>
  )
}
