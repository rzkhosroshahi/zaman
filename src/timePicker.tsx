import * as React from "react";
import styled from "./theme";
import { fa } from "./utils";
import {
  calculateOffset,
  center,
  numberPositionX,
  numberPositionY,
  radianToDeg,
} from "./utils/timePicker";

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
  insideHour?: boolean;
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

interface IHandProps {
  hour: number;
  insideHour: boolean;
}

const Hand = styled("div")<IHandProps>`
  left: calc(50% - 1px);
  width: 3px;
  bottom: 50%;
  height: ${props => (props.insideHour ? "26%" : "40%")};
  position: absolute;
  background-color: burlywood;
  transform-origin: center bottom 0;
  transition: transform 300ms cubic-bezier(0.4, 0, 0.2, 1) 0ms,
    height 300ms cubic-bezier(0.4, 0, 0.2, 1) 0ms;
  transform: ${props => `rotateZ(${(props.hour / 12) * 360}deg)`};
`;

const HandCircle = styled("div")<any>`
  top: -21px;
  left: -15px;
  width: 4px;
  height: 4px;
  border: 14px solid #7ef38b;
  position: absolute;
  box-sizing: content-box;
  border-radius: 100%;
  background-color: #7ef38b;
  pointer-events: none;
`;

interface ITimePickerProps {
  hour: number;
  minute: number;
}
interface ITimePickerState {
  hour: number;
  minute: number;
  insideHour: boolean;
}
export class TimePicker extends React.Component<
  ITimePickerProps,
  ITimePickerState
> {
  public static defaultProps: Partial<ITimePickerProps> = {
    hour: 2,
    minute: 0,
  };
  public state = {
    hour: this.props.hour,
    minute: this.props.minute,
    insideHour: false,
  };
  public changeHour = (hour: number, insideHour: boolean) => {
    this.setState(prevState => {
      if (prevState.hour !== hour) {
        return {
          insideHour,
          hour,
        };
      }
    });
  };
  public handleMouseMove = (e: React.MouseEvent) => {
    const { offsetX, offsetY } = calculateOffset(e);
    const x = offsetX - center.x;
    const y = offsetY - center.y;
    const atan = Math.PI - Math.atan2(x, y);
    const deg = radianToDeg(atan);
    const delta = Math.sqrt(Math.pow(x, 2) + Math.pow(y, 2));

    if (Math.round(delta) < 85) {
      const value = Math.round(deg * (1 / 30));
      this.changeHour(value, true);
    } else {
      const value = Math.round(deg * (1 / 30));
      this.changeHour(value + 12, false);
    }
  };
  public handleTouchMove = (e: React.TouchEvent) => {
    const { offsetX, offsetY } = calculateOffset(e);
    const x = offsetX - center.x;
    const y = offsetY - center.y;
    const atan = Math.PI - Math.atan2(x, y);
    const deg = radianToDeg(atan);
    const delta = Math.sqrt(Math.pow(x, 2) + Math.pow(y, 2));

    if (Math.round(delta) < 85) {
      const value = Math.round(deg * (1 / 30));
      this.changeHour(value, true);
    } else {
      const value = Math.round(deg * (1 / 30));
      this.changeHour(value + 12, false);
    }
  };
  public render(): React.ReactNode {
    const hours = [12, 1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11];
    const hours24 = [24, 13, 14, 15, 16, 17, 18, 19, 20, 21, 22, 23];
    const { insideHour } = this.state;
    return (
      <Clock
        onMouseUp={this.handleMouseMove}
        onTouchMove={this.handleTouchMove}
      >
        <Hand hour={this.state.hour} insideHour={insideHour}>
          <HandCircle />
        </Hand>
        {hours.map((h, i) => (
          <Numbers
            key={`rdp-time${i}`}
            idx={i}
            style={{ opacity: !insideHour ? 1 : 0.5 }}
          >
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
            style={{ opacity: insideHour ? 1 : 0.5 }}
          >
            {fa(h)}
          </Numbers>
        ))}
      </Clock>
    );
  }
}
