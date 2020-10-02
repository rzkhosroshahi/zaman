import * as React from "react";
import { Dayjs } from "dayjs";
import { IDatePickerTheme } from "../../types";
import { IDays } from "../../utils/daysInMonth";

export interface IDatePickerProps {
  value: number | Date | Dayjs;
  ArrowLeft?: React.ReactType;
  ArrowRight?: React.ReactType;
  ClockIcon?: React.ReactType;
  DateIcon?: React.ReactType;
  modalZIndex?: number;
  theme?: IDatePickerTheme;
  weekend?: number[];
  isRenderingButtons?: boolean;
  timePicker?: boolean;
  onClickSubmitButton?: (arg: any) => any;
  label: string;
  className: string | object;
}

export interface IDatePickerState {
  value: Dayjs;
  cloneDays: Dayjs;
  initialValue?: Dayjs;
  monthName?: string;
  days?: IDays[];
  isOpenModal: boolean;
  dayStatus: string;
  timePickerView: boolean;
}
