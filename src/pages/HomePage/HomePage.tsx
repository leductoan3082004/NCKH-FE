import { useEffect } from 'react'
import HomePageIntroduction from './components/HomePageIntroduction'
import CustomPostList from 'src/components/CustomPostList'
import { documentSystemPath, documentUsageOrientationPath } from 'src/constants/path'

export default function HomePage() {
  //? CHANGE TITLE
  useEffect(() => {
    document.title = 'NCKH'
  })
  return (
    <div className='space-y-4 py-4'>
      <div className='py-4 desktop:py-8'>
        <HomePageIntroduction />
      </div>

      <div className='container space-y-4 desktop:space-y-8'>
        <div className='w-full flex items-center justify-center'>
          <div className='border w-10/12 tablet:w-8/10 desktop:w-6/12 border-black'></div>
        </div>

        <CustomPostList
          title='Văn bản tiêu biểu'
          category='Văn bản tiêu biểu'
          limit={6}
          url={documentSystemPath.vanBanTieuBieu}
        />

        <div className='w-full flex items-center justify-center'>
          <div className='border w-10/12 tablet:w-8/10 desktop:w-6/12 border-black'></div>
        </div>

        <CustomPostList
          title='Đề minh họa xem nhiều'
          category='Đề minh họa xem nhiều'
          limit={2}
          url={documentUsageOrientationPath.deMinhHoaXemNhieu}
        />
      </div>
    </div>
  )
}
