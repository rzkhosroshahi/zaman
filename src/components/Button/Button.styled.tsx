import styled from '@emotion/styled'
import { radius } from '../../style/radius'

export const Button = styled.button`
  cursor: pointer;
  font-family: inherit;
  outline: none;
  border: none;
  display: flex;
  justify-content: center;
  align-items: center;
  width: max-content;
  min-width: 40px;
  height: 40px;
  transition: background-color 0.2s ease-in;
  color: ${(props) => props.theme.colors.primary[50]};
  background-color: transparent;
  border-radius: ${(props) => radius[props.theme.round].calendarItem}px;

  &:hover,
  &:focus {
    background-color: ${(props) => props.theme.colors.primary[90]};
  }
`
