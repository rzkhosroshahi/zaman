---
title: Internationalization
---

# Internationalization

Zaman supports Persian (Jalali) and English (Gregorian) out of the box.

```tsx
<DatePicker locale="fa" direction="rtl" />
<DatePicker locale="en" direction="ltr" />
```

Use custom formats and weekends:

```tsx
<DatePicker customShowDateFormat="DD/MM/YYYY" weekends={[0, 6]} />
```
