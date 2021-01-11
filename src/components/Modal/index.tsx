import * as React from "react";
import { IModalProps } from "./types";
import { ModalDiv } from "./styled";

export const Modal: React.FC<IModalProps> = ({
  children,
  isOpen = false,
  modalZIndex,
  toggleOpen,
}) => {
  if (!isOpen) {
    return null;
  }

  return (
    <ModalDiv className="rdp__modal" modalZIndex={modalZIndex}>
      {children}
      <div
        data-testid="overlay"
        className="rdp__overlay"
        onClick={toggleOpen}
      />
    </ModalDiv>
  );
};

export class Modal2 extends React.PureComponent<IModalProps, {}> {
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
