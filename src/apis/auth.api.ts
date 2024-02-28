import { AuthRespone } from 'src/types/auth.type'
import { clearLS } from 'src/utils/auth'
import http from 'src/utils/http'

export const authUrl = {
  base: 'user',
  login: 'user/login'
}

const adminApi = {
  adminLogin(body: { username: string; password: string }) {
    return http.post<AuthRespone>(authUrl.login, body)
  },
  adminLogout() {
    clearLS()
  }
}

export default adminApi
