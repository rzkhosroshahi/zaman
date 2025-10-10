import { describe, it, expect } from 'vitest'

import { slideDown, fade } from './animation'

describe('animation', () => {
  it('should export slideDown animation class', () => {
    expect(slideDown).toBe('zaman-slide-down')
  })

  it('should export fade animation class', () => {
    expect(fade).toBe('zaman-fade')
  })

  it('should have zaman- prefix for all animation classes', () => {
    expect(slideDown.startsWith('zaman-')).toBe(true)
    expect(fade.startsWith('zaman-')).toBe(true)
  })

  it('should export valid CSS class names', () => {
    // Valid CSS class names should not contain spaces or special characters
    expect(slideDown).toMatch(/^[a-z-]+$/)
    expect(fade).toMatch(/^[a-z-]+$/)
  })
})
