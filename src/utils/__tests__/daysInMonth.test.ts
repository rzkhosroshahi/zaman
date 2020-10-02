import { daysInMonth } from "../daysInMonth";
import dayjs from "dayjs";
import isSameOrBefore from "dayjs/plugin/isSameOrBefore";
import jalaliday from "jalaliday";

dayjs.extend(jalaliday);
dayjs.extend(isSameOrBefore);

test("month name and month", () => {
  const dayjsDate = dayjs("2018/08/09", { format: "YYYY/MM/DD" });
  const date = daysInMonth(dayjsDate);
  expect(date.monthName).toBe("مرداد 1397");
  expect(date.month).toBe(5);
});

test("last month day disable property should be false", () => {
  const dayjsDate = dayjs("2018/08/09", { format: "YYYY/MM/DD" });
  const { days } = daysInMonth(dayjsDate);
  expect(days[days.length - 1].disable).toBe(false);
});

test("next month", () => {
  const dayjsDate = dayjs("2018/08/09", { format: "YYYY/MM/DD" });
  const nextMonth = dayjsDate.add(1, "month");
  const date = daysInMonth(nextMonth);
  expect(date.monthName).toBe("شهریور 1397");
  expect(date.month).toBe(6);
});

test("prev month", () => {
  const dayjsDate = dayjs("2018/08/09", { format: "YYYY/MM/DD" });
  const prevMonth = dayjsDate.subtract(1, "month");
  const date = daysInMonth(prevMonth);
  expect(date.monthName).toBe("تیر 1397");
  expect(date.month).toBe(4);
});

test("current month days should have today property", () => {
  const dayjsDate = dayjs();
  const today = dayjsDate.calendar("jalali").format("DD");
  const date = daysInMonth(dayjsDate);
  expect(date).toHaveProperty("today");
  expect(date.today).toBe(today);
});
