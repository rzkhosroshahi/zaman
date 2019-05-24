import * as React from "react";
import { hours, hours24, minutes } from "../../utils/timePicker";
import { Numbers } from "./styled";
import { fa } from "../../utils";

export const Hours: React.FunctionComponent<{
  insideHour: boolean;
  hourSelecting: boolean;
  hour: number;
  minute: number;
}> = ({ insideHour, hourSelecting, minute, hour }) => {
  if (!hourSelecting) {
    return (
      <React.Fragment>
        {minutes.map((m, i) => (
          <Numbers key={`rdp-time${i}`} idx={i} isSelectedNumber={minute === m}>
            {fa(m)}
          </Numbers>
        ))}
      </React.Fragment>
    );
  }
  return (
    <React.Fragment>
      {hours.map((h, i) => (
        <Numbers
          key={`rdp-time${i}`}
          idx={i}
          top="15%"
          clockHalfWidth={85}
          numbersPadd={10}
          style={{ opacity: insideHour ? 1 : 0.3 }}
          isSelectedNumber={hour === h}
        >
          {fa(h)}
        </Numbers>
      ))}
      {hours24.map((h, i) => (
        <Numbers
          key={i + 1}
          idx={i}
          style={{ opacity: !insideHour ? 1 : 0.3 }}
          isSelectedNumber={hour === h}
        >
          {fa(h)}
        </Numbers>
      ))}
    </React.Fragment>
  );
};
