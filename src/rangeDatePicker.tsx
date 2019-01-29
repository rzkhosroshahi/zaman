import * as React from "react";
import * as moment from "jalali-moment";
import styled, { ThemeProvider } from "styled-components";
import { Moment } from "jalali-moment";
import MaskedInput from "react-text-mask";
import { formatJalaliDate } from "./utils/formatDate";
import { daysInMonth, IDays } from "./utils";
import {
  IRangeHelper,
  rangeHelper,
  makeRangeStatus,
} from "./utils/rangeHelper";
import { Modal } from "./modal";
import { Days } from "./days";

export interface IRangeDatePickerProps {
  start: string;
  end: string;
  modalZIndex?: number;
}

export interface IRangeDatePickerState {
  startDate: Moment;
  endDate: Moment;
  monthName?: string;
  days?: IDays[];
  rangeDays?: IRangeHelper;
  isOpenModal: boolean;
  isSelecting: boolean;
  rangeStatus: string;
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
      rangeStatus: "",
    };
  }

  public componentDidMount(): void {
    const { monthName, days } = daysInMonth(this.state.startDate);
    const { startDate: start, endDate: end } = this.state;
    const rangeDays = rangeHelper({ start, end });
    const rangeStatus = makeRangeStatus(start, end);
    this.setState(prevState => {
      return {
        days: [...prevState.days, ...days],
        monthName,
        rangeDays,
        rangeStatus,
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
      const rangeStatus = makeRangeStatus(start, end);

      this.setState(prevDaysState => {
        return {
          days: [
            ...prevDaysState.days.slice(prevDaysState.days.length),
            ...days,
          ],
          monthName,
          rangeDays,
          rangeStatus,
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
        endDate: formatJalaliDate(fadate).add(2, "day"),
      });
    }
    return {};
  };
  public changeEndDays = (e: React.SyntheticEvent<EventTarget>) => {
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
        onClick: this.changeStartDays,
      };
    } else {
      return {
        onMouseOver: this.changeEndDays,
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

  public render(): React.ReactNode {
    const { modalZIndex } = this.props;
    return (
      <RangeDateDiv>
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
          modalZIndex={modalZIndex}
        >
          <Days
            days={this.state.days}
            rangeDays={this.state.rangeDays}
            rangeStatus={this.state.rangeStatus}
            daysEvent={this.daysEventListeners}
          />
        </Modal>
      </RangeDateDiv>
    );
  }
}
