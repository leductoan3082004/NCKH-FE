import { useMutation, useQueryClient } from '@tanstack/react-query'
import { useState } from 'react'
import { ColorRing } from 'react-loader-spinner'
import { imageApi } from 'src/apis/image.api'
import DialogPopup from 'src/components/DialogPopup'
import MultipleFilesInput from '../../components/MultipleFilesInput'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faXmark } from '@fortawesome/free-solid-svg-icons'

export default function AdminUploadImage() {
  //? Use state
  const [files, setFiles] = useState<File[]>([])
  const [excutingDialog, setExcutingDialog] = useState<boolean>(false)
  const [excuting, setExcuting] = useState<boolean>(false)

  //! UPLOAD IMAGE
  const queryClient = useQueryClient()
  const uploadImageMutation = useMutation({
    mutationFn: imageApi.uploadImage
  })
  const handleSubmit = () => {
    setExcutingDialog(true)
    setExcuting(true)
    try {
      for (let i = 0; i < files.length; i++) {
        const body = {
          file: files[i]
        }
        uploadImageMutation.mutate(body)
      }
    } catch (error) {
      console.warn(error)
    }

    queryClient.invalidateQueries({ queryKey: ['admin-image-list'] })
    setFiles([])
    setExcuting(false)
  }

  //! HANDLE FILES
  const handleChangeFiles = (files: File[]) => {
    setFiles(files)
  }

  const removeFile = (fileIndex: number) => () => {
    setFiles(files.filter((_, index) => index != fileIndex))
  }

  return (
    <div className='flex justify-center'>
      <div className='w-full flex flex-col justify-center py-2 px-4 rounded-lg border border-black/20 bg-white min-h-20 max-h-80 desktop:max-h-[600px]'>
        {/* <div className='relative pt-[100%] w-full overflow-hidden rounded-md border-2 border-white'>
          {previewImage && (
            <img src={previewImage} alt='ảnh' className='absolute left-0 top-0 h-full w-full object-cover ' />
          )}
          {!previewImage && <div className='absolute left-0 top-0 h-full w-full bg-white'></div>}
        </div> */}
        {/* <div className='flex w-full justify-between'>
          <InputFile onChangeImageFile={handleChangeFile} buttonStyle={buttonStyle} />
          <button onClick={handleSubmit} className={buttonStyle}>
            Tải lên
          </button>
        </div> */}

        {files.length > 0 && (
          <div className='w-full grid grid-cols-3 tablet:grid-cols-4 desktop:grid-cols-5 gap-2 mb-4 overflow-auto'>
            {files.map((file, index) => {
              const previewImage = file ? URL.createObjectURL(file) : ''
              return (
                <div key={index} className='col-span-1'>
                  <div className='relative pt-[100%] border border-black/20 w-full overflow-hidden rounded-md'>
                    <img src={previewImage} alt='ảnh' className='absolute left-0 top-0 h-full w-full object-cover ' />
                    <button
                      onClick={removeFile(index)}
                      className='absolute top-1 right-1 p-1 text-xs desktop:text-sm hover:text-alertRed rounded-md bg-black/40'
                    >
                      <FontAwesomeIcon icon={faXmark} />
                    </button>
                  </div>
                </div>
              )
            })}
          </div>
        )}

        <div className='flex w-full justify-center'>
          <MultipleFilesInput
            buttonStyle='flex py-1 h-20 w-full hover:bg-black/10 cursor-pointer items-center justify-center rounded-md text-primaryBlue text-sm desktop:text-base border border-black/40 font-medium'
            handleChangeFiles={handleChangeFiles}
            setFiles={setFiles}
          />
        </div>

        <div className='flex w-full justify-end mt-4'>
          <button
            onClick={handleSubmit}
            className='py-2 px-4 text-sm desktop:text-base desktop:px-8 font-medium flex justify-center items-center rounded-md bg-primaryBackground/80 hover:bg-primaryBackground'
          >
            Upload
          </button>
        </div>
      </div>
      <DialogPopup
        isOpen={excutingDialog}
        handleClose={() => {
          setExcutingDialog(false)
        }}
      >
        {excuting && (
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
        {!excuting && (
          <p className='text-center text-xl font-medium uppercase leading-6 text-successGreen'>
            Upload hình ảnh thành công
          </p>
        )}
      </DialogPopup>
    </div>
  )
}
