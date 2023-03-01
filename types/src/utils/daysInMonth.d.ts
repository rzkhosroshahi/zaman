import type { IDays, DatePickerValue, Locales } from '../types';
export interface IDaysInMonth {
    id: number;
    days: IDays[];
    monthName: string;
    month: number;
    today?: string;
}
export declare const getMomentFormatted: (date: DatePickerValue, locale?: keyof typeof Locales) => string;
export declare const daysInMonth: (value: DatePickerValue, locale?: string) => IDaysInMonth;
declare const _default: {
    daysInMonth: (value: DatePickerValue, locale?: string) => IDaysInMonth;
};
export default _default;
