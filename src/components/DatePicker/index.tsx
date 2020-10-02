import * as React from "react";
import dayjs from "dayjs";
import * as Icons from "../Icons";
import MaskedInput from "react-text-mask";
import { daysInMonth } from "../../utils/daysInMonth";
import { defaultDatePickerTheme } from "../../theme";
import { Modal } from "../Modal";
import { Days } from "../Days";
import { datePickerStatus } from "../../utils/rangeHelper";
import { IDatePickerProps, IDatePickerState } from "./types";
import { DatePickerDiv } from "./styled";
import {
  formatDate,
  formatDateTime,
  formatJalaliDate,
  inputFaDateMask,
  inputFaDateWithTimeMask,
} from "../../utils";

export class DatePicker extends React.PureComponent<
  IDatePickerProps,
  IDatePickerState
> {
  public static defaultProps: Partial<IDatePickerProps> = {
    value: dayjs(),
    timePicker: true,
    ArrowRight: Icons.ArrowRightCMP,
    ArrowLeft: Icons.ArrowLeftCMP,
    modalZIndex: 9999,
    theme: defaultDatePickerTheme,
    weekend: [6],
    DateIcon: Icons.DateIcon,
    ClockIcon: Icons.ClockIcon,
    className: "dp__input",
  };

  constructor(props) {
    super(props);
    this.state = {
      value: dayjs(this.props.value),
      cloneDays: dayjs(this.props.value),
      monthName: "",
      days: [],
      isOpenModal: false,
      timePickerView: false,
      dayStatus: datePickerStatus(dayjs(this.props.value)),
      hour: dayjs(this.props.value).hour(),
      minute: dayjs(this.props.value).minute(),
    };
  }

  public componentDidMount(): void {
    const { monthName, days } = daysInMonth(this.state.cloneDays);
    this.setState(prevState => {
      return {
        days: [...prevState.days, ...days],
        monthName,
        initialValue: prevState.value,
      };
    });
  }
  public componentDidUpdate(
    prevProps: Readonly<IDatePickerProps>,
    prevState: Readonly<IDatePickerState>,
  ): void {
    if (!prevState.value.isSame(this.state.value)) {
      this.setState({
        dayStatus: datePickerStatus(dayjs(this.state.value)),
      });
    }
    if (!prevState.cloneDays.isSame(this.state.cloneDays)) {
      const { monthName, days } = daysInMonth(this.state.cloneDays);
      this.setState(prevSetState => {
        return {
          days: [...prevSetState.days.slice(prevSetState.days.length), ...days],
          monthName,
        };
      });
    }
  }

  public changeMonth = amount => {
    this.setState(prevState => {
      return {
        cloneDays: prevState.cloneDays.add(amount, "month"),
      };
    });
  };
  public changeHour = value => {
    const nextValue = this.state.value.hour(value);
    this.setState({
      value: nextValue,
      hour: nextValue.hour(),
    });
  };
  public changeMinute = value => {
    const nextValue = this.state.value.minute(value);
    this.setState({
      value: nextValue,
      minute: nextValue.minute(),
    });
  };
  public toggleModalOpen = () => {
    this.setState(prevState => {
      return {
        isOpenModal: !prevState.isOpenModal,
      };
    });
  };
  public toggleTimePickerView = () => {
    this.setState(prevState => {
      return {
        timePickerView: !prevState.timePickerView,
      };
    });
  };
  public selectDay = (e: React.SyntheticEvent<EventTarget>) => {
    const { fadate } = (e.target as HTMLHtmlElement).dataset;
    this.setState({
      value: formatJalaliDate(fadate),
    });
  };
  public daysEventListeners = () => {
    return {
      onClick: this.selectDay,
    };
  };
  public cancelButton = () => {
    this.setState(prevState => ({
      isOpenModal: false,
      value: prevState.initialValue,
    }));
  };
  public submitButton = () => {
    const { value } = this.state;
    if (this.props.onClickSubmitButton) {
      this.props.onClickSubmitButton({
        value,
      });
    }
    this.setState({
      isOpenModal: false,
      initialValue: this.state.value,
    });
  };
  public render(): React.ReactNode {
    const {
      modalZIndex,
      ArrowRight,
      ArrowLeft,
      DateIcon,
      ClockIcon,
      theme,
      timePicker,
      label,
      className,
    } = this.props;
    return (
      <DatePickerDiv>
        <label>{label}</label>
        <div>
          <MaskedInput
            className={className}
            data-testid="input-dp"
            value={this.state.value
              .calendar("jalali")
              .format(timePicker ? formatDateTime : formatDate)}
            mask={timePicker ? inputFaDateWithTimeMask : inputFaDateMask}
            onClick={this.toggleModalOpen}
            style={{ direction: "ltr" }}
          />
        </div>
        <Modal
          isOpen={this.state.isOpenModal}
          toggleOpen={this.toggleModalOpen}
          modalZIndex={modalZIndex}
        >
          <Days
            days={this.state.days}
            monthName={this.state.monthName}
            selectedPickerStatus={this.state.dayStatus}
            selectedDay={this.state.value
              .calendar("jalali")
              .format("YYYY/MM/DD")}
            daysEventListeners={this.daysEventListeners}
            holiday={this.props.weekend}
            theme={theme}
            isRenderingButtons={true}
            ArrowLeft={ArrowLeft}
            ArrowRight={ArrowRight}
            DateIcon={DateIcon}
            ClockIcon={ClockIcon}
            increaseMonth={() => this.changeMonth(1)}
            decreaseMonth={() => this.changeMonth(-1)}
            toggleView={this.toggleTimePickerView}
            timePickerView={this.state.timePickerView}
            hour={this.state.hour}
            minute={this.state.minute}
            changeHour={this.changeHour}
            changeMinute={this.changeMinute}
            onCancelButton={this.cancelButton}
            onSubmitButton={this.submitButton}
            timePicker
            isDatePicker
          />
        </Modal>
      </DatePickerDiv>
    );
  }
}
