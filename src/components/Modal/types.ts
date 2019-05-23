import * as React from "react";

export interface IModalProps {
  isOpen?: boolean;
  modalZIndex?: number;
  children: React.ReactNode;
  toggleOpen: () => void;
}

export interface IModalStyled {
  modalZIndex: number;
}
