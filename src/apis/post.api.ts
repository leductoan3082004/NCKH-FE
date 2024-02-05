import { PostList, PostListConfig } from 'src/types/post.type'
import http from 'src/utils/http'

const URL = '/v1/post'

const postApi = {
  getPostList(params: PostListConfig) {
    return http.get<PostList>(`${URL}`, { params })
  }
}

export default postApi
