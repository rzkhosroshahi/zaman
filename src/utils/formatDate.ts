import * as moment from "jalali-moment";

export const formatJalaliDate = date => {
  const formattedDate = moment(`${date}`, "jYYYY/jMM/jDD");
  if (formattedDate.isValid()) {
    return formattedDate;
  }
  return null;
};
