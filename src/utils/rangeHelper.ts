import { IRangeDate } from "../types";
import * as moment from "jalali-moment";
import { Moment } from "jalali-moment";

const stateRange = (current: Moment, start: Moment, end: Moment): string => {
  if (current.isSame(start)) {
    return "startRange";
  } else if (current.isSame(end)) {
    return "endRange";
  }
  return "beginningRange";
};

export function rangeHelper(range: IRangeDate) {
  const rangeStart = moment(range.start);
  const rangeEnd = moment(range.end);
  const cloneRangeStart = rangeStart.clone();
  const rangeDays = {};

  while (cloneRangeStart.isSameOrBefore(rangeEnd)) {
    rangeDays[cloneRangeStart.format("jYYYY/jMM/jDD")] = {
      status: stateRange(cloneRangeStart, rangeStart, rangeEnd),
    };
    cloneRangeStart.add("day", 1);
  }

  return rangeDays;
}
