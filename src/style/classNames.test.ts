import { describe, it, expect } from 'vitest'

import {
  MonthYearButton,
  IconNextButton,
  IconPrevButton,
  HeaderClass,
  DaysButton,
  MonthPickerButton,
  YearPickerButton
} from './classNames'

describe('classNames', () => {
  it('should export MonthYearButton class name', () => {
    expect(MonthYearButton).toBe('zm-MonthYearButton')
  })

  it('should export IconNextButton class name', () => {
    expect(IconNextButton).toBe('zm-IconNextButton')
  })

  it('should export IconPrevButton class name', () => {
    expect(IconPrevButton).toBe('zm-IconPrevButton')
  })

  it('should export HeaderClass class name', () => {
    expect(HeaderClass).toBe('zm-Header')
  })

  it('should export DaysButton class name', () => {
    expect(DaysButton).toBe('zm-DaysButton')
  })

  it('should export MonthPickerButton class name', () => {
    expect(MonthPickerButton).toBe('zm-MonthPickerButton')
  })

  it('should export YearPickerButton class name', () => {
    expect(YearPickerButton).toBe('zm-YearPickerButton')
  })

  it('should have zm- prefix for all class names', () => {
    const classNames = [
      MonthYearButton,
      IconNextButton,
      IconPrevButton,
      HeaderClass,
      DaysButton,
      MonthPickerButton,
      YearPickerButton
    ]

    classNames.forEach((className) => {
      expect(className.startsWith('zm-')).toBe(true)
    })
  })

  it('should have unique class names', () => {
    const classNames = [
      MonthYearButton,
      IconNextButton,
      IconPrevButton,
      HeaderClass,
      DaysButton,
      MonthPickerButton,
      YearPickerButton
    ]

    const uniqueClassNames = new Set(classNames)

    expect(uniqueClassNames.size).toBe(classNames.length)
  })
})
