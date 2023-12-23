import {
  getDayString,
  getMonth,
  getMonthName,
  getYear,
  getYear2Digit
} from '../dateTimeFormat/dateTimeFormat'
import { type formatFunctions, type Formats } from './format.types'

export const formats: Record<Formats, formatFunctions> = {
  MMMM: getMonthName,
  MM: getMonth,
  M: getMonth,
  YYYY: getYear,
  YY: getYear2Digit,
  DD: getDayString,
  D: getDayString
}

const regex = /\/|\s|-/

const validateFormat = (format: string) => {
  const splitFormat = format.trimStart().trimEnd().split(regex) as Formats[]
  if (format === '' || format.trim() === '') {
    throw new Error('format is empty')
  }
  splitFormat.forEach((format) => {
    if (!(format in formats)) {
      throw new Error(`format is not valid, format passed is: ${format}`)
    }
  })
}
export const formatDate = (
  date: Date,
  format: string,
  numberingSystem?: string
): string => {
  try {
    validateFormat(format)
    const splitFormat = format.trimStart().trimEnd().split(regex) as Formats[]
    const splitCharacterSearch = format.match(regex)
    const splitCharacter =
      splitCharacterSearch !== null ? splitCharacterSearch[0] : ''

    return splitFormat
      .map((format) => {
        return formats[format](date, numberingSystem)
      })
      .join(splitCharacter)
  } catch (ex) {
    console.error(ex)
  }
  return ''
}

export default formatDate
