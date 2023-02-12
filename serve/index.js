import React from 'react'
import App from '../dist/index.js'
import { createRoot } from 'react-dom/client'

const container = document.getElementById('app')
const root = createRoot(container)
root.render(<App />)
