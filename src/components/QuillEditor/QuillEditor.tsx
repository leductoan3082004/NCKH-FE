import { useMutation } from '@tanstack/react-query'
import { useCallback, useRef } from 'react'
import ReactQuill from 'react-quill'
import 'react-quill/dist/quill.snow.css'
import { imageApi } from 'src/apis/image.api'

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

  return (
    <ReactQuill
      theme='snow'
      ref={reactQuillRef}
      modules={{
        toolbar: {
          container: [
            ['bold', 'italic', 'underline', 'strike'], // toggled buttons
            ['blockquote', 'code-block'],

            [{ header: 1 }, { header: 2 }], // custom button values
            [{ list: 'ordered' }, { list: 'bullet' }],
            [{ script: 'sub' }, { script: 'super' }], // superscript/subscript
            [{ indent: '-1' }, { indent: '+1' }], // outdent/indent
            [{ direction: 'rtl' }], // text direction

            [{ size: ['small', false, 'large', 'huge'] }], // custom dropdown
            [{ header: [1, 2, 3, 4, 5, 6, false] }],
            ['link', 'image', 'video'],

            [{ color: [] }, { background: [] }], // dropdown with defaults from theme
            [{ font: [] }],
            [{ align: [] }],

            ['clean'] // remove formatting button
          ],
          handlers: {
            image: imageHandler // <-
          }
        },
        clipboard: {
          matchVisual: false
        }
      }}
      formats={[
        'header',
        'font',
        'size',
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
        'video',
        'code-block'
      ]}
      value={value}
      onChange={onChange}
      className='bg-white text-darkText'
    />
  )
}
