import { Navigate, Outlet, useRoutes } from 'react-router-dom'
import HomePage from './pages/HomePage'
import MainLayout from './layouts/MainLayout'
import { useContext } from 'react'
import { AppContext } from './contexts/app.context'
import AdminPage from './pages/AdminPage'
import path, { adminPath } from './constants/path'
import AdminLogin from './pages/AdminPage/components/AdminLogin'

function ProtectedRoute() {
  const { isAuthenticated } = useContext(AppContext)
  return isAuthenticated ? <Outlet /> : <Navigate to={adminPath.login} />
}

export default function useRouteElements() {
  const routeElements = useRoutes([
    {
      path: path.home,
      index: true,
      element: (
        <MainLayout>
          <HomePage />
        </MainLayout>
      )
    },
    {
      path: adminPath.login,
      element: (
        <MainLayout>
          <AdminLogin />
        </MainLayout>
      )
    },
    {
      path: '',
      element: <ProtectedRoute />,
      children: [
        {
          path: adminPath.mainPage,
          element: <AdminPage />
        }
      ]
    }
  ])

  return routeElements
}
