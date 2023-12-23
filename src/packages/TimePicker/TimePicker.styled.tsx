import styled from '@emotion/styled'
import { radius } from '../../style/radius'

export const Clock = styled.div`
  width: 260px;
  height: 260px;
  position: relative;
  z-index: 1;
  border-radius: 50%;
  background-color: ${(props) => props.theme.colors.primary[95]};
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
  height: ${(props) => (props.isInsideHour ? '26%' : '40%')};
  position: absolute;
  background-color: ${(props) => props.theme.colors.primary[85]};
  transform-origin: center bottom 0;
  transition: height 300ms cubic-bezier(0.4, 0, 0.2, 1) 0ms;
  pointer-events: none;
  ${(props) =>
    props.isSelectingHour
      ? `transform: ${`rotateZ(${(props.value / 12) * 360}deg)`}; `
      : `transform: ${`rotateZ(${(props.value / 60) * 360}deg)`}; `}
`

export const HandCircle = styled('div')<{ isSelectingHour: boolean }>`
  top: -22px;
  right: -16px;
  border: 16px solid ${(props) => props.theme.colors.primary[85]};
  position: absolute;
  box-sizing: content-box;
  border-radius: 100%;
  background-color: ${(props) => props.theme.colors.primary[85]};
  pointer-events: none;
`

export const TimeWrapper = styled.div`
  position: absolute;
  top: 16px;
  left: 16px;
  display: flex;
  align-items: center;
  gap: 8px;
`

export const Time = styled.div`
  padding: 4px 8px;
  border-radius: ${(props) => radius[props.theme.round].calendarItem}px;
  background-color: ${(props) => props.theme.colors.gray[20]};
`

export const ClockTimeWrapper = styled.div`
  display: flex;
  gap: 4px;
`

export const ClockTime = styled.div`
  cursor: pointer;
  font-size: 12px;
  padding: 4px;
  border-radius: 4px;

  &.cl_selected {
    background-color: ${(props) => props.theme.colors.gray[20]};
  }
`
