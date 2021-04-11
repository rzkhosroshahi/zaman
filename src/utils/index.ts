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

export const toPersianDigits = (str) => {
  if (!str) return str;
  const regex = /[0-9]/g;
  const id = ["۰", "۱", "۲", "۳", "۴", "۵", "۶", "۷", "۸", "۹"];
  return str.replace(regex, function (w) {
    return id[+w];
  });
};

// prettier-ignore
export const inputFaDateMask = [/[\u06F0-\u06F1]/,/[\u06F0-\u06F4]/,/[\u06F0-\u06F9]/,/[\u06F0-\u06F9]/, '/', /[\u06F0-\u06F1]/, /[\u06F0-\u06F9]/, '/', /[\u06F0-\u06F3]/, /[\u06F0-\u06F9]/];
// prettier-ignore
export const inputEnDateMask = [/[1-2]/,/[0-9]/,/[0-9]/,/[0-9]/, '/', /[0-1]/, /[0-9]/, '/', /[0-3]/, /[0-9]/];
// prettier-ignore
export const inputFaDateWithTimeMask = [/[۰-۱]/,/[۰-۴]/,/[۰-۹]/,/[۰-۹]/, '/', /[۰-۱]/, /[۰-۹]/, '/', /[۰-۳]/, /[۰-۹]/, ' ','-',' ', /[۰-۲]/,/[۰-۹]/, ':', /[۰-۵]/,/[۰-۹]/];
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
    ? ["Su", "Mo", "Tu", "We", "Th", "Fr", "Sa"]
    : ["ش", "ی", "د", "س", "چ", "پ", "ج"];
export const weekDayNamesComplete = ({ isGregorian }) =>
  isGregorian
    ? [
        "Sunday",
        "Moday",
        "Tuesday",
        "Wendsday",
        "Thursday",
        "Friday",
        "Saturday",
      ]
    : ["شنبه", "یک‌شنبه", "دوشنبه", "سه‌شنبه", "چهارشنبه", "پنج‌شنبه", "جمعه"];
// format jalali string date into moment
export const formatDateFromString = (date, { isGregorian }) => {
  let formattedDate;
  if (typeof date === "string")
    formattedDate = moment(`${date}`, getFormatDate({ isGregorian }));
  else formattedDate = date;
  if (formattedDate.isValid()) {
    return formattedDate;
  }
  return null;
};

export const formatDateToString = (date, { isGregorian }) => {
  return date.clone().format(getFormatDate({ isGregorian }));
};
