import mainPath, { documentSystemPath } from './path'

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

export const DocumentSystemCategories = [
  'Thơ',
  'Truyện thơ',
  'Truyện kí',
  'Truyện ngắn hiện đại',
  'Bi kịch',
  'Tùy bút, tản văn'
]

export const DocumentSystemCategoriesURL = new Map<string, string>([
  ['Thơ', documentSystemPath.tho],
  ['Truyện thơ', documentSystemPath.truyenTho],
  ['Truyện kí', documentSystemPath.truyenKi],
  ['Truyện ngắn hiện đại', documentSystemPath.truyenNganHienDai],
  ['Bi kịch', documentSystemPath.biKich],
  ['Tùy bút, tản văn', documentSystemPath.tuyButTanVan]
])

export const CategoriesPathname = new Map<string, string[]>([
  ['Văn bản', ['Văn bản']],
  ['Tiêu chí lựa chọn văn bản', ['Văn bản', 'Tiêu chí lựa chọn văn bản']],
  ['Hệ thống văn bản', ['Văn bản', 'Hệ thống văn bản']],
  ['Định hướng sử dụng văn bản', ['Định hướng sử dụng văn bản']],
  ['Quy trình thiết kế công cụ đánh giá', ['Định hướng sử dụng văn bản', 'Quy trình thiết kế công cụ đánh giá']],
  ['Đề minh họa', ['Định hướng sử dụng văn bản', 'Đề minh họa']],
  ['Thơ', ['Văn bản', 'Hệ thống văn bản', 'Thơ']],
  ['Truyện thơ', ['Văn bản', 'Hệ thống văn bản', 'Truyện thơ']],
  ['Truyện kí', ['Văn bản', 'Hệ thống văn bản', 'Truyện kí']],
  ['Truyện ngắn hiện đại', ['Văn bản', 'Hệ thống văn bản', 'Truyện ngắn hiện đại']],
  ['Bi kịch', ['Văn bản', 'Hệ thống văn bản', 'Bi kịch']],
  ['Tùy bút, tản văn', ['Văn bản', 'Hệ thống văn bản', 'Tùy bút, tản văn']]
])

export const CategoriesURL = new Map<string, string>([
  ['Văn bản', mainPath.vanBan],
  ['Tiêu chí lựa chọn văn bản', mainPath.tieuChiLuaChonVanBan],
  ['Hệ thống văn bản', mainPath.heThongVanBan],
  ['Định hướng sử dụng văn bản', mainPath.dinhHuongSuDungVanBan],
  ['Quy trình thiết kế công cụ đánh giá', mainPath.quyTrinhThietKeCongCuDanhGia],
  ['Đề minh họa', mainPath.deMinhHoa],
  ['Thơ', documentSystemPath.tho],
  ['Truyện thơ', documentSystemPath.truyenTho],
  ['Truyện kí', documentSystemPath.truyenKi],
  ['Truyện ngắn hiện đại', documentSystemPath.truyenNganHienDai],
  ['Bi kịch', documentSystemPath.biKich],
  ['Tùy bút, tản văn', documentSystemPath.tuyButTanVan]
])
