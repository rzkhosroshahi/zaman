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
      isInsideHour: props.hour < 13,
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
  public setMinute = (e: React.MouseEvent | React.TouchEvent) => {
    const { value } = getAngelValues(e, 6);
    this.setState({
      minute: value,
    });
  };

  public setHour = (e: React.MouseEvent | React.TouchEvent) => {
    const { value, delta } = getAngelValues(e);
    if (Math.round(delta) < 85) {
      this.setState({
        hour: value,
        isInsideHour: true,
      });
    } else {
      this.setState({
        hour: value,
        isInsideHour: false,
      });
    }
  };

  public handleMouseMove = (e: React.MouseEvent) => {
    e.preventDefault();
    if (!this.state.isSelecting) {
      return;
    }
    if (this.state.isSelectingHour) {
      return this.setHour(e);
    }
    return this.setMinute(e);
  };

  public handleMouseUp = () => {
    this.setState({ isSelecting: false, isSelectingHour: false });
  };

  public handleMouseDown = e => {
    this.setState({
      isSelecting: true,
    });
    if (this.state.isSelectingHour) {
      return this.setHour(e);
    } else {
      return this.setMinute(e);
    }
  };

  public handleTouchMove = (e: React.TouchEvent) => {
    e.preventDefault();
    this.setState({ isSelecting: true });
    if (this.state.isSelectingHour) {
      return this.setHour(e);
    }
    return this.setMinute(e);
  };

  public handleTouchEnd = () => {
    this.setState({
      isSelecting: false,
    });
  };

  public render() {
    return (
      <Clock
        onMouseMove={this.handleMouseMove}
        onMouseUp={this.handleMouseUp}
        onMouseDown={this.handleMouseDown}
        // touch events
        onTouchMove={this.handleTouchMove}
        onTouchEnd={this.handleTouchEnd}
        data-testid="dp__clock"
      >
        <Hand
          hour={this.state.hour}
          minute={this.state.minute}
          isSelectingHour={this.state.isSelectingHour}
          isInsideHour={this.state.isInsideHour}
        >
          <HandCircle isSelectingHour={this.state.isSelectingHour} />
        </Hand>
        <Hours
          hour={this.props.hour}
          minute={this.props.minute}
          insideHour={this.state.isInsideHour}
          hourSelecting={this.state.isSelectingHour}
        />
      </Clock>
    );
  }
}
