import dayjs from 'dayjs'
import isBetween from 'dayjs/plugin/isBetween'

import { createDateEngine } from '../date-engine'

import type { RangeEngine, RangeState } from './range-engine.types'

dayjs.extend(isBetween)

export function createRangeEngine(): RangeEngine {
  const dateEngine = createDateEngine()

  return {
    createInitialState(): RangeState {
      return {
        start: null,
        end: null,
        isSelecting: false,
        hoverDate: null
      }
    },

    startSelection(date: Date): RangeState {
      return {
        start: date,
        end: null,
        isSelecting: true,
        hoverDate: null
      }
    },

    updateHover(state: RangeState, date: Date): RangeState {
      if (!state.isSelecting || !state.start) {
        return state
      }

      const comparison = dateEngine.compare(date, state.start, 'day')

      if (comparison.isAfter || comparison.isSame) {
        return {
          ...state,
          hoverDate: date
        }
      }

      return state
    },

    completeSelection(state: RangeState, date: Date): RangeState {
      if (!state.start) {
        return this.startSelection(date)
      }

      const comparison = dateEngine.compare(state.start, date, 'day')

      if (comparison.isAfter) {
        return {
          start: date,
          end: state.start,
          isSelecting: false,
          hoverDate: null
        }
      }

      return {
        ...state,
        end: date,
        isSelecting: false,
        hoverDate: null
      }
    },

    resetSelection(): RangeState {
      return this.createInitialState()
    },

    isInRange(date: Date, start: Date | null, end: Date | null): boolean {
      if (!start || !end) {
        return false
      }

      return dayjs(date).isBetween(dayjs(start), dayjs(end), 'day', '[]')
    },

    isRangeStart(date: Date, start: Date | null): boolean {
      if (!start) {
        return false
      }

      return dateEngine.isSameDay(date, start)
    },

    isRangeEnd(date: Date, end: Date | null): boolean {
      if (!end) {
        return false
      }

      return dateEngine.isSameDay(date, end)
    },

    getRangeDates(start: Date, end: Date): Date[] {
      const dates: Date[] = []
      let current = start

      while (!dateEngine.compare(current, end, 'day').isAfter) {
        dates.push(new Date(current))
        current = dateEngine.addDays(current, 1)
      }

      return dates
    },

    getRangeDuration(start: Date, end: Date): number {
      const comparison = dateEngine.compare(end, start, 'day')

      return Math.abs(comparison.difference) + 1
    }
  }
}
