import styled from "../../theme";

interface IRangeDateDiv {
  isGregorian: boolean;
}

export const RangeDateDiv = styled.div<IRangeDateDiv>`
  direction: ${(props) => (props.isGregorian ? "ltr" : "rtl")};
`;
