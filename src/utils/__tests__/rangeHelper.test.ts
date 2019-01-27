import { rangeHelper } from "../rangeHelper";
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
    expect(rangeHelper(range)).toEqual({});
  });

  test("when end range before start ", () => {
    const range = {
      start: moment("Sat, 29 Dec 2018 20:01:44 GMT"),
      end: moment("Tue, 25 Dec 2018 20:01:44 GMT"),
    };
    expect(rangeHelper(range)).toEqual({});
  });
});
