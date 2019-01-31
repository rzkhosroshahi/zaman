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
