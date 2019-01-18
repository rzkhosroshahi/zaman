import * as React from "react";
import { cleanup, render } from "react-testing-library";
import { Days, Day } from "../Days";
import "jest-styled-components";
import { mockDays, theme } from "../utils/testUtils";

describe("theme test ", () => {
  afterEach(cleanup);
  test("Head test ", () => {
    const { getByTestId } = render(<Days theme={theme} days={mockDays} />);
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

  test("day test ", () => {
    const table = document.createElement("tr");
    const { container } = render(<Day theme={theme} days={mockDays} />, {
      container: table,
    });
    expect(container.firstChild).toHaveStyleRule(
      "background-color",
      theme.daysBackColor,
    );
    expect(container.firstChild).toHaveStyleRule("color", theme.daysColor);
  });

  test("holiday test ", () => {
    const table = document.createElement("tr");
    const { container } = render(
      <Day theme={theme} days={mockDays} holiday />,
      {
        container: table,
      },
    );
    expect(container.firstChild).toHaveStyleRule(
      "background-color",
      theme.holidaysBackColor,
    );
    expect(container.firstChild).toHaveStyleRule("color", theme.holidaysColor);
  });

  test("startEndRange test ", () => {
    const table = document.createElement("tr");
    const { container } = render(
      <Day days={mockDays} theme={theme} startEndRange />,
      {
        container: table,
      },
    );
    expect(container.firstChild).toHaveStyleRule(
      "background-color",
      theme.startEndDayBackColor,
    );
    expect(container.firstChild).toHaveStyleRule(
      "color",
      theme.startEndDayColor,
    );
  });
});

describe("day test ", () => {
  afterEach(cleanup);

  test("when day is empty object ", () => {
    const { container } = render(<Days days={[]} />);
    expect(container.textContent).toBe("");
  });
});
