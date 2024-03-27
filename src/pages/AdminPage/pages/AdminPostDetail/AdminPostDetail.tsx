import { useMutation, useQuery, useQueryClient } from '@tanstack/react-query'
import { Fragment, useContext, useEffect, useState } from 'react'
import { useNavigate, useParams } from 'react-router-dom'
import postApi from 'src/apis/post.api'
import LoadingRing from 'src/components/LoadingRing'
import { formatTimeToSeconds, getIdFromUrl, isAxiosBadRequestError } from 'src/utils/utils'
import AdminPostInfor from '../../components/AdminPostInfor'
import classNames from 'classnames'
import AdminUpdatePostForm from '../../components/AdminUpdatePostForm'
import { FormProvider, useForm } from 'react-hook-form'
import { UpdatePostSchema, updatePostSchema } from 'src/utils/admin.rules'
import { yupResolver } from '@hookform/resolvers/yup'
import DialogPopup from 'src/components/DialogPopup'
import { adminPath } from 'src/constants/path'
import { imageApi } from 'src/apis/image.api'
import { ErrorRespone, SuccessRespone } from 'src/types/utils.type'
import { AxiosResponse } from 'axios'
import { Image, ImageListConfig } from 'src/types/image.type'
import useImageListQueryConfig, { ImageListQueryConfig } from 'src/hooks/useImageListQueryConfig'
import { AdminContext } from 'src/contexts/admin.context'

type FormData = UpdatePostSchema

