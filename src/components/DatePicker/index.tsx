import * as React from "react";
import * as moment from "jalali-moment";
import * as Icons from "../Icons";
import MaskedInput from "react-text-mask";
import { daysInMonth } from "../../utils/daysInMonth";
import { defaultDatePickerTheme } from "../../theme";
import { Modal } from "../../modal";
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
    value: moment(),
    timePicker: true,
    ArrowRight: Icons.ArrowRightCMP,
    ArrowLeft: Icons.ArrowLeftCMP,
    modalZIndex: 9999,
    theme: defaultDatePickerTheme,
    weekend: [6],
    DateIcon: Icons.DateIcon,
    ClockIcon: Icons.ClockIcon,
  };

  constructor(props) {
    super(props);
    this.state = {
      value: moment(this.props.value),
      cloneDays: moment(this.props.value),
      monthName: "",
      days: [],
      isOpenModal: false,
      timePickerView: false,
      dayStatus: datePickerStatus(moment(this.props.value)),
      hour: moment(this.props.value).hour(),
      minute: moment(this.props.value).minute(),
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
        dayStatus: datePickerStatus(moment(this.state.value)),
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
        cloneDays: prevState.cloneDays.clone().add(amount, "month"),
      };
    });
  };
  public changeHour = value => {
    this.setState({
      hour: this.state.value.hour(value).hour(),
    });
  };
  public changeMinute = value => {
    this.setState({
      minute: this.state.value.minute(value).minute(),
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
    } = this.props;
    return (
      <DatePickerDiv>
        <MaskedInput
          className="dp__input"
          data-testid="input-dp"
          value={this.state.value.format(
            timePicker ? formatDateTime : formatDate,
          )}
          mask={timePicker ? inputFaDateWithTimeMask : inputFaDateMask}
          onClick={this.toggleModalOpen}
          style={{ direction: "ltr" }}
        />
        <Modal
          isOpen={this.state.isOpenModal}
          toggleOpen={this.toggleModalOpen}
          modalZIndex={modalZIndex}
        >
          <Days
            days={this.state.days}
            monthName={this.state.monthName}
            selectedPickerStatus={this.state.dayStatus}
            selectedDay={this.state.value.format("jYYYY/jMM/jDD")}
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
          />
        </Modal>
      </DatePickerDiv>
    );
  }
}
