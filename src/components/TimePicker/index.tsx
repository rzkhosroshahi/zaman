import * as React from "react";
import { Clock, HandCircle } from "./styled";
import { ITimePickerProps, ITimePickerState } from "./types";
import { getAngelValues } from "../../utils/timePicker";
import { Hours } from "./Hour";
import { Hand } from "./Hand";

export const TimePicker: React.FC<ITimePickerProps> = ({
  hour: hourProp,
  minute: minuteProp,
  changeHour,
  changeMinute,
  timePickerView,
  toggleView,
  isGregorian,
}) => {
  const [hour, setHour] = React.useState(hourProp);
  const [minute, setMinute] = React.useState(minuteProp);
  const [isInsideHour, setIsInsideHour] = React.useState(hourProp < 13);
  const [isSelecting, setIsSelecting] = React.useState(false);
  const [isSelectingHour, setIsSelectingHour] = React.useState(false);

  React.useEffect(() => {
    changeHour(hour);
    changeMinute(minute);
  }, [hour, minute]);

  React.useEffect(() => {
    if (timePickerView === "hour") setIsSelectingHour(true);
    if (timePickerView === "minute") setIsSelectingHour(false);
  }, [timePickerView]);

  const updateMinute = (e: React.MouseEvent | React.TouchEvent) => {
    const { value } = getAngelValues(e, 6);
    setMinute(value);
  };

  const updateHour = (e: React.MouseEvent | React.TouchEvent) => {
    const { value, delta } = getAngelValues(e);
    if (Math.round(delta) < 85) {
      setHour(value);
      setIsInsideHour(true);
    } else {
      setHour(value);
      setIsInsideHour(false);
    }
  };

  const handleMouseMove = (e: React.MouseEvent) => {
    e.preventDefault();
    if (!isSelecting) {
      return;
    }
    if (isSelectingHour) {
      return updateHour(e);
    }
    return updateMinute(e);
  };

  const handleMouseUp = () => {
    setIsSelecting(false);
    setIsSelectingHour(false);
    toggleView("minute");
  };

  const handleMouseDown = (e) => {
    setIsSelecting(true);
    if (isSelectingHour) {
      return updateHour(e);
    } else {
      return updateMinute(e);
    }
  };

  const handleTouchMove = (e: React.TouchEvent) => {
    e.preventDefault();
    setIsSelecting(true);
    if (isSelectingHour) {
      return updateHour(e);
    }
    return updateMinute(e);
  };

  const handleTouchEnd = () => {
    setIsSelecting(false);
  };

  return (
    <Clock
      onMouseMove={handleMouseMove}
      onMouseUp={handleMouseUp}
      onMouseDown={handleMouseDown}
      // touch events
      onTouchMove={handleTouchMove}
      onTouchEnd={handleTouchEnd}
      data-testid="dp__clock"
    >
      <Hand
        hour={hour}
        minute={minute}
        isSelectingHour={isSelectingHour}
        isInsideHour={isInsideHour}
      >
        <HandCircle isSelectingHour={isSelectingHour} />
      </Hand>
      <Hours
        hour={hour}
        minute={minute}
        insideHour={isInsideHour}
        hourSelecting={isSelectingHour}
        isGregorian={isGregorian}
      />
    </Clock>
  );
};

// export class TimePicker extends React.PureComponent<
//   ITimePickerProps,
//   ITimePickerState
// > {
//   constructor(props) {
//     super(props);
//     this.state = {
//       hour: props.hour,
//       minute: props.minute,
//       isInsideHour: props.hour < 13,
//       isSelectingHour: true,
//       isSelecting: false,
//     };
//   }
//   public componentDidUpdate(
//     prevProps: Readonly<ITimePickerProps>,
//     prevState: Readonly<ITimePickerState>,
//     snapshot?: any,
//   ): void {
//     const { changeHour, changeMinute } = this.props;
//     if (this.state.hour !== prevState.hour) {
//       changeHour(this.state.hour);
//     }
//     if (this.state.minute !== prevState.minute) {
//       changeMinute(this.state.minute);
//     }
//   }
//   public setMinute = (e: React.MouseEvent | React.TouchEvent) => {
//     const { value } = getAngelValues(e, 6);
//     this.setState({
//       minute: value,
//     });
//   };

//   public setHour = (e: React.MouseEvent | React.TouchEvent) => {
//     const { value, delta } = getAngelValues(e);
//     if (Math.round(delta) < 85) {
//       this.setState({
//         hour: value,
//         isInsideHour: true,
//       });
//     } else {
//       this.setState({
//         hour: value,
//         isInsideHour: false,
//       });
//     }
//   };

//   public handleMouseMove = (e: React.MouseEvent) => {
//     e.preventDefault();
//     if (!this.state.isSelecting) {
//       return;
//     }
//     if (this.state.isSelectingHour) {
//       return this.setHour(e);
//     }
//     return this.setMinute(e);
//   };

//   public handleMouseUp = () => {
//     this.setState({ isSelecting: false, isSelectingHour: false });
//   };

//   public handleMouseDown = e => {
//     this.setState({
//       isSelecting: true,
//     });
//     if (this.state.isSelectingHour) {
//       return this.setHour(e);
//     } else {
//       return this.setMinute(e);
//     }
//   };

//   public handleTouchMove = (e: React.TouchEvent) => {
//     e.preventDefault();
//     this.setState({ isSelecting: true });
//     if (this.state.isSelectingHour) {
//       return this.setHour(e);
//     }
//     return this.setMinute(e);
//   };

//   public handleTouchEnd = () => {
//     this.setState({
//       isSelecting: false,
//     });
//   };

//   public render() {
//     return (
//       <Clock
//         onMouseMove={this.handleMouseMove}
//         onMouseUp={this.handleMouseUp}
//         onMouseDown={this.handleMouseDown}
//         // touch events
//         onTouchMove={this.handleTouchMove}
//         onTouchEnd={this.handleTouchEnd}
//         data-testid="dp__clock"
//       >
//         <Hand
//           hour={this.state.hour}
//           minute={this.state.minute}
//           isSelectingHour={this.state.isSelectingHour}
//           isInsideHour={this.state.isInsideHour}
//         >
//           <HandCircle isSelectingHour={this.state.isSelectingHour} />
//         </Hand>
//         <Hours
//           hour={this.props.hour}
//           minute={this.props.minute}
//           insideHour={this.state.isInsideHour}
//           hourSelecting={this.state.isSelectingHour}
//         />
//       </Clock>
//     );
//   }
// }
