export interface ITheme {
  headBackColor: string;
  headTitleColor: string;
  headArrowColor: string;
  headRangeBackColor: string;
  headRangeColor: string;
  weekDaysColor: string;
  daysColor: string;
  daysBackColor: string;
  holidaysColor: string;
  holidaysBackColor: string;
  startEndRangeColor: string;
  startRangeBackColor: string;
  endRangeBackColor: string;
  continueRangeBackColor: string;
}

export const defaultTheme: ITheme = {
  // head
  headBackColor: "#FFFFFF",
  headTitleColor: "#000",
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

  // start end
  startEndRangeColor: "#000",
  startRangeBackColor: "#D6D6D6",
  endRangeBackColor: "#D6D6D6",
  continueRangeBackColor: "#f3f3f3",
};
