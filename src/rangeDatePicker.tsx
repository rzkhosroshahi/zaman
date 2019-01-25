import * as React from "react";
import * as moment from "jalali-moment";
import { Moment } from "jalali-moment";
import MaskedInput from "react-text-mask";
import { formatJalaliDate } from "./utils/formatDate";
import { daysInMonth, IDays } from "./utils";
import { IRangeHelper, rangeHelper } from "./utils/rangeHelper";
import { Modal } from "./modal";
import { Days } from "./Days";

export interface IRangeDatePickerProps {
  start: string;
  end: string;
}

export interface IRangeDatePickerState {
  startDate: Moment;
  endDate: Moment;
  monthName?: string;
  days?: IDays[];
  rangeDays?: IRangeHelper;
  isOpenModal: boolean;
  isSelecting: boolean;
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
      isOpenModal: false,
      isSelecting: false,
    };
  }

  public componentDidMount(): void {
    const { monthName, days } = daysInMonth(this.state.startDate);
    const { startDate: start, endDate: end } = this.state;
    const rangeDays = rangeHelper({ start, end });
    this.setState(prevState => {
      return {
        days: [...prevState.days, ...days],
        monthName,
        rangeDays,
      };
    });
  }

  public componentDidUpdate(
    prevProps: Readonly<IRangeDatePickerProps>,
    prevState: Readonly<IRangeDatePickerState>,
    snapshot?: any,
  ): void {
    if (
      !prevState.startDate.isSame(this.state.startDate) ||
      !prevState.endDate.isSame(this.state.endDate)
    ) {
      const { monthName, days } = daysInMonth(this.state.startDate);
      const { startDate: start, endDate: end } = this.state;
      const rangeDays = rangeHelper({ start, end });
      this.setState(prevDaysState => {
        return {
          days: [
            ...prevDaysState.days.slice(prevDaysState.days.length),
            ...days,
          ],
          monthName,
          rangeDays: { ...prevDaysState.rangeDays, ...rangeDays },
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
  public toggleModalOpen = () => {
    this.setState(prevState => {
      return {
        isOpenModal: !prevState.isOpenModal,
      };
    });
  };
  public changeStartDays = (e: React.SyntheticEvent<EventTarget>) => {
    const { fadate, disable } = (e.target as HTMLHtmlElement).dataset;
    if (!disable) {
      this.setState({
        isSelecting: !this.state.isSelecting,
        startDate: formatJalaliDate(fadate),
        endDate: formatJalaliDate(fadate).add(1, "day"),
      });
    }
    return {};
  };
  public daysEventListeners = () => {
    const { isSelecting } = this.state;
    if (!isSelecting) {
      return {
        onClick: this.changeStartDays,
      };
    }
    return {};
  };

  public render(): React.ReactNode {
    return (
      <div>
        <MaskedInput
          className="rdp__input--start"
          data-testid="input-start"
          value={this.state.startDate.format("jYYYY/jMM/jDD")}
          onClick={this.toggleModalOpen}
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
        <Modal
          isOpen={this.state.isOpenModal}
          toggleOpen={this.toggleModalOpen}
        >
          <Days
            days={this.state.days}
            rangeDays={this.state.rangeDays}
            daysEvent={this.daysEventListeners}
          />
        </Modal>
      </div>
    );
  }
}
