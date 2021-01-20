import * as React from "react";
import styled from "../../theme";
import { SyntheticEvent } from "react";
import * as moment from "jalali-moment";
import * as Icons from "../Icons";
// import MaskedInput from "react-text-mask";

import TetherComponent from "react-tether";

import { daysInMonth } from "../../utils/daysInMonth";
import { defaultDatePickerTheme } from "../../theme";
import { Modal } from "../Modal";
import { Days } from "../Days";
import { datePickerStatus } from "../../utils/rangeHelper";
import { IDatePickerProps } from "./types";
import { DatePickerDiv, InputMaskStyled } from "./styled";
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

export const DatePicker: React.FC<IDatePickerProps> = ({
  label,
  value: defaultValue,
  timePicker = true,
  ArrowRight = Icons.ArrowRightCMP,
  ArrowLeft = Icons.ArrowLeftCMP,
  submittable = false,
  modalZIndex = 9999,
  theme = defaultDatePickerTheme,
  weekend,
  DateIcon = Icons.DateIcon,
  ClockIcon = Icons.ClockIcon,
  className = "dp__input",
  onClickSubmitButton,
  onDateChange,
  open,
  gregorian = false,
  modal = false,
  tetherAttachment,
}) => {
  const [initialValue, setInitialValue] = React.useState(moment());
  const [value, setValue] = React.useState(moment());
  const [cloneDays, setCloneDays] = React.useState(moment());
  const [monthName, setMonthName] = React.useState("");
  const [days, setDays] = React.useState([]);
  const [isOpenModal, setIsOpenModal] = React.useState(open);
  const [timePickerView, setTimePickerView] = React.useState(null);
  const [dayStatus, setDayStatus] = React.useState(
    datePickerStatus(moment(initialValue), { isGregorian: gregorian }),
  );
  const [hour, setHour] = React.useState(moment(initialValue).hour());
  const [minute, setMinute] = React.useState(moment(initialValue).minute());

  React.useEffect(() => {
    if (defaultValue) {
      const defaultValueasDate = formatDateFromString(defaultValue, {
        isGregorian: gregorian,
      });
      setInitialValue(defaultValueasDate);
      setValue(defaultValueasDate);
    }
  }, [defaultValue]);

  React.useEffect(() => {
    const { monthName: newMonthName, days: newDays } = daysInMonth(cloneDays, {
      isGregorian: gregorian,
    });
    setDays((oldDays) => [...newDays]);
    setMonthName(newMonthName);
  }, [cloneDays]);

  React.useEffect(() => {
    setDayStatus(datePickerStatus(moment(value), { isGregorian: gregorian }));
  }, [value]);

  const changeMonth = (amount) => {
    setCloneDays((oldClone) => oldClone?.clone().add(amount, "month"));
  };

  const changeHour = (h) => {
    setHour(value.hour(h).hour());
  };

  const changeMinute = (m) => {
    setMinute(value.minute(m).minute());
  };

  const toggleModalOpen = () => {
    setIsOpenModal((prev) => !prev);
  };

  const selectDay = () => ({
    onClick: (e: SyntheticEvent<EventTarget>) => {
      const { fadate } = (e.target as HTMLHtmlElement).dataset;
      setValue(formatDateFromString(fadate, { isGregorian: gregorian }));
      if (onDateChange) {
        if (timePicker) {
          onDateChange({ date: fadate, time: hour + ":" + minute });
        } else onDateChange(fadate);
      }
    },
  });

  const cancelButton = () => {
    setIsOpenModal(false);
    setValue(() => initialValue as moment.Moment);
  };

  const submitButton = () => {
    onClickSubmitButton?.(value);
    setIsOpenModal(false);
    setInitialValue(value);
  };

  const RenderInput = React.forwardRef(({}, ref: any) => (
    <>
      <label>{label}</label>
      <div>
        <span ref={ref}>
          <InputMaskStyled
            className={className}
            data-testid="input-dp"
            value={
              gregorian
                ? value.format(
                    timePicker
                      ? `${getFormatDate({
                          isGregorian: gregorian,
                        })} - ${getFormatTime()}`
                      : getFormatDate({ isGregorian: gregorian }),
                  )
                : toPersianDigits(
                    value.format(
                      timePicker
                        ? `${getFormatDate({
                            isGregorian: gregorian,
                          })} - ${getFormatTime()}`
                        : getFormatDate({ isGregorian: gregorian }),
                    ),
                  )
            }
            mask={
              timePicker
                ? gregorian
                  ? inputEnDateWithTimeMask
                  : inputFaDateWithTimeMask
                : gregorian
                ? inputEnDateMask
                : inputFaDateMask
            }
            onClick={toggleModalOpen}
            // onBlur={(e) => {
            //   setIsOpenModal(false);
            // }}
            style={{ direction: "ltr" }}
          />
        </span>
      </div>
    </>
  ));

  return (
    <DatePickerDiv isGregorian={gregorian}>
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
              selectedPickerStatus={dayStatus}
              selectedDay={value.format(
                getFormatDate({ isGregorian: gregorian }),
              )}
              daysEventListeners={selectDay}
              holiday={weekend || (gregorian ? [0, 6] : [6])}
              theme={theme}
              submittable={submittable}
              ArrowLeft={gregorian ? ArrowRight : ArrowLeft}
              ArrowRight={gregorian ? ArrowLeft : ArrowRight}
              DateIcon={DateIcon}
              ClockIcon={ClockIcon}
              increaseMonth={() => changeMonth(1)}
              decreaseMonth={() => changeMonth(-1)}
              toggleView={setTimePickerView}
              timePickerView={timePickerView}
              hour={hour}
              minute={minute}
              changeHour={changeHour}
              changeMinute={changeMinute}
              onCancelButton={cancelButton}
              onSubmitButton={submitButton}
              timePicker={timePicker}
              isDatePicker
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
          // onResize={() => this.tether && this.tether.position()}
          /* renderTarget: This is what the item will be tethered to, make sure to attach the ref */
          renderTarget={(ref) => <RenderInput ref={ref} />}
          /* renderElement: If present, this item will be tethered to the the component returned by renderTarget */
          renderElement={(ref) =>
            isOpenModal && (
              <Days
                ref={ref}
                days={days}
                monthName={monthName}
                selectedPickerStatus={dayStatus}
                selectedDay={value.format(
                  getFormatDate({ isGregorian: gregorian }),
                )}
                daysEventListeners={selectDay}
                holiday={weekend || (gregorian ? [0, 6] : [6])}
                theme={theme}
                submittable={submittable}
                ArrowLeft={gregorian ? ArrowRight : ArrowLeft}
                ArrowRight={gregorian ? ArrowLeft : ArrowRight}
                DateIcon={DateIcon}
                ClockIcon={ClockIcon}
                increaseMonth={() => changeMonth(1)}
                decreaseMonth={() => changeMonth(-1)}
                toggleView={setTimePickerView}
                timePickerView={timePickerView}
                hour={hour}
                minute={minute}
                changeHour={changeHour}
                changeMinute={changeMinute}
                onCancelButton={cancelButton}
                onSubmitButton={submitButton}
                timePicker={timePicker}
                isDatePicker
                isGregorian={gregorian}
                plain={true}
              />
            )
          }
        />
      )}
    </DatePickerDiv>
  );
};
