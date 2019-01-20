import * as React from "react";
import * as moment from "jalali-moment";
import { Moment } from "jalali-moment";
import MaskedInput from "react-text-mask";
import { formatJalaliDate } from "./utils/formatDate";
import { daysInMonth, IDays } from "./utils";

export interface IRangeDatePickerProps {
  start: string;
  end: string;
}

export interface IRangeDatePickerState {
  startDate: Moment;
  endDate: Moment;
  monthName?: string;
  days?: IDays[];
}

export class RangeDatePicker extends React.Component<
  IRangeDatePickerProps,
  IRangeDatePickerState
> {
  public static defaultProps: Partial<IRangeDatePickerProps> = {
    start: moment().format("jYYYY/jMM/jDD"),
    end: moment().format("jYYYY/jMM/jDD"),
  };

  constructor(props) {
    super(props);
    this.state = {
      startDate: formatJalaliDate(props.start),
      endDate: formatJalaliDate(props.end),
      monthName: "",
      days: [],
    };
  }

  public componentDidMount(): void {
    const { monthName, days } = daysInMonth(this.state.startDate);
    this.setState(prevState => {
      return {
        days: [...prevState.days, ...days],
        monthName,
      };
    });
  }

  public componentDidUpdate(
    prevProps: Readonly<IRangeDatePickerProps>,
    prevState: Readonly<IRangeDatePickerState>,
    snapshot?: any,
  ): void {
    if (!prevState.startDate.isSame(this.state.startDate)) {
      const { monthName, days } = daysInMonth(this.state.startDate);
      this.setState(prevDaysState => {
        return {
          days: [
            ...prevDaysState.days.slice(prevDaysState.days.length),
            ...days,
          ],
          monthName,
        };
      });
    }
  }
  public increaseMonth = () => {
    this.setState(prevState => {
      return {
        startDate: prevState.startDate.clone().add(1, "month"),
      };
    });
  };
  public render(): React.ReactNode {
    return (
      <React.Fragment>
        <MaskedInput
          className="rdp__input--start"
          data-testid="input-start"
          value={this.state.startDate.format("jYYYY/jMM/jDD")}
          onChange={(e: React.ChangeEvent<HTMLInputElement>) => {
            if (formatJalaliDate(e.target.value)) {
              return this.setState({
                startDate: formatJalaliDate(e.target.value),
              });
            }
            return;
          }}
          // prettier-ignore
          mask={[/[0-1]/,/[0-4]/,/[0-9]/,/[0-9]/, '/', /[0-1]/, /[0-9]/, '/', /[0-3]/, /[0-9]/]}
        />
        <MaskedInput
          className="rdp__input--end"
          data-testid="input-end"
          value={this.state.endDate.format("jYYYY/jMM/jDD")}
          onChange={(e: React.ChangeEvent<HTMLInputElement>) => {
            const formattedValue = formatJalaliDate(e.target.value);
            // prettier-ignore
            if (formattedValue && formattedValue.isAfter(this.state.startDate)) {
              return this.setState({
                endDate: formatJalaliDate(e.target.value),
              });
            }
            return;
          }}
          // prettier-ignore
          mask={[/[0-1]/,/[0-4]/,/[0-9]/,/[0-9]/, '/', /[0-1]/, /[0-9]/, '/', /[0-3]/, /[0-9]/]}
        />
        <div>
          <button onClick={this.increaseMonth}>increaseMonth</button>
        </div>
      </React.Fragment>
    );
  }
}
