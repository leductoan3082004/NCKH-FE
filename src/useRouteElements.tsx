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
import AdminCreatePost from './pages/AdminPage/components/AdminCreatePost'
import AdminUpdatePost from './pages/AdminPage/components/AdminUpdatePost'
import AdminDeletePost from './pages/AdminPage/components/AdminDeletePost'
import AdminImagesLayout from './layouts/AdminImagesLayout'
import AdminUploadImage from './pages/AdminPage/components/AdminUploadImage'
import AdminDeleteImage from './pages/AdminPage/components/AdminDeleteImage'
import AdminImageManagement from './pages/AdminPage/components/AdminImageManagement'
import AdminPostManagementLayout from './layouts/AdminPostsLayout/AdminPostsLayout'
import AdminPostManagement from './pages/AdminPage/components/AdminPostManagement'

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
          element: (
            <AdminPostManagementLayout>
              <AdminPostManagement />
            </AdminPostManagementLayout>
          )
        },
        {
          path: adminPath.createPost,
          element: (
            <AdminPostManagementLayout>
              <AdminCreatePost />
            </AdminPostManagementLayout>
          )
        },
        {
          path: adminPath.updatePost,
          element: (
            <AdminPostManagementLayout>
              <AdminUpdatePost />
            </AdminPostManagementLayout>
          )
        },
        {
          path: adminPath.deletePost,
          element: (
            <AdminPostManagementLayout>
              <AdminDeletePost />
            </AdminPostManagementLayout>
          )
        },
        {
          path: adminPath.imageManagement,
          element: (
            <AdminImagesLayout>
              <AdminImageManagement />
            </AdminImagesLayout>
          )
        },
        {
          path: adminPath.uploadImage,
          element: (
            <AdminImagesLayout>
              <AdminUploadImage />
            </AdminImagesLayout>
          )
        },
        {
          path: adminPath.deleteImage,
          element: (
            <AdminImagesLayout>
              <AdminDeleteImage />
            </AdminImagesLayout>
          )
        }
      ]
    }
  ])

  return routeElements
}
