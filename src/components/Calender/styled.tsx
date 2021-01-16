import styled from "../../theme";

interface IDatePickerDiv {
  isGregorian: boolean;
}

export const DatePickerDiv = styled.div<IDatePickerDiv>`
  direction: ${(props) => (props.isGregorian ? "ltr" : "rtl")};
`;
