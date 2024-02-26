/* eslint-disable prettier/prettier */

export default function MainFooter() {
  return (
    <div className='bg-mainBlue300 border-t-[0.1px] border-y-black shrink-0 flex flex-col justify-between'>
      <div className='py-2 w-full items-center flex flex-col space-y-2'>
        <div className='w-full text-primaryBlue text-center font-medium text-sm desktop:text-base'>
          <div className='flex-row justify-between'>
            <p className='text-base font-extrabold desktop:text-lg'>Liên hệ:</p>
            <p> SĐT: 0937742620</p>
            <p>Email: leductoan3082004@gmail.com</p>
            {/* generate facebook link for me */}
            <p>
              Facebook:{' '}
              <a href='https://www.facebook.com/biottttttttt/' className='hover:opacity-50 underline'>
                Lê Đức Toàn
              </a>
            </p>
          </div>
        </div>
      </div>
      <div className='text-xs w-full text-center bg-slate-700 p-2 text-gray-400'>Copyright 2024 © NCKH</div>
    </div>
  )
}
