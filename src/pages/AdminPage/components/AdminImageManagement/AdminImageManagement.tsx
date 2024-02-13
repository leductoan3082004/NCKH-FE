import { useState } from 'react'
import { useQuery } from '@tanstack/react-query'
import { ColorRing } from 'react-loader-spinner'
import { imageApi } from 'src/apis/image.api'
import { Image, ImageListConfig } from 'src/types/image.type'
import AdminImageFilter from '../AdminImageFilter'
import useImageListQueryConfig from 'src/hooks/useImageListQueryConfig'

const ImageItem = ({ image }: { image: Image }) => {
  const [hovering, setHovering] = useState<boolean>(false)

  return (
    <div
      className='w-full pt-[75%] relative border border-black/40  rounded-md overflow-hidden'
      onMouseEnter={() => setHovering(true)}
      onMouseLeave={() => setHovering(false)}
    >
      <img src={image.url} alt='Error URL' className='absolute top-0 left-0 h-full w-full object-scale-down' />
      {hovering && (
        <div className='absolute w-10/12 bg-black/80 bottom-1 rounded-md px-2 py-1 left-1/2 -translate-x-1/2 flex items-center space-x-1 text-white text-xs'>
          <p className='overflow-hidden'>{image.url}</p>
        </div>
      )}
    </div>
  )
}

export default function AdminImageManagement() {
  //? GET IMAGE LIST
  const imagesConfig = useImageListQueryConfig()

  const { data: imagesData, isFetching } = useQuery({
    queryKey: ['admin-image-list', imagesConfig],
    queryFn: () => {
      return imageApi.getImageList(imagesConfig as ImageListConfig)
    },
    staleTime: 3 * 60 * 1000
  })

  return (
    <>
      <AdminImageFilter />
      <div className='mt-4'>
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
        {imagesData && (
          <div className='grid grid-cols-2 tablet:grid-cols-3 desktop:grid-cols-4 gap-2'>
            {imagesData?.data.data.map((image) => (
              <div className='col-span-1' key={image._id}>
                <ImageItem image={image} />
              </div>
            ))}
          </div>
        )}
      </div>
    </>
  )
}
