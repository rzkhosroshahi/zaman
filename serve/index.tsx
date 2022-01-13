import * as React from "react";
import { render } from "react-dom";
import { DatePicker } from "../src";
import moment = require("jalali-moment");

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
  daysRound: "50%",

  // start end
  startRangeBackColor: "#04F5FF",
  startRangeColor: "#000",
  endRangeBackColor: "#04F5FF",
  endRangeColor: "#000",
  continueRangeBackColor: "#014B64",
  continueRangeColor: "#fff",
  sameRangeBackColor: "#00213E",
  sameRangeColor: "#04F5FF",
  // buttons
  submitBackColor: "#04F5FF",
  submitHoverBackColor: "#014B64",
  submitColor: "#000",
  submitHoverColor: "#fff",
  cancelBackColor: "#00213E",
  cancelHoverBackColor: "#04F5FF",
  cancelColor: "#fff",
  cancelHoverColor: "#000",
};

render(
  <DatePicker
  /*limitStart={moment.from("1400/10/11", "fa", "YYYY/MM/DD")}
    limitEnd={moment.from("1400/10/30", "fa", "YYYY/MM/DD")}
    timePicker={false} // to disable timePicker*/
  />,
  document.getElementById("root"),
);
