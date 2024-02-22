import React, { Fragment, useCallback } from 'react'
import { useDropzone } from 'react-dropzone'
import config from 'src/constants/config'

interface Props {
  handleChangeFiles?: (files: File[]) => void
  setFiles: React.Dispatch<React.SetStateAction<File[]>>
  buttonStyle?: string
}

const isImageFile = (file: File) => {
  if (file.size > config.maxSizeUploadAvatar || !file.type.includes('image')) {
    return false
  }
  return true
}

//! HANDLE FILES

export default function MultipleFilesInput({ buttonStyle, setFiles }: Props) {
  //! HANDLE UPLOAD FILES
  // const fileInputRef = useRef<HTMLInputElement>(null)

  // const handleUploadFiles = () => {
  //   fileInputRef.current?.click()
  // }

  //! HANDLE CHANGE FILES
  // const onFileChange = (event: React.ChangeEvent<HTMLInputElement>) => {
  //   const fileList = event.target.files
  //   let newFiles: File[] = []
  //   if (fileList) {
  //     for (let i = 0; i < fileList?.length; i++) {
  //       if (isImageFile(fileList[i])) {
  //         newFiles = [...files, fileList[i]]
  //         setFiles(newFiles)
  //       }
  //     }
  //   }
  //   handleChangeFiles && handleChangeFiles(newFiles)
  // }

  const onDrop = useCallback(
    (fileList: File[]) => {
      // Do something with the files
      if (fileList) {
        for (let i = 0; i < fileList?.length; i++) {
          if (isImageFile(fileList[i])) {
            setFiles((prev) => [...prev, fileList[i]])
          }
        }
      }
    },
    [setFiles]
  )
  const { getRootProps, getInputProps, isDragActive } = useDropzone({ onDrop })

  return (
    <Fragment>
      {/* <input
        type='file'
        accept='.jpg,.jpeg,.png'
        className='hidden'
        ref={fileInputRef}
        onChange={onFileChange}
        onClick={(event) => ((event.target as HTMLInputElement).value = '')}
      /> */}
      <div {...getRootProps()} className={buttonStyle}>
        <input {...getInputProps()} />
        {isDragActive ? <p>Thả ảnh ở đây ...</p> : <p>Kéo / thả ảnh vào đây, hoặc bấm để chọn ảnh</p>}
      </div>
    </Fragment>
  )
}
