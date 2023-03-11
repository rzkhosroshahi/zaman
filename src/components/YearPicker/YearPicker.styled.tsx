import styled from '@emotion/styled'
import { CALENDAR_WIDTH } from '../../constants'

export const Wrapper = styled.div`
  display: grid;
  grid-template-columns: repeat(3, 92px);
  grid-template-rows: auto;
  justify-content: center;
  gap: 4px;
  max-height: ${CALENDAR_WIDTH}px;
  overflow: auto;
  padding-top: 8px;
  padding-bottom: 8px;
`
