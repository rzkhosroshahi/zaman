import * as React from "react";
import styled from "styled-components";

const Day = styled.span`
  opacity: ${props => (props.disable ? 0.5 : 1)};
  margin-right: 1rem;
`;

export const Days = ({ weeks }) => {
  return weeks.map((week, idx) => (
    <div key={idx}>
      {week.map((days, id) => (
        <Day key={id} disable={days.disable}>
          {days.day}
        </Day>
      ))}
    </div>
  ));
};
