import * as React from "react";
import styled from "styled-components";
import { ThemeProvider } from "styled-components";
import { IDays } from "./utils";
import { defaultTheme } from "./theme";
import { IRangeDays } from "./types";

const DaysHead = styled.div`
  background-color: ${props => props.theme.headBackColor};
`;

const HeadTitle = styled.h4`
  color: ${props => props.theme.headTitleColor};
`;

const HeadRange = styled.h3`
  background-color: ${props => props.theme.headRangeBackColor};
  color: ${props => props.theme.headRangeColor};
`;

export const Day = styled.td`
	${props =>
    !props.startEndRange &&
    !props.holiday &&
    `color: ${props.theme.daysColor};
     background-color: ${props.theme.daysBackColor}`}
  ${props =>
    props.holiday &&
    `color: ${props.theme.holidaysColor};
     background-color: ${props.theme.holidaysBackColor}`}
	${props =>
    props.startEndRange &&
    `color: ${props.theme.startEndDayColor};
     background-color: ${props.theme.startEndDayBackColor}`}
`;

export interface IDaysProps {
  days: IDays[];
  theme?: any;
  rangeDays: IRangeDays;
  daysEvent: any;
}

const boolAttr = (arg: boolean) => {
  if (arg) {
    return {
      "data-disable": arg,
    };
  }
  return null;
};

export class Days extends React.PureComponent<IDaysProps> {
  public static defaultProps: Partial<IDaysProps> = {
    theme: defaultTheme,
  };
  public render(): React.ReactNode {
    const { days, theme, rangeDays, daysEvent } = this.props;
    if (!days.length) {
      return null;
    }
    return (
      <ThemeProvider theme={theme}>
        <React.Fragment>
          <DaysHead data-testid="days-head">
            <HeadTitle data-testid="days-head-title" />
            <HeadRange data-testid="days-head-range" />
          </DaysHead>
          <table>
            <thead />
            <tbody>
              <tr data-testid="days">
                {days.map((day: IDays, id) => (
                  <Day
                    key={`rdp-days-${id}`}
                    data-testid={`day-${id + 1}`}
                    data-fadate={`${day.faDate}`}
                    // data-disable={`${day.disable}`}
                    startEndRange={rangeDays ? rangeDays[day.faDate] : false}
                    {...daysEvent()}
                    {...boolAttr(day.disable)}
                  >
                    {day.day}
                  </Day>
                ))}
              </tr>
            </tbody>
          </table>
        </React.Fragment>
      </ThemeProvider>
    );
  }
}
