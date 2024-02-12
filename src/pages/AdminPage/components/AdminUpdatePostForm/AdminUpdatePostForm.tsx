import classNames from 'classnames'
import { Fragment, useContext, useEffect, useMemo } from 'react'
import { useFormContext } from 'react-hook-form'
import Input from 'src/components/Input'
import { UpdatePostSchema } from 'src/utils/admin.rules'
import AdminCategories from '../AdminCategories'
import AdminTags from '../AdminTags'
import { PostDetail } from 'src/types/post.type'
import { NoUndefinedField } from 'src/types/utils.type'
import { AdminContext } from 'src/contexts/admin.context'
import { formatDate } from 'src/utils/utils'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faRightLong } from '@fortawesome/free-solid-svg-icons'
import InputFile from 'src/components/InputFile'
import CustomJoditEditor from 'src/components/CustomJoditEditor'

type FormData = NoUndefinedField<UpdatePostSchema>

interface Props {
  postDetail: PostDetail
  imageFile: File | undefined
  setImageFile: React.Dispatch<React.SetStateAction<File | undefined>>
}

export default function AdminUpdatePostForm({ postDetail, imageFile, setImageFile }: Props) {
  const { setUpdateTags, setUpdateCategories } = useContext(AdminContext)

  const {
    register,
    setValue,
    watch,
    formState: { errors }
  } = useFormContext<FormData>()

  //? Set initial value
  useEffect(() => {
    if (postDetail) {
      setValue('post_id', postDetail._id)
      setValue('title', postDetail.title)
      setValue('author', postDetail.author)
      setValue('image_url', postDetail.image_url)
      setValue('category', postDetail.category)
      setValue('tag', postDetail.tag)
      setValue('content', postDetail.content)

      setUpdateCategories(postDetail.category)
      setUpdateTags(postDetail.tag)
    }
  }, [postDetail, setUpdateCategories, setUpdateTags, setValue])

  //? Handle avatar
  const previewImage = useMemo(() => {
    return imageFile ? URL.createObjectURL(imageFile) : ''
  }, [imageFile])
  const handleChangeFile = (file?: File) => {
    setImageFile(file)
  }

  //? EDIT DESCRIPTION
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  const onEditorStateChange = (editorState: any) => {
    setValue('content', editorState)
  }
  const editorContent = watch('content')

  //? Styles
  const wrapperStyle = 'grid grid-cols-4 items-center gap-2 border border-black/20 py-1 px-2 rounded-md'
  const noSelectedInputStyle = 'text-darkText py-1 px-2 text-base lg:text-lg'
  const inputStyle =
    'text-darkText bg-white py-1 px-2 text-base lg:text-lg rounded-lg outline-none focus:outline-primaryBlue'
  const titleStyle = 'text-xs tablet:text-sm font-semibold uppercase text-primaryBlue lg:text-base'
  const buttonStyle =
    'flex py-1 px-2 tablet:px-4 desktop:px-6 hover:bg-primaryBackground cursor-pointer items-center justify-center rounded-md text-xs font-semibold tablet:text-sm desktop:text-base bg-black/60 text-white hover:text-darkText'

  return (
    <Fragment>
      <div className={wrapperStyle}>
        <div className='col-span-1'>
          <p className={titleStyle}>Ảnh</p>
        </div>
        <div className='col-span-3 grid grid-cols-9 gap-2'>
          <div className='col-span-4 flex justify-center items-center'>
            <div className='w-full tablet:w-10/12 desktop:w-8/12 space-y-4 py-4'>
              <div className='relative pt-[100%] w-full overflow-hidden rounded-md border-2 border-white'>
                <img
                  src={postDetail.image_url}
                  alt={postDetail.title}
                  className='absolute left-0 top-0 h-full w-full object-cover '
                />
              </div>
            </div>
          </div>
          <div className='col-span-1 flex items-center justify-center'>
            <FontAwesomeIcon icon={faRightLong} className='tablet:h-6 desktop:h-8' />
          </div>
          <div className='col-span-4 flex justify-center items-center'>
            <div className='w-full tablet:w-10/12 desktop:w-8/12 space-y-4 py-4'>
              <div className='relative pt-[100%] w-full overflow-hidden rounded-md border-2 border-white'>
                {previewImage && (
                  <img src={previewImage} alt='ảnh' className='absolute left-0 top-0 h-full w-full object-cover ' />
                )}
                {!previewImage && <div className='absolute left-0 top-0 h-full w-full bg-white'></div>}
                <div className='flex w-full justify-center absolute bottom-1 left-1/2 -translate-x-1/2'>
                  <InputFile onChangeImageFile={handleChangeFile} buttonStyle={buttonStyle} />
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>

      <div className={wrapperStyle}>
        <div className='col-span-1'>
          <p className={titleStyle}>Tiêu đề</p>
        </div>
        <div className='col-span-3'>
          <Input
            classNameInput={classNames(inputStyle, {
              'outline-red-600': Boolean(errors.title)
            })}
            classNameError='hidden'
            register={register}
            name='title'
            errorMessage={errors?.title?.message}
            autoComplete='false'
          />
        </div>
      </div>

      <div className={wrapperStyle}>
        <div className='col-span-1'>
          <p className={titleStyle}>Ngày tạo</p>
        </div>
        <div className='col-span-3'>
          <p className={noSelectedInputStyle}>{formatDate(postDetail.created_at)}</p>
        </div>
      </div>

      <div className={wrapperStyle}>
        <div className='col-span-1'>
          <p className={titleStyle}>Ngày chỉnh sửa</p>
        </div>
        <div className='col-span-3'>
          <p className={noSelectedInputStyle}>{formatDate(postDetail.updated_at)}</p>
        </div>
      </div>

      <div className={wrapperStyle}>
        <div className='col-span-1'>
          <p className={titleStyle}>Tác giả</p>
        </div>
        <div className='col-span-3'>
          <Input
            classNameInput={classNames(inputStyle, {
              'outline-red-600': Boolean(errors.author)
            })}
            classNameError='hidden'
            register={register}
            name='author'
            errorMessage={errors?.author?.message}
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
        <CustomJoditEditor content={editorContent} setContent={onEditorStateChange} />
      </div>
    </Fragment>
  )
}
