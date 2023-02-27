import styled from '@emotion/styled'
import { ITEMS_WIDTH } from '../../constants'

export const Container = styled.div`
  position: relative;
  max-width: ${ITEMS_WIDTH}px;
`

export const Wrapper = styled.div`
  overflow: hidden;
  position: relative;
  width: ${ITEMS_WIDTH}px;
  min-height: 240px;
  border: 1px solid #cccc;
  border-radius: 16px;
`

export const WrapperDays = styled.div`
  display: flex;
  position: absolute;
  overflow: hidden;
`

export const Day = styled.div`
  will-change: transform;
  display: flex;
  align-items: center;
  justify-content: center;
  width: ${ITEMS_WIDTH}px;
  min-height: 240px;
`
