import * as React from "react";
import * as moment from "jalali-moment";
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
    value: moment(),
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
      value: moment(this.setInitialValue()),
      cloneDays: moment(this.setInitialValue()),
      monthName: "",
      days: [],
      isOpenModal: this.props.open,
      timePickerView: false,
      dayStatus: datePickerStatus(moment(this.setInitialValue())),
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
    this.watchCloneDaysChanges(prevState);
    this.watchValueChanges(prevProps, prevState);
    this.watchModalChanges(prevProps, prevState);
  }
  public watchCloneDaysChanges = prevState => {
    if (!prevState.cloneDays.isSame(this.state.cloneDays)) {
      const { monthName, days } = daysInMonth(this.state.cloneDays);
      this.setState(prevSetState => {
        return {
          days: [...prevSetState.days.slice(prevSetState.days.length), ...days],
          monthName,
        };
      });
    }
  };
  public watchValueChanges = (prevProps, prevState) => {
    if (!moment(this.props.value).isSame(moment(prevProps.value))) {
      this.setState({
        value: moment(this.props.value),
        dayStatus: datePickerStatus(moment(this.props.value)),
      });
    }
    if (!prevState.value.isSame(this.state.value)) {
      this.setState({
        dayStatus: datePickerStatus(moment(this.state.value)),
      });
    }
  };
  public watchModalChanges = (prevProps, prevState) => {
    if (prevProps.open !== this.props.open) {
      this.setState({
        isOpenModal: this.props.open,
      });
    }
    if (prevState.isOpenModal !== this.state.isOpenModal) {
      const { onToggle } = this.props;

      if (typeof onToggle === "function") {
        onToggle(this.state.isOpenModal);
      }
    }
  };
  public setInitialValue = () => {
    return this.props.value ? this.props.value : new Date();
  };
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
  public toggleTimePickerView = e => {
    e.preventDefault();
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
            value={this.state.value.format(
              timePicker ? formatDateTime : formatDate,
            )}
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
            timePicker={timePicker}
            isDatePicker
          />
        </Modal>
      </DatePickerDiv>
    );
  }
}
