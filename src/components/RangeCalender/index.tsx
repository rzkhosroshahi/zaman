import * as React from "react";
import * as moment from "jalali-moment";
import { defaultRangeTheme } from "../../theme";

import { formatDateString, getFormatDate } from "../../utils";
import { daysInMonth } from "../../utils/daysInMonth";
import { Days } from "../Days";
import * as Arrows from "../Icons";
import { makeRangeStatus, rangeHelper } from "../../utils/rangeHelper";
import { IRangeDatePickerProps, IRangeDatePickerState } from "./types";
import { RangeDateDiv } from "./styled";

export const RangeCalender: React.FC<IRangeDatePickerProps> = ({
  start = moment(),
  end = moment(),
  ArrowLeft = Arrows.ArrowLeftCMP,
  ArrowRight = Arrows.ArrowRightCMP,
  theme = defaultRangeTheme,
  weekend,
  submittable = false,
  onClickSubmitButton,
  onDateChange,
  fromLabel,
  toLabel,
  gregorian = false,
}) => {
  const [startDate, setStartDate] = React.useState(start);
  const [endDate, setEndDate] = React.useState(end);
  const [cloneDays, setCloneDays] = React.useState(start);
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

  const changeMonth = (amount) => {
    setCloneDays(cloneDays.clone().add(amount, "month"));
  };

  const changeStartDay = (e: React.SyntheticEvent<EventTarget>) => {
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
        onCancelButton={cancelButton}
        onSubmitButton={submitButton}
        isGregorian={gregorian}
        plain={true}
      />
    </RangeDateDiv>
  );
};
