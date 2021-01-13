import { IRangeDay, styledThemes } from "../../types";

export interface IDayProps {
  startEndRange?: IRangeDay;
  theme: styledThemes;
  isSelecting?: boolean;
  daysEvent?: () => void;
  holiday?: number[];
  selectedDay?: boolean;
  today: boolean;
  isGregorian: boolean;
}
