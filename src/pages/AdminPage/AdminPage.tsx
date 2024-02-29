import { useContext, useEffect } from 'react'
import { AppContext } from 'src/contexts/app.context'
import { clearLS } from 'src/utils/auth'

export default function AdminPage() {
  const { setIsAuthenticated } = useContext(AppContext)
  //! HANDLE LOGOUT
  const handleLogout = () => {
    clearLS()
    setIsAuthenticated(false)
  }

  //! SET TITLE
  useEffect(() => {
    document.title = 'NCKH | Quản trị viên'
  })

  return (
    <div className='w-full'>
      <div className='w-full flex justify-end items-center'>
        <button
          onClick={handleLogout}
          className=' py-1 px-4 text-xs desktop:text-sm rounded-md bg-alertRed/80 hover:bg-alertRed'
        >
          Đăng xuất
        </button>
      </div>
      <div className=''>
        <p className='uppercase font-bold text-xl desktop:text-2xl text-center text-primaryBlue'>
          Trang dành cho quản trị viên
        </p>
      </div>
    </div>
  )
}
