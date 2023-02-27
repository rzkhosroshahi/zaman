import moment from 'jalali-moment';
import type { Moment } from 'jalali-moment';
export interface IDays {
    day: string;
    utc: string;
    faDate: string;
    disable: boolean;
}
export interface IDaysInMonth {
    days: IDays[];
    monthName: string;
    month: number;
    today?: string;
}
export declare const daysInMonth: (date: Moment, locale?: string) => IDaysInMonth;
declare const _default: {
    daysInMonth: (date: moment.Moment, locale?: string) => IDaysInMonth;
};
export default _default;
