import * as styledComponents from "styled-components";
import { IDatePickerTheme, IRangeDatePickerTheme, styledThemes } from "./types";

export const defaultRangeTheme: IRangeDatePickerTheme = {
  backColor: "#FFFFFF",
  // head
  headBackColor: "#FFFFFF",
  headTitleColor: "#aeaeae",
  headArrowColor: "#000",
  headRangeBackColor: "#D6D6D6",
  headRangeColor: "#000",

  // weekdays color
  weekDaysColor: "#3F3F3F",

  // days
  daysColor: "#000",
  daysBackColor: "#FFFFFF",
  holidaysColor: "#F50057",
  holidaysBackColor: "#FFFFFF",
  shadowDaysColor: "#ccc",
  shadowDaysBackColor: "#FFF",
  daysRound: "50%",

  // start end
  startRangeBackColor: "#D6D6D6",
  startRangeColor: "#000",
  endRangeBackColor: "#D6D6D6",
  endRangeColor: "#000",
  continueRangeBackColor: "#f3f3f3",
  continueRangeColor: "#000",
  sameRangeBackColor: "#fff",
  sameRangeColor: "#2979ff",
  todayColor: "#617fdf",
  todayBorderColor: "transparent",

  // buttons
  submitBackColor: "#D6D6D6",
  submitHoverBackColor: "#f3f3f3",
  submitColor: "#000",
  submitHoverColor: "#000",
  cancelBackColor: "#fff",
  cancelHoverBackColor: "#D6D6D6",
  cancelColor: "#000",
  cancelHoverColor: "#000",
};

export const defaultDatePickerTheme: IDatePickerTheme = {
  backColor: "#FFFFFF",
  // head
  headBackColor: "#FFFFFF",
  headTitleColor: "#aeaeae",
  headTimeTitleColor: "#617fdf",
  headArrowColor: "#000",
  headRangeBackColor: "#D6D6D6",
  headRangeColor: "#000",

  // weekdays color
  weekDaysColor: "#3F3F3F",

  // days
  daysColor: "#000",
  daysBackColor: "#FFFFFF",
  holidaysColor: "#edb53b",
  holidaysBackColor: "#FFFFFF",
  shadowDaysColor: "#ccc",
  shadowDaysBackColor: "#FFF",
  daysRound: "50%",

  selectDayColor: "#fff",
  selectDayBackColor: "#617fdf",
  todayColor: "#000",
  todayBorderColor: "#617fdf",

  // buttons
  submitBackColor: "#D6D6D6",
  submitHoverBackColor: "#f3f3f3",
  submitColor: "#000",
  submitHoverColor: "#000",
  cancelBackColor: "#fff",
  cancelHoverBackColor: "#D6D6D6",
  cancelColor: "#000",
  cancelHoverColor: "#000",
  changeViewButtonBackColor: "#D6D6D6",
  changeViewButtonHoverBackColor: "#fff",
  changeViewButtonColor: "#000",
  changeViewButtonHoverColor: "#617fdf",
  // time
  timeBackColor: "#f0f0f0",
  timeNumberColor: "#000",
  handBackColor: "#617fdf",
  handCircleColor: "#617fdf",
  selectedNumberColor: "#fff",
};

const {
  default: styled,
  ThemeProvider,
  keyframes,
} = styledComponents as styledComponents.ThemedStyledComponentsModule<styledThemes>;

export { ThemeProvider, keyframes };
export default styled;
