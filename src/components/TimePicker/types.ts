export interface ITimePickerProps {
  hour?: number;
  minute?: number;
}

export interface ITimePickerState {
  hourState: number;
  initialHour: number;
  insideHour: boolean;
}
