import React from 'react'
import { DatePicker } from '../src/index'

import { createRoot } from 'react-dom/client'
const container = document.getElementById('root')
const root = createRoot(container as HTMLElement)
root.render(<DatePicker />)
