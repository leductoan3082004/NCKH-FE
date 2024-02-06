const mainPath = {
  home: '/',
  vanBan: '/van-ban',
  dinhHuongSuDung: '/dinh-huong-su-dung-van-ban',
  gioiThieu: '/gioi-thieu',
  gopY: '/gop-y',
  lienHe: '/lien-he',
  tieuChiLuaChon: '/tieu-chi-lua-chon',
  heThongVanBan: '/he-thong-van-ban',
  thietKeCongCuDanhGia: '/thiet-ke-cong-cu-danh-gia',
  deMinhHoa: '/de-minh-hoa'
} as const
export default mainPath

export const documentSystemPath = {
  tho: '/he-thong-van-ban/tho',
  truyenTho: '/he-thong-van-ban/truyen-tho',
  truyenNganHienDai: '/he-thong-van-ban/truyen-ngan-hien-dai',
  biKich: '/he-thong-van-ban/bi-kich',
  truyenKi: '/he-thong-van-ban/truyen-ki',
  tuyButTanVan: '/he-thong-van-ban/tuy-but-tan-van'
} as const

export const adminPath = {
  login: '/admin-login',
  mainPage: '/admin',
  postManagement: '/admin/posts/manage',
  createPost: '/admin/posts/create',
  updatePost: '/admin/posts/update',
  deletePost: '/admin/posts/delete',
  imageManagement: '/admin/images',
  uploadImage: '/admin/images/upload',
  deleteImage: '/admin/images/delete'
}
