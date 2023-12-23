import React from 'react'
import { isRtl } from '../../../utils'

export const ChevronLeft = () => (
  <svg
    xmlns="http://www.w3.org/2000/svg"
    width="20"
    height="20"
    viewBox="0 0 24 24"
    fill="none"
    stroke="currentColor"
    strokeWidth="2"
    strokeLinecap="round"
    strokeLinejoin="round"
    className="feather feather-chevron-left"
    style={{ transform: isRtl() ? 'unset' : 'rotate(180deg)' }}
  >
    <polyline points="15 18 9 12 15 6"></polyline>
  </svg>
)

export default ChevronLeft
