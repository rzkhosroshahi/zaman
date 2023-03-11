import React from 'react'
import { DatePicker } from '../src'

import { createRoot } from 'react-dom/client'
const container = document.getElementById('root')
const root = createRoot(container as HTMLElement)

root.render(
  <React.StrictMode>
    <DatePicker round="roundX2" accentColor="#32c561" />
  </React.StrictMode>
)
