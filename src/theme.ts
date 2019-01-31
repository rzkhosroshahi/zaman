export interface ITheme {
  backColor: string;
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
  startRangeBackColor: string;
  endRangeBackColor: string;
  continueRangeBackColor: string;
  continueRangeColor: string;
  startRangeColor: string;
  endRangeColor: string;
  sameRangeBackColor: string;
  sameRangeColor: string;
}

export const defaultTheme: ITheme = {
  backColor: "#FFFFFF",
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
  startRangeBackColor: "#D6D6D6",
  startRangeColor: "#000",
  endRangeBackColor: "#D6D6D6",
  endRangeColor: "#000",
  continueRangeBackColor: "#f3f3f3",
  continueRangeColor: "#000",
  sameRangeBackColor: "#D6D6D6",
  sameRangeColor: "#000",
};
