import * as React from "react";
import { StyledHand } from "./styled";
import { IHandProps } from "./types";

export const Hand: React.FunctionComponent<IHandProps> = ({
  hour,
  minute,
  isInsideHour,
  isSelectingHour,
  children,
}) => {
  return (
    <StyledHand
      isInsideHour={isSelectingHour ? isInsideHour : false}
      value={isSelectingHour ? hour : minute}
      isSelectingHour={isSelectingHour}
    >
      {children}
    </StyledHand>
  );
};
