import * as React from "react";
import styled from "styled-components";
import { fa } from "./utils/utils";

const Day = styled.span`
  opacity: ${props => (props.disable ? 0.5 : 1)};
  margin-right: 1rem;
`;

export class Days extends React.Component<any, any> {
  public daysHelper = days => {
    return {
      ...days,
    };
  };
  public render() {
    const { weeks, daysOnClick } = this.props;
    return weeks.map((week, idx) => (
      <div key={idx}>
        {week.map((days, id) => (
          <Day
            key={id}
            disable={days.disable}
            onClick={() => daysOnClick(this.daysHelper(days))}
          >
            {fa(days.day)}
          </Day>
        ))}
      </div>
    ));
  }
}
