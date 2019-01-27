import * as React from "react";
import styled, { ThemeProvider } from "styled-components";
import { ITheme } from "./theme";
import { IRangeDays } from "./types";

const NormalDay = styled.td`
  color: ${props => props.theme.daysColor};
  background-color: ${props => props.theme.daysBackColor};
`;

const HolidayDay = styled(NormalDay)`
  color: ${props => props.theme.holidaysColor};
  background-color: ${props => props.theme.holidaysBackColor};
`;

const StartEndRangeDay = styled(NormalDay)`
  color: ${props => props.theme.startEndRangeColor};
  background-color: ${props =>
    props.theme[`${props.startEndRange.status}BackColor`]};
`;

export interface IDayProps {
  startEndRange?: IRangeDays | {};
  holiday?: boolean;
  daysEvent?: () => void;
  theme: ITheme;
}

export const Day: React.SFC<IDayProps> = props => {
  const { startEndRange, holiday, daysEvent } = props;
  if (startEndRange && Object.keys(startEndRange).length) {
    return <StartEndRangeDay {...props} {...daysEvent()} />;
  } else if (holiday) {
    return <HolidayDay {...props} {...daysEvent()} />;
  }
  return <NormalDay {...props} {...daysEvent()} />;
};
