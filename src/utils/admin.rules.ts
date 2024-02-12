import * as yup from 'yup'

const requiredTag = yup.string().required('Bắt buộc điền tag')
const requiredCategory = yup.string().required('Bắt buộc điền category')

export const createPostSchema = yup.object({
  author: yup.string().required('Bắt buộc điền tên tác giả'),
  title: yup.string().required('Bắt buộc điền tiêu đề'),
  content: yup.string().required('Bắt buộc điền nội dung'),
  tag: yup.array().of(requiredTag).required(),
  category: yup.array().of(requiredCategory).required(),
  image_url: yup.string()
})

export type CreatePostSchema = yup.InferType<typeof createPostSchema>

export const updatePostSchema = yup.object({
  post_id: yup.string().required('Điền ID bài viết'),
  author: yup.string(),
  title: yup.string(),
  content: yup.string(),
  tag: yup.array().of(requiredTag),
  category: yup.array().of(requiredCategory),
  image_url: yup.string()
})

export type UpdatePostSchema = yup.InferType<typeof updatePostSchema>

const currentDate = new Date()

export const imageSchema = yup.object({
  time_from: yup
    .date()
    .max(
      new Date(currentDate.getFullYear(), currentDate.getMonth(), currentDate.getDate() + 1),
      'Chọn thời điểm trong quá khứ'
    ),
  time_to: yup
    .date()
    .max(
      new Date(currentDate.getFullYear(), currentDate.getMonth(), currentDate.getDate()),
      'Chọn thời điểm trong quá khứ'
    )
})

export type ImageSchema = yup.InferType<typeof imageSchema>
