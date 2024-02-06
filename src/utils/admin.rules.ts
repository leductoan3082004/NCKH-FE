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
