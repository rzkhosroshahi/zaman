import * as React from "react";
import { ThemeProvider } from "../../theme";
import { IDays } from "../../utils/daysInMonth";
import { IDaysProps } from "./types";
import { Day } from "../Day";
import { chunk } from "../../utils/chunk";
import { fa, weekDayNames } from "../../utils";
import { ButtonsDiv, ChangeViewButton, DaysBody, Table } from "./styled";
import { DaysHead } from "../DaysHead";

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
          <DaysHead
            monthName={monthName}
            datePickerStatus={selectedPickerStatus}
            ArrowLeft={ArrowLeft}
            ArrowRight={ArrowRight}
            increaseMonth={increaseMonth}
            decreaseMonth={decreaseMonth}
          />
          {timePicker && timePickerView ? (
            <p data-testid="dp__timePicker">time picker</p>
          ) : (
            <React.Fragment>
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
