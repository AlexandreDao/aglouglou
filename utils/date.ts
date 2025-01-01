import { DateFormat } from '@/constants/dateFormat'
import { parse } from 'date-fns'

export const parseDate = (date: string, format = DateFormat.DATE_TIME): Date => {
  return parse(date, format, new Date())
}