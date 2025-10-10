import type { LocaleData } from '../i18n-provider.types'

export const fa: LocaleData = {
  code: 'fa',
  name: 'فارسی',
  direction: 'rtl',
  shortWeekDays: [
    { key: 0, name: 'ش' },
    { key: 1, name: 'ی' },
    { key: 2, name: 'د' },
    { key: 3, name: 'س' },
    { key: 4, name: 'چ' },
    { key: 5, name: 'پ' },
    { key: 6, name: 'ج' }
  ],
  longWeekDays: [
    { key: 0, name: 'شنبه' },
    { key: 1, name: 'یکشنبه' },
    { key: 2, name: 'دوشنبه' },
    { key: 3, name: 'سه‌شنبه' },
    { key: 4, name: 'چهارشنبه' },
    { key: 5, name: 'پنجشنبه' },
    { key: 6, name: 'جمعه' }
  ],
  months: [
    { key: 1, name: 'فروردین' },
    { key: 2, name: 'اردیبهشت' },
    { key: 3, name: 'خرداد' },
    { key: 4, name: 'تیر' },
    { key: 5, name: 'مرداد' },
    { key: 6, name: 'شهریور' },
    { key: 7, name: 'مهر' },
    { key: 8, name: 'آبان' },
    { key: 9, name: 'آذر' },
    { key: 10, name: 'دی' },
    { key: 11, name: 'بهمن' },
    { key: 12, name: 'اسفند' }
  ],
  format: 'YYYY/MM/DD',
  dateFormat: 'YYYY/MM/DD',
  timeFormat: 'HH:mm',
  dateTimeFormat: 'YYYY/MM/DD HH:mm',
  labels: {
    today: 'امروز',
    yesterday: 'دیروز',
    tomorrow: 'فردا',
    selectDate: 'انتخاب تاریخ',
    selectTime: 'انتخاب زمان',
    selectRange: 'انتخاب بازه',
    from: 'از',
    to: 'تا',
    am: 'ق.ظ',
    pm: 'ب.ظ',
    hour: 'ساعت',
    minute: 'دقیقه',
    second: 'ثانیه',
    year: 'سال',
    month: 'ماه',
    day: 'روز',
    week: 'هفته',
    close: 'بستن',
    clear: 'پاک کردن',
    ok: 'تایید',
    cancel: 'لغو',
    nextMonth: 'ماه بعد',
    previousMonth: 'ماه قبل',
    nextYear: 'سال بعد',
    previousYear: 'سال قبل'
  },
  weekStartsOn: 6 // Saturday
}

export default fa
