import { describe, it, expect } from 'vitest'

import { defaultTheme, roundPresets } from './defaultTheme'

describe('defaultTheme', () => {
  it('should have colors defined', () => {
    expect(defaultTheme.colors).toBeDefined()
    expect(defaultTheme.colors.primary).toBeDefined()
    expect(defaultTheme.colors.gray).toBeDefined()
  })

  it('should have primary color variants', () => {
    expect(defaultTheme.colors.primary.DEFAULT).toBeDefined()
    expect(defaultTheme.colors.primary.light).toBeDefined()
    expect(defaultTheme.colors.primary.lighter).toBeDefined()
    expect(defaultTheme.colors.primary.dark).toBeDefined()
    expect(defaultTheme.colors.primary.foreground).toBeDefined()
  })

  it('should have gray scale colors', () => {
    expect(defaultTheme.colors.gray[0]).toBeDefined()
    expect(defaultTheme.colors.gray[50]).toBeDefined()
    expect(defaultTheme.colors.gray[100]).toBeDefined()
    expect(defaultTheme.colors.gray[200]).toBeDefined()
    expect(defaultTheme.colors.gray[300]).toBeDefined()
    expect(defaultTheme.colors.gray[400]).toBeDefined()
    expect(defaultTheme.colors.gray[500]).toBeDefined()
    expect(defaultTheme.colors.gray[600]).toBeDefined()
    expect(defaultTheme.colors.gray[700]).toBeDefined()
    expect(defaultTheme.colors.gray[800]).toBeDefined()
    expect(defaultTheme.colors.gray[900]).toBeDefined()
  })

  it('should have semantic colors', () => {
    expect(defaultTheme.colors.weekend).toBeDefined()
    expect(defaultTheme.colors.disabled).toBeDefined()
    expect(defaultTheme.colors.border).toBeDefined()
    expect(defaultTheme.colors.background).toBeDefined()
    expect(defaultTheme.colors.foreground).toBeDefined()
  })

  it('should have spacing defined', () => {
    expect(defaultTheme.spacing).toBeDefined()
    expect(defaultTheme.spacing.calendarItemWidth).toBeDefined()
    expect(defaultTheme.spacing.calendarItemHeight).toBeDefined()
    expect(defaultTheme.spacing.calendarGap).toBeDefined()
    expect(defaultTheme.spacing.headerHeight).toBeDefined()
    expect(defaultTheme.spacing.modalPadding).toBeDefined()
  })

  it('should have radius defined', () => {
    expect(defaultTheme.radius).toBeDefined()
    expect(defaultTheme.radius.calendarItem).toBeDefined()
    expect(defaultTheme.radius.modal).toBeDefined()
    expect(defaultTheme.radius.button).toBeDefined()
  })

  it('should have fontSize defined', () => {
    expect(defaultTheme.fontSize).toBeDefined()
    expect(defaultTheme.fontSize.xs).toBeDefined()
    expect(defaultTheme.fontSize.sm).toBeDefined()
    expect(defaultTheme.fontSize.base).toBeDefined()
    expect(defaultTheme.fontSize.lg).toBeDefined()
    expect(defaultTheme.fontSize.xl).toBeDefined()
    expect(defaultTheme.fontSize['2xl']).toBeDefined()
  })

  it('should have direction defined', () => {
    expect(defaultTheme.direction).toBeDefined()
    expect(['rtl', 'ltr']).toContain(defaultTheme.direction)
  })

  it('should have round preset defined', () => {
    expect(defaultTheme.round).toBeDefined()
  })
})

describe('roundPresets', () => {
  it('should have x-thin preset', () => {
    expect(roundPresets['x-thin']).toBeDefined()
    expect(roundPresets['x-thin'].calendarItem).toBeDefined()
    expect(roundPresets['x-thin'].modal).toBeDefined()
    expect(roundPresets['x-thin'].button).toBeDefined()
  })

  it('should have thin preset', () => {
    expect(roundPresets.thin).toBeDefined()
    expect(roundPresets.thin.calendarItem).toBeDefined()
    expect(roundPresets.thin.modal).toBeDefined()
    expect(roundPresets.thin.button).toBeDefined()
  })

  it('should have medium preset', () => {
    expect(roundPresets.medium).toBeDefined()
    expect(roundPresets.medium.calendarItem).toBeDefined()
    expect(roundPresets.medium.modal).toBeDefined()
    expect(roundPresets.medium.button).toBeDefined()
  })

  it('should have thick preset', () => {
    expect(roundPresets.thick).toBeDefined()
    expect(roundPresets.thick.calendarItem).toBeDefined()
    expect(roundPresets.thick.modal).toBeDefined()
    expect(roundPresets.thick.button).toBeDefined()
  })

  it('should have increasing radius values', () => {
    const xThinValue = parseFloat(roundPresets['x-thin'].calendarItem)
    const thinValue = parseFloat(roundPresets.thin.calendarItem)
    const mediumValue = parseFloat(roundPresets.medium.calendarItem)
    const thickValue = parseFloat(roundPresets.thick.calendarItem)

    expect(thinValue).toBeGreaterThan(xThinValue)
    expect(mediumValue).toBeGreaterThan(thinValue)
    expect(thickValue).toBeGreaterThan(mediumValue)
  })
})
