import { Link } from 'react-router-dom'
import mainPath from 'src/constants/path'

export default function NotFound() {
  return (
    <main className='flex h-screen w-full flex-col items-center justify-center bg-mainBg'>
      <h1 className='text-9xl font-black tracking-widest text-darkText'>404</h1>
      <div className='absolute rotate-12 rounded bg-mainBlue200 px-2 text-sm'>Page Not Found</div>
      <button className='mt-5'>
        <Link
          to={mainPath.home}
          className='group relative inline-block text-sm font-medium text-primaryBlue focus:outline-none focus:ring active:text-primaryBlue'
        >
          <span className='bg-haretext-haretaColor absolute inset-0 translate-x-0.5 translate-y-0.5 transition-transform group-hover:translate-x-0 group-hover:translate-y-0'></span>

          <span className='relative block rounded-md border border-current bg-primaryBackground px-8 py-3 hover:bg-primaryBlueHovering text-white'>
            <span>Go Home</span>
          </span>
        </Link>
      </button>
    </main>
  )
}
