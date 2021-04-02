import { Moment } from "jalali-moment";

export interface IRangeDate {
  start: Moment;
  end: Moment;
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
  daysRoundStart?: any;
  daysRoundEnd?: any;
  daysRoundContinue?: string;
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
  shadowDaysColor?: string;
  shadowDaysBackColor?: string;
  todayColor?: string;
  todayBorderColor?: string;
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
  shadowDaysColor?: string;
  shadowDaysBackColor?: string;
  todayColor?: string;
  todayBorderColor?: string;
}

export type styledThemes = IRangeDatePickerTheme & IDatePickerTheme;
