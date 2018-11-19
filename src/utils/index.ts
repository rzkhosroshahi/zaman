import moment from "moment-jalaali";
moment.loadPersian({ usePersianDigits: false, dialect: "persian-modern" });

export interface IMonth {
  stringDay: string | null;
  dayInMonth: number;
  enDate: Date;
  faDate: moment;
}

export const toStringDay = num => {
  switch (num) {
    case 0:
      return "یکشنبه";
    case 1:
      return "دوشنبه";
    case 2:
      return "سه‌شنبه";
    case 3:
      return "چهار‌شنبه";
    case 4:
      return "پنجشنبه";
    case 5:
      return "جمعه";
    case 6:
      return "شنبه";
    default:
      return null;
  }
};

export const makeDatesWithMonth = (year: number, month: number) => {
  const m = moment(`${year}/${month}/1`, "jYYYY/jM/jDD");
  const monthDays: IMonth[] = [];
  const daysInMonth = moment.jDaysInMonth(m.jYear(), m.jMonth());

  let i = 1;
  while (i <= daysInMonth) {
    monthDays.push({
      stringDay: toStringDay(m.day()),
      dayInMonth: m.format("jD"),
      enDate: new Date(m.format("YYYY-M-D")),
      faDate: m.format("jYYYY/jM/jDD"),
    });
    m.add(1, "day");
    i++;
  }

  return { monthName: m.format("jMMMM"), monthDays };
};
