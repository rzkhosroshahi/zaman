import * as React from "react";
import * as moment from "jalali-moment";
import { Moment } from "jalali-moment";
import MaskedInput from "react-text-mask";
import { formatJalaliDate } from "./utils/formatDate";

export interface IRangeDatePickerProps {
  start: string;
  end: string;
}

export interface IRangeDatePickerState {
  startDate: Moment;
  endDate: Moment;
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
    };
  }

  public render() {
    const { start, end } = this.props;
    return (
      <React.Fragment>
        <MaskedInput
          className="rdp__input--start"
          data-testid="input-start"
          value={start}
          // prettier-ignore
          mask={[/[0-1]/,/[0-4]/,/[0-9]/,/[0-9]/, '/', /[0-1]/, /[0-9]/, '/', /[0-3]/, /[0-9]/]}
        />
        <MaskedInput
          className="rdp__input--end"
          data-testid="input-end"
          value={end}
          // prettier-ignore
          mask={[/[0-1]/,/[0-4]/,/[0-9]/,/[0-9]/, '/', /[0-1]/, /[0-9]/, '/', /[0-3]/, /[0-9]/]}
        />
      </React.Fragment>
    );
  }
}
