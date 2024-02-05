import { useState } from 'react'
import { Image } from 'src/types/image.type'
import { formatDate } from 'src/utils/utils'

interface Props {
  image: Image
  handleDelete: (imageId: string) => () => void
}

export default function AdminImage({ image, handleDelete }: Props) {
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
            className='py-0.5 tablet:py-1 rounded-md px-2 text-sm tablet:text-base tablet:px-4 bg-red-600 hover:bg-red-500'
            onClick={handleDelete(image._id)}
          >
            Xóa
          </button>
        </div>
      )}
    </div>
  )
}
