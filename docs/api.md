---
title: API Reference
---

# API Reference

## DatePickerProps

```ts
interface DatePickerProps {
  defaultValue?: Date | number
  show?: boolean
  onChange?: (date: any) => void
  range?: boolean
  from?: Date | number
  to?: Date | number
  locale?: 'fa' | 'en'
  direction?: 'rtl' | 'ltr'
  customShowDateFormat?: string
  accentColor?: string
  round?: 'thin' | 'x1' | 'x2' | 'x3' | 'x4'
  className?: string
  inputClass?: string
  weekends?: number[]
  position?: 'left' | 'right' | 'center'
  inputAttributes?: React.InputHTMLAttributes<HTMLInputElement>
}
```

See more in source code and TypeScript definitions.
