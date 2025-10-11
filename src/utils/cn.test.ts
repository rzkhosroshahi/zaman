import { describe, it, expect } from 'vitest'

import { cn } from './cn'

describe('cn (classnames utility)', () => {
  it('should merge string class names', () => {
    const result = cn('class1', 'class2', 'class3')

    expect(result).toBe('class1 class2 class3')
  })

  it('should handle falsy values', () => {
    const result = cn('class1', false, null, undefined, '', 'class2')

    expect(result).toBe('class1 class2')
  })

  it('should handle numbers', () => {
    const result = cn('class1', 123, 'class2')

    expect(result).toBe('class1 123 class2')
  })

  it('should handle arrays', () => {
    const result = cn(['class1', 'class2'], 'class3')

    expect(result).toBe('class1 class2 class3')
  })

  it('should handle nested arrays', () => {
    const result = cn(['class1', ['class2', 'class3']], 'class4')

    expect(result).toBe('class1 class2 class3 class4')
  })

  it('should handle objects', () => {
    const result = cn({
      class1: true,
      class2: false,
      class3: true
    })

    expect(result).toBe('class1 class3')
  })

  it('should handle mixed inputs', () => {
    const result = cn(
      'base',
      { active: true, disabled: false },
      ['extra1', 'extra2'],
      'final'
    )

    expect(result).toBe('base active extra1 extra2 final')
  })

  it('should handle empty input', () => {
    const result = cn()

    expect(result).toBe('')
  })

  it('should handle all falsy values', () => {
    const result = cn(false, null, undefined, '')

    expect(result).toBe('')
  })

  it('should handle nested arrays with falsy values', () => {
    const result = cn(['class1', false, ['class2', null, 'class3']])

    expect(result).toBe('class1 class2 class3')
  })

  it('should handle objects with undefined and null values', () => {
    const result = cn({
      class1: true,
      class2: undefined,
      class3: null,
      class4: true
    })

    expect(result).toBe('class1 class4')
  })
})
