import * as React from "react";
import * as moment from "jalali-moment";
import { defaultRangeTheme } from "../../theme";
import MaskedInput from "react-text-mask";
import {
  formatDateString,
  getFormatTime,
  getFormatDate,
  inputFaDateMask,
  inputFaDateWithTimeMask,
  inputEnDateWithTimeMask,
  inputEnDateMask,
} from "../../utils";
import { daysInMonth } from "../../utils/daysInMonth";
import { Days } from "../Days";
import { Modal } from "../Modal";
import * as Arrows from "../Icons";
import { makeRangeStatus, rangeHelper } from "../../utils/rangeHelper";
import { IRangeDatePickerProps, IRangeDatePickerState } from "./types";
import { RangeDateDiv } from "./styled";

export const RangeDatePicker: React.FC<IRangeDatePickerProps> = ({
  start = moment(),
  end = moment(),
  modalZIndex = 9999,
  ArrowLeft = Arrows.ArrowLeftCMP,
  ArrowRight = Arrows.ArrowRightCMP,
  theme = defaultRangeTheme,
  weekend = [6],
  isRenderingButtons = true,
  open,
  onToggle,
  onClickSubmitButton,
  fromLabel,
  toLabel,
  gregorian = false,
}) => {
  const [startDate, setStartDate] = React.useState(start);
  const [endDate, setEndDate] = React.useState(end);
  const [cloneDays, setCloneDays] = React.useState(start);
  const [monthName, setMonthName] = React.useState("");
  const [days, setDays] = React.useState([]);
  const [isOpenModal, setIsOpenModal] = React.useState(open);
  const [isSelecting, setIsSelecting] = React.useState(false);
  const [rangeDays, setRangeDays] = React.useState(
    rangeHelper({ start: startDate, end: endDate }, { isGregorian: gregorian }),
  );
  const [rangeStatus, setRangeStatus] = React.useState("");
  const [initialRange, setInitialRange] = React.useState({
    start: startDate,
    end: endDate,
  });
  const [pivotDate, setPivotDate] = React.useState(start);

  React.useEffect(() => {
    const { monthName: newMonthName, days: newDays } = daysInMonth(cloneDays, {
      isGregorian: gregorian,
    });

    setDays((oldDays) => [...days, ...newDays]);
    setMonthName(newMonthName);
    setRangeDays(
      rangeHelper(
        { start: startDate, end: endDate },
        { isGregorian: gregorian },
      ),
    );
    setRangeStatus(
      makeRangeStatus(startDate, endDate, { isGregorian: gregorian }),
    );
    setInitialRange({ start: startDate, end: endDate });
  }, []);

  React.useEffect(() => {
    setRangeDays(
      rangeHelper(
        { start: startDate, end: endDate },
        { isGregorian: gregorian },
      ),
    );
    setRangeStatus(
      makeRangeStatus(startDate, endDate, { isGregorian: gregorian }),
    );
  }, [startDate, endDate]);

  React.useEffect(() => {
    const { monthName: newMonthName, days: newDays } = daysInMonth(cloneDays, {
      isGregorian: gregorian,
    });
    setDays((oldDays) => [...days.slice(days.length), ...newDays]);
    setMonthName(newMonthName);
  }, [cloneDays]);

  React.useEffect(() => {
    if (typeof onToggle === "function") {
      onToggle(isOpenModal);
    }
  }, [isOpenModal]);

  const changeMonth = (amount) => {
    setCloneDays(cloneDays.clone().add(amount, "month"));
  };

  const toggleModalOpen = () => {
    setIsOpenModal(!isOpenModal);
  };

  const changeStartDay = (e: React.SyntheticEvent<EventTarget>) => {
    console.log(
      "🚀 ~ file: index.tsx ~ line 100 ~ changeStartDay ~ changeStartDay",
      "changeStartDay",
    );
    const { fadate, disable } = (e.target as HTMLHtmlElement).dataset;
    if (!disable) {
      setIsSelecting(!isSelecting);
      const selectedDate = formatDateString(fadate, { isGregorian: gregorian });
      setStartDate(selectedDate);
      setEndDate(selectedDate);
      setPivotDate(selectedDate);
    }
    return {};
  };

  const changeStartEndDay = (e: React.SyntheticEvent<EventTarget>) => {
    const { fadate } = (e.target as HTMLHtmlElement).dataset;
    const thisDate = formatDateString(fadate, { isGregorian: gregorian });

    if (isSelecting) {
      if (thisDate.isBefore(pivotDate)) {
        setStartDate(thisDate);
        setEndDate(pivotDate);
      } else {
        setStartDate(pivotDate);
        setEndDate(thisDate);
      }
    }
  };

  const daysEventListeners = () => {
    if (!isSelecting) {
      return {
        onClick: changeStartDay,
      };
    } else {
      return {
        onMouseOver: changeStartEndDay,
        onClick: endSelecting,
      };
    }
  };

  const endSelecting = () => {
    console.log(
      "🚀 ~ file: index.tsx ~ line 135 ~ endSelecting ~ endSelecting",
      "endSelecting",
    );
    if (isSelecting) {
      setIsSelecting(false);
    }
  };

  const changeInputValues = (
    e: React.ChangeEvent<HTMLInputElement>,
    start: boolean = true,
  ) => {
    const formattedValue = formatDateString(e.target.value, {
      isGregorian: gregorian,
    });
    if (start && formatDateString(e.target.value, { isGregorian: gregorian })) {
      return setStartDate(
        formatDateString(e.target.value, { isGregorian: gregorian }),
      );
    } else if (formattedValue && formattedValue.isAfter(startDate)) {
      return setEndDate(
        formatDateString(e.target.value, { isGregorian: gregorian }),
      );
    }
    return null;
  };

  const cancelButton = () => {
    const { start, end } = initialRange;
    setIsOpenModal(false);
    setStartDate(start);
    setEndDate(end);
  };

  const submitButton = () => {
    if (onClickSubmitButton) {
      onClickSubmitButton({
        startDate,
        endDate,
      });
    }
    setIsOpenModal(false);
    setInitialRange({ start: startDate, end: endDate });
  };

  return (
    <RangeDateDiv isGregorian={gregorian}>
      <label>{fromLabel}</label>
      <div>
        <MaskedInput
          className="rdp__input--start"
          data-testid="input-start"
          value={startDate.format(getFormatDate({ isGregorian: gregorian }))}
          onClick={toggleModalOpen}
          onChange={(e) => changeInputValues(e)}
          mask={gregorian ? inputEnDateMask : inputFaDateMask}
        />
      </div>
      <label>{toLabel}</label>
      <div>
        <MaskedInput
          className="rdp__input--end"
          data-testid="input-end"
          value={endDate.format(getFormatDate({ isGregorian: gregorian }))}
          onChange={(e) => changeInputValues(e, false)}
          mask={gregorian ? inputEnDateMask : inputFaDateMask}
        />
      </div>
      <Modal
        isOpen={isOpenModal}
        toggleOpen={toggleModalOpen}
        modalZIndex={modalZIndex}
      >
        <Days
          days={days}
          monthName={monthName}
          rangeDays={rangeDays}
          selectedPickerStatus={rangeStatus}
          daysEventListeners={() => daysEventListeners()}
          holiday={weekend}
          theme={theme}
          isSelecting={isSelecting}
          isRenderingButtons={isRenderingButtons}
          ArrowLeft={gregorian ? ArrowRight : ArrowLeft}
          ArrowRight={gregorian ? ArrowLeft : ArrowRight}
          increaseMonth={() => changeMonth(1)}
          decreaseMonth={() => changeMonth(-1)}
          onCancelButton={cancelButton}
          onSubmitButton={submitButton}
          isGregorian={gregorian}
        />
      </Modal>
    </RangeDateDiv>
  );
};

