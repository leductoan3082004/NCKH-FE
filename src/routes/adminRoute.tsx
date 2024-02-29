import { adminPath } from 'src/constants/path'
import AdminLayout from 'src/layouts/AdminLayout'
import { Navigate, Outlet } from 'react-router-dom'
import { Suspense, lazy, useContext } from 'react'
import { AppContext } from 'src/contexts/app.context'
import LoadingPage from 'src/components/LoadingPage'
import AdminPage from 'src/pages/AdminPage'

const AdminFeedbackLayout = lazy(() => import('src/pages/AdminPage/layouts/AdminFeedbackLayout'))
const AdminPostManagementLayout = lazy(() => import('src/pages/AdminPage/layouts/AdminPostManagementLayout'))
const AdminImagesLayout = lazy(() => import('src/pages/AdminPage/layouts/AdminImagesLayout'))
const AdminDeleteImage = lazy(() => import('src/pages/AdminPage/pages/AdminDeleteImage'))
const AdminCreatePost = lazy(() => import('src/pages/AdminPage/pages/AdminCreatePost'))
const AdminFeedbackDetail = lazy(() => import('src/pages/AdminPage/pages/AdminFeedbackDetail'))
const AdminFeedbackManagement = lazy(() => import('src/pages/AdminPage/pages/AdminFeedbackManagement'))
const AdminImageManagement = lazy(() => import('src/pages/AdminPage/pages/AdminImageManagement'))
const AdminPostDetail = lazy(() => import('src/pages/AdminPage/pages/AdminPostDetail'))
const AdminPostManagement = lazy(() => import('src/pages/AdminPage/pages/AdminPostManagement'))
const AdminUploadImage = lazy(() => import('src/pages/AdminPage/pages/AdminUploadImage'))

function ProtectedAdminRoute() {
  const { isAuthenticated } = useContext(AppContext)
  return isAuthenticated ? (
    <Suspense fallback={<LoadingPage />}>
      <AdminLayout>
        <Outlet />
      </AdminLayout>
    </Suspense>
  ) : (
    <Navigate to={adminPath.login} />
  )
}

const AdminRoute = {
  path: '',
  element: <ProtectedAdminRoute />,
  children: [
    { path: '', element: <AdminPage /> },
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
      path: adminPath.postDetail,
      element: (
        <AdminPostManagementLayout>
          <AdminPostDetail />
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
    },
    {
      path: adminPath.feedbackManagement,
      element: (
        <AdminFeedbackLayout>
          <AdminFeedbackManagement />
        </AdminFeedbackLayout>
      )
    },
    {
      path: adminPath.feedbackDetail,
      element: (
        <AdminFeedbackLayout>
          <AdminFeedbackDetail />
        </AdminFeedbackLayout>
      )
    }
  ]
}

export default AdminRoute
