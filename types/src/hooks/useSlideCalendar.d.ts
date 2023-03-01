import type { Dispatch, RefObject, SetStateAction } from 'react';
import { type IDaysInMonth } from '../utils/daysInMonth';
import type { DatePickerValue } from '../types';
interface UseSliderTypes {
    daysElementRefs: RefObject<HTMLDivElement[]>;
    days: IDaysInMonth[];
    setDays: Dispatch<SetStateAction<IDaysInMonth[]>>;
    value: DatePickerValue;
}
export declare const useSlideCalendar: ({ daysElementRefs, days, setDays, value }: UseSliderTypes) => {
    slideToTheNextMonth: () => void;
    slideToPrevMonth: () => void;
};
export {};
