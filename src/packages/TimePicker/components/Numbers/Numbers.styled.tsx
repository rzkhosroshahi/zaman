import styled from '@emotion/styled'
import { numberPositionX, numberPositionY } from '../../../../utils/timePicker'
import { fade } from '../../../../style/animation'
import type { NumbersItemProps } from './Numbers.types'

export const MinuteWithAnimation = styled('div')`
  animation: ${fade} 0.7s linear alternate;
`

export const NumbersItem = styled.span<NumbersItemProps>`
  left: calc(50% - 16px);
  top: ${(props) => props.top};
  width: 32px;
  height: 32px;
  display: inline-flex;
  position: absolute;
  align-items: center;
  border-radius: 32px;
  justify-content: center;
  user-select: none;
  pointer-events: none;
  color: black;
  transform: ${(props) =>
    `translate(${numberPositionX(
      props.idx,
      props.clockHalfWidth,
      props.numbersPadd
    )}px,
  ${numberPositionY(props.idx, props.clockHalfWidth, props.numbersPadd)}px)`};
`

NumbersItem.defaultProps = {
  clockHalfWidth: 130,
  numbersPadd: 24,
  top: '2%'
}
