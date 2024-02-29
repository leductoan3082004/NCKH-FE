import { useMutation, useQuery, useQueryClient } from '@tanstack/react-query'
import { imageApi } from 'src/apis/image.api'
import { ColorRing } from 'react-loader-spinner'
import { useState } from 'react'
import DialogPopup from 'src/components/DialogPopup'
import useImageListQueryConfig from 'src/hooks/useImageListQueryConfig'
import { Image, ImageListConfig } from 'src/types/image.type'
import { formatDate } from 'src/utils/utils'
import AdminImageFilter from '../../components/AdminImageFilter'

function ImageItem({ image, handleDelete }: { image: Image; handleDelete: (imageId: string) => () => void }) {
  const [hoveringImage, setHoveringImage] = useState<boolean>(false)

  return (
    <div
      className='w-full pt-[75%] relative border border-black/40  rounded-md overflow-hidden'
      onMouseEnter={() => setHoveringImage(true)}
      onMouseLeave={() => setHoveringImage(false)}
    >
      <img src={image.url} alt='Error URL' className='absolute top-0 left-0 h-full w-full object-scale-down' />
      {hoveringImage && (
        <div className='absolute py-1 px-2 w-full bottom-0 left-0 bg-black/40 flex justify-between items-center'>
          <div className='flex space-x-1 tablet:space-x-2 text-xs tablet:text-sm text-white'>
            <p className='font-semibold'>Ngày tải lên:</p>
            <p className=''>{formatDate(image.created_at)}</p>
          </div>
          <button
            className='py-0.5 tablet:py-1 rounded-md px-2 text-sm tablet:text-base tablet:px-4 bg-alertRed/80 hover:bg-alertRed'
            onClick={handleDelete(image._id)}
          >
            Xóa
          </button>
        </div>
      )}
    </div>
  )
}

export default function AdminDeleteImage() {
  const [excutingDialog, setExcutingDialog] = useState<boolean>(false)

  //! GET IMAGE LIST
  const imagesConfig = useImageListQueryConfig()

  const {
    data: imagesData,
    isFetching,
    isFetched
  } = useQuery({
    queryKey: ['admin-image-list', imagesConfig],
    queryFn: () => {
      return imageApi.getImageList(imagesConfig as ImageListConfig)
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
          queryClient.invalidateQueries({ queryKey: ['admin-image-list'] })
        }
      }
    )
  }

  return (
    <>
      <AdminImageFilter />
      <div className='mt-4'>
        {(isFetching || !imagesData) && (
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
        {isFetched && imagesData && (
          <div className='grid grid-cols-2 tablet:grid-cols-3 desktop:grid-cols-4 gap-2 '>
            {imagesData.data.data.map((image) => (
              <div className='col-span-1' key={image._id}>
                <ImageItem image={image} handleDelete={handleDelete} />
              </div>
            ))}
          </div>
        )}
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
