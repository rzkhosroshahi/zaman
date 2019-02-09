import * as React from "react";
import * as moment from "jalali-moment";
import styled from "./theme";
import MaskedInput from "react-text-mask";
import { Moment } from "jalali-moment";
import { formatJalaliDate } from "./utils";
import { daysInMonth, IDays } from "./utils/daysInMonth";
import { Days } from "./days";
import { Modal } from "./modal";
import * as Arrows from "./icons";
import { defaultRangeTheme } from "./theme";
import { inputFaDateMask } from "./utils";
import { rangeHelper, makeRangeStatus } from "./utils/rangeHelper";
import { IRangeDate, IRangeDatePickerTheme, IRangeDays } from "./types";

export interface IRangeDatePickerProps {
  start: string;
  end: string;
  ArrowLeft: React.ReactType;
  ArrowRight: React.ReactType;
  modalZIndex?: number;
  theme?: IRangeDatePickerTheme;
  weekend?: number[];
  isRenderingButtons?: boolean;
  onClickSubmitButton?: (arg: any) => any;
}

export interface IRangeDatePickerState {
  startDate: Moment;
  endDate: Moment;
  monthName?: string;
  days?: IDays[];
  rangeDays?: IRangeDays;
  isOpenModal: boolean;
  isSelecting: boolean;
  rangeStatus: string;
  cloneDays: Moment;
  initialRange?: IRangeDate;
}

const RangeDateDiv = styled.div`
  direction: rtl;
`;

export class RangeDatePicker extends React.Component<
  IRangeDatePickerProps,
  IRangeDatePickerState
> {
  public static defaultProps: Partial<IRangeDatePickerProps> = {
    start: moment().format("jYYYY/jMM/jDD"),
    end: moment().format("jYYYY/jMM/jDD"),
    modalZIndex: 9999,
    ArrowLeft: Arrows.ArrowLeftCMP,
    ArrowRight: Arrows.ArrowRightCMP,
    theme: defaultRangeTheme,
    weekend: [6],
    isRenderingButtons: true,
  };

  constructor(props) {
    super(props);
    this.state = {
      startDate: formatJalaliDate(props.start),
      endDate: formatJalaliDate(props.end),
      cloneDays: formatJalaliDate(props.start),
      monthName: "",
      days: [],
      isOpenModal: false,
      isSelecting: false,
      rangeStatus: "",
    };
  }

  public componentDidMount(): void {
    const { monthName, days } = daysInMonth(this.state.cloneDays);
    const { startDate: start, endDate: end } = this.state;
    const rangeDays = rangeHelper({ start, end });
    const rangeStatus = makeRangeStatus(start, end);
    this.setState(prevState => {
      return {
        days: [...prevState.days, ...days],
        monthName,
        rangeDays,
        rangeStatus,
        initialRange: {
          start,
          end,
        },
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
      const { startDate: start, endDate: end } = this.state;
      const rangeDays = rangeHelper({ start, end });
      const rangeStatus = makeRangeStatus(start, end);

      this.setState({
        rangeDays,
        rangeStatus,
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
  public toggleModalOpen = () => {
    this.setState(prevState => {
      return {
        isOpenModal: !prevState.isOpenModal,
      };
    });
  };
  public changeStartDay = (e: React.SyntheticEvent<EventTarget>) => {
    const { fadate, disable } = (e.target as HTMLHtmlElement).dataset;
    if (!disable) {
      this.setState({
        isSelecting: !this.state.isSelecting,
        startDate: formatJalaliDate(fadate),
        endDate: formatJalaliDate(fadate).add(2, "day"),
      });
    }
    return {};
  };
  public changeEndDay = (e: React.SyntheticEvent<EventTarget>) => {
    const { fadate } = (e.target as HTMLHtmlElement).dataset;
    const { isSelecting } = this.state;
    if (isSelecting) {
      this.setState({
        endDate: formatJalaliDate(fadate),
      });
    }
  };
  public daysEventListeners = () => {
    const { isSelecting } = this.state;
    if (!isSelecting) {
      return {
        onClick: this.changeStartDay,
      };
    } else {
      return {
        onMouseOver: this.changeEndDay,
        onClick: this.endSelecting,
      };
    }
  };
  public endSelecting = () => {
    const { isSelecting } = this.state;

    if (isSelecting) {
      this.setState({
        isSelecting: false,
      });
    }
  };
  public changeInputValues = (
    e: React.ChangeEvent<HTMLInputElement>,
    start: boolean = true,
  ) => {
    const formattedValue = formatJalaliDate(e.target.value);
    if (start && formatJalaliDate(e.target.value)) {
      return this.setState({
        startDate: formatJalaliDate(e.target.value),
      });
    } else if (formattedValue && formattedValue.isAfter(this.state.startDate)) {
      return this.setState({
        endDate: formatJalaliDate(e.target.value),
      });
    }
    return null;
  };
  public cancelButton = () => {
    const { start, end } = this.state.initialRange;
    this.setState({
      isOpenModal: false,
      startDate: start,
      endDate: end,
    });
  };
  public submitButton = () => {
    const { startDate: start, endDate: end } = this.state;
    if (this.props.onClickSubmitButton) {
      this.props.onClickSubmitButton({
        start,
        end,
      });
    }
    this.setState({
      isOpenModal: false,
      initialRange: {
        start,
        end,
      },
    });
  };

  public render(): React.ReactNode {
    const { modalZIndex, ArrowRight, ArrowLeft, theme } = this.props;
    return (
      <RangeDateDiv>
        <MaskedInput
          className="rdp__input--start"
          data-testid="input-start"
          value={this.state.startDate.format("jYYYY/jMM/jDD")}
          onClick={this.toggleModalOpen}
          onChange={e => this.changeInputValues(e)}
          mask={inputFaDateMask}
        />
        <MaskedInput
          className="rdp__input--end"
          data-testid="input-end"
          value={this.state.endDate.format("jYYYY/jMM/jDD")}
          onChange={e => this.changeInputValues(e, false)}
          mask={inputFaDateMask}
        />
        <Modal
          isOpen={this.state.isOpenModal}
          toggleOpen={this.toggleModalOpen}
          modalZIndex={modalZIndex}
        >
          <Days
            days={this.state.days}
            monthName={this.state.monthName}
            rangeDays={this.state.rangeDays}
            selectedPickerStatus={this.state.rangeStatus}
            daysEventListeners={this.daysEventListeners}
            holiday={this.props.weekend}
            theme={theme}
            isSelecting={this.state.isSelecting}
            isRenderingButtons={this.props.isRenderingButtons}
            ArrowLeft={ArrowLeft}
            ArrowRight={ArrowRight}
            increaseMonth={() => this.changeMonth(1)}
            decreaseMonth={() => this.changeMonth(-1)}
            onCancelButton={this.cancelButton}
            onSubmitButton={this.submitButton}
          />
        </Modal>
      </RangeDateDiv>
    );
  }
}
