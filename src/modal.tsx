import * as React from "react";
import styled from "styled-components";

export interface IModalProps {
  isOpen?: boolean;
  modalZIndex?: number;
  children: React.ReactNode;
  toggleOpen: () => void;
}

interface IModalStyled {
  modalZIndex: number;
}

const ModalDiv = styled("div")<IModalStyled>`
  position: absolute;
  display: flex;
  justify-content: center;
  align-items: center;
  top: 0;
  right: 0;
  width: 100%;
  height: 100%;
  z-index: ${props => props.modalZIndex};

  .rdp__overlay {
    position: absolute;
    top: 0;
    right: 0;
    width: 100%;
    height: 100%;
    z-index: ${props => props.modalZIndex * -1};
    background-color: rgba(86, 86, 86, 0.4);
  }
`;

export class Modal extends React.PureComponent<IModalProps, {}> {
  public static defaultProps: Partial<IModalProps> = {
    isOpen: false,
  };
  public render(): React.ReactNode {
    const { isOpen, toggleOpen } = this.props;
    const { children } = this.props;
    if (!isOpen) {
      return null;
    }
    return (
      <ModalDiv className="rdp__modal" modalZIndex={this.props.modalZIndex}>
        {children}
        <div
          data-testid="overlay"
          className="rdp__overlay"
          onClick={toggleOpen}
        />
      </ModalDiv>
    );
  }
}
