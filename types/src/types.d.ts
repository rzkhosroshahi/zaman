import type { Moment } from 'jalali-moment';
export type DatePickerValue = number | Date | Moment | string;
export interface IDays {
    day: string;
    utc: string;
    faDate: string;
    disable: boolean;
}
export declare enum Locales {
    fa = 0,
    en = 1
}
