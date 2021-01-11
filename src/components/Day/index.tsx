import * as React from "react";
import { IDayProps } from "./types";
import { HolidayDay, NormalDay, StartEndRangeDay, Today } from "./styled";

export const Day: React.FC<IDayProps> = props => {
  const { startEndRange, holiday, daysEvent, today } = props;
  if (startEndRange && Object.keys(startEndRange).length) {
    return <StartEndRangeDay {...props} onClick={daysEvent} />;
  } else if (holiday.length) {
    return <HolidayDay {...props} onClick={daysEvent} />;
  } else if (today) {
    return <Today {...props} onClick={daysEvent} />;
  }
  return <NormalDay {...props} onClick={daysEvent} />;
};
