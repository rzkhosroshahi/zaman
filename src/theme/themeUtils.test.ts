import { describe, it, expect } from 'vitest'

import { defaultTheme } from './defaultTheme'
import {
  mergeTheme,
  themeToCSSVariables,
  generateAccentPalette,
  applyCSSVariables
} from './themeUtils'

describe('themeUtils', () => {
  describe('mergeTheme', () => {
    it('should return default theme when no overrides provided', () => {
      const result = mergeTheme()

      expect(result).toEqual(defaultTheme)
    })

    it('should return default theme when empty overrides provided', () => {
      const result = mergeTheme({})

      expect(result).toEqual(defaultTheme)
    })

    it('should merge color overrides', () => {
      const result = mergeTheme({
        colors: {
          primary: {
            DEFAULT: '#FF0000'
          }
        }
      })

      expect(result.colors.primary.DEFAULT).toBe('#FF0000')
      expect(result.colors.primary.light).toBe(
        defaultTheme.colors.primary.light
      )
    })

    it('should merge nested properties', () => {
      const result = mergeTheme({
        colors: {
          gray: {
            500: '#CUSTOM'
          }
        }
      })

      expect(result.colors.gray[500]).toBe('#CUSTOM')
      expect(result.colors.gray[100]).toBe(defaultTheme.colors.gray[100])
    })

    it('should apply round preset when specified', () => {
      const result = mergeTheme({
        round: 'medium'
      })

      expect(result.radius).toBeDefined()
      expect(result.radius.calendarItem).toBe('0.5rem')
    })

    it('should not override radius when both round and radius provided', () => {
      const customRadius = {
        calendarItem: '10px',
        modal: '10px',
        button: '10px'
      }

      const result = mergeTheme({
        round: 'thick',
        radius: customRadius
      })

      expect(result.radius).toEqual(customRadius)
    })

    it('should merge spacing overrides', () => {
      const result = mergeTheme({
        spacing: {
          calendarGap: '10px'
        }
      })

      expect(result.spacing.calendarGap).toBe('10px')
      expect(result.spacing.calendarItemWidth).toBe(
        defaultTheme.spacing.calendarItemWidth
      )
    })

    it('should merge fontSize overrides', () => {
      const result = mergeTheme({
        fontSize: {
          base: '18px'
        }
      })

      expect(result.fontSize.base).toBe('18px')
      expect(result.fontSize.sm).toBe(defaultTheme.fontSize.sm)
    })

    it('should merge direction override', () => {
      const result = mergeTheme({
        direction: 'rtl'
      })

      expect(result.direction).toBe('rtl')
    })

    it('should handle deep nested overrides', () => {
      const result = mergeTheme({
        colors: {
          primary: {
            DEFAULT: '#FF0000',
            light: '#FF5555'
          }
        }
      })

      expect(result.colors.primary.DEFAULT).toBe('#FF0000')
      expect(result.colors.primary.light).toBe('#FF5555')
      expect(result.colors.primary.dark).toBe(defaultTheme.colors.primary.dark)
    })
  })

  describe('themeToCSSVariables', () => {
    it('should convert theme to CSS variables', () => {
      const variables = themeToCSSVariables(defaultTheme)

      expect(variables['--zaman-primary']).toBe(
        defaultTheme.colors.primary.DEFAULT
      )
      expect(variables['--zaman-direction']).toBe(defaultTheme.direction)
    })

    it('should include all primary color variants', () => {
      const variables = themeToCSSVariables(defaultTheme)

      expect(variables['--zaman-primary']).toBeDefined()
      expect(variables['--zaman-primary-light']).toBeDefined()
      expect(variables['--zaman-primary-lighter']).toBeDefined()
      expect(variables['--zaman-primary-dark']).toBeDefined()
      expect(variables['--zaman-primary-foreground']).toBeDefined()
    })

    it('should include all gray scale colors', () => {
      const variables = themeToCSSVariables(defaultTheme)

      expect(variables['--zaman-gray-0']).toBeDefined()
      expect(variables['--zaman-gray-50']).toBeDefined()
      expect(variables['--zaman-gray-100']).toBeDefined()
      expect(variables['--zaman-gray-900']).toBeDefined()
    })

    it('should include semantic colors', () => {
      const variables = themeToCSSVariables(defaultTheme)

      expect(variables['--zaman-weekend']).toBeDefined()
      expect(variables['--zaman-disabled']).toBeDefined()
      expect(variables['--zaman-border']).toBeDefined()
      expect(variables['--zaman-background']).toBeDefined()
      expect(variables['--zaman-foreground']).toBeDefined()
    })

    it('should include spacing variables', () => {
      const variables = themeToCSSVariables(defaultTheme)

      expect(variables['--zaman-item-width']).toBeDefined()
      expect(variables['--zaman-item-height']).toBeDefined()
      expect(variables['--zaman-gap']).toBeDefined()
      expect(variables['--zaman-header-height']).toBeDefined()
      expect(variables['--zaman-modal-padding']).toBeDefined()
    })

    it('should include radius variables', () => {
      const variables = themeToCSSVariables(defaultTheme)

      expect(variables['--zaman-radius-item']).toBeDefined()
      expect(variables['--zaman-radius-modal']).toBeDefined()
      expect(variables['--zaman-radius-button']).toBeDefined()
    })

    it('should include font size variables', () => {
      const variables = themeToCSSVariables(defaultTheme)

      expect(variables['--zaman-text-xs']).toBeDefined()
      expect(variables['--zaman-text-sm']).toBeDefined()
      expect(variables['--zaman-text-base']).toBeDefined()
      expect(variables['--zaman-text-lg']).toBeDefined()
      expect(variables['--zaman-text-xl']).toBeDefined()
      expect(variables['--zaman-text-2xl']).toBeDefined()
    })
  })

  describe('generateAccentPalette', () => {
    it('should generate palette from accent color', () => {
      const palette = generateAccentPalette('#FF0000')

      expect(palette.DEFAULT).toBe('#FF0000')
      expect(palette.light).toBeDefined()
      expect(palette.lighter).toBeDefined()
      expect(palette.dark).toBeDefined()
      expect(palette.foreground).toBeDefined()
    })

    it('should have foreground color', () => {
      const palette = generateAccentPalette('#3498db')

      expect(palette.foreground).toBe('#ffffff')
    })

    it('should work with different color formats', () => {
      const palette1 = generateAccentPalette('#FF0000')
      const palette2 = generateAccentPalette('#00FF00')

      expect(palette1.DEFAULT).toBe('#FF0000')
      expect(palette2.DEFAULT).toBe('#00FF00')
    })
  })

  describe('applyCSSVariables', () => {
    it('should apply CSS variables to element', () => {
      const element = document.createElement('div')
      const variables = {
        '--test-color': '#FF0000',
        '--test-size': '16px'
      }

      applyCSSVariables(element, variables)

      expect(element.style.getPropertyValue('--test-color')).toBe('#FF0000')
      expect(element.style.getPropertyValue('--test-size')).toBe('16px')
    })

    it('should handle empty variables object', () => {
      const element = document.createElement('div')

      applyCSSVariables(element, {})

      expect(element.style.length).toBe(0)
    })

    it('should override existing variables', () => {
      const element = document.createElement('div')

      element.style.setProperty('--test-var', 'old-value')
      applyCSSVariables(element, { '--test-var': 'new-value' })

      expect(element.style.getPropertyValue('--test-var')).toBe('new-value')
    })

    it('should handle multiple variables', () => {
      const element = document.createElement('div')
      const variables = {
        '--var1': 'value1',
        '--var2': 'value2',
        '--var3': 'value3'
      }

      applyCSSVariables(element, variables)

      expect(element.style.getPropertyValue('--var1')).toBe('value1')
      expect(element.style.getPropertyValue('--var2')).toBe('value2')
      expect(element.style.getPropertyValue('--var3')).toBe('value3')
    })
  })
})
