import * as React from "react";
import { IDayProps } from "./types";
import { HolidayDay, Inactive, NormalDay, StartEndRangeDay } from "./styled";

export const Day: React.SFC<IDayProps> = props => {
  const { startEndRange, holiday, daysEvent, inactive } = props;
  if (inactive) {
    return <Inactive {...props} {...daysEvent()} onClick={null} />;
  } else if (startEndRange && Object.keys(startEndRange).length) {
    return <StartEndRangeDay {...props} {...daysEvent()} />;
  } else if (holiday.length) {
    return <HolidayDay {...props} {...daysEvent()} />;
  }
  return <NormalDay {...props} {...daysEvent()} />;
};
