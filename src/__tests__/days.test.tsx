import * as React from "react";
import { cleanup, render } from "react-testing-library";
import { Days } from "../days";
import "jest-styled-components";
import { mockDays, rangeHelperMock, theme } from "../utils/testUtils";
const mockDaysEvent = jest.fn();
const Arrow = () => <p>Arrow</p>;

describe("theme test ", () => {
  afterEach(cleanup);
  test("Head test ", () => {
    const { getByTestId } = render(
      <Days
        theme={theme}
        days={mockDays}
        daysEventListeners={mockDaysEvent}
        ArrowLeft={Arrow}
        ArrowRight={Arrow}
      />,
    );
    const daysHead = getByTestId("days-head");
    const daysHeadTitle = getByTestId("days-head-title");
    const daysHeadRange = getByTestId("days-head-range");

    expect(daysHead).toHaveStyleRule("background-color", theme.headBackColor);
    expect(daysHeadTitle).toHaveStyleRule("color", theme.headTitleColor);
    expect(daysHeadRange).toHaveStyleRule(
      "background-color",
      theme.headRangeBackColor,
    );
    expect(daysHeadRange).toHaveStyleRule("color", theme.headRangeColor);
  });
});

describe("day test ", () => {
  afterEach(cleanup);

  test("when day is empty object ", () => {
    const { container } = render(
      <Days
        days={[]}
        theme={theme}
        daysEventListeners={mockDaysEvent}
        ArrowLeft={Arrow}
        ArrowRight={Arrow}
      />,
    );
    expect(container.textContent).toBe("");
  });

  test("day ", () => {
    const { getByTestId } = render(
      <Days
        days={mockDays}
        theme={theme}
        daysEventListeners={mockDaysEvent}
        ArrowLeft={Arrow}
        ArrowRight={Arrow}
      />,
    );
    const container = getByTestId("days");
    expect(container.innerHTML).toMatchSnapshot();
  });
});

describe("day withRangeDays test ", () => {
  afterEach(cleanup);
  test("startRangeDay ", () => {
    const { getByTestId } = render(
      <Days
        days={mockDays}
        theme={theme}
        rangeDays={rangeHelperMock}
        daysEventListeners={mockDaysEvent}
        ArrowLeft={Arrow}
        ArrowRight={Arrow}
      />,
    );
    const day = getByTestId("day-4");
    expect(day).toHaveStyleRule("background-color", theme.startRangeBackColor);
    expect(day).toHaveStyleRule("color", theme.startRangeColor);
  });
  test("same day ", () => {
    const { getByTestId } = render(
      <Days
        days={mockDays}
        theme={theme}
        rangeDays={{ "1397/10/02": { status: "sameRange" } }}
        daysEventListeners={mockDaysEvent}
        ArrowLeft={Arrow}
        ArrowRight={Arrow}
      />,
    );
    const day = getByTestId("day-2");
    expect(day).toHaveStyleRule("background-color", theme.sameRangeBackColor);
    expect(day).toHaveStyleRule("color", theme.sameRangeColor);
  });
});

describe("change datePicker and timePicker views", () => {
  test("should be render timePicker instead days when timePicker prop is true", () => {
    const { getByTestId } = render(
      <Days
        days={mockDays}
        theme={theme}
        rangeDays={rangeHelperMock}
        daysEventListeners={mockDaysEvent}
        ArrowLeft={Arrow}
        ArrowRight={Arrow}
        timePicker
        timePickerView
      />,
    );
    const timePicker = getByTestId("dp__timePicker");
    expect(timePicker.textContent).toBe("time picker");

    function notRendering() {
      getByTestId("table-days");
    }
    expect(notRendering).toThrowError();
  });
});
