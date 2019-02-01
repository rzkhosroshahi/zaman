import { Moment } from "jalali-moment";

export interface IRangeDate {
  start: Moment;
  end: Moment;
}

export interface IRangeDay {
  status: string;
}

export interface IRangeDays {
  [s: string]: Partial<IRangeDay>;
}
