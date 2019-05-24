import * as React from "react";
import { Clock, HandCircle } from "./styled";
import { ITimePickerProps, ITimePickerState } from "./types";
import { getAngelValues } from "../../utils/timePicker";
import { Hours } from "./Hour";
import { Hand } from "./Hand";

export class TimePicker extends React.PureComponent<
  ITimePickerProps,
  ITimePickerState
> {
  constructor(props) {
    super(props);
    this.state = {
      hour: props.hour,
      minute: props.minute,
      isInsideHour: false,
      isSelectingHour: true,
      isSelecting: false,
    };
  }
  public componentDidUpdate(
    prevProps: Readonly<ITimePickerProps>,
    prevState: Readonly<ITimePickerState>,
    snapshot?: any,
  ): void {
    const { changeHour, changeMinute } = this.props;
    if (this.state.hour !== prevState.hour) {
      changeHour(this.state.hour);
    }
    if (this.state.minute !== prevState.minute) {
      changeMinute(this.state.minute);
    }
  }

  public changeHourState = (
    e: React.MouseEvent | React.TouchEvent,
    withClick: boolean,
  ) => {
    if (!withClick && !this.state.isSelecting) {
      return;
    }
    const { value, delta } = getAngelValues(e);
    if (Math.round(delta) < 85) {
      this.setState({
        hour: value,
        isInsideHour: true,
        isSelectingHour: !withClick,
      });
    } else {
      this.setState({
        hour: value + 12,
        isInsideHour: false,
        isSelectingHour: !withClick,
      });
    }
  };
  public changeMinuteState = (e: React.MouseEvent | React.TouchEvent) => {
    if (!this.state.isSelecting) {
      return;
    }
    const { value } = getAngelValues(e, 6);
    this.setState({
      minute: value,
    });
  };
  public decisions = (
    e: React.MouseEvent | React.TouchEvent,
    withClick: boolean,
  ) => {
    if (this.state.isSelectingHour) {
      return this.changeHourState(e, withClick);
    }
    return this.changeMinuteState(e);
  };

  public setSelecting = (value: boolean) => {
    this.setState({
      isSelecting: value,
    });
  };

  public onMouseUp = () => {
    this.setState({
      isSelecting: false,
      isSelectingHour: false,
    });
  };
  public render() {
    return (
      <Clock
        onMouseMove={e => this.decisions(e, false)}
        onMouseDown={() => this.setSelecting(true)}
        onMouseUp={this.onMouseUp}
        onTouchMove={e => this.decisions(e, false)}
        onTouchStart={() => this.setSelecting(true)}
        onTouchEnd={() => this.setState({ isSelectingHour: false })}
        onClick={e => this.decisions(e, true)}
      >
        <Hand
          hour={this.state.hour}
          minute={this.state.minute}
          isSelectingHour={this.state.isSelectingHour}
          isInsideHour={this.state.isInsideHour}
        >
          <HandCircle />
        </Hand>
        <Hours
          insideHour={this.state.isInsideHour}
          hourSelecting={this.state.isSelectingHour}
        />
      </Clock>
    );
  }
}
