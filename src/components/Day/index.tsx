import * as React from "react";
import { IDayProps } from "./types";
import { HolidayDay, NormalDay, StartEndRangeDay, Today } from "./styled";

export const Day: React.FC<IDayProps> = (props) => {
  const { startEndRange, holiday, daysEvent, today } = props;
  if (startEndRange && Object.keys(startEndRange).length) {
    return <StartEndRangeDay {...props} {...daysEvent()} />;
  } else if (holiday) {
    return <HolidayDay {...props} {...daysEvent()} />;
  } else if (today) {
    return <Today {...props} {...daysEvent()} />;
  }
  return <NormalDay {...props} {...daysEvent()} />;
};
