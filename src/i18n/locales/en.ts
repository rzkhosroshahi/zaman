import type { LocaleData } from '../i18n-provider.types'

export const en: LocaleData = {
  code: 'en',
  name: 'English',
  direction: 'ltr',
  shortWeekDays: [
    { key: 0, name: 'S' },
    { key: 1, name: 'M' },
    { key: 2, name: 'T' },
    { key: 3, name: 'W' },
    { key: 4, name: 'T' },
    { key: 5, name: 'F' },
    { key: 6, name: 'S' }
  ],
  longWeekDays: [
    { key: 0, name: 'Sunday' },
    { key: 1, name: 'Monday' },
    { key: 2, name: 'Tuesday' },
    { key: 3, name: 'Wednesday' },
    { key: 4, name: 'Thursday' },
    { key: 5, name: 'Friday' },
    { key: 6, name: 'Saturday' }
  ],
  months: [
    { key: 1, name: 'January' },
    { key: 2, name: 'February' },
    { key: 3, name: 'March' },
    { key: 4, name: 'April' },
    { key: 5, name: 'May' },
    { key: 6, name: 'June' },
    { key: 7, name: 'July' },
    { key: 8, name: 'August' },
    { key: 9, name: 'September' },
    { key: 10, name: 'October' },
    { key: 11, name: 'November' },
    { key: 12, name: 'December' }
  ],
  shortMonths: [
    { key: 1, name: 'Jan' },
    { key: 2, name: 'Feb' },
    { key: 3, name: 'Mar' },
    { key: 4, name: 'Apr' },
    { key: 5, name: 'May' },
    { key: 6, name: 'Jun' },
    { key: 7, name: 'Jul' },
    { key: 8, name: 'Aug' },
    { key: 9, name: 'Sep' },
    { key: 10, name: 'Oct' },
    { key: 11, name: 'Nov' },
    { key: 12, name: 'Dec' }
  ],
  format: 'YYYY-MM-DD',
  dateFormat: 'YYYY-MM-DD',
  timeFormat: 'HH:mm',
  dateTimeFormat: 'YYYY-MM-DD HH:mm',
  labels: {
    today: 'Today',
    yesterday: 'Yesterday',
    tomorrow: 'Tomorrow',
    selectDate: 'Select Date',
    selectTime: 'Select Time',
    selectRange: 'Select Range',
    from: 'From',
    to: 'To',
    am: 'AM',
    pm: 'PM',
    hour: 'Hour',
    minute: 'Minute',
    second: 'Second',
    year: 'Year',
    month: 'Month',
    day: 'Day',
    week: 'Week',
    close: 'Close',
    clear: 'Clear',
    ok: 'OK',
    cancel: 'Cancel',
    nextMonth: 'Next Month',
    previousMonth: 'Previous Month',
    nextYear: 'Next Year',
    previousYear: 'Previous Year'
  },
  weekStartsOn: 0 // Sunday
}

export default en
