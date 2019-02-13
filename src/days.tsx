import * as React from "react";
import styled, { ThemeProvider } from "./theme";
import { IDays } from "./utils/daysInMonth";
import { styledThemes } from "./types";
import { IRangeDays } from "./types";
import { Day } from "./day";
import { chunk } from "./utils/chunk";
import { fa } from "./utils";
import { weekDayNames } from "./utils";

const DaysBody = styled("div")`
  max-width: 310px;
  max-height: 85%;
  position: relative;
  overflow: hidden;
  border-radius: ${8 / 16}rem;
  background-color: ${props => props.theme.backColor};
  & * {
    box-sizing: border-box;
    margin: 0;
    padding: 0;
    user-select: none;
  }
`;

const DaysHead = styled("div")`
  display: flex;
  flex-wrap: wrap;
  justify-content: center;
  padding-top: ${24 / 16}rem;
  background-color: ${props => props.theme.headBackColor};
`;

const HeadTitle = styled("h4")`
  display: flex;
  justify-content: space-between;
  align-items: center;
  width: 100%;
  padding: 0 ${8 / 16}rem;
  font-size: 1.618rem;
  text-align: center;
  color: ${props => props.theme.headTitleColor};

  svg {
    fill: ${props => props.theme.headTitleColor};
  }
`;

const HeadRange = styled("h3")`
  margin-top: ${24 / 16}rem;
  margin-bottom: 1rem;
  font-size: 1.618rem;
  border-radius: ${20 / 16}rem;
  padding: 0 ${8 / 16}rem;
  background-color: ${props => props.theme.headRangeBackColor};
  color: ${props => props.theme.headRangeColor};
`;

const Table = styled("table")<{ timePicker: boolean }>`
  width: 100%;
  font-size: 1rem;
  border-collapse: separate;
  border-spacing: 0 0.5rem;
  padding: ${props => (props.timePicker ? `${8 / 16}rem` : 0)};

  th {
    font-size: 1rem;
    font-weight: 300;
    color: ${props => props.theme.weekDaysColor};
  }
`;

const ButtonsDiv = styled("div")`
  margin-top: ${16 / 16}rem;
  margin-bottom: ${16 / 16}rem;

  button {
    border: none;
    margin: 0;
    padding: ${8 / 16}rem ${24 / 16}rem;
    width: auto;
    min-width: 80px;
    overflow: visible;
    font: inherit;
    line-height: normal;
    appearance: none;
    outline: 0;
    border-radius: ${4 / 16}rem;
    cursor: pointer;
    &::-moz-focus-inner {
      border: 0;
      padding: 0;
      outline: 0;
    }
  }
  .rdp__button--cancel {
    margin-right: 1rem;
    color: ${props => props.theme.cancelColor};
    background-color: ${props => props.theme.cancelBackColor};
    transition: background-color 0.2s ease;
    &:hover,
    &:focus {
      color: ${props => props.theme.cancelHoverColor};
      background-color: ${props => props.theme.cancelHoverBackColor};
    }
  }
  .rdp__button--submit {
    margin-right: 1rem;
    color: ${props => props.theme.submitColor};
    background-color: ${props => props.theme.submitBackColor};
    transition: background-color 0.2s ease;
    &:hover,
    &:focus {
      color: ${props => props.theme.submitHoverColor};
      background-color: ${props => props.theme.submitHoverBackColor};
    }
  }
`;

const ChangeViewButton = styled("button")`
  min-width: 40px !important;
  min-height: 40px;
  float: left;
  margin-left: 16px !important;
  text-align: center;
  display: flex;
  justify-content: center;
  align-items: center;
  transition: background-color 0.2s ease;
  background-color: ${props => props.theme.changeViewButtonBackColor};
  svg {
    fill: ${props => props.theme.changeViewButtonColor};
  }
  &:hover {
    background-color: ${props => props.theme.changeViewButtonHoverBackColor};
    svg {
      fill: ${props => props.theme.changeViewButtonHoverColor};
    }
  }
`;

