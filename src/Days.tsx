import * as React from "react";
import styled from "styled-components";
import { ThemeProvider } from "styled-components";

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
  theme: any;
}

export class Days extends React.PureComponent<IDaysProps> {
  public render(): React.ReactNode {
    const { theme } = this.props;
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
              <tr>
                <Day />
              </tr>
            </tbody>
          </table>
        </React.Fragment>
      </ThemeProvider>
    );
  }
}
