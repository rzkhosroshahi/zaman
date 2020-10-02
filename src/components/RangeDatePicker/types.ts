import * as React from "react";
import { IRangeDate, IRangeDatePickerTheme, IRangeDays } from "../../types";
import { Dayjs } from "dayjs";
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
}

export interface IRangeDatePickerState {
  startDate: Dayjs;
  endDate: Dayjs;
  monthName?: string;
  days?: IDays[];
  rangeDays?: IRangeDays;
  isOpenModal: boolean;
  isSelecting: boolean;
  rangeStatus: string;
  cloneDays: Dayjs;
  initialRange?: IRangeDate;
}
