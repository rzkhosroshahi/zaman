import * as React from "react";
import { render } from "react-dom";
import moment from "moment-jalaali";
import { makeDatesWithMonth } from "./utils";

interface IDatePickerState {
  year: number;
  month: number;
}

export class DatePicker extends React.Component<any, IDatePickerState> {
  constructor(props) {
    super(props);

    this.state = {
      year: moment().jYear(),
      month: moment().jMonth() + 1,
    };
  }

  public changeMonth = (bool: boolean) => {
    this.setState(state => ({
      month: bool ? state.month + 1 : state.month - 1,
    }));
  };

  public render() {
    const { year, month } = this.state;
    const data = makeDatesWithMonth(year, month);

    return (
      <div>
        <button onClick={() => this.changeMonth(true)}>
          increment month +
        </button>
        <br />

        <button onClick={() => this.changeMonth(false)}>
          decrement month -
        </button>
        <p className="month-name">{data.monthName}</p>
      </div>
    );
  }
}
