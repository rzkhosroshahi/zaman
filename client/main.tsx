import React from 'react'
// @ts-expect-error this is just for development
import { Main } from '../dist';

import { createRoot } from 'react-dom/client'
const container = document.getElementById('root')
const root = createRoot(container as HTMLElement)
root.render(<Main />)
