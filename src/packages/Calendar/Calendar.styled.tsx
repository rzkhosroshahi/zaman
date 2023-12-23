import styled from '@emotion/styled'
import { CALENDAR_HEIGHT, CALENDAR_WIDTH } from '../../constants'
import { radius } from '../../style/radius'

export const Wrapper = styled.div`
  overflow: hidden;
  position: relative;
  width: ${CALENDAR_WIDTH}px;
  height: ${CALENDAR_HEIGHT}px;
  border: 1px solid ${(props) => props.theme.colors.gray[40]};
  background-color: #fff;
  border-radius: ${(props) => radius[props.theme.round].wrapper}px;
`

export const WrapperDays = styled.div`
  display: flex;
  position: absolute;
  overflow: hidden;
  right: ${(props) => (props.theme.direction === 'rtl' ? '8px' : 'unset')};
  left: ${(props) => (props.theme.direction !== 'rtl' ? '8px' : 'unset')};
`

export const SlideDays = styled.div`
  will-change: transform;
  display: flex;
  flex-direction: column;
  width: ${CALENDAR_WIDTH}px;
  gap: 4px;
`
export const Days = styled.div`
  display: flex;
  gap: 4px;
`
export const SubHeader = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  margin-top: 12px;
  margin-bottom: 8px;
  height: 24px;
  gap: 4px;
`
