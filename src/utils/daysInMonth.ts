import * as moment from "jalali-moment";
import { Moment } from "jalali-moment";
import { IDatePickerProps } from "../components/DatePicker/types";
import { fa, formatDate, formatJalaliDate } from "./index";

export interface IDays {
  day: string;
  utc: string;
  faDate: string;
  disable: boolean;
  exclude: boolean;
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

export const getExcludeDates = excludeDates => {
  if (!excludeDates) return []
  excludeDates.map(date => {
  let mDate;
  if (moment.isMoment(date)) 
  mDate = date.locale('fa');
  else if (date instanceof Date) 
  mDate = moment(date as Date).locale('fa');
  else if (typeof date == "string" && formatJalaliDate(date)) 
  mDate = moment(date).locale('fa');

  return mDate.format("jYYYY/jMM/jDD")
}).filter(Boolean);
}
export const checkExcludeDate = (excludeDates: string[], date: Moment) => excludeDates.some(exDate => formatJalaliDate(exDate) && exDate == date.format(formatDate))

export const daysInMonth = (
  date: Moment,
  excludeDates?: IDatePickerProps["excludeDates"],
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

  const excludeDatesJMoment = getExcludeDates(excludeDates)

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
      exclude: !!(excludeDatesJMoment?.some(date => date == firstDayOfWeek.format("jYYYY/jMM/jDD")))
    });
    firstDayOfWeek.add(1, "days");
  }

  // tslint:disable-next-line:no-console
  // console.log("days ", { monthName, month });
  return { monthName, month, days, ...today };
};
