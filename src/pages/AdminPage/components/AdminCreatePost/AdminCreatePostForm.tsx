import classNames from 'classnames'
import { Fragment } from 'react'
import { useFormContext } from 'react-hook-form'
import Input from 'src/components/Input'
import { CreatePostSchema } from 'src/utils/admin.rules'
import AdminCategories from '../AdminCategories'
import AdminTags from '../AdminTags'
import CustomJoditEditor from 'src/components/CustomJoditEditor'

type FormData = CreatePostSchema

function ErrorSection({ errorMessage }: { errorMessage?: string }) {
  return (
    <div className='grid grid-cols-4 gap-1 col-span-4'>
      <div className='col-start-2 col-end-5 mt-0.5 min-h-[1.25rem] text-sm text-alertRed'>{errorMessage}</div>
    </div>
  )
}

export default function AdminCreatePostForm() {
  const {
    register,
    setValue,
    watch,
    formState: { errors }
  } = useFormContext<FormData>()

  //? EDIT DESCRIPTION
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  const onEditorStateChange = (editorState: any) => {
    setValue('content', editorState)
  }
  const editorContent = watch('content')

  //? Styles
  const inputFieldStyle = 'grid grid-cols-4 items-center gap-2 py-1 px-2'
  const titleStyle = 'text-xs col-span-1 tablet:text-sm font-bold space-x-0.5 uppercase lg:text-base '
  const inputStyle =
    'text-darkText bg-white py-1 px-2 col-span-3 text-base lg:text-lg rounded-lg outline-none focus:outline-primaryBlue'

  return (
    <Fragment>
      <Input
        className={inputFieldStyle}
        inputClassName={classNames(inputStyle, {
          'outline-red-600': Boolean(errors.author)
        })}
        errorClassName='hidden'
        register={register}
        name='author'
        errorMessage={errors?.author?.message}
        autoComplete='false'
        errorSection={<ErrorSection errorMessage={errors.author?.message} />}
      >
        <div className={titleStyle}>
          <span className=''>Tác giả</span>
          <span className='text-alertRed'>*</span>
        </div>
      </Input>

      <Input
        className={inputFieldStyle}
        inputClassName={classNames(inputStyle, {
          'outline-red-600': Boolean(errors.title)
        })}
        errorClassName='hidden'
        register={register}
        name='title'
        errorMessage={errors?.title?.message}
        autoComplete='false'
        errorSection={<ErrorSection errorMessage={errors.title?.message} />}
      >
        <div className={titleStyle}>
          <span className=''>Tiêu đề</span>
          <span className='text-alertRed'>*</span>
        </div>
      </Input>

      <div className={inputFieldStyle}>
        <div className='col-span-1'>
          <div className={titleStyle}>
            <span className=''>Tag</span>
            <span className='text-alertRed'>*</span>
          </div>
        </div>
        <div className='col-span-3'>
          <AdminTags errorMessage={errors.tag?.message} />
        </div>
      </div>

      <div className={inputFieldStyle}>
        <div className='col-span-1'>
          <div className={titleStyle}>
            <span className=''>Category</span>
            <span className='text-alertRed'>*</span>
          </div>
        </div>
        <div className='col-span-3'>
          <AdminCategories errorMessage={errors.category?.message} />
        </div>
      </div>

      <div className='space-y-4 px-2'>
        <div className='flex space-x-2'>
          <div className={titleStyle}>
            <span className=''>Nội dung</span>
            <span className='text-alertRed'>*</span>
          </div>
          <span className='text-sm text-alertRed'>{errors.content?.message}</span>
        </div>
        {/* <QuillEditor value={editorContent} setValue={onEditorStateChange} /> */}
        <CustomJoditEditor content={editorContent} setContent={onEditorStateChange} />
      </div>
    </Fragment>
  )
}
