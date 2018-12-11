import { Moment } from "jalali-moment";

export interface IDays {
  day: string;
  enDate: Date;
  disable: boolean;
}

export interface IDaysInMonth {
  days: IDays[];
  monthName: string;
}

const checkDateMonth = (date, current) => current.jMonth() < date.jMonth();

export const daysInMonth = (date: Moment): IDaysInMonth => {
  const days: IDays[] = [];
  const monthName = date
    .clone()
    .locale("fa")
    .format("jMMMM");

  const firstDayOfWeek = date.clone().startOf("jMonth");
  const lastDayOfWeek = date.clone().endOf("jMonth");

  firstDayOfWeek.subtract((firstDayOfWeek.day() + 1) % 7, "days");

  while (firstDayOfWeek.isBefore(lastDayOfWeek)) {
    days.push({
      day: firstDayOfWeek.clone().format("jDD"),
      enDate: new Date(firstDayOfWeek.clone().format("YYYY/M/DD")),
      disable: checkDateMonth(date, firstDayOfWeek),
    });
    firstDayOfWeek.add(1, "days");
  }

  // tslint:disable-next-line:no-console
  console.log("days ", { monthName, days });
  return { monthName, days };
};
