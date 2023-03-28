export type formatFunctions = (date: Date, numberingSystem?: string) => string

export enum Formats {
  M = 'M',
  MM = 'MM',
  MMMM = 'MMMM',
  YY = 'YY',
  YYYY = 'YYYY',
  DD = 'DD',
  D = 'D',
}
