import { AuthRespone } from 'src/types/auth.type'
import { clearLS } from 'src/utils/auth'
import http from 'src/utils/http'

const adminApi = {
  adminLogin(body: { account: string; password: string }) {
    return http.post<AuthRespone>('/login', body)
  },
  adminLogout() {
    clearLS()
  }
}

export default adminApi
