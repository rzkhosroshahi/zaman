import * as React from "react";
import * as moment from "jalali-moment";
import MaskedInput from "react-text-mask";
import { IRangeDatePickerTheme } from "./types";
import { Moment } from "jalali-moment";
import { inputFaDateMask, inputFaDateWithTimeMask } from "./utils";
import { daysInMonth, IDays } from "./utils/daysInMonth";
import styled, { defaultRangeTheme } from "./theme";
import { Modal } from "./modal";
import * as Arrows from "./arrows";
import { Days } from "./days";
import { datePickerStatus } from "./utils/rangeHelper";

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
  cloneDays: Moment;
  monthName?: string;
  days?: IDays[];
  isOpenModal: boolean;
  dayStatus: string;
}

const DatePickerDiv = styled.div`
  direction: rtl;
`;

export class DatePicker extends React.Component<
  IDatePickerProps,
  IDatePickerState
> {
  public static defaultProps: Partial<IDatePickerProps> = {
    value: moment(),
    isRenderingTimePicker: true,
    ArrowRight: Arrows.ArrowRightCMP,
    ArrowLeft: Arrows.ArrowLeftCMP,
    modalZIndex: 9999,
    theme: defaultRangeTheme,
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
  public render(): React.ReactNode {
    const { modalZIndex, ArrowRight, ArrowLeft, theme } = this.props;

    if (!this.props.isRenderingTimePicker) {
      return (
        <DatePickerDiv>
          <MaskedInput
            className="dp__input"
            data-testid="input-dp"
            value={this.state.value.format("jYYYY/jM/jD - HH:mm")}
            mask={inputFaDateMask}
            onClick={this.toggleModalOpen}
            style={{ direction: "ltr" }}
          />
          <Modal
            isOpen={this.state.isOpenModal}
            toggleOpen={this.toggleModalOpen}
            modalZIndex={modalZIndex}
          />
        </DatePickerDiv>
      );
    }
    return (
      <DatePickerDiv>
        <MaskedInput
          className="dp__input"
          data-testid="input-dp"
          value={this.state.value.format("jYYYY/jM/jD - HH:mm")}
          mask={inputFaDateWithTimeMask}
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
            // daysEventListeners={this.daysEventListeners}
            holiday={this.props.weekend}
            theme={theme}
            // isSelecting={this.state.isSelecting}
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
