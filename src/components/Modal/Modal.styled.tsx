import styled from '@emotion/styled'

export const ModalDiv = styled.div`
  position: fixed;
  display: flex;
  justify-content: center;
  align-items: center;
  top: 0;
  right: 0;
  width: 100%;
  height: 100%;
  z-index: 10;

  .rdp__overlay {
    position: absolute;
    top: 0;
    right: 0;
    width: 100%;
    height: 100%;
    z-index: -10;
    background-color: rgba(86, 86, 86, 0.4);
  }
`
