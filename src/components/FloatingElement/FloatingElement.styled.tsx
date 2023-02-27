import styled from '@emotion/styled'
import { keyframes } from '@emotion/react'
import { ANIMATE_FUNC } from '../../constants'

const slideDown = keyframes`
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

export const Wrapper = styled.div`
  position: absolute;
  animation: ${slideDown} .3s ${ANIMATE_FUNC} alternate;
`