export default function AdminPostDetail() {
  //? Use context
  const { updateTags, updateCategories } = useContext(AdminContext)

  //? Use state
  const [editingMode, setEditingMode] = useState<boolean>(false)
  const [updateExcutingDialog, setUpdateExcutingDialog] = useState<boolean>(false)
  const [excuting, setExcuting] = useState<boolean>(false)
  const [deleteDialog, setDeleteDialog] = useState<boolean>(false)
  const [deleteExcutingDialog, setDeleteExcutingDialog] = useState<boolean>(false)
  const [imageFile, setImageFile] = useState<File>()
  const [imageListConfig, setImageListConfig] = useState<ImageListQueryConfig>(useImageListQueryConfig())
  const [updateSuccess, setUpdateSuccess] = useState<boolean>(false)
  const [invalidFields, setInvalidFields] = useState<string[]>([])
  const [undefinedError, setUndefinedError] = useState<boolean>(false)

  //? Get post detail
  const { postId: paramPostId } = useParams()
  const postId = getIdFromUrl(paramPostId as string)
  const {
    data: postDetailData,
    isLoading,
    isFetched
  } = useQuery({
    queryKey: ['admin-post-detail', postId],
    queryFn: () => postApi.getPostDetail(postId as string)
  })
  const postDetail = postDetailData?.data.data

  //? Handler button
  const turnOnEditingMode = () => {
    setEditingMode(true)
    window.scrollTo({ top: 0, left: 0, behavior: 'smooth' })
  }
  const turnOffEditingMode = () => {
    setEditingMode(false)
  }

  //! HANDLE UPDATE POST
  useEffect(() => {
    if (postDetail) {
      const createdDate = new Date(postDetail.created_at)
      setImageListConfig({
        ...imageListConfig,
        time_from: String(
          formatTimeToSeconds(
            new Date(createdDate.getFullYear(), createdDate.getMonth(), createdDate.getDate()).getTime()
          )
        ),
        time_to: String(
          formatTimeToSeconds(
            new Date(createdDate.getFullYear(), createdDate.getMonth(), createdDate.getDate() + 1).getTime()
          )
        )
      })
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [postDetail])

  const { data: imagesData } = useQuery({
    queryKey: ['admin-image-list', imageListConfig],
    queryFn: () => {
      return imageApi.getImageList(imageListConfig as ImageListConfig)
    },
    staleTime: 3 * 60 * 1000
  })
  const imageList = imagesData?.data.data
  const avatarImage = imageList?.find((image) => {
    if (image.url == postDetail?.image_url) return image._id
  })
  const avatarImageID = avatarImage?._id

  //? Form methods
  const methods = useForm<FormData>({
    defaultValues: {
      post_id: postDetail?._id || '',
      author: postDetail?.author || '',
      title: postDetail?.title || '',
      content: postDetail?.content || '',
      tag: postDetail?.tag || [],
      category: postDetail?.category || [],
      image_url: postDetail?.image_url || 'emptyUrl'
    },
    resolver: yupResolver(updatePostSchema)
  })
  const { handleSubmit } = methods

  const updatePostMutation = useMutation({ mutationFn: postApi.updatePost })
  const uploadImageMutation = useMutation({ mutationFn: imageApi.uploadImage })
  const deleteImageMutation = useMutation({ mutationFn: imageApi.deleteImage })

  //? Validate form
  const validateForm = (form: FormData) => {
    const invalidFields = []
    for (const key in form) {
      const value: string | string[] = form[key as keyof FormData]
      if (key == 'tag' || key == 'category') {
        if (value.length == 0) {
          invalidFields.push(key)
        }
      } else {
        if (value == '') {
          if (key == 'image_url') {
            continue
          } else invalidFields.push(key)
        }
      }
    }
    return invalidFields
  }

  //? Handle submit form
  const onSubmit = handleSubmit(async (data) => {
    setUpdateExcutingDialog(true)
    setExcuting(true)
    // const validateForm =
    //   (data.author != '' && data.author != postDetail?.author) ||
    //   (data.title != '' && data.title != postDetail?.title) ||
    //   (data.image_url != '' && data.image_url != postDetail?.image_url) ||
    //   (data.content != '' && data.content != postDetail?.content) ||
    //   (data.tag.length > 0 && data.tag != postDetail?.tag) ||
    //   (data.category.length > 0 && data.category != postDetail?.category)

    // if (!validateForm) {
    //   setExcuting(false)
    //   return
    // }

    data = {
      ...data,
      tag: updateTags,
      category: updateCategories
    }

    const invalidFields = validateForm(data)

    if (invalidFields.length > 0) {
      setInvalidFields(invalidFields)
      setExcuting(false)
      return
    }

    try {
      // eslint-disable-next-line @typescript-eslint/no-explicit-any
      let newUploadedImageRespone: AxiosResponse<SuccessRespone<Image>, any> | null = null
      if (imageFile) {
        if (avatarImageID) deleteImageMutation.mutate({ image_id: avatarImageID })
        const uploadImageBody = {
          file: imageFile
        }
        newUploadedImageRespone = await uploadImageMutation.mutateAsync({ ...uploadImageBody })
      }
      const updatePostBody: FormData = {
        ...data,
        image_url: newUploadedImageRespone ? newUploadedImageRespone.data.data.url : data.image_url
      }
      updatePostMutation.mutate(updatePostBody, {
        onSuccess: () => {
          queryClient.invalidateQueries({ queryKey: ['admin-image-list'] })
          queryClient.invalidateQueries({ queryKey: ['admin-post-detail'] })
          queryClient.invalidateQueries({ queryKey: ['admin-post-list'] })
          setUpdateSuccess(true)
        },
        onError: () => {
          setUndefinedError(true)
        },
        onSettled: () => {
          window.scrollTo({ top: 0, left: 0 })
          setInvalidFields([])
          setEditingMode(false)
          setImageFile(undefined)
          setExcuting(false)
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
  })

  //! HANDLE DELETE POST
  const navigate = useNavigate()
  const deletePostMutation = useMutation({
    mutationFn: postApi.deletePost
  })
  const openDeleteDialog = () => {
    setDeleteDialog(true)
  }
  const deletePost = () => {
    setDeleteDialog(false)
    setDeleteExcutingDialog(true)
    setExcuting(true)
    if (avatarImageID) deleteImageMutation.mutate({ image_id: avatarImageID })
    if (postDetail) deletePostMutation.mutate({ post_id: postDetail._id })

    //:: On success
    queryClient.invalidateQueries({ queryKey: ['admin-image-list'] })
    queryClient.invalidateQueries({ queryKey: ['admin-post-detail'] })
    queryClient.invalidateQueries({ queryKey: ['admin-post-list'] })
    window.scrollTo({ top: 0, left: 0 })
    setEditingMode(false)
    setExcuting(false)
  }

  const queryClient = useQueryClient()
  const closeDeleteExcutingDialog = () => {
    setDeleteExcutingDialog(false)
    navigate({ pathname: adminPath.postManagement })
  }

  return (
    <Fragment>
      <FormProvider {...methods}>
        <form className='space-y-4 relative' onSubmit={onSubmit}>
          {(isLoading || !postDetail) && (
            <div className='w-full h-[600px] flex items-center justify-center'>
              <LoadingRing />
            </div>
          )}
          {!editingMode && (
            <div className='flex items-center justify-end'>
              <button
                type='button'
                className='bg-primaryBackground/80 hover:bg-primaryBackground p-2 rounded-md'
                onClick={turnOnEditingMode}
              >
                Chỉnh sửa bài viết
              </button>
            </div>
          )}

          {isFetched && (
            <Fragment>
              {postDetail && !editingMode && <AdminPostInfor postDetail={postDetail} />}
              {postDetail && editingMode && (
                <div className='py-2 space-y-2'>
                  <AdminUpdatePostForm postDetail={postDetail} imageFile={imageFile} setImageFile={setImageFile} />
                </div>
              )}
            </Fragment>
          )}
          {editingMode && (
            <div className='sticky z-10 bottom-2 w-full h-min px-4 flex justify-between py-2 rounded-lg items-center space-x-2 desktop:space-x-6 bg-black/60'>
              <div className='bg-primaryBackground p-2 rounded-lg desktop:text-base font-medium shrink-0'>
                Chế độ chỉnh sửa
              </div>
              <div className='w-full grid grid-cols-3 gap-1'>
                <div className='col-span-1 flex items-center justify-center'>
                  <button
                    type='button'
                    className='border border-white/40 text-white hover:bg-primaryBackground/80 py-1 px-4 text-sm rounded-md'
                    onClick={turnOffEditingMode}
                  >
                    Hủy chỉnh sửa
                  </button>
                </div>
                <div className='col-span-1 flex items-center justify-center'>
                  <button
                    type='button'
                    className={classNames('bg-alertRed/80 hover:bg-alertRed  text-sm py-1 px-4 rounded-md', {})}
                    onClick={openDeleteDialog}
                  >
                    Xóa bài viết
                  </button>
                </div>
                <div className='col-span-1 flex items-center justify-center'>
                  <button
                    type='submit'
                    className='bg-primaryBackground/80 hover:bg-primaryBackground py-1 text-sm px-4 rounded-md'
                  >
                    Lưu
                  </button>
                </div>
              </div>
            </div>
          )}
        </form>
      </FormProvider>

      {/* //! FIELDS FOR DIALOG */}
      <DialogPopup
        isOpen={updateExcutingDialog}
        handleClose={() => {
          setUpdateExcutingDialog(false)
        }}
      >
        {excuting && <LoadingRing />}
        {!excuting && (
          <Fragment>
            {updateSuccess && (
              <p className='text-center text-xl font-medium uppercase leading-6 text-successGreen'>
                Bài viết đã được cập nhật
              </p>
            )}
            {invalidFields.length > 0 && (
              <div className='space-y-2'>
                <p className='text-left text-lg font-medium uppercase leading-6 text-alertRed'>
                  Chỉnh sửa bài viết không thành công do các nội dung sau không hợp lệ:
                </p>
                <div className='flex flex-col space-y-2 items-start'>
                  {invalidFields.map((field, index) => (
                    <span key={index} className=''>
                      - {field}
                    </span>
                  ))}
                </div>
              </div>
            )}
            {undefinedError && (
              <p className='text-center text-xl font-medium uppercase leading-6 text-alertRed'>
                Đã có lỗi xảy ra, vui lòng thử lại
              </p>
            )}
          </Fragment>
        )}
      </DialogPopup>

      <DialogPopup
        isOpen={deleteDialog}
        handleClose={() => {
          setDeleteDialog(false)
        }}
      >
        <div className='flex flex-col justify-between h-full py-4'>
          <p className='text-center text-xl font-medium uppercase leading-6 text-alertRed'>Xác nhận xóa bài viết</p>
          <div className='flex justify-between items-center text-sm'>
            <button
              type='button'
              className='bg-alertRed/80 hover:bg-alertRed py-1 px-4 rounded-md'
              onClick={() => setDeleteDialog(false)}
            >
              Hủy
            </button>

            <button
              type='button'
              className='bg-primaryBackground/80 hover:bg-primaryBackground py-1 px-4 rounded-md'
              onClick={deletePost}
            >
              Xóa
            </button>
          </div>
        </div>
      </DialogPopup>

      <DialogPopup isOpen={deleteExcutingDialog} handleClose={closeDeleteExcutingDialog}>
        {excuting && <LoadingRing />}
        {!excuting && (
          <p className='text-center text-xl font-medium uppercase leading-6 text-successGreen'>Đã xóa bài viết</p>
        )}
      </DialogPopup>
    </Fragment>
  )
}