// export class RangeDatePicker extends React.Component<
//   IRangeDatePickerProps,
//   IRangeDatePickerState
// > {
//   public static defaultProps: Partial<IRangeDatePickerProps> = {
//     start: moment().format("jYYYY/jMM/jDD"),
//     end: moment().format("jYYYY/jMM/jDD"),
//     modalZIndex: 9999,
//     ArrowLeft: Arrows.ArrowLeftCMP,
//     ArrowRight: Arrows.ArrowRightCMP,
//     theme: defaultRangeTheme,
//     weekend: [6],
//     isRenderingButtons: true,
//   };

//   constructor(props) {
//     super(props);
//     this.state = {
//       startDate: formatJalaliDate(props.start),
//       endDate: formatJalaliDate(props.end),
//       cloneDays: formatJalaliDate(props.start),
//       monthName: "",
//       days: [],
//       isOpenModal: false,
//       isSelecting: false,
//       rangeStatus: "",
//     };
//   }

//   public componentDidMount(): void {
//     const { monthName, days } = daysInMonth(this.state.cloneDays);
//     const { startDate: start, endDate: end } = this.state;
//     const rangeDays = rangeHelper({ start, end });
//     const rangeStatus = makeRangeStatus(start, end);
//     this.setState((prevState) => {
//       return {
//         days: [...prevState.days, ...days],
//         monthName,
//         rangeDays,
//         rangeStatus,
//         initialRange: {
//           start,
//           end,
//         },
//       };
//     });
//   }

//   public componentDidUpdate(
//     prevProps: Readonly<IRangeDatePickerProps>,
//     prevState: Readonly<IRangeDatePickerState>,
//     snapshot?: any,
//   ): void {
//     if (
//       !prevState.startDate.isSame(this.state.startDate) ||
//       !prevState.endDate.isSame(this.state.endDate)
//     ) {
//       const { startDate: start, endDate: end } = this.state;
//       const rangeDays = rangeHelper({ start, end });
//       const rangeStatus = makeRangeStatus(start, end);

//       this.setState({
//         rangeDays,
//         rangeStatus,
//       });
//     }
//     if (!prevState.cloneDays.isSame(this.state.cloneDays)) {
//       const { monthName, days } = daysInMonth(this.state.cloneDays);
//       this.setState((prevSetState) => {
//         return {
//           days: [...prevSetState.days.slice(prevSetState.days.length), ...days],
//           monthName,
//         };
//       });
//     }
//     if (prevProps.open !== this.props.open) {
//       this.setState({
//         isOpenModal: this.props.open,
//       });
//     }
//     if (prevState.isOpenModal !== this.state.isOpenModal) {
//       const { onToggle } = this.props;

