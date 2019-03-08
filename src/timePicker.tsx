import * as React from "react";
import { FunctionComponent, useState } from "react";
import { fa } from "./utils";
import { getAngelValues, hours, hours24 } from "./utils/timePicker";
import { Clock, Hand, HandCircle, Numbers } from "./timePickerCmps";

interface ITimePickerProps {
  hour?: number;
  minute?: number;
}

interface ITimePickerState {
  hourState: number;
  initialHour: number;
  insideHour: boolean;
}

export const TimePicker: FunctionComponent<ITimePickerProps> = ({
  hour = 12,
}) => {
  const [states, setState] = useState<ITimePickerState>({
    hourState: hour,
    initialHour: hour,
    insideHour: false,
  });
  const [isSelecting, setSelecting] = useState<boolean>(false);

  const changeHour = (hourValue: number, insideHourValue: boolean) => {
    setState({
      initialHour: states.hourState,
      hourState: hourValue,
      insideHour: insideHourValue,
    });
  };
  const changeHourValue = (e: React.MouseEvent | React.TouchEvent) => {
    if (!isSelecting) {
      return;
    }
    const { value, delta } = getAngelValues(e);
    if (Math.round(delta) < 85) {
      changeHour(value + 12, true);
    } else {
      changeHour(value, false);
    }
  };

  const changeHourValueClick = (e: React.MouseEvent | React.TouchEvent) => {
    const { value, delta } = getAngelValues(e);
    if (Math.round(delta) < 85) {
      changeHour(value + 12, true);
    } else {
      changeHour(value, false);
    }
  };
  return (
    <Clock
      onMouseMove={changeHourValue}
      onMouseDown={() => setSelecting(true)}
      onMouseUp={() => setSelecting(false)}
      onMouseOut={() => setSelecting(false)}
      onTouchMove={changeHourValueClick}
      onClick={changeHourValueClick}
    >
      <Hand
        hour={states.hourState}
        insideHour={states.insideHour}
        diffHours={states.initialHour}
      >
        <HandCircle />
      </Hand>
      {hours.map((h, i) => (
        <Numbers
          key={`rdp-time${i}`}
          idx={i}
          top="15%"
          clockHalfWidth={85}
          numbersPadd={10}
          style={{ opacity: states.insideHour ? 1 : 0.5 }}
        >
          {fa(h)}
        </Numbers>
      ))}
      {hours24.map((h, i) => (
        <Numbers
          key={i + 1}
          idx={i}
          style={{ opacity: !states.insideHour ? 1 : 0.5 }}
        >
          {fa(h)}
        </Numbers>
      ))}
    </Clock>
  );
};
