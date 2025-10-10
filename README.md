# 📅 Zaman

> **زمان** (Zaman) - Persian for "Time". Because naming a date picker library is the easy part. Making dates less confusing? That's the real challenge. 🎯

<div align="center">

[![npm version](https://img.shields.io/npm/v/zaman.svg)](https://www.npmjs.com/package/zaman)
[![License: MIT](https://img.shields.io/badge/License-MIT-blue.svg)](https://github.com/rzkhosroshahi/zaman/blob/main/LICENSE)
[![TypeScript](https://img.shields.io/badge/TypeScript-Ready-blue.svg)](https://www.typescriptlang.org/)

**A delightfully lightweight React date/time picker that speaks both Jalali (Persian) and Gregorian. No fuss, just dates.** ✨

[Demo](https://codesandbox.io/s/new-version-date-picker-6eeepf) | [NPM](https://www.npmjs.com/package/zaman) | [GitHub](https://github.com/rzkhosroshahi/zaman)

</div>

---

## 🎭 Why Zaman?

- **🌍 Bilingual by Birth**: Fluent in both Jalali (Persian/Shamsi) and Gregorian calendars
- **🎨 Themeable AF**: Beautiful out of the box, customizable to your heart's content
- **🪶 Lightweight Champion**: Because your bundle size has feelings too
- **♿ A11y First**: Accessible, keyboard-friendly, screen-reader approved
- **🌙 RTL & LTR**: Switches directions faster than a confused GPS
- **🎯 TypeScript Native**: Types so good, they'll make you cry (happy tears)
- **🧩 Tree-Shakeable**: Take what you need, leave what you don't
- **🎪 Range Picker Included**: Pick a date, pick ALL the dates!
- **⏰ Time Picker Too**: Because sometimes you need to be more specific than "today"

## 📦 Installation

```bash
# npm
npm install zaman

# yarn
yarn add zaman

# pnpm (the cool kids' choice)
pnpm add zaman
```

That's it. No peer dependency surprises. Just React >=18.2.0 and you're golden. ✨

## 🚀 Quick Start

### Date Picker (The Classic)

```tsx
import { DatePicker } from 'zaman'

function App() {
  return (
    <DatePicker onChange={(date) => console.log('Selected:', date.value)} />
  )
}
```

**Boom!** 💥 You've got yourself a date picker. Ships with sensible defaults and doesn't judge your life choices.

### Range Picker (For the Ambitious)

```tsx
import { DatePicker } from 'zaman'

function VacationPlanner() {
  return (
    <DatePicker
      range
      onChange={({ from, to }) => {
        console.log(`Vacation from ${from} to ${to}`)
        console.log('Out of office message: ACTIVATED 🏖️')
      }}
    />
  )
}
```

### Calendar (Just Vibing)

```tsx
import { Calendar, CalendarProvider } from 'zaman'
import { useState } from 'react'

function MyCalendar() {
  const [date, setDate] = useState(new Date())

  return (
    <CalendarProvider>
      <Calendar
        defaultValue={date}
        onChange={(e) => setDate(new Date(e.value))}
      />
    </CalendarProvider>
  )
}
```

### Time Picker (For the Punctual)

```tsx
import { TimePicker } from 'zaman'

function AlarmClock() {
  return (
    <TimePicker
      clockTime={12} // 12-hour format, because 24-hour is too military
      onChange={({ hour, minute, timeConvention }) =>
        console.log(`Wake up at ${hour}:${minute} ${timeConvention}`)
      }
    />
  )
}
```

## 🎨 Make It Pretty

### Quick Theme (The Lazy Way)

```tsx
import { DatePicker } from 'zaman'
;<DatePicker accentColor="#FF6B6B" round="x4" locale="en" direction="ltr" />
```

### Full Theme Power (The Control Freak Way)

```tsx
import { ThemeProvider, createTheme, DatePicker } from 'zaman'

const myTheme = createTheme({
  colors: {
    primary: {
      DEFAULT: '#8B5CF6', // Purple because why not
      light: '#A78BFA',
      dark: '#7C3AED'
    }
  },
  round: 'thick',
  radius: {
    modal: '16px',
    button: '8px'
  }
})

function App() {
  return (
    <ThemeProvider theme={myTheme}>
      <DatePicker />
    </ThemeProvider>
  )
}
```

**Pro tip**: The theming system works with or without Tailwind. It's framework-agnostic and uses CSS variables under the hood. Fancy! 🎩

## 📚 Component API

### DatePicker / Calendar Props

| Prop                   | Type                                     | Default     | Description                               |
| ---------------------- | ---------------------------------------- | ----------- | ----------------------------------------- |
| `defaultValue`         | `Date \| Dayjs \| number`                | `undefined` | Initial date value                        |
| `onChange`             | `(date) => void`                         | `undefined` | Callback when date changes                |
| `range`                | `boolean`                                | `false`     | Enable range selection                    |
| `from`                 | `Date \| Dayjs \| number`                | `undefined` | Range start date                          |
| `to`                   | `Date \| Dayjs \| number`                | `undefined` | Range end date                            |
| `locale`               | `'fa' \| 'en'`                           | `'fa'`      | Calendar locale                           |
| `direction`            | `'rtl' \| 'ltr'`                         | `'rtl'`     | Text direction                            |
| `accentColor`          | `string`                                 | `'#0D59F2'` | Primary color                             |
| `round`                | `'thin' \| 'x1' \| 'x2' \| 'x3' \| 'x4'` | `'thin'`    | Border radius preset                      |
| `weekend`              | `number[]`                               | `undefined` | Weekend days (0-6)                        |
| `show`                 | `boolean`                                | `false`     | Control visibility (controlled)           |
| `position`             | `'left' \| 'right' \| 'center'`          | `'right'`   | Picker position                           |
| `customShowDateFormat` | `string`                                 | `undefined` | Custom date format (e.g., `'YYYY/MM/DD'`) |
| `inputClass`           | `string`                                 | `null`      | Input CSS class                           |
| `inputAttributes`      | `InputHTMLAttributes`                    | `null`      | Extra input attributes                    |
| `className`            | `string`                                 | `null`      | Wrapper CSS class                         |

### TimePicker Props

| Prop              | Type                                     | Default      | Description                                      |
| ----------------- | ---------------------------------------- | ------------ | ------------------------------------------------ |
| `defaultValue`    | `Date \| Dayjs \| number`                | `new Date()` | Initial time value                               |
| `onChange`        | `(time) => void`                         | `undefined`  | Callback with `{ hour, minute, timeConvention }` |
| `clockTime`       | `12 \| 24`                               | `24`         | Clock format                                     |
| `locale`          | `'fa' \| 'en'`                           | `'fa'`       | Number locale                                    |
| `accentColor`     | `string`                                 | `'#0D59F2'`  | Primary color                                    |
| `round`           | `'thin' \| 'x1' \| 'x2' \| 'x3' \| 'x4'` | `'thin'`     | Border radius preset                             |
| `inputClass`      | `string`                                 | `null`       | Input CSS class                                  |
| `inputAttributes` | `InputHTMLAttributes`                    | `null`       | Extra input attributes                           |

## 🌍 Internationalization (i18n)

Zaman comes with Persian (Farsi) and English built-in, but you can add your own!

### Basic i18n

```tsx
import { DatePicker } from 'zaman';

// Persian Calendar (Jalali/Shamsi)
<DatePicker locale="fa" direction="rtl" />

// Gregorian Calendar
<DatePicker locale="en" direction="ltr" />
```

### Custom Locale (Advanced)

```tsx
import { createI18nProvider } from 'zaman'
import type { LocaleData } from 'zaman'

const arabicLocale: LocaleData = {
  code: 'ar',
  name: 'العربية',
  direction: 'rtl',
  shortWeekDays: [
    { key: 0, name: 'أ' },
    { key: 1, name: 'ا' }
    // ... more days
  ],
  months: [
    { key: 1, name: 'يناير' }
    // ... more months
  ],
  labels: {
    today: 'اليوم',
    selectDate: 'اختر التاريخ'
    // ... more labels
  }
}

const i18n = createI18nProvider({ defaultLocale: 'ar' })
i18n.register('ar', arabicLocale)
```

Check out the [i18n documentation](src/i18n/README.md) for the full locale structure.

## 🎯 Advanced Usage

### Controlled Mode

```tsx
import { DatePicker } from 'zaman'
import { useState } from 'react'

function ControlledExample() {
  const [isOpen, setIsOpen] = useState(false)
  const [date, setDate] = useState(new Date())

  return (
    <>
      <button onClick={() => setIsOpen(true)}>Open Calendar</button>

      <DatePicker
        show={isOpen}
        defaultValue={date}
        onChange={(e) => {
          setDate(new Date(e.value))
          setIsOpen(false)
        }}
      />
    </>
  )
}
```

### Custom Weekend Days

```tsx
// Mark Friday and Saturday as weekends
<DatePicker weekend={[5, 6]} />

// No weekends (sad)
<DatePicker weekend={[]} />
```

### Dark Mode Example

```tsx
import { ThemeProvider, createTheme } from 'zaman'

const darkTheme = createTheme({
  colors: {
    background: '#1a1a1a',
    foreground: '#ffffff',
    primary: {
      DEFAULT: '#60a5fa',
      light: '#93c5fd',
      dark: '#3b82f6'
    },
    gray: {
      0: '#ffffff',
      100: '#f3f4f6',
      // ... customize all gray shades
      900: '#111827'
    }
  }
})

;<ThemeProvider theme={darkTheme}>
  <DatePicker />
</ThemeProvider>
```

## 🎪 Recipes & Examples

### Birthday Picker

```tsx
<DatePicker
  locale="en"
  direction="ltr"
  accentColor="#FF69B4"
  round="x4"
  onChange={(date) => {
    console.log('🎂 Party time!')
  }}
/>
```

### Deadline Picker (Stressful)

```tsx
<DatePicker
  accentColor="#EF4444"
  onChange={(date) => {
    console.log('⏰ Panic mode: ACTIVATED')
  }}
/>
```

### Meeting Scheduler

```tsx
<DatePicker
  range
  locale="en"
  onChange={({ from, to }) => {
    const duration = to - from
    if (duration > 3600000) {
      // more than 1 hour
      console.log('⚠️  This meeting could have been an email')
    }
  }}
/>
```

## 🎓 Styling & Customization

### CSS Variables

All theme values are exposed as CSS variables. Override them for instant customization:

```css
.my-calendar {
  --zaman-primary: #ff6b6b;
  --zaman-primary-light: #ff8787;
  --zaman-primary-dark: #ff5252;
  --zaman-radius-item: 12px;
  --zaman-calendar-gap: 8px;
}
```

### Available CSS Variables

```css
/* Colors */
--zaman-primary
--zaman-primary-light
--zaman-primary-lighter
--zaman-primary-dark
--zaman-primary-foreground
--zaman-gray-{0-900}
--zaman-weekend
--zaman-disabled
--zaman-border
--zaman-background
--zaman-foreground

/* Spacing */
--zaman-calendar-item-width
--zaman-calendar-item-height
--zaman-calendar-gap
--zaman-header-height
--zaman-modal-padding

/* Radius */
--zaman-radius-item
--zaman-radius-modal
--zaman-radius-button

/* Typography */
--zaman-text-{xs|sm|base|lg|xl|2xl}
```

### Custom Input Styling

```tsx
<DatePicker
  inputClass="my-custom-input"
  inputAttributes={{
    placeholder: 'Pick a date, any date...',
    'aria-label': 'Birthday selector'
  }}
/>
```

## 🧪 TypeScript Support

Full TypeScript support out of the box. No `@types/*` packages needed!

```tsx
import type {
  DatePickerProps,
  CalendarProps,
  TimePickerProps,
  ThemeConfig
} from 'zaman'

// Fully typed!
const config: DatePickerProps = {
  locale: 'en',
  onChange: (date) => {
    // date is properly typed
    console.log(date.value)
  }
}
```

## 🤝 Contributing

We love contributions! Here's how to get started:

```bash
# Clone the repo
git clone https://github.com/rzkhosroshahi/zaman.git

# Install dependencies (we use pnpm)
pnpm install

# Start development server
pnpm dev

# Run tests
pnpm test

# Run e2e tests
pnpm test:e2e
```

Check out [CONTRIBUTING.md](CONTRIBUTING.md) for more details.

### Project Structure

```
zaman/
├── src/
│   ├── packages/          # Main components
│   │   ├── calendar/      # Calendar component
│   │   ├── date-picker/   # DatePicker component
│   │   └── time-picker/   # TimePicker component
│   ├── components/        # Shared UI components
│   ├── core/             # Calendar engines
│   ├── hooks/            # React hooks
│   ├── i18n/             # Internationalization
│   ├── theme/            # Theming system
│   └── utils/            # Utilities
└── tests/                # Test files
```

## 🎯 Browser Support

- ✅ Chrome (last 2 versions)
- ✅ Firefox (last 2 versions)
- ✅ Safari (last 2 versions)
- ✅ Edge (last 2 versions)
- ✅ Mobile browsers (iOS Safari, Chrome Mobile)

## 📄 License

MIT © [Reza Khosroshahi](https://github.com/rzkhosroshahi)

Use it, fork it, customize it, sell it, whatever. Just don't blame us if dates still confuse you. We tried. 🤷‍♂️

## 🙏 Credits

- **Design**: Huge shoutout to [Ali Samandar](https://dribbble.com/eanlami) for the beautiful design
- **Calendar Engine**: Powered by [Day.js](https://day.js.org/)
- **Made with**: ☕ Coffee, 🎵 Music, and 😅 Lots of date-related confusion

## 🔗 Links

- [📦 NPM Package](https://www.npmjs.com/package/zaman)
- [🎮 Live Demo](https://codesandbox.io/s/new-version-date-picker-6eeepf)
- [🐛 Issues](https://github.com/rzkhosroshahi/react-jalali-datepicker/issues)
- [📖 Changelog](CHANGELOG.md)

## 💬 Community

Got questions? Found a bug? Want to share your Zaman implementation?

- Open an [issue](https://github.com/rzkhosroshahi/react-jalali-datepicker/issues)
- Star the repo ⭐ (it makes us happy)
- Tell your friends (spread the date picker love)

---

<div align="center">

**Made with ❤️ for developers who deal with dates**

_Remember: Time is an illusion. Lunchtime doubly so. But with Zaman, at least picking dates is easy._

</div>
