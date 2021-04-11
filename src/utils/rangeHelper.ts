import { IRangeDate, IRangeDays } from "../types";
import { Moment } from "jalali-moment";
import { fa, getFormatDate } from ".";

const stateRange = (current: Moment, start: Moment, end: Moment): string => {
  if (current.isSame(start)) {
    return "startRange";
  } else if (current.isSame(end)) {
    return "endRange";
  }
  return "continueRange";
};

function ordinal_suffix_of(i) {
  var j = i % 10,
    k = i % 100;
  if (j == 1 && k != 11) {
    return i + "st";
  }
  if (j == 2 && k != 12) {
    return i + "nd";
  }
  if (j == 3 && k != 13) {
    return i + "rd";
  }
  return i + "th";
}

export function rangeHelper(range: IRangeDate, { isGregorian }) {
  const { start, end } = range;
  const cloneStart = start.clone();
  const rangeDays = <IRangeDays>{};

  if (cloneStart.isSame(end)) {
    rangeDays[cloneStart.format(getFormatDate({ isGregorian }))] = {
      status: "sameRange",
    };

    return rangeDays;
  }

  if (cloneStart.isAfter(end)) {
    return {};
  }

  while (cloneStart.isSameOrBefore(end)) {
    rangeDays[cloneStart.format(getFormatDate({ isGregorian }))] = {
      status: stateRange(cloneStart, start, end),
    };
    cloneStart.add(1, "d");
  }

  return rangeDays;
}

export const makeRangeStatus = (
  start: Moment,
  end: Moment,
  { isGregorian },
) => {
  const cloneStart = start.clone();
  const cloneEnd = end.clone();
  const startMonth = cloneStart
    .locale(isGregorian ? "en" : "fa")
    .format(isGregorian ? "MMMM" : "jMMMM");
  const endMonth = cloneEnd
    .locale(isGregorian ? "en" : "fa")
    .format(isGregorian ? "MMMM" : "jMMMM");
  const startDay = start.format(isGregorian ? "DD" : "jDD");
  const endDay = end.format(isGregorian ? "DD" : "jDD");

  if (cloneStart.isAfter(end)) {
    return `${fa(startDay, isGregorian)} ${startMonth} ${
      isGregorian ? "" : "ماه"
    }`;
  }

  if (startMonth !== endMonth) {
    return `${fa(startDay, isGregorian)} ${startMonth} ${
      isGregorian ? "to" : "تا"
    } ${fa(endDay, isGregorian)} ${endMonth}`;
  }
  return `${
    isGregorian
      ? ordinal_suffix_of(Number(startDay))
      : fa(startDay, isGregorian)
  } ${isGregorian ? "to" : "تا"} ${
    isGregorian ? ordinal_suffix_of(Number(endDay)) : fa(endDay, isGregorian)
  } ${startMonth} ${isGregorian ? "" : "ماه"}`;
};

export const datePickerStatus = (date: Moment, { isGregorian }) => {
  const day = date.format(isGregorian ? "DD" : "jDD");
  const month = date
    .locale(isGregorian ? "en" : "fa")
    .format(isGregorian ? "MMMM" : "jMMMM");

  return isGregorian
    ? `${month} ${ordinal_suffix_of(Number(day))}`
    : `${fa(day, isGregorian)} ${month} ماه`;
};
