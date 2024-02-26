import { adminPath } from 'src/constants/path'
import AdminLayout from 'src/layouts/AdminLayout'
// import AdminPage from 'src/pages/AdminPage'
// import AdminFeedbackLayout from 'src/layouts/AdminFeedbackLayout'
// import AdminImagesLayout from 'src/layouts/AdminImagesLayout'
// import AdminPostManagementLayout from 'src/layouts/AdminPostManagementLayout'
// import AdminCreatePost from 'src/pages/AdminPage/components/AdminCreatePost'
// import AdminDeleteImage from 'src/pages/AdminPage/components/AdminDeleteImage'
// import AdminFeedbackDetail from 'src/pages/AdminPage/components/AdminFeedbackDetail'
// import AdminFeedbackManagement from 'src/pages/AdminPage/components/AdminFeedbackManagement'
// import AdminImageManagement from 'src/pages/AdminPage/components/AdminImageManagement'
// import AdminPostDetail from 'src/pages/AdminPage/components/AdminPostDetail'
// import AdminPostManagement from 'src/pages/AdminPage/components/AdminPostManagement'
// import AdminUploadImage from 'src/pages/AdminPage/components/AdminUploadImage'
import { Navigate, Outlet } from 'react-router-dom'
import { Suspense, lazy, useContext } from 'react'
import { AppContext } from 'src/contexts/app.context'
import LoadingPage from 'src/components/LoadingPage'

const AdminPage = lazy(() => import('src/pages/AdminPage'))
const AdminFeedbackLayout = lazy(() => import('src/layouts/AdminFeedbackLayout'))
const AdminPostManagementLayout = lazy(() => import('src/layouts/AdminPostManagementLayout'))
const AdminImagesLayout = lazy(() => import('src/layouts/AdminImagesLayout'))
const AdminDeleteImage = lazy(() => import('src/pages/AdminPage/components/AdminDeleteImage'))
const AdminCreatePost = lazy(() => import('src/pages/AdminPage/components/AdminCreatePost'))
const AdminFeedbackDetail = lazy(() => import('src/pages/AdminPage/components/AdminFeedbackDetail'))
const AdminFeedbackManagement = lazy(() => import('src/pages/AdminPage/components/AdminFeedbackManagement'))
const AdminImageManagement = lazy(() => import('src/pages/AdminPage/components/AdminImageManagement'))
const AdminPostDetail = lazy(() => import('src/pages/AdminPage/components/AdminPostDetail'))
const AdminPostManagement = lazy(() => import('src/pages/AdminPage/components/AdminPostManagement'))
const AdminUploadImage = lazy(() => import('src/pages/AdminPage/components/AdminUploadImage'))

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
    {
      path: '',
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
