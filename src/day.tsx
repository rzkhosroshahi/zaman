import * as React from "react";
import styled from "./theme";
import { styledThemes } from "./types";
import { IRangeDays } from "./types";

const NormalDay = styled("td")<styledThemes>`
  height: 45px;
  width: 45px;
  text-align: center;
  color: ${props => props.theme.daysColor};
  background-color: ${props => props.theme.daysBackColor};
  cursor: pointer;
  position: relative;
  transform-style: preserve-3d;
`;

const HolidayDay = styled(NormalDay)<styledThemes>`
  color: ${props => props.theme.holidaysColor};
  background-color: ${props => props.theme.holidaysBackColor};
`;

const StartEndRangeDay = styled(NormalDay)<styledThemes>`
  color: ${props =>
    props.isSelecting && props.startEndRange.status === "endRange"
      ? props.theme.continueRangeColor
      : props.theme[`${props.startEndRange.status}Color`]};
  background-color: ${props =>
    props.isSelecting && props.startEndRange.status === "endRange"
      ? props.theme.continueRangeBackColor
      : props.theme[`${props.startEndRange.status}BackColor`]};
  border-radius: ${props =>
    props.startEndRange.status === "continueRange" ? 0 : props.theme.daysRound};
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
  theme: styledThemes;
  isSelecting?: boolean;
  daysEvent?: () => void;
  holiday?: number[];
}

export const Day: React.SFC<IDayProps> = props => {
  const { startEndRange, holiday, daysEvent } = props;
  if (startEndRange && Object.keys(startEndRange).length) {
    return <StartEndRangeDay {...props} {...daysEvent()} />;
  } else if (holiday.length) {
    return <HolidayDay {...props} {...daysEvent()} />;
  }
  return <NormalDay {...props} {...daysEvent()} />;
};
