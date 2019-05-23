import * as React from "react";
import * as Icons from "../Icons";
import { cleanup, render } from "react-testing-library";
import { DaysHead } from "../DaysHead";

describe("daysHead tests", () => {
  afterEach(cleanup);
  test("not rendering days head month text", () => {
    const { getByTestId } = render(
      <DaysHead
        monthName=""
        datePickerStatus=""
        timePickerView={true}
        ArrowLeft={Icons.ArrowLeftCMP}
        ArrowRight={Icons.ArrowRightCMP}
      />,
    );
    function notRendering() {
      getByTestId("days-head-title-text");
    }
    expect(notRendering).toThrowError();
  });
});
