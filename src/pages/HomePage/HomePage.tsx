import { useEffect } from 'react'
import HomePageIntroduction from './components/HomePageIntroduction'
import HomepageFeedback from './components/HomePageFeedback'

export default function HomePage() {
  //? CHANGE TITLE
  useEffect(() => {
    document.title = 'Trang chủ'
  })
  return (
    <div className='container py-4 tablet:py-6 desktop:py-8'>
      <HomePageIntroduction />
      <HomepageFeedback />
    </div>
  )
}
