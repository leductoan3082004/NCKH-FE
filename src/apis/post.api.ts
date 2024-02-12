import { Post, PostDetail, PostList, PostListConfig } from 'src/types/post.type'
import { SuccessRespone } from 'src/types/utils.type'
import http from 'src/utils/http'

const URL = '/post'

interface CreatePostForm {
  author: string
  title: string
  content: string
  tag: string[]
  category: string[]
  image_url?: string
}

interface UpdatePostForm {
  post_id: string
  author?: string
  title?: string
  content?: string
  tag?: string[]
  category?: string[]
  image_url?: string
}

const postApi = {
  getPostList(params: PostListConfig) {
    return http.get<PostList>(`${URL}`, { params })
  },
  getPostDetail(postId: string) {
    return http.get<SuccessRespone<PostDetail>>(`${URL}/${postId}`)
  },
  createPost(body: CreatePostForm) {
    return http.post<SuccessRespone<Post>>(`${URL}/`, body)
  },
  updatePost(body: UpdatePostForm) {
    return http.put<SuccessRespone<string>>(`${URL}/`, body)
  },
  deletePost(body: { post_id: string }) {
    return http.delete<SuccessRespone<string>>(`${URL}/`, { data: body })
  }
}

export default postApi
