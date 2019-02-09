import { IRangeDate, IRangeDays } from "../types";
import { Moment } from "jalali-moment";
import { fa } from ".";

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
  const rangeDays = <IRangeDays>{};

  if (cloneStart.isSame(end)) {
    rangeDays[cloneStart.format("jYYYY/jMM/jDD")] = {
      status: "sameRange",
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

export const makeRangeStatus = (start: Moment, end: Moment) => {
  const cloneStart = start.clone();
  const cloneEnd = end.clone();
  const startMonth = cloneStart.locale("fa").format("jMMMM");
  const endMonth = cloneEnd.locale("fa").format("jMMMM");
  const startDay = start.format("jDD");
  const endDay = end.format("jDD");

  if (cloneStart.isAfter(end)) {
    return `${fa(startDay)} ${startMonth} ماه`;
  }

  if (startMonth !== endMonth) {
    return `${fa(startDay)} ${startMonth} تا ${fa(endDay)} ${endMonth}`;
  }
  return `${fa(startDay)} تا ${fa(endDay)} ${startMonth} ماه`;
};

export const datePickerStatus = (date: Moment) => {
  const day = date.format("jDD");
  const month = date.locale("fa").format("jMMMM");

  return `${fa(day)} ${month} ماه`;
};
