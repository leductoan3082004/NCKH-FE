import { yupResolver } from '@hookform/resolvers/yup'
import { useMutation, useQueryClient } from '@tanstack/react-query'
import { AxiosResponse } from 'axios'
import { useContext, useMemo, useState } from 'react'
import { FormProvider, useForm } from 'react-hook-form'
import { imageApi } from 'src/apis/image.api'
import postApi from 'src/apis/post.api'
import DialogPopup from 'src/components/DialogPopup'
import LoadingRing from 'src/components/LoadingRing'
import { Image } from 'src/types/image.type'
import { ErrorRespone, SuccessRespone } from 'src/types/utils.type'
import { CreatePostSchema, createPostSchema } from 'src/utils/admin.rules'
import { isAxiosBadRequestError } from 'src/utils/utils'
import AdminCreatePostForm from './AdminCreatePostForm'
import { AdminContext } from 'src/contexts/admin.context'
import useQueryConfigForPosts from 'src/hooks/useQueryConfigForPosts'
import InputFile from 'src/components/InputFile'

type FormData = CreatePostSchema

export default function AdminCreatePost() {
  const { tags, setTags, categories, setCategories } = useContext(AdminContext)

  const [file, setFile] = useState<File>()
  const [excutingDialog, setExcutingDialog] = useState<boolean>(false)

  //? Handle avatar
  const previewImage = useMemo(() => {
    return file ? URL.createObjectURL(file) : ''
  }, [file])

  const handleChangeFile = (file?: File) => {
    setFile(file)
  }

  //? CREATE POST
  const methods = useForm<FormData>({
    defaultValues: {
      author: '',
      title: '',
      content: 'Chưa có nội dung',
      tag: [],
      category: [],
      image_url: ''
    },
    resolver: yupResolver(createPostSchema)
  })

  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  const onInvalid = (errors: any) => console.error(errors)
  const { handleSubmit, reset } = methods
  const queryClient = useQueryClient()
  const queryConfigForPosts = useQueryConfigForPosts()
  const createPostMutation = useMutation({
    mutationFn: postApi.createPost
  })
  const uploadImageMutation = useMutation({
    mutationFn: imageApi.uploadImage
  })

  const onSubmit = async (data: FormData) => {
    setExcutingDialog(true)
    try {
      // eslint-disable-next-line @typescript-eslint/no-explicit-any
      let newUploadedImageRespone: AxiosResponse<SuccessRespone<Image>, any> | null = null
      if (file) {
        const uploadImageBody = {
          file: file
        }
        newUploadedImageRespone = await uploadImageMutation.mutateAsync({ ...uploadImageBody })
      }
      const newPostBody: FormData = {
        author: data.author,
        title: data.title,
        content: data.content,
        tag: tags,
        category: categories,
        image_url: newUploadedImageRespone ? newUploadedImageRespone.data.data.url : ''
      }
      createPostMutation.mutate(newPostBody, {
        onSuccess: () => {
          reset()
          setTags([])
          setCategories([])
          queryClient.invalidateQueries({ queryKey: ['adminPostList', queryConfigForPosts] })
        }
      })
    } catch (error) {
      if (isAxiosBadRequestError<ErrorRespone>(error)) {
        const formError = error.response?.data
        if (formError) {
          const responeLog = formError?.log as string
          console.log(responeLog)
        }
      }
    }
  }

  //? Styles
  const buttonStyle =
    'flex py-1 px-6 tablet:px-8 desktop:px-10 hover:bg-primaryBackground cursor-pointer items-center justify-center rounded-md text-sm font-semibold tablet:text-base bg-black/60 text-white hover:text-darkText'

  return (
    <div>
      <div className='grid grid-cols-4 items-center gap-2 border border-black/20 py-1 px-2 rounded-md'>
        <div className='col-span-1'>
          <p className='text-xs tablet:text-sm font-semibold uppercase text-primaryBlue lg:text-base'>Ảnh đại diện</p>
        </div>
        <div className='col-span-3'>
          <div className='w-full tabletSmall:w-8/12 tablet:w-6/12 desktop:w-4/12 flex flex-col space-y-4 items-center py-4'>
            <div className='relative pt-[100%] w-full overflow-hidden rounded-md border-2 border-white'>
              {previewImage && (
                <img src={previewImage} alt='ảnh' className='absolute left-0 top-0 h-full w-full object-cover ' />
              )}
              {!previewImage && <div className='absolute left-0 top-0 h-full w-full bg-white'></div>}
              <div className='flex w-full justify-center absolute bottom-1 left-1/2 -translate-x-1/2'>
                <InputFile onChangeImageFile={handleChangeFile} buttonStyle={buttonStyle} />
              </div>
            </div>
          </div>
        </div>
      </div>

      <FormProvider {...methods}>
        <form className='space-y-4 mt-4' onSubmit={handleSubmit(onSubmit, onInvalid)}>
          <AdminCreatePostForm />
          <div className='col-span-1 mt-2 flex items-center justify-end'>
            <button
              className='rounded-lg bg-haretaColor/80 px-4 py-1 text-base hover:bg-primaryBackground bg-primaryBackground/80 lg:text-lg'
              type='submit'
            >
              Tạo bài viết
            </button>
          </div>
        </form>
      </FormProvider>
      <DialogPopup
        isOpen={excutingDialog}
        handleClose={() => {
          setExcutingDialog(false)
        }}
      >
        {(uploadImageMutation.isPending || createPostMutation.isPending) && <LoadingRing />}
        {createPostMutation.isSuccess && (
          <p className='text-center text-xl font-medium uppercase leading-6 text-green-500'>
            Đã tạo bài viết thành công
          </p>
        )}
      </DialogPopup>
    </div>
  )
}