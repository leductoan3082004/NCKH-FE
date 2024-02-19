import { documentSystemPath } from './path'

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

export const DocumentSystemCategoriesPathname = new Map<string, string>([
  ['Thơ', documentSystemPath.tho],
  ['Truyện thơ', documentSystemPath.truyenTho],
  ['Truyện kí', documentSystemPath.truyenKi],
  ['Truyện ngắn hiện đại', documentSystemPath.truyenNganHienDai],
  ['Bi kịch', documentSystemPath.biKich],
  ['Tùy bút, tản văn', documentSystemPath.tuyButTanVan]
])
