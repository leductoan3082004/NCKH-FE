import { useEffect } from 'react'
import HomePageIntroduction from './components/HomePageIntroduction'
import HomepageFeedback from './components/HomePageFeedback'

export default function HomePage() {
  //? CHANGE TITLE
  useEffect(() => {
    document.title = 'NCKH'
  })
  return (
    <div className='space-y-2'>
      <div className='py-4 desktop:py-8'>
        <HomePageIntroduction />
      </div>

      <div className='bg-sectionBlue py-4 desktop:py-8'>
        <HomepageFeedback />
      </div>
    </div>
  )
}
