import { useMutation } from '@tanstack/react-query'
import { useMemo, useState } from 'react'
import { ColorRing } from 'react-loader-spinner'
import { imageApi } from 'src/apis/image.api'
import DialogPopup from 'src/components/DialogPopup'
import InputFile from 'src/components/InputFile'

export default function AdminUploadImage() {
  //? Use state
  const [file, setFile] = useState<File>()
  const [excutingDialog, setExcutingDialog] = useState<boolean>(false)

  const previewImage = useMemo(() => {
    return file ? URL.createObjectURL(file) : ''
  }, [file])

  //? UPLOAD IMAGE
  const uploadImageMutation = useMutation({
    mutationFn: imageApi.uploadImage
  })
  const handleSubmit = () => {
    try {
      if (file) {
        setExcutingDialog(true)
        const body = {
          file: file
        }

        uploadImageMutation.mutate(body)
      }
    } catch (error) {
      console.warn(error)
    }
  }

  const handleChangeFile = (file?: File) => {
    setFile(file)
  }

  //? Styles
  const buttonStyle =
    'flex py-1 px-6 tablet:px-8 desktop:px-10 hover:bg-primaryBackground cursor-pointer items-center justify-center rounded-md bg-white text-sm font-semibold tablet:text-base desktop:text-lg'

  return (
    <div className='flex justify-center'>
      <div className='w-9/12 tablet:w-6/12 desktop:w-4/12 flex flex-col space-y-4 items-center py-4'>
        <div className='relative pt-[100%] w-full overflow-hidden rounded-md border-2 border-white'>
          {previewImage && (
            <img src={previewImage} alt='ảnh' className='absolute left-0 top-0 h-full w-full object-cover ' />
          )}
          {!previewImage && <div className='absolute left-0 top-0 h-full w-full bg-white'></div>}
        </div>
        <div className='flex w-full justify-between'>
          <InputFile onChangeImageFile={handleChangeFile} buttonStyle={buttonStyle} />
          <button onClick={handleSubmit} className={buttonStyle}>
            Tải lên
          </button>
        </div>
      </div>
      <DialogPopup
        isOpen={excutingDialog}
        handleClose={() => {
          setExcutingDialog(false)
        }}
      >
        {uploadImageMutation.isPending && (
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
        {uploadImageMutation.isSuccess && (
          <p className='text-center text-xl font-medium uppercase leading-6 text-green-500'>Đã tải hình ảnh lên</p>
        )}
      </DialogPopup>
    </div>
  )
}
