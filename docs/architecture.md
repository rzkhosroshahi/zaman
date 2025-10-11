---
title: Architecture
---

# Architecture

High-level overview of Zaman internals: engines, hooks, and components.

```
Components (DatePicker, Calendar, TimePicker)
  ↓
UI Components (button, calendar-item, modal)
  ↓
Hooks (useCalendarHandlers, useSlideCalendar)
  ↓
Engines (calendar-engine, date-engine, range-engine)
  ↓
Foundation (utils, theme, i18n)
```

See the repository for deeper docs.
