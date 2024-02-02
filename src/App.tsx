import { useContext } from 'react'
import useRouteElements from './useRouteElements'
import { AppContext } from './contexts/app.context'
import LoadingPage from './components/LoadingPage'
import { ToastContainer } from 'react-toastify'

function App() {
  const { loadingPage } = useContext(AppContext)

  const routeElements = useRouteElements()

  return (
    <div className='text-[#101010]'>
      {routeElements}
      <ToastContainer limit={3} />
      {loadingPage && <LoadingPage />}
    </div>
  )
}

export default App
