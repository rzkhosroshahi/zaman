import styled from "../../theme";

export const DaysBody = styled.div<{
  isDatePicker?: boolean;
  plain?: boolean;
  isGregorian?: boolean;
  ref?: any;
}>`
  width: ${(props) => (props.isDatePicker ? "170px" : "160px")};
  // max-height: 85%;
  position: relative;
  overflow: auto;
  border-radius: ${8 / 16}rem;
  background-color: ${(props) => props.theme.backColor};

  direction: ${(props) => (props.isGregorian ? "ltr" : "rtl")};

  ${(props) =>
    props.plain &&
    `
    border: 1px solid #ccc;
		`};

  & * {
    box-sizing: border-box;
    user-select: none;
  }

  h3,
  p {
    margin: 0;
  }
  @media (min-width: 576px) {
    width: ${(props) => (props.isDatePicker ? "290px" : "280px")};
  }
`;

export const DaysWrapper = styled.div<{ isDatePicker?: boolean }>`
  display: flex;
  width: 100%;
  max-width: 100%;
  overflow: hidden;
  font-size: 1rem;
  /* border-collapse: separate;
  border-spacing: 0 0.5rem; */
  padding: ${(props) => (props.isDatePicker ? `${8 / 16}rem` : 0)};
  margin-top: 1rem;

  th {
    font-size: 1rem;
    font-weight: 300;
    color: ${(props) => props.theme.weekDaysColor};
  }
`;

export const StyledUl = styled.ul`
  list-style: none;
  margin: 0;
  padding: 0;

  li {
    display: flex;
    justify-content: center;
    align-items: center;
    width: 25px;
    height: 25px;
    margin: 0 5px;
    padding: 0;

    @media (min-width: 576px) {
      width: 30px;
      height: 30px;
    }
  }
`;

export const DaysNameList = styled(StyledUl)`
  align-items: center;
  color: ${(props) => props.theme.weekDaysColor};

  display: grid;
  grid-template: repeat(7, auto) / 1fr;
  justify-content: center;
  justify-items: center;
  align-items: center;
  align-content: center;
  text-align: center;
  /* gap: 0.5em; */
  li {
    font-size: small;
    justify-content: end;
    @media (min-width: 576px) {
      width: 60px;
      height: 30px;
    }
  }
`;

export const DaysNumberList = styled(StyledUl)`
  display: flex;
  flex-direction: column;
  font-size: small;
  li {
    /* margin-bottom: 0.5rem; */
  }
`;

export const DaysNumberListWrapper = styled.div`
  display: grid;
  grid-template: repeat(7, auto) / repeat(6, 1fr);
  justify-content: center;
  justify-items: center;
  align-items: center;
  align-content: center;
  text-align: center;
  /* gap: 0.5em; */
`;

export const ButtonsDivWrapper = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
  padding: 0 1em;
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
`;

export const ButtonsDiv = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
  gap: 1em;

  .rdp__button--cancel {
    color: ${(props) => props.theme.cancelColor};
    background-color: ${(props) => props.theme.cancelBackColor};
    transition: background-color 0.2s ease;
    &:hover,
    &:focus {
      color: ${(props) => props.theme.cancelHoverColor};
      background-color: ${(props) => props.theme.cancelHoverBackColor};
    }
  }
  .rdp__button--submit {
    color: ${(props) => props.theme.submitColor};
    background-color: ${(props) => props.theme.submitBackColor};
    transition: background-color 0.2s ease;
    &:hover,
    &:focus {
      color: ${(props) => props.theme.submitHoverColor};
      background-color: ${(props) => props.theme.submitHoverBackColor};
    }
  }
`;

export const ChangeViewButton = styled.button`
  min-width: 40px !important;
  min-height: 40px;
  float: left;
  /* margin-left: 16px !important; */
  text-align: center;
  display: flex;
  justify-content: center;
  align-items: center;
  transition: background-color 0.2s ease;
  background-color: ${(props) => props.theme.changeViewButtonBackColor};
  svg {
    fill: ${(props) => props.theme.changeViewButtonColor};
  }
  &:hover {
    background-color: ${(props) => props.theme.changeViewButtonHoverBackColor};
    svg {
      fill: ${(props) => props.theme.changeViewButtonHoverColor};
    }
  }
`;

export const TimeDays = styled.div`
  width: 100%;
  font-size: 1rem;
  padding: 0.5rem;
  display: flex;
  justify-content: center;
  align-items: center;
  margin-bottom: 1rem;
`;
