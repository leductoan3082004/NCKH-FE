export default function MainFooter() {
  return (
    <div className='py-8 bg-sectionGreen'>
      <div className='container'>
        <div className='lg:grid lg:grid-cols-3 lg:gap-4 space-y-8'>
          <div className=''>
            <p className='font-bold uppercase tracking-wide'>Tham khảo</p>
            <div className='my-3 max-w-8 h-0.5 bg-black/10 rounded-sm'></div>
          </div>

          <div className=''>
            <p className='font-bold uppercase tracking-wide'>Chuyên mục</p>
            <div className='my-3 max-w-8 h-0.5 bg-black/10 rounded-sm'></div>
          </div>

          <div className=''>
            <p className='font-bold uppercase tracking-wide'>Thông tin</p>
            <div className='my-3 max-w-8 h-0.5 bg-black/10 rounded-sm'></div>
          </div>
        </div>
      </div>
    </div>
  )
}
