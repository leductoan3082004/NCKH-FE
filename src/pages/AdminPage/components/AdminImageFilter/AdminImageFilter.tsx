import { yupResolver } from '@hookform/resolvers/yup'
import { omit } from 'lodash'
import { Controller, useForm } from 'react-hook-form'
import { createSearchParams, useLocation, useNavigate } from 'react-router-dom'
import DateSelect from 'src/components/DateSelect'
import useQueryConfigForImages from 'src/hooks/useQueryConfigForImages'
import { ImageSchema, imageSchema } from 'src/utils/admin.rules'
import { formatTimeToSeconds } from 'src/utils/utils'

type FormData = ImageSchema

const currentDate = new Date()
const defaultFormData = {
  time_from: new Date(2023, 0, 1),
  time_to: new Date(currentDate.getFullYear(), currentDate.getMonth(), currentDate.getDate())
}

export default function AdminImageFilter() {
  //! FETCH IMAGES BY DATE
  const imagesConfig = useQueryConfigForImages()

  const {
    control,
    formState: { errors },
    handleSubmit
  } = useForm<FormData>({
    defaultValues: defaultFormData,
    resolver: yupResolver(imageSchema)
  })

  //? Hanlde navigate
  const navigate = useNavigate()
  const pathName = useLocation().pathname
  const onSubmit = handleSubmit(async (data) => {
    if (!data.time_from && !data.time_to) return

    const timeFrom = formatTimeToSeconds(data.time_from?.getTime() as number)
    const timeTo = formatTimeToSeconds(data.time_to?.getTime() as number)
    const defaultTimeFrom = formatTimeToSeconds(defaultFormData.time_from.getTime())
    const defaultTimeTo = formatTimeToSeconds(defaultFormData.time_to.getTime())

    if (timeFrom != defaultTimeFrom) {
      //:: Fetch with time from and time to
      if (timeTo != defaultTimeTo) {
        navigate({
          pathname: pathName,
          search: createSearchParams(
            omit(
              {
                ...imagesConfig,
                time_from: String(timeFrom),
                time_to: String(timeTo)
              },
              ['page', 'limit']
            )
          ).toString()
        })
      } //:: Fetch with only time from
      else {
        navigate({
          pathname: pathName,
          search: createSearchParams(
            omit(
              {
                ...imagesConfig,
                time_from: String(timeFrom)
              },
              ['page', 'limit', 'time_to']
            )
          ).toString()
        })
      }
    }
    //:: Fetch with only time to
    else if (timeTo != defaultTimeTo) {
      navigate({
        pathname: pathName,
        search: createSearchParams(
          omit(
            {
              ...imagesConfig,
              time_to: String(timeTo)
            },
            ['page', 'limit', 'time_from']
          )
        ).toString()
      })
    }
    //:: Reset form
    else {
      navigate({
        pathname: pathName,
        search: createSearchParams(
          omit(
            {
              ...imagesConfig
            },
            ['page', 'limit', 'time_from', 'time_to']
          )
        ).toString()
      })
    }
  })
  return (
    <form
      onSubmit={onSubmit}
      className='flex w-full items-center justify-center space-x-4 bg-white py-2 px-2 desktop:px-4 rounded-md'
    >
      <div className='w-full mobileLarge:w-8/12 tablet:w-6/12 desktop:w-4/12 flex flex-col space-y-2'>
        <div className='grid grid-cols-12 gap-1 w-full'>
          <div className='col-span-2 flex items-center'>Từ</div>
          <div className='col-span-10 w-full'>
            <Controller
              control={control}
              name='time_from'
              render={({ field }) => (
                <DateSelect errorMessage={errors.time_from?.message} value={field.value} onChange={field.onChange} />
              )}
            />
          </div>
        </div>
        <div className='grid grid-cols-12 gap-1 w-full'>
          <div className='col-span-2 flex items-center'>Đến</div>
          <div className='col-span-10 w-full'>
            <Controller
              control={control}
              name='time_to'
              render={({ field }) => (
                <DateSelect errorMessage={errors.time_to?.message} value={field.value} onChange={field.onChange} />
              )}
            />
          </div>
        </div>
        <button type='submit' className='rounded-lg p-1 bg-primaryBackground/80 hover:bg-primaryBackground'>
          Lọc
        </button>
      </div>
    </form>
  )
}
