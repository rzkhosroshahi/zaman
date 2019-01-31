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
        daysEvent={mockDaysEvent}
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
        daysEvent={mockDaysEvent}
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
        daysEvent={mockDaysEvent}
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

  const { getByTestId } = render(
    <Days
      days={mockDays}
      theme={theme}
      rangeDays={rangeHelperMock}
      daysEvent={mockDaysEvent}
      ArrowLeft={Arrow}
      ArrowRight={Arrow}
    />,
  );
  const day = getByTestId("day-4");
  expect(day).toHaveStyleRule("background-color", theme.startRangeBackColor);
});
