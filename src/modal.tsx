import * as React from "react";

export interface IModalProps {
  isOpen?: boolean;
  modalZindex?: number;
  children: React.ReactNode;
  toggleOpen: () => void;
}

export class Modal extends React.PureComponent<IModalProps, {}> {
  public static defaultProps: Partial<IModalProps> = {
    isOpen: false,
    modalZindex: 99999,
  };
  public render(): React.ReactNode {
    const { isOpen, toggleOpen } = this.props;
    const { children } = this.props;
    if (!isOpen) {
      return null;
    }
    return (
      <div className="modal">
        {children}
        <div data-testid="overlay" className="overlay" onClick={toggleOpen} />
      </div>
    );
  }
}
