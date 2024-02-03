import { Navigate, Outlet, useRoutes } from 'react-router-dom'
import HomePage from './pages/HomePage'
import MainLayout from './layouts/MainLayout'
import { Suspense, useContext } from 'react'
import { AppContext } from './contexts/app.context'
import AdminPage from './pages/AdminPage'
import path, { adminPath } from './constants/path'
import AdminLogin from './pages/AdminPage/components/AdminLogin'
import AdminLayout from './layouts/AdminLayout'
import LoadingPage from './components/LoadingPage'

function ProtectedRoute() {
  const { isAuthenticated } = useContext(AppContext)
  return isAuthenticated ? (
    <AdminLayout>
      <Outlet />
    </AdminLayout>
  ) : (
    <Navigate to={adminPath.login} />
  )
}

function RejectedRoute() {
  const { isAuthenticated } = useContext(AppContext)
  return !isAuthenticated ? (
    <AdminLayout>
      <Suspense fallback={<LoadingPage />}>
        <Outlet />
      </Suspense>
    </AdminLayout>
  ) : (
    <Navigate to={adminPath.mainPage} />
  )
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
    { path: '', element: <RejectedRoute />, children: [{ path: adminPath.login, element: <AdminLogin /> }] },
    {
      path: adminPath.login,
      element: <AdminLogin />
    },
    {
      path: '',
      element: <ProtectedRoute />,
      children: [
        {
          path: adminPath.mainPage,
          element: <AdminPage />
        },
        {
          path: adminPath.postManagement,
          element: <AdminPage />
        }
      ]
    }
  ])

  return routeElements
}
