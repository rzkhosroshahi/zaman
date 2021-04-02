import * as React from "react";
import { ThemeProvider } from "../../theme";
import { TimePicker } from "../TimePicker";
import { IDaysProps } from "./types";
// import { DaysHead } from "../DaysHead";
import { Day } from "../Day";
import {
  ButtonsDivWrapper,
  ButtonsDiv,
  ChangeViewButton,
  DaysBody,
  DaysNameList,
  DaysNumberListWrapper,
  DaysNumberList,
  DaysWrapper,
  TimeDays,
} from "./styled";
import { chunk } from "../../utils/chunk";
import { IDays } from "../../utils/daysInMonth";
import { fa, weekDayNamesComplete } from "../../utils";
import { DaysHead } from "../DaysHead";

const boolDataset = (arg: boolean) => {
  if (arg) {
    return {
      "data-disable": arg,
    };
  }
  return null;
};

export const Days = React.forwardRef<Element, IDaysProps>(
  (
    {
      days,
      theme,
      rangeDays,
      daysEventListeners = () => null,
      selectedPickerStatus,
      ArrowLeft,
      ArrowRight,
      ClockIcon,
      DateIcon,
      monthName = "",
      increaseMonth,
      decreaseMonth,
      isSelecting,
      submittable,
      onCancelButton,
      onSubmitButton,
      selectedDay,
      timePicker = false,
      timePickerView = null,
      toggleView,
      hour,
      minute,
      changeHour,
      changeMinute,
      isDatePicker,
      holiday = [],
      isGregorian,
      plain,
      hasHead,
    },
    ref,
  ) => {
    if (!days.length) {
      return null;
    }
    const weeks = chunk(days, 7);

    return (
      <ThemeProvider theme={theme}>
        <DaysBody
          isDatePicker={isDatePicker}
          plain={plain}
          ref={ref}
          isGregorian={isGregorian}
        >
          {hasHead && (
            <DaysHead
              monthName={monthName}
              datePickerStatus={selectedPickerStatus}
              ArrowLeft={ArrowLeft}
              ArrowRight={ArrowRight}
              increaseMonth={increaseMonth}
              decreaseMonth={decreaseMonth}
              hour={hour}
              minute={minute}
              timePickerView={timePickerView}
              toggleView={toggleView}
              isGregorian={isGregorian}
            />
          )}
          {timePicker && timePickerView ? (
            <TimeDays data-testid="dp__timePicker">
              <TimePicker
                hour={hour}
                minute={minute}
                changeHour={changeHour}
                changeMinute={changeMinute}
                timePickerView={timePickerView}
                toggleView={toggleView}
                isGregorian={isGregorian}
              />
            </TimeDays>
          ) : (
            <React.Fragment>
              <DaysWrapper
                data-testid="days-wrapper"
                isDatePicker={isDatePicker}
              >
                <DaysNameList>
                  {weekDayNamesComplete({ isGregorian }).map((name) => (
                    <li key={name}>{name}</li>
                  ))}
                </DaysNameList>
                <DaysNumberListWrapper>
                  {weeks.map((week, weekIdx) => (
                    <DaysNumberList
                      data-testid="days"
                      key={`rdp-weeks-${weekIdx}`}
                    >
                      {week.map((day: IDays, dayIdx) => (
                        <Day
                          key={dayIdx}
                          data-testid={`day-${weekIdx * 7 + dayIdx + 1}`}
                          data-fadate={`${day.faDate}`}
                          daysEvent={daysEventListeners}
                          theme={theme}
                          startEndRange={rangeDays && rangeDays[day.faDate]}
                          isSelecting={isSelecting}
                          selectedDay={selectedDay === day.faDate}
                          holiday={holiday.some(
                            (holiday) => holiday === dayIdx,
                          )}
                          today={day.today}
                          isGregorian={isGregorian}
                          {...boolDataset(day.disable)}
                        >
                          {/* {!day.disable ? fa(day.day) : null} */}
                          {fa(day.day, isGregorian)}
                        </Day>
                      ))}
                    </DaysNumberList>
                  ))}
                </DaysNumberListWrapper>
              </DaysWrapper>
            </React.Fragment>
          )}
          <ButtonsDivWrapper
            className="rdp__buttons"
            data-testid="rdp__buttons"
          >
            {submittable && (
              <ButtonsDiv>
                <button
                  type="button"
                  data-testid="submit-button"
                  className="rdp__button--submit"
                  onClick={onSubmitButton}
                >
                  تایید
                </button>
                <button
                  type="button"
                  data-testid="cancel-button"
                  className="rdp__button--cancel"
                  onClick={onCancelButton}
                >
                  لغو
                </button>
              </ButtonsDiv>
            )}
            {timePicker && (
              <ChangeViewButton
                type="button"
                onClick={(e) => {
                  e.preventDefault();
                  toggleView(timePickerView ? null : "hour");
                }}
                data-testid="toggle-view"
              >
                {timePickerView ? <DateIcon /> : <ClockIcon />}
              </ChangeViewButton>
            )}
          </ButtonsDivWrapper>
        </DaysBody>
      </ThemeProvider>
    );
  },
);

