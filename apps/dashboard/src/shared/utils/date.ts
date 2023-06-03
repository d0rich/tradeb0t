import { getTwoDigitString } from './number'

export function getTimeString(date: Date) {
  return `${getTwoDigitString(date.getHours())}:${getTwoDigitString(date.getMinutes())}:${getTwoDigitString(
    date.getSeconds()
  )}`
}
