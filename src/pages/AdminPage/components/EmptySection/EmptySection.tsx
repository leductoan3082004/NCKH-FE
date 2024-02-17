export default function EmptySection() {
  return (
    <div className='min-h-96 w-full'>
      <div className='py-10 uppercase text-alertRed tablet:py-12 text-center w-full desktop:py-20 font-bold text-xl tablet:text-2xl desktop:text-3xl'>
        Không thể tìm thấy bài viết bạn đang cần
      </div>
      <div className='py-10 uppercase tablet:py-12 text-center w-full desktop:py-20 font-bold text-lg tablet:text-xl desktop:text-2xl'>
        Bạn có thể tham khảo các bài viết dưới đây:
      </div>
    </div>
  )
}
