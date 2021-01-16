import * as moment from "jalali-moment";
import { Moment } from "jalali-moment";
import { fa, getFormatDate } from "./index";

export interface IDays {
  day: string;
  utc: string;
  faDate: string;
  disable: boolean;
  today: boolean;
}

export interface IDaysInMonth {
  days: IDays[];
  monthName: string;
  month: number;
  today?: string;
}

// Check current and date to be in same month
const checkDateMonth = (date, current, isGregorian) =>
  isGregorian
    ? current.month() !== date.month()
    : current.jMonth() !== date.jMonth();

// Check date to be in this month
const checkCurrentMonth = (date: Moment, isGregorian) =>
  isGregorian
    ? moment().format("YYYY/MM") === date.format("YYYY/MM")
    : moment().format("jYYYY/jMM") === date.format("jYYYY/jMM");

export const daysInMonth = (date: Moment, { isGregorian }): IDaysInMonth => {
  const days: IDays[] = [];
  const clonedDate = date.clone();
  const monthName = `${clonedDate
    .locale(isGregorian ? "en" : "fa")
    .format(isGregorian ? "MMMM" : "jMMMM")} ${fa(
    clonedDate.format(isGregorian ? "YYYY" : "jYYYY"),
    isGregorian,
  )}`;

  const month = Number(
    date
      .clone()
      .locale(isGregorian ? "en" : "fa")
      .format(isGregorian ? "M" : "jM"),
  );

  const firstDayOfWeek = date.clone().startOf(isGregorian ? "month" : "jMonth");
  // const lastDayOfWeek = date.clone().endOf("jMonth");
  const lastDayOfMonth = date.clone().endOf(isGregorian ? "month" : "jMonth");

  const FixWeekStartDay = isGregorian ? 1 : 2;
  // Add some days from *month after* (to complete the grid)
  const lastDayOfWeek = lastDayOfMonth
    .clone()
    .add(7 - ((lastDayOfMonth.day() + FixWeekStartDay) % 7), "days");

  const today = checkCurrentMonth(date, isGregorian)
    ? { today: date.format(isGregorian ? "DD" : "jDD") }
    : null;

  // Add some days from *month before* (to complete the grid)
  firstDayOfWeek.subtract(
    (firstDayOfWeek.day() + FixWeekStartDay - 1) % 7,
    "days",
  );

  while (firstDayOfWeek.isBefore(lastDayOfWeek)) {
    days.push({
      day: firstDayOfWeek.clone().format(isGregorian ? "DD" : "jDD"),
      utc: new Date(firstDayOfWeek.clone().format("YYYY/M/DD")).toUTCString(),
      faDate: firstDayOfWeek.clone().format(getFormatDate({ isGregorian })),
      disable: checkDateMonth(date, firstDayOfWeek, isGregorian),
      today:
        today &&
        firstDayOfWeek.format(isGregorian ? "DD" : "jDD") === today.today,
    });
    firstDayOfWeek.add(1, "days");
  }

  // tslint:disable-next-line:no-console
  // console.log("days ", { monthName, month });
  return { monthName, month, days, ...today };
};
