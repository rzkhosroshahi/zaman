import * as React from "react";
import { SyntheticEvent } from "react";
import * as moment from "jalali-moment";
import * as Icons from "../Icons";

import { daysInMonth } from "../../utils/daysInMonth";
import { defaultDatePickerTheme } from "../../theme";
import { Days } from "../Days";
import { datePickerStatus } from "../../utils/rangeHelper";
import { IDatePickerProps } from "./types";
import { DatePickerDiv } from "./styled";
import { formatDateFromString, getFormatDate } from "../../utils";

export const Calender: React.FC<IDatePickerProps> = ({
  value: defaultValue,
  timePicker = true,
  ArrowRight = Icons.ArrowRightCMP,
  ArrowLeft = Icons.ArrowLeftCMP,
  submittable = false,
  theme = defaultDatePickerTheme,
  weekend,
  DateIcon = Icons.DateIcon,
  ClockIcon = Icons.ClockIcon,
  onClickSubmitButton,
  onDateChange,
  gregorian = false,
}) => {
  const [initialValue, setInitialValue] = React.useState(moment());
  const [value, setValue] = React.useState(moment());
  const [cloneDays, setCloneDays] = React.useState(moment());
  const [monthName, setMonthName] = React.useState("");
  const [days, setDays] = React.useState([]);
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

  // React.useEffect(() => {
  //   // if (!cloneDays.isSame(cloneDays)) {
  //     const { monthName: newMonthName, days: newDays } = daysInMonth(cloneDays);
  //   setDays((oldDays) => [...oldDays, ...newDays]);
  //   setMonthName(monthName);
  //   // }
  // }, [cloneDays]);

  const changeMonth = (amount) => {
    setCloneDays((oldClone) => oldClone?.clone().add(amount, "month"));
  };

  const changeHour = (h) => {
    setHour(value.hour(h).hour());
  };

  const changeMinute = (m) => {
    setMinute(value.minute(m).minute());
  };

  const selectDay = () => ({
    onClick: (e: SyntheticEvent<EventTarget>) => {
      const { fadate } = (e.target as HTMLHtmlElement).dataset;
      setValue(formatDateFromString(fadate, { isGregorian: gregorian }));
      if (onDateChange) onDateChange(fadate);
    },
  });

  const cancelButton = () => {
    setValue(() => initialValue as moment.Moment);
  };

  const submitButton = () => {
    onClickSubmitButton?.(value);
    setInitialValue(value);
  };

  return (
    <DatePickerDiv isGregorian={gregorian}>
      <Days
        days={days}
        monthName={monthName}
        selectedPickerStatus={dayStatus}
        selectedDay={value.format(getFormatDate({ isGregorian: gregorian }))}
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
    </DatePickerDiv>
  );
};
