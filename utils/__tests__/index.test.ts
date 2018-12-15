import { daysInMonth } from "../index";
import * as moment from "jalali-moment";

test("month name and month", () => {
  const momentDate = moment("2018/08/09", "YYYY/MM/DD");
  const date = daysInMonth(momentDate);
  expect(date.monthName).toBe("مرداد");
  expect(date.month).toBe(5);
});

test("last month day disable property should be false", () => {
  const momentDate = moment("2018/08/09", "YYYY/MM/DD");
  const { days } = daysInMonth(momentDate);
  expect(days[days.length - 1].disable).toBe(false);
});

test("next month", () => {
  const momentDate = moment("2018/08/09", "YYYY/MM/DD");
  const nextMonth = momentDate.clone().add(1, "month");
  const date = daysInMonth(nextMonth);
  expect(date.monthName).toBe("شهریور");
  expect(date.month).toBe(6);
});

test("prev month", () => {
  const momentDate = moment("2018/08/09", "YYYY/MM/DD");
  const prevMonth = momentDate.clone().subtract(1, "month");
  const date = daysInMonth(prevMonth);
  expect(date.monthName).toBe("تیر");
  expect(date.month).toBe(4);
});

test("current month days should have today property", () => {
  const momentDate = moment();
  const today = momentDate.format("jDD");
  const date = daysInMonth(momentDate);
  expect(date).toHaveProperty("today");
  expect(date.today).toBe(today);
});
