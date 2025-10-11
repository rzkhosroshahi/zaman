import React, { useContext } from 'react'

import { render } from '@testing-library/react'
import { describe, it, expect, vi } from 'vitest'

import { I18nContext, I18nContextProvider } from './i18n-context'

describe('I18nContext', () => {
  it('should have displayName', () => {
    expect(I18nContext.displayName).toBe('I18nContext')
  })

  it('should provide default value as null', () => {
    function TestComponent() {
      const context = useContext(I18nContext)

      return <div>{context === null ? 'null' : 'not null'}</div>
    }

    const { getByText } = render(<TestComponent />)

    expect(getByText('null')).toBeInTheDocument()
  })
})

describe('I18nContextProvider', () => {
  it('should render children', () => {
    const { getByText } = render(
      <I18nContextProvider>
        <div>Test Content</div>
      </I18nContextProvider>
    )

    expect(getByText('Test Content')).toBeInTheDocument()
  })

  it('should provide i18n context to children', () => {
    function TestComponent() {
      const context = useContext(I18nContext)

      return <div>{context ? 'has context' : 'no context'}</div>
    }

    const { getByText } = render(
      <I18nContextProvider>
        <TestComponent />
      </I18nContextProvider>
    )

    expect(getByText('has context')).toBeInTheDocument()
  })

  it('should use default locale when not provided', () => {
    function TestComponent() {
      const context = useContext(I18nContext)

      return <div>{context?.getLocale()}</div>
    }

    const { getByText } = render(
      <I18nContextProvider>
        <TestComponent />
      </I18nContextProvider>
    )

    expect(getByText('en')).toBeInTheDocument()
  })

  it('should use provided default locale', () => {
    function TestComponent() {
      const context = useContext(I18nContext)

      return <div>{context?.getLocale()}</div>
    }

    const { getByText } = render(
      <I18nContextProvider defaultLocale="fa">
        <TestComponent />
      </I18nContextProvider>
    )

    expect(getByText('fa')).toBeInTheDocument()
  })

  it('should accept custom provider', () => {
    const customProvider = {
      register: vi.fn(),
      unregister: vi.fn(),
      setLocale: vi.fn(),
      getLocale: () => 'custom',
      getDirection: () => 'ltr' as const,
      t: (key: string) => key,
      getLocaleData: () => undefined,
      hasLocale: () => true,
      getAvailableLocales: () => ['custom']
    }

    function TestComponent() {
      const context = useContext(I18nContext)

      return <div>{context?.getLocale()}</div>
    }

    const { getByText } = render(
      <I18nContextProvider provider={customProvider as any}>
        <TestComponent />
      </I18nContextProvider>
    )

    expect(getByText('custom')).toBeInTheDocument()
  })

  it('should memoize provider', () => {
    function TestComponent() {
      const context = useContext(I18nContext)

      return <div>{context?.getLocale()}</div>
    }

    const { getByText, rerender } = render(
      <I18nContextProvider defaultLocale="en">
        <TestComponent />
      </I18nContextProvider>
    )

    expect(getByText('en')).toBeInTheDocument()

    // Rerender with same props
    rerender(
      <I18nContextProvider defaultLocale="en">
        <TestComponent />
      </I18nContextProvider>
    )

    expect(getByText('en')).toBeInTheDocument()
  })

  it('should update provider when locale changes', () => {
    function TestComponent() {
      const context = useContext(I18nContext)

      return <div>{context?.getLocale()}</div>
    }

    const { getByText, rerender } = render(
      <I18nContextProvider defaultLocale="en">
        <TestComponent />
      </I18nContextProvider>
    )

    expect(getByText('en')).toBeInTheDocument()

    rerender(
      <I18nContextProvider defaultLocale="fa">
        <TestComponent />
      </I18nContextProvider>
    )

    expect(getByText('fa')).toBeInTheDocument()
  })

  it('should provide context methods', () => {
    function TestComponent() {
      const context = useContext(I18nContext)

      return (
        <div>
          {context?.t ? 'has t' : 'no t'}
          {context?.getLocale ? ',has getLocale' : ',no getLocale'}
        </div>
      )
    }

    const { getByText } = render(
      <I18nContextProvider>
        <TestComponent />
      </I18nContextProvider>
    )

    expect(getByText('has t,has getLocale')).toBeInTheDocument()
  })

  it('should handle nested providers', () => {
    function TestComponent() {
      const context = useContext(I18nContext)

      return <div>{context?.getLocale()}</div>
    }

    const { getByText } = render(
      <I18nContextProvider defaultLocale="en">
        <I18nContextProvider defaultLocale="fa">
          <TestComponent />
        </I18nContextProvider>
      </I18nContextProvider>
    )

    // Inner provider should override
    expect(getByText('fa')).toBeInTheDocument()
  })
})
