import '@emotion/react'
import type { Radius } from './style/radius'
export type DatePickerValue = number | Date | string

export enum Locales {
  fa,
  en,
}

declare module '@emotion/react' {
  export interface Theme {
    colors: {
      gray: Record<number, string>
      primary: Record<number, string>
    }
    round: keyof typeof Radius
  }
}
