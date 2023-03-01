import styled from '@emotion/styled'
import type { CalendarItemProps } from './CalendarItem.types'

export const CalendarItem = styled.div<CalendarItemProps>`
  display: flex;
  align-items: center;
  justify-content: center;
  width: 40px;
  height: 40px;
  border-radius: 16px;
  border: 1px solid transparent;
  transition: all 0.2s ease-in;
  user-select: none;
  
  ${props => (((props?.selected) === false) && ((props?.disabled) === false)) && `
    :hover {
        border-color: #BFBFBF;
    }`
  }
  cursor: ${props => ((props?.disabled) === false) && 'pointer'};
  background-color: ${props => ((props?.selected) === true) && '#0184DC'};
  color: ${props => ((props?.selected) === true) && '#fff'};
  opacity: ${props => ((props?.disabled) === true) && '0.5'};
`

export default CalendarItem
