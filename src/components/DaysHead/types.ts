import { ReactType } from "react";

export interface IDaysHeadProps {
  ArrowRight?: ReactType;
  ArrowLeft?: ReactType;
  monthName: string;
  datePickerStatus: string;
  increaseMonth?: () => void;
  decreaseMonth?: () => void;
  hour?: number;
  minute?: number;
  timePickerView: string | null;
  toggleView: Function;
  isGregorian: boolean;
}
