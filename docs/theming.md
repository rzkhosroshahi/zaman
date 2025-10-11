---
title: Theming
---

# Theming

Use props for quick tweaks or `ThemeProvider` for full control.

## Quick props

```tsx
<DatePicker accentColor="#FF6B6B" round="x3" />
```

## ThemeProvider

```tsx
import { ThemeProvider, createTheme, DatePicker } from 'zaman'

const theme = createTheme({
  colors: {
    primary: {
      DEFAULT: '#3B82F6',
      light: '#60A5FA',
      dark: '#2563EB',
      foreground: '#FFFFFF'
    }
  },
  round: 'x3'
})

export default function App() {
  return (
    <ThemeProvider theme={theme}>
      <DatePicker />
    </ThemeProvider>
  )
}
```

## CSS variables

```css
.my-calendar {
  --zaman-primary: #3b82f6;
  --zaman-radius-item: 8px;
}
```
