import * as moment from "jalali-moment";

export const fa = (n, isGregorian) => {
  if (process.env.NODE_ENV === "test") return n;
  else if (isGregorian)
    return Number(n).toLocaleString("en", {
      useGrouping: false,
    });
  return Number(n).toLocaleString("fa", {
    useGrouping: false,
  });
};

// prettier-ignore
export const inputFaDateMask = [/[0-1]/,/[0-4]/,/[0-9]/,/[0-9]/, '/', /[0-1]/, /[0-9]/, '/', /[0-3]/, /[0-9]/];
// prettier-ignore
export const inputEnDateMask = [/[1-2]/,/[0-9]/,/[0-9]/,/[0-9]/, '/', /[0-1]/, /[0-9]/, '/', /[0-3]/, /[0-9]/];
// prettier-ignore
export const inputFaDateWithTimeMask = [/[0-1]/,/[0-4]/,/[0-9]/,/[0-9]/, '/', /[0-1]/, /[0-9]/, '/', /[0-3]/, /[0-9]/, ' ','-',' ', /[0-2]/,/[0-9]/, ':', /[0-5]/,/[0-9]/];
// prettier-ignore
export const inputEnDateWithTimeMask = [/[1-2]/,/[0-9]/,/[0-9]/,/[0-9]/, '/', /[0-1]/, /[0-9]/, '/', /[0-3]/, /[0-9]/, ' ','-',' ', /[0-2]/,/[0-9]/, ':', /[0-5]/,/[0-9]/];

// export const formatDateTime = "jYYYY/jMM/jDD - HH:mm";
// export const formatDate = "jYYYY/jMM/jDD";
export const getFormatDate = ({ isGregorian }) =>
  isGregorian ? "YYYY/MM/DD" : "jYYYY/jMM/jDD";
export const getFormatTime = () => "HH:mm";
// week days name
export const weekDayNames = ({ isGregorian }) =>
  isGregorian
    ? ["Mo", "Tu", "We", "Th", "Fr", "Sa", "Su"]
    : ["ش", "ی", "د", "س", "چ", "پ", "ج"];
// format jalali string date into moment
export const formatDateString = (date, { isGregorian }) => {
  const formattedDate = moment(`${date}`, getFormatDate({ isGregorian }));
  if (formattedDate.isValid()) {
    return formattedDate;
  }
  return null;
};
