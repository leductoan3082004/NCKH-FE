export interface Feedback {
  _id: string
  status: number
  created_at: string
  updated_at: string
  topic: string
  content: string
  name: string
  email: string
  phone: string
}

export interface FeedbackList {
  data: Feedback[]
  paging: {
    page: number
    limit: number
    total: number
    cursor: string
    next_cursor: string
  }
}

export interface FeedbackListConfig {
  page?: number | string
  limit?: number | string
  cursor?: string
}
