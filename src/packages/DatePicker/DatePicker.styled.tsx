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
  min-height: 372px;
  border: 1px solid #cccc;
  border-radius: 16px;
`

export const WrapperDays = styled.div`
  display: flex;
  position: absolute;
  overflow: hidden;
  right: 8px;
`

export const SlideDays = styled.div`
  will-change: transform;
  display: flex;
  flex-direction: column;
  width: ${ITEMS_WIDTH}px;
  gap: 4px;
`
export const Days = styled.div`
  display: flex;
  gap: 4px;
`

export const Header = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  height: 56px;
  background-color: #E6F4FE;
`

export const HeaderTitle = styled.div`
`

export const SubHeader = styled.div`
  margin-top: 12px;
  margin-bottom: 8px;
  background-color: #ccc;
  height: 24px;
`
