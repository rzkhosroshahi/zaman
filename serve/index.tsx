import * as React from "react";
import { render } from "react-dom";
import { DatePicker } from "../dist/index";

function test(dish) {
  console.log("dish ", dish);
}
render(<DatePicker daysOnClick={test} />, document.getElementById("root"));
