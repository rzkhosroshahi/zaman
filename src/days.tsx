import * as React from "react";
import styled, { ThemeProvider } from "styled-components";
import { IDays } from "./utils";
import { defaultTheme } from "./theme";
import { IRangeDays } from "./types";
import { Day } from "./day";
import { chunk } from "./utils/chunk";
import { fa } from "./utils/utils";

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

export class Days extends React.Component<IDaysProps> {
  public static defaultProps: Partial<IDaysProps> = {
    theme: defaultTheme,
  };
  public shouldComponentUpdate(nextProps: Readonly<IDaysProps>): boolean {
    return nextProps !== this.props;
  }

  public render(): React.ReactNode {
    const { days, theme, rangeDays, daysEvent } = this.props;
    if (!days.length) {
      return null;
    }
    const weeks = chunk(days, 7);
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
              {weeks.map((week, idx) => (
                <tr data-testid="days" key={`rdp-weeks-${idx}`}>
                  {week.map((day: IDays, id) => (
                    <Day
                      key={`rdp-days-${id}`}
                      data-testid={`day-${idx * 7 + id + 1}`}
                      data-fadate={`${day.faDate}`}
                      startEndRange={rangeDays ? rangeDays[day.faDate] : {}}
                      daysEvent={daysEvent}
                      theme={theme}
                      {...boolAttr(day.disable)}
                    >
                      {fa(day.day)}
                    </Day>
                  ))}
                </tr>
              ))}
            </tbody>
          </table>
        </React.Fragment>
      </ThemeProvider>
    );
  }
}
