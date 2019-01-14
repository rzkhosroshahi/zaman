import * as React from "react";
import { render } from "react-testing-library";
import { RangeDatePicker } from "../rangeDatePicker";

test("start input value ", () => {
  const { getByTestId } = render(<RangeDatePicker startDate="1397/02/12" />);
  const inputStart = getByTestId("input-start");
  expect((inputStart as HTMLInputElement).value).toBe("1397/02/12");
});
