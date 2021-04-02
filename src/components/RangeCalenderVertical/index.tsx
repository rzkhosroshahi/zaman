import * as React from "react";
import * as moment from "jalali-moment";
import { defaultRangeTheme } from "../../theme";

import { formatDateFromString, getFormatDate } from "../../utils";
import { daysInMonth } from "../../utils/daysInMonth";
import { Days } from "../DaysVertical";
import * as Arrows from "../Icons";
import { makeRangeStatus, rangeHelper } from "../../utils/rangeHelper";
import { IRangeDatePickerProps } from "./types";
import { RangeDateDiv } from "./styled";

const today = moment();
export const RangeCalenderVertical: React.FC<IRangeDatePickerProps> = ({
  start,
  end,
  ArrowLeft = Arrows.ArrowLeftCMP,
  ArrowRight = Arrows.ArrowRightCMP,
  theme = defaultRangeTheme,
  weekend,
  submittable = false,
  onClickSubmitButton,
  onDateChange,
  gregorian = false,
  inputDate = today,
  hasHead = true,
}) => {
  const [startDate, setStartDate] = React.useState(
    typeof inputDate === "string"
      ? moment(inputDate, gregorian ? "YYYY/MM/DD" : "jYYYY/jMM/jDD")
      : inputDate,
  );
  const [endDate, setEndDate] = React.useState(
    typeof inputDate === "string"
      ? moment(inputDate, gregorian ? "YYYY/MM/DD" : "jYYYY/jMM/jDD")
      : inputDate,
  );
  const [cloneDays, setCloneDays] = React.useState(
    typeof inputDate === "string"
      ? moment(inputDate, gregorian ? "YYYY/MM/DD" : "jYYYY/jMM/jDD")
      : inputDate,
  );
  const [monthName, setMonthName] = React.useState("");
  const [days, setDays] = React.useState([]);
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
    setDays([...newDays]);
    setMonthName(newMonthName);
  }, [cloneDays]);

  React.useEffect(() => {
    changeDate(inputDate);
  }, [inputDate]);

  const changeMonth = (amount) => {
    setCloneDays(cloneDays.clone().add(amount, "month"));
  };

  const changeDate = (date) => {
    setCloneDays(
      typeof date === "string"
        ? moment(date, gregorian ? "YYYY/MM/DD" : "jYYYY/jMM/jDD")
        : date,
    );
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
    if (onDateChange) {
      onDateChange({
        start: startDate.format(getFormatDate({ isGregorian: gregorian })),
        end: endDate.format(getFormatDate({ isGregorian: gregorian })),
      });
    }
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
    setInitialRange({ start: startDate, end: endDate });
  };

  return (
    <RangeDateDiv isGregorian={gregorian}>
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
        // onDateInput={() => changeDate(inputDate)}
        onCancelButton={cancelButton}
        onSubmitButton={submitButton}
        isGregorian={gregorian}
        plain={true}
        hasHead={hasHead}
      />
    </RangeDateDiv>
  );
};
