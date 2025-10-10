import { describe, it, expect, vi, beforeEach, afterEach } from 'vitest'

import { debounce } from './debounce'

describe('debounce', () => {
  beforeEach(() => {
    vi.useFakeTimers()
  })

  afterEach(() => {
    vi.restoreAllMocks()
  })

  it('should debounce function calls', () => {
    const func = vi.fn()
    const debouncedFunc = debounce(func, 100)

    debouncedFunc()
    debouncedFunc()
    debouncedFunc()

    expect(func).not.toHaveBeenCalled()

    vi.advanceTimersByTime(100)

    expect(func).toHaveBeenCalledTimes(1)
  })

  it('should pass correct arguments', () => {
    const func = vi.fn()
    const debouncedFunc = debounce(func, 100)

    debouncedFunc('arg1', 'arg2', 'arg3')

    vi.advanceTimersByTime(100)

    expect(func).toHaveBeenCalledWith('arg1', 'arg2', 'arg3')
  })

  it('should use the last call arguments', () => {
    const func = vi.fn()
    const debouncedFunc = debounce(func, 100)

    debouncedFunc('first')
    debouncedFunc('second')
    debouncedFunc('third')

    vi.advanceTimersByTime(100)

    expect(func).toHaveBeenCalledTimes(1)
    expect(func).toHaveBeenCalledWith('third')
  })

  it('should reset timer on subsequent calls', () => {
    const func = vi.fn()
    const debouncedFunc = debounce(func, 100)

    debouncedFunc()
    vi.advanceTimersByTime(50)

    debouncedFunc()
    vi.advanceTimersByTime(50)

    expect(func).not.toHaveBeenCalled()

    vi.advanceTimersByTime(50)

    expect(func).toHaveBeenCalledTimes(1)
  })

  it('should allow cancellation', () => {
    const func = vi.fn()
    const debouncedFunc = debounce(func, 100)

    debouncedFunc()
    debouncedFunc.cancel()

    vi.advanceTimersByTime(100)

    expect(func).not.toHaveBeenCalled()
  })

  it('should handle multiple cancel calls', () => {
    const func = vi.fn()
    const debouncedFunc = debounce(func, 100)

    debouncedFunc()
    debouncedFunc.cancel()
    debouncedFunc.cancel()
    debouncedFunc.cancel()

    vi.advanceTimersByTime(100)

    expect(func).not.toHaveBeenCalled()
  })

  it('should work after cancellation', () => {
    const func = vi.fn()
    const debouncedFunc = debounce(func, 100)

    debouncedFunc()
    debouncedFunc.cancel()

    debouncedFunc()

    vi.advanceTimersByTime(100)

    expect(func).toHaveBeenCalledTimes(1)
  })

  it('should preserve this context', () => {
    const obj = {
      value: 42,
      method: vi.fn(function (this: { value: number }) {
        return this.value
      })
    }

    const debouncedMethod = debounce(obj.method, 100)

    debouncedMethod.call(obj)

    vi.advanceTimersByTime(100)

    expect(obj.method).toHaveBeenCalled()
  })

  it('should handle zero delay', () => {
    const func = vi.fn()
    const debouncedFunc = debounce(func, 0)

    debouncedFunc()

    expect(func).not.toHaveBeenCalled()

    vi.advanceTimersByTime(0)

    expect(func).toHaveBeenCalledTimes(1)
  })
})
