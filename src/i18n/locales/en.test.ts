import { describe, it, expect } from 'vitest'

import { en } from './en'

describe('en locale', () => {
  it('should have correct locale code', () => {
    expect(en.code).toBe('en')
  })

  it('should have correct locale name', () => {
    expect(en.name).toBe('English')
  })

  it('should have correct direction', () => {
    expect(en.direction).toBe('ltr')
  })

  it('should have 7 short week days', () => {
    expect(en.shortWeekDays).toHaveLength(7)
  })

  it('should have all short week days with key and name', () => {
    en.shortWeekDays.forEach((day) => {
      expect(day).toHaveProperty('key')
      expect(day).toHaveProperty('name')
      expect(typeof day.key).toBe('number')
      expect(typeof day.name).toBe('string')
    })
  })

  it('should have short week days from 0 to 6', () => {
    const keys = en.shortWeekDays.map((day) => day.key)

    expect(keys).toEqual([0, 1, 2, 3, 4, 5, 6])
  })

  it('should have 7 long week days', () => {
    expect(en.longWeekDays).toHaveLength(7)
  })

  it('should have all long week days with key and name', () => {
    en.longWeekDays.forEach((day) => {
      expect(day).toHaveProperty('key')
      expect(day).toHaveProperty('name')
      expect(typeof day.key).toBe('number')
      expect(typeof day.name).toBe('string')
      expect(day.name.length).toBeGreaterThan(1)
    })
  })

  it('should have 12 months', () => {
    expect(en.months).toHaveLength(12)
  })

  it('should have all months with key and name', () => {
    en.months.forEach((month) => {
      expect(month).toHaveProperty('key')
      expect(month).toHaveProperty('name')
      expect(typeof month.key).toBe('number')
      expect(typeof month.name).toBe('string')
    })
  })

  it('should have months from 1 to 12', () => {
    const keys = en.months.map((month) => month.key)

    expect(keys).toEqual([1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12])
  })

  it('should have 12 short months', () => {
    expect(en.shortMonths).toHaveLength(12)
  })

  it('should have all short months abbreviated', () => {
    en.shortMonths.forEach((month) => {
      expect(month.name.length).toBeLessThanOrEqual(4)
    })
  })

  it('should have format strings', () => {
    expect(en.format).toBeDefined()
    expect(en.dateFormat).toBeDefined()
    expect(en.timeFormat).toBeDefined()
    expect(en.dateTimeFormat).toBeDefined()
  })

  it('should have all required labels', () => {
    const requiredLabels = [
      'today',
      'yesterday',
      'tomorrow',
      'selectDate',
      'selectTime',
      'selectRange',
      'from',
      'to',
      'am',
      'pm',
      'hour',
      'minute',
      'second',
      'year',
      'month',
      'day',
      'week',
      'close',
      'clear',
      'ok',
      'cancel',
      'nextMonth',
      'previousMonth',
      'nextYear',
      'previousYear'
    ]

    requiredLabels.forEach((label) => {
      expect(en.labels).toHaveProperty(label)
      expect(typeof en.labels[label as keyof typeof en.labels]).toBe('string')
    })
  })

  it('should have weekStartsOn defined', () => {
    expect(en.weekStartsOn).toBeDefined()
    expect(typeof en.weekStartsOn).toBe('number')
    expect(en.weekStartsOn).toBeGreaterThanOrEqual(0)
    expect(en.weekStartsOn).toBeLessThanOrEqual(6)
  })

  it('should start week on Sunday (0)', () => {
    expect(en.weekStartsOn).toBe(0)
  })

  it('should have English month names', () => {
    const expectedMonths = [
      'January',
      'February',
      'March',
      'April',
      'May',
      'June',
      'July',
      'August',
      'September',
      'October',
      'November',
      'December'
    ]

    en.months.forEach((month, index) => {
      expect(month.name).toBe(expectedMonths[index])
    })
  })

  it('should have English day names', () => {
    const expectedDays = [
      'Sunday',
      'Monday',
      'Tuesday',
      'Wednesday',
      'Thursday',
      'Friday',
      'Saturday'
    ]

    en.longWeekDays.forEach((day, index) => {
      expect(day.name).toBe(expectedDays[index])
    })
  })
})
