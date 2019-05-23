import * as React from "react";
import { IDaysHeadProps } from "./types";
import { DaysHeadContainer, HeadRange, HeadTitle } from "./styled";

export const DaysHead: React.FunctionComponent<IDaysHeadProps> = ({
  monthName,
  datePickerStatus,
  ArrowRight,
  ArrowLeft,
  decreaseMonth,
  increaseMonth,
  timePickerView,
}) => {
  if (timePickerView) {
    return <p>timePickerView</p>;
  }
  return (
    <DaysHeadContainer data-testid="days-head">
      <HeadTitle data-testid="days-head-title">
        <ArrowRight onClick={decreaseMonth} />
        <p data-testid="days-head-title-text">{monthName}</p>
        <ArrowLeft onClick={increaseMonth} />
      </HeadTitle>
      <HeadRange data-testid="days-head-range">{datePickerStatus}</HeadRange>
    </DaysHeadContainer>
  );
};
