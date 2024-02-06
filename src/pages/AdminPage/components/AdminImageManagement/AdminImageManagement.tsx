import { useQuery } from '@tanstack/react-query'
import { ColorRing } from 'react-loader-spinner'
import { imageApi } from 'src/apis/image.api'

export default function AdminImageManagement() {
  //? GET IMAGE LIST
  const { data: imagesData, isFetching } = useQuery({
    queryKey: ['adminImageList'],
    queryFn: () => {
      return imageApi.getImageList()
    },
    staleTime: 3 * 60 * 1000
  })
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
              <div className='w-full pt-[75%] relative border border-black/40  rounded-md overflow-hidden'>
                <img
                  src={image.url}
                  alt='Error URL'
                  className='absolute top-0 left-0 h-full w-full object-scale-down'
                />
              </div>
            </div>
          ))}
      </div>
    </>
  )
}
