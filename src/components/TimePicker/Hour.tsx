import * as React from "react";
import { hours, hours24, minutes } from "../../utils/timePicker";
import { MinuteWithAnimation, Numbers } from "./styled";
import { fa } from "../../utils";

const convertNumberValue = (n: number, isGregorian: boolean): string => {
  if (n === 24 || n === 0) {
    return `۰۰`;
  }
  return fa(n, isGregorian);
};

export const Hours: React.FC<{
  insideHour: boolean;
  hourSelecting: boolean;
  hour: number;
  minute: number;
  isGregorian: boolean;
}> = ({ insideHour, hourSelecting, minute, hour, isGregorian }) => {
  if (!hourSelecting) {
    return (
      <MinuteWithAnimation>
        {minutes.map((m, i) => (
          <Numbers key={m} idx={i}>
            {convertNumberValue(m, isGregorian)}
          </Numbers>
        ))}
      </MinuteWithAnimation>
    );
  }
  return (
    <React.Fragment>
      {hours.map((h, i) => (
        <Numbers
          key={h}
          idx={i}
          top="16%"
          clockHalfWidth={85}
          numbersPadd={10}
          style={{ opacity: insideHour ? 1 : 0.3 }}
        >
          {convertNumberValue(h, isGregorian)}
        </Numbers>
      ))}
      {hours24.map((h, i) => (
        <Numbers key={h} idx={i} style={{ opacity: !insideHour ? 1 : 0.3 }}>
          {convertNumberValue(h, isGregorian)}
        </Numbers>
      ))}
    </React.Fragment>
  );
};
