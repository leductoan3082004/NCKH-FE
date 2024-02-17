const mainPath = {
  home: '/',
  posts: '/bai-viet',
  postDetail: '/bai-viet/:postId'
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
