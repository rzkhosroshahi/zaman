import styled from '@emotion/styled'
import { radius } from '../../style/radius'

export const Wrapper = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
  height: 56px;
  padding-right: 8px;
  padding-left: 8px;
  background-color: ${(props) => props.theme.colors.primary[95]};
  border-bottom: 2px solid ${(props) => props.theme.colors.primary[85]};
`
export const HeaderTitle = styled.button`
  will-change: auto;
  min-width: 100px;
  outline: none;
  border: 0;
  font-family: inherit;
  background-color: transparent;
  cursor: pointer;
  color: ${(props) => props.theme.colors.primary[50]};
  padding: 8px 16px;
  font-weight: 500;
  transition: background-color 0.2s ease-in;
  border-radius: ${(props) => radius[props.theme.round].calendarItem}px;

  &:hover,
  &:focus {
    background-color: ${(props) => props.theme.colors.primary[90]};
  }
`
export const DayName = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  font-size: 14px;
  width: 40px;
  color: #8c8c8c;
`
