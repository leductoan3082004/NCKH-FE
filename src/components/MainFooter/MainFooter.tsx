import { faEnvelope, faLocationDot } from '@fortawesome/free-solid-svg-icons'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'

export default function MainFooter() {
  return (
    <div className='bg-gradient-to-r from-mainBlue300 pt-4 to-mainBlue500 shrink-0 flex flex-col justify-between  text-mainBlue900 text-[8px] tablet:text-sm desktop:tetx-base'>
      {/* <div className='py-2 w-full items-center flex flex-col space-y-2'>
        <div className='w-full text-primaryBlue text-center font-medium text-sm desktop:text-base'>
          <div className='flex-row justify-between'>
            <p className='text-base font-extrabold desktop:text-lg'>Liên hệ:</p>
            <p> SĐT: 0937742620</p>
            <p>Email: leductoan3082004@gmail.com</p>
            <p>
              Facebook:{' '}
              <a href='https://www.facebook.com/biottttttttt/' className='hover:opacity-50 underline'>
                Lê Đức Toàn
              </a>
            </p>
          </div>
        </div>
      </div> */}

      <div className='px-4 tablet:px-8 desktop:px-16 space-y-6 py-6 desktop:py-12'>
        <div className='tablet:flex-row flex flex-col justify-between tablet:space-y-0 space-y-4 items-center'>
          <div className='flex space-x-2 desktop:space-x-4'>
            <img
              src='/images/Logo HCMUE.png'
              alt='HCMUE'
              className='object-scale-down w-auto h-10 tablet:h-16 desktop:h-24'
            />
            <div className='flex flex-col justify-between h-10 tablet:h-16 desktop:h-24'>
              <div className='uppercase desktop:text-lg font-bold tracking-wide '>
                <p className=''>trường đại học sư phạm</p>
                <p className=''>thành phố hồ chí minh</p>
              </div>
              <div className='border-t w-full border-[0,5px] border-black/20' />
              <p className='font-semibold text-red-800'>Ho Chi Minh University of Education</p>
            </div>
            <img
              src='/images/KhoaNguVan.png'
              alt='Khoa Ngữ Văn'
              className='w-auto object-scale-down h-10 tablet:h-16 desktop:h-24'
            />
          </div>

          <div className='flex flex-col justify-between items-center tablet:items-start space-y-2'>
            <FontAwesomeIcon icon={faEnvelope} className='h-6 tablet:h-10 text-mainBlue700' />
            <p className='font-semibold '>Email: ngulieuso@gmail.com</p>
          </div>
        </div>

        <div className='tracking-wide text-center tablet:text-start'>
          <p className=''>Website này nằm trong khuôn khổ của đề tài:</p>
          <p className='uppercase font-semibold'>Đề xuất hệ thống văn bản văn học trên nền tảng website</p>
          <p className='uppercase font-semibold  tracking-wide'>
            Sử dụng trong kiểm tra đánh giá kĩ năng đọc lớp 11 theo chương trình ngữ văn 2018
          </p>
        </div>
      </div>

      <div className='px-4 tablet:px-8 desktop:px-16 justify-between space-x-4 items-center border-t-2 flex border-black py-4 text-center tablet:text-start'>
        <div className='flex space-x-1 tablet:space-x-2 justify-start tracking-wide'>
          <FontAwesomeIcon icon={faLocationDot} className='text-red-600' />
          <p className='font-semibold'>Việt Nam | Khoa Ngữ Văn - Trường Đại học Sư phạm Thành phố Hồ Chí Minh</p>
        </div>
        <div className='font-medium shrink-0'>Điều khoản sử dụng</div>
      </div>
    </div>
  )
}
