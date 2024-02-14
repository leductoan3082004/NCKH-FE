import http from 'src/utils/http'
import { Feedback, FeedbackList, FeedbackListConfig } from 'src/types/feedback.type'
import { SuccessRespone } from 'src/types/utils.type'

const URL = '/feedback/'

interface FeedbackForm {
  topic: string
  content: string
  email: string
  name: string
  phone?: string
}

export const feedbackApi = {
  getFeedbackList(params: FeedbackListConfig) {
    return http.get<FeedbackList>(`${URL}`, { params })
  },
  getFeedbackDetail(id: string) {
    return http.get<SuccessRespone<Feedback>>(`${URL}${id}`)
  },
  sendFeedback(body: FeedbackForm) {
    return http.post<SuccessRespone<string>>(`${URL}`, body)
  },
  deleteFeedbacks(body: { feedback_ids: string[] }) {
    return http.delete(URL, { data: body })
  }
}
