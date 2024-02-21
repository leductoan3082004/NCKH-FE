import { useContext } from 'react'
import { AdminContext } from 'src/contexts/admin.context'
import classNames from 'classnames'
import { useLocation } from 'react-router-dom'
import { adminPath } from 'src/constants/path'
import {
  DocumentCategories,
  DocumentSystemCategories,
  DocumentUsageCategories,
  MainCategories
} from 'src/constants/categories'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faXmark } from '@fortawesome/free-solid-svg-icons'

interface Props {
  errorMessage?: string
}

export default function AdminCategories({ errorMessage }: Props) {
  const { categories, setCategories, updateCategories, setUpdateCategories } = useContext(AdminContext)

  //? Check if is CREATING or UPDATING
  const pathName = useLocation().pathname
  const isCreating = pathName == adminPath.createPost

  //? HANDLE CHOOSE CATEGORY
  const handleChooseCategory = (category: string) => {
    const categoryIndex = categories.indexOf(category)
    if (categoryIndex > -1) {
      setCategories((prev) => prev.filter((_, index) => index != categoryIndex))
    } else {
      setCategories((prev) => [category, ...prev])
    }
  }

  const handleChooseUpdateCategory = (category: string) => {
    const categoryIndex = updateCategories.indexOf(category)
    if (categoryIndex > -1) {
      setUpdateCategories((prev) => prev.filter((_, index) => index != categoryIndex))
    } else {
      setUpdateCategories((prev) => [category, ...prev])
    }
  }

  const handleCategory = (category: string) => () => {
    if (isCreating) handleChooseCategory(category)
    else handleChooseUpdateCategory(category)
  }

  const removeCategory = (categoryIndex: number) => () => {
    isCreating
      ? setCategories((prev) => prev.filter((_, index) => index != categoryIndex))
      : setUpdateCategories((prev) => prev.filter((_, index) => index != categoryIndex))
  }

  const activeCategories = isCreating ? categories : updateCategories

  //? Check if category is selected
  const isSelected = (category: string) => {
    return isCreating ? categories.includes(category) : updateCategories.includes(category)
  }

  //? STYLES
  const containerStyle = 'w-full grid grid-cols-2 tablet:grid-cols-3 desktop:grid-cols-4 gap-1'
  const titleStyle = 'font-medium text-base desktop:text-lg'

  return (
    <div>
      <div
        className={classNames(
          'grid border min-h-10 border-black/40 p-1 rounded-md gap-1 grid-cols-2 tablet:grid-cols-3 desktop:grid-cols-4 items-center',
          { 'border-alertRed border-2': errorMessage }
        )}
      >
        {errorMessage && <div className='text-sm text-alertRed'>{errorMessage}</div>}
        {activeCategories.map((cate, index) => (
          <div
            className='h-10 px-1 relative bg-primaryBackground flex items-center justify-center p-0.5 text-xs rounded-md'
            key={index}
          >
            <p className=''>{cate}</p>

            <button
              type='button'
              onClick={removeCategory(index)}
              className='absolute top-1 right-1 p-0.5 hover:text-alertRed border border-black/20 rounded-md'
            >
              <FontAwesomeIcon icon={faXmark} />
            </button>
          </div>
        ))}
      </div>
      <div className='mt-2 border border-black/40 rounded-md p-2 text-sm h-auto overflow-auto space-y-4'>
        <div className='space-y-1'>
          <p className={titleStyle}>
            Danh mục <span className='uppercase italic text-primaryBlue'>chính</span>
          </p>
          <div className={containerStyle}>
            {MainCategories.map((category, index) => {
              const categoryIsSlected = isSelected(category)
              return (
                <div className='col-span-1' key={index}>
                  <button
                    type='button'
                    onClick={handleCategory(category)}
                    className={classNames('border-2 w-full min-h-12 rounded-md px-0.5', {
                      'border-primaryBlue ': categoryIsSlected,
                      ' border-black/20': !categoryIsSlected
                    })}
                  >
                    {category}
                  </button>
                </div>
              )
            })}
          </div>
        </div>

        {isSelected('Văn bản') && (
          <div className='space-y-1'>
            <p className={titleStyle}>
              Các danh mục trong <span className='uppercase italic text-primaryBlue'>Văn bản</span>
            </p>
            <div className={containerStyle}>
              {DocumentCategories.map((category, index) => {
                const categoryIsSlected = isSelected(category)
                return (
                  <div className='col-span-1' key={index}>
                    <button
                      type='button'
                      onClick={handleCategory(category)}
                      className={classNames('border-2 w-full min-h-12 rounded-md px-0.5', {
                        'border-primaryBlue ': categoryIsSlected,
                        ' border-black/20': !categoryIsSlected
                      })}
                    >
                      {category}
                    </button>
                  </div>
                )
              })}
            </div>
          </div>
        )}

        {isSelected('Hệ thống văn bản') && (
          <div className='space-y-1'>
            <p className={titleStyle}>
              Các danh mục trong <span className='uppercase italic text-primaryBlue'>Hệ thống văn bản</span>
            </p>
            <div className={containerStyle}>
              {DocumentSystemCategories.map((category, index) => {
                const categoryIsSlected = isSelected(category)
                return (
                  <div className='col-span-1' key={index}>
                    <button
                      type='button'
                      onClick={handleCategory(category)}
                      className={classNames('border-2 w-full min-h-12 rounded-md px-0.5', {
                        'border-primaryBlue ': categoryIsSlected,
                        ' border-black/20': !categoryIsSlected
                      })}
                    >
                      {category}
                    </button>
                  </div>
                )
              })}
            </div>
          </div>
        )}

        {isSelected('Định hướng sử dụng văn bản') && (
          <div className='space-y-1'>
            <p className={titleStyle}>
              Các danh mục trong <span className='uppercase italic text-primaryBlue'>Định hướng sử dụng văn bản</span>
            </p>
            <div className={containerStyle}>
              {DocumentUsageCategories.map((category, index) => {
                const categoryIsSlected = isSelected(category)
                return (
                  <div className='col-span-1' key={index}>
                    <button
                      type='button'
                      onClick={handleCategory(category)}
                      className={classNames('border-2 w-full min-h-12 rounded-md px-0.5', {
                        'border-primaryBlue ': categoryIsSlected,
                        ' border-black/20': !categoryIsSlected
                      })}
                    >
                      {category}
                    </button>
                  </div>
                )
              })}
            </div>
          </div>
        )}
      </div>
    </div>
  )
}
