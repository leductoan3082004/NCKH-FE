import { AuthRespone } from 'src/types/auth.type'
import { clearLS } from 'src/utils/auth'
import http from 'src/utils/http'

const url = ''

const adminApi = {
  adminLogin(body: { username: string; password: string }) {
    return http.post<AuthRespone>(`${url}/login`, body)
  },
  adminLogout() {
    clearLS()
  }
}

export default adminApi
