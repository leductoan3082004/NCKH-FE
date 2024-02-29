import { Navigate, Outlet, useRoutes } from 'react-router-dom'
import HomePage from './pages/HomePage'
import MainLayout from './layouts/MainLayout'
import { Suspense, useContext } from 'react'
import { AppContext } from './contexts/app.context'
import mainPath, { adminPath } from './constants/path'
import AdminLogin from './pages/AdminPage/components/AdminLogin'
import AdminLayout from './layouts/AdminLayout'
import LoadingPage from './components/LoadingPage'
import PostDetail from './components/PostDetai'
import CategoryRoute from './routes/categoryRoute'
import PostList from './components/PostList'
import NotFound from './pages/NotFound'
import AdminRoute from './routes/adminRoute'

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
      path: mainPath.home,
      index: true,
      element: (
        <MainLayout>
          <HomePage />
        </MainLayout>
      )
    },
    {
      path: '',
      children: [CategoryRoute]
    },
    {
      path: mainPath.tagSorting,
      element: (
        <MainLayout>
          <PostList category='' />
        </MainLayout>
      )
    },
    {
      path: mainPath.postDetail,
      element: (
        <MainLayout>
          <PostDetail />
        </MainLayout>
      )
    },
    { path: '', element: <RejectedRoute />, children: [{ path: adminPath.login, element: <AdminLogin /> }] },
    {
      path: adminPath.mainPage,
      children: [AdminRoute]
    },
    {
      path: '*',
      element: (
        <MainLayout>
          <NotFound />
        </MainLayout>
      )
    }
  ])

  return routeElements
}
