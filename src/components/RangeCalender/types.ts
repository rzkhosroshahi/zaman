import * as React from "react";
import { IRangeDate, IRangeDatePickerTheme, IRangeDays } from "../../types";
import { Moment } from "jalali-moment";
import { IDays } from "../../utils/daysInMonth";

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
  open?: boolean;
  modal?: boolean;
  onToggle?: (arg?: boolean) => any;
  monthNameNew?: string;
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
