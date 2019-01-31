import * as React from "react";
import styled, { ThemeProvider } from "styled-components";
import { IDays } from "./utils";
import { ITheme } from "./theme";
import { IRangeDays } from "./types";
import { Day } from "./day";
import { chunk } from "./utils/chunk";
import { fa } from "./utils/utils";
import { weekDayNames } from "./utils/weeks";

const DaysBody = styled.div`
  width: 320px;
  background-color: ${props => props.theme.backColor};
  border-radius: ${8 / 16}rem;
  overflow: hidden;
  & * {
    box-sizing: border-box;
    margin: 0;
    padding: 0;
    user-select: none;
  }
`;

const DaysHead = styled.div`
  display: flex;
  flex-wrap: wrap;
  justify-content: center;
  padding-top: ${24 / 16}rem;
  background-color: ${props => props.theme.headBackColor};
`;

const HeadTitle = styled.h4`
  display: flex;
  justify-content: space-between;
  align-items: center;
  width: 100%;
  padding: 0 ${8 / 16}rem;
  color: ${props => props.theme.headTitleColor};
  font-size: 1.618rem;
  text-align: center;

  svg {
    fill: ${props => props.theme.headTitleColor};
  }
`;

const HeadRange = styled.h3`
  margin-top: ${24 / 16}rem;
  margin-bottom: 1rem;
  font-size: 1.618rem;
  border-radius: ${20 / 16}rem;
  padding: 0 ${8 / 16}rem;
  background-color: ${props => props.theme.headRangeBackColor};
  color: ${props => props.theme.headRangeColor};
`;

const Table = styled.table`
  width: 100%;
  font-size: 1rem;
  border-collapse: separate;
  border-spacing: 0 1em;

  th {
    font-size: 1rem;
    color: ${props => props.theme.weekDaysColor};
  }
`;

export interface IDaysProps {
  days: IDays[];
  theme?: ITheme;
  rangeDays: IRangeDays;
  daysEvent: any;
  rangeStatus: string;
  ArrowLeft: React.ReactType;
  ArrowRight: React.ReactType;
  monthName: string;
  increaseMonth: () => void;
  decreaseMonth: () => void;
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
    monthName: "",
  };
  public shouldComponentUpdate(nextProps: Readonly<IDaysProps>): boolean {
    return nextProps !== this.props;
  }
  public render(): React.ReactNode {
    const {
      days,
      theme,
      rangeDays,
      daysEvent,
      rangeStatus,
      ArrowLeft,
      ArrowRight,
      monthName,
      increaseMonth,
      decreaseMonth,
    } = this.props;
    if (!days.length) {
      return null;
    }
    const weeks = chunk(days, 7);
    return (
      <ThemeProvider theme={theme}>
        <DaysBody>
          <DaysHead data-testid="days-head">
            <HeadTitle data-testid="days-head-title">
              <ArrowRight onClick={increaseMonth} />
              <p data-testid="days-head-title-text">{monthName}</p>
              <ArrowLeft onClick={decreaseMonth} />
            </HeadTitle>
            <HeadRange data-testid="days-head-range">{rangeStatus}</HeadRange>
          </DaysHead>
          <Table>
            <thead>
              <tr>
                {weekDayNames
                  .slice(0)
                  .reverse()
                  .map((name, idx) => (
                    <th key={`weekDayName-${idx}`}>{name}</th>
                  ))}
              </tr>
            </thead>
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
          </Table>
        </DaysBody>
      </ThemeProvider>
    );
  }
}
