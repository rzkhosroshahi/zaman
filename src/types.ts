import '@emotion/react'
import type { Radius } from './style/radius'
export type DatePickerValue = number | Date | string

export interface IDays {
  day: string
  utc: string
  faDate: string
  disable: boolean
}

export enum Locales {
  fa,
  en,
}

declare module '@emotion/react' {
  export interface Theme {
    colors: Record<number, string>
    round: keyof typeof Radius
  }
}
