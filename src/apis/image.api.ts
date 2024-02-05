import { Image, ImageList } from 'src/types/image.type'
import { SuccessRespone } from 'src/types/utils.type'
import http from 'src/utils/http'

const URL = '/image/'
const LIMIT = 12

export const imageApi = {
  getImageList() {
    return http.get<ImageList>(`${URL}?page=1&limit=${LIMIT}`)
  },
  uploadImage(body: { file: File }) {
    return http.post<SuccessRespone<Image>>(URL, body, {
      headers: {
        'Content-Type': 'multipart/form-data'
      }
    })
  },
  deleteImage(body: { image_id: string }) {
    return http.delete(URL, { data: body })
  }
}
