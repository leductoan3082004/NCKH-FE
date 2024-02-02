import { SuccessRespone } from './utils.type'

export type AuthRespone = SuccessRespone<{
  access_token: string
  expires: string
}>
