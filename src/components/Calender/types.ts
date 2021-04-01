import * as React from "react";
import { Moment } from "jalali-moment";
import { IDatePickerTheme } from "../../types";

export interface IDatePickerProps {
  gregorian?: boolean;
  value?: number | Date | Moment;
  ArrowLeft?: React.ReactType;
  ArrowRight?: React.ReactType;
  ClockIcon?: React.ReactType;
  DateIcon?: React.ReactType;
  modalZIndex?: number;
  theme?: IDatePickerTheme;
  weekend?: number[];
  submittable?: boolean;
  timePicker?: boolean;
  onClickSubmitButton?: (arg: any) => any;
  onDateChange?: (arg: any) => any;
  className?: string | object;
  open?: boolean;
  modal?: boolean;
  onToggle?: (arg?: boolean) => any;
}

// export interface IDatePickerState {
//   value: Moment;
//   cloneDays: Moment;
//   initialValue?: Moment;
//   monthName?: string;
//   days?: IDays[];
//   isOpenModal: boolean;
//   dayStatus: string;
//   timePickerView: string | null;
//   hour: number;
//   minute: number;
// }