//       if (typeof onToggle === "function") {
//         onToggle(this.state.isOpenModal);
//       }
//     }
//   }

//   public changeMonth = (amount) => {
//     this.setState((prevState) => {
//       return {
//         cloneDays: prevState.cloneDays.clone().add(amount, "month"),
//       };
//     });
//   };
//   public toggleModalOpen = () => {
//     this.setState((prevState) => {
//       return {
//         isOpenModal: !prevState.isOpenModal,
//       };
//     });
//   };
//   public changeStartDay = (e: React.SyntheticEvent<EventTarget>) => {
//     const { fadate, disable } = (e.target as HTMLHtmlElement).dataset;
//     if (!disable) {
//       this.setState({
//         isSelecting: !this.state.isSelecting,
//         startDate: formatJalaliDate(fadate),
//         endDate: formatJalaliDate(fadate),
//       });
//     }
//     return {};
//   };
//   public changeEndDay = (e: React.SyntheticEvent<EventTarget>) => {
//     const { fadate } = (e.target as HTMLHtmlElement).dataset;
//     const { isSelecting } = this.state;
//     if (isSelecting) {
//       this.setState({
//         endDate: formatJalaliDate(fadate),
//       });
//     }
//   };
//   public daysEventListeners = () => {
//     const { isSelecting } = this.state;
//     if (!isSelecting) {
//       return {
//         onClick: this.changeStartDay,
//       };
//     } else {
//       return {
//         onMouseOver: this.changeEndDay,
//         onClick: this.endSelecting,
//       };
//     }
//   };
//   public endSelecting = () => {
//     const { isSelecting } = this.state;

//     if (isSelecting) {
//       this.setState({
//         isSelecting: false,
//       });
//     }
//   };
//   public changeInputValues = (
//     e: React.ChangeEvent<HTMLInputElement>,
//     start: boolean = true,
//   ) => {
//     const formattedValue = formatJalaliDate(e.target.value);
//     if (start && formatJalaliDate(e.target.value)) {
//       return this.setState({
//         startDate: formatJalaliDate(e.target.value),
//       });
//     } else if (formattedValue && formattedValue.isAfter(this.state.startDate)) {
//       return this.setState({
//         endDate: formatJalaliDate(e.target.value),
//       });
//     }
//     return null;
//   };
//   public cancelButton = () => {
//     const { start, end } = this.state.initialRange;
//     this.setState({
//       isOpenModal: false,
//       startDate: start,
//       endDate: end,
//     });
//   };
//   public submitButton = () => {
//     const { startDate: start, endDate: end } = this.state;
//     if (this.props.onClickSubmitButton) {
//       this.props.onClickSubmitButton({
//         start,
//         end,
//       });
//     }
//     this.setState({
//       isOpenModal: false,
//       initialRange: {
//         start,
//         end,
//       },
//     });
//   };

//   public render(): React.ReactNode {
//     const {
//       modalZIndex,
//       ArrowRight,
//       ArrowLeft,
//       theme,
//       fromLabel,
//       toLabel,
//     } = this.props;
//     return (
//       <RangeDateDiv>
//         <label>{fromLabel}</label>
//         <div>
//           <MaskedInput
//             className="rdp__input--start"
//             data-testid="input-start"
//             value={this.state.startDate.format("jYYYY/jMM/jDD")}
//             onClick={this.toggleModalOpen}
//             onChange={(e) => this.changeInputValues(e)}
//             mask={inputFaDateMask}
//           />
//         </div>
//         <label>{toLabel}</label>
//         <div>
//           <MaskedInput
//             className="rdp__input--end"
//             data-testid="input-end"
//             value={this.state.endDate.format("jYYYY/jMM/jDD")}
//             onChange={(e) => this.changeInputValues(e, false)}
//             mask={inputFaDateMask}
//           />
//         </div>
//         <Modal
//           isOpen={this.state.isOpenModal}
//           toggleOpen={this.toggleModalOpen}
//           modalZIndex={modalZIndex}
//         >
//           <Days
//             days={this.state.days}
//             monthName={this.state.monthName}
//             rangeDays={this.state.rangeDays}
//             selectedPickerStatus={this.state.rangeStatus}
//             daysEventListeners={this.daysEventListeners}
//             holiday={this.props.weekend}
//             theme={theme}
//             isSelecting={this.state.isSelecting}
//             isRenderingButtons={this.props.isRenderingButtons}
//             ArrowLeft={ArrowLeft}
//             ArrowRight={ArrowRight}
//             increaseMonth={() => this.changeMonth(1)}
//             decreaseMonth={() => this.changeMonth(-1)}
//             onCancelButton={this.cancelButton}
//             onSubmitButton={this.submitButton}
//           />
//         </Modal>
//       </RangeDateDiv>
//     );
//   }
// }
