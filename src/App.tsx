import { useContext } from 'react'
import useRouteElements from './useRouteElements'
import { AppContext } from './contexts/app.context'
import LoadingPage from './components/LoadingPage'
import { ToastContainer } from 'react-toastify'
import 'react-toastify/dist/ReactToastify.css'

function App() {
  const { loadingPage } = useContext(AppContext)

  const routeElements = useRouteElements()

  return (
    <div
      className='text-darkText bg-mainBg flex flex-col justify-between h-full min-h-full'
      style={{
        minHeight: 'inherit'
      }}
    >
      {routeElements}
      <ToastContainer limit={3} />
      {loadingPage && <LoadingPage />}
    </div>
  )
}

export default App
