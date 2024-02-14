import * as yup from 'yup'

export const adminLoginSchema = yup.object({
  username: yup.string().required('Tài khoản là bắt buộc'),
  password: yup.string().required('Mật khẩu là bắt buộc')
})

export type AdminLoginSchema = yup.InferType<typeof adminLoginSchema>

export const findPostSchema = yup.object({
  content: yup.string()
})

export type FindPostSchema = yup.InferType<typeof findPostSchema>

const digitsOnly = (value: string | undefined) => {
  if (!value) return true
  if (value) /^\d+$/.test(value)
}
export const feedbackSchema = yup.object({
  topic: yup.string().required('Bạn cần điền chủ đề góp ý'),
  content: yup.string().required('Bạn cần điền nội dung góp ý'),
  name: yup.string().required('Bạn cần điền tên'),
  email: yup.string().email('Không đúng định dạng email').required('Bạn cần điền địa chỉ email'),
  phone: yup
    .string()
    .test('Digits only', 'The field should have digits only', digitsOnly)
    .max(10, 'Số điện thoại không hợp lệ')
})

export type FeedbackSchema = yup.InferType<typeof feedbackSchema>
