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
  if (isSelectingHour) {
    return (
      <StyledHand
        isInsideHour={isInsideHour}
        value={hour}
        isSelectingHour={isSelectingHour}
      >
        {children}
      </StyledHand>
    );
  }
  return (
    <StyledHand
      isInsideHour={false}
      value={minute}
      isSelectingHour={isSelectingHour}
    >
      {children}
    </StyledHand>
  );
};
