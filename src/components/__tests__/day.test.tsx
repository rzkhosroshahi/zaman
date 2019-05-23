import * as React from "react";
import { cleanup, render } from "react-testing-library";
import { Day } from "../Day";
import { theme } from "../../utils/testUtils";
import "jest-styled-components";

const mockDaysEvent = jest.fn();

describe("day test ", () => {
  afterEach(cleanup);
  test("day test ", () => {
    const table = document.createElement("tr");
    const { container } = render(
      <Day theme={theme} daysEvent={mockDaysEvent} holiday={[]} />,
      {
        container: table,
      },
    );
    expect(container.firstChild).toHaveStyleRule(
      "background-color",
      theme.daysBackColor,
    );
    expect(container.firstChild).toHaveStyleRule("color", theme.daysColor);
  });

  test("holiday test ", () => {
    const table = document.createElement("tr");
    const { container } = render(
      <Day theme={theme} daysEvent={mockDaysEvent} holiday={[6]} />,
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
});

describe("startEndRange tests ", () => {
  afterEach(cleanup);
  const table = document.createElement("tr");
  test("start range ", () => {
    const { container } = render(
      <Day
        theme={theme}
        holiday={[]}
        daysEvent={mockDaysEvent}
        startEndRange={{ status: "startRange" }}
      />,
      {
        container: table,
      },
    );
    expect(container.firstChild).toHaveStyleRule(
      "background-color",
      theme.startRangeBackColor,
    );
  });

  test("continue range ", () => {
    const { container } = render(
      <Day
        theme={theme}
        holiday={[]}
        daysEvent={mockDaysEvent}
        startEndRange={{ status: "continueRange" }}
      />,
      {
        container: table,
      },
    );
    expect(container.firstChild).toHaveStyleRule(
      "background-color",
      theme.continueRangeBackColor,
    );
  });
});
