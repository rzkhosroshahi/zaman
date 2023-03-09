import styled from '@emotion/styled'

export const Wrapper = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
  height: 56px;
  padding-right: 8px;
  padding-left: 8px;
  background-color: ${props => props.theme.colors.primary[95]};
  border-bottom: 2px solid ${props => props.theme.colors.primary[85]};
`
export const HeaderTitle = styled.div`
  color: ${props => props.theme.colors.primary[50]};
  font-weight: 500;
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
export const DayName = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  font-size: 14px;
  width: 40px;
  color: #8C8C8C;
`
