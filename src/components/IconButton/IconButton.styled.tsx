import styled from '@emotion/styled'

export const IconButton = styled.button`
  cursor: pointer;
  outline: none;
  border: none;
  display: flex;
  justify-content: center;
  align-items: center;
  width: 40px;
  height: 40px;
  border-radius: 40px;
  transition: background-color 0.2s ease-in;
  color: #0193F4;
  background-color: transparent;
  
  &:hover {
    background-color: #D9EFFD;
  }
`
