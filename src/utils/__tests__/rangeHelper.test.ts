import { rangeHelper } from "../rangeHelper";
import * as moment from "jalali-moment";

const range = {
  start: moment("Tue, 25 Dec 2018 20:01:44 GMT"),
  end: moment("Sat, 29 Dec 2018 20:01:44 GMT"),
};

test("acceptance test", () => {
  expect(rangeHelper(range)).toEqual({
    "1397/10/04": { status: "startRange" },
    "1397/10/05": { status: "beginningRange" },
    "1397/10/06": { status: "beginningRange" },
    "1397/10/07": { status: "beginningRange" },
    "1397/10/08": { status: "endRange" },
  });
});
