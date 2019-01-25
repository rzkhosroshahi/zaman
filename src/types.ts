import { Moment } from "jalali-moment";

export interface IEvents {
  start: string;
  end: string;
  type: string;
  description?: string;
  duration?: number;
  color?: string;
}

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
