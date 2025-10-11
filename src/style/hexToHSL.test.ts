import { describe, it, expect } from 'vitest'

import { hexToHSL } from './hexToHSL'

describe('hexToHSL', () => {
  it('should convert white (#FFFFFF) correctly', () => {
    const result = hexToHSL('#FFFFFF')

    expect(result.h).toBe(0)
    expect(result.s).toBe(0)
    // For achromatic colors, lightness is returned as decimal (0-1), not percentage
    expect(result.l).toBeGreaterThanOrEqual(0.9)
    expect(result.l).toBeLessThanOrEqual(1)
  })

  it('should convert black (#000000) correctly', () => {
    const result = hexToHSL('#000000')

    expect(result.h).toBe(0)
    expect(result.s).toBe(0)
    expect(result.l).toBe(0)
  })

  it('should convert red (#FF0000) correctly', () => {
    const result = hexToHSL('#FF0000')

    expect(result.h).toBe(0)
    expect(result.s).toBe(100)
    expect(result.l).toBe(50)
  })

  it('should convert green (#00FF00) correctly', () => {
    const result = hexToHSL('#00FF00')

    expect(result.h).toBe(120)
    expect(result.s).toBe(100)
    expect(result.l).toBe(50)
  })

  it('should convert blue (#0000FF) correctly', () => {
    const result = hexToHSL('#0000FF')

    expect(result.h).toBe(240)
    expect(result.s).toBe(100)
    expect(result.l).toBe(50)
  })

  it('should work without # prefix', () => {
    const result = hexToHSL('FF0000')

    expect(result.h).toBe(0)
    expect(result.s).toBe(100)
    expect(result.l).toBe(50)
  })

  it('should handle lowercase hex values', () => {
    const result = hexToHSL('#ff0000')

    expect(result.h).toBe(0)
    expect(result.s).toBe(100)
    expect(result.l).toBe(50)
  })

  it('should handle mixed case hex values', () => {
    const result = hexToHSL('#Ff0000')

    expect(result.h).toBe(0)
    expect(result.s).toBe(100)
    expect(result.l).toBe(50)
  })

  it('should convert cyan (#00FFFF) correctly', () => {
    const result = hexToHSL('#00FFFF')

    expect(result.h).toBe(180)
    expect(result.s).toBe(100)
    expect(result.l).toBe(50)
  })

  it('should convert magenta (#FF00FF) correctly', () => {
    const result = hexToHSL('#FF00FF')

    expect(result.h).toBe(300)
    expect(result.s).toBe(100)
    expect(result.l).toBe(50)
  })

  it('should convert yellow (#FFFF00) correctly', () => {
    const result = hexToHSL('#FFFF00')

    expect(result.h).toBe(60)
    expect(result.s).toBe(100)
    expect(result.l).toBe(50)
  })

  it('should convert gray (#808080) correctly', () => {
    const result = hexToHSL('#808080')

    expect(result.h).toBe(0)
    expect(result.s).toBe(0)
    // For achromatic colors, lightness is returned as decimal (0-1), not percentage
    expect(result.l).toBeGreaterThanOrEqual(0.49)
    expect(result.l).toBeLessThanOrEqual(0.52)
  })

  it('should throw error for invalid hex color', () => {
    expect(() => hexToHSL('invalid')).toThrow('Could not parse Hex Color')
  })

  it('should throw error for short hex color', () => {
    expect(() => hexToHSL('#FFF')).toThrow('Could not parse Hex Color')
  })

  it('should throw error for empty string', () => {
    expect(() => hexToHSL('')).toThrow('Could not parse Hex Color')
  })

  it('should return rounded values', () => {
    const result = hexToHSL('#3498db')

    expect(Number.isInteger(result.h)).toBe(true)
    expect(Number.isInteger(result.s)).toBe(true)
    expect(Number.isInteger(result.l)).toBe(true)
  })
})
