import DOMPurify from 'dompurify'
import { PostDetail } from 'src/types/post.type'
import { formatDate } from 'src/utils/utils'

interface Props {
  postDetail: PostDetail
}

export default function AdminPostInfor({ postDetail }: Props) {
  //? Styles
  const wrapperStyle = 'grid grid-cols-4 items-center gap-2 border border-black/20 py-1 px-2 rounded-md'
  const inforStyle = 'text-darkText py-1 px-2 text-sm tablet:text-base desktop:text-lg'
  const titleStyle = 'text-xs tablet:text-sm font-semibold uppercase text-primaryBlue lg:text-base'

  return (
    <div className='flex flex-col space-y-2'>
      <div className={wrapperStyle}>
        <div className='col-span-1'>
          <p className={titleStyle}>Ảnh</p>
        </div>
        <div className='col-span-3'>
          <div className='w-full tabletSmall:w-8/12 tablet:w-6/12 desktop:w-4/12 flex flex-col space-y-4 items-center py-4'>
            <div className='relative pt-[100%] w-full overflow-hidden rounded-md border-2 border-white'>
              <img
                src={postDetail.image_url}
                alt={postDetail.title}
                className='absolute left-0 top-0 h-full w-full object-cover '
              />
            </div>
          </div>
        </div>
      </div>

      <div className={wrapperStyle}>
        <div className='col-span-1'>
          <p className={titleStyle}>Tiêu đề</p>
        </div>
        <div className='col-span-3'>
          <p className={inforStyle}>{postDetail.title}</p>
        </div>
      </div>

      <div className={wrapperStyle}>
        <div className='col-span-1'>
          <p className={titleStyle}>Ngày tạo</p>
        </div>
        <div className='col-span-3'>
          <p className={inforStyle}>{formatDate(postDetail.created_at)}</p>
        </div>
      </div>

      <div className={wrapperStyle}>
        <div className='col-span-1'>
          <p className={titleStyle}>Ngày chỉnh sửa</p>
        </div>
        <div className='col-span-3'>
          <p className={inforStyle}>{formatDate(postDetail.updated_at)}</p>
        </div>
      </div>

      <div className={wrapperStyle}>
        <div className='col-span-1'>
          <p className={titleStyle}>Tag</p>
        </div>
        <div className='col-span-3'>
          <div className={inforStyle}>
            {postDetail.tag.map((tag, index) => (
              <span key={index} className='pr-1'>
                {tag},
              </span>
            ))}
          </div>
        </div>
      </div>

      <div className={wrapperStyle}>
        <div className='col-span-1'>
          <p className={titleStyle}>Category</p>
        </div>
        <div className='col-span-3'>
          <div className={inforStyle}>
            {postDetail.category.map((category, index) => (
              <span key={index} className='pr-1'>
                {category},
              </span>
            ))}
          </div>
        </div>
      </div>

      <div className={wrapperStyle}>
        <div className='col-span-1'>
          <p className={titleStyle}>Tác giả</p>
        </div>
        <div className='col-span-3'>
          <p className={inforStyle}>{postDetail?.author}</p>
        </div>
      </div>

      <div className=''>
        <p className='uppercase w-full text-center text-primaryBlue font-semibold text-base tablet:text-lg desktop:text-xl'>
          Nội dung
        </p>
        <div className={inforStyle}>
          <div
            dangerouslySetInnerHTML={{
              __html: DOMPurify.sanitize(postDetail.content)
            }}
            className='overflow-visible'
          />
        </div>
      </div>
    </div>
  )
}
