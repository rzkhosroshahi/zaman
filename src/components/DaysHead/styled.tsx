import styled from "../../theme";

export const DaysHeadContainer = styled.div`
  display: flex;
  flex-wrap: wrap;
  justify-content: center;
  align-items: center;
  padding-top: ${8 / 16}rem;
  background-color: ${(props) => props.theme.headBackColor};
  min-height: 92px;

  @media (min-width: 768px) {
    padding-top: 1rem;
    min-height: 114px;
  }
`;
export const HeadTitle = styled.h4`
  display: flex;
  justify-content: space-between;
  align-items: center;
  width: 100%;
  padding: 0 ${8 / 16}rem;
  margin: 0;
  font-size: 1.5rem;
  text-align: center;
  color: ${(props) => props.theme.headTitleColor};

  svg {
    fill: ${(props) => props.theme.headTitleColor};
  }
  @media (min-width: 768px) {
    font-size: 1.618rem;
  }
`;

export const HeadRange = styled.h3`
  margin: 0.5rem 0;
  font-size: 1.5rem;
  border-radius: ${20 / 16}rem;
  padding: 0 ${16 / 16}rem;
  background-color: ${(props) => props.theme.headRangeBackColor};
  color: ${(props) => props.theme.headRangeColor};

  @media (min-width: 768px) {
    margin: 1rem 0;
    font-size: 1.618rem;
  }
`;

export const TimeTitle = styled.h3`
  direction: ltr;
  font-size: 2.25rem;
  color: ${(props) => props.theme.headTimeTitleColor};

  @media (min-width: 768px) {
    font-size: 2.618rem;
  }
`;
