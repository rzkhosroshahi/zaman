import styled from "styled-components";
import { IModalStyled } from "./types";

export const ModalDiv = styled.div<IModalStyled>`
  position: fixed;
  display: flex;
  justify-content: center;
  align-items: center;
  top: 0;
  right: 0;
  width: 100%;
  height: 100%;
  z-index: ${(props) => props.modalZIndex};

  .rdp__overlay {
    position: absolute;
    top: 0;
    right: 0;
    width: 100%;
    height: 100%;
    z-index: ${(props) => props.modalZIndex * -1};
    background-color: rgba(86, 86, 86, 0.4);
  }
`;
