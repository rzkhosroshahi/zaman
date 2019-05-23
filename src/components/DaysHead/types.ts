import { ReactType } from "react";

export interface IDaysHeadProps {
  ArrowRight: ReactType;
  ArrowLeft: ReactType;
  monthName: string;
  datePickerStatus: string;
  increaseMonth: () => void;
  decreaseMonth: () => void;
}
