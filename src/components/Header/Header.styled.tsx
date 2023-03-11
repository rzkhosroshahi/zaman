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
  cursor: pointer;
  color: ${props => props.theme.colors.primary[50]};
  padding: 4px 8px;
  font-weight: 500;
  transition: background-color 0.2s ease-in;
  
  &:hover {
    background-color: ${props => props.theme.colors.primary[90]};
  }
`
export const DayName = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  font-size: 14px;
  width: 40px;
  color: #8C8C8C;
`
