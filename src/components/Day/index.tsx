import * as React from "react";
import { IDayProps } from "./types";
import { HolidayDay, NormalDay, StartEndRangeDay } from "./styled";

export const Day: React.SFC<IDayProps> = props => {
  const { startEndRange, holiday, daysEvent } = props;
  if (startEndRange && Object.keys(startEndRange).length) {
    return <StartEndRangeDay {...props} onClick={daysEvent} />;
  } else if (holiday.length) {
    return <HolidayDay {...props} onClick={daysEvent} />;
  }
  return <NormalDay {...props} onClick={daysEvent} />;
};
