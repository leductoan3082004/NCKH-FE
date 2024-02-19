import PostList from 'src/components/PostList'
import mainPath, { documentSystemPath } from 'src/constants/path'
import MainLayout from 'src/layouts/MainLayout'

const CategoryRoute = {
  path: '',
  children: [
    {
      path: mainPath.vanBan,
      element: (
        <MainLayout>
          <PostList category='Văn bản' />
        </MainLayout>
      )
    },
    {
      path: mainPath.tieuChiLuaChonVanBan,
      element: (
        <MainLayout>
          <PostList category='Tiêu chí lựa chọn văn bản' />
        </MainLayout>
      )
    },
    {
      path: mainPath.heThongVanBan,
      element: (
        <MainLayout>
          <PostList category='Hệ thống văn bản' />
        </MainLayout>
      )
    },
    {
      path: mainPath.dinhHuongSuDungVanBan,
      element: (
        <MainLayout>
          <PostList category='Định hướng sử dụng văn bản' />
        </MainLayout>
      )
    },
    {
      path: mainPath.quyTrinhThietKeCongCuDanhGia,
      element: (
        <MainLayout>
          <PostList category='Quy trình thiết kế công cụ đánh giá' />
        </MainLayout>
      )
    },
    {
      path: mainPath.deMinhHoa,
      element: (
        <MainLayout>
          <PostList category='Đề minh họa' />
        </MainLayout>
      )
    },
    {
      path: documentSystemPath.tho,
      element: (
        <MainLayout>
          <PostList category='Thơ' />
        </MainLayout>
      )
    },
    {
      path: documentSystemPath.truyenTho,
      element: (
        <MainLayout>
          <PostList category='Truyện thơ' />
        </MainLayout>
      )
    },
    {
      path: documentSystemPath.truyenKi,
      element: (
        <MainLayout>
          <PostList category='Truyện kí' />
        </MainLayout>
      )
    },
    {
      path: documentSystemPath.truyenNganHienDai,
      element: (
        <MainLayout>
          <PostList category='Truyện ngắn hiện đại' />
        </MainLayout>
      )
    },
    {
      path: documentSystemPath.biKich,
      element: (
        <MainLayout>
          <PostList category='Bi kịch' />
        </MainLayout>
      )
    },
    {
      path: documentSystemPath.tuyButTanVan,
      element: (
        <MainLayout>
          <PostList category='Tùy bút, tản văn' />
        </MainLayout>
      )
    }
  ]
}

export default CategoryRoute
