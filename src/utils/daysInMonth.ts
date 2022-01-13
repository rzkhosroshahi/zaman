import * as moment from "jalali-moment";
import { Moment } from "jalali-moment";
import { fa } from "./index";

export interface IDays {
  day: string;
  utc: string;
  faDate: string;
  disable: boolean;
  inactive: boolean;
}

export interface IDaysInMonth {
  days: IDays[];
  monthName: string;
  month: number;
  today?: string;
}

const checkDateMonth = (date, current) => current.jMonth() < date.jMonth();
const checkCurrentMonth = (date: Moment) =>
  moment().format("jYYYY/jMM") === date.format("jYYYY/jMM");

export const daysInMonth = (
  date: Moment,
  limitStartDate?: Moment,
  limitEndDate?: Moment,
): IDaysInMonth => {
  const days: IDays[] = [];
  const clonedDate = date.clone();
  const monthName = `${clonedDate.locale("fa").format("jMMMM")} ${fa(
    clonedDate.format("jYYYY"),
  )}`;

  const month = Number(
    date
      .clone()
      .locale("fa")
      .format("jM"),
  );

  const firstDayOfWeek = date.clone().startOf("jMonth");
  const lastDayOfWeek = date.clone().endOf("jMonth");
  const today = checkCurrentMonth(date) ? { today: date.format("jDD") } : null;
  firstDayOfWeek.subtract((firstDayOfWeek.day() + 1) % 7, "days");

  while (firstDayOfWeek.isBefore(lastDayOfWeek)) {
    days.push({
      day: firstDayOfWeek.clone().format("jDD"),
      utc: new Date(firstDayOfWeek.clone().format("YYYY/M/DD")).toUTCString(),
      faDate: firstDayOfWeek.clone().format("jYYYY/jMM/jDD"),
      disable: checkDateMonth(date, firstDayOfWeek),
      inactive: limitStartDate
        ? !(
            firstDayOfWeek.isSameOrAfter(limitStartDate) &&
            firstDayOfWeek.isSameOrBefore(limitEndDate)
          )
        : null,
    });

    firstDayOfWeek.add(1, "days");
  }

  // console.log("days ", { monthName, month });
  return { monthName, month, days, ...today };
};
