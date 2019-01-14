import * as React from "react";
import MaskedInput from "react-text-mask";

export interface IRangeDatePickerProps {
  startDate: string;
  endDate?: string;
}

export interface IRangeDatePickerState {
  startDate: string;
  endDate?: string;
}

export class RangeDatePicker extends React.Component<
  IRangeDatePickerProps,
  IRangeDatePickerState
> {
  public static defaultProps: Partial<IRangeDatePickerProps> = {
    startDate: "1397/12/08",
  };

  constructor(props) {
    super(props);
    this.state = {
      startDate: props.startDate,
    };
  }

  public render() {
    const { startDate } = this.state;
    return (
      <MaskedInput
        className="rdp__input--start"
        data-testid="input-start"
        aria-label="cost-input"
        value={startDate}
        // prettier-ignore
        mask={[/[0-1]/,/[0-4]/,/[0-9]/,/[0-9]/, '/', /[0-1]/, /[0-9]/, '/', /[0-3]/, /[0-9]/]}
      />
    );
  }
}
