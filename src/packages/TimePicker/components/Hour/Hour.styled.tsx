import styled from '@emotion/styled'
import { keyframes } from '@emotion/react'
import { numberPositionX, numberPositionY } from '../../../../utils/timePicker'
import { type INumbersProps } from './Hour.types'

const fade = keyframes`
  from {
    opacity: 0;
  }
  to {
    opacity: 1;
  }
`

export const MinuteWithAnimation = styled('div')`
  animation: ${fade} 0.7s linear alternate;
`

export const Numbers = styled('span')<INumbersProps>`
  left: calc(50% - 16px);
  top: ${props => props.top};
  width: 32px;
  color: white;
  height: 32px;
  display: inline-flex;
  position: absolute;
  align-items: center;
  border-radius: 50%;
  justify-content: center;
  user-select: none;
  pointer-events: none;
  color: black;
  transform: ${props =>
  `translate(${numberPositionX(
    props.idx,
    props.clockHalfWidth,
    props.numbersPadd
  )}px,
  ${numberPositionY(props.idx, props.clockHalfWidth, props.numbersPadd)}px)`};
`

Numbers.defaultProps = {
  clockHalfWidth: 130,
  numbersPadd: 20,
  top: '2%'
}
