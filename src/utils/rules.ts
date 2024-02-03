import * as yup from 'yup'

export const adminLoginSchema = yup.object({
  username: yup.string().required('Tài khoản là bắt buộc'),
  password: yup.string().required('Mật khẩu là bắt buộc')
})

export type AdminLoginSchema = yup.InferType<typeof adminLoginSchema>
