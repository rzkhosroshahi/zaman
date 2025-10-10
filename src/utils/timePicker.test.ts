import { describe, it, expect } from 'vitest'

import {
  numberPositionX,
  numberPositionY,
  center,
  radianToDeg,
  getValue,
  hours,
  hours24,
  minutes
} from './timePicker'

describe('timePicker utilities', () => {
  describe('numberPositionX', () => {
    it('should calculate X position for index 0', () => {
      const result = numberPositionX(0)

      expect(result).toBe(0)
    })

    it('should calculate X position for index 3 (90 degrees)', () => {
      const result = numberPositionX(3)

      expect(result).toBeGreaterThan(0)
    })

    it('should calculate X position with custom width', () => {
      const result = numberPositionX(3, 200)

      expect(typeof result).toBe('number')
    })

    it('should calculate X position with custom padding', () => {
      const result = numberPositionX(3, 130, 30)

      expect(typeof result).toBe('number')
    })

    it('should return an integer', () => {
      const result = numberPositionX(6)

      expect(Number.isInteger(result)).toBe(true)
    })
  })

  describe('numberPositionY', () => {
    it('should calculate Y position for index 0', () => {
      const result = numberPositionY(0)

      expect(typeof result).toBe('number')
    })

    it('should calculate Y position for index 6 (180 degrees)', () => {
      const result = numberPositionY(6)

      expect(typeof result).toBe('number')
    })

    it('should calculate Y position with custom width', () => {
      const result = numberPositionY(3, 200)

      expect(typeof result).toBe('number')
    })

    it('should calculate Y position with custom padding', () => {
      const result = numberPositionY(3, 130, 30)

      expect(typeof result).toBe('number')
    })

    it('should return an integer', () => {
      const result = numberPositionY(6)

      expect(Number.isInteger(result)).toBe(true)
    })
  })

  describe('center', () => {
    it('should have correct center coordinates', () => {
      expect(center.x).toBe(130)
      expect(center.y).toBe(130)
    })
  })

  describe('radianToDeg', () => {
    it('should convert 0 radians to 0 degrees', () => {
      const result = radianToDeg(0)

      expect(result).toBe(0)
    })

    it('should convert PI radians to ~180 degrees', () => {
      const result = radianToDeg(Math.PI)

      expect(result).toBeCloseTo(180, 0)
    })

    it('should convert 2*PI radians to ~360 degrees', () => {
      const result = radianToDeg(2 * Math.PI)

      expect(result).toBeCloseTo(360, 0)
    })

    it('should convert PI/2 radians to ~90 degrees', () => {
      const result = radianToDeg(Math.PI / 2)

      expect(result).toBeCloseTo(90, 0)
    })
  })

  describe('getValue', () => {
    it('should calculate value for minutes (step 6)', () => {
      const result = getValue(60, 100, 6)

      expect(result).toBe(10)
    })

    it('should calculate value for minutes at 0 degrees', () => {
      const result = getValue(0, 100, 6)

      expect(result).toBe(0)
    })

    it('should calculate value for hour outside (delta > 85)', () => {
      const result = getValue(60, 100, 30)

      expect(result).toBe(2)
    })

    it('should handle hour value at 0 degrees outside (delta > 85)', () => {
      const result = getValue(0, 100, 30)

      expect(result).toBe(-12)
    })

    it('should calculate value for hour inside (delta <= 85)', () => {
      const result = getValue(60, 50, 30)

      expect(result).toBe(2)
    })

    it('should handle hour value at 0 degrees inside (delta <= 85)', () => {
      const result = getValue(0, 50, 30)

      expect(result).toBe(12)
    })

    it('should handle 360 degrees for minutes', () => {
      const result = getValue(360, 100, 6)

      expect(result).toBe(60)
    })
  })

  describe('hours array', () => {
    it('should have 12 hours', () => {
      expect(hours).toHaveLength(12)
    })

    it('should start with 12', () => {
      expect(hours[0]).toBe(12)
    })

    it('should end with 11', () => {
      expect(hours[11]).toBe(11)
    })

    it('should contain all hours from 1 to 12', () => {
      for (let i = 1; i <= 12; i++) {
        expect(hours).toContain(i)
      }
    })
  })

  describe('hours24 array', () => {
    it('should have 12 hours', () => {
      expect(hours24).toHaveLength(12)
    })

    it('should start with 0', () => {
      expect(hours24[0]).toBe(0)
    })

    it('should end with 23', () => {
      expect(hours24[11]).toBe(23)
    })

    it('should contain hours from 13 to 23', () => {
      for (let i = 13; i <= 23; i++) {
        expect(hours24).toContain(i)
      }
    })
  })

  describe('minutes array', () => {
    it('should have 12 values', () => {
      expect(minutes).toHaveLength(12)
    })

    it('should start with 0', () => {
      expect(minutes[0]).toBe(0)
    })

    it('should end with 55', () => {
      expect(minutes[11]).toBe(55)
    })

    it('should increment by 5', () => {
      for (let i = 0; i < minutes.length - 1; i++) {
        expect(minutes[i + 1] - minutes[i]).toBe(5)
      }
    })
  })
})
