import * as React from "react";
import { render } from "react-testing-library";
import { RangeDatePicker } from "../rangeDatePicker";

test("start and end input value ", () => {
  const { getByTestId } = render(
    <RangeDatePicker start="1397/02/12" end="1397/02/14" />,
  );
  const inputStart = getByTestId("input-start");
  const inputEnd = getByTestId("input-end");

  expect((inputStart as HTMLInputElement).value).toBe("1397/02/12");
  expect((inputEnd as HTMLInputElement).value).toBe("1397/02/14");
});
