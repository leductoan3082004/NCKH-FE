import { faEnvelope } from '@fortawesome/free-solid-svg-icons'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { yupResolver } from '@hookform/resolvers/yup'
import { useMutation } from '@tanstack/react-query'
import classNames from 'classnames'
import { useState } from 'react'
import { useForm } from 'react-hook-form'
import { feedbackApi } from 'src/apis/feedback.api'
import DialogPopup from 'src/components/DialogPopup'
import Input from 'src/components/Input'
import LoadingRing from 'src/components/LoadingRing'
import NoToolbarJoditEditor from 'src/components/NoToolbarJoditEditor'
import { ErrorRespone } from 'src/types/utils.type'
import { FeedbackSchema, feedbackSchema } from 'src/utils/rules'
import { isAxiosBadRequestError } from 'src/utils/utils'

type FormData = FeedbackSchema

function ErrorSection({ errorMessage }: { errorMessage?: string }) {
  return (
    <div className='grid grid-cols-4 gap-1 col-span-4'>
      <div className='col-start-2 col-end-5 mt-0.5 min-h-[1.25rem] text-sm text-alertRed'>{errorMessage}</div>
    </div>
  )
}

export default function HomepageFeedback() {
  //? Use state
  const [isSending, setIsSending] = useState<boolean>(false)

  //! SEND FEEDBACK
  const methods = useForm<FormData>({
    defaultValues: {
      topic: '',
      content: '',
      name: '',
      email: '',
      phone: ''
    },
    resolver: yupResolver(feedbackSchema)
  })
  const {
    register,
    handleSubmit,
    reset,
    setValue,
    watch,
    setError,
    formState: { errors }
  } = methods

  //:: Edit feedback content
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  const onEditorStateChange = (editorState: any) => {
    setValue('content', editorState)
  }
  const editorContent = watch('content')

  //:: Send feedback
  const sendFeedbackMutation = useMutation({
    mutationFn: feedbackApi.sendFeedback
  })
  const onSubmit = handleSubmit(async (data: FormData) => {
    //? check content of message
    let content = data.content.replace(/\s/g, '')
    content = content.replace(/&nbsp;/g, '')
    content = content.replace(/<br>/g, '')

    if (content == '<p></p>') {
      setError('content', { message: 'Nội dung góp ý không thể trống' })
      return
    }

    setIsSending(true)
    try {
      sendFeedbackMutation.mutate(data, {
        onSuccess: () => {
          reset()
        }
      })
    } catch (error) {
      setIsSending(false)
      if (isAxiosBadRequestError<ErrorRespone>(error)) {
        const formError = error.response?.data
        if (formError) {
          const responeLog = formError?.log as string
          console.log(responeLog)
        }
      }
    }
  })

  //? Handle clear form
  const clearForm = () => {
    reset()
  }

  //! STYLES
  const wrapperStyle = 'grid grid-cols-4 tablet:col-span-4 items-center gap-1 py-1'
  const titleStyle = 'col-span-1 space-x-0.5 uppercase font-medium text-sm desktop:text-base'
  const inputStyle =
    'text-darkText col-span-3 bg-white py-1 px-2 text-sm tablet:text-base rounded-lg outline-none focus:outline-primaryBlue'

  return (
    <div className='container'>
      <div className='border-2 rounded-xl relative py-2 px-2 tablet:px-4 border-black/40'>
        <div className='uppercase flex items-center space-x-1 desktop:space-x-2 absolute top-0 -translate-y-1/2 bg-sectionBlue px-2 text font-bold tablet:text-lg desktop:text-xl desktopLarge:text-2xl text-primaryBlue'>
          <span>
            <FontAwesomeIcon icon={faEnvelope} />
          </span>
          <span>Hộp thư góp ý</span>
        </div>
        <form className='py-4 px-2 tablet:grid tablet:grid-cols-12 tablet:gap-2' onSubmit={onSubmit}>
          <div className='tablet:col-span-4 tablet:pr-4'>
            <div className='tablet:grid flex flex-col tablet:grid-cols-4 space-y-2'>
              <div className='col-span-4'>
                <Input
                  className={wrapperStyle}
                  inputClassName={classNames(inputStyle, {
                    'outline-alertRed': Boolean(errors.name)
                  })}
                  errorClassName='hidden'
                  register={register}
                  name='name'
                  errorMessage={errors?.name?.message}
                  autoComplete='false'
                  errorSection={<ErrorSection errorMessage={errors.name?.message} />}
                >
                  <div className={titleStyle}>
                    <span className=''>Tên</span>
                    <span className='text-alertRed'>*</span>
                  </div>
                </Input>
              </div>

              <div className='col-span-4'>
                <Input
                  className={wrapperStyle}
                  inputClassName={classNames(inputStyle, {
                    'outline-alertRed': Boolean(errors.email)
                  })}
                  errorClassName='hidden'
                  register={register}
                  name='email'
                  errorMessage={errors?.email?.message}
                  autoComplete='false'
                  errorSection={<ErrorSection errorMessage={errors.email?.message} />}
                >
                  <div className={titleStyle}>
                    <span className=''>Email</span>
                    <span className='text-alertRed'>*</span>
                  </div>
                </Input>
              </div>

              <div className='col-span-4'>
                <Input
                  className={wrapperStyle}
                  inputClassName={classNames(inputStyle, {
                    'outline-alertRed': Boolean(errors.phone)
                  })}
                  errorClassName='hidden'
                  register={register}
                  name='phone'
                  errorMessage={errors?.phone?.message}
                  autoComplete='false'
                  errorSection={<ErrorSection errorMessage={errors.phone?.message} />}
                >
                  <div className={titleStyle}>
                    <span className=''>SĐT</span>
                  </div>
                </Input>
              </div>
            </div>
          </div>

          <div className='tablet:col-span-8 border-t tablet:border-l pt-4 tablet:pt-0 tablet:border-t-0 border-black/40 tablet:pl-4 space-y-2'>
            <Input
              className={classNames(wrapperStyle, 'tablet:grid tablet:grid-cols-6')}
              inputClassName={classNames(inputStyle, 'tablet:col-span-5', {
                'outline-alertRed': Boolean(errors.topic)
              })}
              errorClassName='hidden'
              register={register}
              name='topic'
              autoComplete='false'
              errorSection={
                <div className='grid grid-cols-4 gap-1 tablet:grid-cols-6'>
                  <div className='col-start-2 col-end-7 mt-0.5 min-h-[1.25rem] text-sm text-alertRed'>
                    {errors?.topic?.message}
                  </div>
                </div>
              }
            >
              <div className={titleStyle}>
                <span className=''>Chủ đề</span>
                <span className='text-alertRed'>*</span>
              </div>
            </Input>

            <div className='tablet:grid tablet:grid-cols-6 grid grid-cols-4 tablet:col-span-4 gap-1 py-1 '>
              <div className={titleStyle}>
                <span className=''>Nội dung</span>
                <span className='text-alertRed'>*</span>
              </div>
              <div className='col-span-3 outline outline-transparent rounded-md overflow-hidden tablet:col-span-5'>
                <NoToolbarJoditEditor content={editorContent} setContent={onEditorStateChange} />
              </div>
              {/* <textarea
                className={classNames(
                  'text-darkText col-span-3 bg-white py-1 px-2 text-sm tablet:text-base rounded-lg outline-none focus:outline-primaryBlue h-40 tablet:col-span-5',
                  'tablet:col-span-5',
                  {
                    'outline-alertRed': Boolean(errors.content)
                  }
                )}
                {...register('content')}
              /> */}
              <div className='mt-1 min-h-[1.25rem] text-sm text-alertRed col-start-2 col-end-5 tablet:col-end-7'>
                {errors.content?.message}
              </div>
            </div>
          </div>

          <div className='w-full mt-4 tablet:col-span-12 flex justify-end space-x-6'>
            <button
              type='button'
              onClick={clearForm}
              className='rounded-md py-1 px-3 tablet:px-4 bg-alertRed/80 hover:bg-alertRed'
            >
              Hủy
            </button>
            <button
              type='submit'
              className='rounded-md py-1 px-3 tablet:px-4 bg-primaryBackground/80 hover:bg-primaryBackground'
            >
              Gửi
            </button>
          </div>
        </form>
      </div>

      <DialogPopup
        isOpen={isSending}
        handleClose={() => {
          setIsSending(false)
        }}
      >
        {sendFeedbackMutation.isPending && <LoadingRing />}
        {sendFeedbackMutation.isSuccess && (
          <p className='text-center text-xl font-medium uppercase leading-6 text-successGreen'>Cảm ơn bạn đã góp ý</p>
        )}
        {sendFeedbackMutation.isError && (
          <p className='text-center text-xl font-medium uppercase leading-6 text-alertRed'>
            Xảy ra lỗi không mong muốn, vui lòng thử lại
          </p>
        )}
      </DialogPopup>
    </div>
  )
}
