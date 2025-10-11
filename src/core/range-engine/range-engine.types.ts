export interface RangeState {
  start: Date | null
  end: Date | null
  isSelecting: boolean
  hoverDate: Date | null
}

export interface RangeSelection {
  from: Date
  to: Date
}

export interface RangeEngine {
  createInitialState(): RangeState
  startSelection(date: Date): RangeState
  updateHover(state: RangeState, date: Date): RangeState
  completeSelection(state: RangeState, date: Date): RangeState
  resetSelection(state: RangeState): RangeState
  isInRange(date: Date, start: Date | null, end: Date | null): boolean
  isRangeStart(date: Date, start: Date | null): boolean
  isRangeEnd(date: Date, end: Date | null): boolean
  getRangeDates(start: Date, end: Date): Date[]
  getRangeDuration(start: Date, end: Date): number
}
