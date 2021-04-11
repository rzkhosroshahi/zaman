import styled from "../../theme";
import { IDayProps } from "./types";

export const NormalDay = styled.li<IDayProps>`
  text-align: center;
  cursor: pointer;
  position: relative;
  transform-style: preserve-3d;
  border-radius: ${(props) => props.theme.daysRound};
  color: ${(props) =>
    props.selectedDay ? props.theme.selectDayColor : props.theme.daysColor};
  background-color: ${(props) =>
    props.selectedDay
      ? props.theme.selectDayBackColor
      : props.theme.daysBackColor};

  &:not([data-disable]) {
    font-weight: 600;
  }

  &[data-disable] {
    color: ${(props) => props.theme.shadowDaysColor};
  }
`;

export const Today = styled(NormalDay)`
  color: ${(props) =>
    props.selectedDay ? props.theme.selectDayColor : props.theme.todayColor};

  &:before {
    content: "";
    width: 80%;
    height: 80%;
    display: inline-block;
    border-radius: ${(props) => props.theme.daysRound};
    position: absolute;
    top: 50%;
    left: 50%;
    transform: translate(-50%, -50%);
    border: 2px solid ${(props) => props.theme.todayBorderColor};
  }
`;

export const HolidayDay = styled(NormalDay)`
  color: ${(props) =>
    props.selectedDay ? props.theme.selectDayColor : props.theme.holidaysColor};
  background-color: ${(props) =>
    props.selectedDay
      ? props.theme.selectDayBackColor
      : props.theme.holidaysBackColor};
`;

export const StartEndRangeDay = styled(NormalDay)<IDayProps>`
  color: ${(props) => props.theme[`${props.startEndRange.status}Color`]};

  &[data-disable] {
    color: ${(props) => props.theme[`${props.startEndRange.status}Color`]};
  }

  background-color: ${(props) =>
    props.theme[`${props.startEndRange.status}BackColor`]};
  border-radius: ${(props) =>
    props.startEndRange.status === "continueRange"
      ? 0
      : props.startEndRange.status === "startRange"
      ? props.theme.daysRoundStart
        ? props.theme.daysRoundStart
        : props.theme.daysRound
      : props.startEndRange.status === "endRange"
      ? props.theme.daysRoundEnd
        ? props.theme.daysRoundEnd
        : props.theme.daysRound
      : "50%"};
  z-index: ${(props) => props.startEndRange.status === "continueRange" && 100};
  ${(props) =>
    props.startEndRange.status === "startRange" &&
    `
			&:after {
				content: "";
				display: ${
          props.theme.daysRoundContinue
            ? props.theme.daysRoundContinue
            : "block"
        };
				width: 25px;
				height: 40px;
				position: absolute;
				top: 45px;
				background-color: ${props.theme.continueRangeBackColor};
				transform: translate3d(${props.isGregorian ? "10px" : "-10px"}, -45px, -1px);
				
				@media (min-width: 576px) {
					height: 45px;
				}
			}
		`};
  ${(props) =>
    props.startEndRange.status === "endRange" &&
    `
			&:after {
				content: "";
				display: ${
          props.theme.daysRoundContinue
            ? props.theme.daysRoundContinue
            : "block"
        };
				width: 25px;
				height: 40px;
				position: absolute;
				top: 45px;
				background-color: ${props.theme.continueRangeBackColor};
				transform: translate3d(${props.isGregorian ? "-10px" : "10px"}, -45px, -1px);
				
				@media (min-width: 576px) {
					height: 45px;
				}
			}
		`};
`;
