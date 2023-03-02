import styled from '@emotion/styled'
import type { CalendarItemProps } from './CalendarItem.types'
import { radius } from '../../style/radius'

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
  transition: all 0.2s ease-in;
  user-select: none;
  
  ${props => (((props?.selected) === false) && ((props?.disabled) === false)) && `
    :hover {
        border-color: #BFBFBF;
    }`
  }
  cursor: ${props => ((props?.disabled) === false) && 'pointer'};
  background-color: ${props => ((props?.selected) === true) && props.theme.colors[50]};
  color: ${props => ((props?.selected) === true) && '#fff'};
  opacity: ${props => ((props?.disabled) === true) && '0.5'};
  border-radius: ${props => radius[props.theme.round].calendarItem}px;
  
  &:active {
    background-color: ${props => ((props?.selected) === true) && props.theme.colors[40]};
  }
`

export default CalendarItem
