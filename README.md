# Zaman

Zaman is a lightweight React component for creating a Jalali/Georgian datepicker. There is also a range datepicker and timepicker in Zaman. The module can also be customized to match the appearance of your designs.

#### Design

I appreciate [Ali Samandar](https://dribbble.com/eanlami)'s design of this library. Give him your support.

check out the [codesandbox link.](https://codesandbox.io/s/new-version-date-picker-6eeepf)
## Install

with npm

`$ npm i zaman`

with yarn

`$ yarn add zaman`

## Props
### Date Picker and Calendar

| props                | type                                                       | default   |
|----------------------|------------------------------------------------------------|-----------|
| defaultValue         | timestamp &#124; Date &#124; Dayjs                         | undefined |
| weekend              | number[]                                                   | undefined |
| round                | string one of thin &#124; x1 &#124; x2 &#124; x3 &#124; x4 | thin      |
| accentColor          | string                                                     | #0D59F2   |
| locale               | string one of fa &#124; en                                 | fa        |
| direction            | string one of rtl &#124; ltr                               | rtl       |
| onChange             | function                                                   | undefined |
| range                | boolean                                                    | false     |
| from                 | timestamp &#124; Date &#124; Dayjs                         | undefined |
| to                   | timestamp &#124; Date &#124; Dayjs                         | undefined |
| show                 | boolean                                                    | false     |
| inputClass           | string                                                     | null      |
| inputAttributes      | object of InputHTMLAttributes                              | null      |
| className            | string                                                     | null      |
| customShowDateFormat | string  ex: YYYY MMMM DD or DD/MM etc.                     | undefined |
| position             | right &#124; left  &#124; center                           | right     |


### Calendar Provider

| props       | type                                                       | default |
|-------------|------------------------------------------------------------|---------|
| round       | string one of thin &#124; x1 &#124; x2 &#124; x3 &#124; x4 | thin    |
| accentColor | string                                                     | #0D59F2 |
| locale      | string one of fa &#124; en                                 | fa      |
| direction   | string one of rtl &#124; ltr                               | rtl     |
| children    | ReactNode                                                  | null    |



### Time Picker

| props           | type                                                       | default |
|-----------------|------------------------------------------------------------|---------|
| defaultValue    | timestamp &#124; Date &#124; Dayjs                         | Date    |
| round           | string one of thin &#124; x1 &#124; x2 &#124; x3 &#124; x4 | thin    |
| accentColor     | string                                                     | #0D59F2 |
| locale          | string one of fa &#124; en                                 | fa      |
| clockTime       | number one of 12 &#124; 24                                 | 24      |
| inputClass      | string                                                     | null    |
| inputAttributes | object of InputHTMLAttributes                              | null    |

## Usages
### Date picker

``` jsx
import { DatePicker } from "zaman";

function App() {
  return (
    <DatePicker onChange={(e) => console.log(e.value)} />
  )
}
```

### Range date picker

``` jsx
import { DatePicker } from "zaman";

function App() {
  return (
    <DatePicker onChange={(e) => console.log(e.from, e.to)} range />
  )
}
```

### Calendar

``` jsx
import { Calendar, CalendarProvider } from "zaman";

function App() {
  const [calendarValue, setCalendarValue] = useState(new Date())

  return (
    <CalendarProvider>
      <Calendar
        defaultValue={calendarValue}
        onChange={(e) => setCalendarValue(new Date(e.value))}
      />
    </CalendarProvider>
  )
}
```


### Time picker

``` jsx
import { TimePicker } from "zaman";

function App() {
  return (
    <TimePicker
      onChange={(e) => console.log(e.hour, e.minute, e.timeConvention)}
    />
  )
}
```

## License


[MIT License](https://github.com/rzkhosroshahi/zaman/blob/main/LICENSE)
