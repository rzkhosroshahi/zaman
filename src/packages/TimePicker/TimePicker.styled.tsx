import styled from '@emotion/styled'

export const Clock = styled.div`
  width: 260px;
  height: 260px;
  position: relative;
  z-index: 1;
  border-radius: 50%;
  background-color: #bba4d2;
`

export interface IStyledHandProps {
  hour: number
  minute: number
  value: number
  isInsideHour: boolean
  isSelectingHour: boolean
}

export const Hand = styled('div')<IStyledHandProps>`
  left: 50%;
  width: 1.5px;
  bottom: 50%;
  height: ${props => (props.isInsideHour ? '26%' : '40%')};
  position: absolute;
  background-color: darkseagreen;
  transform-origin: center bottom 0;
  transition: height 300ms cubic-bezier(0.4, 0, 0.2, 1) 0ms;
  pointer-events: none;
  ${props =>
  props.isSelectingHour
    ? `transform: ${`rotateZ(${(props.value / 12) * 360}deg)`}; `
    : `transform: ${`rotateZ(${(props.value / 60) * 360}deg)`}; `}
`

export const HandCircle = styled('div')<{ isSelectingHour: boolean }>`
  top: -21px;
  left: -17px;
  border: 16px solid yellowgreen;
  position: absolute;
  box-sizing: content-box;
  border-radius: 100%;
  background-color: yellowgreen;
  pointer-events: none;
`
