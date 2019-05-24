import * as React from "react";
import * as moment from "jalali-moment";
import { cleanup, render, fireEvent } from "react-testing-library";
import { DatePicker } from "../DatePicker";
import "jest-styled-components";
import { defaultDatePickerTheme } from "../../theme";

afterEach(cleanup);
describe("datePicker input tests", () => {
  afterEach(cleanup);
  test("default value ", () => {
    const { getByTestId } = render(<DatePicker />);
    const input = getByTestId("input-dp");
    const today = moment().format("jYYYY/jMM/jDD - HH:mm");
    expect((input as HTMLInputElement).value).toBe(today);
  });
  test("time stamp value ", () => {
    const date = new Date();
    const timeStamp = date.getTime();
    const { getByTestId } = render(<DatePicker value={timeStamp} />);
    const input = getByTestId("input-dp");
    const today = moment(timeStamp).format("jYYYY/jMM/jDD - HH:mm");
    expect((input as HTMLInputElement).value).toBe(today);
  });
  test("date value ", () => {
    const date = new Date();
    const { getByTestId } = render(<DatePicker value={date} />);
    const input = getByTestId("input-dp");
    const today = moment(date).format("jYYYY/jMM/jDD - HH:mm");
    expect((input as HTMLInputElement).value).toBe(today);
  });
  test("when timePicker is false ", () => {
    const { getByTestId } = render(<DatePicker timePicker={false} />);
    const input = getByTestId("input-dp");
    const today = moment().format("jYYYY/jMM/jDD");
    expect((input as HTMLInputElement).value).toBe(today);
  });
});

describe("arrows tests", () => {
  afterEach(cleanup);

  test("clicking on left arrow ", () => {
    const { getByTestId } = render(<DatePicker value={1549706122624} />);
    const inputStart = getByTestId("input-dp");
    fireEvent.click(inputStart);

    const arrowRight = getByTestId("arrow-left");
    fireEvent.click(arrowRight);
    const headTitleText = getByTestId("days-head-title-text");

    expect(headTitleText.textContent).toBe("اسفند 1397");
  });

  test("clicking on left arrow ", () => {
    const { getByTestId } = render(<DatePicker value={1549706122624} />);
    const inputStart = getByTestId("input-dp");
    fireEvent.click(inputStart);

    const arrowRight = getByTestId("arrow-right");
    fireEvent.click(arrowRight);
    const headTitleText = getByTestId("days-head-title-text");

    expect(headTitleText.textContent).toBe("دی 1397");
  });
});

describe("datePicker input tests", () => {
  afterEach(cleanup);
  test("pick day ", () => {
    const { getByTestId } = render(<DatePicker value={1549706122624} />);
    const input = getByTestId("input-dp");
    fireEvent.click(input);
    // days five
    const daysFive = getByTestId("day-5");
    fireEvent.click(daysFive);

    const dateStatus = getByTestId("days-head-range");
    expect(dateStatus.textContent).toBe("3 بهمن ماه");
    expect(dateStatus).toHaveStyleRule(
      "background-color",
      defaultDatePickerTheme.selectDayBackColor,
    );
  });
});

describe("submit and cancel buttons tests", () => {
  afterEach(cleanup);
  test("submit button", () => {
    const { getByTestId } = render(
      <DatePicker value={1549706122624} timePicker={false} />,
    );
    const input = getByTestId("input-dp");
    fireEvent.click(input);

    // days five
    const daysFive = getByTestId("day-5");
    fireEvent.click(daysFive);
    expect((input as HTMLInputElement).value).toBe("1397/11/03");
    // cancel button
    const submitButton = getByTestId("submit-button");
    fireEvent.click(submitButton);
    expect((input as HTMLInputElement).value).toBe("1397/11/03");
  });
  test("cancel button", () => {
    const { getByTestId } = render(
      <DatePicker value={1549706122624} timePicker={false} />,
    );
    const input = getByTestId("input-dp");
    fireEvent.click(input);

    // days five
    const daysFive = getByTestId("day-5");
    fireEvent.click(daysFive);
    expect((input as HTMLInputElement).value).toBe("1397/11/03");
    // cancel button
    const cancelButton = getByTestId("cancel-button");
    fireEvent.click(cancelButton);
    expect((input as HTMLInputElement).value).toBe("1397/11/20");
  });
});

test("should be show timePicker when clicked on toggle-view button", () => {
  const { getByTestId } = render(<DatePicker />);
  const input = getByTestId("input-dp");
  fireEvent.click(input);
  const toggleViewBtn = getByTestId("toggle-view");
  fireEvent.click(toggleViewBtn);

  expect(getByTestId("dp__timePicker")).toBeTruthy();
});
