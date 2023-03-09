import styled from '@emotion/styled'
import type { CalendarItemProps } from './CalendarItem.types'
import { radius } from '../../style/radius'
import { ANIMATE_FUNC } from '../../constants'

export const CalendarItem = styled.button<CalendarItemProps>`
  outline: none;
  background-color: transparent;
  display: flex;
  font-family: inherit;
  align-items: center;
  justify-content: center;
  width: 40px;
  height: 40px;
  border: 1px solid transparent;
  transition: all 0.2s ${ANIMATE_FUNC};
  user-select: none;
  border-radius: ${props => radius[props.theme.round].calendarItem}px;
  color: ${props => props.theme.colors.gray[600]};
  
  &:hover {
    border-color: ${props => props.theme.colors.gray[50]};
  }
  &:active {
    background-color: ${props => props.theme.colors.primary[40]};
    border-color: transparent;
    color: ${props => props.theme.colors.gray[0]};
  }
  
  &[data-selected=true] {
    background-color: ${props => props.theme.colors.primary[50]};
    border-color: transparent;
    color: ${props => props.theme.colors.gray[0]};
  }
  &[data-disabled=true] {
    opacity: 0.5;
    border-color: transparent;
  }
  &:not([data-disabled=true]) {
    cursor: pointer;
  }
`

export default CalendarItem
