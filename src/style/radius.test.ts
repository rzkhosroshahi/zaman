import { describe, it, expect } from 'vitest'

import { radius } from './radius'

describe('radius', () => {
  it('should export radius object', () => {
    expect(radius).toBeDefined()
    expect(typeof radius).toBe('object')
  })

  it('should have all radius variants', () => {
    expect(radius.thin).toBeDefined()
    expect(radius.x1).toBeDefined()
    expect(radius.x2).toBeDefined()
    expect(radius.x3).toBeDefined()
    expect(radius.x4).toBeDefined()
  })

  describe('thin variant', () => {
    it('should have zero radius', () => {
      expect(radius.thin.wrapper).toBe(0)
      expect(radius.thin.calendarItem).toBe(0)
    })
  })

  describe('x1 variant', () => {
    it('should have correct radius values', () => {
      expect(radius.x1.wrapper).toBe(8)
      expect(radius.x1.calendarItem).toBe(4)
    })
  })

  describe('x2 variant', () => {
    it('should have correct radius values', () => {
      expect(radius.x2.wrapper).toBe(16)
      expect(radius.x2.calendarItem).toBe(8)
    })
  })

  describe('x3 variant', () => {
    it('should have correct radius values', () => {
      expect(radius.x3.wrapper).toBe(24)
      expect(radius.x3.calendarItem).toBe(16)
    })
  })

  describe('x4 variant', () => {
    it('should have correct radius values', () => {
      expect(radius.x4.wrapper).toBe(24)
      expect(radius.x4.calendarItem).toBe(20)
    })
  })

  it('should have wrapper and calendarItem properties for all variants', () => {
    Object.values(radius).forEach((variant) => {
      expect(variant).toHaveProperty('wrapper')
      expect(variant).toHaveProperty('calendarItem')
      expect(typeof variant.wrapper).toBe('number')
      expect(typeof variant.calendarItem).toBe('number')
    })
  })

  it('should have increasing wrapper radius values', () => {
    expect(radius.thin.wrapper).toBeLessThan(radius.x1.wrapper)
    expect(radius.x1.wrapper).toBeLessThan(radius.x2.wrapper)
    expect(radius.x2.wrapper).toBeLessThanOrEqual(radius.x3.wrapper)
    expect(radius.x3.wrapper).toBeLessThanOrEqual(radius.x4.wrapper)
  })

  it('should have increasing calendarItem radius values', () => {
    expect(radius.thin.calendarItem).toBeLessThan(radius.x1.calendarItem)
    expect(radius.x1.calendarItem).toBeLessThan(radius.x2.calendarItem)
    expect(radius.x2.calendarItem).toBeLessThan(radius.x3.calendarItem)
    expect(radius.x3.calendarItem).toBeLessThan(radius.x4.calendarItem)
  })

  it('should have non-negative radius values', () => {
    Object.values(radius).forEach((variant) => {
      expect(variant.wrapper).toBeGreaterThanOrEqual(0)
      expect(variant.calendarItem).toBeGreaterThanOrEqual(0)
    })
  })

  it('should have calendarItem radius smaller than wrapper radius', () => {
    expect(radius.x1.calendarItem).toBeLessThan(radius.x1.wrapper)
    expect(radius.x2.calendarItem).toBeLessThan(radius.x2.wrapper)
    expect(radius.x3.calendarItem).toBeLessThan(radius.x3.wrapper)
    expect(radius.x4.calendarItem).toBeLessThan(radius.x4.wrapper)
  })
})
