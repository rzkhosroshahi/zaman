import * as React from "react";
import styled, { ThemeProvider } from "styled-components";
import { ITheme } from "./theme";
import { IRangeDays } from "./types";

const NormalDay = styled.td`
  height: 45px;
  width: 45px;
  text-align: center;
  color: ${props => props.theme.daysColor};
  background-color: ${props => props.theme.daysBackColor};
  position: relative;
  transform-style: preserve-3d;
`;

const HolidayDay = styled(NormalDay)`
  color: ${props => props.theme.holidaysColor};
  background-color: ${props => props.theme.holidaysBackColor};
`;

const StartEndRangeDay = styled(NormalDay)`
  color: ${props =>
    props.startEndRange.status === "continueRange"
      ? props.theme.continueRangeColor
      : props.theme.startEndRangeColor};
  border-radius: ${props =>
    props.startEndRange.status === "continueRange" ? 0 : "50%"};
  background-color: ${props =>
    props.theme[`${props.startEndRange.status}BackColor`]};
  z-index: ${props => props.startEndRange.status === "continueRange" && 100};
  ${props =>
    props.startEndRange.status === "startRange" &&
    `
			&:after {
				content: "";
				display: block;
				width: 25px;
				height: 45px;
				position: absolute;
				top: 45px;
				background-color: ${props.theme.continueRangeBackColor}
				transform: translate3d(-25px, -45px, -1px);
			}
		`};
  ${props =>
    props.startEndRange.status === "endRange" &&
    `
			&:after {
				content: "";
				display: block;
				width: 25px;
				height: 45px;
				position: absolute;
				top: 45px;
				background-color: ${props.theme.continueRangeBackColor}
				transform: translate3d(0px, -45px, -1px);
			}
		`};
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
