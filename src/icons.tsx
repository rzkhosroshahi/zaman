import * as React from "react";

export const ArrowRightCMP = props => (
  <svg
    width="1em"
    height="1em"
    viewBox="0 0 24 24"
    data-testid="arrow-right"
    {...props}
  >
    <path d="M9.29 15.88L13.17 12 9.29 8.12a.996.996 0 1 1 1.41-1.41l4.59 4.59c.39.39.39 1.02 0 1.41L10.7 17.3a.996.996 0 0 1-1.41 0c-.38-.39-.39-1.03 0-1.42z" />
  </svg>
);
export const ArrowLeftCMP = props => (
  <svg
    width="1em"
    height="1em"
    viewBox="0 0 24 24"
    data-testid="arrow-left"
    {...props}
  >
    <path d="M14.71 15.88L10.83 12l3.88-3.88a.996.996 0 1 0-1.41-1.41L8.71 11.3a.996.996 0 0 0 0 1.41l4.59 4.59c.39.39 1.02.39 1.41 0 .38-.39.39-1.03 0-1.42z" />
  </svg>
);

export const DateIcon = props => (
  <svg
    width="1em"
    height="1em"
    viewBox="0 0 24 24"
    data-testid="date-icon"
    {...props}
  >
    <path fill="none" d="M0 0h24v24H0V0z" />
    <path d="M7 11h2v2H7v-2zm14-5v14c0 1.1-.9 2-2 2H5a2 2 0 0 1-2-2l.01-14c0-1.1.88-2 1.99-2h1V2h2v2h8V2h2v2h1c1.1 0 2 .9 2 2zM5 8h14V6H5v2zm14 12V10H5v10h14zm-4-7h2v-2h-2v2zm-4 0h2v-2h-2v2z" />
  </svg>
);

export const ClockIcon = props => (
  <svg
    width="1em"
    height="1em"
    viewBox="0 0 24 24"
    data-testid="clock-icon"
    {...props}
  >
    <path fill="none" d="M0 0h24v24H0V0z" />
    <path d="M11.99 2C6.47 2 2 6.48 2 12s4.47 10 9.99 10C17.52 22 22 17.52 22 12S17.52 2 11.99 2zM12 20c-4.42 0-8-3.58-8-8s3.58-8 8-8 8 3.58 8 8-3.58 8-8 8zm.5-13H11v6l5.25 3.15.75-1.23-4.5-2.67z" />
  </svg>
);
