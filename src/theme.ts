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
  startEndDayColor: string;
  startEndDayBackColor: string;
}

export const theme: ITheme = {
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
  startEndDayColor: "#000",
  startEndDayBackColor: "#D6D6D6",
};
