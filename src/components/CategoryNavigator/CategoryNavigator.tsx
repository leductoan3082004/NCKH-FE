import { useContext } from 'react'
import { AppContext } from 'src/contexts/app.context'

interface Props {
  category: string
}

export default function CategoryNavigator({ category }: Props) {
  //? USE CONTEXT
  const { getPostListByCategory } = useContext(AppContext)

  //? STYLES
  const itemStyle =
    'w-full tablet:hover:text-white hover:text-black px-4 tablet:px-2 py-1.5 duration-200 tablet:hover:bg-primaryBlueHovering tablet:rounded-md text-sm text-left uppercase'

  const handleNagigate = () => {
    getPostListByCategory(category)
  }

  return (
    <button onClick={handleNagigate} className={itemStyle}>
      {category}
    </button>
  )
}
