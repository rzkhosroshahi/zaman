import { IRangeDay, styledThemes } from "../../types";

export interface IDayProps {
  startEndRange?: IRangeDay;
  theme: styledThemes;
  isSelecting?: boolean;
  daysEvent?: () => void;
  holiday?: boolean;
  selectedDay?: boolean;
  today: boolean;
  isGregorian: boolean;
}
