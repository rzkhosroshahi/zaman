import * as moment from "jalali-moment";

export const formatJalaliDate = date => {
  if (date) {
    return moment(`${date}`, "jYYYY/jMM/jDD");
  }
  return null;
};
