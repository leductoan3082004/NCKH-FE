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
