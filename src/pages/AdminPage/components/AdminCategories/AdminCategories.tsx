import { useContext, useState } from 'react'
import { AdminContext } from 'src/contexts/admin.context'
import classNames from 'classnames'

export const Categories = [
  'Tất cả',
  'Văn bản',
  'Tiêu chí lựa chọn văn bản',
  'Hệ thống văn bản',
  'Truyện thơ',
  'Thơ',
  'Truyện ngắn hiện đại',
  'Bi kịch',
  'Tùy bút, tản văn',
  'Đề minh họa',
  'Định hướng sử dụng văn bản',
  'Quy trình thiết kế công cụ đánh giá'
]

export default function AdminCategories() {
  const { categories, setCategories } = useContext(AdminContext)
  const [render, reRender] = useState<boolean>(false)

  const handleAddCategory = (category: string) => () => {
    const index = categories.indexOf(category)
    if (index > -1) {
      setCategories(categories.splice(index, 1))
    } else {
      categories.push(category)
      setCategories(categories)
    }
    reRender(!render)
  }

  return (
    <div>
      <div className='grid border border-black/40 p-1 rounded-md gap-1 grid-cols-2 tablet:grid-cols-3 desktop:grid-cols-4'>
        {categories.map((cate, index) => (
          <span
            className=' h-10 px-1 bg-primaryBackground flex items-center justify-center p-0.5 text-xs rounded-md'
            key={index}
          >
            {cate}
          </span>
        ))}
      </div>
      <div className='mt-2 border border-black/40 p-2 grid grid-cols-2 tablet:grid-cols-3 text-sm desktop:grid-cols-4 gap-1 h-40 overflow-auto'>
        {Categories.map((category, index) => {
          const isSelected = categories.includes(category)
          return (
            <div className='col-span-1' key={index}>
              <button
                type='button'
                onClick={handleAddCategory(category)}
                className={classNames('border-2 w-full min-h-12 rounded-md px-0.5', {
                  'border-primaryBlue ': isSelected,
                  ' border-black/20': !isSelected
                })}
              >
                {category}
              </button>
            </div>
          )
        })}
      </div>
    </div>
  )
}
