import * as React from "react";
import styled from "./theme";

const Clock = styled.div`
  width: 260px;
  height: 260px;
  position: relative;
  z-index: 1;
  border-radius: 50%;
  background-color: #ccc;
`;

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
    return <Clock />;
  }
}
