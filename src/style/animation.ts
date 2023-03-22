import { keyframes } from '@emotion/react'

export const slideDown = keyframes`
  from {
    visibility: hidden;
    opacity: 0;
    transform: translateY(-4px);
  }
  to {
    visibility: visible;
    opacity: 1;
    transform: translateY(0px);
  }
`

export const fade = keyframes`
  from {
    opacity: 0;
  }
  to {
    opacity: 1;
  }
`
