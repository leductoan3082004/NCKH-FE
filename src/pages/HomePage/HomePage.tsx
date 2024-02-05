import { useEffect } from 'react'
import FeaturedPosts from './components/FeaturedPosts'

export default function HomePage() {
  //? CHANGE TITLE
  useEffect(() => {
    document.title = 'Trang chủ'
  })
  return (
    <div className=' text-darkPrimaryBlue text-2xl justify-center items-center flex '>
      <FeaturedPosts />
    </div>
  )
}
