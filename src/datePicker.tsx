import * as React from "react";
import moment from "jalali-moment";
import { Moment } from "jalali-moment";
import { daysInMonth } from "../utils";

interface IDatePickerState {
  date: Moment;
}

export class DatePicker extends React.PureComponent<any, IDatePickerState> {
  constructor(props) {
    super(props);

    this.state = {
      date: moment(),
    };
  }

  public changeMonth = (bool: boolean) => {
    this.setState(state => ({
      date: bool ? state.date.add(1, "month") : state.date.subtract(1, "month"),
    }));
  };

  public render() {
    const { date } = this.state;
    daysInMonth(date);
    return (
      <div>
        <button onClick={() => this.changeMonth(true)}>
          increment month +
        </button>
        <br />

        <button onClick={() => this.changeMonth(false)}>
          decrement month -
        </button>
      </div>
    );
  }
}