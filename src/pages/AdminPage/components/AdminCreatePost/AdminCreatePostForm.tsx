import classNames from 'classnames'
import { Fragment } from 'react'
import { useFormContext } from 'react-hook-form'
import Input from 'src/components/Input'
import { CreatePostSchema } from 'src/utils/admin.rules'
import AdminCategories from '../AdminCategories'
import AdminTags from '../AdminTags'
import CustomJoditEditor from 'src/components/CustomJoditEditor'

type FormData = CreatePostSchema

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
  const wrapperStyle = 'grid grid-cols-4 items-center gap-2 border border-black/20 py-1 px-2 rounded-md'
  const inputStyle =
    'text-darkText bg-white py-1 px-2 text-base lg:text-lg rounded-lg outline-none focus:outline-primaryBlue'
  const titleStyle = 'text-xs tablet:text-sm font-semibold uppercase text-primaryBlue lg:text-base'

  return (
    <Fragment>
      <div className={wrapperStyle}>
        <div className='col-span-1'>
          <p className={titleStyle}>Tác giả</p>
        </div>
        <div className='col-span-3 items-center'>
          <Input
            inputClassName={classNames(inputStyle, {
              'outline-red-600': Boolean(errors.author)
            })}
            register={register}
            name='author'
            errorMessage={errors?.author?.message}
            autoComplete='false'
          />
        </div>
      </div>

      <div className={wrapperStyle}>
        <div className='col-span-1'>
          <p className={titleStyle}>Tiêu đề</p>
        </div>
        <div className='col-span-3'>
          <Input
            inputClassName={classNames(inputStyle, {
              'outline-red-600': Boolean(errors.title)
            })}
            register={register}
            name='title'
            errorMessage={errors?.title?.message}
            autoComplete='false'
          />
        </div>
      </div>

      <div className={wrapperStyle}>
        <div className='col-span-1'>
          <p className={titleStyle}>Nhãn</p>
        </div>
        <div className='col-span-3'>
          <AdminTags />
        </div>
      </div>

      <div className={wrapperStyle}>
        <div className='col-span-1'>
          <p className={titleStyle}>Danh mục</p>
        </div>
        <div className='col-span-3'>
          <AdminCategories />
        </div>
      </div>

      <div className='space-y-4'>
        <p className={titleStyle}>nội dung</p>
        {/* <QuillEditor value={editorContent} setValue={onEditorStateChange} /> */}
        <CustomJoditEditor content={editorContent} setContent={onEditorStateChange} />
      </div>
    </Fragment>
  )
}
