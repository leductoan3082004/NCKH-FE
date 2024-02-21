import { yupResolver } from '@hookform/resolvers/yup'
import { useMutation } from '@tanstack/react-query'
import { useContext } from 'react'
import { useForm } from 'react-hook-form'
import Button from 'src/components/Button'
import { HttpStatusMessage } from 'src/constants/httpStatusMessage'
import { AppContext } from 'src/contexts/app.context'
import { ErrorRespone } from 'src/types/utils.type'
import { isAxiosBadRequestError } from 'src/utils/utils'
import AccountInput from 'src/components/AccountInput'
import { AdminLoginSchema, adminLoginSchema } from 'src/utils/rules'
import adminApi from 'src/apis/auth.api'
import { useNavigate } from 'react-router-dom'

type FormData = AdminLoginSchema

export default function AdminLogin() {
  const { setIsAuthenticated } = useContext(AppContext)

  //? Handle login
  const {
    register,
    handleSubmit,
    setError,
    formState: { errors }
  } = useForm<FormData>({
    resolver: yupResolver(adminLoginSchema)
  })

  const loginAccountMutation = useMutation({
    mutationFn: (body: FormData) => adminApi.adminLogin(body)
  })

  const navigate = useNavigate()
  const onSubmit = handleSubmit((data) => {
    loginAccountMutation.mutate(data, {
      onSuccess: () => {
        setIsAuthenticated(true)
        navigate(-1)
      },
      onError: (error) => {
        if (isAxiosBadRequestError<ErrorRespone>(error)) {
          console.log(error)
          const formError = error.response?.data
          if (formError) {
            const errorRespone = HttpStatusMessage.find(({ error_key }) => error_key === formError.error_key)
            if (errorRespone) {
              setError('username', {
                message: errorRespone.error_message,
                type: 'Server'
              })
              setError('password', {
                message: '',
                type: 'Server'
              })
            }
          }
        }
      }
    })
  })

  return (
    <div className='container'>
      <div className='flex justify-center mt-6 tablet:mt-8 desktop:mt-10'>
        <div className='tablet:w-8/12 desktop:w-6/12'>
          <form
            className='rounded-xl bg-sectionBlue py-4 px-3 tablet:px-4 desktop:px-6 shadow-sm duration-200'
            onSubmit={onSubmit}
            noValidate
          >
            <div className='text-center text-2xl font-semibold uppercase text-primaryBlue'>
              đăng nhập dành cho quản trị viên
            </div>

            <AccountInput
              name='username'
              register={register}
              type='text'
              className='mt-8 autofill:text-textDark autofill:dark:text-textLight'
              errorMessage={errors.username?.message}
              labelName='Tài khoản'
              required
              autoComplete='on'
              svgData={
                <>
                  <path d='M1.5 8.67v8.58a3 3 0 003 3h15a3 3 0 003-3V8.67l-8.928 5.493a3 3 0 01-3.144 0L1.5 8.67z' />
                  <path d='M22.5 6.908V6.75a3 3 0 00-3-3h-15a3 3 0 00-3 3v.158l9.714 5.978a1.5 1.5 0 001.572 0L22.5 6.908z' />
                </>
              }
            />

            <AccountInput
              name='password'
              register={register}
              type='password'
              className='mt-3'
              errorMessage={errors.password?.message}
              labelName='Mật khẩu'
              required
              isPasswordInput
              svgData={
                <path
                  fillRule='evenodd'
                  d='M12 1.5a5.25 5.25 0 00-5.25 5.25v3a3 3 0 00-3 3v6.75a3 3 0 003 3h10.5a3 3 0 003-3v-6.75a3 3 0 00-3-3v-3c0-2.9-2.35-5.25-5.25-5.25zm3.75 8.25v-3a3.75 3.75 0 10-7.5 0v3h7.5z'
                  clipRule='evenodd'
                />
              }
            />

            <div className='mt-2 text-base lg:text-lg'>
              <Button
                className='flex w-full items-center justify-center py-2 uppercase lg:py-3'
                type='submit'
                isLoading={loginAccountMutation.isPending}
                disabled={loginAccountMutation.isPending}
              >
                Đăng nhập
              </Button>
            </div>
          </form>
        </div>
      </div>
    </div>
  )
}
