import styled from '@emotion/styled'
import { CALENDAR_WIDTH, CALENDAR_HEIGHT } from '../../constants'
import { radius } from '../../style/radius'
import { isRtl } from '../../utils'
import type { DaysPickerProps } from './DaysPicker.types'

export const Wrapper = styled.div<Pick<DaysPickerProps, 'round'>>`
  overflow: hidden;
  position: relative;
  width: ${CALENDAR_WIDTH}px;
  min-height: ${CALENDAR_HEIGHT}px;
  border: 1px solid ${props => props.theme.colors.gray[40]};
  background-color: #fff;
  border-radius: ${props => props.round !== undefined && radius[props.round].wrapper}px;
`

export const WrapperDays = styled.div`
  display: flex;
  position: absolute;
  overflow: hidden;
  right: ${isRtl() ? '8px' : 'unset'};
  left: ${!isRtl() ? '8px' : 'unset'};
`

export const SlideDays = styled.div`
  will-change: transform;
  display: flex;
  flex-direction: column;
  width: ${CALENDAR_WIDTH}px;
  gap: 4px;
`
export const Days = styled.div`
  display: flex;
  gap: 4px;
`
