import type { DatePickerValue, Locales } from '../../types';
export interface DatePickerProps {
    defaultValue?: DatePickerValue;
    locale?: keyof Locales;
}
