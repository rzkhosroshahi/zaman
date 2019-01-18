import * as React from "react";

export interface IModalProps {
  isOpen?: boolean;
  modalZindex?: number;
  children: React.ReactNode;
}

interface IModalState {
  isOpen: boolean;
}

export class Modal extends React.PureComponent<IModalProps, IModalState> {
  public static defaultProps: Partial<IModalProps> = {
    isOpen: false,
    modalZindex: 99999,
  };
  constructor(props) {
    super(props);
    this.state = {
      isOpen: this.props.isOpen,
    };
  }
  public toggleOpen = () => {
    this.setState(prevState => {
      return {
        isOpen: !prevState.isOpen,
      };
    });
  };
  public render(): React.ReactNode {
    const { isOpen } = this.state;
    const { children } = this.props;
    if (!isOpen) {
      return null;
    }
    return (
      <div>
        {children}
        <div
          data-testid="overlay"
          className="overlay"
          onClick={this.toggleOpen}
        />
      </div>
    );
  }
}
