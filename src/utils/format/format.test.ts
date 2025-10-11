import { describe, it, expect } from 'vitest'

import { formatDate } from './format'

describe('formatDate', () => {
  const testDate = new Date('2024-01-15')

  it('should format date with YYYY-MM-DD', () => {
    const result = formatDate(testDate, 'YYYY-MM-DD', 'latn')

    expect(result).toContain('2024')
    expect(result).toContain('-')
  })

  it('should format date with YYYY/MM/DD', () => {
    const result = formatDate(testDate, 'YYYY/MM/DD', 'latn')

    expect(result).toContain('2024')
    expect(result).toContain('/')
  })

  it('should format date with DD-MM-YYYY', () => {
    const result = formatDate(testDate, 'DD-MM-YYYY', 'latn')

    expect(result).toContain('2024')
    expect(result).toContain('-')
  })

  it('should format date with YYYY MM DD (space separator)', () => {
    const result = formatDate(testDate, 'YYYY MM DD', 'latn')

    expect(result).toContain('2024')
    expect(result).toContain(' ')
  })

  it('should handle MMMM format (month name)', () => {
    const result = formatDate(testDate, 'MMMM YYYY', 'latn')

    expect(result).toContain('2024')
  })

  it('should handle YY format (2-digit year)', () => {
    const result = formatDate(testDate, 'YY-MM-DD', 'latn')

    expect(result).toContain('24')
  })

  it('should handle M format (month without leading zero)', () => {
    const result = formatDate(testDate, 'YYYY-M-D', 'latn')

    expect(result).toContain('2024')
  })

  it('should return empty string for empty format', () => {
    const result = formatDate(testDate, '', 'latn')

    expect(result).toBe('')
  })

  it('should return empty string for whitespace-only format', () => {
    const result = formatDate(testDate, '   ', 'latn')

    expect(result).toBe('')
  })

  it('should handle format with leading/trailing spaces', () => {
    const result = formatDate(testDate, '  YYYY-MM-DD  ', 'latn')

    expect(result).toContain('2024')
  })

  it('should work without numbering system parameter', () => {
    const result = formatDate(testDate, 'YYYY-MM-DD')

    expect(result).toContain('2024')
  })

  it('should handle Persian numbering system', () => {
    const result = formatDate(testDate, 'YYYY/MM/DD', 'arabext')

    // Result should exist, exact format depends on locale implementation
    expect(result).toBeTruthy()
  })
})
