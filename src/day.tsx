import * as React from "react";
import styled from "./theme";
import { styledThemes } from "./types";
import { IRangeDay } from "./types";

const NormalDay = styled("td")<IDayProps>`
  height: 45px;
  width: 45px;
  text-align: center;
  cursor: pointer;
  position: relative;
  transform-style: preserve-3d;
  border-radius: ${props => props.theme.daysRound};
  color: ${props =>
    props.selectedDay ? props.theme.selectDayColor : props.theme.daysColor};
  background-color: ${props =>
    props.selectedDay
      ? props.theme.selectDayBackColor
      : props.theme.daysBackColor};
`;

const HolidayDay = styled(NormalDay)`
  color: ${props =>
    props.selectedDay ? props.theme.selectDayColor : props.theme.holidaysColor};
  background-color: ${props =>
    props.selectedDay
      ? props.theme.selectDayBackColor
      : props.theme.holidaysBackColor};
`;

const StartEndRangeDay = styled(NormalDay)<IDayProps>`
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
  startEndRange?: IRangeDay;
  theme: styledThemes;
  isSelecting?: boolean;
  daysEvent?: () => void;
  holiday?: number[];
  selectedDay: boolean;
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
