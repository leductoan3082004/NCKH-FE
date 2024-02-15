import { AxiosError, isAxiosError as checkAxiosError, HttpStatusCode } from 'axios'
import { floor } from 'lodash'
import moment from 'moment'

export function isAxiosError<T>(error: unknown): error is AxiosError<T> {
  return checkAxiosError(error)
}

export function isAxiosBadRequestError<FormError>(error: unknown): error is AxiosError<FormError> {
  return isAxiosError(error) && error.response?.status === HttpStatusCode.BadRequest
}

export function isAxiosUnprocessableEntityError<FormError>(error: unknown): error is AxiosError<FormError> {
  return isAxiosError(error) && error.response?.status === HttpStatusCode.UnprocessableEntity
}

export const removeSpecialCharacter = (str: string) =>
  // eslint-disable-next-line no-useless-escape
  str.replace(/!|@|%|\^|\*|\(|\)|\+|\=|\<|\>|\?|\/|,|\.|\:|\;|\'|\"|\&|\#|\[|\]|~|\$|_|`|-|{|}|\||\\/g, '')

export const generatePostId = ({ title, id }: { title: string; id: string }) => {
  return removeSpecialCharacter(title).replace(/\s/g, '-') + `-id:${id}`
}

export const generateFeedbackId = ({ topic, id }: { topic: string; id: string }) => {
  return removeSpecialCharacter(topic).replace(/\s/g, '-') + `-id:${id}`
}

export const getIdFromUrl = (idString: string) => {
  const arr = idString.split('-id:')
  return arr[arr.length - 1]
}

export const formatDate = (timeStamp: string) => {
  return moment(timeStamp).utc().format('DD-MM-YYYY')
}

export const formatTimeToSeconds = (time: number) => {
  return floor(time / 1000)
}

export const showSuccessDialog = (setIsOpen: React.Dispatch<React.SetStateAction<boolean>>, time?: number) => {
  setIsOpen(true)
  setTimeout(() => {
    setIsOpen(false)
  }, time || 1500)
}
