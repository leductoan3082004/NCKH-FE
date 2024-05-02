import mainPath, { documentSystemPath, documentUsageOrientationPath } from './path'

//! ALL CATEGORIES
export const Categories = [
  'Tất cả',
  'Văn bản',
  'Tiêu chí lựa chọn văn bản',
  'Hệ thống văn bản',
  'Thơ',
  'Truyện thơ',
  'Truyện kí',
  'Truyện ngắn hiện đại',
  'Bi kịch',
  'Tùy bút, tản văn',
  'Đề minh họa',
  'Định hướng sử dụng văn bản',
  'Quy trình thiết kế công cụ đánh giá',
  'Giới thiệu trang web'
]

//! LAYERED CATEGORIES
export const MainCategories = ['Văn bản', 'Định hướng sử dụng văn bản', 'Giới thiệu trang web']

export const DocumentCategories = ['Tiêu chí lựa chọn văn bản', 'Hệ thống văn bản']

export const DocumentSystemCategories = [
  'Thơ',
  'Truyện thơ',
  'Truyện kí',
  'Truyện ngắn hiện đại',
  'Bi kịch',
  'Tùy bút, tản văn',
  'Văn bản tiêu biểu'
]

export const DocumentUsageCategories = ['Quy trình thiết kế công cụ đánh giá', 'Đề minh họa', 'Đề minh họa xem nhiều']

//! CATEGORIES URL
// export const DocumentSystemCategoriesURL = new Map<string, string>([
//   ['Thơ', documentSystemPath.tho],
//   ['Truyện thơ', documentSystemPath.truyenTho],
//   ['Truyện kí', documentSystemPath.truyenKi],
//   ['Truyện ngắn hiện đại', documentSystemPath.truyenNganHienDai],
//   ['Bi kịch', documentSystemPath.biKich],
//   ['Tùy bút, tản văn', documentSystemPath.tuyButTanVan]
// ])

export const DocumentSystemCategoriesURL: { title: string; pathname: string }[] = [
  { title: 'Thơ', pathname: documentSystemPath.tho },
  { title: 'Truyện thơ', pathname: documentSystemPath.truyenTho },
  { title: 'Truyện kí', pathname: documentSystemPath.truyenKi },
  { title: 'Truyện ngắn hiện đại', pathname: documentSystemPath.truyenNganHienDai },
  { title: 'Bi kịch', pathname: documentSystemPath.biKich },
  { title: 'Tùy bút, tản văn', pathname: documentSystemPath.tuyButTanVan },
  { title: 'Văn bản tiêu biểu', pathname: documentSystemPath.vanBanTieuBieu }
]

export const CategoriesURL = new Map<string, string>([
  ['Văn bản', mainPath.vanBan],
  ['Tiêu chí lựa chọn văn bản', mainPath.tieuChiLuaChonVanBan],
  ['Hệ thống văn bản', mainPath.heThongVanBan],
  ['Định hướng sử dụng văn bản', mainPath.dinhHuongSuDungVanBan],
  ['Quy trình thiết kế công cụ đánh giá', documentUsageOrientationPath.quyTrinhThietKeCongCuDanhGia],
  ['Đề minh họa', documentUsageOrientationPath.deMinhHoa],
  ['Đề minh họa xem nhiều', documentUsageOrientationPath.deMinhHoaXemNhieu],
  ['Thơ', documentSystemPath.tho],
  ['Truyện thơ', documentSystemPath.truyenTho],
  ['Truyện kí', documentSystemPath.truyenKi],
  ['Truyện ngắn hiện đại', documentSystemPath.truyenNganHienDai],
  ['Bi kịch', documentSystemPath.biKich],
  ['Tùy bút, tản văn', documentSystemPath.tuyButTanVan],
  ['Văn bản tiêu biểu', documentSystemPath.vanBanTieuBieu]
])

//! CATEORIES PATH
export const CategoriesPathname = new Map<string, string[]>([
  ['Văn bản', ['Văn bản']],
  // Văn bản
  ['Tiêu chí lựa chọn văn bản', ['Văn bản', 'Tiêu chí lựa chọn văn bản']],
  ['Hệ thống văn bản', ['Văn bản', 'Hệ thống văn bản']],
  // Định hướng sử dụng văn bản
  ['Định hướng sử dụng văn bản', ['Định hướng sử dụng văn bản']],
  ['Quy trình thiết kế công cụ đánh giá', ['Định hướng sử dụng văn bản', 'Quy trình thiết kế công cụ đánh giá']],
  ['Đề minh họa', ['Định hướng sử dụng văn bản', 'Đề minh họa']],
  ['Đề minh họa xem nhiều', ['Định hướng sử dụng văn bản', 'Đề minh họa xem nhiều']],
  // Hệ thống văn bản
  ['Thơ', ['Văn bản', 'Hệ thống văn bản', 'Thơ']],
  ['Truyện thơ', ['Văn bản', 'Hệ thống văn bản', 'Truyện thơ']],
  ['Truyện kí', ['Văn bản', 'Hệ thống văn bản', 'Truyện kí']],
  ['Truyện ngắn hiện đại', ['Văn bản', 'Hệ thống văn bản', 'Truyện ngắn hiện đại']],
  ['Bi kịch', ['Văn bản', 'Hệ thống văn bản', 'Bi kịch']],
  ['Tùy bút, tản văn', ['Văn bản', 'Hệ thống văn bản', 'Tùy bút, tản văn']],
  ['Văn bản tiêu biểu', ['Văn bản', 'Hệ thống văn bản', 'Văn bản tiêu biểu']]
])
