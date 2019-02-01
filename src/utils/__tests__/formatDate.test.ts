import { formatJalaliDate } from "../utils";

test("format date jalali string to moment ", () => {
  const format = formatJalaliDate("1397/05/18");
  expect(format.format("jYYYY/jMM/jDD")).toBe("1397/05/18");
});
