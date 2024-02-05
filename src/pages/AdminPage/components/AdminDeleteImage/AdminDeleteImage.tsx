import { useMutation, useQuery, useQueryClient } from '@tanstack/react-query'
import { imageApi } from 'src/apis/image.api'
import AdminImage from '../AdminImage'
import { ColorRing } from 'react-loader-spinner'
import { useState } from 'react'
import DialogPopup from 'src/components/DialogPopup'

export default function AdminDeleteImage() {
  const [excutingDialog, setExcutingDialog] = useState<boolean>(false)

  //? GET IMAGE LIST
  const { data: imagesData, isFetching } = useQuery({
    queryKey: ['adminImageList'],
    queryFn: () => {
      return imageApi.getImageList()
    },
    staleTime: 3 * 60 * 1000
  })

  //? HANDLE DELETE
  const queryClient = useQueryClient()

  const deleteImageMutation = useMutation({
    mutationFn: imageApi.deleteImage
  })
  const handleDelete = (imageId: string) => () => {
    setExcutingDialog(true)
    deleteImageMutation.mutate(
      { image_id: imageId as string },
      {
        onSuccess: () => {
          queryClient.invalidateQueries({ queryKey: ['adminImageList'] })
        }
      }
    )
  }

  return (
    <>
      {isFetching && (
        <div className='w-full h-80 flex items-center justify-center'>
          <ColorRing
            visible={true}
            height='80'
            width='80'
            ariaLabel='blocks-loading'
            wrapperStyle={{}}
            wrapperClass='blocks-wrapper'
            colors={['#0096C7', '#0096C7', '#0096C7', '#0096C7', '#0096C7']}
          />
        </div>
      )}
      <div className='grid grid-cols-2 tablet:grid-cols-3 desktop:grid-cols-4 gap-2 '>
        {imagesData &&
          imagesData.data.data.map((image) => (
            <div className='col-span-1' key={image._id}>
              <AdminImage image={image} handleDelete={handleDelete} />
            </div>
          ))}
      </div>

      <DialogPopup
        isOpen={excutingDialog}
        handleClose={() => {
          setExcutingDialog(false)
        }}
      >
        {deleteImageMutation.isPending && (
          <ColorRing
            visible={true}
            height='80'
            width='80'
            ariaLabel='blocks-loading'
            wrapperStyle={{}}
            wrapperClass='blocks-wrapper'
            colors={['#0096C7', '#0096C7', '#0096C7', '#0096C7', '#0096C7']}
          />
        )}
        {deleteImageMutation.isSuccess && (
          <p className='text-center text-xl font-medium uppercase leading-6 text-green-500'>Đã xóa hình ảnh</p>
        )}
      </DialogPopup>
    </>
  )
}
