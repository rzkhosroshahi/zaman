import { describe, it, expect } from 'vitest'

import { createVariants } from './variants'

describe('createVariants', () => {
  it('should create variant function with base class', () => {
    const variants = createVariants({
      base: 'base-class'
    })

    const result = variants()

    expect(result).toBe('base-class')
  })

  it('should apply default variant', () => {
    const variants = createVariants({
      base: 'btn',
      variants: {
        size: {
          sm: 'btn-sm',
          md: 'btn-md',
          lg: 'btn-lg'
        }
      },
      defaultVariants: {
        size: 'md'
      }
    })

    const result = variants()

    expect(result).toContain('btn')
    expect(result).toContain('btn-md')
  })

  it('should apply selected variant', () => {
    const variants = createVariants({
      base: 'btn',
      variants: {
        size: {
          sm: 'btn-sm',
          md: 'btn-md',
          lg: 'btn-lg'
        }
      }
    })

    const result = variants({ size: 'lg' })

    expect(result).toContain('btn')
    expect(result).toContain('btn-lg')
  })

  it('should override default variant with selected variant', () => {
    const variants = createVariants({
      base: 'btn',
      variants: {
        size: {
          sm: 'btn-sm',
          md: 'btn-md',
          lg: 'btn-lg'
        }
      },
      defaultVariants: {
        size: 'md'
      }
    })

    const result = variants({ size: 'sm' })

    expect(result).toContain('btn')
    expect(result).toContain('btn-sm')
    expect(result).not.toContain('btn-md')
  })

  it('should handle multiple variants', () => {
    const variants = createVariants({
      base: 'btn',
      variants: {
        size: {
          sm: 'btn-sm',
          md: 'btn-md'
        },
        color: {
          primary: 'btn-primary',
          secondary: 'btn-secondary'
        }
      }
    })

    const result = variants({ size: 'sm', color: 'primary' })

    expect(result).toContain('btn')
    expect(result).toContain('btn-sm')
    expect(result).toContain('btn-primary')
  })

  it('should apply custom className', () => {
    const variants = createVariants({
      base: 'btn'
    })

    const result = variants({ className: 'custom-class' })

    expect(result).toContain('btn')
    expect(result).toContain('custom-class')
  })

  it('should combine base, variants, and className', () => {
    const variants = createVariants({
      base: 'btn',
      variants: {
        size: {
          sm: 'btn-sm',
          md: 'btn-md'
        }
      }
    })

    const result = variants({ size: 'md', className: 'my-btn' })

    expect(result).toContain('btn')
    expect(result).toContain('btn-md')
    expect(result).toContain('my-btn')
  })

  it('should handle variants with array values', () => {
    const variants = createVariants({
      base: 'btn',
      variants: {
        size: {
          sm: ['text-sm', 'px-2'],
          md: ['text-base', 'px-4']
        }
      }
    })

    const result = variants({ size: 'sm' })

    expect(result).toContain('btn')
    expect(result).toContain('text-sm')
    expect(result).toContain('px-2')
  })

  it('should handle empty props', () => {
    const variants = createVariants({
      base: 'btn'
    })

    const result = variants({})

    expect(result).toBe('btn')
  })

  it('should handle undefined props', () => {
    const variants = createVariants({
      base: 'btn',
      variants: {
        size: {
          sm: 'btn-sm'
        }
      }
    })

    const result = variants(undefined)

    expect(result).toBe('btn')
  })

  it('should ignore invalid variant values', () => {
    const variants = createVariants({
      base: 'btn',
      variants: {
        size: {
          sm: 'btn-sm',
          md: 'btn-md'
        }
      }
    })

    const result = variants({ size: 'xl' as any })

    expect(result).toBe('btn')
    expect(result).not.toContain('btn-xl')
  })

  it('should handle config without variants', () => {
    const variants = createVariants({
      base: 'btn'
    })

    const result = variants({ className: 'extra' })

    expect(result).toContain('btn')
    expect(result).toContain('extra')
  })

  it('should handle config without base', () => {
    const variants = createVariants({
      variants: {
        size: {
          sm: 'btn-sm'
        }
      }
    })

    const result = variants({ size: 'sm' })

    expect(result).toContain('btn-sm')
  })

  it('should handle boolean variant values', () => {
    const variants = createVariants({
      base: 'btn',
      variants: {
        disabled: {
          true: 'opacity-50',
          false: 'opacity-100'
        }
      }
    })

    const result = variants({ disabled: 'true' })

    expect(result).toContain('btn')
    expect(result).toContain('opacity-50')
  })
})
