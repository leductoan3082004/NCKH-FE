import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faFacebook } from '@fortawesome/free-brands-svg-icons'
import { Link } from 'react-router-dom'
import { faPhone, faUser } from '@fortawesome/free-solid-svg-icons'

export default function MainFooter() {
  //? Style
  const wrapperStyle =
    'flex items-center text-lg justify-start tablet:justify-center space-x-2 tablet:space-x-3 desktop:space-x-4'
  const iconStyle = 'h-4 tablet:h-5 desktop:h-6'
  const contentStyle = 'text-left flex items-center justify-start'

  return (
    <div className='py-8 bg-mainBlue300'>
      <div className='container flex items-center justify-center'>
        <div className='w-full items-center flex flex-col justify-between space-y-8'>
          <p className='w-full uppercase text-primaryBlue text-center font-bold text-2xl desktop:text-4xl'>
            Nghiên cứu khoa học
          </p>
          <div className='grid tablet:grid-cols-3 gap-4 grid-cols-1 w-full mobileLarge:w-9/12'>
            <div className='col-span-1'>
              <div className={wrapperStyle}>
                <FontAwesomeIcon icon={faFacebook} className={iconStyle} />
                <Link to='https://www.facebook.com/biottttttttt' target='_blank' className='hover:text-primaryBlue'>
                  facebook.com/biottttttttt
                </Link>
              </div>
            </div>
            <div className='col-span-1'>
              <div className={wrapperStyle}>
                <FontAwesomeIcon icon={faPhone} className={iconStyle} />
                <p className={contentStyle}>0394030604</p>
              </div>
            </div>
            <div className='col-span-1'>
              <div className='flex items-start text-lg justify-start tablet:justify-center space-x-2 tablet:space-x-3 desktop:space-x-4'>
                <FontAwesomeIcon icon={faUser} className={iconStyle} />

                <div className='flex flex-col w-auto space-y-2'>
                  <span>
                    <Link to='' target='_blank' className='hover:text-primaryBlue py-1'>
                      Le Duc Toan
                    </Link>
                  </span>
                  <span>
                    <Link to='' target='_blank' className='hover:text-primaryBlue py-1'>
                      Le Duc Toan
                    </Link>
                  </span>
                  <span>
                    <Link to='' target='_blank' className='hover:text-primaryBlue py-1'>
                      Le Duc Toan
                    </Link>
                  </span>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}
