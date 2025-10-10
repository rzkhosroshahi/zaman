---
title: Getting Started
---

# Getting Started

Install and use Zaman in minutes.

## Install

```bash
npm install zaman
# or
yarn add zaman
# or
pnpm add zaman
```

## First date picker

```tsx
import { DatePicker } from 'zaman'

export default function App() {
  return <DatePicker onChange={(d) => console.log(d.value)} />
}
```

## Calendars and directions

```tsx
// Persian (Jalali)
<DatePicker locale="fa" direction="rtl" />

// English (Gregorian)
<DatePicker locale="en" direction="ltr" />
```

## Range and time

```tsx
// Date range
;<DatePicker range onChange={({ from, to }) => console.log(from, to)} />

// Time picker
import { TimePicker } from 'zaman'
;<TimePicker clockTime={12} onChange={(t) => console.log(t)} />
```

## Styling quickstart

```tsx
<DatePicker accentColor="#8B5CF6" round="x3" />
```

<div data-reveal>
  <a class="VPButton" href="/components">Next: Components →</a>
  <p style="margin-top:8px;color:var(--vp-c-text-2)">Explore DatePicker, Calendar, TimePicker, and CalendarProvider.</p>
</div>
