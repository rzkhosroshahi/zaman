import * as React from "react";
import { Moment } from "jalali-moment";
import { IDatePickerTheme } from "../../types";
import { IDays } from "../../utils/daysInMonth";

export interface IDatePickerProps {
  value: number | Date | Moment | string;
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
  open?: boolean;
  onToggle?: (arg?: boolean) => any;
}

export interface IDatePickerState {
  value: Moment;
  cloneDays: Moment;
  initialValue?: Moment;
  monthName?: string;
  days?: IDays[];
  isOpenModal: boolean;
  dayStatus: string;
  timePickerView: boolean;
  hour: number;
  minute: number;
}
