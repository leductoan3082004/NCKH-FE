import { useMutation, useQuery, useQueryClient } from '@tanstack/react-query'
import { Fragment, useEffect, useState } from 'react'
import { useNavigate, useParams } from 'react-router-dom'
import postApi from 'src/apis/post.api'
import LoadingRing from 'src/components/LoadingRing'
import { formatTimeToSeconds, getIdFromPostId, isAxiosBadRequestError } from 'src/utils/utils'
import AdminPostInfor from '../AdminPostInfor'
import { FloatingOverlay } from '@floating-ui/react'
import classNames from 'classnames'
import AdminUpdatePostForm from '../AdminUpdatePostForm'
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

type FormData = UpdatePostSchema

export default function AdminPostDetail() {
  //? Use state
  const [editingMode, setEditingMode] = useState<boolean>(false)
  const [updateExcutingDialog, setUpdateExcutingDialog] = useState<boolean>(false)
  const [excuting, setExcuting] = useState<boolean>(false)
  const [deleteDialog, setDeleteDialog] = useState<boolean>(false)
  const [deleteExcutingDialog, setDeleteExcutingDialog] = useState<boolean>(false)
  const [imageFile, setImageFile] = useState<File>()
  const [imageListConfig, setImageListConfig] = useState<ImageListQueryConfig>(useImageListQueryConfig())

  //? Get post detail
  const { postId: paramPostId } = useParams()
  const postId = getIdFromPostId(paramPostId as string)
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
      image_url: postDetail?.image_url || ''
    },
    resolver: yupResolver(updatePostSchema)
  })
  const { handleSubmit } = methods

  const updatePostMutation = useMutation({ mutationFn: postApi.updatePost })
  const uploadImageMutation = useMutation({ mutationFn: imageApi.uploadImage })
  const deleteImageMutation = useMutation({ mutationFn: imageApi.deleteImage })

  const onSubmit = handleSubmit(async (data) => {
    setExcuting(true)
    setUpdateExcutingDialog(true)
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
        image_url: newUploadedImageRespone ? newUploadedImageRespone.data.data.url : ''
      }
      await updatePostMutation.mutateAsync(updatePostBody)

      //:: On success
      queryClient.invalidateQueries({ queryKey: ['admin-image-list'] })
      queryClient.invalidateQueries({ queryKey: ['admin-post-detail'] })
      queryClient.invalidateQueries({ queryKey: ['admin-post-list'] })
      window.scrollTo({ top: 0, left: 0 })
      setEditingMode(false)
      setImageFile(undefined)
      setExcuting(false)
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
      {(isLoading || !postDetail) && (
        <div className='w-full h-[600px] flex items-center justify-center'>
          <LoadingRing />
        </div>
      )}
      {isFetched && (
        <Fragment>
          {postDetail && !editingMode && <AdminPostInfor postDetail={postDetail} />}
          {postDetail && editingMode && (
            <FormProvider {...methods}>
              <form className='py-2 space-y-2' onSubmit={onSubmit}>
                <AdminUpdatePostForm postDetail={postDetail} imageFile={imageFile} setImageFile={setImageFile} />
                <div className='w-full flex justify-between items-center'>
                  <button
                    type='button'
                    className={classNames('bg-alertRed/80 hover:bg-alertRed py-1 h-min px-4 rounded-md', {})}
                    onClick={openDeleteDialog}
                  >
                    Xóa bài viết
                  </button>
                  <button
                    type='submit'
                    className='bg-primaryBackground/80 hover:bg-primaryBackground py-1 px-4 rounded-md'
                  >
                    Lưu
                  </button>
                </div>
              </form>
            </FormProvider>
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

          {editingMode && (
            <FloatingOverlay className='w-full h-min flex justify-center pt-1 items-center space-x-2 desktop:space-x-6'>
              <div className='bg-primaryBackground p-2 rounded-lg desktop:text-lg font-bold'>Chế độ chỉnh sửa</div>
              <button
                type='button'
                className='bg-alertRed/80 hover:bg-alertRed py-1 px-2 rounded-md'
                onClick={turnOffEditingMode}
              >
                Hủy
              </button>
            </FloatingOverlay>
          )}
        </Fragment>
      )}

      <DialogPopup
        isOpen={updateExcutingDialog}
        handleClose={() => {
          setUpdateExcutingDialog(false)
        }}
      >
        {excuting && <LoadingRing />}
        {!excuting && (
          <p className='text-center text-xl font-bold uppercase leading-6 text-successGreen'>
            Bài viết đã được cập nhật
          </p>
        )}
      </DialogPopup>

      <DialogPopup
        isOpen={deleteDialog}
        handleClose={() => {
          setDeleteDialog(false)
        }}
      >
        <div className='flex flex-col justify-between h-full py-4'>
          <p className='text-center text-xl font-bold uppercase leading-6 text-alertRed'>Xác nhận xóa bài viết</p>
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
