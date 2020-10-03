import { IRangeDate, IRangeDays } from "../types";
import { Dayjs } from "dayjs";
import { fa } from ".";

const stateRange = (current: Dayjs, start: Dayjs, end: Dayjs): string => {
  if (current.isSame(start)) {
    return "startRange";
  } else if (current.isSame(end)) {
    return "endRange";
  }
  return "continueRange";
};

export function rangeHelper(range: IRangeDate) {
  const { start, end } = range;
  let cloneStart = start.clone();
  const rangeDays = <IRangeDays>{};

  if (cloneStart.isSame(end)) {
    rangeDays[cloneStart.calendar("jalali").format("YYYY/MM/DD")] = {
      status: "sameRange",
    };

    return rangeDays;
  }

  if (cloneStart.isAfter(end)) {
    return {};
  }

  while (cloneStart.isSameOrBefore(end)) {
    rangeDays[cloneStart.calendar("jalali").format("YYYY/MM/DD")] = {
      status: stateRange(cloneStart, start, end),
    };
    cloneStart = cloneStart.add(1, "day");
  }

  return rangeDays;
}

export const makeRangeStatus = (start: Dayjs, end: Dayjs) => {
  const cloneStart = start.clone();
  const cloneEnd = end.clone();
  const startMonth = cloneStart
    .calendar("jalali")
    .locale("fa")
    .format("MMMM");
  const endMonth = cloneEnd
    .calendar("jalali")
    .locale("fa")
    .format("MMMM");
  const startDay = start.calendar("jalali").format("DD");
  const endDay = end.calendar("jalali").format("DD");

  if (cloneStart.isAfter(end)) {
    return `${fa(startDay)} ${startMonth} ماه`;
  }

  if (startMonth !== endMonth) {
    return `${fa(startDay)} ${startMonth} تا ${fa(endDay)} ${endMonth}`;
  }
  return `${fa(startDay)} تا ${fa(endDay)} ${startMonth} ماه`;
};

export const datePickerStatus = (date: Dayjs) => {
  const day = date.calendar("jalali").format("DD");
  const month = date
    .calendar("jalali")
    .locale("fa")
    .format("MMMM");

  return `${fa(day)} ${month} ماه`;
};
