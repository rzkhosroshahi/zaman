import * as React from "react";
import { IDays } from "../../utils/daysInMonth";
import { IRangeDays, styledThemes } from "../../types";

export interface IDaysProps {
  days: IDays[];
  theme?: styledThemes;
  rangeDays?: IRangeDays;
  daysEventListeners: any;
  selectedPickerStatus: string;
  selectedDay?: string;
  ArrowLeft: React.ReactType;
  ArrowRight: React.ReactType;
  ClockIcon?: React.ReactType;
  DateIcon?: React.ReactType;
  monthName: string;
  increaseMonth: () => void;
  decreaseMonth: () => void;
  isSelecting?: boolean;
  holiday?: number[];
  isRenderingButtons?: boolean;
  onCancelButton?: () => void;
  onSubmitButton?: () => void;
  toggleView?: (e: any) => void;
  timePicker?: boolean;
  timePickerView?: string | null;
  hour?: number;
  minute?: number;
  changeHour?: (value: number) => void;
  changeMinute?: (value: number) => void;
  isDatePicker?: boolean;
  isGregorian?: boolean;
}
