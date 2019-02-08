import * as React from "react";
import * as moment from "jalali-moment";
import MaskedInput from "react-text-mask";
import { IRangeDatePickerTheme } from "./types";
import { Moment } from "jalali-moment";
import { inputFaDateMask, inputFaDateWithTimeMask } from "./utils";

interface IDatePickerProps {
  value: number | Date | Moment;
  ArrowLeft?: React.ReactType;
  ArrowRight?: React.ReactType;
  modalZIndex?: number;
  theme?: IRangeDatePickerTheme;
  weekend?: number[];
  isRenderingButtons?: boolean;
  isRenderingTimePicker?: boolean;
  onClickSubmitButton?: (arg: any) => any;
}

interface IDatePickerState {
  value: Moment;
}

export class DatePicker extends React.Component<
  IDatePickerProps,
  IDatePickerState
> {
  public static defaultProps: Partial<IDatePickerProps> = {
    value: moment(),
    isRenderingTimePicker: true,
  };

  constructor(props) {
    super(props);
    this.state = {
      value: moment(this.props.value),
    };
  }
  public render(): React.ReactNode {
    if (!this.props.isRenderingTimePicker) {
      return (
        <div>
          <MaskedInput
            className="dp__input"
            data-testid="input-dp"
            value={this.state.value.format("jYYYY/jM/jD - HH:mm")}
            mask={inputFaDateMask}
          />
        </div>
      );
    }
    return (
      <div>
        <MaskedInput
          className="dp__input"
          data-testid="input-dp"
          value={this.state.value.format("jYYYY/jM/jD - HH:mm")}
          mask={inputFaDateWithTimeMask}
        />
      </div>
    );
  }
}
