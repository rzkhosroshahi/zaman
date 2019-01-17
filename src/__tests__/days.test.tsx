import * as React from "react";
import { cleanup, render } from "react-testing-library";
import { Days, Day } from "../Days";
import { theme } from "../theme";
import "jest-styled-components";

describe("theme test ", () => {
  afterEach(cleanup);
  test("Head test ", () => {
    const { getByTestId } = render(<Days theme={theme} />);
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
    const { container } = render(<Day theme={theme} />, {
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
    const { container } = render(<Day theme={theme} holiday />, {
      container: table,
    });
    expect(container.firstChild).toHaveStyleRule(
      "background-color",
      theme.holidaysBackColor,
    );
    expect(container.firstChild).toHaveStyleRule("color", theme.holidaysColor);
  });

  test("startEndRange test ", () => {
    const table = document.createElement("tr");
    const { container } = render(<Day theme={theme} startEndRange />, {
      container: table,
    });
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
