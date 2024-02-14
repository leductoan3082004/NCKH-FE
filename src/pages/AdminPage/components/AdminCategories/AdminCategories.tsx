import { useContext, useState } from 'react'
import { AdminContext } from 'src/contexts/admin.context'
import classNames from 'classnames'
import { useLocation } from 'react-router-dom'
import { adminPath } from 'src/constants/path'

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
  'Quy trình thiết kế công cụ đánh giá',
  'Giới thiệu trang web'
]

export default function AdminCategories() {
  const { categories, setCategories, updateCategories, setUpdateCategories } = useContext(AdminContext)
  const [render, setRender] = useState<boolean>(false)
  const reRender = () => {
    setRender(!render)
  }

  //? Check if is CREATING or UPDATING
  const pathName = useLocation().pathname
  const isCreating = pathName == adminPath.createPost

  //? HANDLE CHOOSE CATEGORY
  const handleChooseCategory = (category: string) => {
    const index = categories.indexOf(category)
    if (index > -1) {
      categories.splice(index, 1)
      setCategories(categories)
    } else {
      categories.push(category)
      setCategories(categories)
    }
    reRender()
  }

  const handleChooseUpdateCategory = (category: string) => {
    const index = updateCategories.indexOf(category)
    if (index > -1) {
      updateCategories.splice(index, 1)
      setUpdateCategories(updateCategories)
    } else {
      updateCategories.push(category)
      setUpdateCategories(updateCategories)
    }
    reRender()
  }

  const handleCategory = (category: string) => () => {
    if (isCreating) handleChooseCategory(category)
    else handleChooseUpdateCategory(category)
  }

  const activeCategories = isCreating ? categories : updateCategories

  return (
    <div>
      <div className='grid border border-black/40 p-1 rounded-md gap-1 grid-cols-2 tablet:grid-cols-3 desktop:grid-cols-4'>
        {activeCategories.map((cate, index) => (
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
          const isSelected = isCreating ? categories.includes(category) : updateCategories.includes(category)
          if (category == 'Tất cả') return
          return (
            <div className='col-span-1' key={index}>
              <button
                type='button'
                onClick={handleCategory(category)}
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
