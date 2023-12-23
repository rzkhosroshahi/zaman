import styled from '@emotion/styled'
import type { CalendarItemProps } from './CalendarItem.types'
import { radius } from '../../style/radius'

export const CalendarText = styled.div`
  color: inherit;
`

export const CalendarItem = styled.button<CalendarItemProps>`
  position: relative;
  outline: none;
  background-color: transparent;
  display: flex;
  font-family: inherit;
  align-items: center;
  justify-content: center;
  width: ${(props) => props.width}px;
  height: ${(props) => props.height}px;
  border: 1px solid transparent;
  user-select: none;
  color: ${(props) => props.theme.colors.gray[600]};
  border-radius: ${(props) => radius[props.theme.round].calendarItem}px;

  // pseudos
  &:hover,
  &:focus {
    border-color: ${(props) => props.theme.colors.gray[50]};
  }
  &:active {
    background-color: ${(props) => props.theme.colors.primary[40]};
    border-color: transparent;
    color: ${(props) => props.theme.colors.gray[0]};
  }
  // days picker
  &[data-selected='true'] {
    background-color: ${(props) => props.theme.colors.primary[50]};
    border-color: transparent;
    color: ${(props) => props.theme.colors.gray[0]};
  }
  &[data-disabled='true'] {
    border-color: transparent;
  }
  &[data-disabled='true'] .cl-text {
    opacity: 0.5;
  }
  &:not([data-range='true']) {
    transition: all 0.1s linear;
    border-radius: ${(props) => radius[props.theme.round].calendarItem}px;
  }
  &:not([data-selected='true'])&[data-weekend='true'] {
    color: #ff4d4d;
  }
  &:not([data-disabled='true']) {
    cursor: pointer;
  }
  // range picker
  &[data-in-range='true'] {
    background-color: ${(props) => props.theme.colors.primary[90]};
    border-color: transparent;
  }
  &[data-start-range='true'] {
    background-color: ${(props) => props.theme.colors.primary[40]};
    color: ${(props) => props.theme.colors.gray[0]};
    border-radius: ${(props) => radius[props.theme.round].calendarItem}px;
    border-color: transparent;
  }
  &[data-end-range='true'] {
    background-color: ${(props) => props.theme.colors.primary[40]};
    color: ${(props) => props.theme.colors.gray[0]};
    border-radius: ${(props) => radius[props.theme.round].calendarItem}px;
    border-color: transparent;
  }
  &[data-in-range='true']:before,
  &[data-end-range='true']:before {
    content: ' ';
    display: block;
    position: absolute;
    width: 40px;
    height: 40px;
    top: -1px;
    left: ${(props) => (props.theme.direction === 'rtl' ? '20px' : 'unset')};
    right: ${(props) => (props.theme.direction === 'rtl' ? 'unset' : '20px')};
    background-color: ${(props) => props.theme.colors.primary[90]};
    z-index: -1;
  }
  &[data-in-range='true']:nth-of-type(1):before,
  &[data-start-range='true']:before {
    display: none;
  }
`

CalendarItem.defaultProps = {
  width: 40,
  height: 40
}
export default CalendarItem
