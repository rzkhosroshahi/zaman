import styled from '@emotion/styled'
import { CALENDAR_HEIGHT, CALENDAR_WIDTH } from '../../constants'
import { radius } from '../../style/radius'

export const CalendarWrapper = styled.div`
  overflow: hidden;
  position: relative;
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  width: ${CALENDAR_WIDTH}px;
  min-height: ${CALENDAR_HEIGHT}px;
  border: 1px solid ${(props) => props.theme.colors.gray[40]};
  background-color: #fff;
  border-radius: ${(props) => radius[props.theme.round].wrapper}px;
`

export default CalendarWrapper
