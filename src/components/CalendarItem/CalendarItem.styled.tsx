import styled from '@emotion/styled'
import type { CalendarItemProps } from './CalendarItem.types'
import { radius } from '../../style/radius'
import { isRtl } from '../../utils'

export const CalendarItem = styled.button<CalendarItemProps>`
  position: relative;
  outline: none;
  background-color: transparent;
  display: flex;
  font-family: inherit;
  align-items: center;
  justify-content: center;
  width: ${props => props.width}px;
  height: ${props => props.height}px;
  border: 1px solid transparent;
  user-select: none;
  color: ${props => props.theme.colors.gray[600]};
  border-radius: ${props => radius[props.theme.round].calendarItem}px;
  
  // pseudos
  &:hover {
    border-color: ${props => props.theme.colors.gray[50]};
  }
  &:active {
    background-color: ${props => props.theme.colors.primary[40]};
    border-color: transparent;
    color: ${props => props.theme.colors.gray[0]};
  }
  // days picker
  &[data-selected=true] {
    background-color: ${props => props.theme.colors.primary[50]};
    border-color: transparent;
    color: ${props => props.theme.colors.gray[0]};
  }
  &[data-disabled=true] {
    color: rgba(0,0,0, 0.5);
    border-color: transparent;
  }
  &:not([data-range=true]) {
    transition: all 0.1s linear;
    border-radius: ${props => radius[props.theme.round].calendarItem}px;
  }
  &:not([data-selected=true])&[data-weekend=true] {
    color: #ff4d4d;
  }
  &:not([data-disabled=true]) {
    cursor: pointer;
  }
  // range picker
  &[data-in-range=true] {
    background-color: ${props => props.theme.colors.primary[90]};
    border-color: transparent;
  }
  &[data-start-range=true] {
    background-color: ${props => props.theme.colors.primary[40]};
    color: ${props => props.theme.colors.gray[0]};
    border-radius: ${props => radius[props.theme.round].calendarItem}px;
    border-color: transparent;
  }
  &[data-end-range=true] {
    background-color: ${props => props.theme.colors.primary[40]};
    color: ${props => props.theme.colors.gray[0]};
    border-radius: ${props => radius[props.theme.round].calendarItem}px;
    border-color: transparent;
  }
  &[data-in-range=true]:before,
  &[data-end-range=true]:before {
    content: ' ';
    display: block;
    position: absolute;
    width: 40px;
    height: 40px;
    top: -1px;
    left: ${isRtl() ? '20px' : 'unset'};
    right: ${isRtl() ? 'unset' : '20px'};
    background-color: ${props => props.theme.colors.primary[90]};
    z-index: -1;
  }
`
CalendarItem.defaultProps = {
  width: 40,
  height: 40
}
export default CalendarItem
