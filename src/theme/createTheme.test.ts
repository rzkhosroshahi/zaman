import { describe, it, expect, beforeEach } from 'vitest'

import { createTheme, applyTheme, removeTheme } from './createTheme'
import { defaultTheme } from './defaultTheme'

describe('createTheme', () => {
  it('should create default theme when no overrides provided', () => {
    const theme = createTheme()

    expect(theme).toEqual(defaultTheme)
  })

  it('should create theme with overrides', () => {
    const theme = createTheme({
      colors: {
        primary: {
          DEFAULT: '#FF0000'
        }
      }
    })

    expect(theme.colors.primary.DEFAULT).toBe('#FF0000')
    expect(theme.colors.primary.light).toBe(defaultTheme.colors.primary.light)
  })

  it('should handle empty overrides', () => {
    const theme = createTheme({})

    expect(theme).toEqual(defaultTheme)
  })

  it('should merge multiple overrides', () => {
    const theme = createTheme({
      colors: {
        primary: {
          DEFAULT: '#FF0000'
        }
      },
      direction: 'ltr',
      round: 'thick'
    })

    expect(theme.colors.primary.DEFAULT).toBe('#FF0000')
    expect(theme.direction).toBe('ltr')
    expect(theme.round).toBe('thick')
  })

  it('should apply round preset', () => {
    const theme = createTheme({
      round: 'medium'
    })

    expect(theme.radius.calendarItem).toBe('0.5rem')
  })

  it('should handle deep nested overrides', () => {
    const theme = createTheme({
      colors: {
        gray: {
          500: '#CUSTOM'
        }
      }
    })

    expect(theme.colors.gray[500]).toBe('#CUSTOM')
    expect(theme.colors.gray[100]).toBe(defaultTheme.colors.gray[100])
  })
})

describe('applyTheme', () => {
  let element: HTMLElement

  beforeEach(() => {
    element = document.createElement('div')
  })

  it('should apply theme to element', async () => {
    const theme = createTheme()

    applyTheme(theme, element)

    // Wait for dynamic import
    await new Promise((resolve) => setTimeout(resolve, 100))

    // CSS variables should be applied
    expect(element.style.length).toBeGreaterThan(0)
  })

  it('should apply custom theme to element', async () => {
    const theme = createTheme({
      colors: {
        primary: {
          DEFAULT: '#FF0000'
        }
      }
    })

    applyTheme(theme, element)

    // Wait for dynamic import
    await new Promise((resolve) => setTimeout(resolve, 100))

    expect(element.style.length).toBeGreaterThan(0)
  })

  it('should handle multiple theme applications', async () => {
    const theme1 = createTheme({
      colors: {
        primary: {
          DEFAULT: '#FF0000'
        }
      }
    })

    const theme2 = createTheme({
      colors: {
        primary: {
          DEFAULT: '#00FF00'
        }
      }
    })

    applyTheme(theme1, element)
    await new Promise((resolve) => setTimeout(resolve, 100))

    applyTheme(theme2, element)
    await new Promise((resolve) => setTimeout(resolve, 100))

    expect(element.style.length).toBeGreaterThan(0)
  })
})

describe('removeTheme', () => {
  let element: HTMLElement

  beforeEach(() => {
    element = document.createElement('div')
  })

  it('should remove theme from element', () => {
    element.style.setProperty('--zaman-primary', '#FF0000')
    element.style.setProperty('--zaman-background', '#FFFFFF')

    removeTheme(element)

    expect(element.style.getPropertyValue('--zaman-primary')).toBe('')
    expect(element.style.getPropertyValue('--zaman-background')).toBe('')
  })

  it('should only remove zaman variables', () => {
    element.style.setProperty('--zaman-primary', '#FF0000')
    element.style.setProperty('--custom-variable', '#FFFFFF')

    removeTheme(element)

    expect(element.style.getPropertyValue('--zaman-primary')).toBe('')
    expect(element.style.getPropertyValue('--custom-variable')).toBe('#FFFFFF')
  })

  it('should handle element with no theme', () => {
    expect(() => removeTheme(element)).not.toThrow()
  })

  it('should handle multiple zaman variables', () => {
    element.style.setProperty('--zaman-primary', '#FF0000')
    element.style.setProperty('--zaman-background', '#FFFFFF')
    element.style.setProperty('--zaman-border', '#CCCCCC')
    element.style.setProperty('--zaman-text', '#000000')

    removeTheme(element)

    expect(element.style.getPropertyValue('--zaman-primary')).toBe('')
    expect(element.style.getPropertyValue('--zaman-background')).toBe('')
    expect(element.style.getPropertyValue('--zaman-border')).toBe('')
    expect(element.style.getPropertyValue('--zaman-text')).toBe('')
  })
})
