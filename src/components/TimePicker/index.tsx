import * as React from "react";
import { Fragment, FunctionComponent, useState } from "react";
import { fa } from "../../utils";
import { Clock, Hand, HandCircle, Numbers } from "./styled";
import { ITimePickerProps, ITimePickerState } from "./types";
import {
  getAngelValues,
  hours,
  hours24,
  minutes,
} from "../../utils/timePicker";

const Hours: FunctionComponent<{
  insideHour: boolean;
  hourSelecting: boolean;
}> = ({ insideHour, hourSelecting }) => {
  if (!hourSelecting) {
    return (
      <Fragment>
        {minutes.map((h, i) => (
          <Numbers key={`rdp-time${i}`} idx={i}>
            {fa(h)}
          </Numbers>
        ))}
      </Fragment>
    );
  }
  return (
    <Fragment>
      {hours.map((h, i) => (
        <Numbers
          key={`rdp-time${i}`}
          idx={i}
          top="15%"
          clockHalfWidth={85}
          numbersPadd={10}
          style={{ opacity: insideHour ? 1 : 0.5 }}
        >
          {fa(h)}
        </Numbers>
      ))}
      {hours24.map((h, i) => (
        <Numbers key={i + 1} idx={i} style={{ opacity: !insideHour ? 1 : 0.5 }}>
          {fa(h)}
        </Numbers>
      ))}
    </Fragment>
  );
};
export const TimePicker: FunctionComponent<ITimePickerProps> = ({
  hour = 12,
}) => {
  const [states, setState] = useState<ITimePickerState>({
    hourState: hour,
    initialHour: hour,
    insideHour: false,
  });
  const [isSelecting, setSelecting] = useState<boolean>(false);
  const [hourSelecting, setHourSelecting] = useState<boolean>(true);

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
      setHourSelecting(false);
    } else {
      changeHour(value, false);
      setHourSelecting(false);
    }
  };
  const onMouseUp = () => {
    setSelecting(false);
    setHourSelecting(false);
  };
  return (
    <Clock
      onMouseMove={changeHourValue}
      onMouseDown={() => setSelecting(true)}
      onMouseUp={onMouseUp}
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
      <Hours insideHour={states.insideHour} hourSelecting={hourSelecting} />
    </Clock>
  );
};
