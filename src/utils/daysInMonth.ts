import { Dayjs } from "dayjs";
import dayjs from "dayjs";
import { fa } from "./index";

export interface IDays {
  day: string;
  // utc: string;
  faDate: string;
  disable: boolean;
}

export interface IDaysInMonth {
  days: IDays[];
  monthName: string;
  month: number;
  today?: string;
}
const checkDateMonth = (date, current) =>
  current.calendar("jalali").month() < date.calendar("jalali").month();
const checkCurrentMonth = (date: Dayjs) =>
  dayjs()
    .calendar("jalali")
    .format("YYYY/MM") === date.calendar("jalali").format("YYYY/MM");

export const daysInMonth = (date: Dayjs): IDaysInMonth => {
  const days: IDays[] = [];
  const monthName = `${date
    .calendar("jalali")
    .locale("fa")
    .format("MMMM")} ${fa(date.calendar("jalali").format("YYYY"))}`;

  const month = +date
    .calendar("jalali")
    .locale("fa")
    .format("M");

  let firstDayOfWeek = date.calendar("jalali").startOf("month");
  const lastDayOfWeek = date.calendar("jalali").endOf("month");
  const today = checkCurrentMonth(date)
    ? { today: date.calendar("jalali").format("DD") }
    : null;

  firstDayOfWeek = firstDayOfWeek.subtract(
    (firstDayOfWeek.day() + 1) % 7,
    "day",
  );

  while (firstDayOfWeek.isBefore(lastDayOfWeek)) {
    days.push({
      day: firstDayOfWeek.calendar("jalali").format("DD"),
      // utc: new Date(firstDayOfWeek.clone().format("YYYY/M/DD")).toUTCString(),
      faDate: firstDayOfWeek.calendar("jalali").format("YYYY/MM/DD"),
      disable: checkDateMonth(date, firstDayOfWeek),
    });
    firstDayOfWeek = firstDayOfWeek.add(1, "day");
  }

  // tslint:disable-next-line:no-console
  // console.log("days ", { monthName, month });
  return { monthName, month, days, ...today };
};
