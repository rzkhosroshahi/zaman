import * as React from "react";
import { render, fireEvent, cleanup } from "react-testing-library";
import { RangeDatePicker } from "../rangeDatePicker";
import "jest-styled-components";
import { theme } from "../utils/testUtils";

describe("input tests ", () => {
  afterEach(cleanup);
  test("start and end input value ", () => {
    const { getByTestId } = render(
      <RangeDatePicker start="1397/02/12" end="1397/02/14" />,
    );
    const inputStart = getByTestId("input-start");
    const inputEnd = getByTestId("input-end");

    expect((inputStart as HTMLInputElement).value).toBe("1397/02/12");
    expect((inputEnd as HTMLInputElement).value).toBe("1397/02/14");
  });

  test("change start values in onChange event", () => {
    const { getByTestId } = render(
      <RangeDatePicker start="1397/02/12" end="1397/02/14" />,
    );
    const inputStart = getByTestId("input-start");
    const inputEnd = getByTestId("input-end");

    fireEvent.change(inputEnd, { target: { value: "1397/02/18" } });
    expect((inputEnd as HTMLInputElement).value).toBe("1397/02/18");

    fireEvent.change(inputStart, { target: { value: "1397/02/10" } });
    expect((inputStart as HTMLInputElement).value).toBe("1397/02/10");
  });
});

describe("RangeDatePicker days test", () => {
  afterEach(cleanup);
  test("change start days inside rangeDatePicker by clicking on the day ", () => {
    const { getByTestId } = render(
      <RangeDatePicker start="1397/10/12" end="1397/10/16" />,
    );
    const inputStart = getByTestId("input-start");
    fireEvent.click(inputStart);
    const day = getByTestId("day-16");
    fireEvent.click(day);

    expect(day).toHaveStyleRule("background-color", theme.startEndDayBackColor);

    const hoveredDay = getByTestId("day-19");
    fireEvent.mouseOver(hoveredDay);
    expect(hoveredDay).toHaveStyleRule(
      "background-color",
      theme.startEndDayBackColor,
    );
  });
});
