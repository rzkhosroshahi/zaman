import { ReactNode } from "react";

export interface ITimePickerProps {
  hour?: number;
  minute?: number;
  changeHour?: (value: number) => void;
  changeMinute?: (value: number) => void;
}

export interface ITimePickerState {
  hour: number;
  minute: number;
  isInsideHour: boolean;
  isSelectingHour: boolean;
  isSelecting: boolean;
}

export interface IHandProps {
  hour: number;
  minute: number;
  isInsideHour: boolean;
  isSelectingHour: boolean;
  children: ReactNode;
}
