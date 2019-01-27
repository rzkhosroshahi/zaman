import { IRangeDate, IRangeDays } from "../types";
import { Moment } from "jalali-moment";

const stateRange = (current: Moment, start: Moment, end: Moment): string => {
  if (current.isSame(start)) {
    return "startRange";
  } else if (current.isSame(end)) {
    return "endRange";
  }
  return "continueRange";
};

export type IRangeHelper = IRangeDays | {};

export function rangeHelper(range: IRangeDate): IRangeHelper {
  const { start, end } = range;
  const cloneStart = start.clone();
  const rangeDays = {};

  if (cloneStart.isSame(end)) {
    rangeDays[cloneStart.format("jYYYY/jMM/jDD")] = {
      status: "startRange",
    };

    return rangeDays;
  }

  if (cloneStart.isAfter(end)) {
    return {};
  }

  while (cloneStart.isSameOrBefore(end)) {
    rangeDays[cloneStart.format("jYYYY/jMM/jDD")] = {
      status: stateRange(cloneStart, start, end),
    };
    cloneStart.add("day", 1);
  }

  return rangeDays;
}
