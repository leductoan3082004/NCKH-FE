import { useQuery } from '@tanstack/react-query'
import React from 'react'
import { imageApi } from 'src/apis/image.api'

export default function AdminImageList() {
  //? GET IMAGE LIST
  const { data: imagesData, isFetching } = useQuery({
    queryKey: ['adminImageList'],
    queryFn: () => {
      return imageApi.getImageList()
    },
    staleTime: 3 * 60 * 1000
  })
  return <div>AdminImageList</div>
}
