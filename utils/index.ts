import * as moment from "jalali-moment";
import { Moment } from "jalali-moment";
import { fa } from "./utils";

export interface IDays {
  day: string;
  enDate: Date;
  disable: boolean;
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

export const daysInMonth = (date: Moment): IDaysInMonth => {
  const days: IDays[] = [];
  const monthName = date
    .clone()
    .locale("fa")
    .format("jMMMM");
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
      day: fa(firstDayOfWeek.clone().format("jDD")),
      enDate: new Date(firstDayOfWeek.clone().format("YYYY/M/DD")),
      disable: checkDateMonth(date, firstDayOfWeek),
    });
    firstDayOfWeek.add(1, "days");
  }

  // tslint:disable-next-line:no-console
  // console.log("days ", { monthName, month, days });
  return { monthName, month, days, ...today };
};
