const mainPath = {
  home: '/',
  postDetail: '/:postId',
  vanBan: '/van-ban',
  tieuChiLuaChonVanBan: '/van-ban/tieu-chi-lua-chon-van-ban',
  heThongVanBan: '/van-ban/he-thong-van-ban',
  dinhHuongSuDungVanBan: '/dinh-huong-su-dung-van-ban',
  quyTrinhThietKeCongCuDanhGia: '/quy-trinh-thiet-ke-cong-cu-danh-gia',
  deMinhHoa: '/de-minh-hoa',
  tagSorting: '/tim-kiem-theo-tu-khoa'
} as const
export default mainPath

export const documentSystemPath = {
  tho: '/van-ban/he-thong-van-ban/tho',
  truyenTho: '/van-ban/he-thong-van-ban/truyen-tho',
  truyenKi: '/van-ban/he-thong-van-ban/truyen-ki',
  truyenNganHienDai: '/van-ban/he-thong-van-ban/truyen-ngan-hien-dai',
  biKich: '/van-ban/he-thong-van-ban/bi-kich',
  tuyButTanVan: '/van-ban/he-thong-van-ban/tuy-but-tan-van'
} as const

export const adminPath = {
  login: '/admin-login',
  mainPage: '/admin',

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
