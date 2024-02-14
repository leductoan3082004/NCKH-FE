import * as yup from 'yup'

export const createPostSchema = yup.object({
  author: yup.string().required('Bắt buộc có tên tác giả'),
  title: yup.string().required('Bắt buộc có tiêu đề'),
  content: yup.string().required('Bắt buộc có nội dung'),
  tag: yup.array().of(yup.string().required()).required().min(1, 'Cần có ít nhất 1 tag'),
  category: yup.array().of(yup.string().required()).required().min(1, 'Cần có ít nhất 1 category'),
  image_url: yup.string()
})

export type CreatePostSchema = yup.InferType<typeof createPostSchema>

export const updatePostSchema = yup.object({
  post_id: yup.string().required('có ID bài viết'),
  author: yup.string().required('Bắt buộc có tên tác giả'),
  title: yup.string().required('Bắt buộc có tiêu đề'),
  content: yup.string().required('Bắt buộc có nội dung'),
  tag: yup.array().of(yup.string().required()).required().min(1, 'Cần có ít nhất 1 tag'),
  category: yup.array().of(yup.string().required()).required().min(1, 'Cần có ít nhất 1 category'),
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
