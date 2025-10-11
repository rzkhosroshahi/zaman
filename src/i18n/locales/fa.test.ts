import { describe, it, expect } from 'vitest'

import { fa } from './fa'

describe('fa locale', () => {
  it('should have correct locale code', () => {
    expect(fa.code).toBe('fa')
  })

  it('should have correct locale name', () => {
    expect(fa.name).toBe('فارسی')
  })

  it('should have correct direction (rtl)', () => {
    expect(fa.direction).toBe('rtl')
  })

  it('should have 7 short week days', () => {
    expect(fa.shortWeekDays).toHaveLength(7)
  })

  it('should have all short week days with key and name', () => {
    fa.shortWeekDays.forEach((day) => {
      expect(day).toHaveProperty('key')
      expect(day).toHaveProperty('name')
      expect(typeof day.key).toBe('number')
      expect(typeof day.name).toBe('string')
    })
  })

  it('should have short week days from 0 to 6', () => {
    const keys = fa.shortWeekDays.map((day) => day.key)

    expect(keys).toEqual([0, 1, 2, 3, 4, 5, 6])
  })

  it('should have 7 long week days', () => {
    expect(fa.longWeekDays).toHaveLength(7)
  })

  it('should have all long week days with key and name', () => {
    fa.longWeekDays.forEach((day) => {
      expect(day).toHaveProperty('key')
      expect(day).toHaveProperty('name')
      expect(typeof day.key).toBe('number')
      expect(typeof day.name).toBe('string')
      expect(day.name.length).toBeGreaterThan(1)
    })
  })

  it('should have 12 months', () => {
    expect(fa.months).toHaveLength(12)
  })

  it('should have all months with key and name', () => {
    fa.months.forEach((month) => {
      expect(month).toHaveProperty('key')
      expect(month).toHaveProperty('name')
      expect(typeof month.key).toBe('number')
      expect(typeof month.name).toBe('string')
    })
  })

  it('should have months from 1 to 12', () => {
    const keys = fa.months.map((month) => month.key)

    expect(keys).toEqual([1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12])
  })

  it('should have format strings', () => {
    expect(fa.format).toBeDefined()
    expect(fa.dateFormat).toBeDefined()
    expect(fa.timeFormat).toBeDefined()
    expect(fa.dateTimeFormat).toBeDefined()
  })

  it('should use slash separator in date format', () => {
    expect(fa.format).toContain('/')
    expect(fa.dateFormat).toContain('/')
  })

  it('should have all required labels in Persian', () => {
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
      expect(fa.labels).toHaveProperty(label)
      expect(typeof fa.labels[label as keyof typeof fa.labels]).toBe('string')
    })
  })

  it('should have weekStartsOn defined', () => {
    expect(fa.weekStartsOn).toBeDefined()
    expect(typeof fa.weekStartsOn).toBe('number')
    expect(fa.weekStartsOn).toBeGreaterThanOrEqual(0)
    expect(fa.weekStartsOn).toBeLessThanOrEqual(6)
  })

  it('should start week on Saturday (6)', () => {
    expect(fa.weekStartsOn).toBe(6)
  })

  it('should have Persian month names', () => {
    const expectedMonths = [
      'فروردین',
      'اردیبهشت',
      'خرداد',
      'تیر',
      'مرداد',
      'شهریور',
      'مهر',
      'آبان',
      'آذر',
      'دی',
      'بهمن',
      'اسفند'
    ]

    fa.months.forEach((month, index) => {
      expect(month.name).toBe(expectedMonths[index])
    })
  })

  it('should have Persian day names', () => {
    const expectedDays = [
      'شنبه',
      'یکشنبه',
      'دوشنبه',
      'سه‌شنبه',
      'چهارشنبه',
      'پنجشنبه',
      'جمعه'
    ]

    fa.longWeekDays.forEach((day, index) => {
      expect(day.name).toBe(expectedDays[index])
    })
  })

  it('should have Persian short day names', () => {
    const expectedShortDays = ['ش', 'ی', 'د', 'س', 'چ', 'پ', 'ج']

    fa.shortWeekDays.forEach((day, index) => {
      expect(day.name).toBe(expectedShortDays[index])
    })
  })

  it('should have Persian labels', () => {
    expect(fa.labels.today).toBe('امروز')
    expect(fa.labels.yesterday).toBe('دیروز')
    expect(fa.labels.tomorrow).toBe('فردا')
    expect(fa.labels.ok).toBe('تایید')
    expect(fa.labels.cancel).toBe('لغو')
  })

  it('should have shortMonths if defined', () => {
    // Persian calendar typically doesn't use abbreviated month names
    // Check if it exists, it should have 12 items
    if (fa.shortMonths !== undefined) {
      expect(fa.shortMonths).toHaveLength(12)
    } else {
      // If shortMonths is not defined, that's also valid
      expect(fa.shortMonths).toBeUndefined()
    }
  })
})
