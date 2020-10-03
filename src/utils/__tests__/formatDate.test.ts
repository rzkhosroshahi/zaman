import { formatJalaliDate } from "../index";
import dayjs from "dayjs";
import isSameOrBefore from "dayjs/plugin/isSameOrBefore";
import jalaliday from "jalaliday";

dayjs.extend(jalaliday);
dayjs.extend(isSameOrBefore);

test("format date jalali string to DayJS ", () => {
  const format = formatJalaliDate("1397/05/18");
  expect(format.calendar("jalali").format("YYYY/MM/DD")).toBe("1397/05/18");
});
