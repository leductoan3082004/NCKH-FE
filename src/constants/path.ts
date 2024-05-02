const mainPath = {
  home: '/',
  post: '/bai-viet',
  postDetail: '/bai-viet/:postId',
  contact: '/lien-he',
  vanBan: '/van-ban',
  tieuChiLuaChonVanBan: '/van-ban/tieu-chi-lua-chon-van-ban',
  heThongVanBan: '/van-ban/he-thong-van-ban',
  dinhHuongSuDungVanBan: '/dinh-huong-su-dung-van-ban',

  tagSorting: '/tim-kiem-theo-tu-khoa'
} as const
export default mainPath

export const documentSystemPath = {
  tho: '/van-ban/he-thong-van-ban/tho',
  truyenTho: '/van-ban/he-thong-van-ban/truyen-tho',
  truyenKi: '/van-ban/he-thong-van-ban/truyen-ki',
  truyenNganHienDai: '/van-ban/he-thong-van-ban/truyen-ngan-hien-dai',
  biKich: '/van-ban/he-thong-van-ban/bi-kich',
  tuyButTanVan: '/van-ban/he-thong-van-ban/tuy-but-tan-van',
  vanBanTieuBieu: '/van-ban/he-thong-van-ban/van-ban-tieu-bieu'
} as const

export const documentUsageOrientationPath = {
  quyTrinhThietKeCongCuDanhGia: '/dinh-huong-su-dung-van-ban/quy-trinh-thiet-ke-cong-cu-danh-gia',
  deMinhHoa: '/dinh-huong-su-dung-van-ban/de-minh-hoa',
  deMinhHoaXemNhieu: '/dinh-huong-su-dung-van-ban/de-minh-hoa-xem-nhieu'
} as const

export const adminPath = {
  mainPage: '/admin',
  login: '/admin/login',

  //? Post
  postManagement: '/admin/posts',
  createPost: '/admin/posts/create',
  postDetail: '/admin/posts/:postId',

  //? Image
  imageManagement: '/admin/images',
  uploadImage: '/admin/images/upload',
  deleteImage: '/admin/images/delete',

  //? Feedback
  feedbackManagement: '/admin/feedbacks',
  feedbackDetail: '/admin/feedbacks/:feedbackId'
}
