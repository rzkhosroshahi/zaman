import '@emotion/react'
import type { Radius } from './style/radius'

export type DatePickerValue = number | Date | string

export type Locales = 'fa' | 'en'

export type Directions = 'rtl' | 'ltr'

export type DaysRange = 0 | 1 | 2 | 3 | 4 | 5 | 6

export type Pickers = 'days' | 'year' | 'month'

export type Positions = 'right' | 'left' | 'center'

export interface BaseProps {
  round?: Radius
  accentColor?: string
  locale?: Locales
  direction?: Directions
}

export interface onDatePickerChangePayload {
  value: Date
}

export interface onRangeDatePickerChangePayload {
  from: Date
  to: Date
}

// export type RangeProp = boolean | undefined

// export type onChangeTypeBasedOnRange<Range extends RangeProp> =
//   Range extends false | undefined
//     ? onDatePickerChangePayload
//     : onRangeDatePickerChangePayload

interface MyProps1 {
  range: true
  myMethod: (arg: onRangeDatePickerChangePayload) => void
}

interface MyProps2 {
  range: false
  myMethod: (arg: onDatePickerChangePayload) => void
}

export type CalendarTypeProps = MyProps1 | MyProps2
const obj1: CalendarTypeProps = {
  range: true,
  myMethod: ({ from, to }) => {
    console.log(from, to)
  }
}

const obj2: CalendarTypeProps = {
  range: false,
  myMethod: ({ value }) => {
    console.log(value)
  }
}

console.log(obj1, obj2)

declare module '@emotion/react' {
  export interface Theme {
    colors: {
      gray: Record<number, string>
      primary: Record<number, string>
    }
    round: Radius
    direction: Directions
  }
}
