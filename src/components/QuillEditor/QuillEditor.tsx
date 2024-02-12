import { useMutation } from '@tanstack/react-query'
import { useCallback, useRef } from 'react'
import * as ReactQuill from 'react-quill'
import { Quill } from 'react-quill'
import 'react-quill/dist/quill.snow.css'
import { imageApi } from 'src/apis/image.api'
import ImageResize from 'quill-image-resize-module-react'

Quill.register('modules/imageResize', ImageResize)
interface Props {
  value: string
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  setValue: (editorState: any) => void
}

export default function QuillEditor({ value, setValue }: Props) {
  const reactQuillRef = useRef<ReactQuill>(null)

  //? Handle image
  const uploadImageMutation = useMutation({
    mutationFn: imageApi.uploadImage
  })

  const uploadImage = async (file: File) => {
    const uploadImageBody = {
      file: file
    }
    const res = await uploadImageMutation.mutateAsync(uploadImageBody)
    return res.data.data.url
  }

  const onChange = (content: string) => {
    setValue(content)
  }

  const imageHandler = useCallback(() => {
    const input = document.createElement('input')
    input.setAttribute('type', 'file')
    input.setAttribute('accept', 'image/*')
    input.click()
    input.onchange = async () => {
      if (input !== null && input.files !== null) {
        const file = input.files[0]
        const url = await uploadImage(file)
        const quill = reactQuillRef.current
        if (quill) {
          const range = quill.getEditorSelection()
          range && quill.getEditor().insertEmbed(range.index, 'image', url)
        }
      }
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [])

  //? Hanlde image on drop/paste
  // function dropPasteHandler(imageData: ImageData) {
  //   const file = imageData.toFile()

  //   if (file) {
  //     const url = uploadImage(file)
  //     let index = (quill.getSelection() || {}).index
  //     if (index === undefined || index < 0) index = quill.getLength()
  //     quill.insertEmbed(index, 'image', url, 'user')
  //   }
  // }

  return (
    <ReactQuill
      theme='snow'
      ref={reactQuillRef}
      modules={{
        toolbar: {
          container: [
            ['bold', 'italic', 'underline', 'strike'], // toggled buttons

            [{ header: 1 }, { header: 2 }], // custom button values
            [{ list: 'ordered' }, { list: 'bullet' }],
            [{ indent: '-1' }, { indent: '+1' }], // outdent/indent
            [{ direction: 'rtl' }], // text direction

            [{ header: [1, 2, 3, 4, 5, 6, false] }],
            ['link', 'image', 'video'],

            [{ align: [] }],

            ['clean'] // remove formatting button
          ],
          handlers: {
            image: imageHandler // <-
          }
        },
        clipboard: {
          matchVisual: false
        },
        imageResize: {
          parchment: Quill.import('parchment'),
          modules: ['Resize', 'DisplaySize']
        }
      }}
      formats={[
        'header',
        'bold',
        'italic',
        'underline',
        'strike',
        'blockquote',
        'list',
        'bullet',
        'indent',
        'link',
        'image',
        'align'
      ]}
      value={value}
      onChange={onChange}
      className='bg-white text-darkText'
    />
  )
}
