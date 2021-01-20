import * as React from "react";
import * as moment from "jalali-moment";
import { defaultRangeTheme } from "../../theme";
import TetherComponent from "react-tether";

import {
  formatDateFromString,
  getFormatTime,
  getFormatDate,
  inputFaDateMask,
  inputFaDateWithTimeMask,
  inputEnDateWithTimeMask,
  inputEnDateMask,
  toPersianDigits,
} from "../../utils";
import { daysInMonth } from "../../utils/daysInMonth";
import { Days } from "../Days";
import { Modal } from "../Modal";
import * as Arrows from "../Icons";
import { makeRangeStatus, rangeHelper } from "../../utils/rangeHelper";
import { IRangeDatePickerProps, IRangeDatePickerState } from "./types";
import { RangeDateDiv, InputMaskStyled } from "./styled";

export const RangeDatePicker: React.FC<IRangeDatePickerProps> = ({
  start,
  end,
  modalZIndex = 9999,
  ArrowLeft = Arrows.ArrowLeftCMP,
  ArrowRight = Arrows.ArrowRightCMP,
  theme = defaultRangeTheme,
  weekend,
  submittable = false,
  open,
  className = "rdp__input",
  onToggle,
  onClickSubmitButton,
  onDateChange,
  fromLabel,
  toLabel,
  gregorian = false,
  modal = false,
  tetherAttachment,
}) => {
  const [startDate, setStartDate] = React.useState(start || moment());
  const [endDate, setEndDate] = React.useState(end || moment());
  const [cloneDays, setCloneDays] = React.useState(start || moment());
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
    if (start && end) {
      const startAsdate = formatDateFromString(start, {
        isGregorian: gregorian,
      });
      const endAsdate = formatDateFromString(end, { isGregorian: gregorian });
      setStartDate(startAsdate);
      setEndDate(endAsdate);
      setPivotDate(startAsdate);
    }
  }, [start, end]);

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
    const { fadate, disable } = (e.target as HTMLHtmlElement).dataset;
    if (!disable) {
      setIsSelecting(!isSelecting);
      const selectedDate = formatDateFromString(fadate, {
        isGregorian: gregorian,
      });
      setStartDate(selectedDate);
      setEndDate(selectedDate);
      setPivotDate(selectedDate);
    }
    return {};
  };

  const changeStartEndDay = (e: React.SyntheticEvent<EventTarget>) => {
    const { fadate } = (e.target as HTMLHtmlElement).dataset;
    const thisDate = formatDateFromString(fadate, { isGregorian: gregorian });

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
    if (isSelecting) {
      setIsSelecting(false);
    }
    if (onDateChange)
      onDateChange({
        start: startDate.format(getFormatDate({ isGregorian: gregorian })),
        end: endDate.format(getFormatDate({ isGregorian: gregorian })),
      });
  };

  const changeInputValues = (
    e: React.ChangeEvent<HTMLInputElement>,
    start: boolean = true,
  ) => {
    const formattedValue = formatDateFromString(e.target.value, {
      isGregorian: gregorian,
    });
    if (
      start &&
      formatDateFromString(e.target.value, { isGregorian: gregorian })
    ) {
      return setStartDate(
        formatDateFromString(e.target.value, { isGregorian: gregorian }),
      );
    } else if (formattedValue && formattedValue.isAfter(startDate)) {
      return setEndDate(
        formatDateFromString(e.target.value, { isGregorian: gregorian }),
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

  const RenderInput = React.forwardRef(({}, ref: any) => (
    <>
      <label>{fromLabel}</label>
      <div>
        <span ref={ref}>
          <InputMaskStyled
            className={`${className} start`}
            data-testid="input-start"
            value={
              gregorian
                ? startDate.format(getFormatDate({ isGregorian: gregorian }))
                : toPersianDigits(
                    startDate.format(getFormatDate({ isGregorian: gregorian })),
                  )
            }
            onClick={toggleModalOpen}
            // onBlur={(e) => {
            //   setIsOpenModal(false);
            // }}
            onChange={(e) => changeInputValues(e)}
            mask={gregorian ? inputEnDateMask : inputFaDateMask}
          />
        </span>
      </div>
      <label>{toLabel}</label>
      <div>
        <InputMaskStyled
          className={`${className} end`}
          data-testid="input-end"
          value={
            gregorian
              ? endDate.format(getFormatDate({ isGregorian: gregorian }))
              : toPersianDigits(
                  endDate.format(getFormatDate({ isGregorian: gregorian })),
                )
          }
          onChange={(e) => changeInputValues(e, false)}
          mask={gregorian ? inputEnDateMask : inputFaDateMask}
        />
      </div>
    </>
  ));

  return (
    <RangeDateDiv isGregorian={gregorian}>
      {modal ? (
        <>
          <RenderInput />
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
              holiday={weekend || (gregorian ? [0, 6] : [6])}
              theme={theme}
              isSelecting={isSelecting}
              submittable={submittable}
              ArrowLeft={gregorian ? ArrowRight : ArrowLeft}
              ArrowRight={gregorian ? ArrowLeft : ArrowRight}
              increaseMonth={() => changeMonth(1)}
              decreaseMonth={() => changeMonth(-1)}
              onCancelButton={cancelButton}
              onSubmitButton={submitButton}
              isGregorian={gregorian}
            />
          </Modal>
        </>
      ) : (
        <TetherComponent
          attachment={tetherAttachment || "top center"}
          constraints={[
            {
              to: "scrollParent",
              attachment: "together",
              pin: true,
            },
          ]}
          offset="-10px 0"
          /* renderTarget: This is what the item will be tethered to, make sure to attach the ref */
          renderTarget={(ref) => <RenderInput ref={ref} />}
          /* renderElement: If present, this item will be tethered to the the component returned by renderTarget */
          renderElement={(ref) =>
            isOpenModal && (
              <Days
                ref={ref}
                days={days}
                monthName={monthName}
                rangeDays={rangeDays}
                selectedPickerStatus={rangeStatus}
                daysEventListeners={() => daysEventListeners()}
                holiday={weekend || (gregorian ? [0, 6] : [6])}
                theme={theme}
                isSelecting={isSelecting}
                submittable={submittable}
                ArrowLeft={gregorian ? ArrowRight : ArrowLeft}
                ArrowRight={gregorian ? ArrowLeft : ArrowRight}
                increaseMonth={() => changeMonth(1)}
                decreaseMonth={() => changeMonth(-1)}
                onCancelButton={cancelButton}
                onSubmitButton={submitButton}
                isGregorian={gregorian}
                plain={true}
              />
            )
          }
        />
      )}
    </RangeDateDiv>
  );
};
