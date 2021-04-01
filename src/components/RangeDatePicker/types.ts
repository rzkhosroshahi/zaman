import * as React from "react";
import { IRangeDatePickerTheme } from "../../types";
import { Moment } from "jalali-moment";

export interface IRangeDatePickerProps {
  gregorian?: boolean;
  start?: Moment;
  end?: Moment;
  ArrowLeft?: React.ReactType;
  ArrowRight?: React.ReactType;
  modalZIndex?: number;
  theme?: IRangeDatePickerTheme;
  weekend?: number[];
  submittable?: boolean;
  onClickSubmitButton?: (arg: any) => any;
  onDateChange?: (arg: any) => any;
  fromLabel: string;
  toLabel: string;
  open?: boolean;
  modal?: boolean;
  onToggle?: (arg?: boolean) => any;
  monthNameNew?: string;
  className?: string;
  tetherAttachment?: string;
}

// export interface IRangeDatePickerState {
//   startDate: Moment;
//   endDate: Moment;
//   monthName?: string;
//   days?: IDays[];
//   rangeDays?: IRangeDays;
//   isOpenModal: boolean;
//   isSelecting: boolean;
//   rangeStatus: string;
//   cloneDays: Moment;
//   initialRange?: IRangeDate;
// }
