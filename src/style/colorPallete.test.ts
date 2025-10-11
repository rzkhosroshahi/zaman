import { describe, it, expect } from 'vitest'

import { makeColorPallet } from './colorPallete'

describe('colorPallete', () => {
  describe('makeColorPallet', () => {
    it('should generate color palette from hex color', () => {
      const palette = makeColorPallet('#3b82f6')

      expect(palette).toBeDefined()
      expect(typeof palette).toBe('object')
    })

    it('should generate all required color levels', () => {
      const palette = makeColorPallet('#3b82f6')

      expect(palette[40]).toBeDefined()
      expect(palette[50]).toBeDefined()
      expect(palette[85]).toBeDefined()
      expect(palette[90]).toBeDefined()
      expect(palette[95]).toBeDefined()
    })

    it('should generate HSL color values', () => {
      const palette = makeColorPallet('#3b82f6')

      Object.values(palette).forEach((color) => {
        expect(color).toMatch(/^hsl\(\d+deg \d+% \d+%\)$/)
      })
    })

    it('should have lighter colors at higher levels', () => {
      const palette = makeColorPallet('#3b82f6')

      // Extract lightness values
      const extractLightness = (hsl: string) => {
        const match = hsl.match(/(\d+)%\)$/)

        return match ? parseInt(match[1], 10) : 0
      }

      const l85 = extractLightness(palette[85])
      const l90 = extractLightness(palette[90])
      const l95 = extractLightness(palette[95])

      expect(l85).toBe(85)
      expect(l90).toBe(90)
      expect(l95).toBe(95)
    })

    it('should maintain hue and saturation across palette', () => {
      const palette = makeColorPallet('#FF0000') // Pure red

      Object.values(palette).forEach((color) => {
        expect(color).toContain('0deg') // Red hue
      })
    })

    it('should work with different input colors', () => {
      const palette1 = makeColorPallet('#FF0000')
      const palette2 = makeColorPallet('#00FF00')
      const palette3 = makeColorPallet('#0000FF')

      expect(palette1[50]).toBeDefined()
      expect(palette2[50]).toBeDefined()
      expect(palette3[50]).toBeDefined()

      // Different colors should produce different palettes
      expect(palette1[50]).not.toBe(palette2[50])
      expect(palette2[50]).not.toBe(palette3[50])
    })

    it('should have level 40 darker than level 50', () => {
      const palette = makeColorPallet('#3b82f6')

      const extractLightness = (hsl: string) => {
        const match = hsl.match(/(\d+)%\)$/)

        return match ? parseInt(match[1], 10) : 0
      }

      const l40 = extractLightness(palette[40])
      const l50 = extractLightness(palette[50])

      expect(l40).toBeLessThan(l50)
    })

    it('should handle edge case colors', () => {
      expect(() => makeColorPallet('#000000')).not.toThrow()
      expect(() => makeColorPallet('#FFFFFF')).not.toThrow()
      expect(() => makeColorPallet('#808080')).not.toThrow()
    })
  })
})
