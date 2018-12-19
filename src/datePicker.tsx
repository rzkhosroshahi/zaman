import * as React from "react";
import * as moment from "jalali-moment";
import { Moment } from "jalali-moment";
import { daysInMonth } from "./utils";
import chunk from "lodash.chunk";
import { Days } from "./days";
import { weekDayNames } from "./utils/weeks";

interface IDatePickerState {
  date: Moment;
}

export class DatePicker extends React.Component<any, IDatePickerState> {
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
    const { monthName, days } = daysInMonth(date);
    const weeks = chunk(days, 7);
    return (
      <div>
        <button onClick={() => this.changeMonth(true)}>
          increment month +
        </button>
        <br />

        <button onClick={() => this.changeMonth(false)}>
          decrement month -
        </button>
        <h2>{monthName}</h2>
        {weekDayNames.map((name, id) => (
          <span key={`${id}-weekDayNames`} style={{ marginRight: "1.4rem" }}>
            {name}
          </span>
        ))}
        <Days weeks={weeks} />
      </div>
    );
  }
}
