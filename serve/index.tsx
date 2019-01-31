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
  startEndRangeColor: "#000",
  startRangeBackColor: "#04F5FF",
  endRangeBackColor: "#04F5FF",
  continueRangeBackColor: "#014B64",
  continueRangeColor: "#fff",
};

render(
  <RangeDatePicker theme={theme} start="1397/10/10" end="1397/10/20" />,
  document.getElementById("root"),
);
