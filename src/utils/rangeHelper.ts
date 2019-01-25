import { IRangeDate } from "../types";
import { Moment } from "jalali-moment";

const stateRange = (current: Moment, start: Moment, end: Moment): string => {
  if (current.isSame(start)) {
    return "startRange";
  } else if (current.isSame(end)) {
    return "endRange";
  }
  return "continueRange";
};

export function rangeHelper(range: IRangeDate) {
  const { start, end } = range;
  const cloneStart = start.clone();
  const rangeDays = {};

  if (cloneStart.isSameOrAfter(end)) {
    return rangeDays;
  }

  while (cloneStart.isSameOrBefore(end)) {
    rangeDays[cloneStart.format("jYYYY/jMM/jDD")] = {
      status: stateRange(cloneStart, start, end),
    };
    cloneStart.add("day", 1);
  }

  return rangeDays;
}
