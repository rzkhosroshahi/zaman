import { makeRangeStatus, rangeHelper } from "../rangeHelper";
import * as moment from "jalali-moment";
import { cleanup } from "react-testing-library";

describe("rangeHelper test ", () => {
  afterEach(cleanup);
  test("range acceptance test ", () => {
    const range = {
      start: moment("Tue, 25 Dec 2018 20:01:44 GMT"),
      end: moment("Sat, 29 Dec 2018 20:01:44 GMT"),
    };
    expect(rangeHelper(range)).toEqual({
      "1397/10/04": { status: "startRange" },
      "1397/10/05": { status: "continueRange" },
      "1397/10/06": { status: "continueRange" },
      "1397/10/07": { status: "continueRange" },
      "1397/10/08": { status: "endRange" },
    });
  });

  test("when start range and end range are equal ", () => {
    const range = {
      start: moment("Tue, 25 Dec 2018 20:01:44 GMT"),
      end: moment("Tue, 25 Dec 2018 20:01:44 GMT"),
    };

    // ToDo: change this status with currentDay or something
    expect(rangeHelper(range)).toEqual({
      "1397/10/04": { status: "sameRange" },
    });
  });

  test("when end range before start ", () => {
    const range = {
      start: moment("Sat, 29 Dec 2018 20:01:44 GMT"),
      end: moment("Tue, 25 Dec 2018 20:01:44 GMT"),
    };
    expect(rangeHelper(range)).toEqual({});
  });
});

describe("rangeHelper status", () => {
  test("status ", () => {
    const range = {
      start: moment("Tue, 25 Dec 2018 20:01:44 GMT"),
      end: moment("Sat, 29 Dec 2018 20:01:44 GMT"),
    };

    expect(makeRangeStatus(range.start, range.end)).toBe("4 تا 8 دی ماه");
  });

  test("when end range before start ", () => {
    const range = {
      start: moment("Sat, 29 Dec 2018 20:01:44 GMT"),
      end: moment("Tue, 25 Dec 2018 20:01:44 GMT"),
    };
    expect(makeRangeStatus(range.start, range.end)).toEqual("8 دی ماه");
  });

  test("when start and date into separate months", () => {
    const range = {
      start: moment("Sat, 29 Dec 2018 20:01:44 GMT"),
      end: moment("Fri, 01 Feb 2019 00:41:54 GMT"),
    };
    expect(makeRangeStatus(range.start, range.end)).toEqual("8 دی تا 12 بهمن");
  });
});