export interface IDaysProps {
  days: IDays[];
  theme?: styledThemes;
  rangeDays?: IRangeDays;
  daysEventListeners: any;
  selectedPickerStatus: string;
  selectedDay?: string;
  ArrowLeft: React.ReactType;
  ArrowRight: React.ReactType;
  ClockIcon?: React.ReactType;
  DateIcon?: React.ReactType;
  monthName: string;
  increaseMonth: () => void;
  decreaseMonth: () => void;
  isSelecting?: boolean;
  holiday?: number[];
  isRenderingButtons?: boolean;
  onCancelButton?: () => void;
  onSubmitButton?: () => void;
  toggleView?: () => void;
  timePicker?: boolean;
  timePickerView?: boolean;
}

const boolDataset = (arg: boolean) => {
  if (arg) {
    return {
      "data-disable": arg,
    };
  }
  return null;
};

export class Days extends React.PureComponent<IDaysProps> {
  public static defaultProps: Partial<IDaysProps> = {
    monthName: "",
    holiday: [],
    daysEventListeners: () => null,
    timePicker: false,
    timePickerView: false,
  };
  public render(): React.ReactNode {
    const {
      days,
      theme,
      rangeDays,
      daysEventListeners,
      selectedPickerStatus,
      ArrowLeft,
      ArrowRight,
      ClockIcon,
      DateIcon,
      monthName,
      increaseMonth,
      decreaseMonth,
      isSelecting,
      isRenderingButtons,
      onCancelButton,
      onSubmitButton,
      selectedDay,
      timePicker,
      timePickerView,
      toggleView,
    } = this.props;
    if (!days.length) {
      return null;
    }
    const weeks = chunk(days, 7);
    return (
      <ThemeProvider theme={theme}>
        <DaysBody>
          {timePicker && timePickerView ? (
            <p data-testid="dp__timePicker">time picker</p>
          ) : (
            <React.Fragment>
              <DaysHead data-testid="days-head">
                <HeadTitle data-testid="days-head-title">
                  <ArrowRight onClick={decreaseMonth} />
                  <p data-testid="days-head-title-text">{monthName}</p>
                  <ArrowLeft onClick={increaseMonth} />
                </HeadTitle>
                <HeadRange data-testid="days-head-range">
                  {selectedPickerStatus}
                </HeadRange>
              </DaysHead>
              <Table data-testid="table-days" timePicker={timePicker}>
                <thead>
                  <tr>
                    {weekDayNames.map((name, idx) => (
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
                          daysEvent={daysEventListeners}
                          theme={theme}
                          startEndRange={rangeDays && rangeDays[day.faDate]}
                          isSelecting={isSelecting}
                          selectedDay={selectedDay === day.faDate}
                          holiday={this.props.holiday.filter(
                            holiday => holiday === id,
                          )}
                          {...boolDataset(day.disable)}
                        >
                          {!day.disable ? fa(day.day) : null}
                        </Day>
                      ))}
                    </tr>
                  ))}
                </tbody>
              </Table>
            </React.Fragment>
          )}
          {isRenderingButtons && (
            <ButtonsDiv className="rdp__buttons" data-testid="rdp__buttons">
              <button
                data-testid="submit-button"
                className="rdp__button--submit"
                onClick={onSubmitButton}
              >
                تایید
              </button>
              <button
                data-testid="cancel-button"
                className="rdp__button--cancel"
                onClick={onCancelButton}
              >
                لغو
              </button>
              {timePicker && (
                <ChangeViewButton
                  onClick={toggleView}
                  data-testid="toggle-view"
                >
                  {timePickerView ? <DateIcon /> : <ClockIcon />}
                </ChangeViewButton>
              )}
            </ButtonsDiv>
          )}
        </DaysBody>
      </ThemeProvider>
    );
  }
}
