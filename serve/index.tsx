import * as React from "react";
import { render } from "react-dom";
import { RangeDatePicker } from "../src";

// my favorite theme 😌
const theme = {
  backColor: "#00213E",
  // head
  headBackColor: "#00213E",
  headTitleColor: "#ffff",
  headArrowColor: "#fff",
  headRangeBackColor: "#04F5FF",
  headRangeColor: "#333",

  // weekdays color
  weekDaysColor: "#ACACAC",

  // days
  daysColor: "#fff",
  daysBackColor: "#00213E",
  holidaysColor: "#F50057",
  holidaysBackColor: "#00213E",

  // start end
  startRangeBackColor: "#04F5FF",
  startRangeColor: "#000",
  endRangeBackColor: "#04F5FF",
  endRangeColor: "#000",
  continueRangeBackColor: "#014B64",
  continueRangeColor: "#fff",
  sameRangeBackColor: "#00213E",
  sameRangeColor: "#04F5FF",
};

render(<RangeDatePicker />, document.getElementById("root"));
