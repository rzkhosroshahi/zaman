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
  min-height: 340px;
  border: 1px solid #cccc;
  border-radius: 16px;
`

export const WrapperDays = styled.div`
  display: flex;
  position: absolute;
  overflow: hidden;
`

export const SlideDays = styled.div`
  will-change: transform;
  display: flex;
  align-items: center;
  flex-direction: column;
  justify-content: center;
  width: ${ITEMS_WIDTH}px;
  min-height: 340px;
  gap: 4px;
`
export const Days = styled.div`
  display: flex;
  align-items: center;
  justify-content: center;
  gap: 4px;
`
export const Day = styled.div`
  width: 40px;
  height: 40px;
  border-radius: 4px;
  display: flex;
  align-items: center;
  justify-content: center;
  border: 1px solid #ccc;
  cursor: pointer;
  
  &:hover {
    background-color: wheat;
  }
`
