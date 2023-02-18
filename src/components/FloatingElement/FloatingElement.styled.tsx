import styled from '@emotion/styled'
import { keyframes } from '@emotion/react'

const slideDown = keyframes`
  from {
    visibility: hidden;
    opacity: 0;
    transform: translateY(-2px);
  }
  to {
    visibility: visible;
    opacity: 1;
    transform: translateY(0px);
  }
`

export const Wrapper = styled.div`
  position: absolute;
  animation: ${slideDown} .1s ease alternate;
`
