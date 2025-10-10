---
title: Components
---

# Components

Zaman exposes four main components.

## DatePicker

```tsx
import { DatePicker } from 'zaman'
;<DatePicker onChange={(d) => console.log(d.value)} />
```

## Calendar (inline)

```tsx
import { Calendar, CalendarProvider } from 'zaman'
;<CalendarProvider>
  <Calendar defaultValue={new Date()} onChange={(d) => console.log(d)} />
  {/* Calendar must be wrapped in provider */}
</CalendarProvider>
```

## TimePicker

```tsx
import { TimePicker } from 'zaman'
;<TimePicker clockTime={24} onChange={(t) => console.log(t)} />
```

## CalendarProvider

```tsx
import { CalendarProvider, Calendar } from 'zaman'
;<CalendarProvider>
  <Calendar />
</CalendarProvider>
```

<div data-reveal>
  <a class="VPButton" href="/examples">See Examples →</a>
</div>
