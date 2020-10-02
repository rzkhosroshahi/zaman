import { Dayjs } from "dayjs";

export interface IRangeDate {
  start: Dayjs;
  end: Dayjs;
}

export interface IRangeDay {
  status: string;
}

export interface IRangeDays {
  [s: string]: IRangeDay;
}

export interface ITheme {
  backColor?: string;
  headBackColor?: string;
  headTitleColor?: string;
  headArrowColor?: string;
  headRangeBackColor?: string;
  headRangeColor?: string;
  weekDaysColor?: string;
  daysColor?: string;
  daysRound?: any;
  daysBackColor?: string;
  holidaysColor?: string;
  holidaysBackColor?: string;
  submitBackColor?: string;
  submitHoverBackColor?: string;
  submitColor?: string;
  submitHoverColor?: string;
  cancelBackColor?: string;
  cancelHoverBackColor?: string;
  cancelColor?: string;
  cancelHoverColor?: string;
}

export interface IRangeDatePickerTheme extends ITheme {
  startRangeBackColor?: string;
  endRangeBackColor?: string;
  continueRangeBackColor?: string;
  continueRangeColor?: string;
  startRangeColor?: string;
  endRangeColor?: string;
  sameRangeBackColor?: string;
  sameRangeColor?: string;
}

export interface IDatePickerTheme extends ITheme {
  headTimeTitleColor?: string;
  selectDayBackColor?: string;
  selectDayColor?: string;
  changeViewButtonBackColor?: string;
  changeViewButtonHoverBackColor?: string;
  changeViewButtonColor?: string;
  changeViewButtonHoverColor?: string;
  timeNumberColor?: string;
  timeBackColor?: string;
  handBackColor?: string;
  handCircleColor?: string;
  selectedNumberColor?: string;
}

export type styledThemes = IRangeDatePickerTheme & IDatePickerTheme;
