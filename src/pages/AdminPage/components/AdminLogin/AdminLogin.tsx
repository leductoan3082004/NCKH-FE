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

  const onSubmit = handleSubmit((data) => {
    loginAccountMutation.mutate(data, {
      onSuccess: () => {
        setIsAuthenticated(true)
      },
      onError: (error) => {
        if (isAxiosBadRequestError<ErrorRespone>(error)) {
          console.log(error)
          const formError = error.response?.data
          if (formError) {
            const errorRespone = HttpStatusMessage.find(({ error_key }) => error_key === formError.error_key)
            if (errorRespone) {
              console.log(errorRespone.error_message)
              setError('account', {
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
      <div className='grid grid-cols-1 py-12 md:grid-cols-6 md:px-6 md:py-24'>
        <div className='md:col-start-2 md:col-end-6 lg:col-span-3 lg:col-end-7'>
          <form
            className='rounded-xl bg-lightWhite900 p-5 shadow-sm duration-200 dark:bg-darkGray900 md:p-10'
            onSubmit={onSubmit}
            noValidate
          >
            <div className='text-center text-2xl font-semibold uppercase text-haretaColor'>đăng nhập</div>

            <AccountInput
              name='email'
              register={register}
              type='text'
              className='mt-8 autofill:text-textDark autofill:dark:text-textLight'
              errorMessage={errors.account?.message}
              labelName='tài khoản'
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
              labelName='mật khẩu'
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
