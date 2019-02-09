import * as React from "react";
import * as moment from "jalali-moment";
import MaskedInput from "react-text-mask";
import { IDatePickerTheme } from "./types";
import { Moment } from "jalali-moment";
import { daysInMonth, IDays } from "./utils/daysInMonth";
import styled, { defaultDatePickerTheme } from "./theme";
import { Modal } from "./modal";
import * as Arrows from "./icons";
import { Days } from "./days";
import { datePickerStatus } from "./utils/rangeHelper";
import {
  formatDate,
  formatDateTime,
  formatJalaliDate,
  inputFaDateMask,
  inputFaDateWithTimeMask,
} from "./utils";

interface IDatePickerProps {
  value: number | Date | Moment;
  ArrowLeft?: React.ReactType;
  ArrowRight?: React.ReactType;
  modalZIndex?: number;
  theme?: IDatePickerTheme;
  weekend?: number[];
  isRenderingButtons?: boolean;
  timePicker?: boolean;
  onClickSubmitButton?: (arg: any) => any;
}

interface IDatePickerState {
  value: Moment;
  cloneDays: Moment;
  monthName?: string;
  days?: IDays[];
  isOpenModal: boolean;
  dayStatus: string;
}

const DatePickerDiv = styled.div`
  direction: rtl;
`;

export class DatePicker extends React.PureComponent<
  IDatePickerProps,
  IDatePickerState
> {
  public static defaultProps: Partial<IDatePickerProps> = {
    value: moment(),
    timePicker: true,
    ArrowRight: Arrows.ArrowRightCMP,
    ArrowLeft: Arrows.ArrowLeftCMP,
    modalZIndex: 9999,
    theme: defaultDatePickerTheme,
    weekend: [6],
  };

  constructor(props) {
    super(props);
    this.state = {
      value: moment(this.props.value),
      cloneDays: moment(this.props.value),
      monthName: "",
      days: [],
      isOpenModal: false,
      dayStatus: datePickerStatus(moment(this.props.value)),
    };
  }

  public componentDidMount(): void {
    const { monthName, days } = daysInMonth(this.state.cloneDays);
    this.setState(prevState => {
      return {
        days: [...prevState.days, ...days],
        monthName,
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
  }

  public changeMonth = amount => {
    this.setState(prevState => {
      return {
        cloneDays: prevState.cloneDays.clone().add(amount, "month"),
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
  public render(): React.ReactNode {
    const {
      modalZIndex,
      ArrowRight,
      ArrowLeft,
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
            isRenderingButtons={this.props.isRenderingButtons}
            ArrowLeft={ArrowLeft}
            ArrowRight={ArrowRight}
            increaseMonth={() => this.changeMonth(1)}
            decreaseMonth={() => this.changeMonth(-1)}
            // onCancelButton={this.cancelButton}
            // onSubmitButton={this.submitButton}
          />
        </Modal>
      </DatePickerDiv>
    );
  }
}
