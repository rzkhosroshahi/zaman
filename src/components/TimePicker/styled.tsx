import styled from "../../theme";
import { keyframes } from "../../theme";
import { numberPositionX, numberPositionY } from "../../utils/timePicker";
import { toRgba } from "../../utils/toRgb";

export const Clock = styled.div`
  width: 260px;
  height: 260px;
  position: relative;
  z-index: 1;
  border-radius: 50%;
  background-color: ${(props) => props.theme.timeBackColor};
`;

const fade = keyframes`
  from {
  	opacity: 0;
  }

  to {
  	opacity: 1;
  }
`;

export const MinuteWithAnimation = styled.div`
  animation: ${fade} 0.7s linear alternate;
`;

export interface INumbersProps {
  idx: number;
  clockHalfWidth?: number;
  numbersPadd?: number;
  top?: string;
  insideHour?: boolean;
  isSelectedNumber?: boolean;
}

export const Numbers = styled.span<INumbersProps>`
  left: calc(50% - 16px);
  top: ${(props) => props.top};
  width: 32px;
  color: ${(props) => props.theme.timeNumberColor};
  height: 32px;
  display: inline-flex;
  position: absolute;
  align-items: center;
  border-radius: 50%;
  justify-content: center;
  user-select: none;
  pointer-events: none;
  color: ${(props) =>
    props.isSelectedNumber && props.theme.selectedNumberColor};
  transform: ${(props) =>
    `translate(${numberPositionX(
      props.idx,
      props.clockHalfWidth,
      props.numbersPadd,
    )}px,
  	  ${numberPositionY(props.idx, props.clockHalfWidth, props.numbersPadd)}px)`};
`;

Numbers.defaultProps = {
  clockHalfWidth: 130,
  numbersPadd: 20,
  top: "2%",
};

export interface IStyledHandProps {
  value: number;
  isInsideHour: boolean;
  isSelectingHour: boolean;
}

export const StyledHand = styled.div<IStyledHandProps>`
  left: calc(50% - 1px);
  width: 1.5px;
  bottom: 50%;
  height: ${(props) => (props.isInsideHour ? "26%" : "40%")};
  position: absolute;
  background-color: ${(props) => props.theme.handBackColor};
  transform-origin: center bottom 0;
  transition: height 300ms cubic-bezier(0.4, 0, 0.2, 1) 0ms;
  pointer-events: none;
  ${(props) =>
    props.isSelectingHour
      ? `transform: ${`rotateZ(${(props.value / 12) * 360}deg)`}; `
      : `transform: ${`rotateZ(${(props.value / 60) * 360}deg)`}; `}
`;

export const HandCircle = styled.div<{ isSelectingHour: boolean }>`
  top: -23px;
  left: -15px;
  border: 16px solid ${(props) => props.theme.handCircleColor};
  position: absolute;
  box-sizing: content-box;
  border-radius: 100%;
  background-color: ${(props) => props.theme.handCircleColor};
  background-color: ${(props) =>
    !props.isSelectingHour && toRgba(props.theme.handCircleColor, 0.8)};
  pointer-events: none;
`;
