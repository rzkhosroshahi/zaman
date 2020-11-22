import * as React from "react";
import { IRangeDate, IRangeDatePickerTheme, IRangeDays } from "../../types";
import { Moment } from "jalali-moment";
import { IDays } from "../../utils/daysInMonth";

export interface IRangeDatePickerProps {
  start: string;
  end: string;
  ArrowLeft: React.ReactType;
  ArrowRight: React.ReactType;
  modalZIndex?: number;
  theme?: IRangeDatePickerTheme;
  weekend?: number[];
  isRenderingButtons?: boolean;
  onClickSubmitButton?: (arg: any) => any;
  fromLabel: string;
  toLabel: string;
  open?: boolean;
  onToggle?: (arg?: boolean) => any;
}

export interface IRangeDatePickerState {
  startDate: Moment;
  endDate: Moment;
  monthName?: string;
  days?: IDays[];
  rangeDays?: IRangeDays;
  isOpenModal: boolean;
  isSelecting: boolean;
  rangeStatus: string;
  cloneDays: Moment;
  initialRange?: IRangeDate;
}
