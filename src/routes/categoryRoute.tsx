import mainPath, { documentSystemPath, documentUsageOrientationPath } from 'src/constants/path'
import MainLayout from 'src/layouts/MainLayout'
import NotFound from 'src/pages/NotFound'
import PostListPage from 'src/pages/PostListPage'

const CategoryRoute = {
  path: '',
  children: [
    {
      path: mainPath.vanBan,
      element: (
        <MainLayout>
          <PostListPage category='Văn bản' />
        </MainLayout>
      )
    },
    {
      path: mainPath.tieuChiLuaChonVanBan,
      element: (
        <MainLayout>
          <PostListPage category='Tiêu chí lựa chọn văn bản' />
        </MainLayout>
      )
    },
    {
      path: mainPath.heThongVanBan,
      element: (
        <MainLayout>
          <PostListPage category='Hệ thống văn bản' />
        </MainLayout>
      )
    },
    {
      path: mainPath.dinhHuongSuDungVanBan,
      element: (
        <MainLayout>
          <PostListPage category='Định hướng sử dụng văn bản' />
        </MainLayout>
      )
    },
    // Dinh huong su dung van ban
    {
      path: documentUsageOrientationPath.quyTrinhThietKeCongCuDanhGia,
      element: (
        <MainLayout>
          <PostListPage category='Quy trình thiết kế công cụ đánh giá' />
        </MainLayout>
      )
    },
    {
      path: documentUsageOrientationPath.deMinhHoa,
      element: (
        <MainLayout>
          <PostListPage category='Đề minh họa' />
        </MainLayout>
      )
    },
    {
      path: documentUsageOrientationPath.deMinhHoaXemNhieu,
      element: (
        <MainLayout>
          <PostListPage category='Đề minh họa xem nhiều' />
        </MainLayout>
      )
    },
    // He thong van ban
    {
      path: documentSystemPath.tho,
      element: (
        <MainLayout>
          <PostListPage category='Thơ' />
        </MainLayout>
      )
    },
    {
      path: documentSystemPath.truyenTho,
      element: (
        <MainLayout>
          <PostListPage category='Truyện thơ' />
        </MainLayout>
      )
    },
    {
      path: documentSystemPath.truyenKi,
      element: (
        <MainLayout>
          <PostListPage category='Truyện kí' />
        </MainLayout>
      )
    },
    {
      path: documentSystemPath.truyenNganHienDai,
      element: (
        <MainLayout>
          <PostListPage category='Truyện ngắn hiện đại' />
        </MainLayout>
      )
    },
    {
      path: documentSystemPath.biKich,
      element: (
        <MainLayout>
          <PostListPage category='Bi kịch' />
        </MainLayout>
      )
    },
    {
      path: documentSystemPath.tuyButTanVan,
      element: (
        <MainLayout>
          <PostListPage category='Tùy bút, tản văn' />
        </MainLayout>
      )
    },
    {
      path: documentSystemPath.vanBanTieuBieu,
      element: (
        <MainLayout>
          <PostListPage category='Văn bản tiêu biểu' />
        </MainLayout>
      )
    },
    {
      path: '*',
      element: (
        <MainLayout>
          <NotFound />
        </MainLayout>
      )
    }
  ]
}

export default CategoryRoute
