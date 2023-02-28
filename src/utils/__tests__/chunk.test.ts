import { chunk } from '../chunk'

describe('chunk module', () => {
  test('even length, even chunk size', () => {
    expect(chunk([1, 2, 3, 4, 5, 6, 7, 8, 9, 10], 2))
      .toEqual([[1, 2], [3, 4], [5, 6], [7, 8], [9, 10]])
  })
  test('even length, odd chunk size', () => {
    expect(chunk([1, 2, 3, 4, 5, 6, 7, 8, 9, 10], 3))
      .toEqual([[1, 2, 3], [4, 5, 6], [7, 8, 9], [10]])
  })
  test('odd length, even chunk size', () => {
    expect(chunk([1, 2, 3, 4, 5, 6, 7, 8, 9], 2))
      .toEqual([[1, 2], [3, 4], [5, 6], [7, 8], [9]])
  })
  test('odd length, odd chunk size', () => {
    expect(chunk([1, 2, 3, 4, 5, 6, 7], 3))
      .toEqual([[1, 2, 3], [4, 5, 6], [7]])
  })
})