//       ArrowLeft,
//       ArrowRight,
//       ClockIcon,
//       DateIcon,
//       monthName,
//       increaseMonth,
//       decreaseMonth,
//       isSelecting,
//       submittable,
//       onCancelButton,
//       onSubmitButton,
//       selectedDay,
//       timePicker,
//       timePickerView,
//       toggleView,
//       hour,
//       minute,
//       changeHour,
//       changeMinute,
//       isDatePicker,
//     } = this.props;
//     if (!days.length) {
//       return null;
//     }
//     const weeks = chunk(days, 7);
//     return (
//       <ThemeProvider theme={theme}>
//         <DaysBody isDatePicker={isDatePicker}>
//           <DaysHead
//             monthName={monthName}
//             datePickerStatus={selectedPickerStatus}
//             ArrowLeft={ArrowLeft}
//             ArrowRight={ArrowRight}
//             increaseMonth={increaseMonth}
//             decreaseMonth={decreaseMonth}
//             hour={hour}
//             minute={minute}
//             timePickerView={timePickerView}
//           />
//           {timePicker && timePickerView ? (
//             <TimeDays data-testid="dp__timePicker">
//               <TimePicker
//                 hour={hour}
//                 minute={minute}
//                 changeHour={changeHour}
//                 changeMinute={changeMinute}
//               />
//             </TimeDays>
//           ) : (
//             <React.Fragment>
//               <DaysWrapper
//                 data-testid="days-wrapper"
//                 isDatePicker={isDatePicker}
//               >
//                 <DaysNameList>
//                   {weekDayNamesComplete.map(name => (
//                     <li key={name}>{name}</li>
//                   ))}
//                 </DaysNameList>
//                 <div>
//                   {weeks.map((week, idx) => (
//                     <DaysNumberList data-testid="days" key={`rdp-weeks-${idx}`}>
//                       {week.map((day: IDays, id) => (
//                         <Day
//                           key={day.utc}
//                           data-testid={`day-${idx * 7 + id + 1}`}
//                           data-fadate={`${day.faDate}`}
//                           daysEvent={daysEventListeners}
//                           theme={theme}
//                           startEndRange={rangeDays && rangeDays[day.faDate]}
//                           isSelecting={isSelecting}
//                           selectedDay={selectedDay === day.faDate}
//                           holiday={this.props.holiday.filter(
//                             holiday => holiday === id,
//                           )}
//                           {...boolDataset(day.disable)}
//                         >
//                           {!day.disable ? fa(day.day) : null}
//                         </Day>
//                       ))}
//                     </DaysNumberList>
//                   ))}
//                 </div>
//               </DaysWrapper>
//             </React.Fragment>
//           )}
//           {submittable && (
//             <ButtonsDiv className="rdp__buttons" data-testid="rdp__buttons">
//               <button
//                 type="button"
//                 data-testid="submit-button"
//                 className="rdp__button--submit"
//                 onClick={onSubmitButton}
//               >
//                 تایید
//               </button>
//               <button
//                 type="button"
//                 data-testid="cancel-button"
//                 className="rdp__button--cancel"
//                 onClick={onCancelButton}
//               >
//                 لغو
//               </button>
//               {timePicker && (
//                 <ChangeViewButton
//                   type="button"
//                   onClick={toggleView}
//                   data-testid="toggle-view"
//                 >
//                   {timePickerView ? <DateIcon /> : <ClockIcon />}
//                 </ChangeViewButton>
//               )}
//             </ButtonsDiv>
//           )}
//         </DaysBody>
//       </ThemeProvider>
//     );
//   }
// }
