export interface Post {
  _id: string
  status: number
  created_at: string
  updated_at: string
  title: string
  image_url: string
  tag: string[]
  category: string[]
}

export interface PostList {
  data: Post[]
  paging: {
    page: number
    limit: number
    total: number
    cursor: string
    next_cursor: string
  }
}

export interface PostListConfig {
  tag?: string
  category?: string
  content?: string
  page?: number | string
  limit?: number | string
}
