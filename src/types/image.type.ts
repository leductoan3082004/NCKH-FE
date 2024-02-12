export interface Image {
  _id: string
  status: number
  created_at: string
  updated_at: string
  url: string
}

export interface ImageList {
  data: Image[]
  paging: {
    page: number
    limit: number
    total: number
    cursor: string
    next_cursor: string
  }
}

export interface ImageListConfig {
  time_from?: number | string
  time_to?: number | string
  page?: number | string
  limit?: number | string
}
