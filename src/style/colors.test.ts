import { describe, it, expect } from 'vitest'

import { gray } from './colors'

describe('colors', () => {
  describe('gray color palette', () => {
    it('should export gray object', () => {
      expect(gray).toBeDefined()
      expect(typeof gray).toBe('object')
    })

    it('should have white at level 0', () => {
      expect(gray[0]).toBe('#FFFFFF')
    })

    it('should have all defined gray levels', () => {
      expect(gray[0]).toBeDefined()
      expect(gray[20]).toBeDefined()
      expect(gray[30]).toBeDefined()
      expect(gray[40]).toBeDefined()
      expect(gray[50]).toBeDefined()
      expect(gray[60]).toBeDefined()
      expect(gray[70]).toBeDefined()
      expect(gray[80]).toBeDefined()
      expect(gray[600]).toBeDefined()
    })

    it('should have valid hex color values', () => {
      const hexColorRegex = /^#[0-9A-F]{6}$/i

      Object.values(gray).forEach((color) => {
        expect(color).toMatch(hexColorRegex)
      })
    })

    it('should have lighter grays at lower levels', () => {
      expect(gray[0]).toBe('#FFFFFF')
      expect(gray[20]).toBe('#F5F5F5')
      expect(gray[30]).toBe('#EBEBEB')
    })

    it('should have darker grays at higher levels', () => {
      expect(gray[600]).toBe('#2E2E2E')
    })

    it('should have specific color values', () => {
      expect(gray[0]).toBe('#FFFFFF')
      expect(gray[20]).toBe('#F5F5F5')
      expect(gray[30]).toBe('#EBEBEB')
      expect(gray[40]).toBe('#DEDEDE')
      expect(gray[50]).toBe('#BFBFBF')
      expect(gray[60]).toBe('#B0B0B0')
      expect(gray[70]).toBe('#575757')
      expect(gray[80]).toBe('#666666')
      expect(gray[600]).toBe('#2E2E2E')
    })
  })
})
