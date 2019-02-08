import * as React from "react";
import * as moment from "jalali-moment";
import { cleanup, render, fireEvent } from "react-testing-library";
import { DatePicker } from "../datePicker";

describe("datePicker input tests", () => {
  afterEach(cleanup);
  test("default value ", () => {
    const { getByTestId } = render(<DatePicker />);
    const input = getByTestId("input-dp");
    const today = moment().format("jYYYY/jM/jD - HH:mm");
    expect((input as HTMLInputElement).value).toBe(today);
  });
  test("time stamp value ", () => {
    const date = new Date();
    const timeStamp = date.getTime();
    const { getByTestId } = render(<DatePicker value={timeStamp} />);
    const input = getByTestId("input-dp");
    const today = moment(timeStamp).format("jYYYY/jM/jD - HH:mm");
    expect((input as HTMLInputElement).value).toBe(today);
  });
  test("date value ", () => {
    const date = new Date();
    const { getByTestId } = render(<DatePicker value={date} />);
    const input = getByTestId("input-dp");
    const today = moment(date).format("jYYYY/jM/jD - HH:mm");
    expect((input as HTMLInputElement).value).toBe(today);
  });
  test("when timePicker is false ", () => {
    const { getByTestId } = render(
      <DatePicker isRenderingTimePicker={false} />,
    );
    const input = getByTestId("input-dp");
    const today = moment().format("jYYYY/jM/jD");
    expect((input as HTMLInputElement).value).toBe(today);
  });
});

describe("datePicker input tests", () => {
  afterEach(cleanup);
  test("pick day ", () => {
    const { getByTestId } = render(<DatePicker />);
    const input = getByTestId("input-dp");
    fireEvent.click(input);
    // days five
    const daysFive = getByTestId("day-5");
    fireEvent.click(daysFive);

    const dateStatus = getByTestId("days-head-range");
    expect(dateStatus.textContent).toBe("3 بهمن ماه");
  });
});
