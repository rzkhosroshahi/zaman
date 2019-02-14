import * as React from "react";
import styled from "./theme";
import { fa } from "./utils";
import { numberPositionX, numberPositionY } from "./utils/timePicker";

const Clock = styled.div`
  width: 260px;
  height: 260px;
  position: relative;
  z-index: 1;
  border-radius: 50%;
  background-color: #ccc;
`;

interface INumbersProps {
  idx: number;
  clockHalfWidth?: number;
  numbersPadd?: number;
  top?: string;
}
const Numbers = styled("span")<INumbersProps>`
  left: calc(50% - 16px);
  top: ${props => props.top};
  width: 32px;
  color: rgba(0, 0, 0, 0.87);
  height: 32px;
  display: inline-flex;
  position: absolute;
  align-items: center;
  border-radius: 50%;
  justify-content: center;
  user-select: none;
  pointer-events: none;
  transform: ${props =>
    `translate(${numberPositionX(
      props.idx,
      props.clockHalfWidth,
      props.numbersPadd,
    )}px,
  	  ${numberPositionY(props.idx, props.clockHalfWidth, props.numbersPadd)}px)`};
`;
Numbers.defaultProps = {
  clockHalfWidth: 130,
  numbersPadd: 20,
  top: "2%",
};

interface ITimePickerProps {
  hour: number;
  minute: number;
}
interface ITimePickerState {
  hour: number;
  minute: number;
}
export class TimePicker extends React.Component<
  ITimePickerProps,
  ITimePickerState
> {
  public static defaultProps: Partial<ITimePickerProps> = {
    hour: 12,
    minute: 0,
  };
  public state = {
    hour: this.props.hour,
    minute: this.props.minute,
  };
  public render(): React.ReactNode {
    const hours = [12, 1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11];
    const hours24 = [24, 13, 14, 15, 16, 17, 18, 19, 20, 21, 22, 23];
    return (
      <Clock>
        {hours.map((h, i) => (
          <Numbers key={`rdp-time${i}`} idx={i}>
            {fa(h)}
          </Numbers>
        ))}
        {hours24.map((h, i) => (
          <Numbers
            key={i + 1}
            idx={i}
            top="15%"
            clockHalfWidth={85}
            numbersPadd={10}
          >
            {fa(h)}
          </Numbers>
        ))}
      </Clock>
    );
  }
}
