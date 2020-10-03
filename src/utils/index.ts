import dayjs from "dayjs";

export const fa = n => {
  if (process.env.NODE_ENV) {
    return n;
  }
  return Number(n).toLocaleString("fa", {
    useGrouping: false,
  });
};

// prettier-ignore
export const inputFaDateMask = [/[0-1]/,/[0-4]/,/[0-9]/,/[0-9]/, '/', /[0-1]/, /[0-9]/, '/', /[0-3]/, /[0-9]/];
// prettier-ignore
export const inputFaDateWithTimeMask = [/[0-1]/,/[0-4]/,/[0-9]/,/[0-9]/, '/', /[0-1]/, /[0-9]/, '/', /[0-3]/, /[0-9]/, ' ','-',' ', /[0-2]/,/[0-9]/, ':', /[0-5]/,/[0-9]/];
export const formatDateTime = "YYYY/MM/DD - HH:mm";
export const formatDate = "YYYY/MM/DD";
// week days name
export const weekDayNames = ["ش", "ی", "د", "س", "چ", "پ", "ج"];
// format jalali string date into DayJS
export const formatJalaliDate = date => {
  // @ts-ignore
  const formattedDate = dayjs(date, { jalali: true, format: "YYYY/MM/DD" });

  if (formattedDate.isValid()) {
    return formattedDate;
  }
  return null;
};
