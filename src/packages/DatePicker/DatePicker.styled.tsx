import styled from '@emotion/styled'
import { ITEMS_WIDTH } from '../../constants'
import type { DatePickerProps } from './DatePicker.types'
import { radius } from '../../style/radius'

export const Wrapper = styled.div <Partial<DatePickerProps>>`
  overflow: hidden;
  position: relative;
  width: ${ITEMS_WIDTH}px;
  min-height: 372px;
  border: 1px solid #cccc;
  background-color: #fff;
  border-radius: ${props => props.round !== undefined && radius[props.round].wrapper}px;
`

export const WrapperDays = styled.div`
  display: flex;
  position: absolute;
  overflow: hidden;
  right: 8px;
`

export const SlideDays = styled.div`
  will-change: transform;
  display: flex;
  flex-direction: column;
  width: ${ITEMS_WIDTH}px;
  gap: 4px;
`
export const Days = styled.div`
  display: flex;
  gap: 4px;
`
